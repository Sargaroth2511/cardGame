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
    new LuxuryCar ('LCc4', 'Panoz Abruzzi', 340, 6200, 1400, 8, 640, 6500)
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
const luxusCarDeckSortPrice = luxusCarDeck.sort(compareprice);

// Random Arrays
function shuffleArray(luxusCarDeck) {
    for (var i = luxusCarDeck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = luxusCarDeck[i];
        luxusCarDeck[i] = luxusCarDeck[j];
        luxusCarDeck[j] = temp;
    }
}

 shuffleArray(luxusCarDeck);
 const deckShuffled = luxusCarDeck; 
 let play1Deck = deckShuffled.slice(0, deckShuffled.length / 2);
 let play2Deck = deckShuffled.slice(deckShuffled.length / 2);
//  console.log('player1 deck : ', play1Deck);
//  console.log('player2 deck : ', play2Deck);




