import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateTasks, updateDevs} from '../redux/reducer'
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
      components: [],
      updateTaskError: false,
      updateTaskErrorMessage: 'Something went wrong. Please try again.'
    }
  }

  componentWillMount = async () => {
    // if not logged in, reroute to login screen, otherwise render axios call
    let res = await axios.get('/auth/checkForSession')
    if(!res.data.user){
      this.props.history.push('/login')
    } else {
      let task_id = this.props.match.params.id
      axios.get(`/api/tasks/update/${task_id}`).then(res => {
        let {component_id, dev_id, notes, name, tickets} = res.data[0]
        this.setState({taskName: name, notes, dev_id, tickets, component_id})
        let {product_id} = this.props
        axios.get('/api/devs').then(res => {
          this.props.updateDevs(res.data)
          axios.get(`/api/components/${product_id}`).then(response => {
            this.setState({components: response.data})
          }).catch(err => console.log('err:', err))
        }).catch(err => {
          console.log('err:', err)
        })
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
    let {product_id} = this.props
		try {
      axios.put(`/api/tasks/update`, {task_id, name, notes, dev_id, component_id, tickets}).then(res => {
        this.props.updateTasks(res.data)
        this.props.history.push(`/tasks/${product_id}`)
      })
		} catch (err) {
      console.log('Something went wrong.')
			this.setState({taskName: '', notes: '', dev_id: 0, component_id: 0, tickets: 0, updateTaskError: true})
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
    let devIndex = devs.findIndex((dev, i) => this.state.dev_id === dev.dev_id)
    let componentIndex = components.findIndex((component, i) => this.state.component_id === component.component_id)
    let devButtons = devs.map((dev, i) => (
      <button key={i} className='dropdownBtn' onClick={() => this.devSelect(`${dev.devfirstname} ${dev.devlastname}`, dev.dev_id)}>{dev.devfirstname} {dev.devlastname}</button>
    ))
    let componentButtons = components.map((component, i) => (
      <button key={i} className='dropdownBtn' onClick={() => this.componentSelect(`${component.name}`, component.component_id)}>{component.name}</button>
    ))
    return (
      <div className='credentialsDiv'>
        <div className='credentials'>
          <h1 className='credHeader'>Update Task</h1>
          <h4 className='credPrompt'>Please enter updated task info:</h4>
          <input className='input' onChange={(e) => this.handleChange(e)} value={this.state.taskName} name='taskName' placeholder='task name' type="text"/>
          <input className='input' onChange={(e) => this.handleChange(e)} value={this.state.notes} name='notes' placeholder='notes' type="text"/>
          <div className="dropdown">
            {devIndex !== -1 ?
              <span id='devIdChange'>{devs[devIndex].devfirstname} {devs[devIndex].devlastname}</span>
              : <span id='devIdChange'>select dev<img className='dropdownArrow' src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="dropdown arrow"/></span>}
            <div className="dropdown-content">
              {devButtons}
            </div>
          </div>
          <div className="dropdown">
            {componentIndex !== -1 ?
              <span id='componentIdChange'>{components[componentIndex].name}</span>
              : <span id='componentIdChange'>select component<img className='dropdownArrow' src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="dropdown arrow"/></span>}
            <div className="dropdown-content">
              {componentButtons}
            </div>
          </div>
          <input className='input' onChange={(e) => this.handleChange(e)} value={this.state.tickets} name='tickets' placeholder='tickets' type="number"/>
          <button className='getStarted credBtn' onClick={this.handleLoginFormSubmit}>update</button>
          <Link to='/tasks'>
            <button className='getStarted credBtn cancelBtn updateTaskCancel' onClick={this.handleLoginFormSubmit}>cancel</button>
          </Link>
          {this.state.updateTaskError && <h3>{this.state.updateTaskErrorMessage}</h3>}
        </div>
      </div>
    )
    
  }
}

const mapStateToProps = (reduxState) => {
  const {manager_id, username, dev, tasks, devs} = reduxState
  const product_id = reduxState.productid
  return {
    manager_id,
    username,
    dev,
    product_id,
    tasks,
    devs
  }
}

const mapDispatchToProps = {
  updateTasks,
  updateDevs
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateTask))