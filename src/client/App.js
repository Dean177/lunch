import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import './App.scss';
import './LunchPicker/LunchOption.scss';
import './LunchPicker/LunchPicker.scss';
import './LunchPicker/OptionAdder.scss';
import './components/PersonSquare/PersonSquare.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './routes';
import configureStore from './util/configureStore';
import { socket } from './util/socket';

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
