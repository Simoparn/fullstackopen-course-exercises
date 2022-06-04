import { useState } from 'react' 
import PropTypes from 'prop-types'

const BlogForm = ({createdBlog}) => {
  
  
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
    createdBlog({
      "title": newBlogTitle,
      "author": newBlogAuthor,
      "url": newBlogUrl,
      "likes": newBlogLikes

      
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
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
        <input
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        />
        <input
          value={newBlogUrl}
          onChange={handleUrlChange}
        />
        <input
          value={newBlogLikes}
          onChange={handleLikesChange}
        />

        <button type="submit">save</button>
      </form>
    </div>
  )
}


BlogForm.propTypes = {
  createdBlog: PropTypes.func.isRequired
}

BlogForm.displayName = 'Blogform'

export default BlogForm