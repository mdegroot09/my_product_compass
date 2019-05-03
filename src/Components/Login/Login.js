import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {updateManagerId, updateUsername } from '../redux/reducer'
import axios from 'axios'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: '',
      username: '',
      loginError: false,
      loginErrorMessage: 'Username or password is incorrect. Please try again.'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loginError: false
    })
  }

  handleLoginFormSubmit = async (e) => {
		e.preventDefault()
    const { username, password } = this.state
		try {
      const res = await axios.post('/auth/login', { username, password })
			this.props.updateUsername(username)
			this.props.updateManagerId(res.data.manager_id)
      this.props.history.push('/')
		} catch (err) {
			this.setState({ username: '', password: '', loginError: true })
    }
    
	}

  render() {
    console.log('this.props:', this.props)
    return (
      <>
        <h3>Login</h3>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} name='username' placeholder='username' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='password' placeholder='password' type="password"/>
          <button>log in</button>
        </form>
        {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
      </>
    )
  }
}

const mapDispatchToProps = {
  updateManagerId,
  updateUsername
}

export default connect(null, mapDispatchToProps)(withRouter(Login))