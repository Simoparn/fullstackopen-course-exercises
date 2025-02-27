import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  const [ login, result ] = useMutation(LOGIN, {    
    onError: (error) => {
      console.log('result when login error:', result)
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {    
    if ( result.data ) {  
        console.log('LoginForm, result data fetched:', result.data)    
        const token = result.data.login.value  
        console.log('setting user token:', token)    
        localStorage.setItem('book-library-user-token', token)   
        setToken(token)  
    }  }, [result.data])

    
  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }


  //console.log('LoginForm rendered')

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm