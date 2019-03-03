import { getEmptyCells, getRandomEntry } from './AI';

/**
 * Returns a random move for given board state.
 *
 * @param {*} boardState
 */
export function randomMove(boardState) {
  const emptyCells = getEmptyCells(boardState);
  return getRandomEntry(emptyCells);
}
