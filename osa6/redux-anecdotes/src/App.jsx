import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/newAnecdote'
import { createAnecdote, voteAnecdote} from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {


  
  const addAnecdote = (event) => {
    
    event.preventDefault()

    //New way with createNote function (action creators)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content)) 
    

  }

  const addAnecdoteVote = (id) => {

    event.preventDefault()

    dispatch(voteAnecdote(id)) 
  }
  
  

  return (
    <div>
    
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App