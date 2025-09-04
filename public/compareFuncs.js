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
        if (isPlayingOnline) {
            preventDocBeeingClicked.style.display = 'grid';
        }
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
                                                if (isPlayingOnline){
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
                if (drawDeck.length > 0){
                    arrright.style.display = 'none';
                    arrleft.style.display = 'none';
                    drawCardsStack1.classList.add(drawCardAnimation1);
                    drawCardsStack2.classList.add(drawCardAnimation2);
                    drawDeck.length = 0;
                };
            };        
        };
    };    
const removeCssAnimationClasses = (HTMLElement, ...classArray ) => {
    HTMLElement.classList.remove(...classArray)
}
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

const removeCssAnimationClasses = (HTMLElement, ...classArray ) => {
    HTMLElement.classList.remove(...classArray)
}

const checkForWinner = () => {
    return new Promise((resolve) => {
        // Check if either player has no cards left
        if (play1Deck.length === 0) {
            // Player 2 wins
            whoWins.textContent = isPlayingOnline ? `${otherPlayer} gewinnt!` : 'Computer gewinnt!';
            endgameouter.style.display = 'grid';
            resolve(true);
        } else if (play2Deck.length === 0) {
            // Player 1 wins
            whoWins.textContent = isPlayingOnline ? `${onlineName} gewinnt!` : 'Du gewinnst!';
            endgameouter.style.display = 'grid';
            resolve(true);
        } else {
            // No winner yet
            resolve(false);
        }
    });
};

const finishTurnAndResetUI = async () => {
    let promise = new Promise((resolve, reject) => {
    if (isPlayingOnline){
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
    if (isPlayingOnline){
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
    addPlayerCardsToDrawDeck();
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
            playerDeck.push(...drawDeck);
        };
    };    
    function switchWhosNext(){
        if(vMaxBtn2.disabled) {
            setCardButtonsEnabledForTurn('', true, false);
        } else if (vMaxBtn.disabled) {
            setCardButtonsEnabledForTurn('', false, true);
        };
    };
    function addPlayerCardsToDrawDeck(){
        drawDeck.unshift(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
    };        
};

