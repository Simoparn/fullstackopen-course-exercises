import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoggedIn from './components/LoggedIn'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { setUser, /*initializeUser,*/ loginUser, logoutUser } from './reducers/userReducer' 
import { setNotification, setNotificationWithTimeout } from './reducers/notificationReducer'
import { getUserBlogs, initializeBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { getAllUsers } from './reducers/allUsersInfoReducer'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 26,
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app, Simo P.</em>
    </div>
  )
}

/*const Notification = ({ message }) => {
  console.log('Notification:', message)
  if (message === null || message === '') {
    return null
  } else if (
    message.toLowerCase().includes('fail') ||
    message.toLowerCase().includes('error')
  ) {
    return <div className="error">{message}</div>
  } else {
    return <div className="success">{message}</div>
  }
}*/

const App = () => {
  
  const wholestate=useSelector(state=>state)
  //const [blogs, setBlogs] = useState([])
  const blogs=useSelector(({ blogs })=>{
    console.log('blogs retrieved from Redux store with useSelector:', blogs)
    return blogs
  })
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  //const [user, setUser] = useState(null)
  const user=useSelector(( { user } )=>{
    console.log('user retrieved from Redux store with useSelector:', user)
    return user
  })
  //const [errorMessage, setErrorMessage] = useState('')

  //see components/Blogform
  const blogFormRef = useRef()
  const blogViewRef = useRef()
  const blogRef = useRef([])

  const dispatch = useDispatch()  

  //Empty array argument ensures that the effect is executed only upon the first rendering
  useEffect(() => {
    console.log('useEffect, initializing user and blogs in front-end')
    //blogService.getUserBlogs().then((blogs) => setBlogs(blogs))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('credentials found in local storage:', loggedUserJSON)
      
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))


      //dispatch(getUserBlogs())
      //console.log('useEffect, user blogs after dispatch(getUserBlogs())', blogs)
    }
    else{
      console.log('credentials not found in local storage:', loggedUserJSON)
      dispatch(initializeBlogs())
    }
  }, [])
  
  useEffect(()=>{
    dispatch(getUserBlogs())
    console.log('useEffect, user blogs after dispatch(getUserBlogs())', blogs)
  }, [user])

  //Refs to blogs array
  useEffect(() => {
    
    console.log('useEffect, adding refs to changed blogs array, whole state retrieved from Redux store with useSelector:', wholestate)
    console.log('useEffect, adding refs to changed blogs array, blogs retrieved from Redux store with useSelector:', blogs)
    blogRef.current = blogRef.current.slice(0, blogs.length)
  }, [blogs])
  

  //Empty array argument ensures that the effect is executed only upon the first rendering
  /*useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      loginUser(user.username, user.password)
      //setUser(user)
      blogService.setToken(user.token)
    }
  }, [])*/

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', usernameInput, passwordInput)  
    dispatch(loginUser(usernameInput, passwordInput))
    
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out:', user.username)
    dispatch(logoutUser(user.username))
  }

  //Adding blog and promises
  const handleAddBlog = (blogObject) => {
    console.log('Blog submit button clicked, blog to handle:', blogObject)
    blogFormRef.current.toggleVisibility()
    //action creator in reducers for back-end and front-end saving functionality
    dispatch(createBlog(blogObject)) 
  }

  //TODO: see also course assignment 5.7, unimplemented
  //const handleViewBlog = () => {
  //  console.log(
  //    'Showing or hiding full blog details depending on visibility status',
  //    blogViewRef.current.visible
  //  )
  //}

  const handleUpdateBlog = (blogObject) => {
    console.log("handleUpdateBlog, blogObject:", blogObject)
    console.log('blogRef.current array :', blogRef.current)
    
    //Need blogRef as an array
    const blogId = Object.values(
      blogRef.current.find((ref) => ref.blogid === blogObject.id)
    )
    console.log('Blog id in app.js:', blogId)
  
    const blogToUpdate = blogs.find(
      (listblog) => listblog.id.toLowerCase() === blogId[0]
    )
    console.log('Blog before adding a like:', blogToUpdate)
  

    //reducer action creator for back-end and front-end updating
    dispatch(updateBlog(blogToUpdate.id, blogObject))

  }

  
  //TODO: Unfinished and no button yet
  const handleRemoveBlog = (blogObject) => {
    //Didn't work by comparing object and string values with ===, so this was needed
    const blogId = Object.values(
      blogRef.current.find((ref) => ref.blogid === blogObject.id)
    )
    console.log('blog id of the blog to remove: ', blogId)
    console.log('blogs before filtering: ', blogs)
    const blogToRemove = blogs.find((listblog) => listblog.id === blogId[0])
    console.log('Blog to remove:', blogToRemove)
    let confirmRemove = window.confirm(
      'Are you sure you want to remove the following blog?\n ' +
        blogToRemove.title
    )
    if (confirmRemove) {
      dispatch(removeBlog(blogId))
  // Front-end and back-end deletion moved to action creator
  //    blogService
  //      .deleteBlog(blogToRemove.id)
  //      .then((returnedBlog) => {
  //        const blogsAfterRemove = blogs.filter(
  //          (listblog) => listblog.id.toLowerCase() !== blogId
  //        )
  //        //Update shown list after delete
  //        setBlogs(blogsAfterRemove)
  //        /*setErrorMessage('Blog: ' + blogObject.title + ' removed successfully')
  //        setTimeout(() => {
  //          setErrorMessage(null)
  //        }, 3000)*/
  //        dispatch(setNotificationWithTimeout("Blog: " + blogObject.title + "removed successfully", 5000))
  //        console.log(
  //          'Blog list after deleting, ',
  //          blogsAfterRemove.length,
  //          ' blogs:',
  //          blogsAfterRemove
  //        )
  //      })
  //      .catch((error) => {
  //        /*setErrorMessage('Removing the blog failed')
  //        console.log('Removing the blog failed', error)
  //        setTimeout(() => {
  //          setErrorMessage(null)
  //        }, 3000)*/
  //        dispatch(setNotificationWithTimeout("Removing the blog failed: " + blogObject.title, 5000))
  //        console.log('Removing the blog failed', error)
  //        
  //      })
    }
  }

  const loginForm = () => (
    <form id="login-form" onSubmit={handleLogin}>
      <div style={{ paddingBottom: '0.4%' }}>
        username
        <input
          style={{ marginLeft: '1%' }}
          type="text"
          value={usernameInput}
          name="Username"
          onChange={({ target }) => setUsernameInput(target.value)}
        />
      </div>
      <div style={{ paddingBottom: '1%' }}>
        password
        <input
          style={{ marginLeft: '1%' }}
          type="password"
          value={passwordInput}
          name="Password"
          onChange={({ target }) => setPasswordInput(target.value)}
        />
      </div>
      <button type="submit" style={{ fontSize: '20px' }}>
        login
      </button>
    </form>
  )



  return (
    <div style={{ marginLeft: '0.8%' }}>
      <h2>Blogs</h2>

      {/*<Notification message={errorMessage} />*/}
      <Notification />
      {user.username === null ? (
        loginForm()
      ) : ( <LoggedIn blogFormRef={blogFormRef} blogViewRef={blogViewRef} blogRef={blogRef}  />)}

      <Footer />
    </div>
  )
}

export default App
