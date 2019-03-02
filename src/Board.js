import React from 'react';

export function Board(props) {
  let rows = [];
  for (let i = 0; i < 9; i++) {
    rows.push(<Square value={props.squares[i]} onClick={() => props.onClick(i)} key={i} />);
  }
  return (
    <div>
      <div className="tic-tac-toe-board">{rows}</div>
      <GameToolbar onUndoClick={props.onUndoClick} onRedoClick={props.onRedoClick} />
    </div>
  );
}

function Square(props) {
  const className = props.value + 'Symbol tic-tac-toe-cell';
  return <div className={className} onClick={props.onClick} />;
}

function GameToolbar(props) {
  return (
    <div className="tic-tac-toe-toolbar">
      <div className="undo" onClick={() => props.onUndoClick()}>
        Undo
      </div>
      <div className="redo" onClick={() => props.onRedoClick()}>
        Redo
      </div>
    </div>
  );
}

export function NewGamePanel(props) {
  return (
    <div className="tic-tac-toe-info">
      <span className="tic-tac-toe-new-game-button" onClick={props.onClick}>
        New Game
      </span>
    </div>
  );
}

export function ChooseSymbolPanel(props) {
  return (
    <div className="tic-tac-toe-info">
      <div>Choose your symbol</div>
      <div className="oSymbol tic-tac-toe-cell" onClick={() => props.onClick('o')}>
        o
      </div>
      <div className="xSymbol tic-tac-toe-cell" onClick={() => props.onClick('x')}>
        x
      </div>
    </div>
  );
}

export function EndGameResult(props) {
  return (
    <div className="tic-tac-toe-info">
      <div onClick={props.onClick}>End Game</div>
    </div>
  );
}
