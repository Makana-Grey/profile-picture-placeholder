/**
 * Mirror for mirror image on canvas
 * Can be with x, y, xy. If value is define then picture mirror by x, y or xy
 * @typedef {Object} Mirror
 * @property {MirrorAxis | undefined} x Rule for mirror on x
 * @property {MirrorAxis | undefined} y Rule for mirror on y
 */

/**
 * @typedef {Object} MirrorAxis
 * @property {Boolean} oneLast If true last line of cells will not mirrored but left
 */

/**
 * Mirror image on canvas
 * @param {HTMLCanvasElement} canvas
 * @param {Mirror} mirror
 * @param {Number} x Size one cell by x, if is not defined then will be 1
 * @param {Number} y Size one cell by y, if is not defined then will be 1
 */
export function generateMirror(canvas, mirror, x, y) {
  if (mirror.x || mirror.y) {
    x = x || 1;
    y = y || 1;
    const { width, height } = calcSize(
      canvas.width,
      canvas.height,
      x,
      y,
      mirror
    );

    const destCvs = document.createElement("canvas");
    destCvs.width = width;
    destCvs.height = canvas.height;

    const context = destCvs.getContext("2d");

    context.drawImage(canvas, 0, 0);
    mirrorX(canvas, context, mirror.x, x);
    mirrorY(canvas, context, mirror.y, y);

    return destCvs;
  }

  return canvas;
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
    w -= mirror.x.oneLast ? x : 0;
  }

  if (mirror.y) {
    h *= 2;
    h -= mirror.y.oneLast ? y : 0;
  }

  return {
    width: w,
    height: h,
  };
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
    const xPos = sourceCanvas.width * 2 - (xMirror.oneLast ? x : 0);
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
    const yPos = sourceCanvas.height * 2 - (yMirror.oneLast ? y : 0);
    destContext.drawImage(
      sourceCanvas,
      yPos,
      0,
      sourceCanvas.width,
      -sourceCanvas.height
    );
  }
}
