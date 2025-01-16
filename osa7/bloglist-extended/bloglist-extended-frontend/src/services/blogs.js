import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
  //const request = axios.post(baseUrl, newObject)
  //return request.then(response => response.data)
}

const addBlogComment = async (blogCommentObject) => {
  const { blogId, blogComment } = blogCommentObject
  const blogCommentContentObject = { blogComment }
  console.log('services, addBlogComment, blogCommentObject:', blogCommentObject)
  console.log('services, addBlogComment, route:', `${baseUrl}/${blogCommentObject.blogId}/comments`)
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, blogCommentContentObject)
  return response.data
}

const getUserBlogs = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request=axios.get(baseUrl, config)
  return request.then(response => response.data).catch(error => error.response.data.errorMessage)
  
  /*TODO: This doesn't work, blog list is left empty in frontend even if the data is eventually successfully fetched in front-end,
  this is true even with await/asyncs, .catch is needed however to avoid error message in front-end for non-logged users (empty authentication token),
  but multi-lined .then and .catch are avoided for now
  */
  /*request.then((response) => {
    console.log('services -> blogs.js -> getUserBlogs, HTTP response:', response)
    //console.log('services -> getUserBlogs, HTTP response error:', error)
    return response.data
  }).catch((error) => {
    //console.log('services -> getUserBlogs, HTTP error object.keys and object.values:', Object.keys(error), Object.values(error))
    console.log("services -> blogs.js -> getUserBlogs, error.response.status, token most likely nonexistent:", error.response.status)
    console.log("services -> blogs.js -> getUserBlogs, error.response.data.errorMessage, token most likely nonexistent:" , error.response.data.errorMessage)
    return error.response.data.error
  })*/
  

}




const update = async (id, updatedBlog) => {
  console.log('blogServices, update, id:', id)
  console.log('blogServices, update, blog to update:', updatedBlog)
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return request.then((response) => response.data)
  //const request = axios.post(baseUrl, newObject)
  //return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
  //const request = axios.post(baseUrl, newObject)
  //return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export default {
  getAll,
  getUserBlogs,
  create: create,
  addBlogComment: addBlogComment,
  setToken: setToken,
  update: update,
  deleteBlog: deleteBlog,
}
