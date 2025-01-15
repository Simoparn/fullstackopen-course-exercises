import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { logoutUser } from '../reducers/userReducer' 
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const StyledComponentsNavigation = styled.div`
    background: lightGrey;
    padding: 1em;
  `

  const linkStyle = {
    fontWeight: "bold",
    textDecoration: "none",
    padding: 5
  }

    const user=useSelector(( { user } )=>{
          console.log('user retrieved from Redux store with useSelector:', user)
          return user
    })

    const navigate=useNavigate()




    const handleLogout = async (event) => {
        event.preventDefault()
        console.log('logging out:', user.username)
        dispatch(logoutUser())
        navigate("/")
    }

    const LogoutButton = () => {
      return(
        <p style={{ display: 'inline' , marginLeft:"1em" }}>
        <button
            onClick={handleLogout}
            type="button"
            style={{
            fontSize: '18px',
            }}
        >
            logout
        </button>
    </p>
      )
    }


    const dispatch = useDispatch()  

return (


    <StyledComponentsNavigation>
        <Link style={linkStyle} to="/">My blogs</Link>
        <Link style={linkStyle} to="/users">Users</Link>
        <Link style={linkStyle} to="/instructions">Instructions</Link>
        {user.user !== null ? <LogoutButton /> : <></>}

    </StyledComponentsNavigation>
)





}

export default Navbar