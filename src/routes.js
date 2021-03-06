import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import ComponentTree from './Components/ComponentTree/ComponentTree'
import Dev from './Components/Dev/Dev'
import Devs from './Components/Devs/Devs'
import Login from './Components/Login/Login'
import NewDev from './Components/NewDev/NewDev'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import NewProduct from './Components/NewProduct/NewProduct'
import NewTask from './Components/NewTask/NewTask'
import NewComponent from './Components/NewComponent/NewComponent'
import Tasks from './Components/Tasks/Tasks'
import UpdateDev from './Components/UpdateDev/UpdateDev'
import UpdateTask from './Components/UpdateTask/UpdateTask'
import UpdateProduct from './Components/UpdateProduct/UpdateProduct'
import IncorrectRoute from './Components/IncorrectRoute/IncorrectRoute'

export default (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/register' component={Register}/>
    <Route path='/login' component={Login}/>
    <Route exact path='/devs' component={Devs}/>
    <Route path='/devs/new' component={NewDev}/>
    <Route path='/devs/update/:id' component={UpdateDev}/>
    <Route path='/devs/:id' component={Dev}/>
    <Route path='/componenttree/:id' component={ComponentTree}/>
    <Route path='/components/new/:id' component={NewComponent}/>
    <Route exact path='/tasks/new/:id' component={NewTask}/>
    <Route path='/tasks/update/:id' component={UpdateTask}/>
    <Route path='/tasks/:id' component={Tasks}/>
    <Route path='/about' component={About}/>
    <Route exact path='/products' component={Products}/>
    <Route path='/products/new' component={NewProduct}/>
    <Route path='/products/update/:id' component={UpdateProduct}/>
    <Route path='/' component={IncorrectRoute}/>
  </Switch>
)