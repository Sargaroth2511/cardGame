// AI decision logic for CPU play
const playAI = () => {
    if (!isPlayingOnline){
        let difficulty = localStorage.getItem('difficulty');
        if (difficulty === 'easy'){
            aiPickRandom();
        } else if (difficulty === 'medium'){
            aiMedium();
        } else if (difficulty === 'hard'){
            aiSmart();
        } else {console.log('Difficulty Error')}
    };
    
    function aiPickRandom(){
        if (vMaxBtn.disabled) {
        let num = (Math.random() * card1Buttons.length);
        let i = Math.floor(num);
        compareTopCardsByIndex(i);
        }; 
    };
    
    function aiMedium(){
        let num = Math.random();
        if (num >= GAME_CONSTANTS.AI_MEDIUM_RANDOM_THRESHOLD) {
            aiPickRandom();
        } else {
            aiSmart();
        };
    };
    
    function aiSmart(){
        if (vMaxBtn.disabled) {
            let indexOfCardValuesArray = [];
    
            let card2Entries = Object.entries(play2Deck[0]);
                for(let i = 2; i < card2Entries.length; i++){
                    let card2PropertyValue = card2Entries[i][1];
                    let index = sortedDecks[i-2].findIndex(x => x[card2Entries[i][0]] === card2PropertyValue);
                    let indexOfCardValues = {
                        index: index,
                        value: card2PropertyValue,
                        i : i-2
                    };
                    indexOfCardValuesArray.push(indexOfCardValues)
                };
            indexOfCardValuesArray.sort((a, b) => a.index - b.index);
            let numberOfSelectedCardElement = indexOfCardValuesArray[0].i;
            compareTopCardsByIndex(numberOfSelectedCardElement);
        };
    };
};
