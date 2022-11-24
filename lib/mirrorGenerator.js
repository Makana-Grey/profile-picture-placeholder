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

  const { width, height } = calcSize(
    canvas.width,
    canvas.height,
    xSize,
    ySize,
    mirror
  );

  const destCvs = document.createElement("canvas");
  destCvs.width = width;
  destCvs.height = canvas.height;

  const context = destCvs.getContext("2d");

  context.drawImage(canvas, 0, 0);
  mirrorX(canvas, context, mirror.x, xSize);
  mirrorY(canvas, context, mirror.y, ySize);

  return destCvs;
}

/**
 * Mirror by axis
 * @param {HTMLCanvasElement} canvas Source canvas
 * @param {Boolean} isX
 * @return {HTMLCanvasElement} Canvas with reflected picture
 */
export function generateReflection(canvas, isX) {
  const destCanvas = createCanvas();
  destCanvas.width = canvas.width;
  destCanvas.height = canvas.height;

  const context = destCanvas.getContext("2d");

  context.translate(destCanvas.width / 2, destCanvas.height / 2);

  if(isX) {
    context.scale(-1, 1);
  } else {
    context.scale(1, -1)
  }

  context.drawImage(canvas, 0, 0);

  return destCanvas;
}

/**
 * @param {Mirror} mirror
 * @param {Number} w Original width
 * @param {Number} h Original height
 * @param {Number} x Size one cell by x
 * @param {Number} y Size one cell by y
 * @return {{width, height}} New size by mirror
 */
 function calcSize(w, h, x, y, mirror) {
  if (mirror.x) {
    w *= 2;
    w -= mirror.x.notHonest ? x : 0;
  }

  if (mirror.y) {
    h *= 2;
    h -= mirror.y.notHonest ? y : 0;
  }

  return {
    width: w,
    height: h,
  };
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Mirror} mirror
 * @param {Number} xSize Size one cell by x
 * @param {Number} ySize Size one cell by y
 * @return {HTMLCanvasElement} Canvas with mirrored picture
 */
function makeReflections(canvas, mirror, xSize, ySize) {
  const reflX = createCanvas()

  if(mirror.x) {
    var width = canvas.width * 2
    width -= mirror.x.notHonest ? xSize : 0
  }

  if(mirror.y) {
    var height = canvas.height * 2
    height -= mirror.y.notHonest ? ySize : 0
  }
}

/**
 * Mirror by x
 * @param {HTMLCanvasElement} sourceCanvas
 * @param {CanvasRenderingContext2D} destContext
 * @param {MirrorAxis} xMirror
 * @param {Number} x Size one cell by x
 */
function mirrorX(sourceCanvas, destContext, xMirror, x) {
  if (xMirror) {
    const xPos = sourceCanvas.width * 2 - (xMirror.notHonest ? x : 0);
    const srcCtx = sourceCanvas.getContext("2d");
    destContext.drawImage(
      sourceCanvas,
      xPos,
      0,
      sourceCanvas.width * -1,
      sourceCanvas.height
    );
  }
}

/**
 * Mirror by y
 * @param {HTMLCanvasElement} sourceCanvas
 * @param {CanvasRenderingContext2D} destContext
 * @param {MirrorAxis} yMirror
 * @param {Number} y Size one cell by y
 */
function mirrorY(sourceCanvas, destContext, yMirror, y) {
  if (yMirror) {
    const yPos = sourceCanvas.height * 2 - (yMirror.notHonest ? y : 0);
    destContext.drawImage(
      sourceCanvas,
      yPos,
      0,
      sourceCanvas.width,
      -sourceCanvas.height
    );
  }
}
