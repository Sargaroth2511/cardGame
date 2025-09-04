// Firebase listeners related to in-game updates
const attachFirebaseGameListeners = () => {
    // Prevent double-attachment of realtime listeners
    if (window.__gameListenersAttached) {
        try { window.debug?.log('Listeners already attached'); } catch(e){}
        return;
    }
    window.__gameListenersAttached = true;
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
        window.debug?.log('attachFirebaseGameListeners');
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
                    window.debug?.log('Run deferred compare', { idx });
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
            try { window.debug?.log('Skip duplicate index', { i }); } catch(e){}
            return false;
        }
        lastHandledIndex = i;
        lastHandledAt = now;
        return true;
    }

    // Listen to opponent doc: track their nextTurn (ignore wantsToCheck when Meta is active)
    db.collection(ourGameName).doc(uniqueOtherPlayerName).onSnapshot((doc) => {
        const otherUser = doc.data() || {};
        // Normalize index: accept numeric strings or numbers
        const raw = otherUser.wantsToCheck;
        const i = (typeof raw === 'string') ? parseInt(raw, 10) : raw;

        // Store other player's nextTurn status
        otherNextTurn = otherUser.nextTurn || '';
        window.debug?.set('nextTurn_other', otherNextTurn);
        window.debug?.set('wantsToCheck_other', (i ?? '').toString());
        window.debug?.log('Other snapshot', { i, nextTurn: otherNextTurn });
        maybeClearBlocker();

        // Fallback path is now always allowed (with dedupe) to avoid missing turns
        if (Number.isInteger(i) && i >= 0 && i <= 5 && shouldProcessIndex(i)) {
            if (!isComparisonInProgress) {
                try {
                    window.debug?.log('Run remote compare (fallback)', { i });
                    compareTopCardsByIndex(i);
                } catch (err) {
                    console.error('compareTopCardsByIndex failed for index', i, err);
                    if (typeof preventDocBeeingClicked !== 'undefined' && preventDocBeeingClicked) {
                        preventDocBeeingClicked.style.display = 'none';
                    }
                }
            } else {
                window.debug?.set('queuedIndex', i);
                window.debug?.log('Queue remote compare (busy, fallback)', { i });
                ensureRunCompareWhenReady(i);
            }
        }
    });

    // Listen to our own doc: track our nextTurn state independently
    db.collection(ourGameName).doc(uniqueOnlineName).onSnapshot((doc) => {
        const oneSelf = doc.data() || {};
        selfNextTurn = oneSelf.nextTurn || '';
        window.debug?.set('nextTurn_self', selfNextTurn);
        window.debug?.log('Self snapshot', { nextTurn: selfNextTurn });
        maybeClearBlocker();
    });

    // Centralized turn sequence listener (Meta doc)
    const metaRef = db.collection(ourGameName).doc('Meta');
    metaRef.get().then(snap => {
        if (!snap.exists) {
            // Initialize turn sequence
            return metaRef.set({ turnSeq: 0 }, { merge: true });
        }
    }).finally(() => {
        metaRef.onSnapshot((doc) => {
            const meta = doc.data() || {};
            const seq = Number(meta.turnSeq || 0);
            const lastTurn = meta.lastTurn || {};
            metaActive = true;
            window.debug?.set('turnSeq', seq);
            window.debug?.set('lastProcessedSeq', lastProcessedTurnSeq);
            window.debug?.log('Meta snapshot', { seq, lastTurn });
            if (seq > lastProcessedTurnSeq) {
                const idxRaw = lastTurn.index;
                const idx = (typeof idxRaw === 'string') ? parseInt(idxRaw, 10) : idxRaw;
                if (Number.isInteger(idx) && idx >= 0 && idx <= 5) {
                    if (!isComparisonInProgress) {
                        try {
                            lastProcessedTurnSeq = seq;
                            // Mark as handled to dedupe against fallback
                            lastHandledIndex = idx; lastHandledAt = Date.now();
                            window.debug?.log('Run meta compare', { idx, seq });
                            compareTopCardsByIndex(idx);
                        } catch (err) {
                            console.error('compareTopCardsByIndex failed (meta)', err);
                            if (typeof preventDocBeeingClicked !== 'undefined' && preventDocBeeingClicked) {
                                preventDocBeeingClicked.style.display = 'none';
                            }
                        }
                    } else {
                        window.debug?.set('queuedIndex', idx);
                        window.debug?.log('Queue meta compare (busy)', { idx, seq });
                        ensureRunCompareWhenReady(idx);
                        lastProcessedTurnSeq = seq; // mark as acknowledged
                    }
                }
            }
        });
    });
};
