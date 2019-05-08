import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateTasks} from '../redux/reducer'
import axios from 'axios'

class UpdateTask extends Component {
  constructor(props){
    super(props)
    this.state = {
      taskName: '',
      notes: '',
      dev_id: 0,
      component_id: 0,
      tickets: 0,
      updateTaskError: false,
      updateTaskErrorMessage: 'Something went wrong. Please try again.'
    }
  }

  componentWillMount = async () => {
    // if not logged in, reroute to login screen, otherwise render axios call
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      let task_id = this.props.match.params.id
      axios.get(`/api/tasks/update/${task_id}`).then(res => {
        let {component_id, dev_id, notes, name, tickets} = res.data[0]
        this.setState({taskName: name, notes, dev_id, tickets, component_id})
      }).catch(err => {
        console.log('err:', err)
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      updateTaskError: false
    })
  }

  handleLoginFormSubmit = (e) => {
		e.preventDefault()
    const {notes, dev_id, tickets, component_id} = this.state
    const name = this.state.taskName
    let task_id = this.props.match.params.id
		try {
      axios.put(`/api/tasks/update`, {task_id, name, notes, dev_id, component_id, tickets}).then(res => {
        this.props.updateTasks(res.data)
        console.log('it worked')
        this.props.history.push('/tasks')
        alert(`Task '${name}' updated under manager '${this.props.username}'.`)
      })
		} catch (err) {
      console.log('it didnt work')
			this.setState({first_name: '', last_name: '', title: '', updateTaskError: true})
    }
  }

  render() {
    console.log('UpdateTask this.state:', this.state)
    console.log('UpdateTask this.props:', this.props)
    return (
      <>
        <h4>Update Task</h4>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} value={this.state.taskName} name='taskName' placeholder='task name' type="text"/>
          <input onChange={(e) => this.handleChange(e)} value={this.state.notes} name='notes' placeholder='notes' type="text"/>
          <input onChange={(e) => this.handleChange(e)} value={this.state.dev_id ? this.state.dev_id : ''} name='dev_id' placeholder='dev id' type="text"/>
          <input onChange={(e) => this.handleChange(e)} value={this.state.component_id ? this.state.component_id : ''} name='component_id' placeholder='component id' type="text"/>
          <input onChange={(e) => this.handleChange(e)} value={this.state.tickets} name='tickets' placeholder='tickets' type="text"/>
          <button onClick={this.handleLoginFormSubmit}>update</button>
          <Link to='/tasks'>
            <button>cancel</button>
          </Link>
        </form>
        {this.state.updateTaskError && <h3>{this.state.updateTaskErrorMessage}</h3>}
      </>
    )
    
  }
}

const mapStateToProps = (reduxState) => {
  const {manager_id, username, dev, tasks} = reduxState
  const product_id = reduxState.productid
  return {
    manager_id,
    username,
    dev,
    product_id,
    tasks
  }
}

const mapDispatchToProps = {
  updateTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateTask))