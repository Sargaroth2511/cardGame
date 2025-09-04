(function () {
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve(src);
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.body.appendChild(s);
    });
  }

  function loadSequential(scripts) {
    return scripts.reduce((p, src) => p.then(() => loadScript(src)), Promise.resolve());
  }

  function isGamePage() {
    return /luxCarGame\.html/i.test(location.pathname) || document.querySelector('#player1Deck') || document.querySelector('#player2Deck');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (isGamePage()) {
      const gameScripts = [
        'debug/debugOverlay.js', // optional overlay (enabled via localStorage or ?debug=1)
        'decks.js',              // provides deck data, globals, and helpers (setDBdocs, etc.)
        'declarations.js',
        'turn.js',
        'compareFuncs.js',       // consolidated comparison and game logic functions
        'ai.js',
        'firebaseListeners.js',
        'startGame.js',
        'interactions/deckInteractions.js',
        'controls/gameControls.js',
        'auth/authHandlers.js'
      ];
      loadSequential(gameScripts)
        .then(() => {
          if (typeof initDeckInteractions === 'function') initDeckInteractions();
          if (typeof initGameControls === 'function') initGameControls();
          if (typeof initAuthHandlers === 'function') initAuthHandlers();
        })
        .catch(err => console.error(err));
    } else {
      const startScripts = [
        'decks.js',
        'indexListeners.js'
      ];
      loadSequential(startScripts).catch(err => console.error(err));
    }
  });
})();
