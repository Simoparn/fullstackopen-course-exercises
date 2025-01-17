import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Blog from './Blog'
import BlogForm from './Blogform'
import Togglable from './Togglable'


import { createBlog, updateBlog, removeBlog } from '../reducers/blogReducer'



const PageStyle = styled.div`
padding-top: 2%;
padding-bottom:2%;
background-color:lightblue;
`


const blogTitleStyle = {
    fontSize: 26
}




const LoggedIn = ({blogFormRef, blogVisibleRef, blogRef}) => {



    const blogs=useSelector(({ blogs })=>{
        console.log('blogs retrieved from Redux store with useSelector:', blogs)
        return blogs
    })

    //const [user, setUser] = useState(null)
    const user=useSelector(( { user } )=>{
        console.log('user retrieved from Redux store with useSelector:', user)
        return user
    })

    //const blogFormRef = useRef()
    //const blogVisibleRef = useRef()
    //const blogRef = useRef([])


    const dispatch = useDispatch()  








    const handleAddBlog = (blogObject) => {
        console.log('Blog submit button clicked, blog to handle:', blogObject)
        blogFormRef.current.toggleVisibility()
        //action creator in reducers for back-end and front-end saving functionality
        dispatch(createBlog(blogObject)) 
    }    


    const handleUpdateBlog = (blogObject) => {
        console.log("handleUpdateBlog, blogObject:", blogObject)
        console.log('blogRef.current array :', blogRef.current)
        
        //Need blogRef as an array
        const blogId = Object.values(
          blogRef.current.find((ref) => ref.blogid === blogObject.id)
        )
        console.log('Blog id in app.js:', blogId)
      
        const blogToUpdate = blogs.find(
          (listblog) => listblog.id.toLowerCase() === blogId[0]
        )
        console.log('Blog before adding a like:', blogToUpdate)
      
    
        //reducer action creator for back-end and front-end updating
        dispatch(updateBlog(blogToUpdate.id, blogObject))
    
    }


    //TODO: Unfinished and no button yet
    const handleRemoveBlog = (blogObject) => {
        //Didn't work by comparing object and string values with ===, so this was needed
        const blogId = Object.values(
        blogRef.current.find((ref) => ref.blogid === blogObject.id)
        )
        console.log('blog id of the blog to remove: ', blogId)
        console.log('blogs before filtering: ', blogs)
        const blogToRemove = blogs.find((listblog) => listblog.id === blogId[0])
        console.log('Blog to remove:', blogToRemove)
        let confirmRemove = window.confirm(
        'Are you sure you want to remove the following blog?\n ' +
            blogToRemove.title
        )
        if (confirmRemove) {
         dispatch(removeBlog(blogId[0]))
        // Front-end and back-end deletion moved to action creator
        //    blogService
        //      .deleteBlog(blogToRemove.id)
        //      .then((returnedBlog) => {
        //        const blogsAfterRemove = blogs.filter(
        //          (listblog) => listblog.id.toLowerCase() !== blogId
        //        )
        //        //Update shown list after delete
        //        setBlogs(blogsAfterRemove)
        //        /*setErrorMessage('Blog: ' + blogObject.title + ' removed successfully')
        //        setTimeout(() => {
        //          setErrorMessage(null)
        //        }, 3000)*/
        //        dispatch(setNotificationWithTimeout("Blog: " + blogObject.title + "removed successfully", 5000))
        //        console.log(
        //          'Blog list after deleting, ',
        //          blogsAfterRemove.length,
        //          ' blogs:',
        //          blogsAfterRemove
        //        )
        //      })
        //      .catch((error) => {
        //        /*setErrorMessage('Removing the blog failed')
        //        console.log('Removing the blog failed', error)
        //        setTimeout(() => {
        //          setErrorMessage(null)
        //        }, 3000)*/
        //        dispatch(setNotificationWithTimeout("Removing the blog failed: " + blogObject.title, 5000))
        //        console.log('Removing the blog failed', error)
        //        
        //      })
        }
    }


    return (
        <PageStyle>

            {/*<p style={{ paddingBottom: '3%' }}>
            <button
                onClick={handleLogout}
                type="button"
                style={{
                fontSize: '18px',
                }}
            >
                logout
            </button>
            </p>*/}

            <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={handleAddBlog} />
            </Togglable>
            
            
            

            <ul className="bloglist">
                <span
                style={{
                    paddingBottom: '2%',
                    fontSize: '25px',
                }}
                >
                {blogs.length} blogs in total
                </span>

                {blogs
                .map((blog, i) => (
                    <>
                    <b>{blog.title}</b>
                    <Togglable buttonLabel="view" ref={blogVisibleRef}>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        ref={(element) => (blogRef.current[i] = element)}
                        handleUpdateBlog={handleUpdateBlog}
                        handleRemoveBlog={handleRemoveBlog}
                        currentUser={user}
                    />
                    </Togglable>
                    <Link to={`/blogs/${blog.id}`}>Open the blog in a separate view</Link>
                    
                    </>
                ))
                .sort(function (a, b) {
                    return a.likes > b.likes ? 1 : -1
                })}
            </ul>
            </div>
        </PageStyle>
    )
}




export default LoggedIn