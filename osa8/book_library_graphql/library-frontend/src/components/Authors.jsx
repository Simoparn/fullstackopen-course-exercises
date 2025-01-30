import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'


const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  //const [selected, setSelected] = useState('')

  

  const [ editAuthor, editAuthorResult ] = useMutation(EDIT_AUTHOR, {

    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')      
      props.setError(messages)   
    }
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
    if (editAuthorResult.data && editAuthorResult.data.editNumber === null) {      
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
