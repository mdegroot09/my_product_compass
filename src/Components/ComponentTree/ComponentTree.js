// import React, {Component} from 'react'
// // import Tree from 'react-tree-graph'
// import Tree from 'react-d3-tree'

// let data = {
//   name: 'Parent',
//   children: [{
//     name: 'Child One', 
//     children: [{
//       name: 'Child1'
//     }, {
//       name: 'Child2'
//     }]
//   }, {
//     name: 'Child Two'
//   }]
// };

// export default class ComponentTree extends Component {
//   render() {
//     return (
//       <div>
//         ComponentTree
//         <div style={{margin: '100px',width: '50em', height: '20em'}}>
//           <Tree
//             data={data}
//             height={400}
//             width={400}
//           />
//         </div>
//       </div>
//     )
//   }
// }

import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

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
        let res = await axios.get('/api/components')
        await this.setState({components: res.data})
        this.sortComponentTree()
      } catch {
        console.log('Something went wrong. Try refreshing the page.')
      }
    }
  }

  sortComponentTree = () => {
    let {components} = this.state
    let newTreeData = []
    for (let i = 0; i < components.length; i++){
      components[i].title = components[i].name
      components[i].children = []
    }
    for (let i = 0; i < components.length; i++){
      if (components[i].parent_component){
        let parentIndex = components.findIndex(component => component.component_id == components[i].parent_component)
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

  render() {
    console.log('ComponentTree this.state:', this.state)
    return (
      <div className='componentTree' style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}

let mapStateToProps = (reduxState) => {
  const {manager_id} = reduxState
  return {
    manager_id
  }
}

export default connect(mapStateToProps, null)(withRouter(ComponentTree))