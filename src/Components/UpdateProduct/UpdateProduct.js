import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateTasks} from '../redux/reducer'
import axios from 'axios'

class UpdateProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      product_id: '',
      name: '',
      updateTaskError: false,
      updateTaskErrorMessage: 'Something went wrong. Please try again.'
    }
  }

  componentWillMount = async () => {
    // if not logged in, reroute to login screen, otherwise render axios call
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      let product_id = this.props.match.params.id
      console.log('UpdateProduct product_id:', product_id)
      axios.get(`/api/products/${product_id}`).then(res => {
        let {product_id, name} = res.data[0]
        this.setState({product_id, name})
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
        console.log('it worked')
        this.props.history.push(`/tasks/${product_id}`)
        alert(`Task '${name}' updated under manager '${this.props.username}'.`)
      })
		} catch (err) {
      console.log('it didnt work')
			this.setState({first_name: '', last_name: '', title: '', updateTaskError: true})
    }
  }

  render() {
    console.log('UpdateProduct this.state:', this.state)
    console.log('UpdateProduct this.props:', this.props)
    return (
      <>
        <h4>Update Product</h4>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} value={this.state.name} name='name' placeholder='product name' type="text"/>
          <button onClick={this.handleLoginFormSubmit}>update</button>
          <Link to='/products'>
            <button>cancel</button>
          </Link>
        </form>
        {this.state.updateTaskError && <h3>{this.state.updateTaskErrorMessage}</h3>}
      </>
    )
    
  }
}

const mapStateToProps = (reduxState) => {
  const {manager_id, username, dev, tasks} = reduxState
  const product_id = reduxState.productid
  return {
    manager_id,
    username,
    dev,
    product_id,
    tasks
  }
}

const mapDispatchToProps = {
  updateTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateProduct))