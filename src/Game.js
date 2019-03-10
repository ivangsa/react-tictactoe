import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { calculateNextMove, calculateWinner, isTerminal } from './ai/AI';
import { Board, ChooseComputerAlgorithmPanel, ChooseSymbolPanel, NewGamePanel } from './Board';
import * as actions from './store/actions';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions }, dispatch);
}

/**
 * React component for tictactoe game.
 */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.thinking = false;
  }

  componentDidUpdate() {
    /* prettier-ignore */
    if (
      this.props.nextPlayerSymbol
      && this.props.computerPlayerSymbol === this.props.nextPlayerSymbol
      && !isTerminal(this.props.boardState)
    ) {
      this.doComputerMove(this.props.boardState);
    }
  }

  onNewGameClick() {
    this.props.newGameAction();
  }

  onHumanClick(i) {
    if (this.thinking) {
      return;
    }
    const boardState = this.props.boardState;
    if (boardState[i] || calculateWinner(boardState)) {
      return;
    }
    this.props.moveAction(i);
  }

  doComputerMove(boardState) {
    this.thinking = true;
    const position = calculateNextMove(boardState, this.props.computerPlayerSymbol, this.props.computerAlgorithm);
    this.props.moveAction(position);
    this.thinking = false;
  }

  onUndoClick() {
    if (this.canUndo()) {
      this.props.undoAction();
    }
  }

  canUndo() {
    return this.props.historyIndex > 1;
  }

  onRedoClick() {
    if (this.canRedo()) {
      this.props.redoAction();
    }
  }

  canRedo() {
    return this.props.history && this.props.history.length - 1 > this.props.historyIndex;
  }

  render() {
    const boardState = this.props.boardState;

    if (!this.props.matchId) {
      return this.renderGame(<NewGamePanel onClick={() => this.onNewGameClick()} />);
    }

    if (!this.props.nextPlayerSymbol) {
      return this.renderGame(<ChooseSymbolPanel onClick={humanPlayerSymbol => this.props.selectHumanSymbolAction(humanPlayerSymbol)} />);
    }

    if (!this.props.computerAlgorithm) {
      return this.renderGame(
        <ChooseComputerAlgorithmPanel onClick={computerAlgorithm => this.props.selectComputerAlgorithmAction(computerAlgorithm)} />
      );
    }

    let message = null;
    if (isTerminal(boardState)) {
      const winner = calculateWinner(boardState);
      if (winner) {
        message = winner === this.props.humanPlayerSymbol ? 'You win!!' : 'Computer Says No!';
      }
    }

    if (this.props.matchId) {
      return this.renderGame(
        <Board
          boadState={boardState}
          onClick={i => this.onHumanClick(i)}
          onUndoClick={() => this.onUndoClick()}
          onRedoClick={() => this.onRedoClick()}
          canUndo={this.canUndo()}
          canRedo={this.canRedo()}
          message={message}
        />
      );
    }
  }

  renderGame(game) {
    const boardState = this.props.boardState;
    const winner = calculateWinner(boardState);

    const status = `
        MatchId: ${this.props.matchId}
        Algorithm: ${this.props.computerAlgorithm}
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

Game.propTypes = {
  matchId: PropTypes.string,
  computerAlgorithm: PropTypes.string,
  boardState: PropTypes.array, // array of chars ( one of ['o','x', null]), required
  humanPlayerSymbol: PropTypes.string, //  ( one of ['o','x', null])
  computerPlayerSymbol: PropTypes.string, // ( one of ['o','x', null])
  nextPlayerSymbol: PropTypes.string, // ( one of ['o','x', null])
  history: PropTypes.array, // array of boardStates
  historyIndex: PropTypes.number,

  newGameAction: PropTypes.func.isRequired,
  selectHumanSymbolAction: PropTypes.func.isRequired,
  selectComputerAlgorithmAction: PropTypes.func.isRequired,
  moveAction: PropTypes.func.isRequired,
  undoAction: PropTypes.func.isRequired,
  redoAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
