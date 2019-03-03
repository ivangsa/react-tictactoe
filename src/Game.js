import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { calculateNextMove, calculateWinner, isTerminal } from './ai/AI';
import { Board, ChooseSymbolPanel, EndGameResult, NewGamePanel, ChooseComputerAlgorithmPanel } from './Board';
import * as actions from './store/actions';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions }, dispatch);
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.thinking = false;
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

  componentWillReceiveProps(nextProps) {
    /* prettier-ignore */
    if (
      nextProps.nextPlayerSymbol
      && nextProps.computerPlayerSymbol === nextProps.nextPlayerSymbol
      && !isTerminal(nextProps.boardState)
    ) {
      this.doComputerMove(nextProps.boardState);
    }
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
    const winner = calculateWinner(boardState);

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

    if (false && winner) {
      return this.renderGame(<EndGameResult onClick={() => this.onNewGameClick()} />);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
