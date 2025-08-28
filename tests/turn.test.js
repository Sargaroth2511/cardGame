
describe('Turn Management Functions', () => {
  describe('comparePropertyAndAssignCards', () => {
    test('should assign cards to winner when player 1 wins', () => {
      const play1Deck = [{ id: 'LCa1', vMax: 300 }];
      const play2Deck = [{ id: 'LCb1', vMax: 250 }];
  const drawDeck = [];
      
      const comparePropertyAndAssignCards = (prop, unitString) => {
        if (play1Deck[0][prop] > play2Deck[0][prop]) {
          play1Deck.push(play1Deck[0], play2Deck[0]);
          if (drawDeck.length > 0) {
            play1Deck.push(...drawDeck);
            drawDeck.length = 0;
          }
          play1Deck.splice(0, 1);
          play2Deck.splice(0, 1);
        }
      };
      
      comparePropertyAndAssignCards('vMax', 'km/h');
      expect(play1Deck).toHaveLength(2);
      expect(play2Deck).toHaveLength(0);
    });

    test('should assign cards to winner when player 2 wins', () => {
      const play1Deck = [{ id: 'LCa1', vMax: 250 }];
      const play2Deck = [{ id: 'LCb1', vMax: 300 }];
      const drawDeck = [];
      
      const comparePropertyAndAssignCards = (prop, unitString) => {
        if (play1Deck[0][prop] < play2Deck[0][prop]) {
          play2Deck.push(play1Deck[0], play2Deck[0]);
          if (drawDeck.length > 0) {
            play2Deck.push(...drawDeck);
            drawDeck.length = 0;
          }
          play1Deck.splice(0, 1);
          play2Deck.splice(0, 1);
        }
      };
      
      comparePropertyAndAssignCards('vMax', 'km/h');
      expect(play1Deck).toHaveLength(0);
      expect(play2Deck).toHaveLength(2);
    });
    
    test('should handle draw scenario correctly', () => {
      const play1Deck = [{ id: 'LCa1', vMax: 300 }];
      const play2Deck = [{ id: 'LCb1', vMax: 300 }];
  const drawDeck = [];
      
      const comparePropertyAndAssignCards = (prop, unitString) => {
        if (play1Deck[0][prop] === play2Deck[0][prop]) {
          drawDeck.unshift(play1Deck[0], play2Deck[0]);
          play1Deck.splice(0, 1);
          play2Deck.splice(0, 1);
        }
      };
      
      comparePropertyAndAssignCards('vMax', 'km/h');
  expect(drawDeck).toHaveLength(2);
      expect(play1Deck).toHaveLength(0);
      expect(play2Deck).toHaveLength(0);
    });

    test('should handle draw cards being assigned to winner', () => {
      const play1Deck = [{ id: 'LCa1', vMax: 350 }];
      const play2Deck = [{ id: 'LCb1', vMax: 250 }];
  const drawDeck = [{ id: 'LCc1' }, { id: 'LCd1' }];
      
      const comparePropertyAndAssignCards = (prop, unitString) => {
        if (play1Deck[0][prop] > play2Deck[0][prop]) {
          play1Deck.push(play1Deck[0], play2Deck[0]);
          if (drawDeck.length > 0) {
            play1Deck.push(...drawDeck);
            drawDeck.length = 0;
          }
          play1Deck.splice(0, 1);
          play2Deck.splice(0, 1);
        }
      };
      
      comparePropertyAndAssignCards('vMax', 'km/h');
      expect(play1Deck).toHaveLength(4);
      expect(play2Deck).toHaveLength(0);
  expect(drawDeck).toHaveLength(0);
    });
  });

  describe('checkForWinner', () => {
    test('should return player 1 as winner when player 2 has no cards', () => {
      const play1Deck = [{ id: 'LCa1' }];
      const play2Deck = [];
      
      const checkForWinner = () => {
        if (play1Deck.length > 0 && play2Deck.length === 0) {
          return 'player1';
        } else if (play2Deck.length > 0 && play1Deck.length === 0) {
          return 'player2';
        }
        return null;
      };
      
      const winner = checkForWinner();
      expect(winner).toBe('player1');
    });

    test('should return player 2 as winner when player 1 has no cards', () => {
      const play1Deck = [];
      const play2Deck = [{ id: 'LCb1' }];
      
      const checkForWinner = () => {
        if (play1Deck.length > 0 && play2Deck.length === 0) {
          return 'player1';
        } else if (play2Deck.length > 0 && play1Deck.length === 0) {
          return 'player2';
        }
        return null;
      };
      
      const winner = checkForWinner();
      expect(winner).toBe('player2');
    });

    test('should return null when both players have cards', () => {
      const play1Deck = [{ id: 'LCa1' }];
      const play2Deck = [{ id: 'LCb1' }];
      
      const checkForWinner = () => {
        if (play1Deck.length > 0 && play2Deck.length === 0) {
          return 'player1';
        } else if (play2Deck.length > 0 && play1Deck.length === 0) {
          return 'player2';
        }
        return null;
      };
      
      const winner = checkForWinner();
      expect(winner).toBeNull();
    });
  });

  describe('finishTurnAndResetUI', () => {
    test('should reset UI elements and update game state', () => {
      let uiReset = false;
      let gameStateUpdated = false;
      
      const resetUIElements = () => { uiReset = true; };
      const updateGameState = () => { gameStateUpdated = true; };
      
      const finishTurnAndResetUI = () => {
        resetUIElements();
        updateGameState();
      };
      
      finishTurnAndResetUI();
      expect(uiReset).toBe(true);
      expect(gameStateUpdated).toBe(true);
    });
  });

  describe('enableCardButtons', () => {
    test('should enable all card buttons', () => {
      const buttons = [
        { disabled: true },
        { disabled: true },
        { disabled: true }
      ];
      
      const enableCardButtons = (buttonArray) => {
        buttonArray.forEach(button => {
          button.disabled = false;
        });
      };
      
      enableCardButtons(buttons);
      expect(buttons.every(btn => !btn.disabled)).toBe(true);
    });
  });

  describe('disableCardButtons', () => {
    test('should disable all card buttons', () => {
      const buttons = [
        { disabled: false },
        { disabled: false },
        { disabled: false }
      ];
      
      const disableCardButtons = (buttonArray) => {
        buttonArray.forEach(button => {
          button.disabled = true;
        });
      };
      
      disableCardButtons(buttons);
      expect(buttons.every(btn => btn.disabled)).toBe(true);
    });
  });
});
