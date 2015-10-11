import './App.scss';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { ReduxRouter } from 'redux-router';
import configureStore from './util/configureStore';
import { AddLunchOption, ChooseLunchOption, OptionChoices, RemoteLunchChoice, NewUser } from '../shared/constants/actionTypes';
import Landing from './Landing/Landing';
import ChooseLunch from './ChooseLunch';
import RouteContainer from './RouteContainer';
import { socket } from './util/socket';


const routes = (
  <Route path="" component={RouteContainer}>
    <Route path="/" component={Landing} />
    <Route path="/lunch" component={ChooseLunch} />
  </Route>
);

const store = configureStore(routes);
socket.on('message', store.dispatch);


socket.on(NewUser, store.dispatch);
socket.on(OptionChoices, (optionChoices) => { store.dispatch({type: OptionChoices, ...optionChoices}); });
socket.on(AddLunchOption, store.dispatch);
socket.on(RemoteLunchChoice, store.dispatch);

class App extends Component {
  render() {
    return (
      <div>
      <Provider store={store}>
        <ReduxRouter>{routes}</ReduxRouter>
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
      </DebugPanel>
      </div>
    );
  }
}

export default App;
