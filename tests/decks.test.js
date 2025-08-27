
describe('Deck Management Functions', () => {
  describe('sortID', () => {
    test('should sort cards by ID in ascending order', () => {
      const cards = [
        { id: 'LCc1', name: 'Card C' },
        { id: 'LCa1', name: 'Card A' },
        { id: 'LCb1', name: 'Card B' }
      ];
      
      const sortID = (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      };
      
      const sorted = cards.sort(sortID);
      expect(sorted[0].id).toBe('LCa1');
      expect(sorted[1].id).toBe('LCb1');
      expect(sorted[2].id).toBe('LCc1');
    });

    test('should handle equal IDs', () => {
      const cards = [
        { id: 'LCa1', name: 'Card A1' },
        { id: 'LCa1', name: 'Card A2' }
      ];
      
      const sortID = (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      };
      
      const sorted = cards.sort(sortID);
      expect(sorted).toHaveLength(2);
      expect(sorted[0].id).toBe('LCa1');
      expect(sorted[1].id).toBe('LCa1');
    });
  });

  describe('searchID', () => {
    test('should find cards by ID and add to target deck', () => {
      const startDeck = [
        { id: 'LCa1', name: 'Card A' },
        { id: 'LCb1', name: 'Card B' },
        { id: 'LCc1', name: 'Card C' }
      ];
      const IDcollection = ['LCa1', 'LCc1'];
      const endDeck = [];
      
      const searchID = (startDeck, IDcollection, endDeck) => {
        for (let i = 0; i < IDcollection.length; i++) {
          let result = startDeck.find(e => e.id === IDcollection[i]);
          endDeck.push(result);
        }
      };
      
      searchID(startDeck, IDcollection, endDeck);
      expect(endDeck).toHaveLength(2);
      expect(endDeck[0].id).toBe('LCa1');
      expect(endDeck[1].id).toBe('LCc1');
    });

    test('should handle missing IDs gracefully', () => {
      const startDeck = [
        { id: 'LCa1', name: 'Card A' }
      ];
      const IDcollection = ['LCa1', 'LCx1'];
      const endDeck = [];
      
      const searchID = (startDeck, IDcollection, endDeck) => {
        for (let i = 0; i < IDcollection.length; i++) {
          let result = startDeck.find(e => e.id === IDcollection[i]);
          endDeck.push(result);
        }
      };
      
      searchID(startDeck, IDcollection, endDeck);
      expect(endDeck).toHaveLength(2);
      expect(endDeck[0].id).toBe('LCa1');
      expect(endDeck[1]).toBeUndefined();
    });
  });

  describe('getStatus', () => {
    let playsOnline;
    let originalLocalStorage;
    
    beforeEach(() => {
      jest.clearAllMocks();
      playsOnline = false;
      originalLocalStorage = global.localStorage;
    });

    afterEach(() => {
      global.localStorage = originalLocalStorage;
    });

    test('should set playsOnline to true when localStorage has Online', () => {
      const mockGetItem = jest.fn().mockReturnValue('Online');
      const mockLocalStorage = {
        getItem: mockGetItem,
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      };
      
      global.localStorage = mockLocalStorage;
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      });
      
      const getStatus = () => {
        if (localStorage.getItem('online?') === 'Online') {
          playsOnline = true;
        } else if (localStorage.getItem('online?') === 'CPU') {
          playsOnline = false;
        }
      };
      
      getStatus();
      expect(playsOnline).toBe(true);
      expect(mockGetItem).toHaveBeenCalledWith('online?');
    });
    
    test('should set playsOnline to false when localStorage has CPU', () => {
      playsOnline = true;
      const mockGetItem = jest.fn().mockReturnValue('CPU');
      const mockLocalStorage = {
        getItem: mockGetItem,
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      };
      
      global.localStorage = mockLocalStorage;
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      });
      
      const getStatus = () => {
        if (localStorage.getItem('online?') === 'Online') {
          playsOnline = true;
        } else if (localStorage.getItem('online?') === 'CPU') {
          playsOnline = false;
        }
      };
      
      getStatus();
      expect(playsOnline).toBe(false);
      expect(mockGetItem).toHaveBeenCalledWith('online?');
    });

    test('should handle null localStorage value', () => {
      playsOnline = true;
      const mockGetItem = jest.fn().mockReturnValue(null);
      const mockLocalStorage = {
        getItem: mockGetItem,
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      };
      
      global.localStorage = mockLocalStorage;
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      });
      
      const getStatus = () => {
        if (localStorage.getItem('online?') === 'Online') {
          playsOnline = true;
        } else if (localStorage.getItem('online?') === 'CPU') {
          playsOnline = false;
        }
      };
      
      getStatus();
      expect(playsOnline).toBe(true);
      expect(mockGetItem).toHaveBeenCalledWith('online?');
    });
  });

  describe('LuxuryCar class', () => {
    test('should create luxury car with all properties', () => {
      class LuxuryCar {
        constructor(id, name, vMax, displacement, weight, cylinders, power, rpm) {
          this.id = id;
          this.name = name;
          this.vMax = vMax;
          this.displacement = displacement;
          this.weight = weight;
          this.cylinders = cylinders;
          this.power = power;
          this.rpm = rpm;
        }
      }

      const car = new LuxuryCar('LCa1', 'Bentley', 300, 4000, 2500, 8, 500, 6000);
      expect(car.id).toBe('LCa1');
      expect(car.name).toBe('Bentley');
      expect(car.vMax).toBe(300);
      expect(car.displacement).toBe(4000);
      expect(car.weight).toBe(2500);
      expect(car.cylinders).toBe(8);
      expect(car.power).toBe(500);
      expect(car.rpm).toBe(6000);
    });
  });

  describe('AutosalonCar class', () => {
    test('should create autosalon car with all properties', () => {
      class AutosalonCar {
        constructor(id, name, vMax, displacement, weight, cylinders, power, rpm) {
          this.id = id;
          this.name = name;
          this.vMax = vMax;
          this.displacement = displacement;
          this.weight = weight;
          this.cylinders = cylinders;
          this.power = power;
          this.rpm = rpm;
        }
      }

      const car = new AutosalonCar('ACa1', 'Toyota', 180, 2000, 1200, 4, 150, 5500);
      expect(car.id).toBe('ACa1');
      expect(car.name).toBe('Toyota');
      expect(car.vMax).toBe(180);
      expect(car.displacement).toBe(2000);
      expect(car.weight).toBe(1200);
      expect(car.cylinders).toBe(4);
      expect(car.power).toBe(150);
      expect(car.rpm).toBe(5500);
    });
  });
});
