// Flag to ensure compare/animation sequence runs only once at a time
let isComparisonInProgress = false;

// Backward-compatible aliases as wrappers to avoid TDZ
function getValuesToCompareCards(index){ return compareTopCardsByIndex(index); }
function startGameFlow(){ return startGame.apply(this, arguments); }
function toggleCardButtons(){ return setCardButtonsEnabledForTurn.apply(this, arguments); }
function compareProps(){ return comparePropertyAndAssignCards.apply(this, arguments); }
function endThisTurn(){ return finishTurnAndResetUI.apply(this, arguments); }

// Compare the top cards by the selected property index
const compareTopCardsByIndex = (index) => {
    let p1TopCardEntries = Object.entries(play1Deck[0]),
        p2TopCardEntries = Object.entries(play2Deck[0]),
        selectedPropertyKey = p1TopCardEntries[index+2][0],
        p1SelectedValue = p1TopCardEntries[index+2][1],
        p2SelectedValue = p2TopCardEntries[index+2][1],
        deckProps = allDeckProperties[chosenDeck];

    runComparisonSequence(
        p1SelectedValue,
        p2SelectedValue,
        deckProps[index].barwidth,
        selectedPropertyKey,
        deckProps[index].unit,
        deckProps[index].fullName
    );
};

// Run the UI flow to compare values, animate bars/cards, and end the turn
const runComparisonSequence = async (p1Value, p2Value, maxBarValue, propertyKey, unit, headingLabel) => {
    
    let p1BarPercent = Math.round(((p1Value / maxBarValue) * 100)),
        p2BarPercent = Math.round(((p2Value / maxBarValue) * 100));

    // Prevent re-entry while in progress
    isComparisonInProgress = true;

    showComparePopup(headingLabel);

    comparePropertyAndAssignCards(propertyKey, unit);

    await animateStatBar(innerBar1, p1BarPercent, p1Value, animateStatBar);

    await animateOutcomeAnimations(p1Value, p2Value, unit);

    finishTurnAndResetUI();

    function showComparePopup(headingString){
        preventDocBeeingClicked.style.display = 'grid';
        popupHeader.textContent = headingString;
        compPopup.style.display = 'flex';
        compPopupOuter.style.display = 'flex';
    };

    async function animateStatBar(barHTMLElement, barLengthPercentage, cardValue,
                        animateBarCallback){
        let promise = new Promise (resolve => {
            let output = 0;
            let barAnimationInterval = setInterval(() => {
                output += 3;
                barHTMLElement.style.width = `${output}%`;
                
                if (output > barLengthPercentage){
                    clearInterval(barAnimationInterval);
                    barHTMLElement.textContent = `${cardValue} ${unit}`;

                    if (barHTMLElement === innerBar1){
                        animateBarCallback(innerBar2, p2BarPercent, p2Value, animateStatBar) 
                        resolve();
                    } else {
                        isComparisonInProgress = false;
                        if (playsOnline){
                            db.collection(ourGameName).doc(uniqueOnlineName).update({wantsToCheck: ''});
                        }; 
                    };
                }; 
            }, 15);
        });
        return promise;
    };

    async function animateOutcomeAnimations(p1CardValue, p2CardValue, unitString){
 
        applyLowerIsBetterRule();
        applyAnimations();

        return new Promise(resolve => {
            let animatedCards = [animatedCardp1, animatedCardp2];
            const resolvePromise = () => {
                resolve(animatedCards.forEach(e => {
                    e.removeEventListener('animationend', resolvePromise)
                }));
            };
            animatedCards.forEach(e => {
                e.addEventListener('animationend', resolvePromise)
            });
        });  
        
        function applyLowerIsBetterRule() {
            allDeckProperties[chosenDeck].forEach(e => {
              if (e.unit === unitString && e.lowerIsBetter === true) {
                [p1CardValue, p2CardValue] = [p2CardValue, p1CardValue];
              }; 
            });
        };

        function applyAnimations(){
            if (p1CardValue === p2CardValue){
                addCssAnimation(animatedCardp1, 'animationDrawCard1');
                addCssAnimation(animatedCardp2, 'animationDrawCard2');
            }; 
    
            if (isPlayerOne){
                if (p1CardValue > p2CardValue) {
                    addCssAnimation(animatedCardp2, 'animationCard2')
                    animateDrawStacks('drawstackAnimationp1c1', 'drawstackAnimationp1c2');
                } else if (p1CardValue < p2CardValue){
                    addCssAnimation(animatedCardp1, 'animationCard1')
                    animateDrawStacks('drawstackAnimationp2c1', 'drawstackAnimationp2c2');
                };   
    
            } else if (!isPlayerOne){
                if (p1CardValue > p2CardValue) {
                    addCssAnimation(animatedCardp2, 'animationCard1')
                    animateDrawStacks('drawstackAnimationp2c1', 'drawstackAnimationp2c2');
                } else if (p1CardValue < p2CardValue){
                    addCssAnimation(animatedCardp1, 'animationCard2')
                    animateDrawStacks('drawstackAnimationp1c1', 'drawstackAnimationp1c2');
                };   
            };

            function addCssAnimation(HTMLElement, animationClass){
                HTMLElement.classList.add(animationClass);
            };  

            function animateDrawStacks(drawCardAnimation1, drawCardAnimation2){
                if (drawCards.length > 0){
                    arrright.style.display = 'none';
                    arrleft.style.display = 'none';
                    drawCardsStack1.classList.add(drawCardAnimation1);
                    drawCardsStack2.classList.add(drawCardAnimation2);
                    drawCards.length = 0;
                };
            };        
        };
    };    
};

const playAI = () => {
    if (!playsOnline){
        let difficulty = localStorage.getItem('difficulty');
        if (difficulty === 'easy'){
            aiPickRandom();
        } else if (difficulty === 'medium'){
            aiMedium();
        } else if (difficulty === 'hard'){
            aiSmart();
        } else {console.log('Difficulty Error')}
    };
    
    function aiPickRandom(){
        if (vMaxBtn.disabled) {
        let num = (Math.random() * card1Buttons.length);
        let i = Math.floor(num);
        compareTopCardsByIndex(i);
        }; 
    };
    
    function aiMedium(){
        let num = Math.random();
        if (num >= 0.85) {
            aiPickRandom();
        } else {
            aiSmart();
        };
    };
    
    function aiSmart(){
        if (vMaxBtn.disabled) {
            let indexOfCardValuesArray = [];
    
            let card2Entries = Object.entries(play2Deck[0]);
                for(let i = 2; i < card2Entries.length; i++){
                    let card2PropertyValue = card2Entries[i][1];
                    let index = sortedDecks[i-2].findIndex(x => x[card2Entries[i][0]] === card2PropertyValue);
                    let indexOfCardValues = {
                        index: index,
                        value: card2PropertyValue,
                        i : i-2
                    };
                    indexOfCardValuesArray.push(indexOfCardValues)
                };
            indexOfCardValuesArray.sort((a, b) => a.index - b.index);
            let numberOfSelectedCardElement = indexOfCardValuesArray[0].i;
            compareTopCardsByIndex(numberOfSelectedCardElement);
        };
    };
};

const attachFirebaseGameListeners = () => {
    db.collection(ourGameName).doc(uniqueOtherPlayerName)
    .onSnapshot((doc) => {
        let otherUser = doc.data(),
            i = otherUser.wantsToCheck;
            if(!isComparisonInProgress){                    
                if (i !== '' ){
                    compareTopCardsByIndex(i);
                }; 
            };          
        db.collection(ourGameName).doc(uniqueOnlineName)
        .onSnapshot((doc) => {
            let oneSelf = doc.data();    
            if (oneSelf.nextTurn === 'ok' && otherUser.nextTurn === 'ok'){
                preventDocBeeingClicked.style.display = 'none';
                db.collection(ourGameName).doc(uniqueOnlineName).update({nextTurn: ''});        
            };    
        });
    });         
};

const checkForWinner = async () =>{
    let winner,
        firstPlayer = onlineName,
        secondPlayer = otherPlayer,
        factor,
        expr = localStorage.getItem('difficulty');

    if (!playsOnline){    
        switch (expr){
            case 'medium':
                factor = 2;
                break;
            case 'hard':
                factor = 3;
                break;
            default:
                factor = 1;
        };
    } else factor = 1;    

    if (!isPlayerOne){
        [firstPlayer, secondPlayer] = [secondPlayer, firstPlayer]
    }

    if (play1Deck.length === 0){
        isPlayerOne ? calcPoints(play1Deck, factor) : calcPoints(play2Deck, factor);
        playsOnline ? winner = secondPlayer : winner = 'Computer';
        endgameouter.style.display = 'grid'
        whoWins.textContent = `${winner} hat gewonnen!`;   
        drawCards = [];
        return winner;
    } else if (play2Deck.length === 0){
        isPlayerOne ? calcPoints(play1Deck, 1) : calcPoints(play2Deck, 1);
        winner = firstPlayer;
        endgameouter.style.display = 'grid'
        whoWins.textContent = `${winner} hat gewonnen!`;   
        drawCards = [];
        return winner;
    } else {
        winner = false; 
        return winner;
    };
    
    function calcPoints(deck, factor){
      
       let score = deck.length * factor,
           docRef = db.collection('Users').doc(uniqueOnlineName);
       docRef.get().then(doc => {
            let userDoc = doc.data();
            userDoc.Score !== undefined ? (docRef.update({'Score' : score+userDoc.Score}),
                                          scoreHTML.children[1].textContent = score+userDoc.Score):
                                          (docRef.update({'Score': score}),
                                          scoreHTML.children[1].textContent = score);
       });
    };
};

const removeCssAnimationClasses = (HTMLElement, ...classArray ) => {
    HTMLElement.classList.remove(...classArray)
}

const finishTurnAndResetUI = async () => {
    let promise = new Promise((resolve, reject) => {
        if(playsOnline){
            db.collection(ourGameName).doc(uniqueOnlineName).update({ nextTurn: 'ok'})
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(console.log(err, 'error updating document'));
            });
        } else resolve();
    });
    

    (function resetUI(){
        if (!playsOnline){
            preventDocBeeingClicked.style.display = 'none';
        };   
        compPopupOuter.style.display = 'none';
        innerBars.forEach (e => {
            e.textContent = '0';
            e.style.width = '0';
        });         
        let cssanimationClasses = ['drawstackAnimationp1c1', 'drawstackAnimationp2c1',
                                  'drawstackAnimationp1c2', 'drawstackAnimationp2c2', 
                                  'animationCard1', 'animationCard2', 'animationDrawCard1',
                                  'animationDrawCard2'];
        let cssAnimatedElements = [drawCardsStack1, drawCardsStack2, animatedCardp1, animatedCardp2]
        cssAnimatedElements.forEach (e => {
            removeCssAnimationClasses(e, ...cssanimationClasses)
        });
    })();

    checkForWinner()
    .then ((winner) => {
        if (!winner){
            updateUIElements();
            playAI();
        };    
    });
    return promise;    
};



const animatedCardp1 = document.querySelector('#animatedCard1')
const animatedCardp2 = document.querySelector('#animatedCard2')



const setCardButtonsEnabledForTurn = (unitString, disableCard1Buttons, disableCard2Buttons) => {
    let elements1 = form1.elements,
        elements2 = form2.elements;

    allDeckProperties[chosenDeck].forEach(e => {
        if (e.unit === unitString && e.lowerIsBetter === true){
            [disableCard1Buttons, disableCard2Buttons] = [disableCard2Buttons, disableCard1Buttons];
        };    
    });    
    for (let ii = 0; ii < elements1.length; ii++) {
    elements1[ii].disabled = disableCard1Buttons;
    };
    for (let i = 0; i < elements2.length; i++) {
    elements2[i].disabled = disableCard2Buttons;
    };
};


const comparePropertyAndAssignCards = (prop, unitString) => {

    if (play1Deck[0][prop] > play2Deck[0][prop]) {
        playerWins (play1Deck, play2Deck, setCardButtonsEnabledForTurn(unitString, false, true),
        addDrawCardsToPlayerDeck(play1Deck));
    } else if (play1Deck[0][prop] < play2Deck[0][prop]) {
        playerWins (play2Deck, play1Deck, setCardButtonsEnabledForTurn(unitString, true, false),
        addDrawCardsToPlayerDeck(play2Deck))
    } else if (play1Deck[0][prop] === play2Deck[0][prop]) {
        switchWhosNext();
        addPlayerCardsToDrawCards();
    };
   
    function playerWins(deck1, deck2, turn, drawfunction){
        allDeckProperties[chosenDeck].forEach(e => {
            if (e.unit === unitString && e.lowerIsBetter === true){
                [deck1, deck2] = [deck2, deck1];
            };
        });    
        deck1.push(deck1[0], deck2[0]);
        deck1.splice(0,1);
        deck2.splice(0,1);
        turn;
        drawfunction;
    };
    function addDrawCardsToPlayerDeck(playerDeck){
        if (drawCards.length > 0) {
            Array.prototype.push.apply(playerDeck, drawCards);
        };
    };    
    function switchWhosNext(){
        if(vMaxBtn2.disabled) {
            setCardButtonsEnabledForTurn('', true, false);
        } else if (vMaxBtn.disabled) {
            setCardButtonsEnabledForTurn('', false, true);
        };
    };
    function addPlayerCardsToDrawCards(){
        drawCards.unshift(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
    };        
};



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

