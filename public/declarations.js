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
    'prop6Deck2': [...document.getElementsByClassName('rpmd2')],

    // Moving Card selectors
    'imgMovingCard': document.querySelectorAll('.imgm1'),
    'nameMovingCard': document.querySelectorAll('.nm1'),
    'prop1MovingCard': document.querySelectorAll('.vMaxm1'),
    'prop2MovingCard': document.querySelectorAll('.dism1'),
    'prop3MovingCard': document.querySelectorAll('.weim1'),
    'prop4MovingCard': document.querySelectorAll('.cylm1'),
    'prop5MovingCard': document.querySelectorAll('.powm1'),
    'prop6MovingCard': document.querySelectorAll('.rpmm1')
};

// Safe replacement for the dangerous parse() function
function getSelector(selectorName) {
    if (selectorMap.hasOwnProperty(selectorName)) {
        return selectorMap[selectorName];
    } else {
        console.warn(`Selector '${selectorName}' not found in selectorMap`);
        return null;
    }
}

// Direct access selectors (not used in dynamic mapping)
const deck1Cards = document.querySelector('#play1Cards');
const deck2Cards = document.querySelector('#play2Cards');

const card1Buttons = document.querySelectorAll('#player1Card button'),
      card2Buttons = document.querySelectorAll('#player2Card button'),
      allCardButtons = [card1Buttons, card2Buttons];

const arrleft = document.querySelector('#arrleft');
const arrright = document.querySelector('#arrright');

// Moving Card containers
const imgMovingCardContainer = document.querySelector('.imgmc');
const nameMovingCardContainer = document.querySelector('.nmc');
const prop1MovingCardContainer = document.querySelector('.vMaxmc');
const prop2MovingCardContainer = document.querySelector('.dismc');
const prop3MovingCardContainer = document.querySelector('.weimc');
const prop4MovingCardContainer = document.querySelector('.cylmc');
const prop5MovingCardContainer = document.querySelector('.powmc');
const prop6MovingCardContainer = document.querySelector('.rpmmc');

// Button Selectors
const vMaxBtn = document.querySelector('#vmaxbtn1');
const disBtn = document.querySelector('#disbtn1');
const weiBtn = document.querySelector('#weibtn1');
const cylBtn = document.querySelector('#cylbtn1');
const powBtn = document.querySelector('#powbtn1');
const rpmBtn = document.querySelector('#rpmbtn1');

const vMaxBtn2 = document.querySelector('#vmaxbtn2');
const disBtn2 = document.querySelector('#disbtn2');
const weiBtn2 = document.querySelector('#weibtn2');
const cylBtn2 = document.querySelector('#cylbtn2');
const powBtn2 = document.querySelector('#powbtn2');
const rpmBtn2 = document.querySelector('#rpmbtn2');

// UI Elements
const drawfield = document.querySelector('#drawcardcnt');
const scoreHTML = document.querySelector('#score');
const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');

const innerBar1 = document.querySelector('#innerbar1');
const innerBar2 = document.querySelector('#innerbar2');
const innerBars = document.querySelectorAll('.innerbar');
const compPopupOuter = document.querySelector('#popupouter');
const compPopup = document.querySelector('#comp_popupinner');
const closeBtn = document.querySelector('#closebtn');
const popupHeader = document.querySelector('h3');

// Waiting/Shuffle overlay and misc UI
const waitshufflePopouter = document.querySelector('#waitshufflePopouter');
const waiting = document.querySelector('#waiting');
const whostarts = document.querySelector('#whostarts');
const startgame = document.querySelector('#startgame');
const player1Cover = document.querySelector('#player1Cover');
const player2Cover = document.querySelector('#player2Cover');
const player1Deck = document.querySelector('#player1Deck');
const player2Deck = document.querySelector('#player2Deck');
const cardNumberp1 = document.querySelector('#cardNumberp1');
const cardNumberp2 = document.querySelector('#cardNumberp2');
const animatedpoints = document.querySelector('#animatedpoints');
const waitBackbtn = document.querySelector('#waitBackbtn');

// Primary card containers and comparison bars
const player1Card = document.querySelector('#player1Card');
const player2Card = document.querySelector('#player2Card');
const compbar1 = document.querySelector('#compbar1');
const compbar2 = document.querySelector('#compbar2');

// Animated comparison cards
const animatedCardp1 = document.querySelector('#animatedCard1');
const animatedCardp2 = document.querySelector('#animatedCard2');

// Endgame popup
const endgameouter = document.querySelector('#endgameouter');
const whoWins = document.querySelector('#whoWins');
const endgamebacktn = document.querySelector('#endgamebacktn');
const newGame = document.querySelector('#newGame');

// Player/opponent name labels
const player2Name = document.querySelector('#player2Name');

// Auth/name popups
const nameOuter2 = document.querySelector('#nameOuter2');
const signInOuter2 = document.querySelector('#signInOuter2');
const nameForm = document.querySelector('#nameForm');
const nameBackbtn = document.querySelector('#nameBackbtn');

const animationCard1 = document.querySelector('.animationCard1')
const animationCard2 = document.querySelector('.animationCard2')

const drawCardsStack1 = document.querySelector('#drawCardsStack1')
const drawCardsStack2 = document.querySelector('#drawCardsStack2')
const drawCardsStack = document.querySelectorAll('.drawCardsStack')

const preventDocBeeingClicked = document.querySelector('#wait_for_other_player')


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
        cardSelectors[0].forEach(e => e.src = 'Images/' + chosenDeck +'/'+ cardValues[0] +'.jpg');
        for(let i = 1; i < cardSelectors.length; i++) {
            cardSelectors[i].forEach(e => e.textContent = cardValues[i]);
        }
    } else {
        cardSelectors[0].src = 'Images/' + chosenDeck +'/'+ cardValues[0] + '.jpg';
        for(let i = 1; i < cardSelectors.length; i++) {
            cardSelectors[i].textContent = cardValues[i];
        }
    }
};    




document.addEventListener('DOMContentLoaded', function() {
    let counter = 0;
    const arrright = document.querySelector('#arrowright');
    const arrleft = document.querySelector('#arrleft');
    const drawCards = window.drawDeck || [];
    
    if (arrright) {
        arrright.addEventListener('click', () => {
            if (counter < drawCards.length - 2) {
                counter += 2;
                updateUICardElements('DrawCard1', drawCards, counter);
                updateUICardElements('DrawCard2', drawCards, counter + 1);
            }
            
            if (counter === drawCards.length - 2) {
                arrright.style.display = 'none';
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
        const arrright = document.querySelector('#arrowright');
        const arrleft = document.querySelector('#arrleft');
        const drawCardsStack1 = document.querySelector('#drawCardsStack1');
        const drawCardsStack2 = document.querySelector('#drawCardsStack2');
        
        if (deck.length > 0) {
            updateUICardElements('DrawCard1', deck, 0);
            updateUICardElements('DrawCard2', deck, 1);
        }
        
        if (deck.length > 0 && deck.length <= 2) {
            if (arrright) arrright.style.display = 'none';
            if (arrleft) arrleft.style.display = 'none';
            if (drawCardsStack1) drawCardsStack1.style.display = 'grid';
            if (drawCardsStack2) drawCardsStack2.style.display = 'grid';
        } else if (deck.length > 2) {
            if (arrright) arrright.style.display = 'block';
        } else if (deck.length === 0) {
            if (drawCardsStack1) drawCardsStack1.style.display = 'none';
            if (drawCardsStack2) drawCardsStack2.style.display = 'none';
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
