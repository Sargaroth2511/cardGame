// Game constants to centralize magic numbers and improve maintainability
const GAME_CONSTANTS = {
    // Animation timings (in milliseconds)
    ANIMATION_INTERVAL: 15,        // Bar animation update interval
    DOT_ANIMATION_INTERVAL: 100,   // Dot animation update interval
    UI_TRANSITION_DELAY: 2500,     // Delay for UI state transitions (closer to original 3000ms)

    // Animation values
    BAR_ANIMATION_INCREMENT: 3,    // Percentage increment for bar animations

    // AI probabilities
    AI_MEDIUM_RANDOM_THRESHOLD: 0.85,  // Probability threshold for medium AI to use random vs smart

    // Scoring multipliers
    DIFFICULTY_MULTIPLIERS: {
        EASY: 1,
        MEDIUM: 2,
        HARD: 3
    },

    // Animation classes
    CSS_ANIMATION_CLASSES: [
        'drawstackAnimationp1c1', 'drawstackAnimationp2c1',
        'drawstackAnimationp1c2', 'drawstackAnimationp2c2',
        'animationCard1', 'animationCard2', 'animationDrawCard1',
        'animationDrawCard2'
    ]
};

// Helper function to batch style changes and reduce layout thrashing
function setElementStyles(elements, styleProperty, value) {
    elements.forEach(element => {
        if (element) element.style[styleProperty] = value;
    });
}

// Helper function to hide multiple elements
function hideElements(...elements) {
    setElementStyles(elements, 'display', 'none');
}

// Helper function to show multiple elements
function showElements(displayValue, ...elements) {
    setElementStyles(elements, 'display', displayValue);
}

// Export constants and utilities for testing
const GAME_UTILS_MODULE = {
    GAME_CONSTANTS,
    setElementStyles,
    hideElements,
    showElements
};

// Make available globally for backward compatibility
window.GAME_UTILS_MODULE = GAME_UTILS_MODULE;

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_UTILS_MODULE;
}
