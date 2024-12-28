import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('a new blog title...')
  const [newBlogAuthor, setNewBlogAuthor] = useState('a new blog author...')
  const [newBlogUrl, setNewBlogUrl] = useState('a new blog URL...')
  const [newBlogLikes, setNewBlogLikes] = useState(0)

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setNewBlogLikes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <input
          id="new-blog-title"
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
        <input
          id="new-blog-author"
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        />
        <input
          id="new-blog-url"
          value={newBlogUrl}
          onChange={handleUrlChange}
        />
        <input
          id="new-blog-likes"
          value={newBlogLikes}
          onChange={handleLikesChange}
        />

        <button type="submit">save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

BlogForm.displayName = 'Blogform'

export default BlogForm
