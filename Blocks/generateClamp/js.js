/**
 * return string clamp(min, preferred, max) to rem
 * @param {number} valMax - value max  (px)
 * @param {number} valMin - value min (px)
 * @param {number} wMax - viewport max (px)
 * @param {number} wMin - viewport min (px)
 * @returns {string}
 */
export function generateClamp(valMax, valMin, wMax = 1920, wMin = 767) {
    const args = [valMax, valMin, wMax, wMin];
    if (args.some((arg) => typeof arg !== "number" || isNaN(arg) || !isFinite(arg))) {
        console.error(`generateClamp() -> Invalid numeric arguments`, args);
        return "";
    }

    if (valMin > valMax || wMin > wMax) {
        console.error(`generateClamp() -> min/max values are inverted`);
        return "";
    }

    const slope = (valMax - valMin) / (wMax - wMin);
    const intercept = valMin - slope * wMin;

    const slopeVW = slope * 100;
    const interceptREM = intercept / 16;
    const minREM = valMin / 16;
    const maxREM = valMax / 16;

    return `clamp(${minREM}rem, calc(${slopeVW}vw + ${interceptREM}rem), ${maxREM}rem)`;
}
