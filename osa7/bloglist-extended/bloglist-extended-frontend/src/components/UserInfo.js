import { useState, useImperativeHandle, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'    


const UserInfo = ({id}) => {



    //const userInfo = allUsersInfo.find((userInfo) => {userInfo.id === id})
    
    const allUsersInfo = useSelector(({ allUsersInfo })=>{
        return allUsersInfo
    })
    const userInfo = allUsersInfo.find((userInfo)=>userInfo.id === id)
    console.log('Rendering UserInfo, id for the user:', id)
    console.log('Rendering UserInfo, all users info:', allUsersInfo)
    console.log('Rendering UserInfo, userInfo for the user:', userInfo)

    return(
        <div>
    
        <br/>
        User {userInfo.name} added blogs
        <ul>
        {userInfo.blogs.map((blog) => (
 
                <li key={blog.id}>
                    {blog.title}
                    <Link to={`/blogs/${blog.id}`}>Open blog in a separate view</Link>

                </li>

   
            ))
        }
        
        </ul>
        </div>
    )


}



export default UserInfo