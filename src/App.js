import React from 'react';
import './App.scss';
import store from './Components/redux/store'
import Header from './Components/Navbar/Navbar'
import routes from './routes'
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
          {routes}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
