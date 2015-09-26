import './App.scss';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { ReduxRouter } from 'redux-router';
import io from 'socket.io-client';
import configureStore from './util/configureStore';
import Landing from './Landing/Landing';
import ChooseLunch from './ChooseLunch';

const store = configureStore();
export const socket = io.connect(`http://${window.location.hostname}:3000`);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={Landing} />
            <Route path="/lunch" component={ChooseLunch} />
          </ReduxRouter>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false}/>
        </DebugPanel>
      </div>
    );
  }
}

export default App;
