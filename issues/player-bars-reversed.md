# Player value bars reversed in CPU games

## Bug Description
When playing against the computer, the comparison popup's value bars appear in the wrong order: the top bar shows the computer's value and the bottom bar shows the player's value.

## Steps to Reproduce
1. Start a new game against the CPU.
2. Compare any card property.
3. Observe that the computer's value is displayed in the top bar while the player's value is displayed in the bottom bar.

## Expected Behavior
The top bar should display the player's card value, and the bottom bar should display the opponent's (computer's) value.

## Possible Cause
`changeAndResetUI` swaps the classes `compbar1` and `compbar2` without moving the corresponding `innerbar` elements, so the bar widths rendered for `innerBar1` and `innerBar2` no longer match their visual order on screen. Investigate `public/compareFuncs.js` around the class swaps.

## Additional Context
Relevant code snippets:
- Bar animation uses `innerBar1` for the first value and `innerBar2` for the second value.
- `changeAndResetUI` swaps the `compbar1` and `compbar2` classes, potentially causing the bars to appear in the opposite order.

