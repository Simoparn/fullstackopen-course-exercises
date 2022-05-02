import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {  
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {    
      headers: { Authorization: token },  
  }
  //return axios.post(baseUrl, newObject)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
  //const request = axios.post(baseUrl, newObject)
  //return request.then(response => response.data)
  
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}



export default { 
  getAll,
  create: create,
  setToken: setToken
}