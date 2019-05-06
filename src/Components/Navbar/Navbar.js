import React, {Component} from 'react'
import {HashRouter as Router, Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {updateManagerId} from '../redux/reducer'

class Header extends Component {

  logout = () => {
    axios.get('/auth/logout').then(res => {
      alert('You have been logged out')
      this.props.updateManagerId('')
      document.location.reload()
    })
  }

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

              {/* Render logout if manager_id in Redux is truthy */}
              {this.props.manager_id ? 
                <button onClick={() => this.logout()} className='headerBtn'>logout</button> :
                <>
                  <Link to='/register'>
                    <button className='headerBtn'>Signup</button>
                  </Link>
                  <Link to='/login'>
                    <button className='headerBtn'>Login</button>
                  </Link>
                </>
              }
            </div>
          </Router>
        </header>
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {manager_id} = reduxState
  return {
    manager_id
  }
}

let mapDispatchToProps = {
  updateManagerId
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))