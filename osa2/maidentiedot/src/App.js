import { useState, useEffect } from 'react'
import axios from 'axios' 
import Countries from "./components/Countries"
import CountryFilter from "./components/CountryFilter"


const App =  () => {
  
  const [countries, setCountries] = useState([]) 
  const [searchCountry, setSearchCountry] = useState('')
  const [filteredCountries, setFilteredCountries]= useState([])
  const [countryClick, setCountryClick]= useState('')
  const [showFullStatusForFiltered, setShowFullStatusForFiltered]=useState([])
  const handleSearch = (event) => {
    
    console.log("\nNEW SEARCH ATTEMPT\n")
    if(event.target.value !== ""){
      console.log("Search for: "+event.target.value)
      setSearchCountry(event.target.value)
      //console.log('All retrieved countries from website before filtering in handleSearch:', countries)
      setFilteredCountries(searchCountry !== "" 
      ? countries.filter(listcountry => listcountry.name.common.toLowerCase().includes(searchCountry.toLowerCase()) || listcountry.name.official.toLowerCase().includes(searchCountry.toLowerCase()))
      : countries)
      //console.log("Filtered data in handleSearch: ", filteredCountries)
      setShowFullStatusForFiltered(Array(filteredCountries.length).fill(false))
      console.log("Filtered countries show full button statuses after new search:", showFullStatusForFiltered)
    }
    else{
      console.log("Search bar is empty")
      setSearchCountry('')
      setFilteredCountries([])
      
    }

  }



  const handleCountryClick= (event) =>
  {
      event.preventDefault()
      console.log("handleCountryClick, clicked button:", event.target.value)
      setCountryClick(event.target.value)
      let filteredcountryindex=0
      filteredCountries.forEach((country) => {
          if (country.name.common === countryClick){
              //console.log("Clicked the button of a country that is shown")
              const newshowstatuses = showFullStatusForFiltered 
              //console.log("Copied show statuses before editing the original: ", newshowstatuses)
              //If the show status for the pressed button is False, switch to True and vice versa 
              if(newshowstatuses[filteredcountryindex]===false){
                newshowstatuses[filteredcountryindex]=true
              }
              else{
                newshowstatuses[filteredcountryindex]=false
              }
              setShowFullStatusForFiltered(newshowstatuses)
              console.log("Show statuses after pressing \"show\" button for a country: ", showFullStatusForFiltered)
          }
          filteredcountryindex+=1
        } 
      )
      

  }

  

  //Effect hook
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
      .then(response =>
      {
        console.log("Promise response: ", response)
        setCountries(response.data)
      })
  }, [])
  
  
  
  return (
    <div>
      
      <h2>Countries from https://restcountries.com</h2>
      <br/>
      Find countries
      <br/>
      <CountryFilter searchCountry={searchCountry} onChange={handleSearch}/>
      <br/>
      <br/>
      <h2>Countries</h2>
      <Countries countries={countries} filteredCountries={filteredCountries} handleCountryClick={handleCountryClick} showFullStatusForFiltered={showFullStatusForFiltered}/>
    </div>
  );

}

export default App;
