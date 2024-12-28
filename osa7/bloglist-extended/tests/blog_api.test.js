const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const blogHelper = require('../utils/blog_api_test_helper')
const userHelper = require('../utils/user_api_test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/*  FOR TEST DATABASE */

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('test blogs cleared')
  await User.deleteMany({})
  console.log('test users cleared')

  const { username, name, password } = userHelper.newValidUsers[0]

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  console.log('Test user after saving:', savedUser)

  await Blog.insertMany(blogHelper.initialBlogs)

  //Option for insertMany:
  //const blogObjects= blogHelper.initialBlogs.map(note => new Blog(blog))
  //const promiseArray = blogObjects.map(blog => blog.save())
  //await Promise.all(promiseArray)
})

describe('4.8-4.9, tests for getting blogs', () => {
  test('4.8 blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('4.9 all blogs must have an identifier field called id', async () => {
    const blogs = await api.get('/api/blogs')
    //console.log("BLOGS: ", blogs.body)
    const blog_ids = blogs.body.map((blog) => blog.id)
    //console.log("BLOG IDS AS ARRAY: ", blog_ids)
    //For testing: blog_ids[1]=undefined
    blog_ids.forEach((blog_id) => {
      console.log(blog_id)
      expect(blog_id).toBeDefined()
    })
  })
})

//TODO: doesn't work with token authorization
describe('4.10-4.12 and 4.23, tests for adding blogs', () => {
  test('4.10 and 4.23, a valid blog can be added to the database', async () => {
    const newBlog = {
      title: 'post example title',
      author: 'post example author',
      url: 'https://postexampleurl.com',
      likes: 8,
    }

    const { username, name, password } = userHelper.newValidUsers[0]
    console.log('password:', password)

    const user = await User.findOne({ username })
    console.log('Retrieved user: ', user)
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    expect(user && passwordCorrect)

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    // token expires in 60*120 seconds=7200 seconds
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 120,
    })

    console.log('Token before post request: ', token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log('Decoded token:', decodedToken)
    const bearerAndToken = 'bearer ' + token
    console.log('Bearer and token: ', bearerAndToken)

    //Login and sending a new blog must succeed with a valid token
    await api
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .set('Authorization', bearerAndToken)
      .send({ username: user.username, password: password })
      .expect(200)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length + 1)
    const theWantedBlog = blogsAtEnd[blogHelper.initialBlogs.length]
    delete theWantedBlog.id
    expect(theWantedBlog).toMatchObject(newBlog)
  })

  test('4.11 check that if the value of the field \"likes\" is not set, the value is set to 0', async () => {
    const newBlog = {
      title: 'post likes assignment title',
      author: 'post likes assignment author',
      url: 'https://postexampleurl.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length + 1)
    const theAddedBlog = blogsAtEnd[blogHelper.initialBlogs.length]
    expect(theAddedBlog.likes).toBeDefined()
    expect(theAddedBlog.likes).toEqual(0)
  })

  test('4.12 check that if a new blog does not include both the \"title\" and the \"url\" fields, the response status is 400 bad request', async () => {
    const newBlogWithoutTitle = {
      author: '4.12 post likes/url assignment author',
      url: 'https://postexampleurl.com',
      likes: 60,
    }

    const newBlogWithoutUrl = {
      title: '4.12 post likes/url assignment title',
      author: '4.12 post likes/url assignment author',
      likes: 81,
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('4.23 if no token with the request, adding a new blog is denied and the status code 401 Unauthorized is returned', async () => {
    const newBlog = {
      title: 'post likes assignment title',
      author: 'post likes assignment author',
      url: 'https://postexampleurl.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length)
  })
})

//TODO: doesn't work with token authorization
describe('4.13, tests for deleting blogs', () => {
  test('4.13, a selected blog (based on index) can be deleted', async () => {
    const blogsAtStart = await blogHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log('BLOG TO DELETE:', blogToDelete)
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((response) => response)

    expect(contents).not.toContain(blogToDelete)
  })

  test('4.13, a note deletion succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogHelper.blogsInDb()
    const blogToDelete = blogsAtStart[1]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((blog) => blog)

    expect(contents).not.toContain(blogToDelete)
  })
})

//TODO: doesn't work with token authorization
describe('4.14, tests for updating blogs', () => {
  test('4.14, the likes in a blog with a given ID can be updated. Expect 200 status after updating', async () => {
    const blogsBeforeUpdate = await blogHelper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    console.log('Blog before update: ', blogToUpdate)
    blogToUpdate.likes += 1000

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAfterUpdate = await blogHelper.blogsInDb()
    console.log('Updated blog retrieved from database: ', blogsAfterUpdate[0])

    expect(blogsAfterUpdate[0]).not.toMatchObject(blogToUpdate)
    //console.log("The likes of ", blogsAfterUpdate[0], " are different from ", blogToUpdate)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
