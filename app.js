upDateCards();

startBtn.addEventListener('click', e => { 
e.preventDefault();
startGame();
kiPlay();

});

vMaxBtn.addEventListener('click', e => {
    e.preventDefault();
    popupHeader.textContent = 'Vmax!'
    animateVmax();
    // setTimeout(compvMax, 3000);


    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length ===0) {
        alert('Player 1 wins!')
    // } else {upDateCards();
        // setTimeout(upDateCards, 4000);

    }});

disBtn.addEventListener('click', e => {
    e.preventDefault();
    popupHeader.textContent = 'Hubraum!'
    animateDis();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        

    }});

weiBtn.addEventListener('click', e => {
    e.preventDefault();
    popupHeader.textContent = 'Gewicht!'
    animateWei();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        

    }});
    
cylBtn.addEventListener('click', e => {
    e.preventDefault();
    popupHeader.textContent = 'Zylinder!'
    animateCyl();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        

    }});

powBtn.addEventListener('click', e => {
    e.preventDefault();
    popupHeader.textContent = 'Leistung!'
    animatePow();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
    
}});


rpmBtn.addEventListener('click', e => {
    e.preventDefault();
    popupHeader.textContent = 'Umdrehungen pro Minute!'
    animateRpm();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {
        

    }});



vMaxBtn2.addEventListener('click', e => {
    e.preventDefault();
    compvMax();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {}
});

disBtn2.addEventListener('click', e => {
    e.preventDefault();
    compDisplace();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {}
});

weiBtn2.addEventListener('click', e => {
    e.preventDefault();
    compWeight();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {}
});
    
cylBtn2.addEventListener('click', e => {
    e.preventDefault();
    compCyli();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {}
});

powBtn2.addEventListener('click', e => {
    e.preventDefault();
    compPow();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {}
});

rpmBtn2.addEventListener('click', e => {
    e.preventDefault();
    compRpm();
    if (play1Deck.length === 0) {
        alert('Player 2 wins');
    } else if (play2Deck.length === 0) {
        alert('Player 1 wins!')
    } else {}
});

