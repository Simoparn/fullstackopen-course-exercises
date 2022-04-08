const Country = (props) => {
    console.log("Props in Country: ", props)
    if(Object.keys(props).includes("showFullStatus")){
      
        if(props.showFullStatus === true){
          return (
            <>
          <li>Country name: {props.name}</li>
          <li>Capital: {props.capital}</li>
          <li>Area: {props.area}</li>
          <h4>Languages</h4> {Object.values(props.languages).map((language) =><li>{language}</li>)}
          <br/>
          <br/>
          <br/>
          <img src={props.flag} alt={props.name}/>
          </>
        )
      }
    }

    else{


      if(props.filteredCountriesLength === 1){
        return (
          <>
        <li>Country name: {props.name}</li>
        <li>Capital: {props.capital}</li>
        <li>Area: {props.area}</li>
        <h4>Languages</h4> {Object.values(props.languages).map((language) =><li>{language}</li>)}
        <br/>
        <br/>
        <br/>
        <img src={props.flag} alt={props.name}/>
        </>
      )
    }



      return (
        <>
        <li>{props.name}</li>
        </>
      )
    }
    
  
  }

  export default Country