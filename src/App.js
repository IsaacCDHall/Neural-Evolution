import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Data from './components/Data';
import './App.css';


class App extends Component {
  render() {
    return (
    <div className="App">
    <style jsx>{`
      body {
        background: #040F0F no-repeat center center fixed;
        color: #FCFFFC;
        text-align: center;
        font-family: 'math', sans-serif;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
      }
    `}</style>
        <Header />
        <Switch>
          <Route path='/' component={Data} />
        </Switch>
      </div>
    );
  }
}

export default App;
