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

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }],
    };
  }

  render() {
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