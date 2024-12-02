import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content, id) => {  
    const object = { content, id, votes: 0 }  
    const response = await axios.post(baseUrl, object)  
    return response.data

}

const saveVote = async (id) => {  
  console.log('anecdoteService, saveVote id:', id)
  const allForSearch = await getAll()
  console.log('anecdoteService, all anecdotes to search for the vote to update:', allForSearch)
  const anecdoteVoteToChange = allForSearch.find(n => n.id === id)  
  console.log('anecdoteService, anecdote to update:', anecdoteVoteToChange)
  const changedAnecdoteVote = {
    ... anecdoteVoteToChange,
    votes:  anecdoteVoteToChange.votes+1
  }   
  console.log('anecdoteService, updated anecdote:', changedAnecdoteVote)
  
  
  /*const changedAnecdotes=allForSearch.map(anecdote =>
    anecdote.id !== changedAnecdoteVote.id ? anecdote : changedAnecdoteVote
  ).sort((a,b) => a.votes - b.votes) 
  console.log('anecdoteService: updated and sorted anecdotes to be saved back into database:', changedAnecdotes)
  */

  const object = changedAnecdoteVote
  const response = await axios.put(`${baseUrl}/${id}`, object)   
  //const object = changedAnecdotes
  //const response = await axios.post(baseUrl, object)  
  console.log('saveVote, response.data:', response.data)
  //console.log('saveVote, response:', response)
  return response.data
}


export default { getAll, createNew, saveVote }