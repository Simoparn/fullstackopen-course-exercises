import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'
/*import anecdoteRadioFilterReducer from './reducers/anecdoteRadioFilterReducer'*/
import { createAnecdote } from './reducers/anecdoteReducer'
import { filterChange } from './reducers/anecdoteFilterReducer'
/*import { radioFilterChange } from './reducers/anecdoteRadioFilterReducer'*/



//store.subscribe(() => console.log(store.getState()))
//store.dispatch(filterChange(''))
//store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))


const combinedReducer = combineReducers({  
  anecdotes: anecdoteReducer,  
  filter: anecdoteFilterReducer
})

const store = createStore(combinedReducer)

store.subscribe(() => console.log('state store at beginning:', store.getState()))
store.dispatch(filterChange(''))
store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)