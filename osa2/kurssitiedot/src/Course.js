
const Course= ({course}) => {
    console.log('Course props:')
    console.log(course)
    console.log(course.parts)
    
    return (
      <div>
        <Header course={course}/>
        <Content course={course} parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }


  const Header= ({course}) => {
    console.log('Header props:')
    console.log({course})
    
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  
  const Content= ({course, parts}) => {
    
    console.log('Content props:')
    console.log({course, parts}) 
    //console.log('Parts with map() :',course.parts.map(part=>course.parts))
    return (
      <div>
        {course.parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Part= ({name, exercises}) => {
    console.log('Part props:')
    console.log({name, exercises}) 
    return (
      <div>
        <p>
          {name}  {exercises}
        </p>  
      </div>
    )
  }
  
  
  const Total= ({parts}) => {
    console.log('Total props:')
    console.log(parts) 
    const total=parts.reduce((prev, curr)=>{
    console.log("Reduce() arguments integer properties: ",prev.exercises, curr.exercises)  
    console.log("After accumulating ",prev.exercises+curr.exercises)
    return prev.exercises+ curr.exercises
    })
    
    //console.log('Total exercises: ', total)
    return ( 
      <div>
        <h4><p>Total of {total} course exercises</p></h4>
      </div>
    )
  }
  

  

  export default Course