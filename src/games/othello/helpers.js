const { Map, List, toJS } = require("immutable");

const otherSide = Map({ B: "W", W: "B" });

const initialBoard = List()
  .setSize(64)
  .map(() => "E")
  .set(27, "W")
  .set(28, "B")
  .set(35, "B")
  .set(36, "W");

const adjacentSquares = List([
  function up(x) {
    return x > 7 ? x - 8 : null;
  },
  function down(x) {
    return x < 56 ? x + 8 : null;
  },
  function left(x) {
    return x % 8 !== 0 ? --x : null;
  },
  function right(x) {
    return (x + 1) % 8 !== 0 ? ++x : null;
  },
  function upLeft(x) {
    return x >= 8 && x % 8 !== 0 ? x - 9 : null;
  },
  function upRight(x) {
    return x >= 8 && (x + 1) % 8 !== 0 ? x - 7 : null;
  },
  function downLeft(x) {
    return x <= 55 && x % 8 !== 0 ? x + 7 : null;
  },
  function downRight(x) {
    return x <= 55 && (x + 1) % 8 !== 0 ? x + 9 : null;
  },
]);

const neighbouringSquares = (move) =>
  adjacentSquares
    .map((curr) => List([curr, curr(move)]))
    .filter((curr) => curr.get(1) !== null);

const getSquaresWithDisc = (board, disc) => {
  return board.entrySeq().filter(([k, v]) => {
    return v === disc;
  });
};

module.exports = {
  otherSide,
  initialBoard,
  adjacentSquares,
  neighbouringSquares,
  getSquaresWithDisc,
};
