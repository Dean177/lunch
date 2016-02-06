// import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { routeActions } from 'react-router-redux';
import { find } from 'underscore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './Routes';
import configureStore from './util/configureStore';
import { socket } from './util/socket';
import { Authenticate } from '../shared/constants/actionTypes/authActionTypes';
import { Action, Connection } from '../shared/constants/WeboscketMessageTypes';

const history = createBrowserHistory();
const store = configureStore(history);

function navigateIfUserHasChosenLunchOption(action) {
  return (dispatch, getState) => {
    const { payload: { lunchOptionId }, meta: { navigateTo } } = action;
    const { user, lunch: { peopleChoices } } = getState();
    const usersLunchChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === user.id));

    if (usersLunchChoice && usersLunchChoice.lunchOptionId === lunchOptionId) {
      dispatch(routeActions.push(navigateTo));
    }
  };
}

socket.on(Action, (action) => {
  // Actions sent from the server via action creators may include the 'isServerAction' property,
  // need to remove this or the client will send the action back to the server again du to the 'ServerAction' middleware
  if (action.meta && action.meta.hasOwnProperty('isServerAction')) {
    delete action.meta.isServerAction;
  }
  store.dispatch(action);
  if (action.meta && action.meta.navigateTo) {
    store.dispatch(navigateIfUserHasChosenLunchOption(action));
  }
});

socket.on(Connection, () => {
  const { user } = store.getState();
  socket.emit(Action, { type: Authenticate, payload: user, meta: { user } });
});

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <Router history={history}>{routes}</Router>
        </Provider>
      </div>
    );
  }
}

export default App;
