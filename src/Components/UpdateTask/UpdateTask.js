import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateDev} from '../redux/reducer'
import axios from 'axios'

class UpdateTask extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      first_name: '',
      last_name: '',
      title: '',
      updateDevError: false,
      updateDevErrorMessage: 'Something went wrong. Please try again.'
    }
  }

  componentWillMount = async () => {
    // if not logged in, reroute to login screen
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      try {
        let dev_id = this.props.match.params.id
        let res = await axios.get(`/api/devs/${dev_id}`)
        await this.props.updateDev(res.data)
        let {first_name, last_name, title} = this.props.dev[0]
        this.setState({first_name, last_name, title})
      } catch {
        console.log('Something went wrong.')
      }
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
    const {first_name, last_name, title} = this.state
    let dev_id = this.props.match.params.id
		try {
      axios.put('/api/devs/update', {first_name, last_name, title, dev_id}).then(res => {
        console.log('it worked')
        this.props.updateDev(res.data)
        this.props.history.push('/devs')
        alert(`Developer '${first_name} ${last_name}' updated under manager '${this.props.username}'.`)
      })
		} catch (err) {
      console.log('it didnt work')
			this.setState({first_name: '', last_name: '', title: '', updateDevError: true})
    }
  }

  render() {
    console.log('UpdateDev this.state:', this.state)
    return (
      <>
        <h4>Update Task</h4>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} value={this.state.first_name} name='first_name' placeholder='first name' type="text"/>
          <input onChange={(e) => this.handleChange(e)} value={this.state.last_name} name='last_name' placeholder='last name' type="text"/>
          <input onChange={(e) => this.handleChange(e)} value={this.state.title} name='title' placeholder='title' type="text"/>
          <button onClick={this.handleLoginFormSubmit}>update</button>
          <Link to='/devs'>
            <button>cancel</button>
          </Link>
        </form>
        {this.state.updateDevError && <h3>{this.state.updateDevErrorMessage}</h3>}
      </>
    )
    
  }
}

const mapStateToProps = (reduxState) => {
  const {manager_id, username, dev} = reduxState
  return {
    manager_id,
    username,
    dev
  }
}

const mapDispatchToProps = {
  updateDev
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateTask))