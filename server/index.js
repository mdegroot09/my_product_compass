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
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

// taskCtrl endpoints
app.post('/api/tasks/new', auth.usersOnly, taskCtrl.newTask)
app.get('/api/tasks/:product_id', auth.usersOnly, taskCtrl.getTasks)
app.post('/api/tasks/decrement', auth.usersOnly, taskCtrl.decrementTask)
app.post('/api/tasks/increment', auth.usersOnly, taskCtrl.incrementTask)
app.post('/api/tasks/:id', auth.usersOnly, taskCtrl.deleteTask)
app.put('/api/tasks/update', auth.usersOnly, taskCtrl.updateTask)

// devCtrl endpoints
app.get('/api/devs', auth.usersOnly, devCtrl.getDevs)
app.delete('/api/devs/:id', auth.usersOnly, devCtrl.deleteDev)
app.post('/api/devs/new', auth.usersOnly, devCtrl.newDev)
app.get('/api/devs/:dev_id', auth.usersOnly, devCtrl.getDev)
app.put('/api/devs/update', auth.usersOnly, devCtrl.updateDev)

// productCtrl endpoints
app.get('/api/products', auth.usersOnly, productCtrl.getProducts)
app.post('/api/products/new', auth.usersOnly, productCtrl.newProduct)
app.delete('/api/products/:id', auth.usersOnly, productCtrl.deleteProduct)