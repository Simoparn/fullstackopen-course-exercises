const User = require('../models/user')

const newValidUsers = [
  {
    username: 'testusername1',
    name: 'Test User',
    password: 'testpassword1',
  },

  {
    username: 'testusername2',
    name: 'Test User',
    password: 'testpassword2',
  },

  {
    username: 'testusername3',
    name: 'Test User',
    password: 'testpassword3',
  },
]

const newUserThatAlreadyExists = {
  username: 'usernamefortesting',
  name: 'Example Name',
  password: 'passwordfortesting',
}

const newUserWithoutUsername = {
  username: '',
  name: 'Without Username',
  password: 'passwordfortesting',
}

const newUserWithoutPassword = {
  username: 'usernamefortesting',
  name: 'Without Password',
  password: '',
}

const newUserWithTooShortUsername = {
  username: 'ar',
  name: 'Too Short',
  password: 'passwordfortesting',
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  newValidUsers,
  newUserThatAlreadyExists,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithTooShortUsername,
  usersInDb,
}
