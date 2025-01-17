import styled from 'styled-components'

const PageStyle = styled.div`
padding-top: 2%;
padding-bottom:2%;
background-color:lightblue;
`

const Instructions = () => {

    return (
        <PageStyle>
            <h4>INSTRUCTIONS:</h4>
            <p>
                See localhost:backendport/api/blogs and
                localhost:backendport/api/users for details about current data and
                users{' '}
            </p>
        </PageStyle>
    )

}


export default Instructions