/**
 * Pattern for drawing picture
 * @typedef {Object} Pattern
 * @property {Boolean[][]} matrix Matrix defining a picture
 * @property {Number} cols Max count items in one row
 * @property {Number} rows Count of rows
 */

/**
 * Control chars
 */
const chars = "@.!"; //,-~:;=*#$

/**
 * End of line
 */
const eol = "!";

const charsMap = {
  "@": true,
  ".": false,
};

/**
 * Return pattern
 * @param {String} source
 * @return {Pattern}
 */
function parse(source) {
  const matrix = [];
  let rows = 0;
  let cols = 0;

  if (source && source.length) {
    let row = [];

    source.split("").forEach((char) => {
      if (chars.includes(char)) {
        if (char === eol) {
          matrix.push(row);
          cols = Math.max(row.length, cols);
          rows++;
          row = [];
        } else {
          row.push(charsMap[char]);
        }
      }
    });
  }

  return { matrix, cols, rows };
}

/**
 * @param {String} template Base template of picture
 * @return {Pattern} Matrix with spetial symbols for generating picture
 */
export function generatePattern(teplate) {
  return parse(teplate);
}
