import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
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
  const notification = useSelector(({notification}) => {
    console.log('Notification component, useSelector:', notification)
    return notification
  })
  //const dispatch = useDispatch()
 

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      <b>NOTIFICATION:</b>
      <br/>
       {notification}
    </div>
  )
}



export default Notification