import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  //const [selected, setSelected] = useState('')

  

  const [ editAuthor, editAuthorResult ] = useMutation(EDIT_AUTHOR, {
    //refetchQueries needed for updating cache after creating new entries (if not handled manually with update callback below). 
    //Also generates less traffic than pollInterval in App.js, but the state change won't be seen by every user automatically
    refetchQueries: [  {query: ALL_AUTHORS} ],
    //awaitRefetchQueries: true,
    onError: (error) => {
      if(error.graphQLErrors.length > 0){
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        console.log("editAuthor mutation error, error.graphQLErrors:", messages)      
        props.setError(messages)   
      }
      else{
        console.log('editAuthor mutation error, error message:', error.message)
        const messages = error.message
        props.setError(messages)
        
      }
    },
    //Needed for updating the query in cache with new data (such as after creating a new person)
    update: (cache, response) => {      
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {       
        console.log('Authors.js, Frontend cache update after edit query, response.data.:', response.data) 
        console.log('Authors.js, Frontend cache update after edit query, response.data.editAuthor:', response.data.editAuthor)

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

    /*if(editAuthorResult.data){
      console.log('result data from editing author:', editAuthorResult.data)
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
    }*/
    

    
    }, [editAuthorResult.data])


    console.log("Authors, authors data:", props.authors)
    //console.log("Currently selected author:", name)
    //console.log('Currently selected birth year:', born)



  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
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
