import React, {Component} from 'react'
import axios from 'axios'
import {updateTasks} from '../redux/reducer'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class Tasks extends Component {

  componentWillMount(){
    axios.get('/api/tasks').then(res => {
      this.props.updateTasks(res.data)
    }).catch(err => {
      console.log('err:', err)
    })
  }

  decrement(e){
    console.log('event:', e)
    // axios.post('/api/tasks')
  }

  render() {
    console.log('Tasks.js this.props:', this.props)
    let showTasks = this.props.tasks.map((task,i) => (
      <div className='showTask' key={i}>
          <p>Task: {task.name}</p>
          <p>Notes: {task.notes}</p>
          <p>Developer: {task.first_name} {task.last_name}</p>
          <p>Due Date: {task.due_date}</p>
          <p>Requests/Tickets: 
            <button onClick={(e) => this.decrement(e)}>+</button>
            {task.tickets}
            <button onClick={this.increment}>-</button>
          </p>
      </div>
    ))
    return (
      <div>
        Tasks
        {showTasks}
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {tasks} = reduxState
  return {
    tasks
  }
}

let mapDispatchToProps = {
  updateTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tasks))