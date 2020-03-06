import React, { Component } from 'react';
import './App.css';
import Form from './components/form/form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> E-Commerce-App</h1>
          <Form />
      </div>
    );
  }
};

export default App;