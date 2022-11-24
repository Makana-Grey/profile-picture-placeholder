export function createCanvas() {
  return document.createElement("canvas");
}

export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
