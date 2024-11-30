import ReactDOM from 'react-dom/client'
//Without @reduxjs/toolkit
//import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'
/*import anecdoteRadioFilterReducer from './reducers/anecdoteRadioFilterReducer'*/
import { filterChange } from './reducers/anecdoteFilterReducer'
/*import { radioFilterChange } from './reducers/anecdoteRadioFilterReducer'*/



//Without @reduxjs/toolkit, see also comment above
/*const combinedReducer = combineReducers({  
  anecdotes: anecdoteReducer,  
  filter: anecdoteFilterReducer
})

const store = createStore(combinedReducer)*/

const store = configureStore({  
  reducer: {    
    notification: notificationReducer,
    anecdotes: anecdoteReducer,    
    filter: anecdoteFilterReducer  
  }
})


store.subscribe(() => console.log('state store at beginning:', store.getState()))
store.dispatch(filterChange(''))
//store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)