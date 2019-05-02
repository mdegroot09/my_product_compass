import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import ComponentTree from './Components/ComponentTree/ComponentTree'
import Dev from './Components/Dev/Dev'
import Devs from './Components/Devs/Devs'
import Login from './Components/Login/Login'
import NewDev from './Components/NewDev/NewDev'
import NewPM from './Components/NewPM/NewPM'
import NewProduct from './Components/NewProduct/NewProduct'
import NewTask from './Components/NewTask/NewTask'
import Task from './Components/Task/Task'
import Tasks from './Components/Tasks/Tasks'

export default (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/register' component={NewPM}/>
    <Route path='/login' component={Login}/>
    <Route exact path='/devs' component={Devs}/>
    <Route path='/devs/newdev' component={NewDev}/>
    <Route path='/devs/:id' component={Dev}/>
    <Route exact path='/tasks' component={Tasks}/>
    <Route path='/tasks/componenttree' component={ComponentTree}/>
    <Route exact path='/tasks/newtask' component={NewTask}/>
    <Route path='/tasks/:task' component={Task}/>
    <Route path='/newproduct' component={NewProduct}/>
    <Route path='/about' component={About}/>
  </Switch>
)