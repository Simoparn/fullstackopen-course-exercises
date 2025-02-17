import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient , ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


const authLink = setContext((_, { headers }) => {  
  const token = localStorage.getItem('book-library-user-token')  
  return {    
    headers: {      
      ...headers,      
      authorization: token ? `Bearer ${token}` : null,    
    }  
  }
})



//Needed for token-based authentication
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  //uri without contexts and createHttpLink
  /*uri: 'http://localhost:4000',*/
  cache: new InMemoryCache(),
  //Needed for token-based authentication
  link: authLink.concat(httpLink)
})

//console.log('ApolloClient object, checking for context problem with expired tokens:', client)



ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
