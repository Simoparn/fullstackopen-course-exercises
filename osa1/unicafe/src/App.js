import { useState } from 'react'


const Button = (props) => {
  
  return (
    <>
      <button onClick={props.handleClick}>
        {props.text}
    </button>
  </>
  )
}



const StatisticLine = (props) => {

  //Jos rivi ei ole positiivisten prosenttia varten, palautetaan ilman prosenttimerkkiä
  if(props.text != "positive")
    return(
      <>
        <tr><td>{props.text}</td> <td>{props.value}</td></tr>
      </>
    )
  else
    return(
      <>
        <tr><td>{props.text}</td>  <td>{props.value*100} %</td></tr>
      </>
    )

}


//TODO: keskiarvo ja prosentti ei tule oikein, ei koskaan huomioi viimeisintä painallusta laskuissa, setTimeout tai async ei auttanut.
const Statistics = (props) => {
  
  if(props.good != 0 || props.neutral != 0 || props.bad != 0){ 
    return(
      <>
        <h2><p>statistics</p></h2>
        <table>
          <tbody>
              <StatisticLine text="good" value ={props.good}/>
              <StatisticLine text="neutral" value ={props.neutral}/>
              <StatisticLine text="bad" value ={props.bad}/>
              <StatisticLine text="all" value ={props.total}/>
              <StatisticLine text="average" value ={props.average}/>
              <StatisticLine text="positive" value ={props.positive}/>
          </tbody>
        </table>
      </>
    )
  }
  else{
    return(
      <>
      <h2><p>statistics</p></h2>
      <p>No feedback given</p>
      </>
    )
  }
    
}



 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // Tilastot
  const [average, updateAverage] = useState(0)
  const [positive, updatePositive] = useState(0)

  const handleClicks = () => {


  }

  
  return (
    <div>
      <h2><p>Give feedback</p></h2>
      <Button handleClick={() =>{ setGood(good+1); console.log("Good tapahtumankäsittelijässä setGoodin jälkeen ja ennen updateAveragea:"+good); updateAverage(((good*1)+(neutral*0)+(bad*-1))/(good+neutral+bad)); updatePositive(good/(good+neutral+bad))}} text="good"/>
      <Button handleClick={() =>{ setNeutral(neutral+1); console.log("Neutral tapahtumankäsittelijässä setNeutralin jälkeen ja ennen updateAveragea:"+neutral); updateAverage(((good*1)+(neutral*0)+(bad*-1))/(good+neutral+bad)); updatePositive(good/(good+neutral+bad))}} text="neutral"/>
      <Button handleClick={() =>{ setBad(bad+1); console.log("Bad tapahtumankäsittelijässä setBadin jälkeen ja ennen updateAveragea:"+bad); updateAverage(((good*1)+(neutral*0)+(bad*-1))/(good+neutral+bad)); updatePositive(good/(good+neutral+bad))}} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} total={good+neutral+bad} />
    </div>
  )
}

export default App