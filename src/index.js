import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Game from './Game';
import { Provider, connect } from 'react-redux';
import store from './store';
import './style.scss';

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
