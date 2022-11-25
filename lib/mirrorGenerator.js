import { createCanvas } from "./utils.js";

/**
 * Mirror for mirror image on canvas
 * Can be with x, y, xy. If value is define then picture mirror by x, y or xy
 * @typedef {Object} Mirror
 * @property {MirrorAxis | undefined} x Rule for mirror on x
 * @property {MirrorAxis | undefined} y Rule for mirror on y
 */

/**
 * @typedef {Object} MirrorAxis Rule for mirror
 * @property {Boolean} notHonest If true last line of cells will not mirrored but left
 */

/**
 * Mirror image on canvas
 * @param {HTMLCanvasElement} canvas
 * @param {Mirror} mirror
 * @param {Number} xSize Size one cell by x, if is not defined then will be 1
 * @param {Number} ySize Size one cell by y, if is not defined then will be 1
 */
export function generateMirror(canvas, mirror, xSize, ySize) {
  if (!mirror?.x && !mirror.y) {
    return canvas;
  }

  xSize = xSize || 1;
  ySize = ySize || 1;

  return makeReflections(canvas, mirror, xSize, ySize);
}

/**
 * Mirror by axis
 * @param {HTMLCanvasElement} canvas Source canvas
 * @param {Boolean} isX
 * @return {HTMLCanvasElement} Canvas with reflected picture
 */
export function generateReflection(canvas, isX) {
  const reflection = createCanvas();
  reflection.width = canvas.width;
  reflection.height = canvas.height;

  const context = reflection.getContext("2d");
  
  if (isX) {
    context.translate(reflection.width, 0);
    context.scale(-1, 1);
  } else {
    context.translate(0, reflection.height);
    context.scale(1, -1);
  }

  context.drawImage(canvas, 0, 0);

  return reflection;
}

/**
 * @param {HTMLCanvasElement} canvas  Source canvas
 * @param {Mirror} mirror Mirror options
 * @param {Number} xSize Size one cell by x
 * @param {Number} ySize Size one cell by y
 * @return {HTMLCanvasElement} Canvas with mirrored picture
 */
function makeReflections(canvas, mirror, xSize, ySize) {
  /** @type {CanvasRenderingContext2D} */
  let context;
  let horizontal = canvas

  if (mirror.x) {
    const offset = mirror.x.notHonest ? xSize : 0;
    horizontal = createCanvas();

    horizontal.height = canvas.height;
    horizontal.width = canvas.width * 2 - offset;

    const hReflection = generateReflection(canvas, true);
    context = horizontal.getContext("2d");

    context.drawImage(hReflection, canvas.width - offset, 0);
    context.drawImage(canvas, 0, 0);
  }


  if (!mirror.y) {
    return horizontal;
  }

  const offset = mirror.y.notHonest ? ySize : 0;
  const vertical = createCanvas();

  vertical.width = horizontal.width;
  vertical.height = horizontal.height * 2 - offset;

  const vReflection = generateReflection(horizontal, false);
  context = vertical.getContext("2d");

  context.drawImage(vReflection, 0, horizontal.height - offset);
  context.drawImage(horizontal, 0, 0);

  return vertical;
}
