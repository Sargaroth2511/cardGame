class LuxuryCar {
    constructor(id, name, vMax, displace, weight, cylinder, power, rpm){
        this.id = id;
        this.name = name;
        this.vMax = vMax;
        this.displace = displace;
        this.weight = weight;
        this.cylinder = cylinder;
        this.power = power;
        this.rpm = rpm;
    }
}

const eleCarDeck = [
    new LuxuryCar ('LCa1', 'Bentley Continental GT', 318, 5998, 2320, 12, 575, 6000),
    new LuxuryCar ('LCa2', 'Porsche Panamera Turbo', 303, 4806, 2019, 8, 500, 6000),
    new LuxuryCar ('LCa3', 'BMW 650i Grand Coupé', 250, 4395, 1940, 8, 450, 6000),
    new LuxuryCar ('LCa4', 'Lamborghini Aventador', 349, 6498, 1575, 12, 700, 8250),
    new LuxuryCar ('LCb1', 'Ruf RT 12', 340, 3746, 1500, 6, 650, 7000),
    new LuxuryCar ('LCb2', 'Lexus LC 500', 270, 4969, 1935, 8, 477, 7100),
    new LuxuryCar ('LCb3', 'Mercedes AMG GT', 304, 3982, 1645, 8, 462, 6000),
    new LuxuryCar ('LCb4', 'Mazanti Eventra', 350, 7000, 1300, 8, 701, 6600)
];

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
 let play1Deck = deckShuffled.slice(0, deckShuffled.length / 2);
 let play2Deck = deckShuffled.slice(deckShuffled.length / 2);
//  console.log('player1 deck : ', play1Deck);
//  console.log('player2 deck : ', play2Deck);




