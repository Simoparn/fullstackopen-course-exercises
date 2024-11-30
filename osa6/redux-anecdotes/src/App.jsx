import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter.jsx'
/*import VisibilityRadioFilter from './components/VisibilityRadioFilter'*/
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
/*import { createAnecdote, voteAnecdote} from './reducers/anecdoteReducer'*/

const App = () => {


  
  
  
  

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