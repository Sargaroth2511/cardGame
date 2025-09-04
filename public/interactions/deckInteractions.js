// Handles deck zoom/clone and drag interactions in the game view
// Depends on globals from other scripts: isPlayerOne, play1Deck, play2Deck, updateUICardElements

(function () {
  function initDeckInteractions() {
    const playgroundEl = document.querySelector('.playground');
    if (!playgroundEl) return;

    const player1DeckEl = document.querySelector('#player1Deck');
    const player2DeckEl = document.querySelector('#player2Deck');
    const deckElements = [player1DeckEl, player2DeckEl].filter(Boolean);
    if (deckElements.length === 0) return;

    // State
    let isDragging = false;
    let isZoomed = false;
    let zoomedCardIds = [];
    let activeDeckData;          // play1Deck or play2Deck (from globals)
    let activeDeckEl;            // element for the active player's deck
    let activeDeckKey;           // 'Deck1' | 'Deck2'
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let initialTransformX;
    let initialTransformY;
    let originalZIndex;
    const viewportWidth = Math.max(document.documentElement.clientWidth);
    let deckTopEdgeY;

    function setActiveDeckContext() {
      if (isPlayerOne) {
        activeDeckData = play1Deck;
        activeDeckEl = player1DeckEl;
        activeDeckKey = 'Deck1';
      } else {
        activeDeckData = play2Deck;
        activeDeckEl = player2DeckEl;
        activeDeckKey = 'Deck2';
      }
    }

    function zoomIntoDeck() {
      isZoomed = true;
      activeDeckEl.style.transform = 'translateX(-30%) translateY(-20%) scale(0.6)';
      activeDeckEl.style.transition = 'transform 0.3s';
      activeDeckEl.classList.add('movingCard');
      activeDeckEl.ontransitionend = () => {
        const rect = activeDeckEl.getBoundingClientRect();
        deckTopEdgeY = rect.top;
      };
    }

    function cloneDeckCard(deckEl, i, deckKey, deckData) {
      const newCard = deckEl.cloneNode(true);
      newCard.id = `card${i}`;
      newCard.style.zIndex = 16 + deckData.length - i;
      // Preserve existing structure indexing
      if (newCard.childNodes[7]) newCard.childNodes[7].id = `form1Deck${i}`;
      playgroundEl.appendChild(newCard);
      if (typeof updateUICardElements === 'function') {
        updateUICardElements(deckKey, deckData, i);
      }
      zoomedCardIds.push(newCard.id);
    }

    function handleDeckClick() {
      setActiveDeckContext();
      if (!isZoomed) {
        zoomIntoDeck();
        for (let i = 2; i < activeDeckData.length; i++) {
          cloneDeckCard(activeDeckEl, i, activeDeckKey, activeDeckData);
        }
      }
    }

    function resetDeckZoom() {
      for (let i = 0; i < zoomedCardIds.length; i++) {
        const node = document.querySelector(`#${zoomedCardIds[i]}`);
        if (node) node.remove();
        if (i === zoomedCardIds.length - 1) zoomedCardIds = [];
      }
      isZoomed = false;
      activeDeckEl.classList.remove('movingCard');
      activeDeckEl.style.transform = 'scale(0.3)';
      activeDeckEl.style.transition = 'none';
      if (typeof updateUICardElements === 'function') {
        updateUICardElements(activeDeckKey, activeDeckData, 1);
      }
    }

    function setTranslate(x, y, el) {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(0.7)`;
      el.style.transition = 'none';
      el.style.boxShadow = '0 10px 12px 0 rgba(0, 5, 5, 0.8)';
    }

    function readTransformPosition(targetEl) {
      const comp = window.getComputedStyle(targetEl);
      const matrix = comp.transform || comp.webkitTransform || comp.mozTransform;
      const type = (matrix && matrix.includes('3d')) ? '3d' : '2d';
      const match = matrix && matrix.match(/matrix.*\((.+)\)/);
      if (!match) { initialTransformX = 0; initialTransformY = 0; return; }
      const values = match[1].split(', ');
      if (type === '2d') {
        initialTransformX = Number(values[4]);
        initialTransformY = Number(values[5]);
      } else {
        initialTransformX = Number(values[12]);
        initialTransformY = Number(values[13]);
      }
    }

    function beginDrag(e) {
      if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
      } else {
        initialX = e.clientX;
        initialY = e.clientY;
      }

      if (e.target.classList.contains('movingCard')) {
        readTransformPosition(e.target);
        grabElement(e);
      } else if (!e.target.classList.contains('movingCard') && isZoomed) {
        resetDeckZoom();
      }
    }

    function grabElement(e) {
      isDragging = true;
      originalZIndex = e.target.style.zIndex;
      e.target.style.zIndex = 50;
      e.target.addEventListener('mouseleave', endDrag, false);
      if (e.type === 'touchstart') {
        currentX = initialTransformX + e.touches[0].clientX - initialX;
        currentY = initialTransformY + e.touches[0].clientY - initialY;
      } else {
        currentX = initialTransformX + e.clientX - initialX;
        currentY = initialTransformY + e.clientY - initialY;
      }
      setTranslate(currentX, currentY, e.target);
    }

    function endDrag(e) {
      if (!isDragging) return;
      let endX;
      let endY;
      if (e.type === 'touchend') {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
      } else {
        endX = e.clientX;
        endY = e.clientY;
      }

      isDragging = false;
      e.target.removeEventListener('mouseleave', endDrag, false);
      e.target.style.zIndex = originalZIndex;

      const speed = endY < deckTopEdgeY ? '1s' : '0.1s';
      const translate = endX <= viewportWidth / 2
        ? 'translateX(-30%) translateY(-20%) scale(0.6)'
        : 'translateX(30%) translateY(-20%) scale(0.6)';
      e.target.style.transform = translate;
      e.target.style.boxShadow = '0 4px 8px 0 rgba(0, 5, 5, 0.4)';
      e.target.style.transition = `transform ${speed} cubic-bezier(0.8, 0, 1.0, 1.0), box-shadow ${speed} cubic-bezier(0.8, 0, 1.0, 1.0)`;
    }

    function onDrag(e) {
      if (!isDragging) return;
      e.preventDefault();
      if (e.type === 'touchmove') {
        currentX = initialTransformX + e.touches[0].clientX - initialX;
        currentY = initialTransformY + e.touches[0].clientY - initialY;
      } else {
        currentX = initialTransformX + e.clientX - initialX;
        currentY = initialTransformY + e.clientY - initialY;
      }
      setTranslate(currentX, currentY, e.target);
    }

    // Wire up
    deckElements.forEach(el => el && el.addEventListener('click', handleDeckClick));
    playgroundEl.addEventListener('touchstart', beginDrag, false);
    playgroundEl.addEventListener('touchend', endDrag, false);
    playgroundEl.addEventListener('touchmove', onDrag, false);
    playgroundEl.addEventListener('mousedown', beginDrag, false);
    playgroundEl.addEventListener('mouseup', endDrag, false);
    playgroundEl.addEventListener('mousemove', onDrag, false);
  }

  // expose
  window.initDeckInteractions = initDeckInteractions;
})();

