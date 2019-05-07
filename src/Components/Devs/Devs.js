import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateDevs} from '../redux/reducer'
import {Link, withRouter} from 'react-router-dom'

class Devs extends Component {

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      axios.get('/api/devs').then(res => {
        this.props.updateDevs(res.data)
      }).catch(err => {
        console.log('err:', err)
      })
      // this.render()
    }
  }
  
  render() {
    let showDevs = this.props.devs.map((dev, i) => (
      <div className='showDev' key={i}>
        <Link to={`/devs/${dev.dev_id}`}>
          <button className='showDevDetail'>Developer: {dev.devfirstname} {dev.devlastname}</button>
        </Link>
        <p className='showDevDetail'>Title: {dev.title}</p>
        <p className='showDevDetail'>Company: {dev.company}</p>
        <p className='showDevDetail'>Manager: {dev.mgrfirstname} {dev.mgrlastname}</p>
        <p className='showDevDetail'>Product Name: {dev.productname}</p>
      </div>
    ))
    return (
      <div>
        <Link to='/devs/new'>
          <button>New Developer</button>
        </Link>
        {showDevs}
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {devs, manager_id} = reduxState
  return {
    devs,
    manager_id
  }
}

let mapDispatchToProps = {
  updateDevs
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Devs))