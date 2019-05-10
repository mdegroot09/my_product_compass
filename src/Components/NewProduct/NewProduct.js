import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
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
    axios.get('/auth/checkForSession').then(res => {
      if(!res.data.user){
        this.props.history.push('/login')
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
			this.setState({productName: '', newProductError: true})
    }
	}

  render() {
    return (
      <div className='credentialsDiv'>
        <div className='credentials'>
          <h1 className='credHeader'>New Product</h1>
          <h4 className='credPrompt'>Please enter a new product name:</h4>
          <form className='credInputs' onSubmit={this.handleLoginFormSubmit}>
            <input className='input' onChange={(e) => this.handleChange(e)} name='productName' placeholder='product name' type="text"/>
            <button className='getStarted credBtn'>create</button>
            <Link to='/products'>
              <button className='getStarted credBtn cancelBtn'>cancel</button>
            </Link>
          </form>
          {this.state.newProductError && <h3>{this.state.newProductErrorMessage}</h3>}
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

const mapDispatchToProps = {
  updateProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProduct))