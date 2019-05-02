import React, {Component} from 'react'
// import Tree from 'react-tree-graph'
import Tree from 'react-d3-tree'

let data = {
  name: 'Parent',
  children: [{
    name: 'Child One', 
    children: [{
      name: 'Child1'
    }, {
      name: 'Child2'
    }]
  }, {
    name: 'Child Two'
  }]
};

export default class ComponentTree extends Component {
  render() {
    return (
      <div>
        ComponentTree
        <div style={{margin: '100px',width: '50em', height: '20em'}}>
          <Tree
            data={data}
            height={400}
            width={400}
          />
        </div>
      </div>
    )
  }
}