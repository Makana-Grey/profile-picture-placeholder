/**
 * Options for generating picture
 * @typedef {Object} Options
 * @property {string | undefined} color If this prop is undefined then color became white
 * @property {string | undefined} bgColor If this prop is undefined then bgcolor became black
 * @property {{x:number, y:number}} cell Size of one cell by x and y in pixels. Default is 1
 */

/**
 * Control chars
 */
const chars = "@.!"; //,-~:;=*#$

/**
 * End of line
 */
const eol = "!";

/**
 * Generate picture by pattern and options
 * @param {String} pattern Use `. , - ~ : ; = ! * # $ @` to define pattern
 * - `@` - fill
 * - `.` - no fill
 * - `!` - end of line
 *
 * Other chars will be ignored\
 * Size of canvas will be defined by next rule:\
 * Width = `Count of chars from line that have max count of chars` * `options.boxSize.x`\
 * Height = `Count of lines` * `options.boxSize.y`. Last line must be define too
 *
 * @param {Options} options
 *
 * @returns {HTMLCanvasElement} Canvas with image
 */
export function generatePicture(pattern, options) {
  const canvas = document.createElement("canvas");

  const { matrix, linesCount, charsCount } = parsePattern(pattern);

  const x = options.cell.x || 1;
  const y = options.cell.y || 1;

  canvas.width = charsCount * x;
  canvas.height = linesCount * y;

  const context = canvas.getContext("2d");

  drawPictire(matrix, context, {
    ...options,
    cell: { x, y },
    width: canvas.width,
    height: canvas.height,
  });

  return canvas;
}

/**
 * Return pattern as matrix, count of lines and max count of chars in all lines
 * @param {String} pattern
 * @return {{
 *    matrix: string[][]
 *    linesCount: number
 *    charsCount: number
 * }}
 */
function parsePattern(pattern) {
  const matrix = [];
  let linesCount = 0;
  let charsCount = 0;

  if (pattern && pattern.length) {
    let line = [];

    pattern.split("").forEach((c) => {
      if (chars.includes(c)) {
        if (c === eol) {
          matrix.push(line);
          charsCount = Math.max(line.length, charsCount);
          linesCount++;
          line = [];
        } else {
          line.push(c);
        }
      }
    });
  }

  return { matrix, linesCount, charsCount };
}

/**
 * Draw picture by pattern in matrix on the 2D context
 * @param {String[][]} matrix
 * @param {CanvasRenderingContext2D} context
 * @param {Options & {width: number, height: number}} options
 */
function drawPictire(matrix, context, options) {
  fillBackground(
    context,
    options.bgColor || "#000",
    options.width,
    options.height
  );

  paintShape(matrix, context, options.color || "#fff", options);
}

/**
 * Fill background of generating pictire
 * @param {CanvasRenderingContext2D} context
 * @param {String} color
 * @param {number} width
 * @param {number} height
 */
function fillBackground(context, color, width, height) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = color;
  context.fillRect(0, 0, width, height);
}

/**
 * Paint shape on the context by matrix pattern
 * @param {String[][]} matrix
 * @param {CanvasRenderingContext2D} context
 * @param {String} color
 * @param {Options} options
 */
function paintShape(matrix, context, color, options) {
  const { x, y } = options.cell;

  context.fillStyle = color;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      paintingMap[matrix[i][j]](context, j * x, i * y, x, y);
    }
  }
}

/**
 * Define functions for drowing by pattern
 */
const paintingMap = {
  "@": fill,
  ".": empty,
};

function fill(context, x, y, w, h) {
  context.fillRect(x, y, w, h);
}

function empty(context, x, y, w, h) {
  return;
}
