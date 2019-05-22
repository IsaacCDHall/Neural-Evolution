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
        background: #314455;
        color: #F39E02;
        text-align: center;
        font-family: 'Atomic Age', cursive;
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
