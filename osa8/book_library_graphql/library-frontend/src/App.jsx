import { useState, useEffect } from "react"
import { gql, useQuery, useApolloClient } from '@apollo/client'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS }  from './queries'



const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }  
  return (    
    <div style={{color: 'red'}}>      
      <b>{errorMessage}</b>    
    </div>  
  )
}



const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  


  const authorsResult = useQuery(ALL_AUTHORS, 
  //Using refetchQueries when needed instead
  /*{    
        pollInterval: 4000  
  }*/)
  const booksResult = useQuery(ALL_BOOKS, 
  //Using refetchQueries when needed instead  
  /*
  {    
      pollInterval: 4000  
  }*/)
  console.log('authors, query result data:', authorsResult.data)
  console.log('books, query result data:', booksResult.data)
  console.log('App, user token:', token)


  const notify = (message) => {   
    setErrorMessage(message)    
    setTimeout(() => {      
     setErrorMessage(null)    
   }, 10000)  
 }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }


  useEffect(()=>{
    if(localStorage.getItem('book-library-user-token')){
      localStorage.removeItem('book-library-user-token')
    }
  }, [])


  if (authorsResult.loading || booksResult.loading)  {
    return <div>loading data...</div>
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authorsResult.data.allAuthors} setError={notify} />

      <Books show={page === "books"} books={booksResult.data.allBooks} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
