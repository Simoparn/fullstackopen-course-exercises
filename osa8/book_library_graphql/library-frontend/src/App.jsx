import { useState, useEffect } from "react"
import { gql, useQuery, useApolloClient, useMutation } from '@apollo/client'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, FAVORITE_BOOKS, TOKEN_LOGIN }  from './queries'




const Notification = ({errorMessage}) => {  
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
  

  const [ tokenLogin, tokenLoginResult ] = useMutation(TOKEN_LOGIN,  { 
    //refetchQueries: [  {query: ALL_AUTHORS}, {query: ALL_BOOKS}, {query: FAVORITE_BOOKS} ],  
    onError: (error) => {
      console.log('automatic login error, result:', tokenLoginResult)
      console.log('automatic login, error:', error.message)  
      if(error.graphQLErrors.length > 0){
        console.log('automatic login, error.graphQLErrors:', error.graphQLErrors)
        const messages = error.graphQLErrors.map(e => e.message).join('\n')    
        setErrorMessage(messages)
        notify(messages)
      }
      else{
        console.log('automatic login, error.message:', error.message)
        const messages = error.message
        setErrorMessage(messages)
        notify(messages)
      }
      /*if(messages === "Automatic login fail while trying to set context server-side, expired user token"){
        console.log('Checked error message, automatic login failed server-side, expired token, clearing token and browser cache')
        setToken(null)    
        localStorage.clear()    
        client.resetStore()  
      }  
      if(messages === "Response not successful: Received status code 500"){
        console.log('automatic login error, internal server error, user token has most likely expired, clearing token and browser cache')
        setToken(null)    
        localStorage.clear()    
        client.resetStore() 
      }*/
    }
  })


  const authorsResult = useQuery(ALL_AUTHORS, {
    //fetchPolicy:"no-cache",
    onCompleted: (result) => {
      //console.log("authors data fetch complete, token status:", token)
      console.log("authors result data fetch complete, result:", result)
    },
    onError: (error) => {
      console.log('authors data fetch error, result:', error.message)
      if(error.graphQLErrors.length > 0){
        console.log('authors data fetch error, error.graphQLErrors:', error.graphQLErrors)
        const messages = error.graphQLErrors.map(e => e.message).join('\n')    
        setErrorMessage(messages)
        notify(messages)
      }
      else{
        console.log('authors data fetch error, error.message:', error.message)
        const messages = error.message
        setErrorMessage(messages)
        notify(messages)
      }
    },
    skip: !token,  
    //Using refetchQueries when needed instead
    //pollInterval: 4000  
  
  })
  const booksResult = useQuery(ALL_BOOKS, {
    
    onCompleted: (result) => {
      //console.log("books data fetch complete, token status:", token)
      //console.log("books data fetch complete, result:", result)
    },
    onError: (error) => {
      //console.log('books data fetch error, result:', error.message)
      if(error.graphQLErrors.length > 0){
        console.log('books data fetch error, error.graphQLErrors:', error.graphQLErrors)
        const messages = error.graphQLErrors.map(e => e.message).join('\n')    
        setErrorMessage(messages)
        notify(messages)
      }
      else{
        console.log('books data fetch error, error.message:', error.message)
        const messages = error.message
        setErrorMessage(messages)
        notify(messages)
      }
      
    },
    skip: !token,  
    //Using refetchQueries when needed instead  
    //pollInterval: 4000  

  })
  

  const favoriteBooksResult = useQuery(FAVORITE_BOOKS, {   
    onCompleted: (result) => {
      console.log("favorite books data fetch complete, token status:", token)
      //console.log("favorite books data fetch complete, result:", result)
    },
    onError: (error) => {

          console.log('favorite books data fetch error, result:', error.message)
          if(error.graphQLErrors.length > 0){
            console.log('favorite books data fetch error, error.graphQLErrors:', error.graphQLErrors)
            const messages = error.graphQLErrors.map(e => e.message).join('\n')    
            //setErrorMessage(messages)
            notify(messages)
          }
          else{
            console.log('favorite books data fetch error, error.message:', error.message)
            const messages = error.message
            //setErrorMessage(messages)
            notify(messages)
          }
        },
        variables: { token },
        skip: !token,  
        //Using refetchQueries when needed instead 
        //pollInterval: 4000  
  })



  console.log('App rendered')
  console.log('App, Apollo client cache data:', client.cache.data.data)
  //console.log('App, authors, query result object:', authorsResult)
  console.log('App, authors, query result data:', authorsResult.data)
  //console.log('App, books, query result object', booksResult)
  console.log('App, books, query result data:', booksResult.data)
  //console.log('App, favorite books, query result object:', favoriteBooksResult)
  console.log('App, favorite books, query result data:', favoriteBooksResult.data)
  console.log('App, user token:', token)


  const notify = (message) => {   
    setErrorMessage(message)    
    setTimeout(() => {      
     setErrorMessage(null)    
   }, 10000)  
 }

  const logout = () => {    
    localStorage.clear()    
    client.resetStore() 
    setToken(null)    
    
  }


  useEffect(()=>{
    console.log("App, initial render")
      


    
    if(localStorage.getItem('book-library-user-token')){
      //localStorage.removeItem('book-library-user-token')
      /**/
      console.log('App, browser cache token found:', localStorage.getItem('book-library-user-token'))
      setToken(localStorage.getItem('book-library-user-token'))
      //tokenLogin({ variables: { token } })
    }
  }, [])

  useEffect(()=>{

    console.log('tokeLoginResult.data:', tokenLoginResult.data)
    if (tokenLoginResult.data && tokenLoginResult.data.addBook === null) {      
        notify('Error with automatic login')    
    }  
  }, [tokenLoginResult.data])

  useEffect(()=>{
    console.log('App, token changed:', token)
    if(token){
      console.log('Attempting automatic token login, token value:', token)
      tokenLogin({ variables: { token } })
    }


    
  }, [token])

  
  useEffect(()=>{
    console.log('Checking error message:', errorMessage)
    if(errorMessage === "Automatic login fail while trying to set context server-side, expired user token"){
      console.log('Checked error message, automatic login failed server-side, expired token, clearing token and browser cache')
      localStorage.clear()    
      client.resetStore()  
      setToken(null) 
    }

    if(errorMessage === "Response not successful: Received status code 500"){
      console.log('Checked error message, automatic login error, internal server error, user token has most likely expired, clearing token and browser cache')
        
      localStorage.clear()    
      client.resetStore() 
      setToken(null) 
    }
  }, [errorMessage])


  //all born fields are most of the time left null for some reason, this was an attempt at solution
  useEffect(()=>{
    console.log('App, useEffect, authorsResult:', authorsResult)
    let allBornFieldsAreNull = true
    if(authorsResult.data){
      authorsResult.data.allAuthors.forEach(author => {
        author.born ? allBornFieldsAreNull=false : true 
      })

      if(allBornFieldsAreNull === true){
        
          console.log("born field is null, refetching data.")
          authorsResult.refetch()
      }  
      else{
          console.log("born field is not null for every author, no need to refresh page:", authorsResult.data.allAuthors)
        }
    }
    
  }, [authorsResult])

  /*
  useEffect(()=>{
    console.log('App, books, query result data:', booksResult.data)
  }, [booksResult.data])

  useEffect(()=>{
    console.log('App, favorite books, query result data:', favoriteBooksResult.data)
  }, [favoriteBooksResult.data])*/
  



  if (authorsResult.loading || booksResult.loading || favoriteBooksResult.loading)  {
    return <div>loading data...</div>
  }

  if (!token) {
    return (
      <div>
        <Notification errorMessage={errorMessage} />
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
      <Notification errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendations")}>recommendations</button>
      </div>

      <Authors show={page === "authors"} authors={authorsResult.data.allAuthors} setError={notify} />

      <Books show={page === "books"} books={booksResult.data.allBooks}  />

      <NewBook show={page === "add"} setError={notify} token={token} books={booksResult.data.allBooks} authors={authorsResult.data.allAuthors} favoriteBooks={favoriteBooksResult.data.favoriteBooks} />

      <Recommendations show={page === "recommendations"} setError={notify} favoriteBooks={favoriteBooksResult.data.favoriteBooks} />
    </div>
  );
};

export default App;
