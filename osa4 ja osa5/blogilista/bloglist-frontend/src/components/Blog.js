import {useState, useImperativeHandle, forwardRef} from 'react'
import PropTypes from 'prop-types'
const Blog = forwardRef((props, ref) => {
  
  

  const [viewallbloginfo, setViewAllBlogInfo]=useState(true)
  let blogid=0
  //const [blog, setBlog]=useState(blog)
  

  //console.log("Blog ref for blog ", props.blog.title, ": ", ref)

  /*const getId = (event) => {
    event.preventDefault()
    console.log("Blog props in getId: ", props)
    console.log("Returnable blog key for updating likes:", props.blog.id)
    return props.id
      
  }
  */
    
  const addBlogLike = (event) => {
    event.preventDefault()
    console.log("Blog props in addBlogLike: ", props)
    props.updateBlog({
      "title": props.blog.title,
      "author": props.blog.author,
      "url": props.blog.url,
      "likes": props.blog.likes + 1,
      "user":props.blog.user,
      "id":props.blog.id

      
    })

    
  }

  
  const removeBlog = (event) => {
    event.preventDefault()
    console.log("Removing blog: ", props.blog.title)
    props.removeBlog({
      
      "title": props.blog.title,
      "author": props.blog.author,
      "url": props.blog.url,
      "likes": props.blog.likes,
      "user":props.blog.user,
      "id":props.blog.id

      
    })
    
  }
  
  
  useImperativeHandle(ref, () => {    
    return { 
      blogid
    }  
  })

  if(viewallbloginfo === false)
  {
    blogid=props.blog.id
    return (
      
      
      <li className="singleblog">
        <h3><span style={{margin:"8%"}}>Title</span> <span style={{margin:"8%"}}>Author</span> <span style={{margin:"8%"}}>URL</span> <span style={{margin:"8%"}}>Likes</span></h3>
        <span className="singleblogfield" id="list-blog-title">
          {props.blog.title} 
        </span>
        <span style={{paddingTop:"30%"}}>
        <button type="button" onClick={addBlogLike}><b>like this blog</b></button>
        </span>
      </li> 
      
    )
  }

  else
  {
    console.log("Current blog: ", props.blog, "\nCurrent user:", props.currentUser)
    
    if(props.currentUser.username === props.blog.user.username){
      blogid=props.blog.id
      //console.log("Blog id for blog ", props.blog.title, ": ", blogid)
      
      return (
      <li className="singleblog">
        <h3><span>Title</span></h3>
        <span className="singleblogfield" id="list-blog-title">
          {props.blog.title} 
        </span>
        <h3><span>Author</span></h3>
        <span className="singleblogfield" id="list-blog-author">
          {props.blog.author} 
        </span>
        <h3><span>URL</span></h3>
        <span className="singleblogfield" id="list-blog-url">
          {props.blog.url}
        </span>
        <h3><span>Likes</span></h3>
        <span className="singleblogfield" id="list-blog-likes">
          {props.blog.likes}
        </span>
        <span style={{paddingLeft:"30%"}}>
        <button type="submit" onClick={addBlogLike}><b>Like this blog</b></button>
        </span>
        <span style={{paddingLeft:"30%"}}>
        <button type="submit" onClick={removeBlog}><b>Remove this blog</b></button>
        </span>
        
      </li>  
      )
    }
    else {


      blogid=props.blog.id
      //console.log("Blog id for blog ", props.blog.title, ": ", blogid)
    
      return (
        <li className="singleblog">
          <h3><span>Title</span></h3>
          <span className="singleblogfield">
            {props.blog.title} 
          </span>
          <h3><span>Author</span></h3>
          <span className="singleblogfield">
            {props.blog.author} 
          </span>
          <h3><span>URL</span></h3>
          <span className="singleblogfield">
            {props.blog.url}
          </span>
          <h3><span>Likes</span></h3>
          <span className="singleblogfield">
            {props.blog.likes}
          </span>
          <span style={{paddingLeft:"30%"}}>
          <button type="submit" onClick={addBlogLike}><b>Like this blog</b></button>
          </span>
      
      
        </li>  
      )

    }
  }
})

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

Blog.displayName = 'Blog'

export default Blog