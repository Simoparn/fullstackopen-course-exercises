const Person = (props) => {
    console.log("Props in Person: ", props)
    return (
      <li>{props.name} {props.phonenumber}</li>
    )
  }

  export default Person