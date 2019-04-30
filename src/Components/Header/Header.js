import React, {Component} from 'react'
import './Header.css'
import {HashRouter as Router, Link} from 'react-router-dom'

export default class Header extends Component {
  render() {
    return(
      <div>
        <header>
          <div className='headerLeft'>
            <img className='headerLogo' src="https://i.ibb.co/kcBcSnq/compass-logo-inverted.png" alt="My Product Compass logo"/>
            <Router>
              <Link to='/'>
                <button className='headerBtn'>Home</button>
              </Link>
              <div className='headerBtn dropdown'>
                <span className='headerBtn'>Create</span>
              </div>
              <Link to='/tasks'>
                <button className='headerBtn'>Manage</button>
              </Link>
              <Link to='/about'>
              <button className='headerBtn'>About</button>
              </Link>
            </Router>
          </div>
        </header>
      </div>
    )
  }
}