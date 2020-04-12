// lib dependency
const config = require('config')
const express = require('express')
const connectDb = require('./db/connection')
const users = require('./routes/user.routes')
const restaurants = require('./routes/restaurant.routes')
const menus = require('./routes/menu.routes')
const menuItems = require('./routes/menuItem.routes')
const categories = require('./routes/category.routes')
const orders = require('./routes/order.routes')
const staff = require('./routes/staff.routes')

const cors = require('cors')
const {
  dbErrorHandler,
  resCodeErrorHandler,
} = require('./middleware/errorHandler')

// import websocket
require('./server.js')

// check environment variables
if (!config.get('JWT_SECRET')) {
  console.error(
    'FATAL ERROR: environment variable "jwtPrivatKey" is not defined. Go check README.md on .env_file'
  )
  process.exit(1)
}

// const
const PORT_MAIN = 8000

const app = express()
app.set('json spaces', 2)
app.use(express.json())
app.use(cors())

// routes
app.use('/users', users)
app.use('/restaurants', restaurants)
app.use('/restaurants', menus)
app.use('/restaurants', menuItems)
app.use('/restaurants', categories)
app.use('/restaurants', orders)
app.use('/', staff)

if (config.get('MODE') !== 'PRODUCTION') {
  const { dbInit } = require('./db/dbInit')
  app.get('/dbinit', dbInit)
}

app.use(dbErrorHandler)
app.use(resCodeErrorHandler)

app.listen(PORT_MAIN, () => {
  console.log('Node RESTful API listening at ' + PORT_MAIN)
})

connectDb()
