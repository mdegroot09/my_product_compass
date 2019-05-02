import React, {Component} from 'react'
import {HashRouter as Router, Link} from 'react-router-dom'

export default class Header extends Component {
  render() {
    return(
      <div>
        <header>
          <Router>
            <div className='headerLeft'>
              <Link className='headerLogoParent' to='/'>
                <img className='headerLogo' src="https://i.ibb.co/kcBcSnq/compass-logo-inverted.png" alt="My Product Compass logo"/>
              </Link>
              <Link to='/'>
                <button className='headerBtn'>Home</button>
              </Link>
              <Link to='/tasks/newtask'>
                <button className='headerBtn'>Create</button>
              </Link>
              <Link to='/tasks'>
                <button className='headerBtn'>Manage</button>
              </Link>
              <Link to='/about'>
                <button className='headerBtn'>About</button>
              </Link>
            </div>
            <div className='headerRight'>
              <Link to='/register'>
                <button className='headerBtn'>Signup</button>
              </Link>
              <Link to='/login'>
                <button className='headerBtn'>Login</button>
              </Link>
            </div>
          </Router>
        </header>
      </div>
    )
  }
}