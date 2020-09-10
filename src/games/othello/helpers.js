const { Map, List, toJS } = require("immutable");

const otherStone = Map({ B: "W", W: "B" });

const initialBoard = List()
  .setSize(64)
  .map(() => "E")
  .set(27, "W")
  .set(28, "B")
  .set(35, "B")
  .set(36, "W");
console.log(initialBoard.toJS());
const adjacentSquares = Map({
  up: (x) => (x > 7 ? x - 8 : null),
  down: (x) => (x < 56 ? x + 8 : null),
  left: (x) => (x % 8 !== 0 ? --x : null),
  right: (x) => ((x + 1) % 8 !== 0 ? ++x : null),
  upLeft: (x) => (x >= 8 || x % 8 !== 0 ? x - 9 : null),
  upRight: (x) => (x >= 8 || ++x % 8 !== 0 ? x - 7 : null),
  downLeft: (x) => (x <= 55 || x % 8 !== 0 ? x + 7 : null),
  downRight: (x) => (x <= 55 || ++x % 8 !== 0 ? x + 9 : null),
});

const x = adjacentSquares.get("left");
console.log(x(9));
