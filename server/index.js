require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const massive = require('massive')
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log('Listening on port:', SERVER_PORT)
  })
})

