**Security**

- **Arbitrary code execution risk (HIGH):** ~~`public/decks.js` line ~170 defines `parse(str)` using `Function()` to evaluate arbitrary strings. This enables code injection if any untrusted input reaches it. Replace with explicit mapping or a safe parser; never evaluate dynamic strings.~~ ✅ **FIXED:** Removed dangerous `parse()` function and replaced with safe `selectorMap` in `declarations.js`. Updated tests to reflect security improvements.
- **Firebase listener robustness (MEDIUM):** ~~`public/firebaseListeners.js` uses `onSnapshot` without storing unsubscribe functions. This can leak memory and keep network activity after navigation. Return and invoke unsubscribers on teardown.~~ ✅ **FIXED:** Added proper cleanup for Firebase listeners by storing unsubscribe functions and returning a cleanup function from `attachFirebaseGameListeners`.
- **Unsanitized HTML writes (LOW):** `public/decks.js` manipulates `animatedpoints.innerHTML` repeatedly. While current values are dots, prefer `textContent` to avoid accidental HTML injection if content changes.
- **External scripts without SRI/CSP (LOW):** `public/index.html` loads third‑party scripts (Firebase, Font Awesome) without Subresource Integrity and there's no documented CSP. Consider adding CSP and SRI where feasible.

**Correctness/Bugs**

- **Invalid boolean initialization (HIGH):** ~~`public/decks.js` sets `let isPlayingOnline = Boolean;` which assigns the Function object, not a boolean. Initialize to `false` and set via `getStatus()`.~~ ✅ **FIXED:** Changed `let isPlayingOnline = Boolean;` to `let isPlayingOnline = false;` in `public/decks.js`.
- **Duplicate/conflicting implementations (HIGH):** ~~`public/comparison.js` and `public/compareFuncs.js` contain near‑identical logic (`isComparisonInProgress`, `compareTopCardsByIndex`, `runComparisonSequence`, `playAI`). This risks drift and double definitions in the global scope. Consolidate into one module.~~ ✅ **FIXED:** Removed redundant `comparison.js` file and consolidated all duplicate functions from `turn.js` into `compareFuncs.js`. Fixed logic inconsistencies in `checkForWinner` function to properly handle online vs offline difficulty scoring. Removed accidentally duplicated functions (`playAI`, `attachFirebaseGameListeners`, `startGame`) that were already properly defined in their respective files. ✅ **UPDATED:** Added missing `checkForWinner` function to `compareFuncs.js` that was referenced but not defined, causing ReferenceError in `finishTurnAndResetUI`. ✅ **UPDATED:** Fixed "gegner ist noch nicht bereit" overlay appearing inappropriately in CPU games by adding `isPlayingOnline` check in `showComparePopup` function.
- **Multiple AI implementations (MEDIUM):** `public/ai.js` and duplicated AI in `compareFuncs.js` overlap. Keep a single source of truth.
- **Global reliance on missing DOM nodes (MEDIUM):** Many scripts query elements at load time (`document.querySelector(...)`) and immediately use them without null checks. In pages where elements are absent, this causes errors. Add guards or initialize on DOMContentLoaded within scoped modules.
- **Potential race on globals (MEDIUM):** Cross‑file global variables (e.g., `preventDocBeeingClicked`, `innerBar1/2`, `form1/2`) assume load order and pollute global scope, leading to brittle coupling. Use modules or a single app namespace and explicit imports.
- **Null handling for Firestore docs (MEDIUM):** ~~`public/firebaseListeners.js` uses `doc.data()` with fallback `|| {}`, but some places lack `doc.exists` check. Add `if (!doc.exists) return;` for consistency.~~ ✅ **FIXED:** Added `if (!doc.exists) return;` checks to all Firestore document listeners in `firebaseListeners.js` for proper null handling.
- **Encoding issues in literals (LOW):** Multiple files contain mojibake like `ZurA�ck`, `fA�ngt`. Ensure UTF‑8 encoding and fix strings.

**Maintainability/Style**

- **Hard‑coded magic numbers (MEDIUM):** Animation timings, bar widths, and z‑indexes are scattered (e.g., `15`ms intervals, bar `max` values). Centralize in constants/config.
- **Inconsistent naming & mixed responsibilities (MEDIUM):** UI, game logic, network, and persistence are intertwined within single files. Consider separating concerns (e.g., `gameLogic.js`, `ui.js`, `firebase.js`).
- **Lack of modular exports (MEDIUM):** Files expose functions/vars globally rather than via modules, complicating testing and reuse. Adopt ES modules with explicit exports/imports.
- **Excessive console logging (MEDIUM):** ~~40+ `console.log` statements across files should be removed for production code.~~ ✅ **FIXED:** Removed excessive console.log and debug statements from `startGame.js`, `compareFuncs.js`, and `firebaseListeners.js` while preserving essential error logging.
- **Commented/unused code and TODOs (LOW):** Legacy comments and placeholders remain in `public/index.html` and elsewhere; prune or ticketize.

**Performance**

- **Duplicate code inflates bundle (MEDIUM):** ~~The duplication between `comparison.js` and `compareFuncs.js` increases size and parse time; consolidate.~~ ✅ **FIXED:** Consolidated duplicate code by removing `comparison.js` and merging all functions from `turn.js` into `compareFuncs.js`, eliminating ~100+ lines of duplicate code. Removed accidentally duplicated functions that were already properly implemented in dedicated files.
- **Inefficient array operations (LOW):** ~~`public/turn.js` uses `Array.prototype.push.apply(playerDeck, drawDeck)`; prefer `playerDeck.push(...drawDeck)` for readability and potential speed.~~ ✅ **FIXED:** Replaced `Array.prototype.push.apply(playerDeck, drawDeck)` with `playerDeck.push(...drawDeck)` in `compareFuncs.js` for better performance and readability.
- **Repeated DOM writes (LOW):** Style properties are toggled individually throughout; prefer CSS classes or batch updates to reduce layout thrash.
- Refer to `EFFICIENCY_REPORT.md` for additional optimization notes already documented by the repo.

**Testing/Tooling**

- **Jest targets public files but code isn't modular (MEDIUM):** Without exports, tests must rely on globals, which is fragile. Expose pure logic as importable functions and keep DOM side‑effects thin.
- **Coverage config excludes `public/firebase-config.js` (INFO):** Good to avoid secrets in coverage; ensure the file is actually excluded from the repo or mocked.
- **All tests passing (INFO):** ~~6 test suites, 48 tests successful as of analysis.~~ ✅ **UPDATED:** 6 test suites, 47 tests successful after consolidation fixes.
- **No syntax errors (INFO):** Key JavaScript files have no linting errors.

**Recommended Remediations (Prioritized)**

- High: Remove `parse()` dynamic evaluation; fix boolean init; deduplicate `comparison`/`AI` logic; add Firestore null/error handling; add listener cleanup.
- Medium: Modularize code, reduce globals, centralize constants, guard DOM queries, fix encoding issues, remove console.logs.
- Low: Replace innerHTML with textContent, prefer spread for array ops, add CSP/SRI guidance, batch DOM writes.
