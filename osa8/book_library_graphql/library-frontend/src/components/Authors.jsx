import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  //const [selected, setSelected] = useState('')

  

  const [ editAuthor, editAuthorResult ] = useMutation(EDIT_AUTHOR, {
    //refetchQueries needed for updating cache after creating new entries (if not updated manually with update callback below). 
    //Also generates less traffic than pollInterval in App.js, but the state change won't be seen by every user automatically
    //refetchQueries: [  {query: ALL_AUTHORS} ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')      
      props.setError(messages)   
    },
    //Needed for updating the query in cache with new data (such as after creating a new person)
    update: (cache, response) => {      
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {       
        console.log('Authors.js, Frontend cache update after query, response.data.:', response.data) 
        console.log('Authors.js, Frontend cache update after query, response.data.editAuthor:', response.data.editAuthor)

        return {          
          //allAuthors: allAuthors.concat(response.data.editAuthor), 
          allAuthors: allAuthors.map(a => { return a.id === response.data.editAuthor.id ? response.data.editAuthor : a }),       
        }      
      })
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log('Editing author, new name and born year:', name, born)
    editAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  const handleSelectedAuthorChange = (event) => {
    setName(event.target.value)
  }


  useEffect(() => {    
    if (editAuthorResult.data && editAuthorResult.data.editAuthor === null) {      
        props.setError('Author not found')    
    }  
    }, [editAuthorResult.data])



    console.log("Currently selected author:", name)
    console.log('Currently selected birth year:', born)



  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2>Edit author</h2>

      <select value={name} onChange={handleSelectedAuthorChange}>
        <option value={name}>{name}</option>
        {props.authors.map((a) => (
          <option value={a.name}>{a.name}</option>
        ))}
      </select>
      {name ?
      <form onSubmit={submit}>
        
          born <input
            value={born}
            onChange={({ target }) => {parseInt(target.value) ? setBorn(parseInt(target.value)) : setBorn('')}}
          />
        
        <button type='submit'>change birth year</button>
      </form>
      : <></>}
    
    </div>

  )
}

export default Authors
