import { useState, useEffect } from 'react'
import axios from 'axios' 
import Persons from "./components/Persons"
import NameFilter from "./components/NameFilter"
import PersonForm from "./components/PersonForm"


const App= () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filteredPersons, setFilteredPersons]= useState([])

  const handleNameChange = (event) => {    
    //console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handlePhoneNumberChange = (event) => {    
    //console.log(event.target.value)    
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

  //Effect hook
  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
      .then(response =>
      {
        console.log("Promise response: ", response)
        setPersons(response.data)
      })
  }, [])

  

  
  return (
    <div>
      

      
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
