import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, FAVORITE_BOOKS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(1000)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [ addBook, addBookResult ] = useMutation(ADD_BOOK, {
        //refetchQueries needed for updating cache after creating new books (if not handled manually with update callback below). 
        //Also generates less traffic than pollInterval in App.js, but the state change won't be seen by every user automatically
        refetchQueries: [  {query: ALL_BOOKS}, {query: ALL_AUTHORS}, {query: FAVORITE_BOOKS, variables: { token:props.token }} ],
        awaitRefetchQueries: true,
        onError: (error) => { 
          
          if(error.graphQLErrors.length > 0){
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log("addBook mutation error, error.graphQLErrors:", messages)      
            props.setError(messages)   
          }
          else{
            console.log('addBook mutation error, error message:', error.message)
            const messages = error.message      
            props.setError(messages)   
          } 
        },
        
        //Needed for updating the query in cache with new data (such as after creating a new person)
        update: (cache, response) => { 
          console.log('addBook, Frontend cache update after query, response.data.addBook:', response.data.addBook)   
          console.log('addBook, frontend cache update after query, addBookResult:', addBookResult)  
          console.log('addBook, frontend cache update after query, entire cache:', cache)  
        
          //cache.updateQuery won't work because it's never present in the cache object for 
          //some reason despite documentation and IDE claims, rerendering everything seems to work
          //nicely with just refetchQueries
          
          /*cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {   
            console.log('frontend cache update, old allBooks:', allBooks)     
            return {          
              allBooks: allBooks.concat(response.data.addBook),        
            }      
          })*/
          /*cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {        
            console.log('frontend cache update, old allAuthors:', allAuthors)  

            return {          
              allAuthors: allAuthors.map(a => { return a.id === response.data.addBook.author.id ? response.data.addBook.author: a }),        
            }      
          })
          cache.updateQuery({ query: FAVORITE_BOOKS }, ({ favoriteBooks }) => {        
            console.log('frontend cache update, old favoriteBooks:', favoriteBooks)  
           
            let isFavoriteAlready = false
            favoriteBooks.forEach(f => response.data.addBook.genres.forEach(g => { 
              if(f.genres.includes(g)) {
                isFavoriteAlready = true 
              }}
                
            ))   

            if(isFavoriteAlready){
              console.log('addBook, New book is in a favorite genre already, adding to frontend favorites cache')
            }
            else{
              console.log('addBook, New book is not in a favorite genre, not adding to frontend favorites cache')
            }
            return {          
              favoriteBooks: isFavoriteAlready === true ? favoriteBooks.concat(response.data.addBook) : favoriteBooks   
            }      
          })*/
        }
})


  useEffect(() => {    
    console.log('useEffect, addBookResult:', addBookResult)
    console.log('useEffect, addBookResult.data:', addBookResult.data)
    if (addBookResult.data && addBookResult.data.addBook === null) {      
        props.setError('Books not updated correctly after adding a book')    
    }  

  }, [addBookResult])

  


  
  if (!props.show) {
    return null
  }

  
  /*//May be needed to ensure UI updates in all components after the addBook mutation
  if (props.books || props.authors || props.favoriteBooks) {
    //console.log('NewBook, books:', props.books)
    //console.log('NewBook, authors:', props.authors)
    //console.log('NewBook, books:', props.favoriteBooks)
  }*/


  

  const submit = async (event) => {
    try{
      event.preventDefault()
      addBook({variables: { title, author, published, genres  } })
      console.log('adding book:', title, author, published, genres)

      setTitle('')
      setPublished(1000)
      setAuthor('')
      setGenres([])
      setGenre('')
    }catch(error){
      console.log('newBook, submit error:', error)
      props.setError(error)
    }
  }

  const handleParseInt = () => {
    event.preventDefault()
    const parsedInt= parseInt(event.target.value)
    if(parsedInt){
      console.log('published field, ParseInt successful:', parsedInt)
      console.log('first character of event.target.value:', event.target.value[0])
      if(event.target.value[0] === "0"){
        const parsedInt = parseInt(event.target.value.substr(1))
        event.target.value = parsedInt
        setPublished(parseInt(parsedInt))
        return parsedInt
      }
      else{
        event.target.value = parsedInt
        setPublished(parsedInt)
      }
      return parsedInt
    }
    else{
      console.log('published field, ParseInt failed, casting to 0')
      return 0
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  //console.log('NewBook rendered')

  //checks for query results (props.books etc.) may be needed to ensure the queries are used by the component, so that
  //UI updates after mutations work properly for other components
  return (

    <div>
      <br />
      Total number of books in database: {props.books.length} <br />
      Total number of authors in database: {props.authors.length} <br />
      User's favorite books in database: {props.favoriteBooks.length}
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(handleParseInt)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook