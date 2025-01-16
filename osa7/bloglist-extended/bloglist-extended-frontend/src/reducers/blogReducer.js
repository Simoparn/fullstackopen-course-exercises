import { useDispatch, /*useSelector*/ } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { logoutUser } from './userReducer'
import { setNotificationWithTimeout } from './notificationReducer'
import { getAllBlogs } from './allBlogsInfoReducer'
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


const asObject = (title, author, url, likes, comments, id) => {
  return {
    title: title,
    author: author,
    url: url,
    likes: likes,
    comments:comments,
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
    //TODO: state.find is likely null (need state.data?)
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
    },
    commentBlog(state, action) {    
      
      const id = action.payload.blogCommentObject.blogId
      const blogComment = action.payload.blogCommentObject.blogComment
      const allBlogs=action.payload.allBlogs

      console.log('blog id in commentBlog:', id)
      console.log('comment in commentBlog:', blogComment)    
      console.log("commentBlog, blogs state just before adding the comment for the blog in frontend:", allBlogs)
      //console.log("commentBlog, blogs state just before adding the comment for the blog in frontend:", state)
      
      const blogCommentsToChange = allBlogs.find(n => n.id === id)  
      //const blogCommentsToChange = state.find(n => n.id === blogId)  
      console.log('commentBlog, blogCommentsToChange:', blogCommentsToChange)
      const changedBlog = {
        ... blogCommentsToChange,
        comments:  blogCommentsToChange.comments.concat(blogComment)
      }    
      console.log('commentBlog, changed blog comments after commenting:', changedBlog)

      const changedBlogs=allBlogs.map(blog =>
        blog.id !== id ? blog : changedBlog)
      //const changedBlogs=state.map(blog =>
      //  blog.id !== id ? blog : changedBlog)

      console.log('commentblog, all blogs after changing the commented blog:', changedBlogs)
      return changedBlogs

    },
    appendBlog(state, action) {
      const newBlogListAfterAppend=state.concat(action.payload)
      return newBlogListAfterAppend
      //state.push(action.payload)
    },
    setBlogs(state, action) { 
      console.log('setBlogs, setting all blogs for the current user in front-end:', action.payload)
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
export const { likeBlog, commentBlog, appendBlog, setBlogs } = blogSlice.actions









//using React Thunk/asynchronous action creators
export const initializeBlogs = () => {  
  return async dispatch => {    
    dispatch(setBlogs([]))
  }
}


export const getUserBlogs = () => {
  
    return async dispatch => {  
      
      const blogs = await blogService.getUserBlogs()    
      
      console.log('geTUserBlogs, blogs response:', blogs)
      
      //This is needed if the returned value is the status error caused by empty tokens (status code 400) or the 
      // cached browser token has been expired (jwt.verify -> TokenExpiredError -> status code 500), which
      //cause an errorMessage field to be sent in the response
      
      if(blogs instanceof Array){
        console.log('user blogs (response data) is an array, error message not found, it is safe to set the blog state with response')
        dispatch(setBlogs(blogs))
      }
      else{
        console.log('user blogs (response data) is not an array, blog state must be left empty')
        
        //No error message should be shown in the browser if the token was empty, which is always the case when using the application first the time and no valid token is cached     
        
        if(blogs==='No user token, cannot retrieve blogs for the user'){
            console.log("No user token, cannot retrieve blogs for the user")
         }   
        
        else if(blogs==='Error while retrieving blogs for the user, token expired or invalid token'){
        
          console.log('expired or invalid token, cannot retrieve blogs for the user')
          dispatch(logoutUser())
          dispatch(setNotificationWithTimeout('Error while retrieving blogs for the user, token expired or invalid token', 5000))
        }
        dispatch(setBlogs([]))
      }
      
      
    }
    

}







//Needed for Userinfo component
/*export const getBlogsByUserId = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
  }
}*/





//using React Thunk/asynchronous action creators
export const createBlog = (blogObject) => {  
  return async dispatch => { 
    try{  
      const returnedBlog = await blogService.create(blogObject)    

      console.log('createBlog, returned blog to be added to front-end after creating in back-end:', returnedBlog)

      try{
        const allBlogs = await blogService.getUserBlogs()
        console.log('createBlog, retrieving updated blogs after saving a new blog to back-end succeeded, attempting to update the list in front-end:', allBlogs)
        setBlogs(allBlogs.concat(returnedBlog))
        /*setErrorMessage('New blog: ' + blogObject.title + ' added')
                setTimeout(() => {
                  setErrorMessage(null)
        }, 3000)*/

    
      } catch (error){
        console.log('Retrieving the updated blogs from back-end after saving a new blog to back-end failed:',error)
        dispatch(setNotificationWithTimeout(`Updating the blog list failed, please consider contacting the app owner`, 5000))
      }

      console.log('Created a new blog in database, attempting to add this blog to the list in front-end:', returnedBlog)
      dispatch(appendBlog(returnedBlog))  
      dispatch(setNotificationWithTimeout("New blog: " + blogObject.title + " added", 5000))
    } catch (error){
      console.log('Creating a new blog in back-end failed:', error)
      dispatch(setNotificationWithTimeout(`Adding a new blog failed, check that 1) the likes field is a number and does not contain letters 2) the URL field is not empty.`, 5000))
    }

    /*blogService
      .create(blogObject)
      .then((returnedBlog) => {
        console.log('createBlog, returned blog to be added to front-end after creating in back-end')
        blogService.getUserBlogs()
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
        //  'Adding a new blog failed, check that 1) the likes field is a number and does not contain letters 2) the URL field is not empty.'
        //)
        //
        //console.log('Adding a new blog failed')
        //setTimeout(() => {
        //  setErrorMessage(null)
        //}, 3000)
        console.log('Creating a new blog in back-end failed:', error)
        dispatch(setNotificationWithTimeout(`Adding a new blog failed, check that 1) the likes field is a number and does not contain letters 2) the URL field is not empty.`, 5000))
        
      })
    console.log('Created a new blog in database, attempting to add this blog to the list in front-end:', Blog)
    dispatch(appendBlog(newBlog))*/  
  }
}

//using React Thunk/asynchronous action creators
export const updateBlog = (id, blogToUpdate) => {
  console.log('updateBlog, blog id:', id)
  console.log('updateBlog, blogToUpdate:', blogToUpdate)

  
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

export const removeBlog = (id) => {

  return async dispatch => {
    try {

      console.log("removeBlog, removed blog id:", id)

 



      const deletedBlog=blogService.deleteBlog(id)
      const allBlogs = await blogService.getUserBlogs()
      const blogsAfterRemove = allBlogs.filter(
        (listblog) => listblog.id.toLowerCase() !== id
      )

      /*allBlogs.forEach(
        (listblog)=>console.log("removeBlog blog in original list:", listblog)
      )*/

      const deletableBlogObject = allBlogs.find(
        (listblog) => listblog.id.toLowerCase() === id 
      )

      console.log("removeBlog, blog object for front-end removal:", deletableBlogObject)
      
      const deletedBlogName = deletableBlogObject.title
      
      console.log("removeBlog, blog name for front-end removal:", deletableBlogObject.title)

      //Update shown list after delete
      dispatch(setBlogs(blogsAfterRemove))
      /*setNotificationWithTimeoutMessage('Blog: ' + blogObject.title + ' removed successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)*/
      dispatch(setNotificationWithTimeout("Blog: " + deletedBlogName + " removed successfully", 5000))
      console.log(
        'Blog list after deleting, ',
        blogsAfterRemove.length,
        ' blogs:',
        blogsAfterRemove
      )     
    }catch(error){
      /*setErrorMessage('Removing the blog failed')
      console.log('Removing the blog failed', error)
      setTimeout(() => {
      setErrorMessage(null)
      }, 3000)*/
      dispatch(setNotificationWithTimeout("Removing the blog failed", 5000))
      console.log('Removing the blog failed', error)
    }
  }
}
  

export const addBlogComment = (blogCommentObject) => {
  return async (dispatch, getState) => {
    try{
      //const state=getState()
      console.log('addBlogComment, commentObject before adding comment to backend:', blogCommentObject)
      //console.log("addBlogComment, blogs state before adding comment to backend:", state)
      const commentedBlog = await blogService.addBlogComment(blogCommentObject)
     
      const allBlogs=getState().blogs
      dispatch(commentBlog({blogCommentObject, allBlogs}))
      dispatch(getAllBlogs())
      dispatch(setNotificationWithTimeout("Commented a blog successfully: " + blogCommentObject.blogId, 5000))
      
      //dispatch(blogService.addBlogComment)
    }catch(error){
      console.log('Commenting a blog failed, error:', error)
      dispatch(setNotificationWithTimeout("Commenting a blog failed: " + blogCommentObject.blogId, 5000))
    }
  }
}


export default blogSlice.reducer