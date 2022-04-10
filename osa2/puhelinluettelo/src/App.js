import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import NameFilter from "./components/NameFilter"
import PersonForm from "./components/PersonForm"
//DB requests module (axios)
import personRequestServices from "./services/requests" 

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

  //Problem with re-rendering updates
  const addPerson = (event) => {    
    event.preventDefault()    
    const personObject = {
      name: newName,
      phonenumber: newPhoneNumber,
      date: new Date().toISOString()
    }
    
    let personalreadyexists= persons.find(person => person.name.toLowerCase()===personObject.name.toLowerCase())
    
    if(personalreadyexists)
    {
       let confirmupdate= window.confirm(personalreadyexists.name+" is already in the phonebook, replace the old phone number with the new one?")
        if (confirmupdate){
          
          const personToUpdate=persons.filter(listperson => listperson.name.toLowerCase()===personObject.name.toLowerCase())
          
          personRequestServices
          .updatePerson(personToUpdate[0].id, personObject)
            .then(updatedPerson => {  
              console.log("Editing a person in the database succeeded: ", updatedPerson)            
              let persontoupdateindex=persons.indexOf(personToUpdate[0])
              const updatedPersons=persons
              updatedPersons[persontoupdateindex]=updatedPerson
              console.log("Updated person list after changing a phone number: ", updatedPersons)
              //Update shown list
              setPersons(updatedPersons)
              //Update filtered list aswell
              const updatedFilteredPersons=filteredPersons
              
              updatedFilteredPersons[persontoupdateindex]=updatedPerson
              console.log("Filtered persons after updating and before re-rendering the list: ", updatedFilteredPersons)
              setFilteredPersons(updatedFilteredPersons)                      
          })
      }
    }
    else 
    {

      personRequestServices
      .createPerson(personObject)
        .then(returnedPerson => {  
          console.log("Adding a new person to the database succeeded.")      
          setPersons(persons.concat(returnedPerson))        
          setNewName('') 
          setNewPhoneNumber('') 

        })
    }
}


  const handleDeletePerson = (event) => {    
    event.preventDefault()
    
    
    const personToDelete=persons.filter(listperson => listperson.name.toLowerCase()===event.target.value.toLowerCase())
                         
    let confirmdeletion= window.confirm("Delete person: "+ personToDelete[0].name+ "?")       
          

          if(confirmdeletion){ 
            
            
            console.log("Person for deletion: ", personToDelete[0])  
            
            personRequestServices
              .deletePerson(personToDelete[0].id)
                .then(deletedPerson => {  
                  console.log("deleting the person ",deletedPerson," in the database succeeded, updating the list on the client side.")            
                  const updatedPersons=persons.filter(listperson => !(listperson.name.toLowerCase()===personToDelete[0].name.toLowerCase()))
                  console.log("Updated persons after deletion: ", updatedPersons)
                  //Update shown list
                  setPersons(updatedPersons)
                  //Update filtered list aswell
                  const updatedFilteredPersons=filteredPersons.filter(filteredlistperson => !(filteredlistperson.name.toLowerCase().includes(personToDelete[0].name.toLowerCase())))
                  setFilteredPersons(updatedFilteredPersons)                           
                })
          } 

  }



  //Effect hooks (fetching data from database etc.)




  useEffect(() => {
    personRequestServices.getAllPersons()    
      .then(initialPersons => {    
          console.log('effect hook, promise request to get all persons with imported module succeeded, adding DB data to list on client side') 
          console.log(initialPersons)
          setPersons(initialPersons)   
             }).catch(error => {
              console.log('failed to get all persons with imported module: ', error)
              })
   }, [])


  

  
  return (
    <div>
      

      
      <h2>Phonebook</h2>
      <NameFilter searchPerson={searchPerson} onChange={handleSearch}/>
      <br/>
      <br/>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneNumberChange={handlePhoneNumberChange} newName={newName} newPhoneNumber={newPhoneNumber}/>
      <h2>Numbers</h2>
      
      <Persons persons={persons} filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App;
