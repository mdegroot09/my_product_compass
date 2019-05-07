import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateDev, updateDevs} from '../redux/reducer'
import {withRouter} from 'react-router-dom'

class Dev extends Component {
  constructor(props){
    super(props)
    this.state = {
      render: false
    }
  }

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      let dev_id = this.props.match.params.id
      axios.get(`/api/devs/${dev_id}`).then(res => {
        this.props.updateDev(res.data)
      }).catch(err => {
        console.log('err:', err)
      })
    }
  }

  deleteDev = (dev_id) => {
    axios.delete(`/api/devs/${dev_id}`).then(res => {
      this.props.updateDevs(res.data)
      alert('You jerk.')
      this.props.history.push('/devs')
    }).catch(err => {
      console.log('err:', err)
    })
  }
  
  render() {
    console.log('Dev this.props', this.props)
    let currentProduct = ''
    let devTasks = this.props.dev.map((task, i) => {
      if (currentProduct === task.product_id){
        return (
          <div key={i}>
            <p>Task: {task.name ? task.name : 'None'}</p>
            <p>Notes: {task.notes ? task.notes : 'None'}</p>
            <p>Due Date: {task.due_date ? task.due_date : 'None'}</p>
          </div>
        )
      } else {
        currentProduct = task.product_id
        return (
          <div key={i}>
            <h3>{task.productname}</h3>
            <p>Task: {task.name ? task.name : 'None'}</p>
            <p>Notes: {task.notes ? task.notes : 'None'}</p>
            <p>Due Date: {task.due_date ? task.due_date : 'None'}</p>
          </div>
        )
      }
    })
    let dev = this.props.dev[0]
    let dev_id = this.props.match.params.id
    return (
      <>
        <p>Dev</p>
        <div className='devTasks'>
          <p>Developer: {dev.first_name} {dev.last_name}</p>
          <p>Title: {dev.title}</p>
          {devTasks}
          <button onClick={() => this.deleteDev(dev_id)}>Delete</button>
        </div>
      </>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {dev, manager_id} = reduxState
  return {
    dev,
    manager_id
  }
}

let mapDispatchToProps = {
  updateDev,
  updateDevs
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dev))