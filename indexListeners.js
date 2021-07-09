// Index Selectors
const selDecksBackbtn = document.querySelector('#choosedeck #choose-deck-backbtn');
const chooseDeckPopout = document.querySelector ('#choose-deck-popout');
const startForm = document.querySelector ('#startform');
const deckForm = document.querySelector ('#deck-form');
let chosenDeck = '';

let lastGame = {
    deck: 'luxCarGame',
    difficulty : 'easy',
    online : false

}

selDecksBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    chooseDeckPopout.style.display = 'none';
});



startForm.addEventListener ('click', e => {
   if(e.target.defaultValue === 'Neues Spiel') {
       chooseDeckPopout.style.display = 'grid'
   }
   if(e.target.defaultValue ==='Schnelles Spiel') {
       window.location.replace(`${lastGame.deck}.html`)
   }
});

deckForm.addEventListener ('submit', e => {
    e.preventDefault();
    chosenDeck = deckForm.Deck.value
    window.location.replace(`${chosenDeck}.html`)
});