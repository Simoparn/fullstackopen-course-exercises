    const NameFilter= (props) =>
    {

    return (
    <div>
        filter by name 
        <br/>
        <input value={props.searchPerson} onChange={props.onChange}/>
      </div>
    )
    }

export default NameFilter