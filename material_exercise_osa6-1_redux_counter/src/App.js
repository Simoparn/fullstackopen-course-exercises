import './App.css';
import ReactDOM from 'react-dom/client';
//TODO: configureStore not found?
//import { createStore } from 'redux'

//import { useReducer } from 'react'

//import { useContext } from 'react'
//import { counterReducer } from './counterContext'
//import CounterContext from './counterContext'
import Button from './components/Button'
import Display from './components/Display'



/*const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
        return state + 1
    case "DEC":
        return state - 1
    case "ZERO":
        return 0
    default:
        return state
  }
}*/

//const store = createStore(counterReducer)



/*const Display = () => {
  const [counter, dispatch] = useContext(CounterContext)
  return <div>{counter}</div>
}*/


/*const Button = ( { type, label } ) => {
  const [counter, dispatch] = useContext(CounterContext)
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}*/


const App= () => {
  // When not importing context and reducers from separate files
  //const [counter, counterDispatch] = useReducer(counterReducer, 0)
  
  return (
    <div>
      {/* With useReducer from React without Redux, dispatch is passed
      <div>
        {//store.getState()}
        <Display counter={counter}/>
      </div>
      <Button 
        //onClick={e => store.dispatch({ type: 'INC' })}
        
        //Without Redux, using useReducer from React
        //onClick={e => counterDispatch({ type: 'INC' })}
        
        //Using Button component
        dispatch= {counterDispatch} type= 'INC' label='+'
      >
        plus
      </Button>
      <Button
        //onClick={e => store.dispatch({ type: 'DEC' })}
        
        //Without Redux, using useReducer from React
        //onClick={e => counterDispatch({ type: 'DEC' })}
        
        //Using Button component
        dispatch= {counterDispatch} type= 'DEC' label='-'
      >
        minus
      </Button>
      <Button 
        //onClick={e => store.dispatch({ type: 'ZERO' })}
        
        //Without Redux, using useReducer from React
        //onClick={e => counterDispatch({ type: 'ZERO' })}
        
        //Using Button component
        dispatch= {counterDispatch} type= 'ZERO' label='0'
        
      >
        zero
      </Button>
      */}

      {/*
      //With contexts without passing the dispatch as a prop to components*
      
      <CounterContext.Provider value={[counter, counterDispatch]}>
          <Display />
        <div>
          <Button type='INC' label='+' />
          <Button type='DEC' label='-' />
          <Button type='ZERO' label='0' />
        </div>
      </CounterContext.Provider>
      */}
    
    {/*Both Context and state amnagement with imports in createRoot from main*/}  
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
  </div>
  );
}


/*const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <CounterContextProvider><App /></CounterContextProvider>)
}*/

//renderApp()
//store.subscribe(renderApp)



export default App;
