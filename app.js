// Card 1 Selectors

const img1 = document.querySelector ('#img1');
const cname1 = document.querySelector ('#n1');
const vMax1 = document.querySelector ('#vMax1');
const power1 = document.querySelector ('#pow1');
const acc1 = document.querySelector ('#acc1');
const reach1 = document.querySelector ('#reach1');
const weight1 = document.querySelector ('#weight1');
const price1 = document.querySelector ('#price1');


// Card 2 Selectors

const img2 = document.querySelector ('#img2');
const cname2 = document.querySelector ('#n2');
const vMax2 = document.querySelector ('#vMax2');
const power2 = document.querySelector ('#pow2');
const acc2 = document.querySelector ('#acc2');
const reach2 = document.querySelector ('#reach2');
const weight2 = document.querySelector ('#weight2');
const price2= document.querySelector ('#price2');


// Button Selectors

const vMaxBtn = document.querySelector ('#vmaxbtn1');
const powBtn = document.querySelector ('#powbtn1');
const accBtn = document.querySelector ('#accbtn1');
const reacBtn = document.querySelector ('#reacbtn1');
const weiBtn = document.querySelector ('#weibtn1');
const priBtn = document.querySelector ('#pribtn1');

const vMaxBtn2 = document.querySelector ('#vmaxbtn2');
const powBtn2 = document.querySelector ('#powbtn2');
const accBtn2 = document.querySelector ('#accbtn2');
const reacBtn2 = document.querySelector ('#reacbtn2');
const weiBtn2 = document.querySelector ('#weibtn2');
const priBtn2 = document.querySelector ('#pribtn2');


img1.src = 'Images/' + play1Deck[0].id + '.jpg';  
cname1.textContent =play1Deck[0].name;
vMax1.textContent = play1Deck[0].vMax;
power1.textContent = play1Deck[0].power;
acc1.textContent = play1Deck[0].acc;
reach1.textContent = play1Deck[0].reach;
weight1.textContent = play1Deck[0].weight;
price1.textContent = play1Deck[0].price;

img2.src = 'Images/' + play2Deck[0].id + '.jpg';  
cname2.textContent =play2Deck[0].name;
vMax2.textContent = play2Deck[0].vMax;
power2.textContent = play2Deck[0].power;
acc2.textContent = play2Deck[0].acc;
reach2.textContent = play2Deck[0].reach;
weight2.textContent = play2Deck[0].weight;
price2.textContent = play2Deck[0].price;

vMaxBtn.addEventListener('click', e => {
    e.preventDefault();
    compvMax();
});

powBtn.addEventListener('click', e => {
    e.preventDefault();
    compPow();
});

accBtn.addEventListener('click', e => {
    e.preventDefault();
    compAcc();
});

reacBtn.addEventListener('click', e => {
    e.preventDefault();
    compReach();
});

weiBtn.addEventListener('click', e => {
    e.preventDefault();
    compWeight();
});

priBtn.addEventListener('click', e => {
    e.preventDefault();
    compPrice();
});


vMaxBtn2.addEventListener('click', e => {
    e.preventDefault();
    compvMax();
});

powBtn2.addEventListener('click', e => {
    e.preventDefault();
    compPow();
});

accBtn2.addEventListener('click', e => {
    e.preventDefault();
    compAcc();
});

reacBtn2.addEventListener('click', e => {
    e.preventDefault();
    compReach();
});

weiBtn2.addEventListener('click', e => {
    e.preventDefault();
    compWeight();
});

priBtn2.addEventListener('click', e => {
    e.preventDefault();
    compPrice();
});

console.log(play1Deck);






