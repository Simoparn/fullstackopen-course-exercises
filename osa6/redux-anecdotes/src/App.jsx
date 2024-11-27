import Notification from './components/Notification'
import Filter from './components/filter.jsx'
/*import VisibilityRadioFilter from './components/VisibilityRadioFilter'*/
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
/*import { createAnecdote, voteAnecdote} from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'*/

const App = () => {


  
  
  
  

  return (
    <div>
      <Filter />
      {/*<VisibilityRadioFilter />*/}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App