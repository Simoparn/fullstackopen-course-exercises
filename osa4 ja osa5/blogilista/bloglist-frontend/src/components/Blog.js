import {useState, useImperativeHandle, forwardRef} from 'react'
const Blog = forwardRef((props, ref) => {
  
  

  const [viewallbloginfo, setViewAllBlogInfo]=useState(true)
  let blogid=props.blog.id
  //const [blog, setBlog]=useState(blog)
  
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
    props.updatedBlog({
      "title": props.blog.title,
      "author": props.blog.author,
      "url": props.blog.url,
      "likes": props.blog.likes + 1

      
    })

    setViewAllBlogInfo(true)
  }

  /*
  removeBlog = (event) => {
    event.preventDEfault()
    console.log("Removing blog: ", props)
    props.removedBlog({
      "title": props.blog.title,
      "author": props.blog.author,
      "url": props.blog.url,
      "likes": props.blog.likes + 1

      
    })
  }
  */
  
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
        <span className="singleblogfield">
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

    blogid=props.blog.id

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
      <span style={{paddingLeft:"30%"}}>
      <button type="submit" onClick={props.removedBlog}><b>Remove this blog</b></button>
      </span>
    </li>  
    )
  }
})

export default Blog