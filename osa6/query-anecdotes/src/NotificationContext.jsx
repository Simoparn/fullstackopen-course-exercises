import { createContext, useReducer, /*useContext*/ } from 'react'

export const notificationReducer = (state, action) => {
  console.log('notificationReducer, action.type:', action.type)
  console.log('notificationReducer, action.type, typeof:', typeof(action.type))
  console.log('notificationReducer, action.payload:', action.payload)
  console.log('notificationReducer, action.payload, typeof:', typeof(action.payload))
    switch (action.type) {
      case "submit":
        console.log('notificationReducer, submit action')
        const newNotification = action.payload
        const newState = {...state, anecdoteNotification: newNotification }
        return newState
      default:
        console.log('notificationReducer, default action')
          return state
    }
  }


  const NotificationContext = createContext()

  const initialState = { anecdoteNotification: "" };

  export const NotificationContextProvider = (props) => {
    const [anecdoteNotification, anecdoteDispatch] = useReducer(notificationReducer, initialState)
  
    return (
      <NotificationContext.Provider value={[anecdoteNotification, anecdoteDispatch]}>
        {props.children}
      </NotificationContext.Provider>
    )
  }


  /*
  export const useCounterValue = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[0]
  }
  
  export const useCounterDispatch = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[1]
  }
  */


  export default NotificationContext