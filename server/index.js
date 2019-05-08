require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const massive = require('massive')
const taskCtrl = require('./controller/taskCtrl')
const devCtrl = require('./controller/devCtrl')
const productCtrl = require('./controller/productCtrl')
const authCtrl = require('./controller/authCtrl')
const auth = require('./middleware/authMiddleware')
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

// get access to req.body in controllers
app.use(express.json())

// Initiate user session
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

// Connect server to database
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log('Listening on port:', SERVER_PORT)
  })
})

// Credentials endpoints
app.get('/auth/logout', authCtrl.logout)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)

// taskCtrl endpoints
app.get('/api/tasks/:product_id', auth.usersOnly, taskCtrl.getTasks)
app.get('/api/tasks/update/:task_id', auth.usersOnly, taskCtrl.getTask)
app.post('/api/tasks/new', auth.usersOnly, taskCtrl.newTask)
app.post('/api/tasks/decrement', auth.usersOnly, taskCtrl.decrementTask)
app.post('/api/tasks/increment', auth.usersOnly, taskCtrl.incrementTask)
app.post('/api/tasks/:id', auth.usersOnly, taskCtrl.deleteTask)
app.put('/api/tasks/update/:id', auth.usersOnly, taskCtrl.updateTask)

// devCtrl endpoints
app.get('/api/devs', auth.usersOnly, devCtrl.getDevs) 
app.get('/api/devs/:dev_id', auth.usersOnly, devCtrl.getDev)
app.post('/api/devs/new', auth.usersOnly, devCtrl.newDev)
app.put('/api/devs/update', auth.usersOnly, devCtrl.updateDev)
app.delete('/api/devs/:id', auth.usersOnly, devCtrl.deleteDev)

// productCtrl endpoints
app.get('/api/products', auth.usersOnly, productCtrl.getProducts)
app.get('/api/products/:id', auth.usersOnly, productCtrl.getProduct)
app.post('/api/products/new', auth.usersOnly, productCtrl.newProduct)
app.put('/api/products/update', auth.usersOnly, productCtrl.updateProduct)
app.delete('/api/products/:id', auth.usersOnly, productCtrl.deleteProduct)