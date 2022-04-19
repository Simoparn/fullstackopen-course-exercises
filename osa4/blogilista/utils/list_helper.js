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


  const unique_authors_array= lodash._.uniqBy(blogs, function (blog) { return blog.author })
  //console.log("Unique authors array: ", unique_authors_array)
  let blogs_by_author_array=[]
  blogs_by_author_array.length=unique_authors_array.length
  blogs_by_author_array=blogs_by_author_array.fill(0,0,unique_authors_array.length)
  //console.log("Blogs by author array at start: ", blogs_by_author_array)
  for(let i=0; i< unique_authors_array.length; i++)
  {
    for(let blog of blogs)
    {
      //console.log("Current unique author to handle: ", unique_authors_array[i].author, "\tAuthor of "+(blogs.indexOf(blog)+1)+":th blog to handle: ", blog.author)
      if(blog.author===unique_authors_array[i].author)
      {
        blogs_by_author_array[i] += 1
      }
    }


  }
  //console.log("Blogs by author array after counting: ", blogs_by_author_array)
  let most_blogs_author=unique_authors_array[blogs_by_author_array.indexOf(Math.max(...blogs_by_author_array))]
  console.log("Author with most blogs: ", {"author":most_blogs_author.author, "blogs":Math.max(...blogs_by_author_array)})
  return {"author":most_blogs_author.author, "blogs":Math.max(...blogs_by_author_array)}

}


const mostLikes = (blogs) => {
  
  const unique_authors_array= lodash._.uniqBy(blogs, function (blog) { return blog.author })
  
  let likes_by_author_array=[]
  likes_by_author_array.length=unique_authors_array.length
  likes_by_author_array=likes_by_author_array.fill(0,0,unique_authors_array.length)
  console.log("Likes by author array at start: ", likes_by_author_array)
  for(let i=0; i< unique_authors_array.length; i++)
  {
    for(let blog of blogs)
    {
      //console.log("Current unique author to handle: ", unique_authors_array[i].author, "\tAuthor of "+(blogs.indexOf(blog)+1)+":th blog to handle: ", blog.author)
      if(blog.author===unique_authors_array[i].author)
      {
        likes_by_author_array[i] += blog.likes
      }
    }


  }

  console.log("Likes by author array after counting: ", likes_by_author_array)
  
  
  let most_likes_author=unique_authors_array[likes_by_author_array.indexOf(Math.max(...likes_by_author_array))]

  return {"author":most_likes_author.author, "blogs":Math.max(...likes_by_author_array)}
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}