import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'




const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 26
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app, Simo P.</em>
    </div>
  )
}

const Notification = ({ message }) => {
  console.log(typeof message)
  if (message === null || message === "") {
    return null
  }
  
  else if(message.toLowerCase().includes("fail") ||  message.toLowerCase().includes("error")){
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else{

    return (
      <div className="success">
        {message}
      </div>
    )
  }
}




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  //see components/Blogform
  const blogFormRef = useRef()
  const blogViewRef = useRef()
  const blogRef = useRef()

  
  
  
  
  //Empty array argument ensures that the effect is executed only upon the first rendering
  useEffect(() => {
    
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //Empty array argument ensures that the effect is executed only upon the first rendering
  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])


  const handleLogin = async (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)  
     
  
      try {      
        const user = await loginService.login({username, password})      
        console.log("User after login in handleLogin:", user)
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 
        console.log("User credentials browser cache after login in handleLogout:")
        console.log(window.localStorage.getItem('loggedBlogappUser'))
        blogService.setToken(user.token)
        setUser(user)      
        setUsername('')      
        setPassword('')
        setErrorMessage('logged in successfully') 
        setTimeout(() => { 
        setErrorMessage(null) 
        }, 4000)
      } catch (exception) {
          //console.log('Exception', exception)      
          setErrorMessage('login failed, wrong credentials')      
          setTimeout(() => {        
          setErrorMessage(null)      
          }, 5000)    
      }
  
  }

  const handleLogout = async (event) => {    
    event.preventDefault()    
    console.log('logging out with', username, password)  
     
  
      try {      
        //const user = await loginService.logout({username, password})  
        window.localStorage.removeItem('loggedBlogappUser')
        console.log("User credentials browser cache after logout in handleLogout:")
        console.log(window.localStorage.getItem('loggedBlogappUser'))
        
        blogService.setToken(user.token)
        setUser(null)      
        setUsername('')      
        setPassword('') 
        setErrorMessage('logged out') 
      } catch (exception) {
          console.log('Logout exception', exception)      
          setErrorMessage('Error while logging out')      
          setTimeout(() => {        
          setErrorMessage(null)      
          }, 5000)    
      }
  
  }

  //Adding blog and promises  
  const addBlog = (blogObject) => {    
    
    console.log('Blog submit button clicked') 
    
  

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {        
          setBlogs(blogs.concat(returnedBlog))        
          setErrorMessage('New blog: '+ blogObject.title+ ' added') 
          setTimeout(() => {        
            setErrorMessage(null)      
            }, 3000)    
      }).catch(error => {
        setErrorMessage('Adding a new blog failed, check that the likes field is a number and does not contain letters')
         
        
        console.log('Adding a new blog failed')
        setTimeout(() => {        
          setErrorMessage(null)      
          }, 3000)  
        

      })
      
    //Option without  addBlog etc imported from blogs.js
    //axios.post('http://localhost:3001/blogs', blogObject)    
    //.then(response => 
    //  {      
    //    console.log(response)  
    //    setBlogs(blogs.concat(blogObject))
    //    setNewBlog('')
    //  })
    //.catch(error => {
    //console.log('fail')
    //})
  
  }

  //TODO: For assignment 5.7, unimplemented
  const viewBlog = () => { 
    console.log('Showing or hiding full blog details depending on visibility status', blogViewRef.current.visible) 

  }

  
  const addBlogLike = () => { 
    console.log('Clicked blog like button')
    blogRef.current.getId()

  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
    
    
  
    

  return (
    <div>
      <h2>blogs</h2>
      
      <Notification message={errorMessage} />
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in <span>
          </span>  
          <button onClick={handleLogout} type="button">logout</button>  
        </p>
      
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
  		    <BlogForm createdBlog={addBlog}/>
	      </Togglable>
        <p>See localhost:backendport/api/blogs and localhost:backendport/api/users for details about current data and users </p>
        <p>All blogs shown regardless of the user, users can only create blogs for themselves</p>
       
        <ul className="bloglist">
        
        {blogs.map(blog =>
        <Togglable buttonLabel="view" ref={blogViewRef}>
          <Blog key={blog.id} blog={blog} ref={blogRef}/> 
        </Togglable>
          )}
        </ul>
      </div>
      }
      

      
      <Footer/>
    </div>
  )
}

export default App