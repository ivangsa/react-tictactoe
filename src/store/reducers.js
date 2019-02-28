import * as actionTypes from './actionTypes';

export const boardReducer = (state = {}, action) => {
  if (action.type === actionTypes.NEW_GAME_ACTION) {
    const matchId = 1;
    const isComputerStarting = false; // Math.random() >= 0.5;
    let nextPlayerSymbol = 'o';
    if (isComputerStarting) {
      nextPlayerSymbol = Math.random() >= 0.5 ? 'x' : 'o';
    }
    const computerPlayerSymbol = other(nextPlayerSymbol);
    const humanPlayerSymbol = other(computerPlayerSymbol);
    return {
      ...state,
      matchId,
      humanPlayerSymbol,
      computerPlayerSymbol,
      nextPlayerSymbol
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
