//const http = require('http')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/info', (req, res) => {
  res.send('<h2>This is the backend for the part 4 blog list. See localhost:3003 for the front end.</h2><br/><h3>More info: /api/blogs/info/moreinfo <br/>All notes: api/blogs</h3>')
})





blogsRouter.get('/', (request, response) => {
  Blog.
    find({}).
    then(blogs => {
      response.json(blogs)
    })


})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }

    })
    .catch(error => next(error))
})


blogsRouter.get('/info/moreinfo', (req, res) => {
  let date=new Date()
  //console.log(date)
  Blog.find({}).then(blogs => {
    res.send('Blog app has info for '+blogs.length+' blogs from MongoDB Atlas. <br/>'+ date)
  })

})




blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: 'All content missing for a new blog'
    })
  }


  else if (!body.title || !body.url ) {
    return response.status(400).json({
      error: 'title or URL or both missing for the new added blog'
    })
  }

  const blog = new Blog(request.body)

  blog
    .save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})


blogsRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body


  Blog.findByIdAndUpdate(request.params.id,  { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})



blogsRouter.delete('/:id', (request, response, next) => {
//const id = Number(request.params.id)
//console.log("Note to delete "+id)
//notes = notes.filter(note => note.id !== id)
//console.log(notes)
//response.status(204).end()

Blog.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})









module.exports = blogsRouter