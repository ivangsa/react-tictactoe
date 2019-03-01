import { createStore } from 'redux';
import { boardReducer } from './reducers';

export const initialState = {
  matchId: null, //string, identifies the current match, required
  boardState: Array(9).fill(null), // array of chars ( one of ['o','x', null]), required
  humanPlayerSymbol: null, //  ( one of ['o','x', null])
  computerPlayerSymbol: null, // ( one of ['o','x', null])
  nextPlayerSymbol: null, // ( one of ['o','x', null])
  history: [], // array of boardStates
  historyIndex: 0
};

export default createStore(boardReducer, initialState);
