const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/reset', async (request, response) => {
  response.send(
    '<h2>Testing router for for the part 5 blog list example E2E tests. See localhost:3000 for the front end.</h2>'
  )
  response.status(204).end()
})

//Router for E2E database tests with cypress, only added to the app in test mode
router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
