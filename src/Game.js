import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from './Board';
import * as actions from './store/actions';
import { calculateNextMove } from './ai';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newGameAction: actions.newGameAction,
      moveAction: actions.moveAction
    },
    dispatch
  );
}

class Game extends React.Component {
  onNewGameClick() {
    this.props.newGameAction();
    // if (this.props.nextPlayerSymbol === this.props.computerPlayerSymbol) {
    //   this.doComputerMove();
    // }
  }

  onSquareClick(i) {
    const boardState = this.props.boardState;
    if (boardState[i] || calculateWinner(boardState)) {
      return;
    }
    this.props.moveAction(i);
  }

  doComputerMove() {
    const position = calculateNextMove(this.props.boardState, this.props.nextPlayerSymbol);
    this.props.moveAction(position);
  }

  onUndoClick() {}

  onRedoClick() {}

  getNextPlayerName() {
    return this.props.nextPlayerSymbol !== null
      ? this.props.humanPlayerSymbol === this.props.nextPlayerSymbol
        ? 'You move'
        : 'Computer'
      : '';
  }

  render() {
    const boardState = this.props.boardState;
    const winner = calculateWinner(boardState);

    let status;
    if (winner) {
      status = 'Winner: ' + this.props.humanPlayerSymbol === winner ? 'You Win!!' : ' Computer says no!!';
    } else {
      status = `Computer: ${this.props.humanPlayerSymbol}
       Human: ${this.props.computerPlayerSymbol}
       Next player: ${this.getNextPlayerName()}`;
    }

    return (
      <div className="tic-tac-toe-game">
        <button onClick={() => this.onNewGameClick()}>New Game X</button>
        <button onClick={() => this.doComputerMove()}>Computer Move</button>
        <Board squares={boardState} onClick={i => this.onSquareClick(i)} />
        <div className="tic-tac-toe-info hidden">
          <h1 className="tic-tac-toe--title-label" />
        </div>
        <pre>{status}</pre>
      </div>
    );
  }
}

function calculateWinner(squares) {
  /* prettier-ignore */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//export default Game;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
