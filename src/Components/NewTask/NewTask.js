import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateProducts, updateDevs} from '../redux/reducer'
import axios from 'axios'

class NewTask extends Component {
  constructor(props){
    super(props)
    this.state = {
      taskName: '',
      notes: '',
      dev_id: 0,
      component_id: 0,
      tickets: 0,
      components: [],
      newTaskError: false,
      newTaskErrorMessage: 'Something went wrong. Please try again.'
    }
  }

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    axios.get('/auth/checkForSession').then(res => {
      if(!res.data.user){
        this.props.history.push('/login')
      } else {
        axios.get('/api/devs').then(res => {
          this.props.updateDevs(res.data)
          let product_id = this.props.match.params.id
          axios.get(`/api/components/${product_id}`).then(response => {
            this.setState({components: response.data})
          }).catch(err => console.log('err:', err))
        }).catch(err => {
          console.log('err:', err)
        })
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      registerError: false
    })
  }

  handleLoginFormSubmit = (e) => {
		e.preventDefault()
    const {taskName, notes, dev_id, component_id, tickets} = this.state
    const {productid} = this.props
		try {
      axios.post('/api/tasks/new', {taskName, notes, dev_id, component_id, tickets, productid}).then(res => {
        console.log('NewProduct res.data:', res.data)
        this.props.updateProducts(res.data)
        this.props.history.push(`/tasks/${this.props.productid}`)
        alert(`New task '${taskName}' created under project '${this.props.productname}'.`)
      })
		} catch (err) {
			this.setState({taskname: '', due_date: '', notes: '', dev_id: 0, component_id: 0, tickets: 0, newTaskError: true})
    }
  }
  
  devSelect = (text, dev_id) => {
    let devIdChange = document.getElementById('devIdChange')
    devIdChange.innerText = text
    this.setState({dev_id})
  }
  
  componentSelect = (text, component_id) => {
    let componentIdChange = document.getElementById('componentIdChange')
    componentIdChange.innerText = text
    this.setState({component_id})
  }

  render() {
    let {devs} = this.props
    let {components} = this.state
    console.log('NewTask this.state:', this.state)
    let devButtons = devs.map((dev, i) => (
      <button key={i} className='dropdownBtn' onClick={() => this.devSelect(`${dev.devfirstname} ${dev.devlastname}`, dev.dev_id)}>{dev.devfirstname} {dev.devlastname}</button>
    ))
    let componentButtons = components.map((component, i) => (
      <button key={i} className='dropdownBtn' onClick={() => this.componentSelect(`${component.name}`, component.component_id)}>{component.name}</button>
    ))
    
    return (
      <>
        <h3>{this.props.productname}</h3>
        <h4>New Task</h4>
        <input onChange={(e) => this.handleChange(e)} name='taskName' placeholder='task name' type="text"/>
        <input onChange={(e) => this.handleChange(e)} name='notes' placeholder='notes' type="text"/>

        <div className="dropdown">
          <span id='devIdChange'>select developer</span>
          <div className="dropdown-content">
            {devButtons}
          </div>
        </div>

        <div className="dropdown">
          <span id='componentIdChange'>select component</span>
          <div className="dropdown-content">
            {componentButtons}
          </div>
        </div>

        <input onChange={(e) => this.handleChange(e)} name='tickets' placeholder='tickets' type="number"/>
        <button onClick={this.handleLoginFormSubmit}>create</button>
        <Link to={`/tasks/${this.props.productid}`}>
          <button>cancel</button>
        </Link>
        {this.state.newTaskError && <h3>{this.state.newTaskErrorMessage}</h3>}
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const {manager_id, username, productname, productid, devs} = reduxState
  return {
    manager_id,
    username, 
    productname,
    productid,
    devs
  }
}

const mapDispatchToProps = {
  updateProducts,
  updateDevs
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewTask))