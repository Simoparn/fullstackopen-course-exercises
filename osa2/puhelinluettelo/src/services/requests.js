import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'
const getAllPersons = () => {
  //return axios.get(baseUrl)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getPerson = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const createPerson = newObject => {
  //return axios.post(baseUrl, newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
  
}

const updatePerson = (id, newObject) => {
  //return axios.put(`${baseUrl}/${id}`, newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { 
  getAllPersons: getAllPersons, 
  getPerson: getPerson,
  createPerson: createPerson, 
  updatePerson: updatePerson, 
  deletePerson: deletePerson
}