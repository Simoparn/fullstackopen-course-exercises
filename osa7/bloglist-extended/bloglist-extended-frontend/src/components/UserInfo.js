import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const UserInfo = ({id}) => {

    console.log('Rendering UserInfo')
    return(
        <div>
        User info for user {id}
        </div>
    )


}



export default UserInfo