import React, {Component} from 'react'
import axios from 'axios'
import {updateTasks, updateProductId} from '../redux/reducer'
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'

class Tasks extends Component { 

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    axios.get('/auth/checkForSession').then(res => {
      if(!res.data.user){
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
    })
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
    axios.post(`/api/tasks/${product_id}`, {task_id}).then(res => {
      this.props.updateTasks(res.data)
    }).catch(err => {
      console.log('err:', err)
    })
  }

  render() {
    let {productname} = this.props
    // render a div for each task with its respective data
    let showTasks = this.props.tasks.map((task,i) => (
      // <div className='showTask' key={i}>
      <div className='taskSection' key={i}>
        <h1 className='taskTitle'>Task: {task.name}</h1>
        <Link to={`/devs/${task.dev_id}`}>
          <button className='hideMeBtn'><p className='devNameLink'>Dev: {task.first_name} {task.last_name}</p></button>
        </Link>
        <p className='tasksLoop'>Notes: '{task.notes}'</p>
        <p className='plusMinusBtns'>Requests/Tickets: 
          <button className='hideMeBtn plusMinusBtn minusBtn' onClick={() => this.decrement(task.task_id)}>-</button>
          {task.tickets}
          <button className='hideMeBtn plusMinusBtn' onClick={() => this.increment(task.task_id)}>+</button>
        </p>
        <Link to={`/tasks/update/${task.task_id}`}>
          <button className='getStarted editDelete' id='editBtn'>Edit</button>
        </Link>
        <button className='getStarted editDelete delete' onClick={() => this.deleteTask(task.task_id)}>Delete</button>
      </div>
    ))
    // sort the tasks shown by number of tickets
    let showTasksSorted = showTasks.sort((a,b) => a.tickets - b.tickets)
    let product_id = this.props.match.params.id
    return (
      <div className='productsMain'>
        <h1 className='allProducts'>'{productname}' Tasks</h1>
        <div className='newTaskTreeDiv'>
          <Link to={`/tasks/new/${product_id}`}>
            <button className='getStarted newProductBtn' id='newTask'>New Task</button>
          </Link>
          <Link to={`/componenttree/${product_id}`}>
            <button className='hideMeBtn'>
              <img className='treeIcon' id='treeIconTasks' src="https://i.ibb.co/F8Z4t3G/diagram-icon-inverted.png" alt="component tree icon"/>
            </button>
          </Link>
        </div>
        <div className='productsSubMain'>
          {showTasksSorted}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {tasks, manager_id, productid, productname} = reduxState
  return {
    tasks,
    manager_id,
    productid,
    productname
  }
}

let mapDispatchToProps = {
  updateTasks,
  updateProductId
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tasks))