import React, { useReducer } from 'react';
import { calculateNextMove, calculateWinner, isTerminal } from './ai/AI';
import { Board, ChooseComputerAlgorithmPanel, ChooseSymbolPanel, NewGamePanel } from './Board';
import { initialState, rootReducer } from './store/store';
import * as actions from './store/actions';


/**
 * React component for tictactoe game.
 */
export default function Game() {
  console.log("Game");
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const onNewGameClick = () => {
    dispatch(actions.newGameAction());
  }

  const onHumanClick = (i) => {
    const boardState = state.boardState;
    if (boardState[i] || calculateWinner(boardState)) {
      return;
    }
    dispatch(actions.moveAction(i));
  }

  const doComputerMove = () => {
    const position = calculateNextMove(state.boardState, state.computerPlayerSymbol, state.computerAlgorithm);
    dispatch(actions.moveAction(position));
  }

  const onUndoClick = () => {
    if (canUndo()) {
      dispatch(actions.undoAction());
    }
  }

  const canUndo = () => {
    return state.historyIndex > 1;
  }

  const onRedoClick = () => {
    if (canRedo()) {
      dispatch(actions.redoAction());
    }
  }

  const canRedo = () => {
    return state.history && state.history.length - 1 > state.historyIndex;
  }

  const renderGame = (game) => {
    const boardState = state.boardState;
    const winner = calculateWinner(boardState);

    const status = `
        MatchId: ${state.matchId}
        Algorithm: ${state.computerAlgorithm}
        Human: ${state.humanPlayerSymbol}
        Computer: ${state.computerPlayerSymbol}
        Next player: ${state.nextPlayerSymbol}
        Winner: ${winner}
        Board State: ${state.boardState}
        History Lenght: ${state.history.length}
        History Index: ${state.historyIndex}
        History: ${state.history.map(boardState => boardState.join('-'))}
        `;
    return (
      <div>
        <div className="tic-tac-toe-game">{game}</div>

        <div className="tic-tac-toe-status">
          <pre>
            {status}
            <button onClick={() => onNewGameClick()}>Reset Game</button>
          </pre>
        </div>
      </div>
    );
    // return <div className="tic-tac-toe-game">{game}</div>;
  }

  const render = () => {
    const boardState = state.boardState;

    if (!state.matchId) {
      return renderGame(<NewGamePanel onClick={() => onNewGameClick()} />);
    }

    if (!state.nextPlayerSymbol) {
      return renderGame(<ChooseSymbolPanel onClick={humanPlayerSymbol => dispatch(actions.selectHumanSymbolAction(humanPlayerSymbol))} />);
    }

    if (!state.computerAlgorithm) {
      return renderGame(
        <ChooseComputerAlgorithmPanel onClick={computerAlgorithm => dispatch(actions.selectComputerAlgorithmAction(computerAlgorithm))} />
      );
    }

    let message = null;
    if (isTerminal(boardState)) {
      const winner = calculateWinner(boardState);
      if (winner) {
        message = winner === state.humanPlayerSymbol ? 'You win!!' : 'Computer Says No!';
      }
    }

    if (state.matchId) {
      return renderGame(
        <Board
          boadState={boardState}
          onClick={i => onHumanClick(i)}
          onUndoClick={() => onUndoClick()}
          onRedoClick={() => onRedoClick()}
          canUndo={canUndo()}
          canRedo={canRedo()}
          message={message}
        />
      );
    }
  }

  /* prettier-ignore */
  if (
    state.nextPlayerSymbol
    && state.computerPlayerSymbol === state.nextPlayerSymbol
    && !isTerminal(state.boardState)
  ) {
    doComputerMove(state.boardState);
  }
  
  return render();
}
