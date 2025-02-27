const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log('authorization header in tokenExtractor:', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('found authorization header')
    request.token = authorization.substring(7)
    //console.log("Request after assigning token field: ", request)
  } else {
    console.log("didn't find authorization header")
    request.token = null
  }
  next()
}

/* Extract the user for blog POST and DELETE requests and assign to the request.user variable
const userExtractor = async (request, response, next) => {


  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blogUser = await User.findById(decodedToken.id)
  request.user=blogUser
  next()


}

*/

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
