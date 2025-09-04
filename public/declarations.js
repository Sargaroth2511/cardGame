// Game UI Module - Centralized DOM element management
// This module provides safe access to all DOM elements used throughout the game

// Safe DOM query helper functions
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`DOM element not found: ${selector}`);
        return null;
    }
    return element;
}

function safeQuerySelectorAll(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0) {
        console.warn(`DOM elements not found: ${selector}`);
        return [];
    }
    return elements;
}

// Helper functions for showing/hiding elements
function showElements(displayValue, ...elements) {
    elements.forEach(element => {
        if (element) {
            if (Array.isArray(element)) {
                element.forEach(el => {
                    if (el) el.style.display = displayValue;
                });
            } else {
                element.style.display = displayValue;
            }
        }
    });
}

function hideElements(...elements) {
    elements.forEach(element => {
        if (element) {
            if (Array.isArray(element)) {
                element.forEach(el => {
                    if (el) el.style.display = 'none';
                });
            } else {
                element.style.display = 'none';
            }
        }
    });
}

// Safe replacement for the dangerous parse() function
function getSelector(selectorName) {
    if (selectorMap.hasOwnProperty(selectorName)) {
        return selectorMap[selectorName];
    } else {
        console.warn(`Selector '${selectorName}' not found in selectorMap`);
        return null;
    }
}

// REFACTORED: Eliminated selector duplication by initializing directly in selectorMap
// Only card-related selectors are in the map; UI elements remain as direct variables

// Safe selector mapping with direct initialization
const selectorMap = {
    // Card Player 1 selectors
    'imgCardPlayer1': [...document.querySelectorAll('.img1')],
    'nameCardPlayer1': [...document.querySelectorAll('.n1')],
    'prop1CardPlayer1': [...document.querySelectorAll('.vMax1')],
    'prop2CardPlayer1': [...document.querySelectorAll('.dis1')],
    'prop3CardPlayer1': [...document.querySelectorAll('.wei1')],
    'prop4CardPlayer1': [...document.querySelectorAll('.cyl1')],
    'prop5CardPlayer1': [...document.querySelectorAll('.pow1')],
    'prop6CardPlayer1': [...document.querySelectorAll('.rpm1')],

    // Card Player 2 selectors
    'imgCardPlayer2': [...document.querySelectorAll('.img2')],
    'nameCardPlayer2': [...document.querySelectorAll('.n2')],
    'prop1CardPlayer2': [...document.querySelectorAll('.vMax2')],
    'prop2CardPlayer2': [...document.querySelectorAll('.dis2')],
    'prop3CardPlayer2': [...document.querySelectorAll('.wei2')],
    'prop4CardPlayer2': [...document.querySelectorAll('.cyl2')],
    'prop5CardPlayer2': [...document.querySelectorAll('.pow2')],
    'prop6CardPlayer2': [...document.querySelectorAll('.rpm2')],

    // Draw Card 1 selectors
    'imgDrawCard1': document.querySelector('.imgdraw'),
    'nameDrawCard1': document.querySelector('.ndraw'),
    'prop1DrawCard1': document.querySelector('.vMaxdraw'),
    'prop2DrawCard1': document.querySelector('.disdraw'),
    'prop3DrawCard1': document.querySelector('.weidraw'),
    'prop4DrawCard1': document.querySelector('.cyldraw'),
    'prop5DrawCard1': document.querySelector('.powdraw'),
    'prop6DrawCard1': document.querySelector('.rpmdraw'),

    // Draw Card 2 selectors
    'imgDrawCard2': document.querySelector('.imgdraw2'),
    'nameDrawCard2': document.querySelector('.ndraw2'),
    'prop1DrawCard2': document.querySelector('.vMaxdraw2'),
    'prop2DrawCard2': document.querySelector('.disdraw2'),
    'prop3DrawCard2': document.querySelector('.weidraw2'),
    'prop4DrawCard2': document.querySelector('.cyldraw2'),
    'prop5DrawCard2': document.querySelector('.powdraw2'),
    'prop6DrawCard2': document.querySelector('.rpmdraw2'),

    // Deck 1 selectors
    'imgDeck1': [...document.getElementsByClassName('imgd1')],
    'nameDeck1': [...document.getElementsByClassName('nd1')],
    'prop1Deck1': [...document.getElementsByClassName('vMaxd1')],
    'prop2Deck1': [...document.getElementsByClassName('disd1')],
    'prop3Deck1': [...document.getElementsByClassName('weid1')],
    'prop4Deck1': [...document.getElementsByClassName('cyld1')],
    'prop5Deck1': [...document.getElementsByClassName('powd1')],
    'prop6Deck1': [...document.getElementsByClassName('rpmd1')],

    // Deck 2 selectors
    'imgDeck2': [...document.getElementsByClassName('imgd2')],
    'nameDeck2': [...document.getElementsByClassName('nd2')],
    'prop1Deck2': [...document.getElementsByClassName('vMaxd2')],
    'prop2Deck2': [...document.getElementsByClassName('disd2')],
    'prop3Deck2': [...document.getElementsByClassName('weid2')],
    'prop4Deck2': [...document.getElementsByClassName('cyld2')],
    'prop5Deck2': [...document.getElementsByClassName('powd2')],
    'prop6Deck2': [...document.getElementsByClassName('rpmd2')]
};

// GameUI Module - Export all DOM elements and helper functions
window.GameUI = {
    // Helper functions
    safeQuerySelector,
    safeQuerySelectorAll,
    getSelector,
    showElements,
    hideElements,

    // Button Selectors
    vMaxBtn: safeQuerySelector('#vmaxbtn1'),
    disBtn: safeQuerySelector('#disbtn1'),
    weiBtn: safeQuerySelector('#weibtn1'),
    cylBtn: safeQuerySelector('#cylbtn1'),
    powBtn: safeQuerySelector('#powbtn1'),
    rpmBtn: safeQuerySelector('#rpmbtn1'),

    vMaxBtn2: safeQuerySelector('#vmaxbtn2'),
    disBtn2: safeQuerySelector('#disbtn2'),
    weiBtn2: safeQuerySelector('#weibtn2'),
    cylBtn2: safeQuerySelector('#cylbtn2'),
    powBtn2: safeQuerySelector('#powbtn2'),
    rpmBtn2: safeQuerySelector('#rpmbtn2'),

    // UI Elements
    scoreHTML: safeQuerySelector('#score'),
    form1: safeQuerySelector('#form1'),
    form2: safeQuerySelector('#form2'),

    innerBar1: safeQuerySelector('#innerbar1'),
    innerBar2: safeQuerySelector('#innerbar2'),
    innerBars: safeQuerySelectorAll('.innerbar'),
    compPopupOuter: safeQuerySelector('#popupouter'),
    compPopup: safeQuerySelector('#comp_popupinner'),
    closeBtn: safeQuerySelector('#closebtn'),
    popupHeader: safeQuerySelector('h3'),

    // Waiting/Shuffle overlay and misc UI
    waitshufflePopouter: safeQuerySelector('#waitshufflePopouter'),
    waiting: safeQuerySelector('#waiting'),
    whostarts: safeQuerySelector('#whostarts'),
    startgame: safeQuerySelector('#startgame'),
    player1Cover: safeQuerySelector('#player1Cover'),
    player2Cover: safeQuerySelector('#player2Cover'),
    player1Deck: safeQuerySelector('#player1Deck'),
    player2Deck: safeQuerySelector('#player2Deck'),
    cardNumberp1: safeQuerySelector('#cardNumberp1'),
    cardNumberp2: safeQuerySelector('#cardNumberp2'),
    animatedpoints: safeQuerySelector('#animatedpoints'),
    waitBackbtn: safeQuerySelector('#waitBackbtn'),

    // Primary card containers and comparison bars
    player1Card: safeQuerySelector('#player1Card'),
    player2Card: safeQuerySelector('#player2Card'),
    compbar1: safeQuerySelector('#compbar1'),
    compbar2: safeQuerySelector('#compbar2'),

    // Animated comparison cards
    animatedCardp1: safeQuerySelector('#animatedCard1'),
    animatedCardp2: safeQuerySelector('#animatedCard2'),

    // Endgame popup
    endgameouter: safeQuerySelector('#endgameouter'),
    whoWins: safeQuerySelector('#whoWins'),
    endgamebacktn: safeQuerySelector('#endgamebacktn'),
    newGame: safeQuerySelector('#newGame'),

    // Player/opponent name labels
    player2Name: safeQuerySelector('#player2Name'),

    // Auth/name popups
    nameOuter2: safeQuerySelector('#nameOuter2'),
    signInOuter2: safeQuerySelector('#signInOuter2'),
    nameForm: safeQuerySelector('#nameForm'),
    nameBackbtn: safeQuerySelector('#nameBackbtn'),

    drawCardsStack1: safeQuerySelector('#drawCardsStack1'),
    drawCardsStack2: safeQuerySelector('#drawCardsStack2'),
    drawCardsStack: safeQuerySelectorAll('.drawCardsStack'),

    preventDocBeeingClicked: safeQuerySelector('#wait_for_other_player'),

    // Card buttons
    card1Buttons: safeQuerySelectorAll('#player1Card button'),
    card2Buttons: safeQuerySelectorAll('#player2Card button'),
    allCardButtons: [safeQuerySelectorAll('#player1Card button'), safeQuerySelectorAll('#player2Card button')],

    // Arrow buttons
    arrleft: safeQuerySelector('#arrleft'),
    arrright: safeQuerySelector('#arrright')
};

// Backward compatibility - expose commonly used variables globally
// TODO: Gradually migrate away from these global variables
const {
    form1,
    form2,
    innerBar1,
    innerBar2,
    preventDocBeeingClicked,
    vMaxBtn,
    disBtn,
    weiBtn,
    cylBtn,
    powBtn,
    rpmBtn,
    vMaxBtn2,
    disBtn2,
    weiBtn2,
    cylBtn2,
    powBtn2,
    rpmBtn2,
    card1Buttons,
    card2Buttons,
    allCardButtons,
    arrleft,
    arrright
} = window.GameUI;

// Expose helper functions globally for backward compatibility
window.safeQuerySelector = safeQuerySelector;
window.safeQuerySelectorAll = safeQuerySelectorAll;
window.getSelector = getSelector;
window.showElements = showElements;
window.hideElements = hideElements;


const updateUICardElements = (deckSubstring, deckArray, deckposition) => {
    let cardValues = Object.values(deckArray[deckposition]),
        cardSelectors = [];
    chosenDeck = localStorage.getItem('chosenDeck');

    function pushElementsInCardSelectors(deckSubstring) {
        let selectorSubstrings = ['img', 'name', 'prop1', 'prop2', 'prop3', 'prop4',
                                 'prop5', 'prop6'];
        for (let i = 0; i < selectorSubstrings.length; i++) {
            let cardSelector = getSelector(selectorSubstrings[i] + deckSubstring);
            cardSelectors.push(cardSelector);
        }
    }

    pushElementsInCardSelectors(deckSubstring);

    if (Array.isArray(cardSelectors[0])) {
        if (cardSelectors[0] && cardSelectors[0].length > 0) {
            cardSelectors[0].forEach(e => {
                if (e && cardValues[0]) {
                    e.src = 'Images/' + chosenDeck +'/'+ cardValues[0] +'.jpg';
                }
            });
        }
        for(let i = 1; i < cardSelectors.length; i++) {
            if (cardSelectors[i] && cardSelectors[i].length > 0) {
                cardSelectors[i].forEach(e => {
                    if (e && cardValues[i] !== undefined) {
                        e.textContent = cardValues[i];
                    }
                });
            }
        }
    } else {
        if (cardSelectors[0] && cardValues[0]) {
            cardSelectors[0].src = 'Images/' + chosenDeck +'/'+ cardValues[0] + '.jpg';
        }
        for(let i = 1; i < cardSelectors.length; i++) {
            if (cardSelectors[i] && cardValues[i] !== undefined) {
                cardSelectors[i].textContent = cardValues[i];
            }
        }
    }
};    




document.addEventListener('DOMContentLoaded', function() {
    let counter = 0;
    const arrright = safeQuerySelector('#arrright');
    const arrleft = safeQuerySelector('#arrleft');
    const drawCards = window.drawDeck || [];
    
    if (arrright) {
        arrright.addEventListener('click', () => {
            if (counter < drawCards.length - 2) {
                counter += 2;
                updateUICardElements('DrawCard1', drawCards, counter);
                updateUICardElements('DrawCard2', drawCards, counter + 1);
            }
            
            if (counter === drawCards.length - 2) {
                if (arrright) arrright.style.display = 'none';
            }
            
            if (counter >= 2 && arrleft) {
                arrleft.style.display = 'block';
            }
        });
    }

    if (arrleft) {
        arrleft.addEventListener('click', () => {
            counter -= 2;
            updateUICardElements('DrawCard1', drawCards, counter);
            updateUICardElements('DrawCard2', drawCards, counter + 1);
            
            if (counter < drawCards.length - 2 && arrright) {
                arrright.style.display = 'block';
            }
            
            if (counter >= 2) {
                arrleft.style.display = 'block';
            } else if (counter === 0) {
                arrleft.style.display = 'none';
            }
        });
    }
});

function updateUIElements() {
    function updateDecks(deckArray, deckSubstring, HTMLElement, cardCount) {
        if (deckArray.length > 1) {
            if (cardCount) {
                cardCount.style.display = 'grid';
                cardCount.textContent = deckArray.length;
            }
            if (HTMLElement) {
                HTMLElement.style.display = 'grid';
            }
            updateUICardElements(deckSubstring, deckArray, 1);
        } else {
            if (cardCount) {
                cardCount.style.display = 'none';
            }
            if (HTMLElement) {
                HTMLElement.style.display = 'none';
            }
        }
    }

    function updateDrawCards() { 
        const deck = window.drawDeck || [];
        const arrright = safeQuerySelector('#arrright');
        const arrleft = safeQuerySelector('#arrleft');
        const drawCardsStack1 = safeQuerySelector('#drawCardsStack1');
        const drawCardsStack2 = safeQuerySelector('#drawCardsStack2');
        
        if (deck.length > 0) {
            updateUICardElements('DrawCard1', deck, 0);
            updateUICardElements('DrawCard2', deck, 1);
        }
        
        if (deck.length > 0 && deck.length <= 2) {
            hideElements(arrright, arrleft);
            showElements('grid', drawCardsStack1, drawCardsStack2);
        } else if (deck.length > 2) {
            if (arrright) arrright.style.display = 'block';
        } else if (deck.length === 0) {
            hideElements(drawCardsStack1, drawCardsStack2);
        }
    }
 
    updateUICardElements('CardPlayer1', play1Deck, 0);
    updateUICardElements('CardPlayer2', play2Deck, 0);    

    if (isPlayerOne) {
        updateDecks(play1Deck, 'Deck1', player1Deck, cardNumberp1);
    } else {
        updateDecks(play2Deck, 'Deck2', player2Deck, cardNumberp2);
    }

    updateDrawCards();
}
