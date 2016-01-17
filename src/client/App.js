import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './Routes';
import configureStore from './util/configureStore';
import { socket } from './util/socket';
import { Authenticate } from '../shared/constants/actionTypes/authActionTypes';
import { Action } from '../shared/constants/WeboscketMessageTypes';

const store = configureStore(routes);

socket.on(Action, (action) => {
  // Actions sent from the server via action creators may include the 'isServerAction' property,
  // need to remove this or the client will send the action back to the server again du to the 'ServerAction' middleware
  if (action.meta && action.meta.hasOwnProperty('isServerAction')) {
    delete action.meta.isServerAction;
  }
  store.dispatch(action);
});
socket.on('connect', () => {
  const { user } = store.getState();
  socket.emit(Action, { type: Authenticate, payload: user, meta: { user } });
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
