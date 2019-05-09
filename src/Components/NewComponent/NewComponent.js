import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateProducts} from '../redux/reducer'
import axios from 'axios'

class NewComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      parent_component: null,
      newComponent: false,
      newComponentMessage: 'Something went wrong. Please try again.'
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
    const {name, parent_component} = this.state
    const product_id = this.props.match.params.id
    const {username} = this.props
		try {
      axios.post('/api/components/new', {name, parent_component, product_id}).then(res => {
        this.props.history.push(`/componenttree/${product_id}`)
        alert(`New component '${name}' created under manager '${username}'.`)
      })
		} catch (err) {
			this.setState({name: '', parent_component: '', newComponent: true})
    }
	}

  render() {
    let product_id = this.props.match.params.id
    return (
      <>
        <h3>New Component</h3>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} name='name' placeholder='component name' type="text"/>
          <input onChange={(e) => this.handleChange(e)} name='parent_component' placeholder='parent component id' type="text"/>
          <button>create</button>
          <Link to={`/componenttree/${product_id}`}>
            <button>cancel</button>
          </Link>
        </form>
        {this.state.newComponent && <h3>{this.state.newComponentMessage}</h3>}
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewComponent))