import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'


const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState('')

  

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

  const handleChange = (event) => {
    setSelected(event.target.value)
  }


  useEffect(() => {    
    if (editAuthorResult.data && editAuthorResult.data.editNumber === null) {      
        props.setError('Author not found')    
    }  
    }, [editAuthorResult.data])



    console.log("Currently selected author:", selected)



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
      <div>
      <h2>change author</h2>

      <select value={selected} onChange={handleChange}>
        {props.authors.map((a) => {
          <option value={a.name}>{a.name}</option>
        })}
      </select>

      {/*<form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>change birth year</button>
      </form>*/}
    </div>
    </div>

  )
}

export default Authors
