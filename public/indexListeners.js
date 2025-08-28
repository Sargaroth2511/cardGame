// Index Selectors
const selDecksBackbtn = document.querySelector('#choose-deck-backbtn');
const onlineBackbtn = document.querySelector('#CPUorMulit-backtn');
const difBackbtn = document.querySelector('#difficulty-backbtn')
const MyDeckbackbtn = document.querySelector ('#my-deck-backbtn')
const myDeck = document.querySelector('#mydeck')
const modeBackbtn = document.querySelector ('#mode-backbtn')

const chooseDeckPopout = document.querySelector ('#choose-deck-popout');
const onlinePopout =document.querySelector ('#choose-multi-or-cpu')
const difPopout = document.querySelector ('#choose-difficulty')
const myDeckPopout = document.querySelector ('#my-deck-popout')
const chooseMode = document.querySelector ('#chooseMode')

const startForm = document.querySelector ('#startform');
const deckForm = document.querySelector ('#deck-form');
const onlineForm = document.querySelector ('#CPUorMulti-form')
const difform = document.querySelector ('#difficulty-form')
const myDeckForm = document.querySelector ('#my-deck-form')
const shopForm = document.querySelector ('#shopform');

const flipContainer = document.querySelector('#flipContainer')
const boughtCard = document.querySelector('#boughtCard')
const ctx = document.createElement("canvas").getContext("2d");

const cardPack = document.querySelectorAll('.cardPack')
const cardPackTop = document.querySelector('.piece1')
const cardPackBottom = document.querySelector('.piece2')

const gameStart = document.querySelector ('#gameStart');

const modeForm = document.querySelector ('#mode-form')

const whatsappLink = document.querySelector ('#sendForm > a') 

const loginWithGoogle = ()  => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            nameOuter.style.display = 'grid';
            signInOuter.style.display = 'none'
        } else {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then (result => {
                let user = result.user;
                nameOuter.style.display = 'grid';
                signInOuter.style.display = 'none';
                console.log(user)
            }).catch(err => {
                let errorCode = err.code,
                    errorMessage = err.message;
                console.log(errorCode, errorMessage);
            });
        };        
    });
};

const loginAnonymously = () => {
    firebase.auth().signInAnonymously()
    .then(result => {
        let user = result.user;
        nameOuter.style.display = 'grid';
        signInOuter.style.display = 'none';
        console.log(user)
    }).catch(err => {
        let errorCode = err.code,
            errorMessage = err.message;
        console.log(errorCode, errorMessage);
    });
};

selDecksBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    getStatus();
    console.log(`user wants to play online: ${isPlayingOnline}`);
    if (isPlayingOnline){
        chooseDeckPopout.style.display = 'none';
        chooseMode.style.display ='grid';
    } else if (!isPlayingOnline) {
        chooseDeckPopout.style.display = 'none';
        difPopout.style.display = 'grid';
    }    
    });

onlineBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    onlinePopout.style.display = 'none';
});

modeBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    onlinePopout.style.display = 'grid';
    chooseMode.style.display = 'none'; 
});


startForm.addEventListener ('click', e => {
    let expr = e.target.defaultValue;

    switch (expr){
        case 'Platzhalter1':
            alert('Noch keine Funktion');
            break;
        case 'Neues Spiel':
            onlinePopout.style.display = 'grid'
            break;
        case 'Shop':
           shopPopupOuter.style.display = 'grid';
           startForm.style.display = 'none';
           break;
        case 'Einstellungen':
            alert('Noch keine Funktion');
            break;
        case 'Platzhalter2':
            alert('Noch keine Funktion');
            break;
    };
});










const shopHandler = e => {
    e.preventDefault();  
    let haveEnoughCoins = false,
        clicked = false,
        shakeEnded = false,
        price = 100;


    const checkIfEnoughCoins = (price) => {
        db.collection('Users').doc(uniqueOnlineName).onSnapshot(doc => {
            let data = doc.data();
            data.Score < price ? (packPrice.style.backgroundColor = 'grey', haveEnoughCoins = false) :
                                 (packPrice.style.backgroundColor = 'rgb(247, 178, 89)', haveEnoughCoins = true);
        });                      
    };

    const getNewCards = e => {  
        console.log(e.target.value)
        let drawElement;
        this.parentElement === cardPackTop ? 
                               drawElement = cardPackTop.children[0] : 
                               drawElement = cardPackBottom.children[0]; 
        let rect = drawElement.getBoundingClientRect(),
            mouseX = e.clientX,
            mouseY = e.clientY,
            newCard,
            price = 100,
            x = mouseX - rect.left,
            y = mouseY - rect.top,
            w = ctx.canvas.width = drawElement.width,
            h = ctx.canvas.height = drawElement.height,
            alpha;
            clicked = true;
    
        if (haveEnoughCoins && shakeEnded){
            drawCanvas()
    
            function drawCanvas (){
                ctx.drawImage(drawElement, 0, 0, w, h);
                alpha = ctx.getImageData(x, y, 1, 1).data[3];    
    
                alpha === 0 ? getUnderlayingElement() : 
                              openPack(createNewCards, updateFBCardCount, updateCoins, flipCards);
    
                function getUnderlayingElement(){
                    drawElement.style.pointerEvents = "none";
                    drawElement.parentElement.style.pointerEvents = "none";
                    let clickedElement = document.elementFromPoint(mouseX, mouseY)
                    drawElement.style.pointerEvents = "auto";
                    drawElement.parentElement.style.pointerEvents = "auto";
            
                    if (clickedElement === cardPackTop.children[0]){
                        drawElement = clickedElement;
                        drawCanvas()
                    };
                };    

                function openPack(nextCreateNewCards, nextUpdateFBCardCount, nextUpdateCoins, nextFlipCards){
                    let tearSound = new Sound('Sounds/tearPackSound.mp3')
                    tearSound.play();
         
                    animateHTMLElements();

                    for (let i = 1; i <= 5; i++){
                        nextCreateNewCards(i, createCardDiv);
                        nextUpdateFBCardCount(newCard);
                    };
    
                    nextUpdateCoins();
                    nextFlipCards(recreateCardPack)

                    function animateHTMLElements(){
                        cardPackBottom.children[0].removeEventListener('click', getNewCards)  
                        cardPackTop.children[0].classList.remove('shakeElement', 'packAppear')
                        cardPackBottom.children[0].classList.remove('shakeElement', 'packAppear')
                        cardPackTop.children[0].classList.add('piece1Transform');
                        cardPackBottom.children[0].classList.add('piece2Transform');
                        packPrice.classList.add('piece2Transform')
                    };    

                    function recreateCardPack(element){
                        let soundPop = new Sound('Sounds/popSound1.mp3')
                        shakeEnded = false;
                        clicked = false;
                        element.forEach(e => {
                            e.children[0].classList.remove('piece1Transform', 'piece2Transform');
                            e.children[0].classList.add('packAppear')
                        })
                        flipContainer.classList.remove('hover')
                        flipContainer.style.zIndex = '13';
                        soundPop.play();
                        packPrice.classList.remove('piece2Transform')
                        cardPackBottom.children[0].addEventListener('click', getNewCards)
                    };
                };
            };
    
        } else if (!haveEnoughCoins) {
            alert ('Nicht genug Coins')
        };    
    
        function createNewCards(i, nextCreateHTMLElement){
            let randomCard = Math.floor(Math.random()*allCards.length);
            newCard = allCards[randomCard];
            const cardIndex = e => e.id === newCard.id;   
            let position = allCards.findIndex(cardIndex),  
                regEx = /[A-Z]/g,
                shortCut = newCard.id.match(regEx).join('');
            nextCreateHTMLElement(flipContainer, shortCut, position, i, cardPackBottom)    
            return newCard;
        };    
    
        function updateFBCardCount(newCard){
            let docRef = db.collection('Users').doc(uniqueOnlineName)
            docRef.get().then(doc => {
                let data = doc.data();
                if (data.Score >= price){
                    docRef.update({
                        ['Cards.'+newCard.id] : firebase.firestore.FieldValue.increment(1),
                    });
                };    
            });    
        };    
    
        function updateCoins(){
            db.collection('Users').doc(uniqueOnlineName)
            .update({
                Score : firebase.firestore.FieldValue.increment(-price)
            });
        };

        function flipCards (nextRecreateCardPack) {
            let cardPackTransition = document.querySelector('.piece2Transform'),
               flipContainerClass = [...document.querySelectorAll('.flip-container')]
            cardPackTransition.addEventListener('transitionend', e =>{
                if(e.propertyName === 'opacity'){
                    for (let i = 1; i < flipContainerClass.length; i++){
                        flipContainerClass[i].style.zIndex = '17';
                        flipContainerClass[i].addEventListener('click', () => {
                            if (!flipContainerClass[i].classList.contains('hover')){
                                flipContainerClass[i].classList.toggle('hover');
                            } else {
                                flipContainerClass[i].remove();
                                flipContainerClass[i-1].classList.toggle('hover')
                            };
                            if (!document.getElementById('flipContainer1')){
                                setTimeout(() => {
                                    nextRecreateCardPack(cardPack)
                                }, 1000);
                            };
                        });
                    };
                };    
            });
        };
    };

    if(e.target.value === 'buy') {
        checkIfEnoughCoins(price);
        openCardShop(addListeners);

        function openCardShop(nextAddListeners){
            shopForm.style.display = 'none';
            shopBackBtn.style.display = 'none';
            cardPack.forEach(e => e.style.display = 'flex')    
            packPrice.innerText = `${price}\nCoins`;
            cardPackBackBtn.style.display = 'grid';
            nextAddListeners();
        };

        function addListeners(){
            cardPackBottom.children[0].addEventListener('click', getNewCards)
            cardPack.forEach(e => e.children[0].classList.add('shakeElement'))
            cardPackBottom.children[0].addEventListener('animationend', () =>{
                shakeEnded = true;
                if (clicked){
                    console.log(clicked)
                    getNewCards(e)
                };
            });
        };
    } else if(e.target.value === 'collection') {
        alert('Funktion noch nicht verfügbar')
    } else if(e.target.value === 'design') {
        alert('Funktion noch nicht verfügbar')
    } else if(e.target.value === 'sell'){
        alert('Funktion noch nicht verfügbar')
    }  else if (e.target.value === 'back'){
        shopPopupOuter.style.display = 'none';
        startForm.style.display = 'grid';
    };  

    const closeCardShop = () => {
        shakeEnded = false;
        clicked = false;
        shopForm.style.display = 'grid';
        shopBackBtn.style.display = 'grid';
        cardPack.forEach(e => {
            e.style.display = 'none';
            e.classList.remove('shakeElement');
            e.classList.remove('packAppear');
            e.children[0].classList.remove('piece1Transform', 'piece2Transform');
        });
        removeCards('.flip-container', 'flipContainer')
        packPrice.classList.remove('piece2Transform')
        cardPackBackBtn.style.display = 'none'
    
        function removeCards(selector, blueprint){
            let cardsToRemove = [...document.querySelectorAll(selector)];
            cardsToRemove.forEach(e => {
                if(e.id !== blueprint){
                    e.remove();
                }
            })
        }
    };

    cardPackBackBtn.addEventListener('click', closeCardShop)
};

shopForm.addEventListener ('click', shopHandler);



 


deckForm.addEventListener ('submit', e => {
    e.preventDefault();
    if (deckForm.Deck.value === '1') {
        alert ('Du hast dieses Deck noch nicht');
        
    } else {   
        getStatus(); 
        if(isPlayingOnline){
            localStorage.setItem('chosenDeck', deckForm.Deck.value);
            createNewGame();
        } else if (!isPlayingOnline) {
            if(!onlineName){
                 nameOuter.style.display = 'grid';

            } else {
                localStorage.setItem('chosenDeck', deckForm.Deck.value);
                window.location.replace(`luxCarGame.html`)
                console.log(isPlayingOnline)
            }    

        }    




    };
});

onlineForm.addEventListener ('click', e => {
    let expr = e.target.value;
    localStorage.setItem('online?', expr);
    e.preventDefault();

    switch(expr){
        case 'CPU':
            difPopout.style.display = 'grid'
            break;
        case 'Online':    
            chooseMode.style.display = 'grid';
            break;
    };
    onlinePopout.style.display = 'none';
 });


 signInForm.addEventListener ('submit', e => {
    e.preventDefault();
    signInForm.SignIn.value === 'Google' ?  loginWithGoogle():
    signInForm.SignIn.value === 'Anonym' ? loginAnonymously() : console.log('No SignIn Method chosen')  
 });

 difform.addEventListener ('click', e => {
    expr = e.target.value;
    e.preventDefault();
    switch (expr){
        case 'easy':
        case 'medium':
        case 'hard':
            localStorage.setItem('difficulty', expr);
            difPopout.style.display = 'none';
            gameStart.textContent = 'Spiel starten';
            chooseDeckPopout.style.display = 'grid';
            break;
        case 'back':
            difPopout.style.display = 'none';
            onlinePopout.style.display = 'grid';
            break;
                    

    }
    // console.log(typeof e.target.value)
    // localStorage.setItem('difficulty', e.target.value);    
    // difPopout.style.display = 'none';
    // gameStart.textContent = 'Spiel starten';
    // chooseDeckPopout.style.display = 'grid';
 });


 modeForm.addEventListener ('click', e => {
     e.preventDefault();
     if (e.target.value === 'random'){
         alert('Funktion noch nicht verfügbar')
     } else if (e.target.value === 'chose'){
        alert('Funktion noch nicht verfügbar')
     } else if (e.target.value === 'friend'){
        gameStart.textContent = 'Freund einladen';
        chooseMode.style.display = 'none';
        chooseDeckPopout.style.display = 'grid';
     };   

 });

nameBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    onlinePopout.style.display = 'grid';
    nameOuter.style.display = 'none';
});

sendBackbtn.addEventListener ('click', e => {
    e.preventDefault();
    sendOuter.style.display = 'none';
    chooseDeckPopout.style.display = 'grid';
});

shopBackBtn.addEventListener ('click', e => {
    e.preventDefault();
 
});


nameForm.addEventListener ('submit', e =>  {
    e.preventDefault();
    getStatus();
    let regexp = /[^a-zA-Z0-9_-]/
    let test = regexp.test(nameField.value)
    if(test){
        alert('Es sind leider keine Leerzeichen oder Sonderzeichen erlaubt')
    } else {
        onlineName = nameField.value;   
        uniqueOnlineName = onlineName + currentUser.uid
        localStorage.setItem('userName', onlineName);
        localName = localStorage.getItem('userName')
        console.log(localName);
        nameOuter.style.display = 'none';
        let docRef = db.collection('Users').doc(uniqueOnlineName);
        docRef.set({
                UserId: currentUser.uid,
                UserName: onlineName,
                startNumber: 0,
                isRdy: '',
                Score: 0,
                Cards : JSON.parse( JSON.stringify(cardIds))
        })
            
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    };
});


const createNewGame = async () => {
    let chosenDeck = localStorage.getItem('chosenDeck')
    const  newGame  = await db.collection('Games').add({})    
        let newGameId = newGame.id
        console.log('doc written', newGameId)

    let docRef = await db.collection("Users").where('UserId', '==', currentUser.uid);
    docRef.get()
          .then((querySnapshot) => {
             if (querySnapshot.empty){
                nameOuter2.style.display = 'grid';
             } else {
                querySnapshot.forEach((doc) =>{
                let userDoc = doc.data(); 
                onlineName = userDoc.UserName; 
                uniqueOnlineName = onlineName + currentUser.uid;
              })
            }    
          }).then(() => {
             db.collection(newGameId).doc(uniqueOnlineName).set({
                gameName: newGameId,
                chosenDeck: chosenDeck,
                UserId: currentUser.uid,
                startNumber: 0,
                isRdy: '',
                nextTurn: '',
                wantsToCheck: '',
                myTurn: ''
    
            })  
          })    
            
    .then(() => {
        console.log('new Game written')
        sendOuter.style.display = 'grid';
        chooseDeckPopout.style.display = 'none';
        whatsappLink.href = `https://api.whatsapp.com/send?text=https%3A%2F%2Fsupertrump-25fe1.web.app%2F${chosenDeck}.html%3FuserName%3D${onlineName}%26gameName%3D${newGameId}%26chosenDeck%3D${chosenDeck}`
        whatsappButton.addEventListener('click', e => {
            e.preventDefault();
            
            whatsappLink.href = window.open(`https://api.whatsapp.com/send?text=https%3A%2F%2Fsupertrump-25fe1.web.app%2F${chosenDeck}.html%3FuserName%3D${onlineName}%26gameName%3D${newGameId}%26chosenDeck%3D${chosenDeck}`)

            window.location.replace(`luxCarGame.html?userName=${onlineName}&gameName=${newGameId}&chosenDeck=${chosenDeck}`)
        })    
           

    }).catch((err) => {
        console.log('error writing documents', err)
    })   

}  

