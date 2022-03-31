

const Header= (props) => {
  console.log('Header props:')
  console.log(props)
  
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}


const Content= (props) => {
  
  console.log('Content props:')
  console.log(props) 
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Part= (props) => {
  console.log('Part props:')
  console.log(props) 
  return (
    <div>
      <p>
        {props.part.name}  {props.part.exercises}
      </p>  
    </div>
  )
}


const Total= (props) => {
  console.log('Total props:')
  console.log(props) 
  return ( 
    <div>
      <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
    </div>
  )
}


//App ja sovelluksen data
const App= () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }
  const parts=course.parts

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
      
    </div> 
    
  )
}


export default App;
