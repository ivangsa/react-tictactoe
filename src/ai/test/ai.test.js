import { algorithms, calculateNextMove, calculateWinner, isTerminal, other } from '../AI';

const x = 'x';
const o = 'o';
const n = null;

test('war games (minimax)', () => {
  let boardState = null;
  let currentPlayerSymbol = o;

  /* prettier-ignore */
  boardState = [
    n, n, n,
    n, n, n,
    n, n, n
  ];

  while (!isTerminal(boardState)) {
    currentPlayerSymbol = other(currentPlayerSymbol);
    boardState = aiPlay(boardState, currentPlayerSymbol, algorithms.minimax);
  }

  expect(calculateWinner(boardState)).toBe(null);
});

test('war games (alphabeta)', () => {
  /* prettier-ignore */
  const gameBoardState = [
    n, n, n,
    n, n, n,
    n, n, n
  ];

  for (let index = 0; index < 1000; index++) {
    let currentPlayerSymbol = x;
    let boardState = [...gameBoardState];
    while (!isTerminal(boardState)) {
      currentPlayerSymbol = other(currentPlayerSymbol);
      boardState = aiPlay(boardState, currentPlayerSymbol, algorithms.alphabeta);
    }

    expect(calculateWinner(boardState)).toBe(null);
  }
});

function aiPlay(boardState, currentPlayerSymbol, algorithm) {
  const position = calculateNextMove(boardState, currentPlayerSymbol, algorithm);
  const nextBoardState = [...boardState];
  nextBoardState[position] = currentPlayerSymbol;
  // console.log(boardToString(nextBoardState));
  return nextBoardState;
}
