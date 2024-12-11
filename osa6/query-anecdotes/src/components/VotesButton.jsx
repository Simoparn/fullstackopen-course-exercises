import { useContext } from "react"
import { useQueryClient, useMutation } from '@tanstack/react-query'
import  NotificationContext  from '../NotificationContext'
import { updateAnecdote } from '../requests'
//import { useAnecdoteDispatch } from '../anecdoteContext'







/*const handleVote = (type, anecdote) => {
  //console.log('vote:', anecdote)
    
  updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
  dispatch({ type })
}*/




const VoteButton = ( { type, label, anecdote } ) => {
    const queryClient = useQueryClient()
    const [notification, dispatch] = useContext(NotificationContext)


    

  const handleVote = ({ type }, anecdote) => {
    
    console.log('handleVote, vote for:', anecdote.content)
    console.log('handleVote, action:', type)
    console.log('handleVote, notification:', notification)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
    dispatch({ type, payload:"Voted for anecdote: '"+anecdote.content+"'" })
    setTimeout(()=>{
      dispatch({type, payload:""})
    }, 5000)
  }

  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: () => {     
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  

    //const dispatch = useAnecdoteDispatch()
    //console.log('VoteButton, notification context:', NotificationContext)
    //console.log('VoteButton, action type:', type)
    //console.log('VoteButton, notification state:', notification)
    //console.log('VoteButton, dispatch function:', dispatch)
    return (
      <button onClick={
        () => handleVote({ type }, anecdote )}>
        {label}
      </button>
    )
  }

export default VoteButton