// Firebase listeners related to in-game updates
const attachFirebaseGameListeners = () => {
    db.collection(ourGameName).doc(uniqueOtherPlayerName)
    .onSnapshot((doc) => {
        let otherUser = doc.data(),
            i = otherUser.wantsToCheck;
            if(!isComparisonInProgress){                    
                if (i !== '' ){
                    compareTopCardsByIndex(i);
                }; 
            };          
        db.collection(ourGameName).doc(uniqueOnlineName)
        .onSnapshot((doc) => {
            let oneSelf = doc.data();    
            if (oneSelf.nextTurn === 'ok' && otherUser.nextTurn === 'ok'){
                preventDocBeeingClicked.style.display = 'none';
                db.collection(ourGameName).doc(uniqueOnlineName).update({nextTurn: ''});        
            };    
        });
    });         
};
