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
      historyIndex: state.historyIndex + 1,
      history: [...state.history.slice(0, state.historyIndex + 1), boardState] // XXX
    };
  }
  if (action.type === actionTypes.UNDO_ACTION) {
    let nextHistoryIndex = state.historyIndex - 2;
    nextHistoryIndex = nextHistoryIndex > 0 ? nextHistoryIndex : 0;
    return {
      ...state,
      boardState: state.history[nextHistoryIndex],
      historyIndex: nextHistoryIndex
    };
  }
  if (action.type === actionTypes.REDO_ACTION) {
    if (state.historyIndex + 1 > state.history.length) {
      return state;
    }
    const nextHistoryIndex = state.historyIndex + 1;
    return {
      ...state,
      boardState: state.history[nextHistoryIndex],
      historyIndex: nextHistoryIndex,
      nextPlayerSymbol: other(state.nextPlayerSymbol)
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
