import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './Routes';
import configureStore from './util/configureStore';
import { socket } from './util/socket';
import { Authenticated } from '../shared/constants/actionTypes/authActionTypes';

const store = configureStore(routes);

socket.on('action', store.dispatch);
socket.on('connect', () => {
  const { user } = store.getState();

  socket.emit('authenticate', {
    id: user.id,
    name: user.name,
    splitwiseAuthToken: user.splitwiseAuthToken,
  });

  socket.on('authenticated', () => {
    setTimeout(() => {
      store.dispatch({ type: Authenticated, payload: { isAuthenticated: true } });
    }, 1000);
  });
});


class App extends Component {
  render() {
    // TODO re-enable devtools https://github.com/gaearon/redux-devtools/tree/v3.0.0

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
