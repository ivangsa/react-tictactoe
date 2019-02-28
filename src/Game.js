import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { calculateNextMove } from './ai';
import { Board, ChooseSymbolPanel, NewGamePanel, EndGameResult } from './Board';
import * as actions from './store/actions';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions }, dispatch);
}

class Game extends React.Component {
  onNewGameClick() {
    this.props.newGameAction();
  }

  onHumanClick(i) {
    const boardState = this.props.boardState;
    if (boardState[i] || calculateWinner(boardState)) {
      return;
    }
    this.props.moveAction(i);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.nextPlayerSymbol &&
      nextProps.computerPlayerSymbol === nextProps.nextPlayerSymbol &&
      !calculateWinner(nextProps.boardState)
    ) {
      this.doComputerMove(nextProps.boardState);
    }
  }

  doComputerMove(boardState) {
    const position = calculateNextMove(boardState, this.props.computerPlayerSymbol);
    this.props.moveAction(position);
  }

  onUndoClick() {}

  onRedoClick() {}

  render() {
    const boardState = this.props.boardState;
    const winner = calculateWinner(boardState);

    if (!this.props.matchId) {
      return this.renderGame(<NewGamePanel onClick={() => this.onNewGameClick()} />);
    }

    if (!this.props.nextPlayerSymbol) {
      return this.renderGame(<ChooseSymbolPanel onClick={humanPlayerSymbol => this.props.selectHumanSymbolAction(humanPlayerSymbol)} />);
    }

    if (false && winner) {
      return this.renderGame(<EndGameResult onClick={() => this.onNewGameClick()} />);
    }

    if (this.props.matchId) {
      return this.renderGame(<Board squares={boardState} onClick={i => this.onHumanClick(i)} />);
    }
  }

  renderGame(game) {
    const boardState = this.props.boardState;
    const winner = calculateWinner(boardState);

    const status = `
    MatchId: ${this.props.matchId}
    Human: ${this.props.humanPlayerSymbol}
    Computer: ${this.props.computerPlayerSymbol}
    Next player: ${this.props.nextPlayerSymbol}
    Winner: ${winner}`;

    return (
      <div className="tic-tac-toe-game">
        {game}
        <pre>{status}</pre>
        <div onClick={() => this.onNewGameClick()}>Reset Game</div>
      </div>
    );
    // return <div className="tic-tac-toe-game">{game}</div>;
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
