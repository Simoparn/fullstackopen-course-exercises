import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...
  useEffect(()=>{

    axios.get(baseUrl)
    .then((response)=>{
      console.log("useResource, useEffect response.data:", response.data)
      setResources(response.data)
    })
    .catch((error)=>{
      console.log("useResource, useEffect error while trying to fetch data:", error)
    })

  },[])

  console.log("useResource, resources after useEffect:", resources)

  const create = (resource) => {
    // ...
    console.log("useResource, resource when trying to create a new note/person:", resource)
    axios.post(baseUrl, resource)
    .then((response)=>{
      console.log("useResource, note/person creation successful:", response.data)
      const updatedResources=resources.concat(response.data)
      console.log('All resources after adding a new note/person:', updatedResources)
      setResources(updatedResources)
      return response.data
    })
    .catch((error)=>{
      console.log("useResource, error when trying to create a new note/person:", error)
    })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.length > 0 
      ? notes.map(n => <p key={n.id}>{n.content}</p>)
      : <p>ERROR: NO NOTES FOUND</p>}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.length > 0 
      ? persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)
      : <p>ERROR: NO PERSONS FOUND</p>}
    </div>
  )
}

export default App