import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import allUsersInfoReducer from './reducers/allUsersInfoReducer'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer,
    allUsersInfo: allUsersInfoReducer    
      
  }
})

export default store