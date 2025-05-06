/**
 * Watches a specific CSS media query breakpoint and invokes a callback
 * with the current match status (`true` or `false`) whenever the match state changes.
 *
 * @param {string} breakpoint - A valid CSS media query string (e.g., "(max-width: 640px)").
 * @param {(matches: boolean) => void} callback - A function to be called when the media query matches or unmatches.
 *        It receives a boolean indicating the current match state.
 *
 * @example
 * mediaQueryWatcher("(max-width: 768px)", (matches) => {
 *   if (matches) {
 *     console.log("Viewport is 768px or less");
 *   } else {
 *     console.log("Viewport is more than 768px");
 *   }
 * });
 *
 * @note
 * This function performs an immediate check upon initialization and then continues
 * to listen for changes in match state using `matchMedia.addEventListener`.
 */
export function mediaQueryWatcher(breakpoint, callback) {
    const mediaQuery = window.matchMedia(breakpoint);

    const checkWindowSize = () => callback(mediaQuery.matches);

    // Initial check
    checkWindowSize();

    // React to changes
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", checkWindowSize);
    } else if (mediaQuery.addListener) {
        mediaQuery.addListener(checkWindowSize);
    }
}
