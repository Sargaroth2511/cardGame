// Index Selectors
const selDecksBackbtn = document.querySelector('#choosedeck #choose-deck-backbtn');
const onlineBackbtn = document.querySelector('#CPUorMulit-backtn');
const difBackbtn = document.querySelector('#difficulty-backbtn')

const chooseDeckPopout = document.querySelector ('#choose-deck-popout');
const onlinePopout =document.querySelector ('#choose-multi-or-cpu')
const difPopout = document.querySelector ('#choose-difficulty')

const startForm = document.querySelector ('#startform');
const deckForm = document.querySelector ('#deck-form');
const onlineForm = document.querySelector ('#CPUorMulti-form')
const difform = document.querySelector ('#difficulty-form')



selDecksBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    chooseDeckPopout.style.display = 'none';
    difPopout.style.display = 'grid';
});

onlineBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    onlinePopout.style.display = 'none';
});

difBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    onlinePopout.style.display = 'grid';
    difPopout.style.display = 'none'; 
});



startForm.addEventListener ('click', e => {
   if(e.target.defaultValue === 'Neues Spiel') {
       onlinePopout.style.display = 'grid'
   }
   if(e.target.defaultValue ==='Schnelles Spiel') {
       if (localStorage.getItem('online?', 'CPU')) {
           window.location.replace(`${localStorage.getItem('chosenDeck')}.html`)
        } else {console.log(localStorage.getItem('online?'))}
   }    
});

deckForm.addEventListener ('submit', e => {
    e.preventDefault();
    window.location.replace(`${deckForm.Deck.value}.html`);
    localStorage.setItem('chosenDeck', deckForm.Deck.value);
});

onlineForm.addEventListener ('submit', e => {
    e.preventDefault();
    localStorage.setItem('online?', onlineForm.CPUorMulti.value);
    if(onlineForm.CPUorMulti.value === 'CPU') {
        difPopout.style.display = 'grid'
        onlinePopout.style.display = 'none';

    }
    if(onlineForm.CPUorMulti.value ==='Online') {
        alert('Diese Funktion ist noch nicht verfügbar');
    }
 });

 difform.addEventListener ('submit', e => {
    e.preventDefault();
    localStorage.setItem('difficulty', difform.Difficulty.value);    
    difPopout.style.display = 'none'
    chooseDeckPopout.style.display = 'grid';
    
 });