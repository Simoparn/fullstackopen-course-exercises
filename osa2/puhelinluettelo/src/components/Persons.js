import Person from "./Person"

const Persons = ({key, persons, filteredPersons, handleDeletePerson}) => {
  
    if(filteredPersons.length !== 0){
      console.log("Filtered search data not empty in Persons, showing only the filtered data.")
      return (
        
        <ul>
            <h3>Filter results, found the following</h3>
            {filteredPersons.map( person =>
            <Person key={person.name} name={person.name} phonenumber={person.phonenumber} handleDeletePerson={handleDeletePerson}/>
            )}
        </ul>
        )
    }
    else {
      //console.log("No filtered search data in Persons, showing the full list.")
    return (
      <ul>
        <h3>Full list</h3>
        {persons.map(person => 
          <Person key={person.name} name={person.name} phonenumber={person.phonenumber} handleDeletePerson={handleDeletePerson}/>
        )}
        </ul>
      )
    }
  }



export default Persons