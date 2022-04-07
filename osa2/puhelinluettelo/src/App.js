import { useState } from 'react'
import Persons from "./components/Persons"
import NameFilter from "./components/NameFilter"
import PersonForm from "./components/PersonForm"


const App= () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phonenumber: '040-1231244' },
    { name: 'Ada Lovelace', phonenumber: '39-44-5323523' },
    { name: 'Dan Abramov', phonenumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phonenumber: '39-23-6423122' },
    { name: 'Kuuno Kaakkuri', phonenumber: '39-44-5323595' },
    { name: 'Meikä Mattilainen', phonenumber: '12-43-235745' },
    { name: 'Gary Hoppenheim', phonenumber: '39-23-6447182' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filteredPersons, setFilteredPersons]= useState([])

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handlePhoneNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewPhoneNumber(event.target.value)  
  }

  const handleSearch = (event) => {
    console.log("\nNEW SEARCH ATTEMPT\n")
    if(event.target.value !== ""){
      console.log("Search for: "+event.target.value)
      setSearchPerson(event.target.value)
      setFilteredPersons(searchPerson !== "" 
      ? persons.filter(listperson => listperson.name.toLowerCase().includes(searchPerson.toLowerCase()))
      : persons)
      console.log("Filtered data in handleSearch: ", filteredPersons)
    }
    else{
      console.log("Search bar is empty")
      setSearchPerson('')
      setFilteredPersons([])
      
    }

  }

  const addName = (event) => {    
    event.preventDefault()    
    const personObject = {
      name: newName,
      phonenumber: newPhoneNumber,
      date: new Date().toISOString()
    }
    let personalreadyexists= persons.find(person => person.name.toLowerCase()===personObject.name.toLowerCase())
    if(personalreadyexists)
     {
       window.alert(personalreadyexists.name+" is already in the phonebook!")
       
     }
    else
     {
        setPersons(persons.concat(personObject))
        setNewName('')  
    }
  }

  

  
  return (
    <div>
      <div>debug: {newName}</div>

      
      <h2>Phonebook</h2>
      <NameFilter searchPerson={searchPerson} onChange={handleSearch}/>
      <br/>
      <br/>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handlePhoneNumberChange={handlePhoneNumberChange} newName={newName} newPhoneNumber={newPhoneNumber}/>
      <h2>Numbers</h2>
      
      <Persons persons={persons} filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App;
