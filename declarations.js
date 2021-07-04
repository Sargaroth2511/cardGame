// Card 1 Selectors

const img1 = document.querySelector ('#img1');
const cname1 = document.querySelector ('#n1');
const vMax1 = document.querySelector ('#vMax1');
const dis1 = document.querySelector ('#dis1');
const wei1 = document.querySelector ('#wei1');
const cyl1 = document.querySelector ('#cyl1');
const pow1 = document.querySelector ('#pow1');
const rpm1 = document.querySelector ('#rpm1');
const deck1Cards = document.querySelector ('#play1Cards');


// Card 2 Selectors

const img2 = document.querySelector ('#img2');
const cname2 = document.querySelector ('#n2');
const vMax2 = document.querySelector ('#vMax2');
const dis2 = document.querySelector ('#dis2');
const wei2 = document.querySelector ('#wei2');
const cyl2 = document.querySelector ('#cyl2');
const pow2 = document.querySelector ('#pow2');
const rpm2= document.querySelector ('#rpm2');
const deck2Cards = document.querySelector ('#play2Cards');

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
const startBtn = document.querySelector ('#startgame')
const form1 = document.querySelector("#form1")
const elements1 = form1.elements;

const form2 = document.querySelector("#form2")
const elements2 = form2.elements;

const innerBar1 = document.querySelector('#innerbar1');
const innerBar2 = document.querySelector('#innerbar2');

const compPopupOuter =document.querySelector('#comp_popupouter')
const compPopup = document.querySelector('#comp_popupinner');
const closeBtn = document.querySelector('#closebtn');
const popupHeader = document.querySelector('h3');

const nexTurn = () => {
    compPopup.style.display = 'none';
    compPopupOuter.style.display = 'none';
    innerBar1.textContent = '0';
    innerBar2.textContent = '0';
    innerBar1.style.width = '0';
    innerBar2.style.width = '0';
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length ===0) {
        alert('Player 1 wins!')
    } else {    
        upDateCards();
        kiPlay();
}};

compPopupOuter.addEventListener ('click', e => {
    e.preventDefault();
    nexTurn();
});

const drawCards = [];

const upDateCards = () => {
    img1.src = 'Images/' + play1Deck[0].id + '.jpg';  
    cname1.textContent =play1Deck[0].name;
    vMax1.textContent = play1Deck[0].vMax;
    dis1.textContent = play1Deck[0].displace;
    wei1.textContent = play1Deck[0].weight;
    cyl1.textContent = play1Deck[0].cylinder;
    pow1.textContent = play1Deck[0].power;
    rpm1.textContent = play1Deck[0].rpm;
    deck1Cards.innerHTML = `Deck <br>${play1Deck.length} <br>Cards`
    img2.src = 'Images/' + play2Deck[0].id + '.jpg';  
    cname2.textContent =play2Deck[0].name;
    vMax2.textContent = play2Deck[0].vMax;
    dis2.textContent = play2Deck[0].displace;
    wei2.textContent = play2Deck[0].weight;
    cyl2.textContent = play2Deck[0].cylinder;
    pow2.textContent = play2Deck[0].power;
    rpm2.textContent = play2Deck[0].rpm;
    deck2Cards.innerHTML = `Deck <br>${play2Deck.length} <br>Cards`
    drawfield.textContent = drawCards.length;
};