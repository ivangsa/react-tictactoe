import React from 'react';

export function Board(props) {
  let rows = [];
  for (let i = 0; i < 9; i++) {
    rows.push(<Square value={props.squares[i]} onClick={() => props.onClick(i)} key={i} />);
  }
  return <div className="tic-tac-toe-board">{rows}</div>;
}

function Square(props) {
  const className = props.value + 'Symbol tic-tac-toe-cell';
  return <div className={className} onClick={props.onClick} />;
}

export function NewGamePanel(props) {
  return (
    <div className="info-panel">
      <div onClick={props.onClick}>New Game</div>
    </div>
  );
}

export function ChooseSymbolPanel(props) {
  return (
    <div className="info-panel">
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
    <div className="info-panel">
      <div onClick={props.onClick}>End Game</div>
    </div>
  );
}
