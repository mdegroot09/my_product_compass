import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateDev} from '../redux/reducer'
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
  
  render() {
    console.log('Dev this.props', this.props)
    let devTasks = this.props.dev.map((task, i) => (
        // Handle devs with no tasks assigned to them
        <div key={i}>
          <p>Task: {task.name ? task.name : 'None'}</p>
          <p>Notes: {task.notes ? task.notes : 'None'}</p>
          <p>Due Date: {task.due_date ? task.due_date : 'None'}</p>
        </div>
      ))
    let dev = this.props.dev[0]
    return (
      <>
        <p>Dev</p>
        <div className='devTasks'>
          <p>Developer: {dev.devfirstname} {dev.devlastname}</p>
          <p>Title: {dev.title}</p>
          {devTasks}
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
  updateDev
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dev))