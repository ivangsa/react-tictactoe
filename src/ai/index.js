import { randomMove } from './random';
import { minimaxMove } from './minimax';

/**
 * Calculates computer's next move.
 *
 * Available algorithms:
 * - random move
 * - minimax
 * - alphabeta (minimax with pruning)
 *
 * @param {[0-8]} boardState
 * @param {'x'|'o'} computerSymbol
 */
export const calculateNextMove = (boardState, computerSymbol) => {
  // always play center
  if (!boardState[4]) {
    return 4;
  }

  const emptyCells = getEmptyCells(boardState);
  if (emptyCells.length === 8) {
    // if computer goes second choose corner
    return getRandomEntry([0, 2, 6, 8]);
  }

  return minimaxMove(boardState, computerSymbol);
  return randomMove(boardState);
};

export function isTerminal(boardState) {
  return getEmptyCells(boardState).length === 0 || calculateWinner(boardState) !== null;
}

export function calculateWinner(boardState) {
  /* prettier-ignore */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
}

export function calculateScore(boardState, computerSymbol) {
  const emptyCells = getEmptyCells(boardState);
  const winner = calculateWinner(boardState);
  let score = null;
  if (winner === null) {
    return 0;
  }
  if (winner === computerSymbol) {
    return emptyCells.length;
  }
  if (winner !== computerSymbol) {
    return emptyCells.length * -1;
  }
}

export function getEmptyCells(boardState) {
  return boardState.reduce((emptyCells, symbol, index) => {
    return !symbol ? [...emptyCells, index] : emptyCells; // FIXME
  }, []);
}

export function getRandomEntry(array) {
  const random = Math.floor(Math.random() * (array.length - 1));
  return array[random];
}

// XXX dupe in reducers.js
export function other(symbol) {
  if (symbol == null) {
    return null;
  }
  return symbol === 'o' ? 'x' : 'o';
}
