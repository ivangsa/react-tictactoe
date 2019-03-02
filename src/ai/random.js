import { getEmptyCells, getRandomEntry } from './';

export function randomMove(boardState) {
  const emptyCells = getEmptyCells(boardState);
  return getRandomEntry(emptyCells);
}
