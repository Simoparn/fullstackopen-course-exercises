import { useNavigate } from 'react-router-dom'
const NotFound = () => {

    console.log('Rendering NotFound')

    return(

        <div>
            <p style={{
                paddingBottom: '2%',
                fontSize: '25px',
            }}>
            <b>Page not found</b><br/>
            <a href="\">Return to the front page</a>
            </p>
        </div>
        
    )





}



export default NotFound