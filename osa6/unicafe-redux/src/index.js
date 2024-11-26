import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)


const Statistics = (props) => {
  
  if(props.average !== 0){ 
    return(
      <>
        <h2><p>statistics</p></h2>
        <table>
          <tbody> 
            <StatisticLine text="all: " value ={props.total}/>     
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


const StatisticLine = (props) => {

  //If the line is not for percentage of positives, returned without percent character
  if(props.text != "positive")
    return(
      <>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </>
    )
  else
    return(
      <>
        <tr>
          <td>{props.text}</td>
          <td>{props.value*100} %</td>
        </tr>
      </>
    )

}

const App = () => {
  


  

  const good = () => {
    store.dispatch({
      type: 'GOOD'
      /* if form data etc. is needed, handle the data field with action.data in reducer
      ,data: {
        good : 1,
        ok : 0,
        bad: 0
      }*/
    })
  }

  const ok = () => {
    store.dispatch({
    type: 'OK',
    })
  }


  const bad = () => {
    store.dispatch({
    type: 'BAD',
      
    })
  }

  const reset = () => {
    store.dispatch({
    type: 'ZERO',
      
    })
  }
  

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <Statistics total={store.getState().good+store.getState().ok+store.getState().bad} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
