import React, {Component} from 'react'

export default class Home extends Component {
  

  render() {
    console.log('HOME this.props:', this.props)
    return (
      <div className='homeMainDiv'>
        <div className='mainLogoDiv'>
          <div className='homeTitleDiv'>
            <div className='homeTitleSeg'>
              <h1 className='homeTitle'>M</h1>
              <h1 className='homeTitle'>y</h1>
            </div>
            <div className='homeTitleSeg'>
              <h1 className='homeTitle'>P</h1>
              <h1 className='homeTitle'>r</h1>
              <h1 className='homeTitle'>o</h1>
              <h1 className='homeTitle'>d</h1>
              <h1 className='homeTitle'>u</h1>
              <h1 className='homeTitle'>c</h1>
              <h1 className='homeTitle'>t</h1>
            </div>
            <div className='homeTitleSeg'>
              <h1 className='homeTitle'>C</h1>
              <img className='homeTitle titleImg' src="https://i.ibb.co/vZvG7Yv/compass-logo-shadow.png" alt="My Product Compass logo"/>
              <h1 className='homeTitle'>m</h1>
              <h1 className='homeTitle'>p</h1>
              <h1 className='homeTitle'>a</h1>
              <h1 className='homeTitle'>s</h1>
              <h1 className='homeTitle'>s</h1>
            </div>
          </div>
          <button className='getStarted'>get started</button>
        </div>
      </div>
    )
  }
}