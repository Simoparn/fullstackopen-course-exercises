const anecdoteFilterAtStart = ""



const anecdoteFilterReducer = (state = anecdoteFilterAtStart, action) => {
    console.log('ACTION IN ANECDOTEFILTEREDUCER: ', action)
    switch (action.type) {
      case 'SET_FILTER':
      /*  const id = action.data.id
        const anecdoteVoteToChange = state.find(n => n.id === id)
        const changedAnecdote = {
          ... anecdoteVoteToChange,
          votes:  anecdoteVoteToChange.votes+1
        }
      */
        return action.payload
      default:
        return state
    }
  }

  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }

  export default anecdoteFilterReducer