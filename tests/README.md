# CardGame Test Suite

## Overview
This test suite provides comprehensive unit testing for the SuperTrumpf card game application.

## Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure
- `setup.js` - Global test setup and mocks
- `decks.test.js` - Deck management and card operations
- `ai.test.js` - AI decision-making algorithms
- `turn.test.js` - Game turn logic and card comparisons
- `utils.test.js` - Utility functions and helpers
- `shuffle.test.js` - Deck shuffling algorithms
- `comparison.test.js` - Card comparison and animation logic

## Mocking Strategy
- Firebase functions are mocked globally
- DOM elements are mocked using Jest
- localStorage is mocked for testing
- Math.random is mocked for predictable testing

## Coverage Goals
- Pure functions: 100% coverage
- Game logic: 90%+ coverage
- UI functions: 70%+ coverage (focus on business logic)

## Security Notes
The `parse()` function in decks.js uses `Function()` constructor which is a security risk.
Consider refactoring to use safer alternatives like JSON.parse() or a proper expression parser.

## Test Categories

### Deck Management Tests (`decks.test.js`)
- Card sorting algorithms
- Card searching and filtering
- Game status management
- Card class constructors

### AI Logic Tests (`ai.test.js`)
- Random AI decision making
- Medium difficulty AI (hybrid random/smart)
- Smart AI algorithm that analyzes card rankings
- AI function dispatching based on difficulty

### Turn Management Tests (`turn.test.js`)
- Card property comparison logic
- Winner determination
- Draw scenario handling
- UI state management during turns
- Button enable/disable functionality

### Utility Function Tests (`utils.test.js`)
- Security-risk `parse()` function testing
- Sound class functionality
- Card display update logic
- DOM manipulation helpers

### Shuffling Algorithm Tests (`shuffle.test.js`)
- Fisher-Yates shuffle implementation
- Edge cases (empty deck, single card)
- Randomness distribution verification
- Card preservation during shuffle

### Comparison Logic Tests (`comparison.test.js`)
- Card comparison by property index
- Animation sequence management
- Stat bar animation logic
- Outcome animation display

## Key Functions Tested

### Pure Functions (100% Coverage Target)
- `sortID()` - Card sorting by ID
- `searchID()` - Card searching by ID collection
- `getStatus()` - Game status from localStorage
- `comparePropertyAndAssignCards()` - Core game logic
- Fisher-Yates shuffle algorithm

### Game Logic Functions (90%+ Coverage Target)
- AI decision making (`aiPickRandom`, `aiMedium`, `aiSmart`)
- Turn management and UI updates
- Winner determination logic
- Card comparison and animation sequences

### Utility Functions (70%+ Coverage Target)
- `parse()` function (flagged as security risk)
- `Sound` class for audio management
- `updateCardsWithChildren()` for card display
- DOM manipulation helpers

## Mocked Dependencies

### Firebase
- Authentication methods
- Firestore database operations
- Collection and document operations
- Real-time listeners

### DOM Elements
- `document.querySelector` and `querySelectorAll`
- Element properties and methods
- Event listeners and handlers

### Browser APIs
- `localStorage` get/set operations
- `Math.random` for predictable testing
- Audio element creation and control

## Future Improvements
- Add integration tests for Firebase interactions
- Add end-to-end tests for complete game flows
- Add performance tests for AI algorithms
- Add visual regression tests for UI components
- Consider property-based testing for game logic
- Add stress tests for large deck operations

## Running Individual Test Suites
```bash
# Run specific test file
npm test decks.test.js

# Run tests matching pattern
npm test -- --testNamePattern="AI Logic"

# Run tests with verbose output
npm test -- --verbose

# Run tests and update snapshots
npm test -- --updateSnapshot
```

## Debugging Tests
```bash
# Run tests in debug mode
npm test -- --runInBand --no-cache

# Run single test with full output
npm test -- --testNamePattern="should sort cards" --verbose
```

## Code Coverage Reports
After running `npm run test:coverage`, check the `coverage/` directory for detailed HTML reports showing:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

## Contributing to Tests
When adding new game features:
1. Write tests for pure functions first
2. Mock external dependencies appropriately
3. Test edge cases and error conditions
4. Maintain high coverage for business logic
5. Document any security concerns
6. Update this README with new test categories
