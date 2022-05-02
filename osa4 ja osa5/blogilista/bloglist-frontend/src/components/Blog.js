import React from 'react'
const Blog = ({blog}) => (
  <li class="singleblog">
    <span class="singleblogfield">
    {blog.title} 
    </span>
    <span class="singleblogfield">
    {blog.author} 
    </span>
    <span class="singleblogfield">
    {blog.url}
    </span>
    <span class="singleblogfield">
    {blog.likes}
    </span>
  </li>  
)

export default Blog