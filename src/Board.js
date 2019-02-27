import React, { Component } from 'react';


function Square(props) {
  const className = props.value + 'Symbol tic-tac-toe-cell';
  return <div className={className} onClick={props.onClick} />;
}

export default class Board extends React.Component {
  render() {
    let rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} key={i} />);
    }
    return <div className="tic-tac-toe-board">{rows}</div>;
  }
}
