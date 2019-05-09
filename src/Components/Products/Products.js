import React, {Component} from 'react'
import axios from 'axios'
import {updateProducts, updateProductName} from '../redux/reducer'
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'

class Products extends Component {

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    axios.get('/auth/checkForSession').then(res => {
      if(!res.data.user){
        this.props.history.push('/login')
      } else {
        axios.get('/api/products').then(res => {
          this.props.updateProducts(res.data)
        }).catch(err => {
          console.log('err:', err)
        })
        this.render()
      }
    })
  }

  updateRedux = (productname) => {
    this.props.updateProductName(productname)
  }

  deleteProduct = (product_id) => {
    axios.delete(`/api/products/${product_id}`).then(res => {
      this.props.updateProducts(res.data)
      alert('You jerk.')
    }).catch(err => {
      console.log('err:', err)
    })
  }

  render() {
    let currentProduct = ''
    let showProducts = this.props.products.map((product, i) => {
      if (currentProduct === product.product_id){
        return(
          <h3 className='task' key={i}><span>{product.taskname}</span></h3>
        )
      } else {

        currentProduct = product.product_id
        return (
          <div key={i}>
            <div className='productsDetails' >
              <Link to={`/tasks/${product.product_id}`}>
                <button className='productNameBtn' onClick={() => this.updateRedux(product.productname)}>{product.productname}</button>
              </Link>
              <div className='productsBtns'>
                <Link to={`/componenttree/${product.product_id}`}>
                  <button className='hideMeBtn'>
                    <img className='treeIcon' src="https://i.ibb.co/HGKmDzK/diagram-icon.png" alt="component tree icon"/>
                  </button>
                </Link>
                <Link to={`/products/update/${product.product_id}`}>
                  <button className='getStarted editDelete'>Edit</button>
                </Link>
                <button className='getStarted editDelete delete' onClick={() => this.deleteProduct(product.product_id)}>Delete</button>
              </div>
            </div>
            <h3 className='task'><span>{product.taskname}</span></h3>
          </div>
        )
      }
    })
    return (
      <div className='productsMain'>
        <h1 className='allProducts'>All Products</h1>
        <Link to='/products/new'>
          <button className='getStarted newProductBtn'>new product</button>
        </Link>
        <div className='productsSubMain'>
          {showProducts}
        </div>
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