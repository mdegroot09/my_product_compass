import React from 'react';
import './App.css';
import './Components/Navbar/Navbar.css'
import './Components/Home/Home.css'
import Header from './Components/Navbar/Navbar'
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
