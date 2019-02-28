import * as actionTypes from './actionTypes';

export const newGameAction = () => {
  return {
    type: actionTypes.NEW_GAME_ACTION,
    payload: {}
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
