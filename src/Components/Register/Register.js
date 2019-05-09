import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateManagerId, updateUsername, updateManagerFirstName, updateManagerLastName, updateEmail, updateCompany} from '../redux/reducer'
import axios from 'axios'

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      first_name: '', 
      last_name: '', 
      email: '',
      company: '',
      password: '',
      registerError: false,
      registerErrorMessage: 'Registration failed. Please try again.'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      registerError: false
    })
  }

  handleLoginFormSubmit = async (e) => {
		e.preventDefault()
    const {username, first_name, last_name, email, company, password} = this.state
		try {
      const res = await axios.post('/auth/register', {first_name, last_name, email, company, username, password})
      this.props.updateManagerId(res.data.manager_id)
			this.props.updateUsername(username)
      this.props.updateManagerFirstName(res.data.first_name)
      this.props.updateManagerLastName(res.data.last_name)
      this.props.updateEmail(res.data.email)
      this.props.updateCompany(res.data.company)
      this.props.history.push('/products')
      alert('You are now registered as: ' + res.data.username)
		} catch (err) {
			this.setState({ username: '', password: '', registerError: true })
    }
    
	}

  render() {
    return (
      <>
        <div className='credentialsDiv'>
          <div className='credentials'>
            <div>
              <h1 className='credHeader'>Register</h1>
              <h4 className='credPrompt'>Please enter your new profile info:</h4>
            </div>
        <form className='credInputs' onSubmit={this.handleLoginFormSubmit}>
          <input className='input' onChange={(e) => this.handleChange(e)} name='first_name' placeholder='first name' type="text"/>
          <input className='input' onChange={(e) => this.handleChange(e)} name='last_name' placeholder='last name' type="text"/>
          <input className='input' onChange={(e) => this.handleChange(e)} name='email' placeholder='email' type="text"/>
          <input className='input' onChange={(e) => this.handleChange(e)} name='company' placeholder='company' type="text"/>
          <input className='input' onChange={(e) => this.handleChange(e)} name='username' placeholder='username' type="text"/>
          <input className='input' onChange={(e) => this.handleChange(e)} name='password' placeholder='password' type="password"/>
          <button className='getStarted credBtn'>register</button>
        </form>
          {this.state.registerError && <h3>{this.state.registerErrorMessage}</h3>}
        </div>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = {
  updateManagerId,
  updateUsername,
  updateManagerFirstName, 
  updateManagerLastName, 
  updateEmail,
  updateCompany
}

export default connect(null, mapDispatchToProps)(withRouter(Register))