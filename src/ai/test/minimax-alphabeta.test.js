// import { boardToString } from '../AI';
import { minimaxWithAlphaBetaMove as minimaxMove } from '../minimax-alphabeta';

const x = 'x';
const o = 'o';
const n = null;

test('tests alphaBeta', () => {
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
});

function testMinimaxMove(boardState, expected) {
  const position = minimaxMove(boardState, x);
  if (position !== expected) {
    // console.log('position', position, boardToString(boardState));
  }
  expect(position).toBe(expected);
}
