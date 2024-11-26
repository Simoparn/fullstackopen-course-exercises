import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteVoteButton = (props) => {
  
  const dispatch = useDispatch()
  
  const addAnecdoteVote = (event) => {
    event.preventDefault()
    console.log('event.target.anecdote after voting:', event.target.anecdote.value)
    const content = event.target.anecdote.value
    
    dispatch(voteAnecdote(content))  
  }

  return (
      <form onSubmit={addAnecdoteVote}>
        
        <input name="vote" />
        <button type="submit">add</button>
      </form>
  )
}

export default AnecdoteVoteButton