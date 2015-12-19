import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';

import './LunchPicker/LunchOption.scss';
import './LunchPicker/LunchPicker.scss';
import './LunchPicker/OptionAdder.scss';
import './components/PersonSquare/PersonSquare.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './Routes';
import configureStore from './util/configureStore';
import { socket } from './util/socket';

const store = configureStore(routes);
socket.on('message', store.dispatch);

class App extends Component {
  render() {
    if (__DEVELOPMENT__) {
      // TODO re-enable devtools https://github.com/gaearon/redux-devtools/tree/v3.0.0
    }

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
