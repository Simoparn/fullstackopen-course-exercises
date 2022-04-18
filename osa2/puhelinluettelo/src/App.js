import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import NameFilter from "./components/NameFilter"
import PersonForm from "./components/PersonForm"
//DB requests module (axios)
import personRequestServices from "./services/requests" 



const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Phonebook app, Simo P.</em>
    </div>
  )
}


const Notification = ({ message }) => {
  console.log("Notification props: ", message)
  if (message === null) {
    return null
  }
  else if(message.toLowerCase().includes('error') ||  message.toLowerCase().includes('fail')){
  return (
    <div className="error">
      {message}
    </div>
  )
  }
  else {
    return (
      <div className="success">
        {message}
      </div>
    )
    }

}






const App= () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filteredPersons, setFilteredPersons]= useState([])
  const [notificationMessage, setNotificationMessage] = useState('something happened')
  

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

  //Problem with re-rendering updates, shows only the updated person as if filtered with search
  const addPerson = (event) => {    
    event.preventDefault()
       
    const personObject = {
      name: newName,
      phonenumber: newPhoneNumber,
      date: new Date().toISOString()
    }
    console.log("Input name in browser", newName)
    console.log("All names in browser", persons)
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
              //Notification message
              setNotificationMessage(         
                `Modified '${personToUpdate[0].name}' successfully`
                )        
                setTimeout(() => {          
                  setNotificationMessage(null)        
                }, 6000)
              
          })
          .catch(error => {      
            setNotificationMessage(         
              `Error. Person '${personToUpdate[0].name}' is already removed from the server.`
              )        
              setTimeout(() => {          
                setNotificationMessage(null)        
              }, 6000)
              
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
          //Notification message
          setNotificationMessage(         
            `Added '${personObject.name}' successfully`
            )        
            setTimeout(() => {          
              setNotificationMessage(null)        
            }, 6000)

        }).catch(error => {   
	  console.log(error.response.data.error)   
          if(error.response.data.error.toLowerCase().includes("validation")){
		setNotificationMessage(error.response.data.error)
		setTimeout(() => {          
              setNotificationMessage(null)        
            }, 10000) 	
	  }
	else {
	  setNotificationMessage(         
            `Some error happened while trying to add a new person: '${personObject.name}' to server`
            )        
            setTimeout(() => {          
              setNotificationMessage(null)        
            }, 6000)   
        
	}
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
                  //Notification message
                  setNotificationMessage(         
                  `Deleted '${personToDelete[0].name}' successfully`
                  )        
                  setTimeout(() => {          
                  setNotificationMessage(null)        
                  }, 5000)              
                })
                  .catch(error => {      
                    setNotificationMessage(         
                      `Some error happened while trying to delete '${personToDelete[0].name}' from server`
                      )        
                      setTimeout(() => {          
                        setNotificationMessage(null)        
                      }, 5000)
                    
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
      <Notification message={notificationMessage}/>
      <NameFilter searchPerson={searchPerson} onChange={handleSearch}/>
      <br/>
      <br/>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneNumberChange={handlePhoneNumberChange} newName={newName} newPhoneNumber={newPhoneNumber}/>
      <h2>Numbers</h2>
      
      <Persons persons={persons} filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson}/>
      <Footer/>
    </div>
  )
}

export default App;
