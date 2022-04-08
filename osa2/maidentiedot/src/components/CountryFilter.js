    const CountryFilter= (props) =>
    {

    return (
    <div>
        filter by name 
        <br/>
        <input value={props.searchCountry} onChange={props.onChange}/>
      </div>
    )
    }

export default CountryFilter