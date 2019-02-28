import { initialState } from '.';
import * as actionTypes from './actionTypes';

export const boardReducer = (state = {}, action) => {
  if (action.type === actionTypes.NEW_GAME_ACTION) {
    return {
      ...initialState,
      ...action.payload,
      history: [initialState.boardState],
      humanPlayerSymbol: other(action.payload.computerPlayerSymbol)
    };
  }
  if (action.type === actionTypes.SELECT_HUMAN_SYMBOL_ACTION) {
    return {
      ...state,
      ...action.payload,
      nextPlayerSymbol: action.payload.humanPlayerSymbol,
      computerPlayerSymbol: other(action.payload.humanPlayerSymbol)
    };
  }
  if (action.type === actionTypes.MOVE_ACTION) {
    const move = { player: state.nextPlayerSymbol, position: action.payload.position };
    const boardState = [...state.boardState];
    boardState[move.position] = state.nextPlayerSymbol;
    return {
      ...state,
      boardState,
      nextPlayerSymbol: other(state.nextPlayerSymbol),
      step: state.step + 1,
      history: [...state.history.slice(0, state.step), move]
    };
  }
  return state;
};

function other(symbol) {
  if (symbol == null) {
    return null;
  }
  return symbol === 'o' ? 'x' : 'o';
}
