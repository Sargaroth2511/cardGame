// Card 1 Selectors

const imgCardPlayer1 = [...document.querySelectorAll ('.img1')];
const nameCardPlayer1 = [...document.querySelectorAll ('.n1')];
const prop1CardPlayer1 = [...document.querySelectorAll ('.vMax1')];
const prop2CardPlayer1 = [...document.querySelectorAll ('.dis1')];
const prop3CardPlayer1 = [...document.querySelectorAll ('.wei1')];
const prop4CardPlayer1 = [...document.querySelectorAll ('.cyl1')];
const prop5CardPlayer1 = [...document.querySelectorAll ('.pow1')];
const prop6CardPlayer1 = [...document.querySelectorAll ('.rpm1')];

const deck1Cards = document.querySelector ('#play1Cards');

const card1Buttons = document.querySelectorAll ('#player1Card button'),
      card2Buttons = document.querySelectorAll ('#player2Card button'),
      allCardButtons = [card1Buttons, card2Buttons];


// Card 2 Selectors

const imgCardPlayer2 = [...document.querySelectorAll ('.img2')];
const nameCardPlayer2 = [...document.querySelectorAll ('.n2')];
const prop1CardPlayer2 = [...document.querySelectorAll ('.vMax2')];
const prop2CardPlayer2 = [...document.querySelectorAll ('.dis2')];
const prop3CardPlayer2 = [...document.querySelectorAll ('.wei2')];
const prop4CardPlayer2 = [...document.querySelectorAll ('.cyl2')];
const prop5CardPlayer2 = [...document.querySelectorAll ('.pow2')];
const prop6CardPlayer2= [...document.querySelectorAll ('.rpm2')];

const deck2Cards = document.querySelector ('#play2Cards');


// Draw Card Selectors

const imgDrawCard1 = document.querySelector ('.imgdraw');
const nameDrawCard1 = document.querySelector ('.ndraw');
const prop1DrawCard1 = document.querySelector ('.vMaxdraw');
const prop2DrawCard1 = document.querySelector ('.disdraw');
const prop3DrawCard1 = document.querySelector ('.weidraw');
const prop4DrawCard1 = document.querySelector ('.cyldraw');
const prop5DrawCard1 = document.querySelector ('.powdraw');
const prop6DrawCard1= document.querySelector ('.rpmdraw');

const imgDrawCard2 = document.querySelector ('.imgdraw2');
const nameDrawCard2 = document.querySelector ('.ndraw2');
const prop1DrawCard2 = document.querySelector ('.vMaxdraw2');
const prop2DrawCard2 = document.querySelector ('.disdraw2');
const prop3DrawCard2 = document.querySelector ('.weidraw2');
const prop4DrawCard2 = document.querySelector ('.cyldraw2');
const prop5DrawCard2 = document.querySelector ('.powdraw2');
const prop6DrawCard2 = document.querySelector ('.rpmdraw2');

const arrleft = document.querySelector('#arrleft')
const arrright = document.querySelector('#arrright')


// Deck Selectors

let imgDeck1 = [...document.getElementsByClassName ('imgd1')];
let nameDeck1 = [...document.getElementsByClassName ('nd1')];
let prop1Deck1 = [...document.getElementsByClassName ('vMaxd1')];
let prop2Deck1 = [...document.getElementsByClassName ('disd1')];
let prop3Deck1 = [...document.getElementsByClassName ('weid1')];
let prop4Deck1 = [...document.getElementsByClassName ('cyld1')];
let prop5Deck1 = [...document.getElementsByClassName ('powd1')];
let prop6Deck1 = [...document.getElementsByClassName ('rpmd1')];

const imgDeck2 = [...document.getElementsByClassName ('imgd2')];
const nameDeck2 = [...document.getElementsByClassName ('nd2')];
const prop1Deck2 = [...document.getElementsByClassName ('vMaxd2')];
const prop2Deck2 = [...document.getElementsByClassName ('disd2')];
const prop3Deck2 = [...document.getElementsByClassName ('weid2')];
const prop4Deck2 = [...document.getElementsByClassName ('cyld2')];
const prop5Deck2 = [...document.getElementsByClassName ('powd2')];
const prop6Deck2 = [...document.getElementsByClassName ('rpmd2')];

let imgMovingCard = document.querySelectorAll ('.imgm1');
let nameMovingCard = document.querySelectorAll ('.nm1');
let prop1MovingCard = document.querySelectorAll ('.vMaxm1');
let prop2MovingCard = document.querySelectorAll ('.dism1');
let prop3MovingCard = document.querySelectorAll ('.weim1');
let prop4MovingCard = document.querySelectorAll ('.cylm1');
let prop5MovingCard = document.querySelectorAll ('.powm1');
let prop6MovingCard = document.querySelectorAll ('.rpmm1');

const imgMovingCardContainer = document.querySelector ('.imgmc');
const nameMovingCardContainer = document.querySelector ('.nmc');
const prop1MovingCardContainer = document.querySelector ('.vMaxmc');
const prop2MovingCardContainer = document.querySelector ('.dismc');
const prop3MovingCardContainer = document.querySelector ('.weimc');
const prop4MovingCardContainer = document.querySelector ('.cylmc');
const prop5MovingCardContainer = document.querySelector ('.powmc');
const prop6MovingCardContainer = document.querySelector ('.rpmmc');

// Button Selectors

const vMaxBtn = document.querySelector ('#vmaxbtn1');
const disBtn = document.querySelector ('#disbtn1');
const weiBtn = document.querySelector ('#weibtn1');
const cylBtn = document.querySelector ('#cylbtn1');
const powBtn = document.querySelector ('#powbtn1');
const rpmBtn = document.querySelector ('#rpmbtn1');

const vMaxBtn2 = document.querySelector ('#vmaxbtn2');
const disBtn2 = document.querySelector ('#disbtn2');
const weiBtn2 = document.querySelector ('#weibtn2');
const cylBtn2 = document.querySelector ('#cylcbtn2');
const powBtn2 = document.querySelector ('#powbtn2');
const rpmBtn2 = document.querySelector ('#rpmbtn2');


const drawfield = document.querySelector ('#drawcardcnt');
const scoreHTML = document.querySelector ('#score')
const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");


const innerBar1 = document.querySelector('#innerbar1');
const innerBar2 = document.querySelector('#innerbar2');
const innerBars = document.querySelectorAll('.innerbar');  
const compPopupOuter = document.querySelector('#popupouter')
const compPopup = document.querySelector('#comp_popupinner');
const closeBtn = document.querySelector('#closebtn');
const popupHeader = document.querySelector('h3');

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

    pushElementsInCardSelectors(deckSubstring);

    if (Array.isArray(cardSelectors[0])){
        cardSelectors[0].forEach(e => e.src = 'Images/' + chosenDeck +'/'+ cardValues[0] +'.jpg');
        for(let i = 1; i < cardSelectors.length; i ++){
            cardSelectors[i].forEach(e => e.textContent = cardValues[i]);
        };
    } else {
        cardSelectors[0].src = 'Images/' + chosenDeck +'/'+ cardValues[0] + '.jpg';
        for(let i = 1; i < cardSelectors.length; i ++){
            cardSelectors[i].textContent = cardValues[i];
        };
    };

    function pushElementsInCardSelectors (deckSubstring){
        let selectorSubstrings = ['img', 'name', 'prop1', 'prop2', 'prop3', 'prop4', 
                                 'prop5', 'prop6'];
        for (let i = 0; i < selectorSubstrings.length; i++){
            let cardSelector = parse(selectorSubstrings[i] + deckSubstring);
            cardSelectors.push(cardSelector);
        };

    };
};    




(function (){
    let counter = 0;

    arrright.addEventListener('click', () => {
        if (counter < drawCards.length-2){
            counter += 2;
            updateUICardElements('DrawCard1', drawCards, counter);
            updateUICardElements('DrawCard2', drawCards, counter+1);
        }; 
        if (counter === drawCards.length-2){
            arrright.style.display = 'none';
        };
        if (counter >= 2){
            arrleft.style.display = 'block';
        };        
    });   
    
    arrleft.addEventListener('click', () => {
        counter -= 2;
        updateUICardElements('DrawCard1', drawCards, counter);
        updateUICardElements('DrawCard2', drawCards, counter+1);
        
        if (counter < drawCards.length-2){
            arrright.style.display = 'block';
        };
        if (counter >= 2){
            arrleft.style.display = 'block';
        } else if (counter === 0){
            arrleft.style.display = 'none';
        };      
    });   
})();


const updateUIElements = () => {
 
    updateUICardElements('CardPlayer1', play1Deck, 0);
    updateUICardElements('CardPlayer2', play2Deck, 0);    

    isPlayerOne ? updateDecks (play1Deck, 'Deck1', player1Deck, cardNumberp1):
                  updateDecks (play2Deck, 'Deck2', player2Deck, cardNumberp2);

    updateDrawCards();              

    function updateDecks (deckArray, deckSubstring, HTMLElement, cardCount){
        if (deckArray.length > 1){
            cardCount.style.display = 'grid';
            cardCount.textContent = deckArray.length;
            HTMLElement.style.display = 'grid';
            updateUICardElements(deckSubstring, deckArray, 1)
        } else {
            cardCount.style.display = 'none';
            HTMLElement.style.display = 'none';
        };
    };    

    function updateDrawCards (){ 
        if (drawCards.length > 0){
            updateUICardElements('DrawCard1', drawCards, 0);
            updateUICardElements('DrawCard2', drawCards, 1);
        };
        if (drawCards.length > 0 && drawCards.length <= 2){
            arrright.style.display = 'none';
            arrleft.style.display = 'none';
            drawCardsStack1.style.display = 'grid';
            drawCardsStack2.style.display = 'grid';
        } else if (drawCards.length > 2){
            arrright.style.display = 'block';
        } else if (drawCards.length === 0) {
            drawCardsStack1.style.display = 'none';
            drawCardsStack2.style.display = 'none';
        };   
    }; 
};

