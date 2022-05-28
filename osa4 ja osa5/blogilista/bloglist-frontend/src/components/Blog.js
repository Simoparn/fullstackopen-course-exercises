import {useState, useImperativeHandle, forwardRef} from 'react'
const Blog = forwardRef((props, ref) => {
  
  

  const [view, viewAll]=useState(true)
  //const [blog, setBlog]=useState(blog)
  
  const getId = (event) => {
    console.log("Returned blog key for updating likes:", props.key)
    return props.key
      
  }

  useImperativeHandle(ref, () => {    
    return { 
      getId 
    }  
  })

  if(view === false)
  {
    
    return (
      
      
      <li className="singleblog">
        <h3><span style={{margin:"8%"}}>Title</span> <span style={{margin:"8%"}}>Author</span> <span style={{margin:"8%"}}>URL</span> <span style={{margin:"8%"}}>Likes</span></h3>
        <span className="singleblogfield">
          {props.blog.title} 
        </span>
        <span style={{paddingTop:"30%"}}>
        <button type="submit" onClick={getId}><b>like this blog</b></button>
        </span>
      </li> 
      
    )
  }

  else
  {

  

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
      <button type="submit" onClick={getId}><b>Like this blog</b></button>
      </span>
    </li>  
    )
  }
})

export default Blog