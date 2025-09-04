// Game constants to centralize magic numbers and improve maintainability
const GAME_CONSTANTS = {
    // Animation timings (in milliseconds)
    ANIMATION_INTERVAL: 15,        // Bar animation update interval
    DOT_ANIMATION_INTERVAL: 100,   // Dot animation update interval
    UI_TRANSITION_DELAY: 3000,     // Delay for UI state transitions

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

// Make it globally available (consistent with other scripts)
window.GAME_CONSTANTS = GAME_CONSTANTS;
