// Turn handling, UI reset, comparisons, and end-of-game checks

const removeCssAnimationClasses = (HTMLElement, ...classArray ) => {
    HTMLElement.classList.remove(...classArray)
}

const finishTurnAndResetUI = async () => {
    let promise = new Promise((resolve, reject) => {
    if(isPlayingOnline){
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
    if (!isPlayingOnline){
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
        if (drawDeck.length > 0) {
            Array.prototype.push.apply(playerDeck, drawDeck);
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
        drawDeck.unshift(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
    };        
};

const checkForWinner = async () =>{
    let winner,
        firstPlayer = onlineName,
        secondPlayer = otherPlayer,
        factor,
        expr = localStorage.getItem('difficulty');

    if (!isPlayingOnline){    
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
    isPlayingOnline ? winner = secondPlayer : winner = 'Computer';
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
