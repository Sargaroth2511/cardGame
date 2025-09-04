// Game start orchestration and deck synchronization

const startGame = () => {
    // Attach listeners as early as possible to avoid missing first turns
    if (isPlayingOnline && typeof attachFirebaseGameListeners === 'function') {
        attachFirebaseGameListeners();
    }

    if (typeof toggleWaitingPopup === 'function') {
        toggleWaitingPopup('Karten werden gemischt', 'grid', startDotinterval);
    }

    setTimeout(() => {
        isPlayerOne ? determineStarterAndSync(prepareUIForGameUI) : updateUIForOtherStarter();
    }, 4000);

    shuffleDeckAndDealCards(syncDecksBetweenPlayers);

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
        nextPrepareUI(cardNumberp1, num, playAI);
    };

    const prepareUIForGameUI = (HTMLElementCardNumber, num, startGamevsCPU) => {
        setCardPropertyNames();
        clearInterval(dotinterval);
    if (player2Name) {
        isPlayingOnline ? player2Name.textContent = otherDatabaseDoc.name:
              player2Name.textContent = 'Computer';
    }

        if (num <= 0.5){
            if (whostarts) whostarts.textContent = `${onlineName} fängt an!`
            setCardButtonsEnabledForTurn('', false, true);
        } else {
            setCardButtonsEnabledForTurn('', true, false);
            if (whostarts) {
                isPlayingOnline ? whostarts.textContent = `${otherPlayer} fängt an!`:
                          whostarts.textContent = `Der Computer fängt an!`;
            }
        };  

        setTimeout(() => {
            if (waitshufflePopouter) waitshufflePopouter.style.display = 'none';
            if (typeof startButton !== 'undefined' && startButton) startButton.disabled = false;
            if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;
            if (player1Cover) player1Cover.style.display = 'none';
            if (whostarts) whostarts.textContent = '';
            if (startgame) startgame.style.display = 'none';
            if (player1Deck) player1Deck.style.display = 'grid';
            if (player2Deck) player2Deck.style.display = 'none';
            if (HTMLElementCardNumber) HTMLElementCardNumber.style.display = 'block';

            if (!isPlayingOnline){
                sorteDecks();
                startGamevsCPU();
            };
        }, GAME_CONSTANTS.UI_TRANSITION_DELAY);


      
    };


    function updateUIForOtherStarter(){
        setCardPropertyNames();
        clearInterval(dotinterval);
        if (player1Card) player1Card.classList.replace('c1', 'c2');
        if (player2Card) player2Card.classList.replace('c2', 'c1');
        if (compbar1) compbar1.classList.replace('compbar1', 'compbar2');
        if (compbar2) compbar2.classList.replace('compbar2', 'compbar1');
        if (compbar1 && innerBar2) compbar1.appendChild(innerBar2);
        if (compbar2 && innerBar1) compbar2.appendChild(innerBar1);
        if (player2Deck) player2Deck.classList.replace('player2Deck', 'player1Deck');

        setTimeout (() => {
            if (waitshufflePopouter) waitshufflePopouter.style.display = 'none';
            if (typeof startButton !== 'undefined' && startButton) startButton.disabled = false;
            if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;
            if (player2Cover) player2Cover.style.display = 'none'
            if (whostarts) whostarts.textContent = '';
            if (startgame) startgame.style.display = 'none';
            if (player2Deck) player2Deck.style.display = 'grid'
            if (player1Deck) player1Deck.style.display = 'none'
            if (cardNumberp2) cardNumberp2.style.display = 'block'
        }, GAME_CONSTANTS.UI_TRANSITION_DELAY); 
    };

    function setCardPropertyNames (){
        const cleanLabel = (s) => {
            return String(s || '')
                .replace(/!$/, '')            // drop trailing exclamation
                .replace(/\s*\/min$/i, '')   // shorten units in labels
                .replace(/\u000f/g, 'ä')      // fix mojibake in Länge
        };

        allCardButtons.forEach(e => {
            for (let i = 0; i < allDeckProperties[chosenDeck].length; i++){
                const raw = allDeckProperties[chosenDeck][i].fullName;
                const label = cleanLabel(raw);
                if (e[i] && e[i].children && e[i].children[0]) {
                    e[i].children[0].textContent = label;
                }
            };
        });
    };


    function shuffleDeckAndDealCards(sendToFirebase){
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

        updateUIElements();

        if (isPlayingOnline){
            sendToFirebase(attachFirebaseGameListeners);
        };
      };


    async function syncDecksBetweenPlayers(nextAddListener){

        isPlayerOne ? await writeDecksToFirebase() : await fetchDecksFromFirebase(fetchStarterAndUpdateUI);

        nextAddListener();


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
                    if (whostarts) whostarts.textContent = `${otherPlayer} fängt an!`
                    setCardButtonsEnabledForTurn('', false, true);
                } else if (docu.myTurn === 'no'){
                    if (whostarts) whostarts.textContent = `${onlineName} fängt an!`
                    setCardButtonsEnabledForTurn('', true, false);
                }
                }).catch((err) => {
                    // Error getting documents - silently handle
                });
            if (player2Name) player2Name.textContent = otherDatabaseDoc.name;
        };
    };
};
