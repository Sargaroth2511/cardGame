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
    try { window.debug?.set('compInProgress', true); window.debug?.log('Compare start', { propertyKey, unit, p1Value, p2Value }); } catch(e){}

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
                        try { window.debug?.set('compInProgress', false); window.debug?.log('Bars done'); } catch(e){}
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
};
