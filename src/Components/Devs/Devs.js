import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateDevs} from '../redux/reducer'
import {withRouter} from 'react-router-dom'

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
      this.render()
    }
  }
  
  render() {
    console.log('Devs this.props:', this.props)
    
    return (
      <div>
        Devs
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