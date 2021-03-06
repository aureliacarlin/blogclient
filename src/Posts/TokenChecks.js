import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
//import GetDrafts from './GetDrafts'
import Posts from './Posts'
import Home from '../Home/Home'


class TokenChecks extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: '' 
    }
  }
  
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
        this.setState({ sessionToken: token})
    }
    console.log(this.state.sessionToken)
} 

setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token});
}


protectedViews = () => {
  if(this.state.sessionToken === localStorage.getItem('token') && this.state.sessionToken !== 'undefined') {
  return (
      <Route path='/posts' exact>
        <div>
          <Posts sessionToken={this.state.sessionToken} clickLogout={this.logout} />
        </div>
      </Route> 
    )
  } else {
    return (
    <Route path='/'> 
      <Home />
    </Route>
    )
  }
} 
  render() { 
    return (
      <Router>
      <div className="App">
        {this.protectedViews()}
      </div>
      </Router>
    );
  }
} 

export default TokenChecks;