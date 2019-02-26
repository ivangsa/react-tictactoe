import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

const initialState = {
  matchId: null, //string, identifies the current match, required
  boardState: Array(9).fill(null), // array of chars ( one of ['o','x', null]), required
  lastMove: null, // object, represents the next move of the player, required only on input
  customField1: 'customValue1', // any format, optional for the developer
  customField2: 'customValue1', // any format, optional for the developer
  customField3: 'customValue1' // any format, optional for the developer
};

export default createStore(combineReducers(reducers), initialState);
