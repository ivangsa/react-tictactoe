import React from 'react';
import { algorithms } from './ai/AI';

/**
 *
 * @param {*} props
 */
export function Board({ boadState, onClick, onUndoClick, canUndo, onRedoClick, canRedo, message }) {
  let rows = [];
  for (let i = 0; i < 9; i++) {
    rows.push(<Square value={boadState[i]} onClick={onClick} key={i} index={i} />);
  }
  return (
    <div>
      <div className="tic-tac-toe-board">{rows}</div>
      {/* prettier-ignore */}
      <GameToolbar 
          onUndoClick={onUndoClick}
          onRedoClick={onRedoClick}
          canUndo={canUndo}
          canRedo={canRedo}
          message={message}
      />
    </div>
  );
}

class Square extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick(this.props.index);
  }
  render() {
    const className = this.props.value + 'Symbol tic-tac-toe-cell';
    return <div className={className} onClick={this.onClick} />;
  }
}

function GameToolbar({ onUndoClick, canUndo, onRedoClick, canRedo, message }) {
  if (message) {
    return (
      <div className="tic-tac-toe-toolbar">
        <h2 className="end-game">{message}</h2>
      </div>
    );
  }
  const undoClick = function() {
    onUndoClick();
  };
  const redoClick = function() {
    onRedoClick();
  };
  const undoClassName = 'undo' + (canUndo ? '' : ' disabled');
  const redoClassName = 'redo' + (canRedo ? '' : ' disabled');
  return (
    <div className="tic-tac-toe-toolbar">
      <button className={undoClassName} onClick={undoClick}>
        Undo
      </button>
      <h2>Tic Tac Toe</h2>
      <button className={redoClassName} onClick={redoClick}>
        Redo
      </button>
    </div>
  );
}

/**
 *
 * @param {*} props
 */
export function NewGamePanel({ onClick }) {
  return (
    <div className="tic-tac-toe-info tic-tac-toe-board">
      <h1 className="tic-tac-toe--title-label">Tic-Tac-Toe</h1>
      <div className="tic-tac-toe-buttons">
        <button className="tic-tac-toe-cell" onClick={onClick}>
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
export function ChooseSymbolPanel({ onClick }) {
  return (
    <div className="tic-tac-toe-info tic-tac-toe-board">
      <h1 className="tic-tac-toe--title-label">Choose your symbol</h1>
      <div className="tic-tac-toe-buttons">
        <button className="oSymbol tic-tac-toe-cell" onClick={() => onClick('o')} />
        <button className="xSymbol tic-tac-toe-cell" onClick={() => onClick('x')} />
      </div>
    </div>
  );
}

/**
 *
 * @param {*} props
 */
export function ChooseComputerAlgorithmPanel({ onClick }) {
  return (
    <div className="tic-tac-toe-info tic-tac-toe-board">
      <h1 className="tic-tac-toe--title-label">Choose Computer Algorithm</h1>
      <div className="tic-tac-toe-buttons">
        <button className="tic-tac-toe-cell" onClick={() => onClick(algorithms.minimax)}>
          Minimax
        </button>
        <button className="tic-tac-toe-cell" onClick={() => onClick(algorithms.alphabeta)}>
          AlphaBeta
        </button>
        <button className="tic-tac-toe-cell" onClick={() => onClick(algorithms.random)}>
          Random play
        </button>
      </div>
    </div>
  );
}
