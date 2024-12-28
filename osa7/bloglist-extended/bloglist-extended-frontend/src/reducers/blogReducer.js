import { useDispatch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { setNotificationWithTimeout } from './notificationReducer'
import blogService from '../services/blogs'

//Needed without an actual database (MongoDB, json-server/axios, etc. )
/*
const blogsAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

*/

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (title, author, url, likes, id) => {
  return {
    title: title,
    author: author,
    url: url,
    likes: likes,
    id: getId(),
  
  }
}

//Initializing state with MongoDB
const initialState=[]

//Needed for initializing state without json-server/axios or MongoDB database
/*
const initialState = blogsAtStart.map(asObject)
console.log('Initial blog state after conversion to object:', initialState)
*/





//Old way to define reducers without @reduxjs/toolkit, see below and above comments
/*
export const createBlog = (title, author, url, likes, id) => {  
  return {
    type: 'NEW_BLOG',
      data: {
        title,
        author,
        url,
        likes,
        id
      }
  }
}


export const sortBlogs = (blogs) => { 
  {console.log('sortBlogs props:', blogs)}
 return {
    type: 'SORT_BLOGS',
    data: { blogs }
  }
}


const blogReducer = (state = initialState, action) => {
  
  switch(action.type) {
    
    case 'NEW_BLOG':
      console.log('state after attempting to create a new blog (and just before changing state): ', state)
      console.log('action after attempting to create a new blog (and just before changing state): ', action)
      
      const sortedBlogsAfterNewBlog=state.map(blog =>
        blog.id !== action.data ? blog : changedBlog
      ).sort((a,b) => a.likes - b.likes)

      console.log('sorted state after attempting to create a new blog (and just before changing state): ', state)
      console.log('action after attempting to create a new blog (and just before changing state): ', action)
      return [...sortedBlogsAfterNewBlog, action.data]
      return [...state, action.data]
    
    case 'LIKE_BLOG':
      const id = action.data.id
      const blogLikesToChange = state.find(n => n.id === id)
      const changedBlog = {
        ... blogLikesToChange,
        likes:  blogLikesToChange.likes+1
      }
      //console.log('state after attempting to like a blog (and just before changing state): ', state)
      //console.log('action after attempting to like for a blog (and just before changing state): ', action)
      
      const changedBlogs=state.map(blog =>
        blog.id !== id ? blog : changedBlog
      ).sort((a,b) => a.likes - b.likes)
        
        return changedBlogs
    
    //case 'SORT_BLOGS':
    //  const sortedBlogs=state.map(blog =>
    //    blog.id !== action.data ? blog : changedBlog
    //  ).sort((a,b) => a.likes - b.likes)
    //  return sortedBlogs
    
    default:
      //console.log('default blog reducer state: ', state)
      //console.log('default blog reducer action: ', action)
      return state

  }
}

*/

/*Better way to define reducers with @reduxjs/toolkit, see above and below comments*/

const blogSlice = createSlice({  
  name: 'blogs',  
  initialState,
  //blogs left empty below for json-server database/axios experiment 
  //initialState:[],
  reducers: {    
    //When not using Redux Thunk for blog creation with an asynchronous action creator, see also comments above and below
    /*createBlog(state, action) {      
      const content = action.payload      
      /*state.push({        
        title,
        author,
        url,
        likes,
        id:getId()
      })
     //Blogs with json-server/axios database experiment
      const id=getId()
      blogService.createNew(title, author, url, likes, id).then(
        state.push({
          title,
          author,
          url,
          likes,
          id:id
        })
      ).catch((error)=>{
          console.log('Problem with creating a new blog to the database:', error)
      }) 
      //state.push(action.payload)      
    },*/   
    likeBlog(state, action) {    
      console.log('id in likeBlog:', action.payload)  
      
      const id = action.payload     
      const blogLikesToChange = state.find(n => n.id === id)  
      console.log('likeBlog, blogLikesToChange:', blogLikesToChange) 
      const changedBlog = {
        ... blogLikesToChange,
        likes:  blogLikesToChange.likes+1
      }    

      //console.log('state after attempting to like a blog (and just before changing state): ', state)
      //console.log('action after attempting to like a blog (and just before changing state): ', action)
      console.log('liked blog state from createSlice:'. state)
      console.log('Store state from createSlice:', JSON.parse(JSON.stringify(state)))
      
        const changedBlogs=state.map(blog =>
          blog.id !== id ? blog : changedBlog
        ).sort((a,b) => a.likes - b.likes) 
        

        

        return changedBlogs
    }  
    ,
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) { 
      console.log('setting all blogs in front-end:', action.payload)
      //state.push(action.payload)     
      return action.payload    
    }
  }
})


//Old way to define reducers without "@reduxjs/toolkit", see above comments
//export default blogReducer

//When using @reduxjs/toolkit, see above comments
//export const {createBlog, likeBlog, appendBlog, setBlogs} = blogSlice.actions

//When also using @reduxjs/toolkit and Redux Thunk for async, see comments above and below
export const { likeBlog, appendBlog, setBlogs } = blogSlice.actions


//using React Thunk/asynchronous action creators
export const initializeBlogs = () => {  
  return async dispatch => {    
    const blogs = await blogService.getAll()    
    dispatch(setBlogs(blogs))
  }
}

//using React Thunk/asynchronous action creators
export const createBlog = (blogObject) => {  
  return async dispatch => { 
    try{  
      const returnedBlog = await blogService.create(blogObject)    

      console.log('createBlog, returned blog to be added to front-end after creating in back-end:', returnedBlog)

      try{
        const allBlogs = await blogService.getAll()
        console.log('createBlog, retrieving updated blogs after saving a new blog to back-end succeeded, attempting to update the list in front-end:', allBlogs)
        setBlogs(allBlogs.concat(returnedBlog))
        /*setErrorMessage('New blog: ' + blogObject.title + ' added')
                setTimeout(() => {
                  setErrorMessage(null)
        }, 3000)*/
        dispatch(setNotificationWithTimeout("New blog: " + blogObject.title + " added", 5000))
    
      } catch (error){
        console.log('Retrieving the updated blogs from back-end after saving a new blog to back-end failed:',error)
        dispatch(setNotificationWithTimeout(`Updating the blog list failed, please consider contacting the app owner`, 5000))
      }

      console.log('Created a new blog in database, attempting to add this blog to the list in front-end:', returnedBlog)
      dispatch(appendBlog(returnedBlog))  
    } catch (error){
      console.log('Creating a new blog in back-end failed:', error)
      dispatch(setNotificationWithTimeout(`Adding a new blog failed, check that the likes field is a number and does not contain letters, if this doesnt work, try to relog in`, 5000))
    }

    /*blogService
      .create(blogObject)
      .then((returnedBlog) => {
        console.log('createBlog, returned blog to be added to front-end after creating in back-end')
        blogService.getAll()
          .then((allBlogs) => { 
            console.log('createBlog, retrieving updated blogs after saving a new blog to back-end succeeded, attempting to update the list in front-end')
            setBlogs(allBlogs.concat(returnedBlog))
            
            //setErrorMessage('New blog: ' + blogObject.title + ' added')
            //setTimeout(() => {
            //  setErrorMessage(null)
            //}, 3000)
            dispatch(setNotificationWithTimeout("New blog: " + blogObject.title + " added", 5000))
          })
          .catch((error) => {
            console.log('Retrieving the updated blogs from back-end after saving a new blog to back-end failed:',error)
            dispatch(setNotificationWithTimeout(`Updating the blog list failed, please consider contacting the app owner`, 5000))
          })
      })
      .catch((error) => {
        //setErrorMessage(
        //  'Adding a new blog failed, check that the likes field is a number and does not contain letters, if this doesnt work, try to relog in'
        //)
        //
        //console.log('Adding a new blog failed')
        //setTimeout(() => {
        //  setErrorMessage(null)
        //}, 3000)
        console.log('Creating a new blog in back-end failed:', error)
        dispatch(setNotificationWithTimeout(`Adding a new blog failed, check that the likes field is a number and does not contain letters, if this doesnt work, try to relog in`, 5000))
        
      })
    console.log('Created a new blog in database, attempting to add this blog to the list in front-end:', Blog)
    dispatch(appendBlog(newBlog))*/  
  }
}

//using React Thunk/asynchronous action creators
export const updateBlog = (id, blogToUpdate) => {
  console.log('updateBlog, blog id:', id)
  console.log('updateBlog, blogToUpdate:', blogToUpdate)

  //TODO: this is just for reference, don't use promise syntax with async
  /*blogService
    .update(blogToUpdate.id, blogObject)
    .then((updatedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      let blogtoupdateindex = blogs.indexOf(blogToUpdate[0])
      const updatedBlogs = [...blogs]
      updatedBlogs[blogtoupdateindex] = updatedBlog
      //Update shown list
      setBlogs(updatedBlogs)
      //setErrorMessage(
      //  'Blog: ' + blogObject.title + ' like button pressed, likes increased'
      //)
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 3000)
      dispatch(setNotificationWithTimeout("Blog" + blogObject.title + " like button pressed, likes increased", 5000))
      console.log('Updated blog list after adding a like: ', updatedBlogs)
    })
    .catch((error) => {
      //setErrorMessage('Liking the blog failed')
      //console.log('Liking a new blog failed, error:', error)
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 3000)
      console.log('Liking a new blog failed, error:', error)
      dispatch(setNotificationWithTimeout(`Liking the blog failed`, 5000))
      })*/
  
  

    return async dispatch => {   
      try{ 
      const updatedBlog = await blogService.update(id, blogToUpdate)
      console.log('blog like saved in database, attempting to update this blog in front-end:', updatedBlog)    
      dispatch(likeBlog(updatedBlog.id))
      dispatch(setNotificationWithTimeout("blog liked: " + updatedBlog.title, 5000))  
   
      }catch(error){
        console.log("updateBlog, failed to update blog in back-end:", error)  
        dispatch(setNotificationWithTimeout("Liking a blog failed: " + blogToUpdate.title, 5000))
   
    }


    
  }
}



export default blogSlice.reducer