import React from 'react';
import './App.css';
import './Components/Header/Header.css'
import Header from './Components/Header/Header'
import routes from './routes'
import {HashRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        {routes}
      </div>
    </Router>
  );
}

export default App;
