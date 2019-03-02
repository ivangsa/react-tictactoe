import { minimaxMove, minimaxValue } from './minimax';

const x = 'x';
const o = 'o';
const n = null;

function toString(boardState) {
  boardState = boardState.map(i => i? i : ' ');
  return `
    ${boardState.slice(0, 3)}
    ${boardState.slice(3, 6)}
    ${boardState.slice(6, 9)}
    `;
}

test('terminal states minimaxMove', () => {
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
    o, x, x,
    x, o, o,
    o, o, n
  ];
  testMinimaxMove(boardState, 8);
  
});

// test('terminal states score', () => {
//   let boardState = null;
  
//   /* prettier-ignore */
//   boardState = [
//     o, x, x,
//     x, o, o,
//     o, n, n
//   ];
//   testScore(boardState, 8, 0);

//   /* prettier-ignore */
//   boardState = [
//     o, x, x,
//     x, o, o,
//     o, o, n
//   ];
//   testScore(boardState, 8, 0);
  
// });


function testScore(boardState, position, expected) {
  const score = minimaxValue(boardState, position, x, x);
  console.log('score', score, toString(boardState));
  expect(score).toBe(expected);
}

function testMinimaxMove(boardState, expected) {
  const position = minimaxValue(boardState, x);
  console.log('position', position, toString(boardState));
  expect(position).toBe(expected);
}