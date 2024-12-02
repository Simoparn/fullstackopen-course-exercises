import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    anecdotes: anecdoteReducer,    
    filter: anecdoteFilterReducer  
  }
})

export default store