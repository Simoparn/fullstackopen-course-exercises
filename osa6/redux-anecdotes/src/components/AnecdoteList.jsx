import { useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
//Old way without @reduxjs/toolkit, see below comments
//import { voteAnecdote } from '../reducers/anecdoteReducer'
//import { filterChange } from '../reducers/anecdoteFilterReducer'
import anecdoteReducer, { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

/*const dispatch = useDispatch()  
useEffect(() => {
  setTimeout(
    ()=>dispatch(setNotification(''),5000)
  )
}, [dispatch])*/

const Anecdote = ({ anecdote, handleClick }) => {
  //console.log('single Anecdote:', anecdote)
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
    
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if ( filter === '' ) {
      console.log('filter empty, all anecdotes: ', anecdotes, ', filter:', filter)
      return anecdotes
    }
    console.log('filter not empty, all anecdotes: ', anecdotes, ', filter:', filter)
    //console.log('anecdotes map:', anecdotes.map(anecdote => anecdote.content))
  
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    
  })

  const dispatch = useDispatch()  
  /*useEffect(() => {
    const timer = setTimeout(()=> dispatch(setNotification(''),5000))
    return () => clearTimeout(timer)
    }, [dispatch])*/

   const handleNotificationTimeout = () => {
      console.log('Started notification timeout')
      setTimeout(()=>{dispatch(setNotification(''))},5000)
      //return () => clearTimeout(timer)
   }
    

console.log('Anecdotes after filtering and right before rendering:', anecdotes)
//console.log('anecdote list length:', anecdotes.length)
  return(
    <>
    <h2>Anecdotes</h2>
    
    {
    anecdotes.map(anecdote =>
      <Anecdote key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(anecdote.content))
        handleNotificationTimeout("")
      }
    }
      />
    )}
    </>
    
  )
}

export default AnecdoteList