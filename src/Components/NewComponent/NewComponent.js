import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'

class newComponentError extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      parent_component: null,
      components: [],
      newComponentError: false,
      newComponentErrorMessage: 'Something went wrong. Please try again.'
    }
  }

  componentWillMount(){
    // if not logged in, reroute to login screen
    axios.get('/auth/checkForSession').then(res => {
      if(!res.data.user){
        this.props.history.push('/login')
      } else {
        const product_id = this.props.match.params.id
        axios.get(`/api/components/${product_id}`).then(response => {
          this.setState({components: response.data})
        }).catch(err => console.log('err:', err))
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
    const {name, parent_component} = this.state
    const product_id = this.props.match.params.id
    const {username} = this.props
		try {
      axios.post('/api/components/new', {name, parent_component, product_id}).then(res => {
        this.props.history.push(`/componenttree/${product_id}`)
      })
		} catch (err) {
			this.setState({name: '', parent_component: '', newComponentError: true})
    }
  }
  
  componentSelect = (text, newParentId) => {
    let componentIdChange = document.getElementById('componentIdChange')
    componentIdChange.innerText = text
    this.setState({parent_component: newParentId})
  }

  render() {
    let {components} = this.state
    let componentButtons = components.map((component, i) => (
      <button key={i} className='dropdownBtn' onClick={() => this.componentSelect(`${component.name}`, component.component_id)}>{component.name}</button>
    ))
    let product_id = this.props.match.params.id
    return (
      <div className='credentialsDiv'>
        <div className='credentials'>
          <h1 className='credHeader'>New Component</h1>
          <h4 className='credPrompt'>Please enter details for a new component:</h4>
          <input className='input' onChange={(e) => this.handleChange(e)} name='name' placeholder='component name' type="text"/>
          <div className="dropdown">
            <span id='componentIdChange'>parent component <img className='dropdownArrow' src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="dropdown arrow"/></span>
            <div className="dropdown-content">
              {componentButtons}
            </div>
          </div>
          <button className='getStarted credBtn' onClick={this.handleLoginFormSubmit}>create</button>
          <Link to={`/componenttree/${product_id}`}>
            <button className='getStarted credBtn cancelBtn'>cancel</button>
          </Link>
          {this.state.newComponentError && <h3>{this.state.newComponentErrorMessage}</h3>}
        </div>
      </div>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(newComponentError))