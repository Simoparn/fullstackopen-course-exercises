import { useDispatch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { setNotificationWithTimeout } from './notificationReducer'
import { initializeBlogs, getUserBlogs } from './blogReducer'
import userService from '../services/login'
import blogService from '../services/blogs'


const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (id) => {
  return {
    
    id: getId(),
  
  }
}

//Initializing state with MongoDB
const initialState={token:null, user:null, username:null}






//Old way to define reducers without @reduxjs/toolkit, see below and above comments
/*
export const createUser = (title, author, url, likes, id) => {  
  return {
    type: 'NEW_USER',
      data: {
          token,
          username,
          name                   
          
      }
  }
}



const userReducer = (state = initialState, action) => {
  
  switch(action.type) {
    
    case 'USER_LOGGED_IN':
      console.log('state after attempting to add a logged in user (and just before changing state): ', state)
      console.log('action after attempting to add a logger in user (and just before changing state): ', action)
      
      const sortedUsersAfterNewUser=state.map(user =>
        user.id !== action.data ? user : changedUser
      ).sort((a,b) => a.likes - b.likes)

      console.log('sorted state after attempting to add a logged in user (and just before changing state): ', state)
      console.log('action after attempting to add a logged in user (and just before changing state): ', action)
      return [...sortedUsersAfterNewUser, action.data]
      return [...state, action.data]
  

  }
}

*/

/*Better way to define reducers with @reduxjs/toolkit, see above and below comments*/

const userSlice = createSlice({  
  name: 'users',  
  initialState,
  //users left empty below for json-server database/axios experiment 
  //initialState:[],
  reducers: {    
    //When not using Redux Thunk for user creation with an asynchronous action creator, see also comments above and below
    /*createUser(state, action) {      
      const content = action.payload      
      /*state.push({       
        token,
        username,
        name
      })
     //logged-in users with json-server/axios database experiment
      const id=getId()
      userService.createNew(token, username, name).then(
        state.push({
          token,
          username,
          name
        })
      ).catch((error)=>{
          console.log('Problem with adding a new logged-in user to the front-end:', error)
      }) 
      //state.push(action.payload)      
    },*/  

    setUser(state, action){
      console.log("setUser, user state just before setting user in front-end:",state)
      console.log('logged-in user set for the front-end:', action.payload)   
      const changedUser=action.payload
      return changedUser
      //state.push(action.payload)
    }/*,

    setUserName(state, action){
      console.log('username of the logged-in user set for the front-end:', action.payload) 
      return state.concat(action.payload)  
      //state.push(action.payload)
    },

    setPassword(state, action){
      console.log('logged-in user password set for the front-end:', action.payload)   
      return state.concat(action.payload)
      //state.push(action.payload)
    },*/
     
  
  }
})


//Old way to define reducers without "@reduxjs/toolkit", see above comments
//export default userReducer

//When using @reduxjs/toolkit, see above comments
//export const { setUser, } = userSlice.actions

//When also using @reduxjs/toolkit and Redux Thunk for async, see comments above and below
export const { setUser, /*setUsername, setPassword*/ } = userSlice.actions




//using React Thunk/asynchronous action creators
/*export const initializeUser = () => {  
  return async dispatch => {       
    dispatch(setUser({token:null, user:null, username:null}))
  }
}*/


//using React Thunk/asynchronous action creators
export const loginUser = (username, password) => {  
  return async dispatch => { 
    try{  
      
      const user = await userService.login({
        username,
        password,
      })
      console.log('User after login in loginUser:', user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log('User credentials browser cache after login in handleLogin:', window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(getUserBlogs())
      dispatch(setNotificationWithTimeout(`'${user.username}' logged in successfully`, 5000))
    } catch (error) {
      //console.log('Exception', exception)
      /*setErrorMessage('login failed, wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
      dispatch(setNotificationWithTimeout("login failed, wrong credentials", 5000))
      console.log("login failed, wrong credentials:", error)
    }

    /*userService
      .login(credentialsObject)
      .then((returnedUser) => {
        console.log('loginUser, returned user to be added to the list of logged-in users in front-end after login succeeded in back-end')
        setUsers(allUsers.concat(returnedBlog))
            
          //setErrorMessage('User logged in: ' +returnedUser)
          //setTimeout(() => {
          //  setErrorMessage(null)
          //}, 3000)
          dispatch(setNotificationWithTimeout("User logged in:"+returnedUser.name, 5000))
        })
      })
      .catch((error) => {
        //setErrorMessage(
        //  'User login failed'
        //)
        //
        //console.log('User login failed')
        //setTimeout(() => {
        //  setErrorMessage(null)
        //}, 3000)
        console.log('logging a new user failed:', error)
        dispatch(setNotificationWithTimeout(`User login failed`, 5000))
        
      })
    console.log('Login check succeeded in back-end, attempting to add this user to the list of logged-in users in front-end:', User)
    dispatch(appendUser(returnedUser))*/  
  }
}

//using React Thunk/asynchronous action creators
export const logoutUser = (username) => {

  return async ( dispatch, getState ) => {
    try {
      console.log('logoutUser, getState:', getState)
      
    
      window.localStorage.removeItem('loggedBlogappUser')
      console.log(
        'User credentials browser cache after logout in logoutUser:', window.localStorage.getItem('loggedBlogappUser'))

      blogService.setToken("")
      dispatch(setUser({token:null, user:null, username:null}))
      dispatch(initializeBlogs())
      //setUsername('')
      //setPassword('')
      //setErrorMessage('logged out')¨
      dispatch(setNotificationWithTimeout(`logged out successfully`, 5000))
      
    }catch(error){
      console.log('Logout error', error)
      /*setErrorMessage('Error while logging out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
      dispatch(setNotificationWithTimeout(`Error while logging out`, 5000))
    }
  }
}
  




export default userSlice.reducer