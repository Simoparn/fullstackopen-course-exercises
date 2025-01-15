import { useState, useImperativeHandle, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//import { UserInfo } from '../components/UserInfo'


    const StyledTable = styled.table`
        font-size: 0.75em;
            
        

    `

const UsersSummary = () => {



    const usersSummaryTitleStyle = {
        fontSize: 26,
        marginBottom: 4
    }
    const usersSummaryBodyStyle = {
        fontSize: 20,
  
      }

    

    const allUsersInfo=useSelector(({ allUsersInfo })=>{
        console.log('UsersSummary, allUsersInfo retrieved from Redux store with useSelector:', allUsersInfo)
        return allUsersInfo
    })


    console.log("rendering UsersSummary")


      


    return(
        <>
        <b style={usersSummaryTitleStyle}>Users statistics</b>
        <div style={usersSummaryBodyStyle}>
            <StyledTable>
                <tbody>
                <tr><td></td><td><b>blogs created</b></td></tr>
                {allUsersInfo
                    .map((userInfo, i) => (
                        <>
                        <tr key={userInfo.id}>
                            <td><Link key={userInfo.id} to={`/users/${userInfo.id}`}>{userInfo.name}</Link></td>
                            <td></td>
                            <td >{userInfo.blogs.length}</td>
                        </tr>
                        {console.log("rendering a single link for userInfo:", userInfo)}
                        {console.log(`userInfo link: /users/${userInfo.id}`)}
                        </>
                    ))
                }
                </tbody>
            </StyledTable>
        </div>

        </>
    )


}



export default UsersSummary