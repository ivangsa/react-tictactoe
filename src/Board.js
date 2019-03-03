import React from 'react';
import { algorithms } from './ai/AI';

/**
 *
 * @param {*} props
 */
export function Board(props) {
  let rows = [];
  for (let i = 0; i < 9; i++) {
    rows.push(<Square value={props.boadState[i]} onClick={() => props.onClick(i)} key={i} />);
  }
  return (
    <div>
      <div className="tic-tac-toe-board">{rows}</div>
      {/* prettier-ignore */}
      <GameToolbar 
          onUndoClick={props.onUndoClick}
          onRedoClick={props.onRedoClick} 
          canUndo={props.canUndo}
          canRedo={props.canRedo}
      />
    </div>
  );
}

/**
 *
 * @param {*} props
 */
function Square(props) {
  const className = props.value + 'Symbol tic-tac-toe-cell';
  return <div className={className} onClick={props.onClick} />;
}

function GameToolbar(props) {
  const undoClassName = 'undo' + (props.canUndo ? '' : ' disabled');
  const redoClassName = 'redo' + (props.canRedo ? '' : ' disabled');
  return (
    <div className="tic-tac-toe-toolbar">
      <button className={undoClassName} onClick={() => props.onUndoClick()}>
        Undo
      </button>
      <h2>Tic Tac Toe</h2>
      <button className={redoClassName} onClick={() => props.onRedoClick()}>
        Redo
      </button>
    </div>
  );
}

/**
 *
 * @param {*} props
 */
export function NewGamePanel(props) {
  return (
    <div className="tic-tac-toe-info tic-tac-toe-board">
      <h1 className="tic-tac-toe--title-label">Tic-Tac-Toe</h1>
      <div className="tic-tac-toe-buttons">
        <button className="tic-tac-toe-cell" onClick={props.onClick}>
          New Game
        </button>
      </div>
    </div>
  );
}

/**
 *
 * @param {*} props
 */
export function ChooseSymbolPanel(props) {
  return (
    <div className="tic-tac-toe-info tic-tac-toe-board">
      <h1 className="tic-tac-toe--title-label">Choose your symbol</h1>
      <div className="tic-tac-toe-buttons">
        <button className="oSymbol tic-tac-toe-cell" onClick={() => props.onClick('o')} />
        <button className="xSymbol tic-tac-toe-cell" onClick={() => props.onClick('x')} />
      </div>
    </div>
  );
}

/**
 *
 * @param {*} props
 */
export function ChooseComputerAlgorithmPanel(props) {
  return (
    <div className="tic-tac-toe-info tic-tac-toe-board">
      <h1 className="tic-tac-toe--title-label">Choose Computer Algorithm</h1>
      <div className="tic-tac-toe-buttons">
        <button className="tic-tac-toe-cell" onClick={() => props.onClick(algorithms.minimax)}>
          Minimax
        </button>
        <button className="tic-tac-toe-cell" onClick={() => props.onClick(algorithms.alphabeta)}>
          AlphaBeta
        </button>
        <button className="tic-tac-toe-cell" onClick={() => props.onClick(algorithms.random)}>
          Random play
        </button>
      </div>
    </div>
  );
}

/**
 *
 * @param {*} props
 */
export function EndGameResult(props) {
  return (
    <div className="tic-tac-toe-info">
      <div onClick={props.onClick}>End Game</div>
    </div>
  );
}
