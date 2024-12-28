
import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart=""


const initialState = notificationAtStart
console.log('Initial notification at start:', initialState)





const notificationSlice = createSlice({  
    name: 'notification',  
    initialState,  
    reducers: {    
      
      setNotification(state, action) {  
        console.log('notification set for the blog:', action.payload)    
        const content = action.payload      
        const notification = content
        return notification
      },
      //When not using asynchronous action creator with an import in components, see comments below
      /*clearNotification(state, action) {
        console.log('Started notification timeout, state:', state)
        const emptiedNotification=action.payload
        return emptiedNotification
  
      }*/
    }  
})

  
  
  //Old way to define reducers without "@reduxjs/toolkit", see above comments
  //export default notificationReducer
  
  //Needed only without using React Thunk/aynschronous action creators, since no other action creators are needed, see comments above and below
  export const {setNotification} = notificationSlice.actions


  //using @reduxjs/toolkit and React Thunk/asynchronous action creators
  export const setNotificationWithTimeout = (content, timeout) => {  
    return async dispatch => {    
        console.log('notification set for the blog:', content)
        console.log('notification timeout set:', timeout)          
        dispatch(setNotification(content))
        setTimeout(() => { 
          dispatch(setNotification(''))
        }, timeout)
    }
  }

  export default notificationSlice.reducer