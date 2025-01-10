import { useDispatch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { setNotificationWithTimeout } from './notificationReducer'
import { initializeBlogs, getUserBlogs } from './blogReducer'
import userService from '../services/users'
import blogService from '../services/blogs'


const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (id) => {
  return {
    
    id: getId(),
  
  }
}

//Initializing state with MongoDB
const initialState=[]






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


const allUsersInfoSlice = createSlice({  
  name: 'allUsersInfo',  
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

    setAllUsersInfo(state, action){
      console.log("setAllUsersInfo, user state just before setting user in front-end:",state)
      console.log('information for all users set for the front-end:', action.payload)   
      const changedAllUsersInfo=action.payload
      return changedAllUsersInfo
      //state.push(action.payload)
    }

     
  
  }
})


//Old way to define reducers without "@reduxjs/toolkit", see above comments
//export default userReducer

//When using @reduxjs/toolkit, see above comments
//export const { setUser, } = userSlice.actions

//When also using @reduxjs/toolkit and Redux Thunk for async, see comments above and below
export const { setAllUsersInfo } = allUsersInfoSlice.actions




//using React Thunk/asynchronous action creators
/*export const initializeUser = () => {  
  return async dispatch => {       
    dispatch(setUser({token:null, user:null, username:null}))
  }
}*/


//using React Thunk/asynchronous action creators
//Needed for Userssummary component

export const getAllUsers = () => {
  return async dispatch => { 
    const allUsers = await userService.getAll()
    console.log("allUsersInfoReducer, getAllUsers, all users:", allUsers)
    dispatch(setAllUsersInfo(allUsers))
  }  
}





export default allUsersInfoSlice.reducer