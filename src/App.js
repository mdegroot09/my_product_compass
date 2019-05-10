import React from 'react';
import './App.css';
import './Components/Navbar/Navbar.css'
import './Components/Home/Home.css'
import './Components/Tasks/Tasks.css'
import './Components/Devs/Devs.css'
import './Components/Dev/Dev.css'
import './Components/ComponentTree/ComponentTree.css'
import './Components/NewTask/NewTask.css'
import './Components/Login/Login.css'
import './Components/Register/Register.css'
import './Components/Products/Products.css'
import './Components/NewProduct/NewProduct.css'
import './Components/NewComponent/NewComponent.css'
import './Components/UpdateTask/UpdateTask.css'
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
