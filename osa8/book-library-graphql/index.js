//const bcrypt = require('bcrypt')
const { ApolloServer } = require('@apollo/server')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')
//Without express.js middleware needed for GraphQL subscriptions
const { startStandaloneServer } = require('@apollo/server/standalone')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
//const { v1: uuid } = require('uuid')
const express = require('express')
const http = require('http')
const cors = require('cors')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
//const Author = require('./models/author')
//const Book = require('./models/book')
const User = require('./models/user')


require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to MongoDB:', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB:', MONGODB_URI)
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

/*let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]*/

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

/*let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]*/

/*
  you can remove the placeholder query once your first one has been implemented 
*/



// setup is now within a function
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)  

  //Needed for websocket subscriptions for server data changes
  const wsServer = new WebSocketServer({    
    server: httpServer,    
    path: '/',  
  })




//Needed for websocket subscriptions for server data changes
const schema = makeExecutableSchema({ typeDefs, resolvers })  
const serverCleanup = useServer({ schema }, wsServer)


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {        
      async serverWillStart() {          
        return {            
          async drainServer() {              
            await serverCleanup.dispose();            
          },          
        };        
      },      
    },    
  ],
  formatError: (formattedError, error) => {
    console.log('Apollo Server backend error handler, catched error:', error.message)
    console.log('Apollo Server backend error handler, formatted error:', formattedError.message)
    if (formattedError.message.startsWith('Context creation failed: jwt expired: ')) {
      console.log('Automatic login attempt from frontend failed, user token expired')
      return { message: 'Automatic login failed, user token expired' };
  
    }
    return formattedError;
  
  },
  //Without express.js middleware for cors
  /*cors: {
    origin: 'http://localhost:4000',
    credentials: true
  }*/
})

await server.start()

  app.use(    
    '/',    
    cors(),    
    express.json(),    
    expressMiddleware(server, {      
      context: async ({ req }) => {        
        const auth = req ? req.headers.authorization : null        
        if (auth && auth.startsWith('Bearer ')) {          
          try{
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)          
            const currentUser = await User.findById(decodedToken.id)     
            /*const currentUser = await User.findById(decodedToken.id).populate(            
              'friends'          
            )*/         
            return { currentUser }
          }catch(error){
            if(error instanceof jwt.TokenExpiredError){
              throw new GraphQLError('Automatic login fail while trying to set context server-side, expired user token', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                
                }
              })  
            }
          }       
        }      
      },    
    }),  
  )

  const PORT = 4000  
  httpServer.listen(PORT, () =>    
    console.log(`Server is now running on http://localhost:${PORT}`)  
  )
}


start()

//Without websocket subscriptions for server data changes
/*startStandaloneServer(server, {
  listen: { port: 4000 }, 
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null    
      if (auth && auth.startsWith('Bearer ')) {      
        try{
          const decodedToken = jwt.verify(        
            auth.substring(7), process.env.JWT_SECRET      
          )      
          const currentUser = await User.findById(decodedToken.id)     
          return { currentUser }
        }catch(error){
          if(error instanceof jwt.TokenExpiredError){
            throw new GraphQLError('Automatic login fail while trying to set context server-side, expired user token', {
              extensions: {
                code: 'BAD_USER_INPUT',
              
              }
            })  
          }
        }    
      }
  }   
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
}).catch((error)=>{
  console.log('Error while starting server:', error)
})*/