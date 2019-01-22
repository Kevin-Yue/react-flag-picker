import React, { Component } from 'react';
import { Header } from './Header';
import { MainView } from './MainView';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainView />
      </div>
    );
  }
}

export default App;
