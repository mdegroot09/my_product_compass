import React, {Component} from 'react'
import axios from 'axios'
import {updateTasks, updateProductId} from '../redux/reducer'
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'

class Tasks extends Component { 
  constructor(props){
    super(props)
    this.state = {
      productName: ''
    }
  }

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      let product_id = this.props.match.params.id
      axios.get(`/api/tasks/${product_id}`).then(res => {
        this.props.updateTasks(res.data)
        this.props.updateProductId(product_id)
      }).catch(err => {
        console.log('err:', err)
      })
      this.render()
    }
  }

  decrement(task_id){
    let product_id = this.props.match.params.id
    axios.post(`/api/tasks/decrement`, {task_id, product_id}).then(
      this.componentWillMount()
    )
  }

  increment(task_id){
    axios.post(`/api/tasks/increment`, {task_id}).then(
      this.componentWillMount()
    )
  }

  deleteTask = (task_id) => {
    let product_id = this.props.match.params.id
    console.log('task_id:', task_id)
    axios.post(`/api/tasks/${product_id}`, {task_id}).then(res => {
      this.props.updateTasks(res.data)
      alert('You jerk.')
    }).catch(err => {
      console.log('err:', err)
    })
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
          <button onClick={() => this.deleteTask(task.task_id)}>Delete</button>
      </div>
    ))

    // sort the tasks shown by number of tickets
    let showTasksSorted = showTasks.sort((a,b) => a.tickets - b.tickets)
    return (
      <div>
        <Link to='/tasks/new'>
          <button>New Task</button>
        </Link>
        {showTasksSorted}
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {tasks, manager_id, productid} = reduxState
  return {
    tasks,
    manager_id,
    productid
  }
}

let mapDispatchToProps = {
  updateTasks,
  updateProductId
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tasks))