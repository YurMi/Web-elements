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
    if (args.some(arg => typeof arg !== 'number' || isNaN(arg) || !isFinite(arg))) {
        console.error(`generateClamp() -> Invalid numeric arguments`, args);
        return '';
    }

    const slope = (valMax - valMin) / (wMax - wMin);
    const intercept = valMin - slope * wMin;

    const slopeVW = slope * 100;
    const interceptREM = intercept / 16;
    const minREM = Math.min(valMin, valMax) / 16;
    const maxREM = Math.max(valMin, valMax) / 16;

    const vwPart = `${Math.abs(slopeVW)}vw`;
    const remPart = `${interceptREM.toFixed(10)}rem`;

    const preferredValue = slopeVW >= 0
        ? `calc(${remPart} + ${vwPart})`
        : `calc(${remPart} - ${Math.abs(slopeVW)}vw)`;

    return `clamp(${minREM}rem, ${preferredValue}, ${maxREM}rem)`;
}
