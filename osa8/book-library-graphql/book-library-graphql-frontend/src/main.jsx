import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient , ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


//Needed for GraphQL subscriptions for monitoring server data changes from front-end
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'


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

//Needed for GraphQL subscriptions for monitoring server data changes from front-end
const wsLink = new GraphQLWsLink(
  createClient({  
    url: 'ws://localhost:4000',
}))
const splitLink = split(  ({ query }) => {
      const definition = getMainDefinition(query)    
      return (      
        definition.kind === 'OperationDefinition' && definition.operation === 'subscription'    
      )  
    },  
    wsLink,  
    authLink.concat(httpLink)
)

const client = new ApolloClient({
  //uri without contexts and createHttpLink
  /*uri: 'http://localhost:4000',*/
  cache: new InMemoryCache(),
  //Needed for token-based authentication
  //link: authLink.concat(httpLink)
  //Needed for token-based authentication and GraphQL subscriptions for monitoring server data changes from front-end
  link: splitLink
})

//console.log('ApolloClient object, checking for context problem with expired tokens:', client)



ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
