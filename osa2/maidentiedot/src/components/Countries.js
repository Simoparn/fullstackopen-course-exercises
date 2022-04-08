import Country from "./Country"

const Countries = ({key, countries, filteredCountries, handleCountryClick, showFullStatusForFiltered}) => {
    
    //console.log("Props in Countries:", countries, filteredCountries)

    if(filteredCountries.length === 0){
      console.log("Empty search, no countries")
      return (
    
        <ul>
            <h4>Empty search, no countries shown</h4>     
        </ul>
      )
    }


    else if(filteredCountries.length === 1){
      console.log("Found only 1 country, showing detailed information.")
      return (
      
        <ul>
            <h4>Country</h4>
            <Country key={filteredCountries[0].name.common} name={filteredCountries[0].name.common} capital={filteredCountries[0].capital} area={filteredCountries[0].area} languages={filteredCountries[0].languages} flag={filteredCountries[0].flags.png} filteredCountriesLength={filteredCountries.length}/>
          
      </ul>
      )
    }
  
  
    
    else if(filteredCountries.length > 1 && filteredCountries.length <= 10){
      console.log("More than 1 country in Countries")
      
        
        
          
          return (
        
            <ul>
                <h4>Found the following countries</h4>
                {filteredCountries.map( country =>
                <>
                <br/>
                <br/>
                <Country key={country.name.common} name={country.name.common} capital={filteredCountries[filteredCountries.indexOf(country)].capital} area={filteredCountries[filteredCountries.indexOf(country)].area} languages={filteredCountries[filteredCountries.indexOf(country)].languages} flag={filteredCountries[filteredCountries.indexOf(country)].flags.png} filteredCountriesLength={filteredCountries.length} showFullStatus={showFullStatusForFiltered[filteredCountries.indexOf(country)]}/> 
                &nbsp;<button value={country.name.common} onClick={handleCountryClick}>show</button>
                </>
                )}
            
            </ul>
          )
          
        
        

        
      
    }
    
    else {
      //console.log("No filtered search data in Countries, showing the full list.")
      return (
        <ul>
          <h4>Too many countries, specify another filter</h4>

          </ul>
        )
      }

}



export default Countries