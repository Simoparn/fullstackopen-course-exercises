import { useQuery, /* useMutation, useQueryClient */ } from '@tanstack/react-query'
//import { useReducer } from 'react'
import { getAnecdotes, /* createAnecdote, updateAnecdote */ } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import VoteButton from './components/VotesButton'
import { NotificationContextProvider } from './NotificationContext'

const App = () => {

  
/*
  const queryClient = useQueryClient()


  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: () => {     
       queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  
  const handleVote = (anecdote) => {
    //console.log('vote:', anecdote)
    
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
  }
*/


  //const [anecdote, anecdoteDispatch] = useReducer(anecdoteReducer, 0)

  

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    //queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)  
    queryFn: getAnecdotes,
    /*If attempting multiple connection tries to database before error message is unwanted 
    retry: false,*/
    //anecdotes state can be updated with this whenever a new element, such as the note input field is selected
    refetchOnWindowFocus: false
  })  
  console.log('useQuery status (parsed and stringified):', JSON.parse(JSON.stringify(result)))


  if ( result.isLoading ) {    
    //const queryState = queryClient.getQueryState(['anecdotes'])
    //console.log('useQuery still loading, checking query state just before rendering application:', queryState)
    
    return <div>loading data...</div>  
  }

  if (result.isError) {
    //const queryState = queryClient.getQueryState(['anecdotes'])
    //console.log(', useQuery failed, checking query state just before rendering application:', queryState)
    
    return <div>ERROR: anecdote service not available due to problems in server</div>
  }

  /*if(result.isFetched) {

    const queryState = queryClient.getQueryState(['anecdotes'])
    console.log('useQuery successful, checking query state just before rendering application:', queryState)

  }*/

  

  const anecdotes=result.data
  console.log('anecdotes retrieved from database:', anecdotes)

  const sortedAnecdotesOnFrontend=anecdotes.sort((a,b) => a.votes - b.votes) 
  console.log('sorted anecdotes on front-end for rendering:', sortedAnecdotesOnFrontend)

  return ( 
      <div>
         <NotificationContextProvider>
          <h3>Anecdote app with React Query</h3>
          <Notification />
          <AnecdoteForm />   
          {sortedAnecdotesOnFrontend.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                {/*<button onClick={() => handleVote(anecdote)}>vote</button>*/}
                <VoteButton type="submit" label="vote" anecdote={anecdote}/>
              </div>
            </div>
          )}
        </NotificationContextProvider>
      </div> 
      
  )
}

export default App
