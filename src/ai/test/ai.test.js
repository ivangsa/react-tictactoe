import { calculateNextMove, boardToString, other, isTerminal, calculateWinner } from '../AI';
import { minimaxMove, minimaxValue } from '../minimax';

const x = 'x';
const o = 'o';
const n = null;

test('aiPlay', () => {
  let boardState = null;
  let currentPlayerSymbol = x;

  /* prettier-ignore */
  boardState = [
    n, n, n,
    n, n, n,
    n, n, n
  ];

  // while(!isTerminal(boardState)) {
  //   currentPlayerSymbol = other(currentPlayerSymbol);
  //   boardState = aiPlay(boardState, currentPlayerSymbol);
  // }

  // expect(calculateWinner(boardState)).toBe(null);
});

test('aiPlay', () => {
  let boardState = null;
  let currentPlayerSymbol = x;

  /* prettier-ignore */
  boardState = [
    n, n, n,
    n, x, o,
    n, n, n
  ];

  // while(!isTerminal(boardState)) {
  //   currentPlayerSymbol = other(currentPlayerSymbol);
  //   boardState = aiPlay(boardState, currentPlayerSymbol);
  // }

  // expect(calculateWinner(boardState)).toBe(null);
});

function aiPlay(boardState, currentPlayerSymbol) {
  const position = calculateNextMove(boardState, currentPlayerSymbol);
  const nextBoardState = [...boardState];
  nextBoardState[position] = currentPlayerSymbol;
  console.log(boardToString(nextBoardState));
  return nextBoardState;
}

function gameOver(boardState) {
  return getEmptyCells(boardState).length === 0;
}
