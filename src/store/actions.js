import * as actionTypes from './actionTypes';

export const newGameAction = () => {
  const matchId = require('uuid').v4();
  const isComputerStarting = Math.random() >= 0.5;
  let nextPlayerSymbol = null;
  let computerPlayerSymbol = null;
  if (isComputerStarting) {
    nextPlayerSymbol = Math.random() >= 0.5 ? 'x' : 'o';
    computerPlayerSymbol = nextPlayerSymbol;
  }
  return {
    type: actionTypes.NEW_GAME_ACTION,
    payload: {
      matchId,
      nextPlayerSymbol,
      computerPlayerSymbol
    }
  };
};

export const selectHumanSymbolAction = humanPlayerSymbol => {
  return {
    type: actionTypes.SELECT_HUMAN_SYMBOL_ACTION,
    payload: {
      humanPlayerSymbol
    }
  };
};

export const selectComputerAlgorithmAction = computerAlgorithm => {
  return {
    type: actionTypes.SELECT_COMPUTER_ALGORITHM_ACTION,
    payload: {
      computerAlgorithm
    }
  };
};

export const moveAction = position => {
  return {
    type: actionTypes.MOVE_ACTION,
    payload: {
      position
    }
  };
};

export const undoAction = (player, square) => {
  return {
    type: actionTypes.UNDO_ACTION,
    payload: {}
  };
};

export const redoAction = (player, square) => {
  return {
    type: actionTypes.REDO_ACTION,
    payload: {}
  };
};
