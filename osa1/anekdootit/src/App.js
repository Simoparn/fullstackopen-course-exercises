import { useState, useEffect } from 'react'


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


const AnecdoteList = (props) => {

  props.anecdotes.forEach(anecdote => {
    console.log('\nAnecdote: ',anecdote,'\n Votes: ',props.votes[props.anecdotes.indexOf(anecdote)],'\n')
  });
  return(
    <div>
      <br></br>
      <h2> Anecdote List</h2>
      {props.anecdotes.map((anecdote, index)=>
        <tr key={index}><td>{anecdote}</td><td>{props.votes[index]}</td></tr>)}
        <br></br>
    </div>
  )
  

}


const Mostvotes = (props) => {
  



  console.log("Highest voted anecdote: ", props.maxanecdote);
  return(
    <>
      <h2><p>Anecdote with most votes</p></h2><br/>
      {props.maxanecdote}
      <br/>
      <h3>has {props.maxanecdotevotes} votes</h3>
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

  const [selectedanecdote, setSelectedAnecdote] = useState(0)
  const [votes, addVote] = useState(Array(7).fill(0))
  const [maxanecdote, setMaxAnecdote] = useState("")
  const [maxanecdotevotes, setMaxAnecdoteVotes] = useState(0);
  
  
  
  const handleVoteclick = () =>
  {
    const copy =  [...votes]
    for(var i=0; i<=votes.length-1; i++)
    {
      //Kasvatetaan halutun anekdootin äänimäärää
      if(i===selectedanecdote)
      {
        copy[i]+=1;
      }
    }
    addVote(copy);
    //console.log("Original vote array after assigning the copied value back:", votes);
    


    
  
  } 
    
  const handleNextanecdoteclick = () => 
  {

    let randomanecdote=Math.round(Math.random()*6); 
    setSelectedAnecdote(randomanecdote);
  }


  useEffect(()=>{
    //Tarkistetaan kaikkien anekdoottien äänimäärät
    for(let i=0; i<votes.length; i++)
    {
      
        if(votes[i]>maxanecdotevotes){
          //console.log('\n ',anecdotes[i],':',votes[i],'\n has more votes than \n ',anecdotes[i-1],':',votes[i-1])
          setMaxAnecdoteVotes(votes[i]);
          setMaxAnecdote(anecdotes[i]);
        }
      
    }},[votes]);


  console.log("Highest voted anecdote: ", maxanecdote);


  
  return (
    <div className="App">    
      <h2>Anecdote of the day</h2><br/>
      {anecdotes[selectedanecdote]}<br/>
      has {votes[selectedanecdote]} votes<br/>
      <Button handleClick = {handleVoteclick} votes={votes} anecdotes={anecdotes} text="vote"/>
      <Button handleClick = {handleNextanecdoteclick}  text="next random anecdote"/>
      <AnecdoteList anecdotes={anecdotes} votes={votes}/>
      <Mostvotes anecdotes={anecdotes} votes={votes} maxanecdotevotes={maxanecdotevotes} maxanecdote={maxanecdote}/>
    </div>
  );
}

export default App;
