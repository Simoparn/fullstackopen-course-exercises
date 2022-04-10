const Person = (props) => {
    //console.log("Props in Person: ", props)
    return (
      <>
      <li>{props.name} {props.phonenumber}
      &nbsp;<button onClick={props.handleDeletePerson} value={props.name}>Delete person</button></li>
      </>
    )
  }

  export default Person