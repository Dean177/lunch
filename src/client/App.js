import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './Routes';
import configureStore from './util/configureStore';
import { socket } from './util/socket';
import { Authenticated } from '../shared/constants/actionTypes/authActionTypes';
import { Action, Authenticate } from '../shared/constants/WeboscketMessageTypes';

const store = configureStore(routes);

socket.on(Action, store.dispatch);
socket.on('connect', () => {
  const { user } = store.getState();

  socket.emit(Authenticate, { user });
  socket.on(Authenticated, (payload) => {
    setTimeout(
      () => { store.dispatch({ type: Authenticated, payload }); },
      500
    );
  });
});


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <ReduxRouter>{routes}</ReduxRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
