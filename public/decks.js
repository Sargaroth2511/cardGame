const signInForm = document.querySelector ('#signInForm')
const loadouter = document.querySelector('#loadouter')
const startBtn = document.querySelector ('#startgame');
const playground = document.querySelector('.playground');




let playsOnline = Boolean;


// Deck Constructors

class LuxuryCar {
  constructor(id, name, vMax, displace, weight, cylinder, power, rpm){
      this.id = id;
      this.name = name;
      this.prop1 = vMax;
      this.prop2 = displace;
      this.prop3 = weight;
      this.prop4 = cylinder;
      this.prop5 = power;
      this.prop6 = rpm;
  };
};

class AutosalonCar {
  constructor(id, name, vMax, displace, length, cylinder, power, rpm){
    this.id = id;
    this.name = name;
    this.prop1 = vMax;
    this.prop2 = displace;
    this.prop3 = length;
    this.prop4 = cylinder;
    this.prop5 = power;
    this.prop6 = rpm;
  };
};


// Decks

const luxusCarDeck = [
  new LuxuryCar ('LCa1', 'Bentley Continental GT', 318, 5998, 2320, 12, 575, 6000),
  new LuxuryCar ('LCa2', 'Porsche Panamera Turbo', 303, 4806, 2019, 8, 500, 6000),
  new LuxuryCar ('LCa3', 'BMW 650i Grand Coupé', 250, 4395, 1940, 8, 450, 6000),
  new LuxuryCar ('LCa4', 'Lamborghini Aventador', 349, 6498, 1575, 12, 700, 8250),
  new LuxuryCar ('LCb1', 'Ruf RT 12', 340, 3746, 1500, 6, 650, 7000),
  new LuxuryCar ('LCb2', 'Lexus LC 500', 270, 4969, 1935, 8, 477, 7100),
  new LuxuryCar ('LCb3', 'Mercedes AMG GT', 304, 3982, 1645, 8, 462, 6000),
  new LuxuryCar ('LCb4', 'Mazanti Eventra', 350, 7000, 1300, 8, 701, 6600),
  new LuxuryCar ('LCc1', 'McLaren 720 S', 341, 3994, 1283, 8, 720, 7500),
  new LuxuryCar ('LCc2', 'Maserati Quattroporte', 280, 4700, 1700, 8, 530, 8250),
  new LuxuryCar ('LCc3', 'Audi R8 V10 plus', 317, 5204, 1570, 10, 550, 8000),
  new LuxuryCar ('LCc4', 'Panoz Abruzzi', 340, 6200, 1400, 8, 640, 6500),
  new LuxuryCar ('LCd1', 'Bugatti Chiron', 420, 7993, 1995, 16, 1500, 6700 ),
  new LuxuryCar ('LCd2', 'Koenigsegg Ager', 395, 4700, 1290, 8, 910, 6850),
  new LuxuryCar ('LCd3', 'Pagani Huayra', 370, 5980, 1350, 12, 700, 7200),
  new LuxuryCar ('LCd4', 'Rolls-Royce Gost', 250, 6592, 2435, 12, 571, 5250),
  new LuxuryCar ('LCe1', 'Rolls-Royce Wraith', 250, 6592, 2360, 12, 632, 5600),
  new LuxuryCar ('LCe2', 'Audi A8', 250, 2995, 1920, 6, 340, 6400),
  new LuxuryCar ('LCe3', 'Porsche 911 Carrera S', 302, 3800, 1420, 6, 400, 7400),
  new LuxuryCar ('LCe4', 'BMW i8', 250, 1499, 1485, 3, 362, 5800),
  new LuxuryCar ('LCh3', 'Aston Martin Vanquish', 295, 5935, 1739, 12, 573, 6750),
  new LuxuryCar ('LCf1', 'Rolls-Royce Phantom', 250, 6750, 2560, 12, 571, 5000),
  new LuxuryCar ('LCf2', 'Porsche 918 Spyder', 340, 4600, 1640, 8, 887, 8600),
  new LuxuryCar ('LCf3', 'Lamborghini Huracan', 325, 5204, 1422, 10, 610, 8250),
  new LuxuryCar ('LCf4', 'BMW 750 Li', 250, 4395, 2055, 8, 407, 5500),
  new LuxuryCar ('LCg1', 'Mercedes-Maybach S 650', 250, 5980, 2360, 12, 630, 5000),
  new LuxuryCar ('LCg2', 'Jaguar XKR-S', 300, 5600, 1753, 8, 560, 6000),
  new LuxuryCar ('LCg3', 'Bentley Musanne Speed', 305, 6752, 2685, 8, 537, 4200),
  new LuxuryCar ('LCg4', 'Lexus TMG Sports 650', 320, 5000, 2050, 8, 650, 7500),
  new LuxuryCar ('LCh1', 'Acari KZ1', 320, 4941, 1275, 8, 500, 7000),
  new LuxuryCar ('LCh2', 'Fisker Karma', 201, 1998, 1950, 4, 403, 5300),
  new LuxuryCar ('LCh4', 'Merceds AMG Black Series', 315, 6208, 1550, 8, 631, 7400)
];

const autosalonDeck = [
 new AutosalonCar('ASa1', 'Mini Coupé', 230, 1598, 3.73, 4, 184, 5500),
 new AutosalonCar('ASa2', 'Peugeot 308', 203, 1598, 4.25, 4, 125, 6000),
 new AutosalonCar('ASa3', 'smart forfour', 151, 999, 3.49, 3, 71, 6000),
 new AutosalonCar('ASa4', 'Mazda 6 Kombi', 220, 2488, 4.80, 4, 192, 5700),
 new AutosalonCar('ASb1', 'Audi A7 Sportback', 250, 2995, 4.97, 6, 300, 5250),
 new AutosalonCar('ASb2', 'Seat Arona', 182, 999, 4.14, 3, 115, 5500)

];

const deckCollection = [luxusCarDeck, autosalonDeck];
const allCards = [];
const cardIds = {};

deckCollection.forEach(e => {
  e.forEach(e => {
    allCards.push(e)
  })
})

allCards.forEach(e => {
    cardIds[e.id] = 0
})

class CardProperties  {
  constructor(unit, fullName, barwidth, lowerIsBetter, localPropertyName){
    this.unit = unit;
    this.fullName = fullName;
    this.barwidth = barwidth;
    this.lowerIsBetter = lowerIsBetter;
    this.localPropertyName = localPropertyName;
  }
}




const luxusCarsCardPropertyCollection = [
  new CardProperties('km/h', 'Geschwindigkeit!', 450, false, 'km/h'),
  new CardProperties('ccm', 'Hubraum!', 8000, false, 'ccm Hubraum'),
  new CardProperties('kg', 'Gewicht!', 3000, true, 'kg Gewicht'),
  new CardProperties('Zylinder', 'Zylinder!', 16, false, 'Zylinder'),
  new CardProperties('PS', 'Leistung!', 1600, false, 'PS'),
  new CardProperties('U/min', 'Umdrehungen /min!', 9000, false, 'Umdrehungen/min')

]

const autosalonPropertyCollection = [
  new CardProperties('km/h', 'Geschwindigkeit!', 300, false, 'km/h'),
  new CardProperties('ccm', 'Hubraum!', 5000, false, 'ccm Hubraum'),
  new CardProperties('m', 'Länge!', 6, false, 'm Länge'),
  new CardProperties('Zylinder', 'Zylinder!', 10, false, 'Zylinder'),
  new CardProperties('PS', 'Leistung!', 600, false, 'PS'),
  new CardProperties('U/min', 'Umdrehungen /min!', 8000, false, 'Umdrehungen/min')
]

let allDecks = {
  'luxCarGame': luxusCarDeck,
  'autosalon': autosalonDeck
};

let deckShortCuts = {
  'AS' : 'autosalon',
  'LC' : 'luxCarGame'
}

let allDeckProperties = {
  'luxCarGame': luxusCarsCardPropertyCollection,
  'autosalon': autosalonPropertyCollection
};

let chosenDeck = '';
    deckShuffled = [], 
    drawCards = [],
    sortedDecks = [],
    play1Deck = [],
    play2deck = [];





// Sorted Arrays

const sortID = (a, b,) => {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}

function parse(str) {
  return Function(`'use strict'; return (${str})`)()
}


const luxusCarDeckSortID = Array.from(luxusCarDeck.sort(sortID));

// Get Card Ids from Firebase create the Playerdecks

const searchID = (startDeck, IDcollection, endDeck) => {
  for (let i = 0; i < IDcollection.length; i++){
    
    
    let result = startDeck.find(e => e.id === IDcollection[i])
    endDeck.push(result)
  }
}

const sorteDecks = () => {
  let deck = allDecks[chosenDeck],
      objectKey = Object.keys(deck[0]),
      sortedArray = [];

  for (let i = 2; i < objectKey.length; i++){
    if (allDeckProperties[chosenDeck][i-2].lowerIsBetter === true){
      sortedArray = Array.from(deck.sort((a, b) => a[objectKey[i]] - b[objectKey[i]]));
    } else {
      sortedArray = Array.from(deck.sort((a, b) => b[objectKey[i]] - a[objectKey[i]]));
    };
    sortedDecks.push(sortedArray)
  };
};

// Get Online Status

const getStatus = () => {
    if (localStorage.getItem('online?') === 'Online'){
      playsOnline = true;
    } else if (localStorage.getItem('online?') === 'CPU'){
      playsOnline = false;
    } else {
      console.log('cant get Status, playsOnline is', playsOnline )
    }
     
    console.log('online?', playsOnline);
  };  

getStatus();


const updateCardsWithChildren = (element, shortCut, arrayPosition) => {
  let cardValues = Object.values(allCards[arrayPosition]),
      chosenDeck = deckShortCuts[shortCut],
      buttons = element.children[3];

  element.children[0].src = 'Images/' + chosenDeck +'/'+ cardValues[0] +'.jpg';
  element.children[2].textContent = cardValues[1];
  for (let i = 0; i < buttons.children.length; i++){
      buttons.children[i].children[0].textContent = allDeckProperties[chosenDeck][i].localPropertyName;
      buttons.children[i].children[1].textContent = cardValues[i+2];
  };
};

const createCardDiv = (HTMLElement, shortCut, position, i, parentElement) => {
  let newCard = HTMLElement.cloneNode(true);
  newCard.id = HTMLElement.id + i;
  newCard.style.display = 'grid';
  parentElement.appendChild(newCard);
  updateCardsWithChildren(newCard.children[0].children[0], shortCut, position)    
};





let isPlayerOne = true,
    otherPlayer = '',
    onlineName = '',
    uniqueOnlineName ='',
    currentUser = {},
    uniqueOtherPlayerName = '',
    localName = localStorage.getItem('userName');


let unsubUserDocs;

let otherDatabaseDoc = {},
    ownDatabaseDoc = {},
    ourGameName;
    

// Animate Dots
let dotinterval;


if (!onlineName){
  onlineName = localStorage.getItem('userName')
};    


const getNameOfTheGame = () => {
  let queryString = window.location.search,
      urlParams = new URLSearchParams(queryString);
  chosenDeck = urlParams.get('chosenDeck');
  
  ourGameName = urlParams.get('gameName');

  if(ourGameName){
    playsOnline = true;
    localStorage.setItem('online?', 'Online');
    localStorage.setItem('chosenDeck', chosenDeck);   
  }  
};


const checkIfUserExists = async () => {

  let promise = new Promise((resolve, reject) => {

    currentUser = firebase.auth().currentUser;   

    db.collection("Users").where('UserId', '==', currentUser.uid)
    .get().then((querySnapshot) => {
      if(querySnapshot.empty){
        loadouter.style.display = 'none';
        typeof nameOuter2 !== 'undefined' ? nameOuter2.style.display = 'grid':
                                            nameOuter.style.display = 'grid';
      } else {
        querySnapshot.forEach((doc) =>{
          let userDoc = doc.data();
          onlineName = userDoc.UserName;
          console.log(onlineName)
          if (uniqueOnlineName === ''){
            uniqueOnlineName = onlineName + currentUser.uid;
          }; 
          loadouter.style.display = 'none';
          resolve(uniqueOnlineName);
        });  
      };
    }).catch(err => reject(err));
  }); 
  return promise;
};
      

const updateDatabaseUserDoc = () => {
  db.collection(ourGameName).doc(uniqueOnlineName).update({
    name: onlineName,
    gameName: ourGameName,
    isRdy: '', 
    nextTurn: '',
    wantsToCheck: '',
    myTurn: ''
  }).then(() => {
    loadouter.style.display = 'none'
  })
}


const setDatabaseUserDoc = () => {
  db.collection(ourGameName).doc(uniqueOnlineName).set({
    UserId: currentUser.uid,
    name: onlineName,
    gameName: ourGameName,
    startNumber: 0,
    isRdy: '',
    nextTurn:'',
    wantsToCheck: '',
    myTurn: ''
  }).then(() => {
    loadouter.style.display = 'none'
  });
}


const alertOutdatedLink = () => {
  loadouter.style.display = 'none';
  alert('Das Spiel ist voll. Du hast anscheinend einen veralteten Link erwischt. Erstellt ein neues Spiel!')
  startBtn.removeEventListener('click', checkIfBothPlayersAreRdy);
  startBtn.addEventListener('click', () => {
    alert('Das Spiel ist voll. Du hast anscheinend einen veralteten Link erwischt. Erstellt ein neues Spiel!') 
  })
}


const setDBdocs = () => {
  loadouter.style.display = 'grid';
  getNameOfTheGame();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user){   
      (async () => {
        await checkIfUserExists();
        // getUserDecks();
        updateUIElements();
        if (ourGameName) {
          console.log('GameID' ,ourGameName);
          let size = 0;
          await db.collection(ourGameName).get()
          .then(snap => {
            size = snap.size 
            return size;
            });

          await db.collection(ourGameName).doc(uniqueOnlineName).get()
          .then((docSnapshot) => {
            if (docSnapshot.exists){
              updateDatabaseUserDoc();
            } else {
              // prevent having more than 2 Players
              if (size < 3) {
                setDatabaseUserDoc();
              } else {
                alertOutdatedLink();
              };
            }; 
          });   
        } 
      })().catch((err) => {
      console.log(err, 'some error occured')
      });
    }else {          
      typeof signInOuter2 !== 'undefined' ? signInOuter2.style.display = 'grid' :
                                            signInOuter.style.display = 'grid';
      loadouter.style.display = 'none';               
    };   
  });

  function updateUIElements(){
    console.log(uniqueOnlineName)
    db.collection('Users').doc(uniqueOnlineName).get()
    .then(doc => {
        let userDoc = doc.data();
        if (typeof scoreHTML !== 'undefined'){
          userDoc.Score !== undefined ? scoreHTML.children[1].textContent = userDoc.Score :
                                        scoreHTML.children[1].textContent = 0;  
        };                                
    });
  };
};    



setDBdocs();


const startDotinterval = () => {
  dotinterval = setInterval(() => {
    if (window.dotsGoingUp)
        animatedpoints.innerHTML += '.';
    else {
        animatedpoints.innerHTML = animatedpoints.innerHTML.substring (1, animatedpoints.innerHTML.length);
        if (animatedpoints.innerHTML === '')
            window.dotsGoingUp = true;
    };
    if (animatedpoints.innerHTML.length > 10)
        window.dotsGoingUp = false;    
  }, 100);
}; 


const toggleWaitingPopup = (text, display, animateDots) =>{
  
  waiting.textContent = text
  waitshufflePopouter.style.display = display;

  window.dotsGoingUp = true;

  animateDots();
  
}



const getUsers = async (nextStartGame, unsubListener) => {
  
  await db.collection(ourGameName).doc(uniqueOnlineName)
    .get()
    .then((doc) =>{
      ownDatabaseDoc = doc.data();
      console.log(`my number ${ownDatabaseDoc.startNumber}`);

      return ownDatabaseDoc;
    });

  await db.collection(ourGameName).where('UserId', '!=', currentUser.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        otherDatabaseDoc = doc.data();
        otherPlayer = otherDatabaseDoc.name;
        uniqueOtherPlayerName = otherPlayer + otherDatabaseDoc.UserId;
        console.log(`other number ${otherDatabaseDoc.startNumber}`);
      });

    return otherDatabaseDoc;
  });
  ownDatabaseDoc.startNumber > otherDatabaseDoc.startNumber ? 
  isPlayerOne = true : isPlayerOne = false;
  clearInterval(dotinterval);
  nextStartGame();
  unsubListener(); 
};  


  const checkIfBothPlayersAreRdy = async () => {
    if (playsOnline){
      let num = Math.random();

      await db.collection(ourGameName).doc(uniqueOnlineName)
      .update({
        startNumber: num,
        isRdy: 'yes'
      });
      
      toggleWaitingPopup('Warte auf anderen Spieler', 'grid', startDotinterval);
      
      await new Promise((resolve) => {
        unsubUserDocs = db.collection(ourGameName).where('isRdy', '==', 'yes')
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.size === 2){
            resolve();
          };
        });
      });
      getUsers(startGame, unsubUserDocs);
    } else {
      startGame();
    };  
  };    

  function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }