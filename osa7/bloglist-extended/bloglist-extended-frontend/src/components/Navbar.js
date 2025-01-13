import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


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


return (


    <StyledComponentsNavigation>
        <Link style={linkStyle} to="/">Frontpage</Link>
        <Link style={linkStyle} to="Users">Users</Link>
    </StyledComponentsNavigation>
)





}

export default Navbar