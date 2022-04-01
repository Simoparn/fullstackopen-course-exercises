import { useState } from 'react'


const Button = (props) => {
  //console.log("Votes: ", props.votes)
  return (
    <>
      <button style={{fontWeight:"bold"}} onClick={props.handleClick}>
        {props.text}
    </button>
  </>
  )
}

//Not showing best votes properly
const Mostvotes = (props) => {


  let anecdote="";
  let anecdotevotes=0;
  for(let i=0; i<props.votes.length-1; i++)
  {
    if(i>0){
      if(props.votes[i]>props.votes[i-1]){
        anecdotevotes=props.votes[i];
        anecdote=props.anecdotes[i];
      }
    }
  }

  console.log("Highest voted anecdote: ", anecdote);
  return(
    <>
      <h2><p>Anecdote with most votes</p></h2><br/>
      {anecdote}
      <br/>
      <h3>has {anecdotevotes} votes</h3>
    </>

  )
}

const App = (props) => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, addVote] = useState(Array(7).fill(0))
  
  
  
  
  const handleVoteclick = () =>
  {
    const copy =  [...votes]
    for(var i=0; i<=votes.length-1; i++)
    {
      //Kasvatetaan halutun anekdootin äänimäärää
      if(i===selected)
      {
        copy[i]+=1;
      }
    }
    addVote(copy);
    console.log("Original vote array after assigning the copied value back:", votes);
    

    
  
  } 
    
  const handleNextanecdoteclick = () => 
  {

    let randomanecdote=Math.round(Math.random()*6); 
    setSelected(randomanecdote);
  }
  
  return (
    <div className="App">    
      <h2>Anecdote of the day</h2><br/>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Button handleClick = {handleVoteclick} votes={votes} text="vote"/>
      <Button handleClick = {handleNextanecdoteclick}  text="next anecdote"/>
      <Mostvotes anecdotes={anecdotes} votes={votes}/>
    </div>
  );
}

export default App;
