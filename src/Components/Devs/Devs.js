import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateDevs} from '../redux/reducer'
import {Link, withRouter} from 'react-router-dom'

class Devs extends Component {

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    axios.get('/auth/checkForSession').then(res => {
      if(!res.data.user){
        this.props.history.push('/login')
      } else {
        axios.get('/api/devs').then(res => {
          this.props.updateDevs(res.data)
        }).catch(err => {
          console.log('err:', err)
        })
      }
    })
  }

  deleteDev = (id) => {
    axios.delete(`/api/devs/${id}`).then(res => {
      this.props.updateDevs(res.data)
    }).catch(err => {
      console.log('err:', err)
    })
  }
  
  render() {
    let showDevs = this.props.devs.map((dev, i) => (
      <div key={i}>
        <div className='productsDetails' key={i}>
          <Link to={`/devs/${dev.dev_id}`}>
            <button className='productNameBtn'>{dev.devfirstname} {dev.devlastname}</button>
          </Link>
          <div className='productsBtns'>
            <Link to={`/devs/update/${dev.dev_id}`}>
              <button className='getStarted editDelete'>Edit</button>
            </Link>
            <button className='getStarted editDelete delete' onClick={() => this.deleteDev(dev.dev_id)}>Delete</button>
          </div>
        </div>
        <div>
          <h3 className='task'>Title: {dev.title}</h3>
          <h3 className='task'>Company: {dev.company}</h3>
          <h3 className='task'>Manager: {dev.mgrfirstname} {dev.mgrlastname}</h3>
        </div>
      </div>
    ))
    return (
      <div className='productsMain'>
        <h1 className='allProducts'>All Devs</h1>
          <Link to='/devs/new'>
            <button className='getStarted newProductBtn'>New Dev</button>
          </Link>
          <div className='productsSubMain'>
            {showDevs}
          </div>
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {devs, manager_id} = reduxState
  return {
    devs,
    manager_id
  }
}

let mapDispatchToProps = {
  updateDevs
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Devs))