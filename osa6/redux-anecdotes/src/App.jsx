import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter.jsx'
/*import VisibilityRadioFilter from './components/VisibilityRadioFilter'*/
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {


  
  const dispatch = useDispatch()  
  
  useEffect(() => {    
      //Without Redux Thunk in the reducer      
      //noteService
      //  .getAll().then(anecdotes => dispatch(setAnecotes(anecdotes)))  
      dispatch(initializeAnecdotes())
    }, [])
  
  

  return (
    <div>
      <AnecdoteFilter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App