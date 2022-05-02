//const http = require('http')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/info', (req, res) => {
  res.send('<h2>This is the backend for the part 4 blog list. See localhost:3003 for the front end.</h2><br/><h3>More info: /api/blogs/info/moreinfo <br/>All blogs: api/blogs</h3>')
})





blogsRouter.get('/', async (request, response) => {
  const user=request.user
  //const blogs= await Blog.find({})
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)


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


blogsRouter.get('/info/moreinfo', async (req, res) => {
  let date=new Date()
  //console.log(date)
  const blogs= await Blog.find({})
  res.send('Blog app has info for '+blogs.length+' blogs from MongoDB Atlas. <br/>'+ date)


})

/*
const getTokenFrom = request => {

  const authorization = request.get('authorization')
  console.log("authorization header in getTokenFrom:", authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
  {
    console.log("found authorization header")
    return authorization.substring(7)
  }
  console.log("didn't find authorization header")
  return null
}


*/

blogsRouter.post('/', async (request, response, next) => {
  const {title, author, url, likes} = request.body
  //const user = request.user


  console.log("Request:", request)
  //Option: get the token from the authorization header
  //const token = getTokenFrom(request)
  //get token directly with middleware
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blogUser = await User.findById(decodedToken.id)
  //if token is false or id field is missing from the decodedToken result object, adding a blog is not allowed
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid, can\'t add a new blog' })
  }


  else if (!(title || author || url || likes)) {
    return response.status(400).json({
      error: 'All content missing for a new blog'
    })
  }


  else if (!title || !url ) {
    return response.status(400).json({
      error: 'title or URL or both missing for the new added blog'
    })
  }





  console.log("Blog user:", blogUser)
  const blog = new Blog({title, author, user:blogUser, url, likes})

  try {
    const savedBlog = await blog.save()
    console.log("Saved blog:", savedBlog)

    blogUser.blogs = blogUser.blogs.concat(savedBlog._id)
    await blogUser.save()
    response.status(201).json(savedBlog)

  }
  catch(exception)
  {
    next(exception)
  }

})






blogsRouter.delete('/:id', async (request, response, next) => {

  //const user = request.user


  try{

    //object with user id, username and expire times for the token
    //console.log("Request: ", request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //console.log("Request params id", request.params.id)
    const blogToDelete = await Blog.findById(request.params.id)
    //console.log("Blog to delete: ", blogToDelete)
    const blogUser = blogToDelete.user
    console.log("Blog user:", blogUser.toString())
    console.log("Current user id with an active token:", decodedToken.id.toString())
    if (!request.token){
      return response.status(400).json({error: 'No token, cannot delete the blog'})
    }

    if (!(blogUser.toString() === decodedToken.id.toString())){

      return response.status(400).json({ error: 'Deleter is not the current token holder, cannot delete the blog.'})
    }


    console.log("Deleting the blog is allowed")
    const removedBlog = await Blog.findByIdAndRemove(request.params.id)
    //TODO: old references are not deleted yet
    //const removedReference = await User.findOneAndRemove({})
    return response.status(204).end()




  }
  catch(exception)
  {
    next(exception)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const {title , author, url, likes } = request.body

  try {
    const updatedBlog= await Blog.findByIdAndUpdate(request.params.id,  {title, author, url, likes}, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
  }

  catch(exception){
    next(exception)
  }
})









module.exports = blogsRouter