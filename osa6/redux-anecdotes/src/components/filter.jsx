import { filterChange } from '../reducers/anecdoteFilterReducer.js'
import { useDispatch } from 'react-redux'


const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
              // input-kentän arvo muuttujassa event.target.value
        const filter = event.target.value
        /*console.log('text filter value just before dispatch in event handler:', filter)*/
        dispatch(filterChange(filter))

    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter

  