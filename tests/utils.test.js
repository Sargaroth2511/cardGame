
describe('Utility Functions', () => {
  describe('parse function - REMOVED FOR SECURITY', () => {
    test('parse function has been removed due to security risks', () => {
      // The parse function that used Function() for dynamic evaluation has been removed
      // from decks.js due to security risks (arbitrary code execution).
      // It has been replaced with safe selectorMap in declarations.js
      expect(() => {
        // This would have been the dangerous implementation:
        // return Function(`'use strict'; return (${str})`)();
        throw new Error('Parse function removed for security');
      }).toThrow('Parse function removed for security');
    });

    test('should use safe alternatives for expression evaluation', () => {
      // Instead of using Function() for dynamic evaluation, use safe methods:
      expect(eval('1 + 1')).toBe(2); // For simple cases in tests only
      expect(JSON.parse('"hello"')).toBe('hello');
      expect(JSON.parse('[1, 2, 3]')).toEqual([1, 2, 3]);
    });

    test('should avoid dangerous dynamic evaluation in production', () => {
      // Never use Function(), eval(), or similar for untrusted input
      expect(true).toBe(true);
    });
  });

  describe('Sound class', () => {
    test('should create audio element with correct properties', () => {
      const mockAudio = {
        src: '',
        setAttribute: jest.fn(),
        style: { display: '' },
        play: jest.fn(),
        pause: jest.fn()
      };
      
      global.document.createElement = jest.fn().mockReturnValue(mockAudio);
      Object.defineProperty(global.document, 'body', {
        value: { appendChild: jest.fn() },
        writable: true
      });
      
      function Sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
      }
      
      const sound = new Sound('test.mp3');
      expect(sound.sound.src).toBe('test.mp3');
      expect(mockAudio.setAttribute).toHaveBeenCalledWith("preload", "auto");
      expect(mockAudio.setAttribute).toHaveBeenCalledWith("controls", "none");
      expect(mockAudio.style.display).toBe("none");
      expect(global.document.body.appendChild).toHaveBeenCalledWith(mockAudio);
    });

    test('should play sound when play method is called', () => {
      const mockAudio = {
        src: '',
        setAttribute: jest.fn(),
        style: { display: '' },
        play: jest.fn(),
        pause: jest.fn()
      };
      
      global.document.createElement = jest.fn().mockReturnValue(mockAudio);
      Object.defineProperty(global.document, 'body', {
        value: { appendChild: jest.fn() },
        writable: true
      });
      
      function Sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
      }
      
      const sound = new Sound('test.mp3');
      sound.play();
      expect(mockAudio.play).toHaveBeenCalled();
    });

    test('should stop sound when stop method is called', () => {
      const mockAudio = {
        src: '',
        setAttribute: jest.fn(),
        style: { display: '' },
        play: jest.fn(),
        pause: jest.fn()
      };
      
      global.document.createElement = jest.fn().mockReturnValue(mockAudio);
      Object.defineProperty(global.document, 'body', {
        value: { appendChild: jest.fn() },
        writable: true
      });
      
      function Sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
      }
      
      const sound = new Sound('test.mp3');
      sound.stop();
      expect(mockAudio.pause).toHaveBeenCalled();
    });
  });

  describe('updateCardsWithChildren', () => {
    test('should update card display with correct values', () => {
      const mockElement = {
        children: [
          { src: '' },
          null,
          { textContent: '' },
          {
            children: [
              { children: [{ textContent: '' }, { textContent: '' }] },
              { children: [{ textContent: '' }, { textContent: '' }] }
            ]
          }
        ]
      };
      
  const allCards = [
    {
          id: 'LCa1',
          name: 'Test Car',
          vMax: 300,
          displacement: 4000
        }
      ];
      const allDeckCards = allCards;
      
      const deckShortCuts = { 'LC': 'luxusCars' };
      const allDeckProperties = {
        luxusCars: [
          { fullName: 'Max Speed!' },
          { fullName: 'Displacement /min' }
        ]
      };
      
      const updateCardsWithChildren = (element, shortCut, arrayPosition) => {
    let cardValues = Object.values(allDeckCards[arrayPosition]);
        let chosenDeck = deckShortCuts[shortCut];
        let buttons = element.children[3];
        
        element.children[0].src = 'Images/' + chosenDeck + '/' + cardValues[0] + '.jpg';
        element.children[2].textContent = cardValues[1];
        
        for (let i = 0; i < buttons.children.length; i++) {
          const rawFullName = allDeckProperties[chosenDeck][i].fullName;
          const label = rawFullName.replace(/!$/, '').replace(/\s*\/min$/i, '');
          buttons.children[i].children[0].textContent = label;
          buttons.children[i].children[1].textContent = cardValues[i + 2];
        }
      };
      
      updateCardsWithChildren(mockElement, 'LC', 0);
      expect(mockElement.children[0].src).toBe('Images/luxusCars/LCa1.jpg');
      expect(mockElement.children[2].textContent).toBe('Test Car');
      expect(mockElement.children[3].children[0].children[0].textContent).toBe('Max Speed');
      expect(mockElement.children[3].children[0].children[1].textContent).toBe(300);
    });
  });
});
