//import { useContext } from "react"
//import { CounterContextProvider } from '../counterContext'
import { useCounterValue } from '../counterContext'



export const Display = () => {
    const counter = useCounterValue()
    //const [counter, dispatch] = useContext(CounterContextProvider)
    return <div>{counter}</div>
  }


  export default Display