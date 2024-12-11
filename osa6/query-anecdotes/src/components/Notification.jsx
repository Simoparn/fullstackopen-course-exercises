import { useContext } from "react"
import { useQueryClient, useMutation } from '@tanstack/react-query'
import  NotificationContext  from '../NotificationContext'
//import { useAnecdoteValue } from '../notificationContext'


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    
  }


  
  
  console.log('Notification, NotificationContext before useContext:', NotificationContext)
  const [anecdoteNotification, dispatch] = useContext(NotificationContext)

  console.log('Notification, NotificationContext after useContext:', NotificationContext)

  
  //This is needed because both elements of useContext are objects, which cannot be rendered directly.
  const notificationStateAsArray = Object.entries(anecdoteNotification)[0]
  const notificationValue = notificationStateAsArray[1]
  console.log('Notification, notification value in the context state object:',  notificationValue )

  return (
    <div style={style}>
      {notificationValue}
    </div>
  )
}

export default Notification