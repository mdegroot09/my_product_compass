import React, {Component} from 'react'
import axios from 'axios'
import {updateProducts, updateProductName} from '../redux/reducer'
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'

class Products extends Component {

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      axios.get('/api/products').then(res => {
        this.props.updateProducts(res.data)
      }).catch(err => {
        console.log('err:', err)
      })
      this.render()
    }
  }

  updateRedux = (productname) => {
    this.props.updateProductName(productname)
  }

  render() {
    let currentProduct = ''
    let showProducts = this.props.products.map((product, i) => {
      if (currentProduct === product.product_id){
        return(
          <h3 key={i}>{product.taskname}</h3>
        )
      } else {
        currentProduct = product.product_id
        return (
          <div key={i}>
            <Link to={`/tasks/${product.product_id}`}>
              <button onClick={() => this.updateRedux(product.productname)}>{product.productname}</button>
            </Link>
            <h3>{product.taskname}</h3>
          </div>
        )
      }
    })
    return (
      <div>
        <Link to='/products/new'>
          <button>New Product</button>
        </Link>
        {showProducts}
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {products, manager_id} = reduxState
  return {
    products,
    manager_id
  }
}

let mapDispatchToProps = {
  updateProducts,
  updateProductName
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products))