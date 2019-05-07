import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateProducts} from '../redux/reducer'
import axios from 'axios'

class NewProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      productName: '',
      newProductError: false,
      newProductErrorMessage: 'Something went wrong. Please try again.'
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
    const {productName} = this.state
    const {username} = this.props
		try {
      axios.post('/api/products/new', {productName}).then(res => {
        console.log('NewProduct res.data:', res.data)
        this.props.updateProducts(res.data)
        this.props.history.push('/products')
        alert(`New product '${productName}' created under manager '${username}'.`)
      })
		} catch (err) {
			this.setState({ username: '', password: '', newProductError: true })
    }
	}

  render() {
    return (
      <>
        <h3>New Product</h3>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input onChange={(e) => this.handleChange(e)} name='productName' placeholder='product name' type="text"/>
          <button>create</button>
        </form>
        {this.state.newProductError && <h3>{this.state.newProductErrorMessage}</h3>}
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
  updateProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProduct))