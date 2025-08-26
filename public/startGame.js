// Game start orchestration and deck synchronization

const startGame = () => {

    toggleWaitingPopup('Karten werden gemischt', 'grid', startDotinterval);

    setTimeout (() => {
        isPlayerOne ? determineStarterAndSync(prepareUIForGameUI): updateUIForOtherStarter();
    },4000); 
   
    shuffleDeckAndDealCards(syncDecksBetweenPlayers);

    async function determineStarterAndSync(nextPrepareUI){
        let num = Math.random();

        if(playsOnline){
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
        playsOnline ? player2Name.textContent = otherDatabaseDoc.name:
                      player2Name.textContent = 'Computer';

        if (num <= 0.5){
            whostarts.textContent = `${onlineName} fängt an!`
            setCardButtonsEnabledForTurn('', false, true);
        } else {
            setCardButtonsEnabledForTurn('', true, false);
            playsOnline ? whostarts.textContent = `${otherPlayer} fängt an!`:
                          whostarts.textContent = `Der Computer fängt an!`;
        };  

        setTimeout(() => {
            waitshufflePopouter.style.display = 'none';
            if (typeof startBtn !== 'undefined' && startBtn) startBtn.disabled = false;
            if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;
            player1Cover.style.display = 'none';
            whostarts.textContent = '';
            startgame.style.display = 'none';
            player1Deck.style.display = 'grid';
            player2Deck.style.display = 'none';
            HTMLElementCardNumber.style.display = 'block';

            if (!playsOnline){
                sorteDecks();
                startGamevsCPU();
            };
        }, 3000);


      
    };


    function updateUIForOtherStarter(){
        setCardPropertyNames();
        clearInterval(dotinterval);
        player1Card.classList.replace('c1', 'c2');
        player2Card.classList.replace('c2', 'c1');
        compbar1.classList.replace('compbar1', 'compbar2');
        compbar2.classList.replace('compbar2', 'compbar1');
        compbar1.appendChild(innerBar2);
        compbar2.appendChild(innerBar1);
        player2Deck.classList.replace('player2Deck', 'player1Deck');

        setTimeout (() => {
            waitshufflePopouter.style.display = 'none';
            if (typeof startBtn !== 'undefined' && startBtn) startBtn.disabled = false;
            if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;
            player2Cover.style.display = 'none'
            whostarts.textContent = '';
            startgame.style.display = 'none';
            player2Deck.style.display = 'grid'
            player1Deck.style.display = 'none'
            cardNumberp2.style.display = 'block'
        },3000); 
    };

    function setCardPropertyNames (){
        allCardButtons.forEach(e => {
            for (let i = 0; i < allDeckProperties[chosenDeck].length; i++){
                const label = allDeckProperties[chosenDeck][i].fullName.replace(/!$/, '');
                e[i].children[0].textContent = label;
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

        if (playsOnline){
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
            console.log('decks written')
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
                    whostarts.textContent = `${otherPlayer} fängt an!`
                    setCardButtonsEnabledForTurn('', false, true);
                } else if (docu.myTurn === 'no'){
                    whostarts.textContent = `${onlineName} fängt an!`
                    setCardButtonsEnabledForTurn('', true, false);
                } else console.log('canst get myTurn', docu.myTurn)  
                }).catch((err) => {
                    console.log ('error getting documents', err)
                });
            player2Name.textContent = otherDatabaseDoc.name;
        };
    };
};
