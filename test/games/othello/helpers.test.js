const helpers = require("../../../src/games/othello/helpers");
const { Map, List, toJS } = require("immutable");

describe("Othello helpers", () => {
  it("the board is initialized properly", () => {
    const b = helpers.initialBoard;
    expect(b.get(0)).toEqual("E");
    expect(b.size).toEqual(64);
    expect(b.get(27)).toEqual("W");
  });

  it("other stone returns the right stone", () => {
    expect(helpers.otherSide.get("B")).toEqual("W");
    expect(helpers.otherSide.get("W")).toEqual("B");
    expect(helpers.otherSide.get("E")).toEqual(undefined);
  });

  it("adjacentSquares returns the right function", () => {
    const as = helpers.adjacentSquares;
    expect(as.get(0)(8)).toEqual(0);
    expect(as.get(0)(7)).toEqual(null);
    expect(as.get(1)(8)).toEqual(16);
    expect(as.get(1)(56)).toEqual(null);
    expect(as.get(2)(1)).toEqual(0);
    expect(as.get(2)(8)).toEqual(null);
    expect(as.get(3)(8)).toEqual(9);
    expect(as.get(3)(7)).toEqual(null);
    expect(as.get(4)(9)).toEqual(0);
    expect(as.get(4)(8)).toEqual(null);
    expect(as.get(5)(9)).toEqual(2);
    expect(as.get(5)(15)).toEqual(null);
    expect(as.get(6)(2)).toEqual(9);
    expect(as.get(6)(16)).toEqual(null);
    expect(as.get(7)(1)).toEqual(10);
    expect(as.get(7)(7)).toEqual(null);
  });
  it("neighbouringSquares", () => {
    const tester = helpers.neighbouringSquares(12);
    expect(tester.get(0).get(1)).toEqual(4);
  });
});
