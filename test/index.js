import {
  asHex,
  generateColor,
  generateRelatedColor,
} from "../lib/colorGenerator.js";
import { generateMirror } from "../lib/mirrorGenerator.js";
import { generatePicture } from "../lib/pictureGenerator.js";

const cellSize = 50;

const pattern = `
. . . . . . .!
. . . . . . .!
. . . @ . . .!
. . . . @ . .!
. . . @ @ @ @!
. . @ @ . @ @!
. @ @ @ @ @ @!
. @ . @ @ @ @!
. @ . @ . . .!
. . . . @ @ .!
. . . . . . .!
. . . . . . .!
`;

const bgColor = generateColor(0, 50);
const color = generateRelatedColor(bgColor, 10, 50);

const options = {
  bgColor: asHex(bgColor),
  color: asHex(color),
  cell: {
    x: cellSize,
    y: cellSize,
  },
};

const halfPicture = generatePicture(pattern, options);
const pictire = generateMirror(
  halfPicture,
  {
    x: { notHonest: true },
  },
  cellSize,
  cellSize
);

const container = document.getElementById("root");
container.appendChild(pictire);
