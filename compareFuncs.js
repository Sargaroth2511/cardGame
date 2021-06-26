const form1 = document.querySelector("#form1")
const elements1 = form1.elements;

const form2 = document.querySelector("#form2")
const elements2 = form2.elements;

const play1sturne = () => {
    for (let ii = 0, len1 = elements1.length; ii < len1; ++ii) {
    elements1[ii].disabled = false;
    };
    for (let i = 0, len2 = elements2.length; i < len2; ++i) {
    elements2[i].disabled = true;
    };
};


const play2sturne = () => {
    for (let i = 0, len2 = elements2.length; i < len2; ++i) {
    elements2[i].disabled = false;
    };
    for (let ii = 0, len1 = elements1.length; ii < len1; ++ii) {
        elements1[ii].disabled = true;
    };
};






const compvMax = () => {
    if ( play1Deck[0].vMax > play2Deck[0].vMax) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play1sturne();
    } else if ( play1Deck[0].vMax < play2Deck[0].vMax) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play2sturne();
    } else if ( play1Deck[0].vMax === play2Deck[0].vMax) {
        console.log(' its a draw');
    }
};

const compDisplace = () => {
    if ( play1Deck[0].displace < play2Deck[0].displace) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play1sturne();
    } else if ( play1Deck[0].displace > play2Deck[0].displace) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play2sturne();
    } else if ( play1Deck[0].displace === play2Deck[0].displace) {
        console.log(' its a draw');
    }
 };

 const compWeight = () => {
    if ( play1Deck[0].weight < play2Deck[0].weight) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play1sturne();
    } else if ( play1Deck[0].weight > play2Deck[0].weight) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play2sturne();
    } else if ( play1Deck[0].weight === play2Deck[0].weight) {
        console.log(' its a draw');
    }
};

const compCyli = () => {
    if ( play1Deck[0].cylinder > play2Deck[0].cylinder) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play1sturne();
    } else if ( play1Deck[0].cylinder < play2Deck[0].cylinder) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play2sturne();
    } else if ( play1Deck[0].cylinder === play2Deck[0].cylinder) {
        console.log(' its a draw');
    }
};

const compPow = () => {
    if ( play1Deck[0].power > play2Deck[0].power) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play1sturne();
    } else if ( play1Deck[0].power< play2Deck[0].power) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play2sturne();
    } else if ( play1Deck[0].power === play2Deck[0].power) {
        console.log(' its a draw');
    }
};


const compRpm = () => {
    if ( play1Deck[0].rpm > play2Deck[0].rpm) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play1sturne();
    } else if ( play1Deck[0].rpm < play2Deck[0].rpm) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
        play2sturne();
    } else if ( play1Deck[0].rpm === play2Deck[0].rpm) {
        console.log(' its a draw');
    }
};