import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()  
  const anecdotes = useSelector(state => state)
  console.log('anecdotes right before rendering:', anecdotes)
  return(
    <>
    <h2>Anecdotes</h2>
    {/*console.log('sorted anecdotes state in reducer right before return:', 
    anecdotes.sort())*/}
    {anecdotes.map(anecdote =>
      <Anecdote key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => {
        dispatch(voteAnecdote(anecdote.id))}}
      />
    )}
    </>
    
  )
}

export default AnecdoteList