import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import useCountry from './hooks/useCountry'

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

const useCountry = (name) => {
  const [country, setCountry] = useState(null)


  /*useEffect(() => {
    country !== null ? setCountry("notfound") : setCountry(null)
  }, [])*/

  useEffect(() => {
    
      console.log('useEffect, name:', name)
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response)=>{
        console.log('useEffect, response:', response)
        const fetchedCountry=response
        console.log('useEffect, fetched country:', fetchedCountry)
      setCountry(fetchedCountry)
      })
      .catch((error) => {
        console.log('error while fetching country data:', error)
        //This is needed to ensure that "not found" is not rendered immediately upon loading page
        setCountry(null)
      })
    
  }, [name])

  return country
}



const Country = ({ country,  name } ) => {
  console.log('Country component, country:', country)
  console.log('Country component, setted name:', name)

  if(country?.data){
    console.log('Country component, country.data:', country.data)
  }

  if (!country && name === "") {
    console.log('Country component, country null or undefined')
    return null
  }

  if (!country && name !== "") {
    console.log('Country component, country not found')
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log('Country component, country found')

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>Capital: {country.data.capital} </div>
      <div>Population: {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('nameInput')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    console.log('fetch, nameInput.value:', nameInput.value)
    e.preventDefault()
    setName(nameInput.value)

    
  }

  console.log('App, name input:', nameInput)
  console.log('App, setted name:', name)
  console.log('App, used country:', country)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} name={name} />
    </div>
  )
}

export default App