global.firebase = {
  auth: jest.fn(() => ({
    currentUser: { uid: 'test-uid' },
    onAuthStateChanged: jest.fn(),
    signInWithPopup: jest.fn(),
    signInAnonymously: jest.fn()
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        get: jest.fn(() => Promise.resolve({ data: () => ({}) })),
        onSnapshot: jest.fn()
      })),
      add: jest.fn(() => Promise.resolve({ id: 'test-id' })),
      where: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ empty: false, forEach: jest.fn() }))
      }))
    }))
  })),
  analytics: jest.fn(),
  initializeApp: jest.fn()
};

global.db = global.firebase.firestore();

global.document.querySelector = jest.fn();
global.document.querySelectorAll = jest.fn(() => []);
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

global.console.log = jest.fn();
global.console.error = jest.fn();
