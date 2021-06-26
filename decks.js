class ElectricCar {
    constructor(id, name, vMax, power, acc, reach, weight, price){
        this.id = id;
        this.name = name;
        this.vMax = vMax;
        this.power = power;
        this.acc = acc;
        this.reach = reach;
        this.weight = weight;
        this.price = price;
    }
}

const eleCarDeck = [
    new ElectricCar('ECa1','Audi e-tron 55 quattro S', 200, 408, 5.7, 436, 2595, 84450),
    new ElectricCar('ECa2','BMW i3', 150, 125, 7.2, 330, 1335, 39000),
    new ElectricCar('ECa3', 'Ford Mustan Mach-E', 180, 351, 5.8, 610, 2257, 54475),
    new ElectricCar('ECa4', 'Opel Ampera-e', 150, 204, 7.3, 520, 1691, 39330)
]

 function compareprice(a, b) {
    const priceA = a.price;
    const priceB = b.price;

    let comparison = 0;
    if (priceA > priceB) {
        comparison = 1;
    } else if ( priceA < priceB) {
        comparison = -1;
    }
    return comparison;
}
// Sorted Arrays
const eleCarDeckSortPrice = eleCarDeck.sort(compareprice);

// Random Arrays
function shuffleArray(eleCarDeck) {
    for (var i = eleCarDeck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = eleCarDeck[i];
        eleCarDeck[i] = eleCarDeck[j];
        eleCarDeck[j] = temp;
    }
}

 shuffleArray(eleCarDeck);
 const deckShuffled = eleCarDeck; 
 console.log(deckShuffled);
 let play1Deck = deckShuffled.slice(0, deckShuffled.length / 2);
 let play2Deck = deckShuffled.slice(deckShuffled.length / 2);
//  console.log('player1 deck : ', play1Deck);
//  console.log('player2 deck : ', play2Deck);
