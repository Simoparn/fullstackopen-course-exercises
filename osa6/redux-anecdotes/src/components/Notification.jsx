import { useDispatch, useSelector } from 'react-redux'
//import { reducer } from '../reducers/anecdoteReducer'



/*const Anecdotes = () => {

  const dispatch = useDispatch() 
  const anecdotes = useSelector(state => state)

  return(
    <
    {anecdotes.map(anecdote =>
      <Notification
        key={Notification.id}
        anecdote={anecdote}
        handleClick={() =>
          dispatch(toggleImportanceOf(anecdote.id))
        }
    />

  )}
  )
}*/

const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...
    </div>
  )
}



export default Notification