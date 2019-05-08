import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateProducts} from '../redux/reducer'
import axios from 'axios'

class UpdateProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      product_id: '',
      name: '',
      updateProduct: false,
      updateProductMessage: 'Something went wrong. Please try again.'
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
      updateProduct: false
    })
  }

  handleLoginFormSubmit = (e) => {
		e.preventDefault()
    const {name, product_id} = this.state
		try {
      axios.put(`/api/products/update`, {product_id, name}).then(res => {
        this.props.updateProducts(res.data)
        console.log('it worked')
        this.props.history.push(`/products`)
        alert(`Product '${name}' updated under manager '${this.props.username}'.`)
      })
		} catch (err) {
      console.log('it didnt work')
			this.setState({name: '', updateProduct: true})
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
        {this.state.updateProduct && <h3>{this.state.updateProductMessage}</h3>}
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
  updateProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateProduct))