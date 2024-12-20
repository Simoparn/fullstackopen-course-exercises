import axios from 'axios'
const baseUrl="http://localhost:3001/anecdotes"

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
    //console.log('new anecdote just before saving in requests.js:', newAnecdote)
    return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const updateAnecdote = updatedAnecdote => {
    console.log('requests.js, anecdote to update to database:', updatedAnecdote)
    return axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
}