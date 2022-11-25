import { createCanvas } from "./utils.js";

/**
 * @typedef {import('./patternGenerator.js').Pattern} Pattern
 */

/**
 * Options for generating picture
 * @typedef {Object} Options
 * @property {String | undefined} color If this prop is undefined then color became white
 * @property {String | undefined} bgColor If this prop is undefined then bgcolor became black
 * @property {{x: Number, y: Number}} cell Size of one cell by x and y in pixels. Default is 1
 */

/**
 * Generate picture by pattern and options
 * @param {Pattern} pattern
 *
 * Size of canvas will be defined by next rule:\
 * Width = `Count of chars from line that have max count of chars` * `options.boxSize.x`\
 * Height = `Count of lines` * `options.boxSize.y`. Last line must be define too
 *
 * @param {Options} options
 *
 * @returns {HTMLCanvasElement} Canvas with picture
 */
export function generatePicture(pattern, options) {
  if (!pattern?.matrix?.length && !pattern.matrix[0].length) {
    throw new Error("Pattern's matrix must have some elements!");
  }

  const x = options.cell.x || 1;
  const y = options.cell.y || 1;

  return picture(pattern, { ...options, cell: { x, y } });
}

/** Define functions for drawing by pattern */
const paintMap = {
  true: (context, x, y, w, h) => {
    context.fillRect(x, y, w, h);
  },
  false: () => {},
};

/**
 * @param {Pattern} pattern
 * @param {Options} options
 */
function picture(pattern, options) {
  const canvas = createCanvas();
  const { x, y } = options.cell;
  
  canvas.width = pattern.cols * x;
  canvas.height = pattern.rows * y;

  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = options.bgColor || "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const { matrix } = pattern;
  context.fillStyle = options.color || "#fff";

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      paintMap[matrix[i][j]](context, j * x, i * y, x, y);
    }
  }

  return canvas;
}
