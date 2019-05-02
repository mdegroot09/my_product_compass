import React, {Component} from 'react'

export default class Home extends Component {
  render() {
    return (
      <div className='homeMainDiv'>
        <div className='mainLogoDiv'>
          {/* <img className='mainLogo' src="https://i.ibb.co/MsMrNvp/Header1.png" alt=""/> */}
          <h1>My Product Compass</h1>
          <button className='getStarted'>get started</button>
        </div>
      </div>
    )
  }
}