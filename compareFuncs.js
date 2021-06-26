const compvMax = () => {
    if ( play1Deck[0].vMax > play2Deck[0].vMax) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].vMax < play2Deck[0].vMax) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].vMax === play2Deck[0].vMax) {
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
    } else if ( play1Deck[0].power < play2Deck[0].power) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].power === play2Deck[0].power) {
        console.log(' its a draw');
    }
 };



const compAcc = () => {
    if ( play1Deck[0].acc > play2Deck[0].acc) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].acc < play2Deck[0].acc) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].acc === play2Deck[0].acc) {
        console.log(' its a draw');
    }
};

const compReach = () => {
    if ( play1Deck[0].reach > play2Deck[0].reach) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].reach < play2Deck[0].reach) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].reach === play2Deck[0].reach) {
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
    } else if ( play1Deck[0].weight > play2Deck[0].weight) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].weight === play2Deck[0].weight) {
        console.log(' its a draw');
    }
};

const compPrice = () => {
    if ( play1Deck[0].price < play2Deck[0].price) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].price > play2Deck[0].price) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(play1Deck);
        console.log(play2Deck);
    } else if ( play1Deck[0].price === play2Deck[0].price) {
        console.log(' its a draw');
    }
};