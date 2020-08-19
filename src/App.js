import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link
} from 'react-router-dom';
import ListPage from './ListPage.js';
import HomePage from './HomePage.js';
import AuthPage from './AuthPage.js';
import './App.css';

export default class App extends Component {
  state = {
    // pop the local storage token into the react state
    token: localStorage.getItem('token'),
  }

handleToken = (token) => {
    // we have it in state so that the DOM automatically updates in response to changes
    this.setState({ token: token })

    // prevents having to login every time we make a change in react
    localStorage.setItem('token', token)
}

clearToken = () => {
    // we CLEAR it in state so that the DOM automatically updates in response to changes
    this.setState({ token: '' })

    localStorage.setItem('token', '')
}
  render() {
    return (
      <div className="App">
      <header className="App-header">    
          <Router>
              <main>

              <div className="sidebar">
                  {
                      this.state.token && 
                      <>
                      <Link to='/list'>Your To Do's</Link>
                      <Link to='/'>Home</Link>
                      <Link to='/login'>
                          <button onClick={this.clearToken}>Log out</button>
                      </Link>
                      </>
                  }
              </div>
              <div className="content">
              <Switch>
                  <Route 
                      path="/" 
                      exact
                      render={(routerProps) => <HomePage token={this.state.token} {...routerProps} />} 
                  />
                  <Route 
                      path="/list" 
                      exact
                      render={(routerProps) => <ListPage token={this.state.token} {...routerProps} />} 
                  />
                  <Route 
                      path="/login" 
                      exact
                      render={(routerProps) => <AuthPage 
                          handleToken={this.handleToken}
                          token={this.state.token} 
                          {...routerProps} />} 
                  />
              </Switch>
              </div>
              </main>
              </Router>
      </header>
      </div>
      );
  }
  
}
