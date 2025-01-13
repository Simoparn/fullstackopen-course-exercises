import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import allUsersInfoReducer from './reducers/allUsersInfoReducer'
import allBlogsInfoReducer from './reducers/allBlogsInfoReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer,
    allUsersInfo: allUsersInfoReducer,
    allBlogsInfo: allBlogsInfoReducer    
      
  }
})

export default store