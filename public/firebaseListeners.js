// Firebase listeners related to in-game updates
const attachFirebaseGameListeners = () => {
    // Prevent double-attachment of realtime listeners
    if (window.__gameListenersAttached) {
        try { window.debug?.log('Listeners already attached'); } catch(e){}
        return;
    }
    window.__gameListenersAttached = true;
    
    // Store unsubscribe functions for cleanup
    const unsubscribers = [];
    
    let pendingRemoteCompareIndex = null;
    let pendingTimer = null;
    let selfNextTurn = '';
    let otherNextTurn = '';
    let metaActive = false;
    let lastProcessedTurnSeq = 0;
    let lastHandledIndex = null;
    let lastHandledAt = 0;
    try {
        window.debug?.set('game', ourGameName);
        window.debug?.set('you', uniqueOnlineName);
        window.debug?.set('other', uniqueOtherPlayerName);
        window.debug?.set('isPlayerOne', isPlayerOne);
        window.debug?.set('isPlayingOnline', isPlayingOnline);
    } catch(e){}

    function ensureRunCompareWhenReady(index) {
        // Debounce multiple updates to the same index
        pendingRemoteCompareIndex = index;
        if (pendingTimer) return; // already waiting
        pendingTimer = setInterval(() => {
            if (!isComparisonInProgress) {
                clearInterval(pendingTimer); pendingTimer = null;
                const idx = pendingRemoteCompareIndex; pendingRemoteCompareIndex = null;
                window.debug?.set('queuedIndex', '');
                try {
                    compareTopCardsByIndex(idx); 
                } catch (err) {
                    console.error('compareTopCardsByIndex failed for index', idx, err);
                    if (typeof preventDocBeeingClicked !== 'undefined' && preventDocBeeingClicked) {
                        preventDocBeeingClicked.style.display = 'none';
                    }
                }
            }
        }, 50);
    }

    function maybeClearBlocker() {
        if (selfNextTurn === 'ok' && otherNextTurn === 'ok') {
            if (typeof preventDocBeeingClicked !== 'undefined' && preventDocBeeingClicked) {
                preventDocBeeingClicked.style.display = 'none';
            }
            // Reset only our own nextTurn flag
            db.collection(ourGameName).doc(uniqueOnlineName).update({ nextTurn: '' });
        }
    }

    function shouldProcessIndex(i) {
        const now = Date.now();
        if (i === lastHandledIndex && (now - lastHandledAt) < 1500) {
            return false;
        }
        lastHandledIndex = i;
        lastHandledAt = now;
        return true;
    }

    // Listen to opponent doc: track their nextTurn (ignore wantsToCheck when Meta is active)
    const unsubscribeOpponent = db.collection(ourGameName).doc(uniqueOtherPlayerName).onSnapshot((doc) => {
        if (!doc.exists) return;
        const otherUser = doc.data() || {};
        // Normalize index: accept numeric strings or numbers
        const raw = otherUser.wantsToCheck;
        const i = (typeof raw === 'string') ? parseInt(raw, 10) : raw;

        // Store other player's nextTurn status
        otherNextTurn = otherUser.nextTurn || '';
        window.debug?.set('nextTurn_other', otherNextTurn);
        window.debug?.set('wantsToCheck_other', (i ?? '').toString());
        maybeClearBlocker();

        // Fallback path is now always allowed (with dedupe) to avoid missing turns
        if (Number.isInteger(i) && i >= 0 && i <= 5 && shouldProcessIndex(i)) {
            if (!isComparisonInProgress) {
                try {
                    compareTopCardsByIndex(i);
                } catch (err) {
                    console.error('compareTopCardsByIndex failed for index', i, err);
                    if (typeof preventDocBeeingClicked !== 'undefined' && preventDocBeeingClicked) {
                        preventDocBeeingClicked.style.display = 'none';
                    }
                }
            } else {
                window.debug?.set('queuedIndex', i);
                ensureRunCompareWhenReady(i);
            }
        }
    });
    unsubscribers.push(unsubscribeOpponent);

    // Listen to our own doc: track our nextTurn state independently
    const unsubscribeSelf = db.collection(ourGameName).doc(uniqueOnlineName).onSnapshot((doc) => {
        if (!doc.exists) return;
        const oneSelf = doc.data() || {};
        selfNextTurn = oneSelf.nextTurn || '';
        window.debug?.set('nextTurn_self', selfNextTurn);
        maybeClearBlocker();
    });
    unsubscribers.push(unsubscribeSelf);

    // Centralized turn sequence listener (Meta doc)
    const metaRef = db.collection(ourGameName).doc('Meta');
    metaRef.get().then(snap => {
        if (!snap.exists) {
            // Initialize turn sequence
            return metaRef.set({ turnSeq: 0 }, { merge: true });
        }
    }).finally(() => {
        const unsubscribeMeta = metaRef.onSnapshot((doc) => {
            if (!doc.exists) return;
            const meta = doc.data() || {};
            const seq = Number(meta.turnSeq || 0);
            const lastTurn = meta.lastTurn || {};
            metaActive = true;
            window.debug?.set('turnSeq', seq);
            window.debug?.set('lastProcessedSeq', lastProcessedTurnSeq);
            if (seq > lastProcessedTurnSeq) {
                const idxRaw = lastTurn.index;
                const idx = (typeof idxRaw === 'string') ? parseInt(idxRaw, 10) : idxRaw;
                if (Number.isInteger(idx) && idx >= 0 && idx <= 5) {
                    if (!isComparisonInProgress) {
                        try {
                            lastProcessedTurnSeq = seq;
                            // Mark as handled to dedupe against fallback
                            lastHandledIndex = idx; lastHandledAt = Date.now();
                            compareTopCardsByIndex(idx);
                        } catch (err) {
                            console.error('compareTopCardsByIndex failed (meta)', err);
                            if (typeof preventDocBeeingClicked !== 'undefined' && preventDocBeeingClicked) {
                                preventDocBeeingClicked.style.display = 'none';
                            }
                        }
                    } else {
                        window.debug?.set('queuedIndex', idx);
                        ensureRunCompareWhenReady(idx);
                        lastProcessedTurnSeq = seq; // mark as acknowledged
                    }
                }
            }
        });
        unsubscribers.push(unsubscribeMeta);
    });
    
    // Return cleanup function
    return () => {
        unsubscribers.forEach(unsubscribe => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        window.__gameListenersAttached = false;
    };
};
