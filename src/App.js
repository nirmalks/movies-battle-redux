import React, { Component } from 'react';
import './style/App.css';
import HomePage from './components/HomePage';
import BattlePage from './components/BattlePage';
import { BrowserRouter , Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import promise from "redux-promise";
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={ HomePage } />
            <Route exact path="/battle" component={ BattlePage } />
          </div>
        </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
