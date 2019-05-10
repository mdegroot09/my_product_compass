import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Home extends Component {
  
  render() {
    return (
      <>
        <div className='homeMainDiv'>
          <div className='mainLogoDiv'>
            <div className='homeTitleDiv'>
              <div className='homeTitleSeg'>
                <h1 className='homeTitle'>My</h1>
              </div>
              <div className='homeTitleSeg'>
                <h1 className='homeTitle'>Product</h1>
              </div>
              <div className='homeTitleSeg'>
                <h1 className='homeTitle'>C</h1>
                <img className='homeTitle titleImg' src="https://i.ibb.co/vZvG7Yv/compass-logo-shadow.png" alt="My Product Compass logo"/>
                <h1 className='homeTitle'>mpass</h1>
              </div>
            </div>
            <h2 className='homeSubtitle'>Web dev organizing made easy.</h2>
            <Link to='/products'>
              <button className='getStarted'>get started</button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}