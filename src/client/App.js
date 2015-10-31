import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import './App.scss';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import configureStore from './util/configureStore';
import Landing from './Landing/Landing';
import ChooseLunch from './ChooseLunch';
import UserConfig from './UserConfig/UserConfig';
import RouteContainer from './RouteContainer';
import { socket } from './util/socket';


const routes = (
  <Route path="" component={RouteContainer}>
    <Route path="/" component={Landing} />
    <Route path="/lunch" component={ChooseLunch} />
    <Route path="/user" component={UserConfig} />
  </Route>
);

const store = configureStore(routes);

socket.on('message', store.dispatch);

class App extends Component {
  render() {
    let devtools;
    if (__DEVELOPMENT__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      devtools = (
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
        </DebugPanel>
      );
    }

    return (
      <div className="App">
        <Provider store={store}>
          <ReduxRouter>{routes}</ReduxRouter>
        </Provider>
        {devtools}
      </div>
    );
  }
}

export default App;
