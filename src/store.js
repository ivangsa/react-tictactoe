import { createStore, combineReducers } from 'redux';

const initialState = {
  matchId: null, //string, identifies the current match, required
  boardState: Array(9).fill(null), // array of chars ( one of ['o','x', null]), required
  humanPlayer: null, //  ( one of ['o','x', null])
  computerPlayer: null, // ( one of ['o','x', null])
  nextPlayer: null, // ( one of ['o','x', null])
  history: [Array(9).fill(null)], // array of moves: { player: ( one of ['o','x']) , position: [0-8] }
  step: 0,
};

export const newGameAction = (id, humanPlayer, nextPlayer) => {
  const computerPlayer = humanPlayer === 'x'? 'o' : 'x';
  return {
    type: 'NEW_GAME_ACTION',
    reduce: (state) => {
      return {
        ...initialState,
        id: id,
        humanPlayer: humanPlayer,
        computerPlayer: computerPlayer,
        nextPlayer: nextPlayer,
      };
    }
  };
}

export const moveAction = (square) => {
  return {
    type: 'MOVE_ACTION',
    reduce: (state) => {
      const move = {player: state.nextPlayer, position: square};
      const boardState = [...state.boardState];
      boardState[square] = state.nextPlayer;
      return {
        ...state, 
        boardState: boardState,
        nextPlayer: state.nextPlayer === 'o'? 'x' : 'o',
        step: state.step + 1,
        history: [...state.history.slice(0, state.step), move]
      };
    }
  }
}

export const undoAction = (player, square) => {
  return {
    type: 'UNDO_ACTION',
    reduce: (state) => {
      return {...state};
    }
  };
}

export const redoAction = (player, square) => {
  return {
    type: 'REDO_ACTION',
    reduce: (state) => {
      return {...state};
    }
  };
}


const mainReducer = (state = {}, action) => {
  if (action.reduce) {
    return action.reduce(state)
  }
  return state;
};

export default createStore(mainReducer, initialState);
