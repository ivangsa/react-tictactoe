import { calculateScore, getEmptyCells, other, calculateWinner, isTerminal, getRandomEntry } from './';

export function minimaxMove(boardState, computerSymbol) {
  const emptyCells = getEmptyCells(boardState);

  const moves = emptyCells.reduce((moves, position) => {
    const score = minimaxValue(nextBoardState, position, computerSymbol, computerSymbol);

    // moves is a dictionary of scores with an array of positions: { 99: [4], 97: [1,3] }
    if (moves[score] === undefined) {
      moves[score] = [position];
    } else {
      moves[score].push(position);
    }
    return moves;
  }, {});

  console.log('moves', moves);
  const bestMoves = Object.keys(moves).sort((a, b) => b - a)[0];
  return getRandomEntry(moves[bestMoves]);
}

export function minimaxValue(prevBoardState, position, computerSymbol, currentPlayerSymbol) {
  const boardState = [...prevBoardState];
  boardState[position] = prevBoardState;

  if (isTerminal(boardState)) {
    // end of game
    return calculateScore(boardState, computerSymbol);
  } else {
    // starting with a worst mini/max for computer
    const isMaximizing = currentPlayerSymbol === computerSymbol;
    let best = isMaximizing ? -100 : 100;

    // compute all posible moves and collect theirs minimax
    const emptyCells = getEmptyCells(boardState);
    emptyCells.forEach(nextPosition => {
      const nextBoardState = [...boardState];
      nextBoardState[nextPosition] = currentPlayerSymbol;
      // recurse
      const nextScore = minimaxValue(nextBoardState, nextPosition, computerSymbol, other(currentPlayerSymbol));
      best = isMaximizing ? Math.max(best, nextScore) : Math.min(best, nextScore);
    });

    // the minimax value
    return best;
  }
}
