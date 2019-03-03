import { calculateScore, getEmptyCells, getRandomEntry, isTerminal, other } from './AI';

export function minimaxMove(boardState, computerSymbol) {
  const emptyCells = getEmptyCells(boardState);
  console.log('length', emptyCells.length);

  const moves = emptyCells.reduce((moves, position) => {
    const score = minimaxValue(boardState, position, computerSymbol, computerSymbol);

    // moves is a dictionary of scores with an array of positions: { 99: [4], 97: [1,3] }
    if (moves[score] === undefined) {
      moves[score] = [position];
    } else {
      moves[score].push(position);
    }
    return moves;
  }, {});

  const bestMoves = Object.keys(moves).sort((a, b) => b - a)[0];
  console.log('moves', moves, 'bestMoves', bestMoves, moves[bestMoves]);
  return getRandomEntry(moves[bestMoves]);
}

export function minimaxValue(prevBoardState, position, computerSymbol, currentPlayerSymbol, isMaximizing = false) {
  const boardState = [...prevBoardState];
  boardState[position] = currentPlayerSymbol;

  if (isTerminal(boardState)) {
    // end of game
    return calculateScore(boardState, computerSymbol);
  } else {
    // compute all posible moves and collect theirs minimax
    let best = isMaximizing ? -100 : 100;
    const emptyCells = getEmptyCells(boardState);
    emptyCells.forEach(nextPosition => {
      const nextBoardState = [...boardState];
      nextBoardState[nextPosition] = currentPlayerSymbol;
      // recurse
      const score = minimaxValue(nextBoardState, nextPosition, computerSymbol, other(currentPlayerSymbol), !isMaximizing);
      best = isMaximizing ? Math.max(best, score) : Math.min(best, score);
    });

    // the minimax value
    return best;
  }
}
