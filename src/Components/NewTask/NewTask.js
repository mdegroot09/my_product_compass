import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateProducts} from '../redux/reducer'
import axios from 'axios'

class NewTask extends Component {
  constructor(props){
    super(props)
    this.state = {
      taskName: '',
      due_date: '',
      notes: '',
      dev_id: 0,
      component_id: 0,
      tickets: 0,
      newTaskError: false,
      newTaskErrorMessage: 'Something went wrong. Please try again.'
    }
  }

  componentWillMount(){
    // if not logged in, reroute to login screen
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } 
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      registerError: false
    })
  }

  handleLoginFormSubmit = (e) => {
		e.preventDefault()
    const {taskName, due_date, notes, dev_id, component_id, tickets} = this.state
    const {productid} = this.props
		try {
      axios.post('/api/tasks/new', {taskName, due_date, notes, dev_id, component_id, tickets, productid}).then(res => {
        console.log('NewProduct res.data:', res.data)
        this.props.updateProducts(res.data)
        this.props.history.push(`/tasks/${this.props.productid}`)
        alert(`New product '${taskName}' created under manager '${this.props.productname}'.`)
      })
		} catch (err) {
			this.setState({ username: '', password: '', newTaskError: true })
    }
	}

  render() {
    console.log('NewTask this.props:', this.props)
    return (
      <>
        <h3>{this.props.productname}</h3>
        <h4>New Task</h4>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} name='taskName' placeholder='task name' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='due_date' placeholder='due date' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='notes' placeholder='notes' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='dev_id' placeholder='dev id' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='component_id' placeholder='component id' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='tickets' placeholder='tickets' type="text"/>
          <button>create</button>
        </form>
        {this.state.newTaskError && <h3>{this.state.newTaskErrorMessage}</h3>}
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const {manager_id, username, productname, productid} = reduxState
  return {
    manager_id,
    username, 
    productname,
    productid
  }
}

const mapDispatchToProps = {
  updateProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewTask))