import { randomMove } from './random';
import { minimaxMove } from './minimax';
import { minimaxWithAlphaBetaMove } from './minimax-alphabeta';

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
  if (boardState[4] === null) {
    return 4;
  }

  return minimaxWithAlphaBetaMove(boardState, computerSymbol);
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
  const depth = 9 - emptyCells.length;
  const winner = calculateWinner(boardState);
  let score = null;
  if (winner === null) {
    score = 0;
  } else if (winner === computerSymbol) {
    score = 10 - depth;
  } else if (winner !== computerSymbol) {
    score = -10 + depth;
  }
  // console.log("score", score);
  return score;
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

export function boardToString(boardState) {
  boardState = boardState.map(i => (i ? i : 'n')).slice();
  return `
    ${boardState.slice(0, 3)}
    ${boardState.slice(3, 6)}
    ${boardState.slice(6, 9)}
    `;
}
