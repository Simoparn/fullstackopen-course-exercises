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
  
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
  //const request = axios.post(baseUrl, newObject)
  //return request.then(response => response.data)
  
}


const update = async (id, updatedBlog) => {
  const config = {    
      headers: { Authorization: token },  
  }
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return request.then(response => response.data)
  //const request = axios.post(baseUrl, newObject)
  //return request.then(response => response.data)
  
}



const deleteBlog = async (id) => {
  const config = {    
      headers: { Authorization: token },  
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
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
  setToken: setToken,
  update: update,
  deleteBlog: deleteBlog
}