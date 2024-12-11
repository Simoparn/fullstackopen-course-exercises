//import { useContext } from "react"
//import { CounterContextProvider } from '../counterContext'
import { useCounterDispatch } from '../counterContext'

const Button = ( { type, label } ) => {
    //const [counter, dispatch] = useContext(CounterContextProvider)
    const dispatch = useCounterDispatch()
    
    return (
      <button onClick={() => dispatch({ type })}>
        {label}
      </button>
    )
  }

export default Button