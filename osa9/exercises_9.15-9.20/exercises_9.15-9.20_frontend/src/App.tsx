import { JSX, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'


interface HeaderProps {

  name:string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

/*interface CoursePartProps {
  name:string;
  exerciseCount:number;
}*/



interface CoursePartGroup extends CoursePartBase {

  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface ContentProps {
  courseName:string;
  courseParts:Array<CoursePart>;
}

interface TotalProps {
  totalExercises:number;
}



const Header = (props: HeaderProps): JSX.Element => {

  return (
    <h2>{props.name}</h2>
  )
}

const Content = (props: ContentProps): JSX.Element => {
  return(
    <>

    {props.courseParts.map((part)=>{
      switch(part.kind){
        case "basic": 
          return <Part name={part.name} exerciseCount={part.exerciseCount} description={part.description} kind={part.kind}/>
          break;
        case "group":
          return <Part name={part.name} exerciseCount={part.exerciseCount} groupProjectCount={part.groupProjectCount} kind={part.kind}/>
          break;
        case "background":
          return <Part name={part.name} exerciseCount={part.exerciseCount} description={part.description} backgroundMaterial={part.backgroundMaterial} kind={part.kind}/>
          break;
        case "special":
          return <Part name={part.name} exerciseCount={part.exerciseCount} description={part.description} requirements={part.requirements} kind={part.kind} />
          break;
        default:
          break;
      }
      
    })}
  </>
  )
}

const Part = (props: CoursePart): JSX.Element => {
  console.log('Part, component, part:', props)
  switch(props.kind){
      case "basic":
          return(
            <p>
            <b>{props.name} </b>
            <br/>Exercises: {props.exerciseCount}
            
            </p>
          )
      case "group":
        return(
          <p>
          <b>{props.name} {props.exerciseCount}</b>
          <br/>Number of group project exercises: {props.groupProjectCount}
        
        </p>
        )
      
      case "background":
        return(
        <p>
          <b>{props.name}</b> 
          <br/>Exercises: {props.exerciseCount}
          <br/>Description: {props.description}
          <br/>Background material: {props.backgroundMaterial}
          
        </p>
        )
      case "special":
        return(
        <p>
          <b>{props.name} </b>
          <br/>Exercises:   {props.exerciseCount}
          <br/>Description: {props.description}
          <br/>Requirements: {props.requirements}
          
        </p>
        )
        default:
          return (<></>)
      }
}

const Total = (props: TotalProps): JSX.Element => {
  return(
    <>
     <br/><h2>Total number of exercises {props.totalExercises}</h2>
     </>
    
  )
}





function App() {
 


  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);



  return (
    
    <div>
      <Header name={courseName}></Header>
    <Content courseName={courseName} courseParts={courseParts}></Content>
    <Total totalExercises={totalExercises}></Total>
  </div>
  )
}

export default App
