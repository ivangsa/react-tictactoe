import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Board from './Board';
import * as actions from './store';

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newGameAction: actions.newGameAction,
    moveAction: actions.moveAction
  }, dispatch);
}


class Game extends React.Component {

  constructor(props) {
    super(props);
    props.newGameAction(1,'x','x');
  }

  handleClick(i) {
    const boardState = this.props.boardState;
    if (boardState[i] || calculateWinner(boardState)) {
      return;
    }
    this.props.moveAction(i);

    // boardState[i] = this.props.xIsNext ? 'x' : 'o';
    // this.setState({
    //   history: history.concat([
    //     {
    //       squares: squares
    //     }
    //   ]),
    //   stepNumber: history.length,
    //   xIsNext: !this.props.xIsNext
    // });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const boardState = this.props.boardState;
    const winner = calculateWinner(boardState);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.props.nextPlayer;
    }

    return (
      <div className="tic-tac-toe-game">
          <Board squares={boardState} onClick={i => this.handleClick(i)} />
          <div className="tic-tac-toe-info hidden">
            <h1 className="tic-tac-toe--title-label" />
          </div>
          <div>{status}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Game);