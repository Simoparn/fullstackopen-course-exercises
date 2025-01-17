import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate, useNavigate, useParams,
} from "react-router-dom"
import styled from 'styled-components'
import Navbar from './components/Navbar'
import LoggedIn from './components/LoggedIn'
import Instructions from './components/Instructions'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UsersSummary from './components/UsersSummary'
import UserInfo from './components/UserInfo'
import BlogView from './components/BlogView'
import NotFound from './components/NotFound'
import { setUser, /*initializeUser,*/ loginUser, logoutUser } from './reducers/userReducer' 
import { setNotification, setNotificationWithTimeout } from './reducers/notificationReducer'
import { getUserBlogs, initializeBlogs, createBlog, updateBlog, removeBlog, addBlogComment } from './reducers/blogReducer'
import { getAllUsers } from './reducers/allUsersInfoReducer'
import { getAllBlogsInfo } from './reducers/allBlogsInfoReducer'



const AllAppStyle = styled.div`

background-color:lightgrey;
`


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
  const allUsersInfo=useSelector(( { allUsersInfo } )=>{
    console.log('allUsersInfo info retrieved from Redux store with useSelector:', allUsersInfo)
    return allUsersInfo
  })

  const allBlogsInfo=useSelector(( { allBlogsInfo } )=>{
    console.log('allBlogsInfo info retrieved from Redux store with useSelector:', allBlogsInfo)
    return allBlogsInfo
  })
  //const [errorMessage, setErrorMessage] = useState('')

  //see components/Blogform
  const blogFormRef = useRef()
  const blogVisibleRef = useRef()
  const blogRef = useRef([])

  const dispatch = useDispatch()  

  //Empty array argument for useEffect ensures that the effect is executed only upon the first rendering
  useEffect(() => {
    console.log('useEffect, initializing personal blogs, info for all users, info for all blogs and current user in front-end')
    dispatch(initializeBlogs())

    dispatch(getAllUsers())
    dispatch(getAllBlogsInfo())
    
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
      //dispatch(logoutUser())
      //dispatch(initializeBlogs())
    }
  }, [])
  
  useEffect(()=>{
    dispatch(getUserBlogs())
    console.log('useEffect, user state changed, whole state retrieved from Redux store with useSelector:', wholestate)
    console.log('useEffect, user state changed, user blogs after dispatch(getUserBlogs())', blogs)
  }, [user])

  useEffect(() => {
    
    console.log('useEffect, allUsersInfo state changed, whole state retrieved from Redux store with useSelector:', wholestate)
    console.log('useEffect, allUsersInfo state changed, all users info retrieved from Redux store with useSelector:', allUsersInfo)
    //blogRef.current = blogRef.current.slice(0, blogs.length)
  }, [allUsersInfo])  

  useEffect(() => {
    
    console.log('useEffect, allBlogsInfo state changed, whole state retrieved from Redux store with useSelector:', wholestate)
    console.log('useEffect, allBlogsInfo state changed, info for all blogs retrieved from Redux store with useSelector:', allBlogsInfo)
    //blogRef.current = blogRef.current.slice(0, blogs.length)
  }, [allBlogsInfo]) 

  //Refs to blogs array
  useEffect(() => {
    dispatch(getAllBlogsInfo())
    dispatch(getAllUsers())
    console.log('useEffect, blogs state changed, adding refs to changed blogs array, whole state retrieved from Redux store with useSelector:', wholestate)
    console.log('useEffect, blogs state changed, adding refs to changed blogs array, blogs retrieved from Redux store with useSelector:', blogs)
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
    dispatch(logoutUser())
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
  //    blogVisibleRef.current.visible
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
  <>
    {console.log("loginForm, user:", user)}
    {console.log("Current user not found, rendering loginForm")}
  
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
  

  </>





  /*
  <Route path="/notes" element={<Notes notes={notes}/>} />
  <Route path="/users" element={user ? <Users /> : <Navigate to="/login"/>} />  
  <Route path="/login" element= {<Login onLogin={login}/>} />
  <Route path="/" element={<Home />} />*/


)

const UserNotNullView = () => {



 
/*
  {allUsersInfo.length !== 0 ? (allUsersInfo.map((userInfo)=>{
    {console.log("creating route for userInfo: /users/"+userInfo.id)}
    <Route path={`/users/${userInfo.id}`} element={userInfo.id ? <UserInfo id={userInfo.id}/> : <NotFound/>} />
  })) 
  : <Route path="/users/*" element={<NotFound/>}/>}
  {console.log("Current user found, rendering UserNotNullView")}*/

  



  
  return (
      
      <>
        {allUsersInfo.length !== 0 ? (
            console.log("Rendering LoggedIn and UsersSummary for all users")

          ) : (
          
            console.log("Only rendering LoggedIn for all users")

          )}
          
         
          <LoggedIn blogFormRef={blogFormRef} blogVisibleRef={blogVisibleRef} blogRef={blogRef}  />
          </>
    
  )
}



allUsersInfo.length !== 0 ? 
console.log("Current user found, rendering UserNotNullView") : 
console.log("0 users found, no user routes needed")

allUsersInfo.map((userInfo)=>{  
  console.log("creating route for userInfo: /users/"+userInfo.id) 
})
 


  return (
    <AllAppStyle>
      <h2>Blogs application</h2>

      {/*<Notification message={errorMessage} />*/}
      <Notification />
      {user.username !== null ? <Navbar/> : <></>}
      <Routes>
        <Route path="/" element={user.username === null ? loginForm()  : 
        (<>
        <UserNotNullView />
        </>)} 
        />
        {allBlogsInfo.length !== 0 ? (
          allBlogsInfo.map((blogInfo) => (
            <Route path={`/blogs/${blogInfo.id}`} element={<BlogView id={blogInfo.id} />} />) 
          )
        ) : (<></>)

        }
        <Route path="/users" element={allUsersInfo.length !== 0 ? <UsersSummary/> : <NotFound/>} />
        {allUsersInfo.length !== 0 ? (    
            allUsersInfo.map((userInfo)=>(                           
              <Route path={`/users/${userInfo.id}`} element={<UserInfo id={userInfo.id} />} />)          
            )   
        ) : (<> </>)
        } 
        <Route path="/instructions" element={user.username !== null ? <Instructions/> : <NotFound/> }/>       
        <Route path="/notfound" element={<NotFound/>} />
        <Route path="*" element={<Navigate to="/notfound"/>} />
      </Routes>
      <Footer />
    </AllAppStyle>
  )
}





export default App
