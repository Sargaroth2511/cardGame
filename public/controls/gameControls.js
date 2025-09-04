// General game controls: start/new game, wait overlay, card property clicks
// Depends on globals: checkIfBothPlayersAreRdy, allCardButtons, getValuesToCompareCards,
// isPlayingOnline, db, ourGameName, uniqueOnlineName, endgameouter, compPopupOuter,
// waitBackbtn, waitshufflePopouter, isWaitingForReady, dotinterval, unsubUserDocs, startGame,
// endgamebacktn, newGame, preventDocBeeingClicked

(function () {
  function initGameControls() {
    const startBtn = document.querySelector('#startgame');
    if (startBtn && typeof checkIfBothPlayersAreRdy === 'function') {
      startBtn.addEventListener('click', checkIfBothPlayersAreRdy);
    }

    // Add click listeners to all card property buttons
    if (Array.isArray(allCardButtons)) {
      allCardButtons.forEach(cardButtons => {
        for (let i = 0; i < cardButtons.length; i++) {
          cardButtons[i].addEventListener('click', async e => {
            e.preventDefault();
            try { window.debug?.log('Local choose', { index: i }); window.debug?.set('wantsToCheck_self', i); } catch(e){}
            if (isPlayingOnline && db && ourGameName && uniqueOnlineName) {
              // Centralized turn sequencing via Meta doc to avoid races
              const metaRef = db.collection(ourGameName).doc('Meta');
              try {
                await db.runTransaction(async (tx) => {
                  const snap = await tx.get(metaRef);
                  let seq = (snap.exists && Number(snap.data().turnSeq)) || 0;
                  seq += 1;
                  tx.set(metaRef, {
                    turnSeq: seq,
                    lastTurn: {
                      index: i,
                      chooser: uniqueOnlineName,
                      ts: firebase.firestore.FieldValue.serverTimestamp()
                    }
                  }, { merge: true });
                });
                // Optional legacy update for backward compatibility
                db.collection(ourGameName).doc(uniqueOnlineName).update({ wantsToCheck: i });
                window.debug?.log('Wrote Meta turn', { index: i });
              } catch (err) {
                console.error('Failed to write Meta turn', err);
              }
            } else {
              // Offline/CPU: run immediately
              if (typeof getValuesToCompareCards === 'function') getValuesToCompareCards(i);
            }
          });
        }
      });
    }

    if (typeof endgamebacktn !== 'undefined' && endgamebacktn) {
      endgamebacktn.addEventListener('click', e => {
        e.preventDefault();
        window.location.replace('index.html');
      });
    }

    if (typeof newGame !== 'undefined' && newGame) {
      newGame.addEventListener('click', e => {
        e.preventDefault();
        if (typeof endgameouter !== 'undefined' && endgameouter) endgameouter.style.display = 'none';
        if (typeof compPopupOuter !== 'undefined' && compPopupOuter) compPopupOuter.style.display = 'none';
        if (isPlayingOnline && db && ourGameName && uniqueOnlineName) {
          db.collection(ourGameName).doc(uniqueOnlineName).update({ myTurn: '' })
            .then(() => db.collection(ourGameName).doc(uniqueOnlineName).update({ isRdy: 'yes' }))
            .then(() => { if (typeof checkIfBothPlayersAreRdy === 'function') checkIfBothPlayersAreRdy(); })
            .catch(err => { console.log('error updating doc', err); });
        } else if (typeof startGame === 'function') {
          startGame();
        }
      });
    }

    if (typeof waitBackbtn !== 'undefined' && waitBackbtn) {
      waitBackbtn.addEventListener('click', e => {
        e.preventDefault();
        if (typeof waitshufflePopouter !== 'undefined' && waitshufflePopouter) waitshufflePopouter.style.display = 'none';
        if (startBtn) startBtn.disabled = false;
        if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;
        if (typeof dotinterval !== 'undefined' && dotinterval) clearInterval(dotinterval);
        if (isPlayingOnline && db && ourGameName && uniqueOnlineName) {
          db.collection(ourGameName).doc(uniqueOnlineName).update({ isRdy: '' });
          if (dotinterval) clearInterval(dotinterval);
          if (typeof unsubUserDocs === 'function') unsubUserDocs();
        } else {
          window.location.replace('luxCarGame.html');
        }
      });
    }

    // Alert when clicking the blocker overlay
    if (typeof preventDocBeeingClicked !== 'undefined' && preventDocBeeingClicked) {
      preventDocBeeingClicked.addEventListener('click', () => {
        alert('Dein Gegner ist noch nicht bereit');
      });
    }
  }

  window.initGameControls = initGameControls;
})();
