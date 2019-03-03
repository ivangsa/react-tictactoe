import { createStore } from 'redux';
import { boardReducer, computerAlgorithmReducer } from './reducers';

export const initialState = {
  matchId: null, //string, identifies the current match, required
  computerAlgorithm: null,
  boardState: Array(9).fill(null), // array of chars ( one of ['o','x', null]), required
  humanPlayerSymbol: null, //  ( one of ['o','x', null])
  computerPlayerSymbol: null, // ( one of ['o','x', null])
  nextPlayerSymbol: null, // ( one of ['o','x', null])
  history: [], // array of boardStates
  historyIndex: 0
};

function rootReducer(appState, action) {
  const state = boardReducer(appState, action);
  return computerAlgorithmReducer(state, action);
}

//export default createStore(combineReducers(reducers), initialState);
export default createStore(rootReducer, initialState);
