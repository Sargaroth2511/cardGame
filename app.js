// Card 1 Selectors

const img1 = document.querySelector ('#img1');
const cname1 = document.querySelector ('#n1');
const vMax1 = document.querySelector ('#vMax1');
const dis1 = document.querySelector ('#dis1');
const wei1 = document.querySelector ('#wei1');
const cyl1 = document.querySelector ('#cyl1');
const pow1 = document.querySelector ('#pow1');
const rpm1 = document.querySelector ('#rpm1');


// Card 2 Selectors

const img2 = document.querySelector ('#img2');
const cname2 = document.querySelector ('#n2');
const vMax2 = document.querySelector ('#vMax2');
const dis2 = document.querySelector ('#dis2');
const wei2 = document.querySelector ('#wei2');
const cyl2 = document.querySelector ('#cyl2');
const pow2 = document.querySelector ('#pow2');
const rpm2= document.querySelector ('#rpm2');

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

const upDateCards = () => {
img1.src = 'Images/' + play1Deck[0].id + '.jpg';  
cname1.textContent =play1Deck[0].name;
vMax1.textContent = play1Deck[0].vMax;
dis1.textContent = play1Deck[0].displace;
wei1.textContent = play1Deck[0].weight;
cyl1.textContent = play1Deck[0].cylinder;
pow1.textContent = play1Deck[0].power;
rpm1.textContent = play1Deck[0].rpm;
img2.src = 'Images/' + play2Deck[0].id + '.jpg';  
cname2.textContent =play2Deck[0].name;
vMax2.textContent = play2Deck[0].vMax;
dis2.textContent = play2Deck[0].displace;
wei2.textContent = play2Deck[0].weight;
cyl2.textContent = play2Deck[0].cylinder;
pow2.textContent = play2Deck[0].power;
rpm2.textContent = play2Deck[0].rpm;
};

upDateCards();



vMaxBtn.addEventListener('click', e => {
    e.preventDefault();
    compvMax();
    upDateCards();
});

accBtn.addEventListener('click', e => {
    e.preventDefault();
    compDisplace();
    upDateCards();
});

weiBtn.addEventListener('click', e => {
    e.preventDefault();
    compWeight();
    upDateCards();
});
    
reacBtn.addEventListener('click', e => {
    e.preventDefault();
    compCyli();
    upDateCards();
});

powBtn.addEventListener('click', e => {
    e.preventDefault();
    compPow();
    upDateCards();
});


priBtn.addEventListener('click', e => {
    e.preventDefault();
    compRpm();
    upDateCards();
});



vMaxBtn2.addEventListener('click', e => {
    e.preventDefault();
    compvMax();
    upDateCards();
});

accBtn2.addEventListener('click', e => {
    e.preventDefault();
    compDisplace();
    upDateCards();
});

weiBtn2.addEventListener('click', e => {
    e.preventDefault();
    compWeight();
    upDateCards();
});
    
reacBtn2.addEventListener('click', e => {
    e.preventDefault();
    compCyli();
    upDateCards();
});

powBtn2.addEventListener('click', e => {
    e.preventDefault();
    compPow();
    upDateCards();
});

priBtn2.addEventListener('click', e => {
    e.preventDefault();
    compRpm();
    upDateCards();
});

