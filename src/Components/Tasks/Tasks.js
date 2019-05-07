import React, {Component} from 'react'
import axios from 'axios'
import {updateTasks} from '../redux/reducer'
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'

class Tasks extends Component {

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      let dev_id = this.props.match.params.id
      axios.get(`/api/tasks/${dev_id}`).then(res => {
        this.props.updateTasks(res.data)
      }).catch(err => {
        console.log('err:', err)
      })
      this.render()
    }
  }

  decrement(task_id){
    axios.post(`/api/tasks/decrement`, {task_id}).then(
      this.componentWillMount()
    )
  }

  increment(task_id){
    axios.post(`/api/tasks/increment`, {task_id}).then(
      this.componentWillMount()
    )
  }

  render() {
    // render a div for each task with its respective data
    let showTasks = this.props.tasks.map((task,i) => (
      <div className='showTask' key={i}>
          <p>Task: {task.name}</p>
          <p>Notes: {task.notes}</p>
          <Link to={`/devs/${task.dev_id}`}>
            <button>Developer: {task.first_name} {task.last_name}</button>
          </Link>
          <p>Due Date: {task.due_date}</p>
          <p>Requests/Tickets: 
            <button onClick={() => this.decrement(task.task_id)}>-</button>
            {task.tickets}
            <button onClick={() => this.increment(task.task_id)}>+</button>
          </p>
      </div>
    ))

    // sort the tasks shown by number of tickets
    let showTasksSorted = showTasks.sort((a,b) => a.tickets - b.tickets)
    return (
      <div>
        Tasks
        {showTasksSorted}
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {tasks, manager_id} = reduxState
  return {
    tasks,
    manager_id
  }
}

let mapDispatchToProps = {
  updateTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tasks))