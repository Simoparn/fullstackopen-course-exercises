import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { useParams } from 'react-router-dom'
import { addBlogComment } from '../reducers/blogReducer'
//import Togglable from '../components/Togglable'


const blogTitleStyle = {
    fontSize: 26,
 
} 
const blogContentStyle = {
    margin: 8
}
const blogCommentInputStyle = {
    marginTop: 20,
    width:300
}

    
const CommentForm = ({newComment,  handleAddComment, handleBlogCommentChange}) => {

    return (
        <>
        <br/><span style={blogTitleStyle}>Add a comment</span><br/>

        <form onSubmit={handleAddComment}>
            <input
            style={blogCommentInputStyle}
            id="new-blog-comment"
            value={newComment}
            onChange={handleBlogCommentChange}
            />
            
            <button
            type="submit"
            style={{
            fontSize: '18px',
            }}
            >
                Add comment
            </button>
        </form>
        </>
    )
}


const BlogView = ({id}) => {


    const [newComment, setNewBlogComment] = useState('Add a new comment.....')




    

    const handleBlogCommentChange = (event) => {
        
        setNewBlogComment(event.target.value)
      }


    //const params=useParams()
    // blogId=params//.postId

    const blogs=useSelector(({ blogs })=>{
            console.log('blogs retrieved from Redux store with useSelector:', blogs)
            return blogs
    })



    const allBlogsInfo = useSelector(({allBlogsInfo})=>{
        return allBlogsInfo 
    })
    
    const dispatch=useDispatch()




    console.log("BlogView, all blogs:", blogs)
    //console.log("BlogView, allBlogsInfo:", allBlogsInfo)
    
    const blog =blogs.filter((blog)=>
        blog.id === id
    )
    
    /*const blog =allBlogsInfo.filter((blogInfo)=>
        blogInfo.id === id
    )*/
    
    console.log("BlogView, filtered blog:", blog[0])
    console.log('BlogView,  comment input:', newComment)



    
    
    /*const CommentForm = () => {

        return (
            <>
            <br/><span style={blogTitleStyle}>Add a comment</span><br/>

            <form onSubmit={handleAddComment}>
                <input
                style={blogCommentInputStyle}
                id="new-blog-comment"
                value={newComment}
                onChange={handleBlogCommentChange}
                />
                
                <button
                type="submit"
                style={{
                fontSize: '18px',
                }}
                >
                    Add comment
                </button>
            </form>
            </>
        )
    }*/

    const handleAddComment = (event) => {

        event.preventDefault()

        //console.log('handleAddComment: blog id in URL needed for commenting:', params)
        console.log('handleAddComment: new comment added: ', newComment)
        console.log('handleAddComment: blog before adding a new comment: ', blog[0])

      
        
        //console.log('handleAddComment: Blog before adding a comment', blogToUpdate)


        console.log('handleAddComment: blog id in URL needed for commenting:', id)
        dispatch(addBlogComment({blogId:blog[0].id, blogComment:newComment}))

    }
    
    
    console.log('BlogView: blog id in URL needed for commenting:', id)
    
    console.log('BlogView: blog comments:', blog[0].comments)
    
    
    return (
        <>
        

        <ul className="bloglist">
            <li className="singleblog">
                
                <span style={blogTitleStyle}>Title: {blog[0].title}</span><br />
                <span className="singleblogfield">Author: {blog[0].author}</span><br />
                <span className="singleblogfield">Url: {blog[0].url}</span><br />
                <span className="singleblogfield">Likes: {blog[0].likes}</span><br />
            </li>
        </ul>
        <CommentForm newComment={newComment} handleAddComment={handleAddComment} handleBlogCommentChange={handleBlogCommentChange}  />
        <ul>
            {blog[0].comments.map((comment)=>(
                <>
                {console.log('BlogView, rendering comment:', comment)}
                <li>{comment}</li>
                </>
            ))}
        </ul>
        </>
    )   



}

export default BlogView