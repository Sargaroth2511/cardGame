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
    new LuxuryCar ('LCc4', 'Panoz Abruzzi', 340, 6200, 1400, 8, 640, 6500),
    new LuxuryCar ('LCd1', 'Bugatti Chiron', 420, 7993, 1995, 16, 1500, 6700 ),
    new LuxuryCar ('LCd2', 'Koenigsegg Ager', 395, 4700, 1290, 8, 910, 6850),
    new LuxuryCar ('LCd3', 'Pagani Huayra', 370, 5980, 1350, 12, 700, 7200),
    new LuxuryCar ('LCd4', 'Rolls-Royce Gost', 250, 6592, 2435, 12, 571, 5250)
];


const deckShuffled = luxusCarDeck; 

// Random Arrays
const shuffleArray = (deckshuffled) => {
    for (var i = deckShuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deckShuffled[i];
        deckShuffled[i] = deckShuffled[j];
        deckShuffled[j] = temp;
    }
}

 shuffleArray(deckShuffled);
 let play1Deck = deckShuffled.slice(0, deckShuffled.length / 2);
 let play2Deck = deckShuffled.slice(deckShuffled.length / 2);
//  console.log('player1 deck : ', play1Deck);
//  console.log('player2 deck : ', play2Deck);



const sortID = (a, b,) => {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}

const sortVmax = (a, b,) => {
      if ( a.vMax < b.vMax ){
        return 1;
      }
      if ( a.vMax > b.vMax ){
        return -1;
      }
      return 0;
    }

const sortDispl = (a, b,) => {
      if ( a.displace < b.displace ){
        return 1;
      }
      if ( a.displace > b.displace ){
        return -1;
      }
      return 0;
    }
    
const sortWei = (a, b,) => {
      if ( a.weight > b.weight ){
        return 1;
      }
      if ( a.weight < b.weight ){
        return -1;
      }
      return 0;
    }
    
const sortCyl = (a, b,) => {
      if ( a.cylinder < b.cylinder ){
        return 1;
      }
      if ( a.cylinder > b.cylinder ){
        return -1;
      }
      return 0;
    }
    
const sortPow = (a, b,) => {
      if ( a.power < b.power ){
        return 1;
      }
      if ( a.power > b.power ){
        return -1;
      }
      return 0;
    }
    
const sortRpm = (a, b,) => {
      if ( a.rpm < b.rpm ){
        return 1;
      }
      if ( a.rpm > b.rpm ){
        return -1;
      }
      return 0;
    }    
    
const luxusCarDeckSortvMax = Array.from(luxusCarDeck.sort(sortVmax));
const luxusCarDeckSortDispl =Array.from(luxusCarDeck.sort(sortDispl));
const luxusCarDeckSortWei =Array.from(luxusCarDeck.sort(sortWei));
const luxusCarDeckSortCyl =Array.from(luxusCarDeck.sort(sortCyl));
const luxusCarDeckSortPow =Array.from(luxusCarDeck.sort(sortPow));
const luxusCarDeckSortRpm =Array.from(luxusCarDeck.sort(sortRpm));
const luxusCarDeckSortID = Array.from(luxusCarDeck.sort(sortID));




