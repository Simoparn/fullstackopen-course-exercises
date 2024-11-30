
import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart=""


const initialState = notificationAtStart
console.log('Initial notification at start:', initialState)




const notificationSlice = createSlice({  
    name: 'notification',  
    initialState,  
    reducers: {    
      setNotification(state, action) {  
        console.log('notification set for the anecdote:', action.payload)    
        const content = action.payload      
        const notification = content
        return notification
      },
      /*handleNotificationTimeout(state, action) {
        console.log('Started notification timeout, state:', state)
        const emptiedNotification=action.payload
        return emptiedNotification
  
      }*/
    }  
})
  
  
  //Old way to define reducers without "@reduxjs/toolkit", see above comments
  //export default anecdoteReducer
  export const {setNotification} = notificationSlice.actions
  export default notificationSlice.reducer