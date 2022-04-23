const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('../utils/user_api_test_helper')




beforeEach(async () => {
  await User.deleteMany({})
  console.log('test users cleared')


  await User.insertMany(helper.newValidUsers)




})

describe('4.16 tests for checking new users', () => {

  test('4.16 check that a new valid user can be created', async () => {


    const usersAtStart = await helper.usersInDb()
    const newValidUser=
    {
      username:"validusername",
      name: "Valid User",
      password: "validpassword"

    }
    
    await api
      .post('/api/users')
      .send(newValidUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)




    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.newValidUsers.length+1)

  })


  test('4.16 check that empty username and empty password are denied with status code 400', async () => {


    await api
      .post('/api/users')
      .send(helper.newUserWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(helper.newUserWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(helper.newUserWithTooShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.newValidUsers.length)


  })

})






afterAll(() => {
  mongoose.connection.close()
})