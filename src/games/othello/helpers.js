const { Map, List, toJS } = require("immutable");

const otherSide = Map({ B: "W", W: "B" });

const getValueFromSquare = (square) => {
  return square.last();
};

const updateSquare = (square) => {
  return square.first()(square.last());
};

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

const neighbouringSquares = (move) => {
  return adjacentSquares
    .map((curr) => List([curr, curr(move)]))
    .filter((curr) => curr.get(1) !== null);
};

const getSquaresWithDisc = (board, disc) => {
  return board
    .entrySeq()
    .filter(([k, v]) => {
      return v === disc;
    })
    .toList()
    .map((curr) => {
      return curr[0];
    });
};

const neighbouringOccupiedSquares = (board, stone, squares) => {
  return squares.filter((curr) => {
    return board.get(getValueFromSquare(curr)) === otherSide.get(stone);
  });
};

const validatedMove = (board, directionFn, stone, target) => {
  const nextSquare = updateSquare(directionFn);
  switch (board.get(nextSquare)) {
  case target:
    return nextSquare;
  case stone:
    validatedMove(board, updateSquare(directionFn), stone, target);
  default:
    return null;
  }
};

const isValidMove = (board, square, disc) => {
  const squares = neighbouringSquares(square);
  return neighbouringOccupiedSquares(board, disc, squares).map((curr) =>
    validatedMove(board, curr, otherSide.get(disc), "E")
  );
};

const validMoves = (board, disc) => {
  return getSquaresWithDisc(board, disc)
    .reduce((acc, curr) => {
      const newMove = isValidMove(board, curr, disc);
      if (newMove) {
        return acc.push(newMove);
      }
      return acc;
    }, List())
    .flatten();
};

console.log("my moves: ", validMoves(initialBoard, "B").toJS());

module.exports = {
  otherSide,
  initialBoard,
  adjacentSquares,
  neighbouringSquares,
  getSquaresWithDisc,
};
