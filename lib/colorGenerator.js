import { rand } from "./utils.js";

/**
 * Define color in rgb
 * @typedef {Object} RGB
 * @property {number} r
 * @property {number} g
 * @property {number} b
 */


/**
 * @param {Number} min min value of color 0..255
 * @param {Number} max max value of color 0..255
 * @returns {RGB} color
 */
export function generateColor(min, max) {
  let r = min,
    g = min,
    b = min;

  const combination = rand(1, 6);

  switch (combination) {
    case 1:
      r = max;
      g = rand(0, max);
      break;
    case 2:
      r = max;
      b = rand(0, max);
      break;
    case 3:
      g = max;
      r = rand(0, max);
      break;
    case 4:
      g = max;
      b = rand(0, max);
      break;
    case 5:
      b = max;
      r = rand(0, max);
      break;
    default:
      b = max;
      g = rand(0, max);
      break;
  }

  return { r, g, b };
}

/**
 * Return optimal color for this background color
 * @param {RGB} color
 * @param {Number} minUp min value to up color
 * @param {Number} maxUp max value to up color
 * @returns {RGB} color
 */
export function generateRelatedColor(color, minUp, maxUp) {
  let { r, g, b } = color;
  const midUp = Math.floor((maxUp + minUp) / 2);
  const min = Math.min(r, g, b);
  const max = Math.min(r, g, b);

  r += r === max ? maxUp : r === min ? minUp : midUp;
  g += g === max ? maxUp : g === min ? minUp : midUp;
  b += b === max ? maxUp : b === min ? minUp : midUp;

  return { r, g, b };
}

/**
 * @param {RGB} color
 * @returns {String} rgb color as hex string with #
 */
export function asHex(color) {
  return "#" + _10to16(color.r) + _10to16(color.g) + _10to16(color.b);
}

/**
 * @param {Number} value
 * @return {String} Number in hex
 */
function _10to16(value) {
  if (value < 16) {
    return "0" + value.toString(16);
  }
  return value.toString(16);
}
