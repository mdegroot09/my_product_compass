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

  showMenu(){
    let hiddenMenus = document.getElementsByClassName('hiddenMenu')
    let hiddenMenu = hiddenMenus[0]
    if (hiddenMenu.classList.contains('expand')){
      hiddenMenu.classList.remove('expand')
    } else {
      hiddenMenu.classList.add('expand')
    }
  }

  render() {
    return(
      <div>
        <header>
          <Router>
            <div className='header'>
              <div className='headerLeft'>
                <Link className='headerLogoParent' to='/'>
                  <img className='headerLogo' src="https://i.ibb.co/kcBcSnq/compass-logo-inverted.png" alt="My Product Compass logo"/>
                </Link>
                <Link to='/'>
                  <button className='headerBtn hideOnSmall'>Home</button>
                </Link>
                <Link to='/products'>
                  <button className='headerBtn'>Products</button>
                </Link>
                <Link to='/devs'>
                  <button className='headerBtn'>Devs</button>
                </Link>
                <Link to='/about'>
                  <button className='headerBtn hideOnSmall'>About</button>
                </Link>
              </div>
              <div className='headerRight'>

                {/* Render logout if manager_id in Redux is truthy */}
                {this.props.manager_id ? 
                  <button onClick={() => this.logout()} className='headerBtn'>logout</button> :
                  <>
                    <Link to='/register'>
                      <button className='headerBtn hideOnSmall'>Signup</button>
                    </Link>
                    <Link to='/login'>
                      <button className='headerBtn'>Login</button>
                    </Link>
                  </>
                }
              </div>
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