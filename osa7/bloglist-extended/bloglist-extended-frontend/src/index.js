import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './store'

store.subscribe(() => console.log('index.js, state store at beginning before rendering components:', store.getState()))




ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
<App />
</Provider>)
