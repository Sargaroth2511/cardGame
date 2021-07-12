// Index Selectors
const selDecksBackbtn = document.querySelector('#choosedeck #choose-deck-backbtn');
const onlineBackbtn = document.querySelector('#CPUorMulit-backtn');
const difBackbtn = document.querySelector('#difficulty-backbtn')
const MyDeckbackbtn = document.querySelector ('#my-deck-backbtn')
const myDeck = document.querySelector('#mydeck')

const chooseDeckPopout = document.querySelector ('#choose-deck-popout');
const onlinePopout =document.querySelector ('#choose-multi-or-cpu')
const difPopout = document.querySelector ('#choose-difficulty')
const myDeckPopout = document.querySelector ('#my-deck-popout')

const startForm = document.querySelector ('#startform');
const deckForm = document.querySelector ('#deck-form');
const onlineForm = document.querySelector ('#CPUorMulti-form')
const difform = document.querySelector ('#difficulty-form')
const myDeckForm = document.querySelector ('#my-deck-form')



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

MyDeckbackbtn.addEventListener ('click', e => {
    e.preventDefault();
    myDeckPopout.style.display = 'none';
});



startForm.addEventListener ('click', e => {
   if(e.target.defaultValue === 'Neues Spiel') {
       onlinePopout.style.display = 'grid'
   } else if(e.target.defaultValue ==='Schnelles Spiel') {
       if (localStorage.getItem('online?', 'CPU')) {
           window.location.replace(`${localStorage.getItem('chosenDeck')}.html`)
        } else {console.log(localStorage.getItem('online?'))}
   } else if(e.target.defaultValue ==='Meine Decks') {
       myDeckPopout.style.display = 'grid';
   }    
});

deckForm.addEventListener ('submit', e => {
    e.preventDefault();
    if (deckForm.Deck.value === '1') {
        alert ('Du hast dieses Deck noch nicht');
        
    } else {    
    window.location.replace(`${deckForm.Deck.value}.html`);
    localStorage.setItem('chosenDeck', deckForm.Deck.value);
    };
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


 myDeckForm.addEventListener ('submit', e => {
    e.preventDefault();
    document.querySelector('#my-deck-card').style.display = 'flex'
    myDeck.style.opacity = '0';
    if (myDeckForm.MyDeck.value ==='1') {
        alert ('Du hast dieses Deck noch nicht')
        document.querySelector('#my-deck-card').style.display = 'none'
        myDeck.style.opacity = '100';
    } else {
    let deck = eval(myDeckForm.MyDeck.value);
    let i = 0;
    const updateMyCard = () => {        
        document.getElementById("myDeckImg").src = 'Images/' + deck[i].id + '.jpg';  
        myCardName.textContent =deck[i].name;
        myvMax.textContent = deck[i].vMax;
        mydis.textContent = deck[i].displace;
        mywei.textContent = deck[i].weight;
        mycyl.textContent = deck[i].cylinder;
        mypow.textContent = deck[i].power;
        myrpm.textContent = deck[i].rpm;
    }
    updateMyCard();
    arrowleft.addEventListener ('click', e => {
        e.preventDefault();
        if (i===0) {
            document.querySelector('#my-deck-card').style.display = 'none'
            myDeck.style.opacity = '100';
        } else if (i <= deck.length +1) {
            i--
        } updateMyCard();    
    });
    arrowright.addEventListener ('click', e => {
        e.preventDefault();
        console.log(i)
        if (i < deck.length) {
            i++
        } updateMyCard();
    });   
    } 
});


