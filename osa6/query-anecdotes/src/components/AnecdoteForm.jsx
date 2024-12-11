import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import VoteButton from './VotesButton'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'



/*const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))*/


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)
  
const newAnecdoteMutation = useMutation({
  mutationFn: createAnecdote,
  onSuccess: (newAnecdote) => {
    const queryState = queryClient.getQueryState(['anecdotes'])
    console.log('Checkin query state just before saving a new anecdote:', queryState)
    //useful for getting rid of unnecessary extra GET, just use the notes state that is already in front-end
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    console.log('anecdotes state from back-end just before updating in front-end:', anecdotes)
    queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        
  },
  onError: (message) => {
    console.log('Error while trying to save a new anecdote', message)
    dispatch({type:"submit", payload:"ERROR: anecdote must be at least 5 characters long."})
    setTimeout(()=>{
      dispatch({type:"submit", payload:""})
    },5000)
  }
})

//NOTE: id's (mix of numbers, letters etc.) are produced automatically, this seems to be handled by axios
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote just before attempting saving to back-end:', content)
    /*id:getId(),*/
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        {/*<VotesButton  type="submit" label="create" anecdote={anecdote}/>*/}
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
