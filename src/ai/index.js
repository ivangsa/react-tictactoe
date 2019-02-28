export const calculateNextMove = (boardState, nextPlayerSymbol) => {
  if (!boardState[4]) {
    return 4;
  }
  return randomMove(boardState);
};

const randomMove = function(boardState) {
  const emptyCells = getEmptyCells(boardState);
  const random = Math.floor(Math.random() * (emptyCells.length - 1));
  return emptyCells[random];
};

const getEmptyCells = function(boardState) {
  return boardState.reduce((emptyCells, symbol, index) => {
    return !symbol ? [...emptyCells, index] : emptyCells; // FIXME
  }, []);
};
