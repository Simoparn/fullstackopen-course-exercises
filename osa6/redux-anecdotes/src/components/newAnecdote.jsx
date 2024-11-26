import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    console.log('After trying to add a new anecdote in event handler:', event.target.anecdote.value)
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))  
  }

  return (
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
  )
}

export default NewAnecdote