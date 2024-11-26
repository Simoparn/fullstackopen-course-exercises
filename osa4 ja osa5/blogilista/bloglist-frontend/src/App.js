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
  console.log("Notification:", message)
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
  const blogRef = useRef([])

  
  
  
  
  //Empty array argument ensures that the effect is executed only upon the first rendering
  useEffect(() => {
    
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      
    )
    
  }, [])

  //Refs to blogs array
  useEffect(() => {
    
    blogRef.current = blogRef.current.slice(0, blogs.length)
      
  }, [blogs])

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
        console.log("User credentials browser cache after login in handleLogin:")
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
        setErrorMessage('Adding a new blog failed, check that the likes field is a number and does not contain letters, if this doesnt work, try to relog in')
         
        
        console.log('Adding a new blog failed')
        setTimeout(() => {        
          setErrorMessage(null)      
          }, 3000)  
        

      })
      
    //Option without  using blogService imported from blogs.js
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

  
  const handleUpdateBlog = (blogObject) => { 
    
    console.log('Clicked blog like button for the blog:', blogRef.current)
    //TODO: blogId and thus blogToUpdate always refers to the last blog in the list regardless of what blog like button is pressed
    //therefore it is replaced with updated likes, the old likes are left behind, adding async to callback didn't help
    //Need blogRef as an array
    const blogId = Object.values(blogRef.current.find(ref => ref.blogid === blogObject.id))
    console.log("Blog id in app.js:", blogId)
    
    const blogToUpdate=blogs.find(listblog => listblog.id.toLowerCase()===blogId[0])
    console.log("Blog before adding a like:", blogToUpdate)
    
    blogService
      .update(blogToUpdate.id, blogObject)
        .then(updatedBlog => {        
          //setBlogs(blogs.concat(returnedBlog))
          let blogtoupdateindex=blogs.indexOf(blogToUpdate[0])
          const updatedBlogs=[...blogs]
          updatedBlogs[blogtoupdateindex]=updatedBlog
          //Update shown list
          setBlogs(updatedBlogs)        
          setErrorMessage('Blog: '+ blogObject.title + ' like button pressed, likes increased') 
          setTimeout(() => {        
            setErrorMessage(null)      
            }, 3000)    
          console.log("Updated blog list after adding a like: ", updatedBlogs)
        }).catch(error => {
            setErrorMessage('Liking the blog failed')        
            console.log('Liking a new blog failed, error:', error)
            setTimeout(() => {        
              setErrorMessage(null)      
            }, 3000)  
        

      })

  }

  //TODO: Unfinished and no button yet
  const handleRemoveBlog = (blogObject) => {

    
    //Didn't work by comparing object and string values with ===, so this was needed
    const blogId = Object.values(blogRef.current.find(ref => ref.blogid === blogObject.id))
    console.log("blog id of the blog to remove: ", blogId)
    console.log("blogs before filtering: ", blogs)
    const blogToRemove=blogs.find(listblog => listblog.id===blogId[0])
    console.log("Blog to remove:", blogToRemove)
    let confirmRemove= window.confirm("Are you sure you want to remove the following blog?\n "+ blogToRemove.title)
    if(confirmRemove){
      blogService
        .deleteBlog(blogToRemove.id)
          .then(returnedBlog => {        
            const blogsAfterRemove=blogs.filter(listblog => listblog.id.toLowerCase()!==blogId)
            //Update shown list after delete
            setBlogs(blogsAfterRemove)        
            setErrorMessage('Blog: '+ blogObject.title + ' removed successfully') 
            setTimeout(() => {        
              setErrorMessage(null)      
              }, 3000)    
              console.log("Blog list after deleting, ", blogsAfterRemove.length, " blogs:", blogsAfterRemove)
          }).catch(error => {
              setErrorMessage('Removing the blog failed')        
              console.log('Removing the blog failed', error)
              setTimeout(() => {        
                setErrorMessage(null)      
              }, 3000)  
      
      })
    }
  }


  const loginForm = () => (
    <form id="login-form" onSubmit={handleLogin}>
      <div style={{paddingBottom:"0.4%"}}>
        username
          <input style={{marginLeft:"1%"}}
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div style={{paddingBottom:"1%"}}>
        password
          <input style={{marginLeft:"1%"}}
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" style={{fontSize:"20px"}}>login</button>
    </form>      
  )
    
    
  
    

  return (
    <div style={{marginLeft:"0.8%"}}>
      <h2>Blogs</h2>
      
      <Notification message={errorMessage} />
      {user === null ?
      loginForm() :
      <div>
        <p style={{paddingBottom:"2%", fontSize:"25px"}}>{user.name} logged in <span style={{paddingTop:"1%"}}>
          </span>
        </p>
        <p style={{paddingBottom:"3%"}}>
          <button onClick={handleLogout} type="button" style={{fontSize:"18px"}}>logout</button>  
        </p>
        
        <div style={{marginLeft:"0.8%"}}>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
  		      <BlogForm createBlog={addBlog}/>
	        </Togglable>
          <h4>INSTRUCTIONS:</h4>
          <p>See localhost:backendport/api/blogs and localhost:backendport/api/users for details about current data and users </p>
          <p>All blogs shown regardless of the user, users can only create and delete blogs for themselves, refresh page after deleting a blog</p>
          <p>The page must be refreshed to show the updated likes, the same blog can only be liked once before refreshing again</p>
          <h4>PROBLEMS:</h4> 
          <p>Page needs to be refreshed after deleting or liking a blog</p>
          
       
          <ul className="bloglist">
          <span style={{paddingBottom:"2%", fontSize:"25px"}}>{blogs.length} blogs in total</span>
        
          {blogs.map((blog, i) =>
          <Togglable buttonLabel="view" ref={blogViewRef}>
            <Blog key={blog.id} blog={blog} ref={element=>blogRef.current[i]=element}  updateBlog={handleUpdateBlog} removeBlog={handleRemoveBlog} currentUser={user}/> 
          </Togglable>
            ).sort(function(a, b){return a.likes > b.likes ? 1 : -1})}
          </ul>
          </div>
        </div>    
      }
      

      
      <Footer/>
    </div>
  )
}

export default App