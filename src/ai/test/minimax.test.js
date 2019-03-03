import { boardToString } from '../AI';
import { minimaxMove, minimaxValue } from '../minimax';

const x = 'x';
const o = 'o';
const n = null;

test('tests minimaxMove', () => {
  let boardState = null;
  /* prettier-ignore */
  boardState = [
    o, x, x,
    x, o, o,
    o, n, n
  ];
  testMinimaxMove(boardState, 8);
  /* prettier-ignore */
  boardState = [
    n, n, x,
    n, o, n,
    n, n, o
  ];
  testMinimaxMove(boardState, 0);
  /* prettier-ignore */
  boardState = [
    n, n, x,
    n, o, o,
    n, n, n
  ];
  testMinimaxMove(boardState, 3);
  /* prettier-ignore */
  boardState = [
    o, n, x,
    x, o, o,
    n, n, n
  ];
  testMinimaxMove(boardState, 8);
  /* prettier-ignore */
  boardState = [
    n, n, n,
    n, x, o,
    n, n, o
  ];
  testMinimaxMove(boardState, 2);
  /* prettier-ignore */
  boardState = [
    n, n, x,
    n, o, o,
    n, n, n
  ];
  testMinimaxMove(boardState, 3);
});

test('tests terminal states score', () => {
  let boardState = null;
  /* prettier-ignore */
  boardState = [
    o, x, x,
    x, o, o,
    o, n, n
  ];
  testScore(boardState, 8, 0);
  /* prettier-ignore */
  boardState = [
    o, x, x,
    x, o, o,
    o, o, n
  ];
  testScore(boardState, 8, 0);
  /* prettier-ignore */
  boardState = [
    o, n, x,
    x, o, o,
    o, n, x
  ];
  testScore(boardState, 1, 0);
  testScore(boardState, 7, 0);
  /* prettier-ignore */
  boardState = [
    n, x, x,
    x, o, o,
    o, n, o
  ];
  testScore(boardState, 0, 2);
});

function testScore(boardState, position, expected) {
  const score = minimaxValue(boardState, position, x, x);
  if (score !== expected) {
    console.log('score', score, boardToString(boardState));
  }
  expect(score).toBe(expected);
}

function testMinimaxMove(boardState, expected) {
  const position = minimaxMove(boardState, x);
  if (position !== expected) {
    console.log('position', position, boardToString(boardState));
  }
  expect(position).toBe(expected);
}
