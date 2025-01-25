import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from '@apollo/client'
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
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  


  const authorsResult = useQuery(ALL_AUTHORS, {    
        pollInterval: 6000  
  })
  const booksResult = useQuery(ALL_BOOKS, {    
      pollInterval: 6000  
  })
  console.log('authors, query result data:', authorsResult.data)
  console.log('books, query result data:', booksResult.data)


  const notify = (message) => {   
    setErrorMessage(message)    
    setTimeout(() => {      
     setErrorMessage(null)    
   }, 10000)  
 }




  if (authorsResult.loading || booksResult.loading)  {
    return <div>loading data...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
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
