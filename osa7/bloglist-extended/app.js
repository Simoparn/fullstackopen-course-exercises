//SEE BUILD FOLDER FOR FRONTEND
const config = require('./utils/config')
const express = require('express')
//cross-origin policy middleware for database and app interaction
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

//logger.info('connecting to', config.MONGODB_URI)
logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
//Show the static frontend contents in build folder
//app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

//Only include testing router in test mode (useful for test database resets etc.)
if (process.env.NODE_ENV === 'test') {
  console.log('Test mode started successfully, test database in use')
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
