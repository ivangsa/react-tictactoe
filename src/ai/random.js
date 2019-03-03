import { getEmptyCells, getRandomEntry } from './AI';

export function randomMove(boardState) {
  const emptyCells = getEmptyCells(boardState);
  return getRandomEntry(emptyCells);
}
