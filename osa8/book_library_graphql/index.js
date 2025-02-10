const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
//const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const book = require('./models/book')
//const User = require('./models/user')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
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

const typeDefs = `



  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
    

  
  }

  type Book {
    title: String!
    published: Int!
    author: Author! 
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async (root, args)=>{
      //Without back-end database (MongoDB)
      //return books.length

      const books=await Book.find({})
      return books.length
    },
    authorCount: async (root, args)=>{
      //Without back-end database (MongoDB)
      //return authors.length

      const authors=await Author.find({})
      return authors.length
    },
    allBooks: async (root, args)=>{
      console.log("allBooks, args:", args)
      
      //Without back-end database (MongoDB)
      /*if(args.author || args.genre){
        if(args.author && args.genre){
          
          console.log(books.filter(b => b.author === args.author))
          //If the genre is found in the list of genres for a book of the desired author, include the book
          console.log(books.filter(b => b.author === args.author).filter(b => (b.genres.find(g => g === args.genre))))
          return books.filter(b => b.author === args.author).filter(b => (b.genres.find(g => g === args.genre)))
        }
        if(args.author){
          console.log(books.filter(b => b.author === args.author))
          return books.filter(b => b.author === args.author)
        }
          return books.filter(b => (b.genres.find(g => g === args.genre)))
      }
    
        return books*/
    
      if(args.author || args.genre){
        if(args.author && args.genre){
        
          return Book.find({ author: { $exists: args.author === 'YES' && args.genre === 'YES'  }})
        }
        if(args.author){
          
          return Book.find({ author: { $exists: args.author === 'YES'  }})
        }
          //return books.filter(b => (b.genres.find(g => g === args.genre)))
          return Book.find({ author: { $exists: args.genre === 'YES'  }})
      }
        
        let books = await Book
        .find({}).populate('author', { _id: 0, name: 1 })
        
        //books=books.map(b => ({...b, author:b.author.name}))
        //books.forEach(b => )
        console.log('allBooks, no filters, all books retrieved:', books)
        return books
    

      
    },
    //Without back-end database (MongoDB)
    /*allAuthors: (root, args)=>{
      
      const authorsWithBookCount=authors.map(a=>{
          const count = books.filter(b => b.author === a.name).length
          a.bookCount=count
          return a
          
        }
      )
      //console.log("authorsWithBookCount: ", authorsWithBookCount)
      return authorsWithBookCount 
    
    },*/
    allAuthors: async (root, args)=>{

      const authors=await Author.find({})
      const books=await Book.find({})


      //The following is needed because we need a bookCount attribute and
      //mongoDN documents retrieved with find are immutable 
      const authorsWithBookCount = authors.map(a=>{
        const count = books.filter(b => b.author.toString() === a._id.toString()).length
        const authorObject=a.toObject()
        authorObject.bookCount=count

        
        
        let oldKey="_id"
        let newKey="id"
        if(authorObject.hasOwnProperty(oldKey)){
          authorObject[newKey]=authorObject[oldKey]
          delete authorObject[oldKey]
        }

        return authorObject
      })
      console.log('allAuthors, authorsWithBookCount:', authorsWithBookCount)
      return authorsWithBookCount
    
      
    },

    /*me: (root, args, context) => {
      return context.currentUser
    }*/
  },

  /*Book: {
    author: (root) => {
      //console.log("author resolver, root.author:", root.author)
      return {
        name: root.author,
        born: root.born,
        id: uuid()
        
      }
    },
    
  },*/
  /*Author: {
    name: (root) => {
      return {
        name: root.name,
        born: root.born,
        id: uuid()
      }
    }
  },*/

  Mutation:{
    //Without back-end database (MongoDB)
    /*addBook: (root, args) => {
      console.log("addBook, args:", args)
      const book = { ...args, id: uuid() }

      books = books.concat(book)
      const foundAuthor = authors.find(a => a.name === args.author)
      if (!foundAuthor){
        console.log("addBook, nonexistent author, adding to authors:", args.author)
        const author = {name:args.author, born:null, id:uuid()}
        authors = authors.concat(author)
      }
      else {
        console.log("addBook, author already exists, cannot create a new author:", args.author)
      }
      return book

    },*/
    addBook: async (root, args, /* context */) => {
      console.log("addBook, args:", args)
      //const book = new Book({ ...args})
      //console.log('addBook, new book model object:', book)
      
      //const currentUser = context.currentUser
      
      
      const foundAuthor = await Author.findOne({ name: args.author })
      if (!foundAuthor){
        console.log("addBook, nonexistent author, adding to authors:", args.author)
        //const author = {name:args.author, born:null, id:uuid()}
        //authors = authors.concat(author)
        const author= new Author({ name:args.author, born:null })
        console.log("addBook, author model object:", author)
        try{
          await author.save()
        } catch(error){
          console.log('addBook, error while trying to save an unknown author before saving the book:', error)
        }

        const book = new Book({ ...args, author:author})
        console.log('addBook, new book model object:', book)
        
        try{
          await book.save()
          return book
        } catch(error){
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
      }
      else {     
        console.log('addBook, found author:', foundAuthor)
        console.log("addBook, author already exists, cannot create a new author:", args.author)
      
      
      const book = new Book({ ...args, author:foundAuthor})
      console.log('addBook, new book model object:', book)

      try{
        await book.save()
        return book

      } catch(error){
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
           }
         })
       }
     }

    },
    //Without back-end database (MongoDB)
    /*editAuthor: (root, args) => {
      console.log("editAuthor, args:", args)
      const author = authors.find(a => a.name === args.name)
      if(author){
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
        return updatedAuthor
      } 
      else{
        return null
      }
    },*/
    editAuthor: async (root, args) => {
      console.log("editAuthor, args:", args)
      const author = await Author.findOne({ name: args.name })
      if(author){
        try{
          author.born = args.setBornTo
          await author.save()
          return author
        }catch (error){
          throw new GraphQLError('Editing author failed, setting a new birth year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,            
              error  
              }
            })
          }   
      } 
      else{
        throw new GraphQLError('Editing author failed, author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,            
            error  
            }
          })
      }
    },
    /*createUser: async (root, args) => {
        const user = new User({ username: args.username })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },*/

    /*
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }*/
      

  },
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 }, 
  /*context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null    
      if (auth && auth.startsWith('Bearer ')) {      
        const decodedToken = jwt.verify(        
          auth.substring(7), process.env.JWT_SECRET      
        )      
        const currentUser = await User.findById(decodedToken.id).populate('friends')      
        return { currentUser }    
  }   */
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})