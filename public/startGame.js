// Game start orchestration and deck synchronization

const startGame = () => {
    // Show shuffling message immediately
    if (typeof toggleWaitingPopup === 'function') {
        toggleWaitingPopup('Karten werden gemischt', 'grid', startDotinterval);
    }

    // Shuffle and deal cards immediately, then determine starter after original delay
    shuffleDeckAndDealCards(() => {
        // After shuffling is complete, determine starter and update UI (original 4-second delay)
        setTimeout(() => {
            isPlayerOne ? determineStarterAndSync(prepareUIForGameUI) : updateUIForOtherStarter();
        }, 4000); // Restored original 4-second delay
    });

    // Attach Firebase listeners if playing online
    if (isPlayingOnline && typeof attachFirebaseGameListeners === 'function') {
        attachFirebaseGameListeners();
    }

    async function determineStarterAndSync(nextPrepareUI){
        let num = Math.random();

    if(isPlayingOnline){
            let docRef = await db.collection(ourGameName).doc(uniqueOnlineName);
            await docRef.update({isRdy: ''});
        
            if(num <= 0.5){
                await docRef.update({myTurn : 'yes'});
            } else if (num > 0.5) {
                await docRef.update({myTurn : 'no'})
            };
        };
        nextPrepareUI(window.GameUI?.cardNumberp1, num, playAI);
    };

    const prepareUIForGameUI = (HTMLElementCardNumber, num, startGamevsCPU) => {
        setCardPropertyNames();
        clearInterval(dotinterval);
    if (window.GameUI?.player2Name) {
        isPlayingOnline ? window.GameUI.player2Name.textContent = otherDatabaseDoc.name:
              window.GameUI.player2Name.textContent = 'Computer';
    }

        if (num <= 0.5){
            if (window.GameUI?.whostarts) {
                window.GameUI.whostarts.textContent = `${onlineName} fängt an!`;
                window.GameUI.whostarts.style.display = 'block';
            }
            setCardButtonsEnabledForTurn('', false, true);
        } else {
            setCardButtonsEnabledForTurn('', true, false);
            if (window.GameUI?.whostarts) {
                window.GameUI.whostarts.textContent = isPlayingOnline ? `${otherPlayer} fängt an!` : `Der Computer fängt an!`;
                window.GameUI.whostarts.style.display = 'block';
            }
        };

        // Clear "who starts" message after 1 second so players can read it
        setTimeout(() => {
            if (window.GameUI?.whostarts) {
                window.GameUI.whostarts.textContent = '';
                window.GameUI.whostarts.style.display = 'none';
            }
        }, 1000);

        setTimeout(() => {
            // Hide shuffling popup
            hideElements(window.GameUI?.waitshufflePopouter, window.GameUI?.player1Cover, window.GameUI?.startgame, window.GameUI?.player2Deck);
            if (typeof startButton !== 'undefined' && startButton) startButton.disabled = false;
            if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;

            // Show final game UI
            showElements('grid', window.GameUI?.player1Deck);
            showElements('block', HTMLElementCardNumber);
            if (window.GameUI?.player2Deck) window.GameUI.player2Deck.style.display = 'none';

            if (!isPlayingOnline){
                // Delay AI start until after "who starts" message disappears (1000ms) + small buffer
                setTimeout(() => {
                    sorteDecks();
                    startGamevsCPU();
                }, 1100);
            };
        }, 1200); // Reduced from 3000ms to 500ms for faster UI transition


      
    };


    function updateUIForOtherStarter(){
        setCardPropertyNames();
        clearInterval(dotinterval);
        if (window.GameUI?.player1Card) window.GameUI.player1Card.classList.replace('c1', 'c2');
        if (window.GameUI?.player2Card) window.GameUI.player2Card.classList.replace('c2', 'c1');
        // Use GameUI module instead of global variables
        if (window.GameUI?.compbar1) window.GameUI.compbar1.classList.replace('compbar1', 'compbar2');
        if (window.GameUI?.compbar2) window.GameUI.compbar2.classList.replace('compbar2', 'compbar1');
        if (window.GameUI?.compbar1 && window.GameUI?.innerBar2) window.GameUI.compbar1.appendChild(window.GameUI.innerBar2);
        if (window.GameUI?.compbar2 && window.GameUI?.innerBar1) window.GameUI.compbar2.appendChild(window.GameUI.innerBar1);
        if (window.GameUI?.player2Deck) window.GameUI.player2Deck.classList.replace('player2Deck', 'player1Deck');

        // Clear "who starts" message after 1 second so players can read it
        setTimeout(() => {
            if (window.GameUI?.whostarts) {
                window.GameUI.whostarts.textContent = '';
                window.GameUI.whostarts.style.display = 'none';
            }
        }, 1000);

        setTimeout (() => {
            // Hide shuffling popup
            hideElements(window.GameUI?.waitshufflePopouter, window.GameUI?.player2Cover, window.GameUI?.startgame, window.GameUI?.player1Deck);
            if (typeof startButton !== 'undefined' && startButton) startButton.disabled = false;
            if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;

            // Show final game UI
            showElements('grid', window.GameUI?.player2Deck);
            showElements('block', window.GameUI?.cardNumberp2);
        }, 500); // Reduced from 3000ms to 500ms for faster UI transition 
    };

    function setCardPropertyNames (){
        const cleanLabel = (s) => {
            return String(s || '')
                .replace(/!$/, '')            // drop trailing exclamation
                .replace(/\s*\/min$/i, '')   // shorten units in labels
                .replace(/\u000f/g, 'ä')      // fix mojibake in Länge
        };

        window.GameUI?.allCardButtons?.forEach(e => {
            for (let i = 0; i < allDeckProperties[chosenDeck].length; i++){
                const raw = allDeckProperties[chosenDeck][i].fullName;
                const label = cleanLabel(raw);
                if (e[i] && e[i].children && e[i].children[0]) {
                    e[i].children[0].textContent = label;
                }
            };
        });
    };


    function shuffleDeckAndDealCards(callback){
        chosenDeck = localStorage.getItem('chosenDeck');
        deckShuffled = allDecks[chosenDeck];

        for (let i = deckShuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = deckShuffled[i];
            deckShuffled[i] = deckShuffled[j];
            deckShuffled[j] = temp;
        };
        play1Deck = deckShuffled.slice(0, deckShuffled.length / 2);
        play2Deck = deckShuffled.slice(deckShuffled.length / 2);

        // Update UI immediately after shuffling
        updateUIElements();

        if (isPlayingOnline){
            syncDecksBetweenPlayers(callback);
        } else {
            // For offline play, call callback immediately
            if (typeof callback === 'function') {
                callback();
            }
        };
      };


    async function syncDecksBetweenPlayers(callback){

        isPlayerOne ? await writeDecksToFirebase() : await fetchDecksFromFirebase(fetchStarterAndUpdateUI);

        // Call the callback after deck synchronization is complete
        if (typeof callback === 'function') {
            callback();
        }


        async function writeDecksToFirebase(){
            let play1DeckID = [],
                play2DeckID = [];
        
            play1Deck.forEach(e => play1DeckID.push(e.id));
            play2Deck.forEach(e => play2DeckID.push(e.id));
            
            let docRef = db.collection(ourGameName).doc('Decks');
            await docRef.set({
                player1Deck: play1DeckID,
                player2Deck: play2DeckID
            });
        };


        async function fetchDecksFromFirebase(nextGetBeginnerAndUpdateUI){
            let unsubscribe = db.collection(ourGameName).doc(uniqueOtherPlayerName)
            .onSnapshot((doc) => {
                let otherUserDoc = doc.data();
                let player1Begins = otherUserDoc.myTurn;
                if (player1Begins !== ''){
                    getDecks();
                    unsubscribe();
                    nextGetBeginnerAndUpdateUI();
                };
            });

            function getDecks(){
                db.collection(ourGameName).doc('Decks').get().then(doc => {
                    let decks = doc.data();
                    play1DeckID = decks.player1Deck;
                    play2DeckID = decks.player2Deck;
                    play1Deck = []; 
                    play2Deck = [];
                    searchID(deckShuffled, play1DeckID, play1Deck)
                    searchID(deckShuffled, play2DeckID, play2Deck)
                }).then(() => {
                    updateUIElements();
                })
            };
        };  

        function fetchStarterAndUpdateUI(){
            db.collection(ourGameName).doc(uniqueOnlineName).update({isRdy : ''});

            db.collection(ourGameName).doc(uniqueOtherPlayerName).get()
            .then((doc) => {
                let docu = doc.data();
                if (docu.myTurn === 'yes'){
                    if (window.GameUI?.whostarts) {
                        window.GameUI.whostarts.textContent = `${otherPlayer} fängt an!`;
                        window.GameUI.whostarts.style.display = 'block';
                    }
                    setCardButtonsEnabledForTurn('', false, true);
                } else if (docu.myTurn === 'no'){
                    if (window.GameUI?.whostarts) {
                        window.GameUI.whostarts.textContent = `${onlineName} fängt an!`;
                        window.GameUI.whostarts.style.display = 'block';
                    }
                    setCardButtonsEnabledForTurn('', true, false);
                }

                // Clear "who starts" message after 1 second so players can read it
                setTimeout(() => {
                    if (window.GameUI?.whostarts) {
                        window.GameUI.whostarts.textContent = '';
                        window.GameUI.whostarts.style.display = 'none';
                    }
                }, 1000);
                }).catch((err) => {
                    // Error getting documents - silently handle
                });
            if (window.GameUI?.player2Name) window.GameUI.player2Name.textContent = otherDatabaseDoc.name;
        };
    };
};
