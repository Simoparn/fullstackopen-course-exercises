import { useDispatch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotesService'
//Needed without json-server/axios database
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

*/

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//Needed without json-server/axios database
/*
const initialState = anecdotesAtStart.map(asObject)
console.log('Initial anecdote state after conversion to object:', initialState)
*/



//Old way to define reducers without @reduxjs/toolkit, see below and above comments
/*
export const createAnecdote = (content) => {  
  return {
    type: 'NEW_ANECDOTE',
      data: {
        content,
        //important: false,
        votes: 0,
        id: getId()
      }
  }
}

export const voteAnecdote = (id) => { 
  //{console.log('voteAnecdote props:', id)}
 return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const sortAnecdotes = (anecdotes) => { 
  {console.log('sortAnecdote props:', anecdotes)}
 return {
    type: 'SORT_ANECDOTES',
    data: { anecdotes }
  }
}


const anecdoteReducer = (state = initialState, action) => {
  
  switch(action.type) {
    
    case 'NEW_ANECDOTE':
      console.log('state after attempting to create a new anecdote (and just before changing state): ', state)
      console.log('action after attempting to create a new anecdote (and just before changing state): ', action)
      
      const sortedAnecdotesAfterNewAnecdote=state.map(anecdote =>
        anecdote.id !== action.data ? anecdote : changedAnecdote
      ).sort((a,b) => a.votes - b.votes)

      console.log('sorted state after attempting to create a new anecdote (and just before changing state): ', state)
      console.log('action after attempting to create a new anecdote (and just before changing state): ', action)
      return [...sortedAnecdotesAfterNewAnecdote, action.data]
      return [...state, action.data]
    
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteVoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ... anecdoteVoteToChange,
        votes:  anecdoteVoteToChange.votes+1
      }
      //console.log('state after attempting to vote for an anecdote (and just before changing state): ', state)
      //console.log('action after attempting to vote for an anecdote (and just before changing state): ', action)
      
      const changedAnecdotes=state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((a,b) => a.votes - b.votes)
        
        return changedAnecdotes
    
    //case 'SORT_ANECDOTES':
    //  const sortedAnecdotes=state.map(anecdote =>
    //    anecdote.id !== action.data ? anecdote : changedAnecdote
    //  ).sort((a,b) => a.votes - b.votes)
    //  return sortedAnecdotes
    
    default:
      //console.log('default anecdote reducer state: ', state)
      //console.log('default anecdote reducer action: ', action)
      return state

  }
}

*/

/*Better way to define reducers with @reduxjs/toolkit, see above and below comments*/

const anecdoteSlice = createSlice({  
  name: 'anecdotes',  
  //initialState,
  //Anecdotes left empty here for json-server database/axios experiment 
  initialState:[],
  reducers: {    
    //When not using Redux Thunk for anecdote creation with an asynchronous action creator, see also comments above and below
    /*createAnecdote(state, action) {      
      const content = action.payload      
      /*state.push({        
        content,        
        votes:0,        
        id: getId(),
      })
     //Anecdotes with json-server/axios database experiment
      const id=getId()
      anecdoteService.createNew(content, id).then(
        state.push({
          content,
          votes:0,
          id:id})
      ).catch((error)=>{
          console.log('Problem with creating a new anecdote to the database:', error)
      }) 
      //state.push(action.payload)      
    },*/   
    voteAnecdote(state, action) {    
      console.log('id in voteAnecdote:', action.payload)  
      
      const id = action.payload     
      const anecdoteVoteToChange = state.find(n => n.id === id)  
      console.log('voteAnecdote, anecdoteVoteToChange:', anecdoteVoteToChange) 
      const changedAnecdote = {
        ... anecdoteVoteToChange,
        votes:  anecdoteVoteToChange.votes+1
      }    

      //console.log('state after attempting to vote for an anecdote (and just before changing state): ', state)
      //console.log('action after attempting to vote for an anecdote (and just before changing state): ', action)
      console.log('VotedStore state from createSlice:'. state)
      console.log('Store state from createSlice:', JSON.parse(JSON.stringify(state)))
      
        const changedAnecdotes=state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        ).sort((a,b) => a.votes - b.votes) 
        

        

        return changedAnecdotes
    }  
    ,
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) { 
      console.log('setting all anecdotes in front-end:', action.payload)     
      return action.payload    
    }
  }
})


//Old way to define reducers without "@reduxjs/toolkit", see above comments
//export default anecdoteReducer

//When using @reduxjs/toolkit, see above comments
//export const {createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

//When also using @reduxjs/toolkit and Redux Thunk for async, see commens above and below
export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions


//using React Thunk/asynchronous action creators
export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(anecdotes))
  }
}

//using React Thunk/asynchronous action creators
export const createAnecdote = content => {  
  return async dispatch => {    
    const newAnecdote = await anecdoteService.createNew(content)    
    dispatch(appendAnecdote(newAnecdote))  
  }
}

//using React Thunk/asynchronous action creators
export const saveAnecdoteVoteToDatabase = id => {
  console.log('saveAnecdoteVoteToDatabase, id:', id)
  return async dispatch => {    
    const updatedAnecdote = await anecdoteService.saveVote(id)
    console.log('anecdote vote saved in database, attempting to update this anecdote in front-end:', updatedAnecdote)    
    dispatch(voteAnecdote(updatedAnecdote.id))  
  }

}



export default anecdoteSlice.reducer