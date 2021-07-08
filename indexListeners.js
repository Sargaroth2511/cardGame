// Index Selectors
const selDecksBackbtn = document.querySelector('#choosedeck .backbtn');
const chooseDeckPopout = document.querySelector ('#choose-deck-popout');
const startForm = document.querySelector ('#startform');
const deckForm = document.querySelector ('#deck-form');
let chosenDeck = '';

selDecksBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    chooseDeckPopout.style.display = 'none';
});

startForm.addEventListener ('click', e => {
   if(e.target.defaultValue === 'Neues Spiel') {
       chooseDeckPopout.style.display = 'grid'
   }
});

deckForm.addEventListener ('submit', e => {
    e.preventDefault();
    chosenDeck = deckForm.Deck.value
    window.location.replace(`${chosenDeck}.html`)
});