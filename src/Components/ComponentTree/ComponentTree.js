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
    if (!this.props.manager_id){
      this.props.history.push('/login')
    } else {
      try {
        let product_id = this.props.match.params.id
        let res = await axios.get(`/api/components/${product_id}`)
        await this.setState({components: res.data})
        this.sortComponentTree()
      } catch {
        console.log('Something went wrong. Try refreshing the page.')
      }
    }
  }

  sortComponentTree = async () => {
    let {components} = this.state
    let product_id = this.props.match.params.id
    let res = await axios.get(`/api/components/taskcount/${product_id}`)
    let componentTaskCount = res.data
    console.log('componentTaskCount:', componentTaskCount)
    let countIndex = '';
    for (let i = 0; i < components.length; i++){
      countIndex = componentTaskCount.findIndex(component => component.component_id === components[i].component_id)
      if (countIndex !== -1){
        console.log('countIndex:', countIndex)
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
      console.log('Parent Id updated in DB')
    }).catch(err => console.log('Something went wrong.'))
  }

  render() {
    let product_id = this.props.match.params.id
    return (
      <>
        <h1>Component Tree</h1>
        <div className='componentTree'>
          <Link to={`/components/new/${product_id}`}>
            <button>New Component</button>
          </Link>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            onMoveNode={(e) => this.updateParentId(e)}
          />
        </div>
      </>
    );
  }
}

let mapStateToProps = (reduxState) => {
  const {manager_id, productid} = reduxState
  return {
    manager_id,
    productid
  }
}

export default connect(mapStateToProps, null)(withRouter(ComponentTree))