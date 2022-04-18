const lodash=require('lodash')

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  // ...
  let totallikesarray= blogs.map(blog => blog.likes)
  let totallikes = 0
  for(let i=0; i < totallikesarray.length; i++)
  {
    totallikes+=totallikesarray[i]
  }


  return totallikes
}

const favoriteBlog = (blogs) => {

  let totallikesarray= blogs.map(blog => blog.likes)
  let mostlikes= Math.max(...totallikesarray)
  const favoriteblog=blogs.find(blog => blog.likes === mostlikes)
  console.log("Favorite blog is:", favoriteblog)
  return favoriteblog

}


const mostBlogs = (blogs) => {


  const blogs_per_author= lodash._.countBy(blogs, blog => function () { blog.author })
  console.log("Blogs per author: ", blogs_per_author)
  return blogs_per_author

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}