import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [ addBook ] = useMutation(ADD_BOOK, 
        
    {
        //refetchQueries needed for updating cache after creating new books. 
        //Also generates less traffic than pollInterval in App.js, but the state change won't be seen by every user automatically
        refetchQueries: [  {query: ALL_BOOKS} ],
        onError: (error) => {      
            const messages = error.graphQLErrors.map(e => e.message).join('\n')      
            props.setError(messages)    
        },
        //Needed for updating the query in cache with new data (such as creating a new person)
        update: (cache, response) => {      
          cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {        
            return {          
              allBooks: allBooks.concat(response.data.addBook),        
            }      
          })    
        },
})


  
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addBook({variables: { title, author, published, genres  } })
    console.log('adding book:', title, author, published, genres)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
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
            onChange={({ target }) => setPublished(parseInt(target.value))}
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