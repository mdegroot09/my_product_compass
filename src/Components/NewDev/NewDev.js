import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateDevs} from '../redux/reducer'
import axios from 'axios'

class NewDev extends Component {
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      title: '',
      newDevError: false,
      newDevErrorMessage: 'Something went wrong. Please try again.'
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
    const {first_name, last_name, title} = this.state
		try {
      axios.post('/api/devs/new', {first_name, last_name, title}).then(res => {
        console.log('NewDev res.data:', res.data)
        this.props.updateDevs(res.data)
        this.props.history.push(`/devs`)
        alert(`New developer '${first_name} ${last_name}' created under manager '${this.props.username}'.`)
      })
		} catch (err) {
			this.setState({first_name: '', last_name: '', title: '', newDevError: true})
    }
	}

  render() {
    return (
      <>
        <h4>New Dev</h4>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} name='first_name' placeholder='first name' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='last_name' placeholder='last date' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='title' placeholder='title' type="text"/>
          <button>create</button>
        </form>
        {this.state.newDevError && <h3>{this.state.newDevErrorMessage}</h3>}
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const {manager_id, username} = reduxState
  return {
    manager_id,
    username
  }
}

const mapDispatchToProps = {
  updateDevs
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewDev))