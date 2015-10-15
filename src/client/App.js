import './App.scss';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { ReduxRouter } from 'redux-router';
import configureStore from './util/configureStore';
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

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>{routes}</ReduxRouter>
        </Provider>

      </div>
    );
  }
}

//<DebugPanel top right bottom>
//  <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
//</DebugPanel>

export default App;
