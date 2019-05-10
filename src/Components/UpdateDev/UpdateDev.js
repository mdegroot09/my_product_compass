import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateDev} from '../redux/reducer'
import axios from 'axios'

class UpdateDev extends Component {
  constructor(props){
    super(props)
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
    let res = await axios.get('/auth/checkForSession')
    if(!res.data.user){
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
        this.props.updateDev(res.data)
        this.props.history.push('/devs')
      })
		} catch (err) {
			this.setState({first_name: '', last_name: '', title: '', updateDevError: true})
    }
  }

  render() {
    return (
      <div className='credentialsDiv'>
        <div className='credentials'>
          <h1 className='credHeader'>Update Dev</h1>
          <h4 className='credPrompt'>Please enter updated dev info:</h4>
          <form className='credInputs' onSubmit={this.handleLoginFormSubmit}>
            <input className='input' onChange={(e) => this.handleChange(e)} value={this.state.first_name} name='first_name' placeholder='first name' type="text"/>
            <input className='input' onChange={(e) => this.handleChange(e)} value={this.state.last_name} name='last_name' placeholder='last name' type="text"/>
            <input className='input' onChange={(e) => this.handleChange(e)} value={this.state.title} name='title' placeholder='title' type="text"/>
            <button className='getStarted credBtn' onClick={this.handleLoginFormSubmit}>update</button>
            <Link to='/devs'>
              <button className='getStarted credBtn cancelBtn'>cancel</button>
            </Link>
          </form>
          {this.state.updateDevError && <h3>{this.state.updateDevErrorMessage}</h3>}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateDev))