const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log('Login response:', response)
  const user = await User.findOne({ username })
  console.log('User in login POST route:', user)
  console.log('Username and password in login POST route:', username, password)
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // token expires in 60*120 seconds=7200 seconds
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 120,
  })
  //Option without expiration
  //const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  })
  console.log('Logged in as:', user.username)
})

module.exports = loginRouter
