import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class ComponentTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [{ title: '', children: [{ title: '' }] }],
      components: []
    };
  }

  componentWillMount = async () => {
    let res = await axios.get('/auth/checkForSession')
    if(!res.data.user){
      this.props.history.push('/login')
    } else {
      try {
        let product_id = this.props.match.params.id
        let res = await axios.get(`/api/components/${product_id}`)
        await this.setState({components: res.data})
        this.sortComponentTree()
      } catch {
        console.log('Something went wrong. Refresh the page.')
      }
    } 
  }

  sortComponentTree = async () => {
    let {components} = this.state
    let product_id = this.props.match.params.id
    let res = await axios.get(`/api/components/taskcount/${product_id}`)
    let componentTaskCount = res.data
    let countIndex = '';
    for (let i = 0; i < components.length; i++){
      countIndex = componentTaskCount.findIndex(component => component.component_id === components[i].component_id)
      if (countIndex !== -1){
        components[i].title = `${components[i].name} - Pending Tasks: ${componentTaskCount[countIndex].count}`
      } else {
        components[i].title = `${components[i].name} - Pending Tasks: 0`
      }
      components[i].children = []
    }
    for (let i = 0; i < components.length; i++){
      if (components[i].parent_component){
        let parentIndex = components.findIndex(component => component.component_id === components[i].parent_component)
        components[parentIndex].children.push(components[i])
      }
    }
    for (let i = 0; i < components.length; i++){
      if (components[i].parent_component){
        components.splice(i, 1)
        i -= 1;
      }
    }
    this.setState({treeData: components})
  }

  updateParentId = (e) => {
    let parent_component = e.nextParentNode.component_id
    let product_id = this.props.match.params.id
    let {component_id} = e.node
    axios.put(`/api/components/update/${product_id}`, {component_id, parent_component}).then(res => {
    }).catch(err => console.log('Something went wrong.'))
  }

  render() {
    let {productname} = this.props
    let product_id = this.props.match.params.id
    return (
      <div className='componentTreeMain'>
        <h1>'{productname}' Component Tree</h1>
        <div className='componentTree'>
          <Link to={`/components/new/${product_id}`}>
            <button className='getStarted newComponentBtn'>New Component</button>
          </Link>
          <Link to={`/tasks/${product_id}`}>
            <button className='getStarted newComponentBtn cancelComponentBtn'>See Tasks</button>
          </Link>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            onMoveNode={(e) => this.updateParentId(e)}
            />
        </div>
      </div>
    );
  }
}

let mapStateToProps = (reduxState) => {
  const {manager_id, productid, productname} = reduxState
  return {
    manager_id,
    productid,
    productname
  }
}

export default connect(mapStateToProps, null)(withRouter(ComponentTree))