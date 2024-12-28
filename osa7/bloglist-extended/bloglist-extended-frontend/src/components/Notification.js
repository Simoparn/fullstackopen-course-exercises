import { useSelector } from 'react-redux'
//import { setNotificationWithTimeout } from '../reducers/notificationReducer'


/*const notification = useSelector(({notification}) => {
  return notification
})*/

const Notification = () => {


  const notification = useSelector(({notification}) => {
    return notification
  })

    console.log('Notification component, notification message:', notification)
    if (notification === null || notification === '') {
      return null
    } else if (
      notification.toLowerCase().includes('fail') ||
      notification.toLowerCase().includes('error')
    ) {
      return <div className="error">{notification}</div>
    } else {
      return <div className="success">{notification}</div>
    }
  }

export default Notification