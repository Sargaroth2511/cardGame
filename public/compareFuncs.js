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
        if (isPlayingOnline && window.GameUI?.preventDocBeeingClicked) {
            showElements('grid', window.GameUI.preventDocBeeingClicked);
        }
        if (window.GameUI?.popupHeader) window.GameUI.popupHeader.textContent = headingString;
        if (window.GameUI?.compPopup && window.GameUI?.compPopupOuter) {
            showElements('flex', window.GameUI.compPopup, window.GameUI.compPopupOuter);
        } else {
            showElements('flex', window.GameUI?.compPopup, window.GameUI?.compPopupOuter);
        }
    };

    async function animateStatBar(barHTMLElement, barLengthPercentage, cardValue,
                        animateBarCallback){
        let promise = new Promise (resolve => {
            let output = 0;
            let barAnimationInterval = setInterval(() => {
                output += GAME_CONSTANTS.BAR_ANIMATION_INCREMENT;
                if (barHTMLElement) barHTMLElement.style.width = `${output}%`;
                
                if (output > barLengthPercentage){
                    clearInterval(barAnimationInterval);
                    if (barHTMLElement) barHTMLElement.textContent = `${cardValue} ${unit}`;

                    if (barHTMLElement === window.GameUI?.innerBar1){
                        animateBarCallback(window.GameUI?.innerBar2, p2BarPercent, p2Value, animateStatBar)
                        resolve();
                    } else {
                        isComparisonInProgress = false;
                                                if (isPlayingOnline){
                            db.collection(ourGameName).doc(uniqueOnlineName).update({wantsToCheck: ''});
                        }; 
                    };
                }; 
            }, GAME_CONSTANTS.ANIMATION_INTERVAL);
        });
        return promise;
    };

    async function animateOutcomeAnimations(p1CardValue, p2CardValue, unitString){
 
        applyLowerIsBetterRule();
        applyAnimations();

        return new Promise(resolve => {
            let animatedCards = [window.GameUI?.animatedCardp1, window.GameUI?.animatedCardp2];
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
                addCssAnimation(window.GameUI?.animatedCardp1, 'animationDrawCard1');
                addCssAnimation(window.GameUI?.animatedCardp2, 'animationDrawCard2');
            }; 
    
            if (isPlayerOne){
                if (p1CardValue > p2CardValue) {
                    addCssAnimation(window.GameUI?.animatedCardp2, 'animationCard2')
                    animateDrawStacks('drawstackAnimationp1c1', 'drawstackAnimationp1c2');
                } else if (p1CardValue < p2CardValue){
                    addCssAnimation(window.GameUI?.animatedCardp1, 'animationCard1')
                    animateDrawStacks('drawstackAnimationp2c1', 'drawstackAnimationp2c2');
                };   
    
            } else if (!isPlayerOne){
                if (p1CardValue > p2CardValue) {
                    addCssAnimation(window.GameUI?.animatedCardp2, 'animationCard1')
                    animateDrawStacks('drawstackAnimationp2c1', 'drawstackAnimationp2c2');
                } else if (p1CardValue < p2CardValue){
                    addCssAnimation(window.GameUI?.animatedCardp1, 'animationCard2')
                    animateDrawStacks('drawstackAnimationp1c1', 'drawstackAnimationp1c2');
                };   
            };

            function addCssAnimation(HTMLElement, animationClass){
                if (HTMLElement) HTMLElement.classList.add(animationClass);
            };  

            function animateDrawStacks(drawCardAnimation1, drawCardAnimation2){
                if (drawDeck.length > 0){
                    hideElements(window.GameUI?.arrright, window.GameUI?.arrleft);
                    if (window.GameUI?.drawCardsStack1) window.GameUI.drawCardsStack1.classList.add(drawCardAnimation1);
                    if (window.GameUI?.drawCardsStack2) window.GameUI.drawCardsStack2.classList.add(drawCardAnimation2);
                    drawDeck.length = 0;
                };
            };        
        };
    };    
const removeCssAnimationClasses = (HTMLElement, ...classArray ) => {
    if (HTMLElement) HTMLElement.classList.remove(...classArray)
}
    let winner,
        firstPlayer = onlineName,
        secondPlayer = otherPlayer,
        factor,
        expr = localStorage.getItem('difficulty');

    if (!isPlayingOnline){    
        switch (expr){
            case 'medium':
                factor = GAME_CONSTANTS.DIFFICULTY_MULTIPLIERS.MEDIUM;
                break;
            case 'hard':
                factor = GAME_CONSTANTS.DIFFICULTY_MULTIPLIERS.HARD;
                break;
            default:
                factor = GAME_CONSTANTS.DIFFICULTY_MULTIPLIERS.EASY;
        };
    } else factor = GAME_CONSTANTS.DIFFICULTY_MULTIPLIERS.EASY;    

    if (!isPlayerOne){
        [firstPlayer, secondPlayer] = [secondPlayer, firstPlayer]
    }

    if (play1Deck.length === 0){
        isPlayerOne ? calcPoints(play1Deck, factor) : calcPoints(play2Deck, factor);
        isPlayingOnline ? winner = secondPlayer : winner = 'Computer';
        showElements('grid', window.GameUI?.endgameouter);
        if (window.GameUI?.whoWins) window.GameUI.whoWins.textContent = `${winner} hat gewonnen!`;   
        drawCards = [];
        return winner;
    } else if (play2Deck.length === 0){
        isPlayerOne ? calcPoints(play1Deck, 1) : calcPoints(play2Deck, 1);
        winner = firstPlayer;
        showElements('grid', window.GameUI?.endgameouter);
        if (window.GameUI?.whoWins) window.GameUI.whoWins.textContent = `${winner} hat gewonnen!`;   
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
            if (window.GameUI?.scoreHTML && window.GameUI.scoreHTML.children && window.GameUI.scoreHTML.children[1]) {
                userDoc.Score !== undefined ? (docRef.update({'Score' : score+userDoc.Score}),
                                          window.GameUI.scoreHTML.children[1].textContent = score+userDoc.Score):
                                          (docRef.update({'Score': score}),
                                          window.GameUI.scoreHTML.children[1].textContent = score);
            }
       });
    };
};

const removeCssAnimationClasses = (HTMLElement, ...classArray ) => {
    if (HTMLElement) HTMLElement.classList.remove(...classArray)
}

const checkForWinner = () => {
    return new Promise((resolve) => {
        // Check if either player has no cards left
        if (play1Deck.length === 0) {
            // Player 2 wins
            if (window.GameUI?.whoWins) window.GameUI.whoWins.textContent = isPlayingOnline ? `${otherPlayer} gewinnt!` : 'Computer gewinnt!';
            showElements('grid', window.GameUI?.endgameouter);
            resolve(true);
        } else if (play2Deck.length === 0) {
            // Player 1 wins
            if (window.GameUI?.whoWins) window.GameUI.whoWins.textContent = isPlayingOnline ? `${onlineName} gewinnt!` : 'Du gewinnst!';
            showElements('grid', window.GameUI?.endgameouter);
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
                reject(err);
            });
        } else resolve();
    });
    

    (function resetUI(){
    if (isPlayingOnline && window.GameUI?.preventDocBeeingClicked){
            hideElements(window.GameUI.preventDocBeeingClicked);
        };   
        hideElements(window.GameUI?.compPopupOuter);
        if (window.GameUI?.innerBars) {
            setElementStyles(window.GameUI.innerBars, 'width', '0');
            window.GameUI.innerBars.forEach (e => {
                if (e) e.textContent = '0';
            });
        }
        let cssanimationClasses = GAME_CONSTANTS.CSS_ANIMATION_CLASSES;
        let cssAnimatedElements = [window.GameUI?.drawCardsStack1, window.GameUI?.drawCardsStack2, window.GameUI?.animatedCardp1, window.GameUI?.animatedCardp2]
        cssAnimatedElements.forEach (e => {
            if (e) removeCssAnimationClasses(e, ...cssanimationClasses)
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
    if (!window.GameUI?.form1 || !window.GameUI?.form2) return;

    // Get only the button elements from the forms
    let buttons1 = window.GameUI.form1.querySelectorAll('button');
    let buttons2 = window.GameUI.form2.querySelectorAll('button');

    // Handle "lower is better" properties if unitString is provided
    if (unitString && allDeckProperties[chosenDeck]) {
        allDeckProperties[chosenDeck].forEach(e => {
            if (e.unit === unitString && e.lowerIsBetter === true){
                [disableCard1Buttons, disableCard2Buttons] = [disableCard2Buttons, disableCard1Buttons];
            };
        });
    }

    // Set disabled state for player 1 buttons
    for (let i = 0; i < buttons1.length; i++) {
        buttons1[i].disabled = disableCard1Buttons;
    };

    // Set disabled state for player 2 buttons
    for (let i = 0; i < buttons2.length; i++) {
        buttons2[i].disabled = disableCard2Buttons;
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
        if(window.GameUI?.vMaxBtn2 && window.GameUI.vMaxBtn2.disabled) {
            setCardButtonsEnabledForTurn('', true, false);
        } else if (window.GameUI?.vMaxBtn && window.GameUI.vMaxBtn.disabled) {
            setCardButtonsEnabledForTurn('', false, true);
        };
    };
    function addPlayerCardsToDrawDeck(){
        drawDeck.unshift(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
    };
};

// Export key functions for testing and modularity
const COMPARISON_MODULE = {
    compareTopCardsByIndex,
    runComparisonSequence,
    checkForWinner,
    finishTurnAndResetUI,
    setCardButtonsEnabledForTurn,
    comparePropertyAndAssignCards
};

// Make available globally for backward compatibility
window.COMPARISON_MODULE = COMPARISON_MODULE;
window.setCardButtonsEnabledForTurn = setCardButtonsEnabledForTurn;

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = COMPARISON_MODULE;
}

