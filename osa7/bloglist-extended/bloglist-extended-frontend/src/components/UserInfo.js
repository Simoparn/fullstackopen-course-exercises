import { useState, useImperativeHandle, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'    



const PageStyle = styled.div`
padding-top: 2%;
padding-bottom:2%;
background-color:lightblue;
`

const listItemContentStyle={
    marginLeft:5
}


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
        <PageStyle>
    
        <br/>
        User {userInfo.name} added blogs
        <ul>
        {userInfo.blogs.map((blog) => (
 
                <li key={blog.id}>
                    {blog.title}
                    <span style={listItemContentStyle}>
                        <Link to={`/blogs/${blog.id}`}>Open the blog in a separate view</Link>
                    </span>

                </li>

   
            ))
        }
        
        </ul>
        </PageStyle>
    )


}



export default UserInfo