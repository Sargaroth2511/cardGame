document.addEventListener('DOMContentLoaded', () => {
    
    let playgroundElement = document.querySelector('.playground');
    if (!playgroundElement) {
        console.error('Playground element not found');
        return;
    }

    let startButton = document.querySelector('#startgame'),
        player1Deck = document.querySelector('#Deck1'),
        player2Deck = document.querySelector('#Deck2'),
        playerDecks = [player1Deck, player2Deck].filter(deck => deck !== null),
        active = false,
        zoomed = false,
        zoomedDeckCards = [],
        deckArray,
        HTMLElement,
        deckSubstring,
        currentX,
        currentY,
        initialX,
        initialY,
        initialTransformX ,
        initialTransformY,
        targetStartzIndex,
        viewWidth = Math.max(document.documentElement.clientWidth),
        playerDeckTopEdge;

  
    const handleDeckClick = () => {       
        let newCard;
        adjustElementsForBothPlayers();
        if(!zoomed){
            zoomInOnDeck();
            for (let i = 2; i < deckArray.length; i++){
                createCardDiv(HTMLElement, i, deckSubstring, deckArray);
            };
        };    
        
        function adjustElementsForBothPlayers(){
            isPlayerOne? (deckArray = play1Deck, HTMLElement = player1Deck, deckSubstring = 'Deck1'):
                         (deckArray = play2Deck, HTMLElement = player2Deck, deckSubstring = 'Deck2')
        };
        
        function zoomInOnDeck (){
            zoomed = true;
            HTMLElement.style.transform = 'translateX(-30%) translateY(-20%) scale(0.6)';
            HTMLElement.style.transition = 'transform 0.3s';
            HTMLElement.classList.add('movingCard');
            HTMLElement.ontransitionend = () => {
                let rect = HTMLElement.getBoundingClientRect();
                playerDeckTopEdge = rect.top;
            };
        };

        function createCardDiv (HTMLElement, i, deckSubstring, deckArray){
            newCard = HTMLElement.cloneNode(true);
            newCard.id = `card${i}`;
            newCard.style.zIndex = 16+deckArray.length-i;
            newCard.childNodes[7].id = `form1Deck${i}`
            playgroundElement.appendChild(newCard);
            updateUICardElements(deckSubstring, deckArray,i);
            zoomedDeckCards.push(newCard.id);
        };

  
    };


    const setTranslate = (xPos, yPos, element) =>{
        element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(0.7)`;
        element.style.transition = 'none';
        element.style.boxShadow =  '0 10px 12px 0 rgba(0, 5, 5, 0.8)'
    };


    const resetPlayerDeck = () => {
        for (let i = 0; i < zoomedDeckCards.length; i++){
            document.querySelector(`#${zoomedDeckCards[i]}`).remove();
            if (i === zoomedDeckCards.length - 1){
                zoomedDeckCards = [];
            };
        };
        zoomed = false;
        HTMLElement.classList.remove('movingCard');
        HTMLElement.style.transform = 'scale(0.3)';
        HTMLElement.style.transition = 'none';
        updateUICardElements(deckSubstring, deckArray, 1)
    };


    const dragStart = e => {
        if (e.type === 'touchstart'){
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        } else {
            initialX = e.clientX;
            initialY = e.clientY;    
        };
        if (e.target.classList.contains('movingCard')){
            getCurrentHTMLElementPosition();
            grapHTMLElement();
        } else if (!e.target.classList.contains('movingCard') && zoomed){
            resetPlayerDeck();
        };    

        function getCurrentHTMLElementPosition(){
            let compStyles = window.getComputedStyle(e.target),
            matrix = compStyles['transform'] || compStyles.webkitTransform || compStyles.mozTransform,
            matrixType = matrix.includes('3d') ? '3d' : '2d',
            matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            if (matrixType === '2d'){
                initialTransformX = Number(matrixValues[4]);
                initialTransformY = Number(matrixValues[5]);
            } else if (matrixType === '3d'){
                initialTransformX = Number(matrixValues[12]);
                initialTransformY = Number(matrixValues[13]);
            };
        };
        
        function grapHTMLElement(){
            active = true;
            targetStartzIndex = e.target.style.zIndex;
            e.target.style.zIndex =50;
            e.target.addEventListener('mouseleave', dragEnd, false)
            if(e.type === 'touchstart'){
                currentX = initialTransformX + e.touches[0].clientX - initialX;
                currentY = initialTransformY + e.touches[0].clientY - initialY;
            } else {
                currentX = initialTransformX + e.clientX - initialX;
                currentY = initialTransformY + e.clientY - initialY;
            };
            setTranslate(currentX, currentY, e.target);
        };
    };

    const dragEnd = e => {
        if (active){
            let endPositionX,
                endPositionY;
            if (e.type === 'touchend'){
                endPositionX = e.changedTouches[0].clientX;
                endPositionY = e.changedTouches[0].clientY;
            } else {
                endPositionX = e.clientX;
                endPositionY = e.clientY;
            };        
            resetElementProperties();
            endPositionY < playerDeckTopEdge ? transitionElement('1s') : transitionElement('0.1s')

            function resetElementProperties(){
                active = false;
                e.target.removeEventListener('mouseleave', dragEnd, false)
                e.target.style.zIndex = targetStartzIndex;
            };

            function transitionElement(transitionSpeed){
                if (endPositionX <= viewWidth/2){
                    e.target.style.transform = 'translateX(-30%) translateY(-20%) scale(0.6)';
                } else {
                    e.target.style.transform = 'translateX(30%) translateY(-20%) scale(0.6)';
                };
                e.target.style.boxShadow =  '0 4px 8px 0 rgba(0, 5, 5, 0.4)'
                e.target.style.transition = `transform ${transitionSpeed} cubic-bezier(0.8, 0, 1.0, 1.0), box-shadow ${transitionSpeed} cubic-bezier(0.8, 0, 1.0, 1.0)`;
            };
        };
    };


    const drag = e => {
        if (active){
            e.preventDefault();
                if(e.type === 'touchmove'){
                    currentX = initialTransformX + e.touches[0].clientX - initialX;
                    currentY = initialTransformY + e.touches[0].clientY - initialY;
                } else {
                    currentX = initialTransformX + e.clientX - initialX;
                    currentY = initialTransformY + e.clientY - initialY;
                };
                setTranslate(currentX, currentY, e.target);
        };
    };


    if (startButton && typeof checkIfBothPlayersAreRdy === 'function') {
        startButton.addEventListener('click', checkIfBothPlayersAreRdy);
    }

    if (playerDecks.length > 0) {
        playerDecks.forEach(e => {
            if (e) {
                e.addEventListener('click', handleDeckClick);
            }
        });
    }
    
    playgroundElement.addEventListener("touchstart", dragStart, false);
    playgroundElement.addEventListener("touchend", dragEnd, false);
    playgroundElement.addEventListener("touchmove", drag, false);

    playgroundElement.addEventListener("mousedown", dragStart, false);
    playgroundElement.addEventListener("mouseup", dragEnd, false);
    playgroundElement.addEventListener("mousemove", drag, false);    
  
    const preventDocBeeingClicked = document.querySelector('#preventDocBeeingClicked');
    if (preventDocBeeingClicked) {
        preventDocBeeingClicked.addEventListener('click', () => {
            alert('Dein Gegner ist noch nicht bereit');
        });
    }

    const addCardButtonEventlistener = cardButtons => {
        for (let i = 0; i < cardButtons.length; i++) {
            cardButtons[i].addEventListener('click', e => {
                e.preventDefault();
                getValuesToCompareCards(i);
                if (isPlayingOnline){
                    db.collection(ourGameName).doc(uniqueOnlineName).update({wantsToCheck: i });
                }; 
            });    
        };
    };
    
    allCardButtons.forEach(e => {
        addCardButtonEventlistener(e);
    });
    
    endgamebacktn.addEventListener('click', e => {
        e.preventDefault();
        window.location.replace('index.html');
    });
    
    newGame.addEventListener('click', e => {
        e.preventDefault();
        endgameouter.style.display = 'none';
        compPopupOuter.style.display = 'none';
    if (isPlayingOnline){
            db.collection(ourGameName).doc(uniqueOnlineName).update({myTurn: ''})
            .then(()=>{
                db.collection(ourGameName).doc(uniqueOnlineName).update({isRdy : 'yes'})
            })     
            .then(()=> {
                checkIfBothPlayersAreRdy();  
            })
            .catch((err)=> {
                console.log('error updating doc', err)
            })
        } else {
        startGame();
        }    
    });
    
    waitBackbtn.addEventListener ('click', e => {
        e.preventDefault();
        waitshufflePopouter.style.display = 'none';
    if (typeof startButton !== 'undefined' && startButton) startButton.disabled = false;
        if (typeof isWaitingForReady !== 'undefined') isWaitingForReady = false;
        if (typeof dotinterval !== 'undefined' && dotinterval) clearInterval(dotinterval);
    if (isPlayingOnline){
            db.collection(ourGameName).doc(uniqueOnlineName).update({isRdy : ''})
            clearInterval(dotinterval);
            unsubUserDocs();
    } else if (!isPlayingOnline){
            window.location.replace(`luxCarGame.html`)
        }
    });
    
    nameForm.addEventListener ('submit', e =>  {
        e.preventDefault();
        let regexp = /[^a-zA-Z0-9_-]/
        let test = regexp.test(nameField.value)
        if(test){
            alert('Es sind leider keine Leerzeichen oder Sonderzeichen erlaubt')
        } else {
            onlineName = nameField.value;   
            localStorage.setItem('userName', onlineName);
            currentUser = firebase.auth().currentUser;
            uniqueOnlineName = onlineName + currentUser.uid;
            db.collection('Users').doc(uniqueOnlineName).set({
                UserId: currentUser.uid,
                UserName: onlineName,
                startNumber: 0,
                isRdy: '',
                Cards : JSON.parse( JSON.stringify(cardIds))
            })
            
            .then(() => {
                console.log("Document successfully written!");
                setDBdocs();
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            nameOuter2.style.display = 'none';
        }
    
    });
    
    signInForm.addEventListener ('submit', e => {
        e.preventDefault();
        signInForm.SignIn.value === 'Google' ?  loginWithGoogle():
        signInForm.SignIn.value === 'Anonym' ? loginAnonymously() : console.log('No SignIn Method chosen')  
     });
    
    
    
     const loginWithGoogle = ()  => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                signInOuter2.style.display = 'none'
                if(!onlinName){
                    nameOuter2.style.display = 'grid';
                }    
            } else {
                const provider = new firebase.auth.GoogleAuthProvider();
    
                firebase.auth().signInWithPopup(provider)
    
                .then(result => {
                    const user = result.user;
                    signInOuter2.style.display = 'none'
                    if (!onlineName){
                        nameOuter2.style.display = 'grid';
                    }
                })
                .catch(console.log)
            };    
    });
    };
    
    const loginAnonymously = () => {
        firebase.auth().signInAnonymously()
        .then(result => {
            const user =result.user;
            nameOuter2.style.display = 'grid';
            signInOuter2.style.display = 'none'
            console.log(user)
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    };
    
    nameBackbtn.addEventListener('click', e => {
        nameOuter2.style.display = 'none'
    })
})


