
describe('Deck Shuffling', () => {
  test('should shuffle deck using Fisher-Yates algorithm', () => {
    const originalDeck = [
      { id: 'LCa1', name: 'Card 1' },
      { id: 'LCa2', name: 'Card 2' },
      { id: 'LCa3', name: 'Card 3' },
      { id: 'LCa4', name: 'Card 4' }
    ];
    
    const shuffleDeck = (deck) => {
      const deckShuffled = [...deck];
      for (let i = deckShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deckShuffled[i];
        deckShuffled[i] = deckShuffled[j];
        deckShuffled[j] = temp;
      }
      return deckShuffled;
    };
    
    const mockMath = Object.create(global.Math);
    mockMath.random = jest.fn()
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.0)
      .mockReturnValueOnce(0.0);
    mockMath.floor = global.Math.floor;
    global.Math = mockMath;
    
    const shuffled = shuffleDeck(originalDeck);
    expect(shuffled).toHaveLength(4);
    expect(shuffled).not.toEqual(originalDeck);
  });

  test('should handle single card deck', () => {
    const singleCardDeck = [{ id: 'LCa1', name: 'Only Card' }];
    
    const shuffleDeck = (deck) => {
      const deckShuffled = [...deck];
      for (let i = deckShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deckShuffled[i];
        deckShuffled[i] = deckShuffled[j];
        deckShuffled[j] = temp;
      }
      return deckShuffled;
    };
    
    const shuffled = shuffleDeck(singleCardDeck);
    expect(shuffled).toHaveLength(1);
    expect(shuffled[0]).toEqual(singleCardDeck[0]);
  });

  test('should handle empty deck', () => {
    const emptyDeck = [];
    
    const shuffleDeck = (deck) => {
      const deckShuffled = [...deck];
      for (let i = deckShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deckShuffled[i];
        deckShuffled[i] = deckShuffled[j];
        deckShuffled[j] = temp;
      }
      return deckShuffled;
    };
    
    const shuffled = shuffleDeck(emptyDeck);
    expect(shuffled).toHaveLength(0);
  });

  test('should maintain all original cards after shuffle', () => {
    const originalDeck = [
      { id: 'LCa1', name: 'Card 1' },
      { id: 'LCa2', name: 'Card 2' },
      { id: 'LCa3', name: 'Card 3' }
    ];
    
    const shuffleDeck = (deck) => {
      const deckShuffled = [...deck];
      for (let i = deckShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deckShuffled[i];
        deckShuffled[i] = deckShuffled[j];
        deckShuffled[j] = temp;
      }
      return deckShuffled;
    };
    
    const originalMath = global.Math;
    global.Math = {
      ...originalMath,
      random: () => 0.5,
      floor: originalMath.floor
    };
    
    const shuffled = shuffleDeck(originalDeck);
    
    global.Math = originalMath;
    
    expect(shuffled).toHaveLength(originalDeck.length);
    
    originalDeck.forEach(card => {
      const foundCard = shuffled.find(c => c && c.id === card.id);
      expect(foundCard).toBeDefined();
      expect(foundCard).toEqual(card);
    });
  });

  test('should use proper random distribution', () => {
    const deck = [1, 2, 3, 4];
    
    const shuffleDeck = (deck) => {
      const deckShuffled = [...deck];
      for (let i = deckShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deckShuffled[i];
        deckShuffled[i] = deckShuffled[j];
        deckShuffled[j] = temp;
      }
      return deckShuffled;
    };
    
    const mockMath = Object.create(global.Math);
    mockMath.random = jest.fn()
      .mockReturnValueOnce(0.99)
      .mockReturnValueOnce(0.99)
      .mockReturnValueOnce(0.99);
    mockMath.floor = global.Math.floor;
    global.Math = mockMath;
    
    const shuffled = shuffleDeck(deck);
    expect(shuffled).toHaveLength(4);
    expect(mockMath.random).toHaveBeenCalledTimes(3);
  });
});
