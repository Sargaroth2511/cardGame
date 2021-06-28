upDateCards();

startBtn.addEventListener('click', e => { 
e.preventDefault();
startGame();
setInterval (kiPlay, 5000);
upDateCards();
});

vMaxBtn.addEventListener('click', e => {
    e.preventDefault();
    compvMax();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length ===0) {
        alert('Player 1 wins!')
    } else {
        upDateCards();

    }});

disBtn.addEventListener('click', e => {
    e.preventDefault();
    compDisplace();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        upDateCards();

    }});

weiBtn.addEventListener('click', e => {
    e.preventDefault();
    compWeight();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        upDateCards();

    }});
    
cylBtn.addEventListener('click', e => {
    e.preventDefault();
    compCyli();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        upDateCards();

    }});

powBtn.addEventListener('click', e => {
    e.preventDefault();
    compPow();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
    upDateCards();
}});


rpmBtn.addEventListener('click', e => {
    e.preventDefault();
    compRpm();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        upDateCards();

    }});



vMaxBtn2.addEventListener('click', e => {
    e.preventDefault();
    compvMax();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {upDateCards();}
});

disBtn2.addEventListener('click', e => {
    e.preventDefault();
    compDisplace();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {upDateCards();}
});

weiBtn2.addEventListener('click', e => {
    e.preventDefault();
    compWeight();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {upDateCards();}
});
    
cylBtn2.addEventListener('click', e => {
    e.preventDefault();
    compCyli();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {upDateCards();}
});

powBtn2.addEventListener('click', e => {
    e.preventDefault();
    compPow();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {upDateCards();}
});

rpmBtn2.addEventListener('click', e => {
    e.preventDefault();
    compRpm();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {upDateCards();}
});

