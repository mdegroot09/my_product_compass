import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateManagerId, updateUsername} from '../redux/reducer'
import axios from 'axios'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
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
      const res = await axios.post('/auth/login', {username, password})
			this.props.updateManagerId(res.data.id)
			this.props.updateUsername(username)
      this.props.history.push('/products')
		} catch (err) {
			this.setState({ username: '', password: '', loginError: true })
    }
    
	}

  render() {
    return (
      <>
        <div className='credentialsDiv'>
          <div className='credentials'>
            <div>
              <h1 className='credHeader'>login</h1>
              <h4 className='credPrompt'>Please enter your credentials:</h4>
            </div>
            <form className='credInputs' onSubmit={this.handleLoginFormSubmit}>
              <input className='input' onChange={(e) => this.handleChange(e)} name='username' placeholder='username' type="text"/>
              <input className='input' onChange={(e) => this.handleChange(e)} name='password' placeholder='password' type="password" autoComplete='cc-number'/>
              <button className='getStarted credBtn'>log in</button>
            </form>
            <p className='errorMsg'>{this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}</p>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const {username, manager_id} = reduxState
  return {
    username, 
    manager_id
  }
}

const mapDispatchToProps = {
  updateManagerId,
  updateUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))