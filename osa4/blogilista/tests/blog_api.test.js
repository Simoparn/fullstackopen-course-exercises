const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper= require('../utils/blog_api_test_helper')





/*  FOR TEST DATABASE */

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('test blogs cleared')


  await Blog.insertMany(helper.initialBlogs)

  //Option for insertMany:
  //const blogObjects= helper.initialBlogs.map(note => new Blog(blog))
  //const promiseArray = blogObjects.map(blog => blog.save())
  //await Promise.all(promiseArray)


})



test('4.8 blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
})



test('4.9 all blogs must have an identifier field called id', async () => {
  const blogs=await api.get('/api/blogs')
  console.log("BLOGS: ", blogs.body)
  const blog_ids=blogs.body.map(blog=>blog.id)
  console.log("BLOG IDS AS ARRAY: ", blog_ids)
  //For testing: blog_ids[1]=undefined
  blog_ids.forEach(blog_id=>{
    console.log(blog_id)
    expect(blog_id).toBeDefined()
  })
})


test('4.10 a valid blog can be added to the database', async () => {
  const newBlog = {
    title:"post example title",
    author:"post example author",
    url: 'https://postexampleurl.com',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const theWantedBlog= blogsAtEnd[helper.initialBlogs.length]
  delete theWantedBlog.id
  expect(theWantedBlog).toMatchObject(newBlog)

})

test('4.11 check that if the value of the field \"likes\" is not set, the value is set to 0', async () => {
  const newBlog = {
    title:"post likes assignment title",
    author:"post likes assignment author",
    url: 'https://postexampleurl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const theAddedBlog= blogsAtEnd[helper.initialBlogs.length]
  expect(theAddedBlog.likes).toBeDefined()
  expect(theAddedBlog.likes).toEqual(0)

})



test('4.12 check that if a new blog does not include both the \"title\" and the \"url\" fields, the response status is 400 bad request', async () => {
  const newBlogWithoutTitle = {
    author:"4.12 post likes/url assignment author",
    url: 'https://postexampleurl.com',
    likes: 60
  }

  const newBlogWithoutUrl = {
    title:"4.12 post likes/url assignment title",
    author:"4.12 post likes/url assignment author",
    likes: 81
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



afterAll(() => {
  mongoose.connection.close()
})






/*
test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  expect(contents).toContain(
    'Browser can execute only Javascript'
  )
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)


  const contents = notesAtEnd.map(n => n.content)

  expect(notesAtEnd).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})


test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

  expect(resultNote.body).toEqual(processedNoteToView)
})


test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const contents = notesAtEnd.map(r => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})

*/