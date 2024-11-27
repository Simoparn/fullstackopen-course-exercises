import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/anecdoteFilterReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  console.log('single Anecdote:', anecdote)
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
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if ( filter === '' ) {
      console.log('filter empty, anecdotes: ', anecdotes, ', filter:', filter)
      return anecdotes
    }
    console.log('filter not empty, anecdotes: ', anecdotes, ', filter:', filter)
    console.log('anecdotes map:', anecdotes.map(anecdote => anecdote.content))
    /*return anecdotes*/
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    
  })

console.log('anecdotes right before rendering:', anecdotes)
console.log('anecdote list length:', anecdotes.length)
  return(
    <>
    <h2>Anecdotes</h2>
    {/*console.log('a:', 
    anecdotes.sort())*/}
    {
    anecdotes.map(anecdote =>
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