const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content) => {  return {
  type: 'NEW_ANECDOTE',
  data: {
    content,
    important: false,
    id: getId()
  }
}
}

export const voteAnecdote = (content) => { 
  {console.log('voteAnecdote props:', content)}
 return {
  type: 'VOTE_ANECDOTE',
  data: {
    votes:votes+1,
    id: id
  }
}
}


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      console.log('state after attempting to create a new anecdote (and just before changing state): ', state)
      console.log('action after attempting to create a new anecdote (and just before changing state): ', action)
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      console.log('state after attempting to vote for an anecdote (and just before changing state): ', state)
      console.log('action after attempting to vote for an anecdote (and just before changing state): ', action)
      return [...state, action.data]
    default:
      console.log('default anecdote reducer state: ', state)
      console.log('default anecdote reducer action: ', action)
      return state

  }
}


export default reducer