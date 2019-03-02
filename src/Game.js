import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { calculateNextMove, calculateWinner } from './ai';
import { Board, ChooseSymbolPanel, EndGameResult, NewGamePanel } from './Board';
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

  onUndoClick() {
    console.log('undoClick');
    if (this.canUndo()) {
      this.props.undoAction();
    }
  }

  canUndo() {
    return this.props.historyIndex > 0; // XXX
  }

  onRedoClick() {
    if (this.canRedo()) {
      this.props.redoAction();
    }
  }

  canRedo() {
    return this.props.history && this.props.historyIndex && this.props.history.length > this.props.historyIndex - 1;
  }

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
      return this.renderGame(
        <Board
          squares={boardState}
          onClick={i => this.onHumanClick(i)}
          onUndoClick={() => this.onUndoClick()}
          onRedoClick={() => this.onRedoClick()}
        />
      );
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
        Winner: ${winner}
        Board State: ${this.props.boardState}
        History Lenght: ${this.props.history.length}
        History Index: ${this.props.historyIndex}
        History: ${this.props.history.map(boardState => boardState.join('-'))}
        `;
    return (
      <div>
        <div className="tic-tac-toe-game">{game}</div>

        <div className="tic-tac-toe-status">
          <pre>
            {status}
            <button onClick={() => this.onNewGameClick()}>Reset Game</button>
          </pre>
        </div>
      </div>
    );
    // return <div className="tic-tac-toe-game">{game}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
