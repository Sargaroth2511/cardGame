const animateVmax2 = async () => {
    let x = ((play2Deck[0].vMax / 450) * 100);
    let barwidth2 = Math.round(x);   
    let output = 0;
    let timer2 = setInterval(() => {
       innerBar2.style.width = `${output}%`;
       if (output === barwidth2){
           clearInterval(timer2);
           innerBar2.textContent = `${play2Deck[0].vMax} km/h`
           compvMax();
       } else {
           output ++;
       }
   }, 15);
   console.log(barwidth2, play2Deck[0].vMax);
};

const animateVmax = async () => {
    compPopup.style.display = 'flex';
    compPopupOuter.style.display = 'flex';
    let x = ((play1Deck[0].vMax / 450) * 100);
    let barwidth1 = Math.round(x);   
    let output = 0;
    let timer1 = setInterval(() => {
       innerBar1.style.width = `${output}%`;
       if (output === barwidth1){
           clearInterval(timer1);
           innerBar1.textContent = `${play1Deck[0].vMax} km/h`
           animateVmax2();

       } else {
           output ++;
       }
   }, 15);

   console.log('barwidth1' ,barwidth1, play1Deck[0].vMax);
};



const animateDis2 = async () => {
    let x = ((play2Deck[0].displace / 8500) * 100);
    let barwidth2 = Math.round(x);   
    let output = 0;
    let timer2 = setInterval(() => {
       innerBar2.style.width = `${output}%`;
       if (output === barwidth2){
           clearInterval(timer2);
           innerBar2.textContent = `${play2Deck[0].displace} ccm`
           compDisplace();
       } else {
           output ++;
       }
   }, 15);
   console.log(barwidth2, play2Deck[0].displace);
};

const animateDis = async () => {
     compPopup.style.display = 'flex';
     compPopupOuter.style.display = 'flex';
     let x = ((play1Deck[0].displace / 8500) * 100);
     let barwidth1 = Math.round(x);   
     let output = 0;
     let timer1 = setInterval(() => {
        innerBar1.style.width = `${output}%`;
        if (output === barwidth1){
            clearInterval(timer1);
            innerBar1.textContent = `${play1Deck[0].displace} ccm`
            animateDis2();

        } else {
            output ++;
        }
    }, 15);

    console.log('barwidth1' ,barwidth1, play1Deck[0].displace);
};


const animateWei2 = async () => {
    let x = ((play2Deck[0].weight / 3000) * 100);
    let barwidth2 = Math.round(x);   
    let output = 0;
    let timer2 = setInterval(() => {
       innerBar2.style.width = `${output}%`;
       if (output === barwidth2){
           clearInterval(timer2);
           innerBar2.textContent = `${play2Deck[0].weight} kg`
           compWeight();
       } else {
           output ++;
       }
   }, 15);
   console.log(barwidth2, play2Deck[0].weight);
};

const animateWei = async () => {
     compPopup.style.display = 'flex';
     compPopupOuter.style.display = 'flex';
     let x = ((play1Deck[0].weight / 3000) * 100);
     let barwidth1 = Math.round(x);   
     let output = 0;
     let timer1 = setInterval(() => {
        innerBar1.style.width = `${output}%`;
        if (output === barwidth1){
            clearInterval(timer1);
            innerBar1.textContent = `${play1Deck[0].weight} kg`
            animateWei2();

        } else {
            output ++;
        }
    }, 15);

    console.log('barwidth1' ,barwidth1, play1Deck[0].weight);
};


const animateCyl2 = async () => {
    let x = ((play2Deck[0].cylinder / 16) * 100);
    let barwidth2 = Math.round(x);   
    let output = 0;
    let timer2 = setInterval(() => {
       innerBar2.style.width = `${output}%`;
       if (output === barwidth2){
           clearInterval(timer2);
           innerBar2.textContent = `${play2Deck[0].cylinder} Zylinder`
           compCyli();
       } else {
           output ++;
       }
   }, 15);
   console.log(barwidth2, play2Deck[0].cylinder);
};

const animateCyl = async () => {
     compPopup.style.display = 'flex';
     compPopupOuter.style.display = 'flex';
     let x = ((play1Deck[0].cylinder / 16) * 100);
     let barwidth1 = Math.round(x);   
     let output = 0;
     let timer1 = setInterval(() => {
        innerBar1.style.width = `${output}%`;
        if (output === barwidth1){
            clearInterval(timer1);
            innerBar1.textContent = `${play1Deck[0].cylinder} Zylinder`
            animateCyl2();

        } else {
            output ++;
        }
    }, 15);

    console.log('barwidth1' ,barwidth1, play1Deck[0].cylinder);
};


const animatePow2 = async () => {
    let x = ((play2Deck[0].power / 1600) * 100);
    let barwidth2 = Math.round(x);   
    let output = 0;
    let timer2 = setInterval(() => {
       innerBar2.style.width = `${output}%`;
       if (output === barwidth2){
           clearInterval(timer2);
           innerBar2.textContent = `${play2Deck[0].power} PS`
           compPow();
       } else {
           output ++;
       }
   }, 15);
   console.log(barwidth2, play2Deck[0].power);
};

const animatePow = async () => {
     compPopup.style.display = 'flex';
     compPopupOuter.style.display = 'flex';
     let x = ((play1Deck[0].power / 1600) * 100);
     let barwidth1 = Math.round(x);   
     let output = 0;
     let timer1 = setInterval(() => {
        innerBar1.style.width = `${output}%`;
        if (output === barwidth1){
            clearInterval(timer1);
            innerBar1.textContent = `${play1Deck[0].power} PS`
            animatePow2();

        } else {
            output ++;
        }
    }, 15);

    console.log('barwidth1' ,barwidth1, play1Deck[0].power);
};


const animateRpm2 = async () => {
    let x = ((play2Deck[0].rpm / 9000) * 100);
    let barwidth2 = Math.round(x);   
    let output = 0;
    let timer2 = setInterval(() => {
       innerBar2.style.width = `${output}%`;
       if (output === barwidth2){
           clearInterval(timer2);
           innerBar2.textContent = `${play2Deck[0].rpm} U/min`
           compRpm();
       } else {
           output ++;
       }
   }, 15);
   console.log(barwidth2, play2Deck[0].rpm);
};

const animateRpm = async () => {
     compPopup.style.display = 'flex';
     compPopupOuter.style.display = 'flex';
     let x = ((play1Deck[0].rpm / 9000) * 100);
     let barwidth1 = Math.round(x);   
     let output = 0;
     let timer1 = setInterval(() => {
        innerBar1.style.width = `${output}%`;
        if (output === barwidth1){
            clearInterval(timer1);
            innerBar1.textContent = `${play1Deck[0].rpm} U/min`
            animateRpm2();

        } else {
            output ++;
        }
    }, 15);

    console.log('barwidth1' ,barwidth1, play1Deck[0].rpm);
};

const kiPlay = () => {
    let num = (Math.random() * elements2.length);
    if (vMaxBtn.disabled) {
        if (num < 1) {animateVmax();popupHeader.textContent = 'Vmax!';}
        else if (num >= 1 && num < 2) {animateDis();popupHeader.textContent = 'Hubraum!';}
        else if (num >= 2 && num < 3) {animateWei();popupHeader.textContent = 'Gewicht!';}
        else if (num >= 3 && num < 4) {animateCyl();popupHeader.textContent = 'Zylinder!';}
        else if (num >= 4 && num < 5) {animatePow();popupHeader.textContent = 'Leistung!';}
        else if (num < 6) {animateRpm();popupHeader.textContent = 'Umrehungen pro Minute!';}
    }; console.log(num);
};


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

const pushDraw1 = () => {
    if (drawCards.length > 0) {
        Array.prototype.push.apply(play1Deck, drawCards);
        drawCards.length = 0;
    };
};

const pushDraw2 = () => {
    if (drawCards.length > 0) {
        Array.prototype.push.apply(play2Deck, drawCards);
        drawCards.length = 0;
    };  
};






const compvMax = () => {
    if ( play1Deck[0].vMax > play2Deck[0].vMax) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play1sturne();
        pushDraw1();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].vMax < play2Deck[0].vMax) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play2sturne();
        pushDraw2();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].vMax === play2Deck[0].vMax) {
        console.log(' its a draw');
        if(vMaxBtn2.disabled) {
            play2sturne();
        } else if (vMaxBtn.disabled) {
            play1sturne();
        };
        drawCards.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(`player1deck = ${play1Deck}    player2deck 0 ${play2Deck}     drawdeck 0 ${drawCards}`);
    }
};

const compDisplace = () => {
    if ( play1Deck[0].displace > play2Deck[0].displace) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play1sturne();
        pushDraw1();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].displace < play2Deck[0].displace) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play2sturne();
        pushDraw2();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].displace === play2Deck[0].displace) {
        console.log(' its a draw');
        if(vMaxBtn2.disabled) {
            play2sturne();
        } else if (vMaxBtn.disabled) {
            play1sturne();
        };
        drawCards.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(`player1deck = ${play1Deck}    player2deck 0 ${play2Deck}     drawdeck 0 ${drawCards}`);
    }
 };

 const compWeight = () => {
    if ( play1Deck[0].weight - play2Deck[0].weight < 0) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play1sturne();
        pushDraw1();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].weight - play2Deck[0].weight > 0) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play2sturne();
        pushDraw2();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].weight === play2Deck[0].weight) {
        console.log(' its a draw');
        if(vMaxBtn2.disabled) {
            play2sturne();
        } else if (vMaxBtn.disabled) {
            play1sturne();
        };
        drawCards.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(`player1deck = ${play1Deck}    player2deck 0 ${play2Deck}     drawdeck 0 ${drawCards}`);
    }
};


const compCyli = () => {
    if ( play1Deck[0].cylinder > play2Deck[0].cylinder) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play1sturne();
        pushDraw1();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].cylinder < play2Deck[0].cylinder) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play2sturne();
        pushDraw2();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].cylinder === play2Deck[0].cylinder) {
        console.log(' its a draw');
          if(vMaxBtn2.disabled) {
            play2sturne();
        } else if (vMaxBtn.disabled) {
            play1sturne();
        };
        drawCards.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(drawCards.length);
        console.log(`player1deck = ${play1Deck}    player2deck 0 ${play2Deck}     drawdeck 0 ${drawCards}`);
    }
};

const compPow = () => {
    if ( play1Deck[0].power > play2Deck[0].power) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play1sturne();
        pushDraw1();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].power< play2Deck[0].power) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play2sturne();
        pushDraw2();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].power === play2Deck[0].power) {
        console.log(' its a draw');
        if(vMaxBtn2.disabled) {
            play2sturne();
        } else if (vMaxBtn.disabled) {
            play1sturne();
        };
        drawCards.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(`player1deck = ${play1Deck}    player2deck 0 ${play2Deck}     drawdeck 0 ${drawCards}`);
    }
};


const compRpm = () => {
    if ( play1Deck[0].rpm > play2Deck[0].rpm) {
        console.log('player 1 wins');
        play1Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play1sturne();
        pushDraw1();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].rpm < play2Deck[0].rpm) {
        console.log('player 2 wins');
        play2Deck.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        play2sturne();
        pushDraw2();
        console.log(play1Deck);
        console.log(play2Deck);
        console.log(drawCards);
    } else if ( play1Deck[0].rpm === play2Deck[0].rpm) {
        console.log(' its a draw');
        if(vMaxBtn2.disabled) {
            play2sturne();
        } else if (vMaxBtn.disabled) {
            play1sturne();
        };    
        drawCards.push(play1Deck[0], play2Deck[0]);
        play1Deck.splice(0,1);
        play2Deck.splice(0,1);
        console.log(`player1deck = ${play1Deck}    player2deck 0 ${play2Deck}     drawdeck 0 ${drawCards}`);
    }
};

const startGame =() => {
    let num = Math.random();
    if (num <= 0.5 ) {
        console.log('P1 starts!');
        play1sturne();
      } else {
        console.log('P2 starts')
        play2sturne();
    };
    // upDateCards();
};

