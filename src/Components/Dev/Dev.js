import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateDev, updateDevs} from '../redux/reducer'
import {withRouter, Link} from 'react-router-dom'

class Dev extends Component {
  constructor(props){
    super(props)
    this.state = {
      render: false
    }
  }

  componentWillMount(){
    // if not logged in, reroute to login screen, otherwise render axios call
    axios.get('/auth/checkForSession').then(res => {
      if(!res.data.user){
        this.props.history.push('/login')
      } else {
        let dev_id = this.props.match.params.id
        axios.get(`/api/devs/${dev_id}`).then(res => {
          this.props.updateDev(res.data)
        }).catch(err => {
          console.log('err:', err)
        })
      }
    })
  }

  deleteDev = (dev_id) => {
    axios.delete(`/api/devs/${dev_id}`).then(res => {
      this.props.updateDevs(res.data)
      alert('You jerk.')
      this.props.history.push('/devs')
    }).catch(err => {
      console.log('err:', err)
    })
  }
  
  render() {
    console.log('Dev this.props', this.props)
    let currentProduct = ''
    let devTasks = this.props.dev.map((task, i) => {
      if (currentProduct === task.product_id){
        return (
          <div key={i}>
            <h3 className='task' id='taskTabRight'>Task: {task.name ? task.name : 'None'}</h3>
            <h3 className='task' id='taskTabRight'>Notes: {task.notes ? task.notes : 'None'}</h3>
            <h3 className='task' id='taskTabRight'>Due Date: {task.due_date ? task.due_date : 'None'}</h3>
          </div>
        )
      } else {
        currentProduct = task.product_id
        return (
          <div className='tasksListDiv' key={i}>
            <h2 className='productName' id='tabRight'>{task.productname}</h2>
            <h3 className='task' id='taskTabRight'>Task: {task.name ? task.name : 'None'}</h3>
            <h3 className='task' id='taskTabRight'>Notes: {task.notes ? task.notes : 'None'}</h3>
          </div>
        )
      }
    })
    let dev = this.props.dev[0]
    let dev_id = this.props.match.params.id
    return (
      <div className='productsMain'>
        <h1 className='allProducts'>{dev.first_name}'s Tasks</h1>
        <div className='productsSubMain'>
          <div className='productsDetails'>

            <h1 className='task'>{dev.first_name} {dev.last_name}</h1>
            <div className='productsBtns'>
              <Link to={`/devs/update/${dev.dev_id}`}>
                <button className='getStarted editDelete'>Edit</button>
              </Link>
              <button className='getStarted editDelete delete' onClick={() => this.deleteDev(dev_id)}>Delete</button>
            </div>
          </div>
          <h2 className='task' id='devSubtitle'>Title: {dev.title}</h2>
          {devTasks}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (reduxState) => {
  const {dev, manager_id} = reduxState
  return {
    dev,
    manager_id
  }
}

let mapDispatchToProps = {
  updateDev,
  updateDevs
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dev))