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
        //refetchQueries needed for updating cache after creating new books. 
        //Also generates less traffic than pollInterval in App.js, but the state change won't be seen by every user automatically
        refetchQueries: [  {query: ALL_BOOKS}, {query: ALL_AUTHORS}, {query: FAVORITE_BOOKS, variables: { token:props.token }} ],
        onError: (error) => {      
            const messages = error.graphQLErrors.map(e => e.message).join('\n')      
            props.setError(messages)    
        },
        //Needed for updating the query in cache with new data (such as after creating a new person)
        update: (cache, response) => { 
          console.log('addBook, Frontend cache update after query, response.data.addBook:', response.data.addBook)     
          cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {   
            console.log('frontend cache update, old allBooks:', allBooks)     
            return {          
              allBooks: allBooks.concat(response.data.addBook),        
            }      
          })
          cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {        
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
          })
        },
})

  useEffect(() => {    
    if (addBookResult.data && addBookResult.data.addBook === null) {      
        props.setError('NewBook, Book result data not found')    
    }  
    }, [addBookResult.data])


  
  if (!props.show) {
    return null
  }

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
      props.notify(error)
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

  return (
    <div>
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