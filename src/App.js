import React, { Component } from 'react';
import './App.css';
import Routing from './Routes/Routing';
import  { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Routing />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
