const bcrypt = require('bcrypt')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
//const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
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

const typeDefs = `



  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    favoriteBooks(token: String): [Book!]!
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
      born: Int!
    ): Author

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token

    tokenLogin(
      token: String
    ): Token

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
      //console.log("allBooks, args:", args)
      
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
        .find({}).populate('author', { _id: 1, name: 1 })
  
        //console.log('allBooks, no filters, all books retrieved:', books)
        
        return books
    

      
    },
    favoriteBooks: async (root, args)=>{
      console.log('favoriteBooks, args:', args)
        if(args.token){
          console.log('favoriteBooks, token found:', args.token)
          try{
            const verifiedToken=jwt.verify(args.token, process.env.JWT_SECRET)
            console.log('favoriteBooks, user token found, verified token:', verifiedToken)
            if(verifiedToken){
              const user = await User.findOne({username: verifiedToken.username})
              console.log('favoriteBooks, found user:', user)

              if(user.favoriteGenre.length > 0){

                
                const allBooks = await Book.find({}).populate('author', { _id: 0, name: 1 })

                const favoriteBooks =  allBooks.filter((b) => b.genres.includes(user.favoriteGenre))

                //console.log('favoriteBooks, favorite books for user:', favoriteBooks)
                return favoriteBooks
              }

            }
          }
          catch(error){
            console.log('favoriteBooks, error:', code)
            if (error instanceof jwt.TokenExpiredError){
              console.log("error while retrieving trying to verify an user, token expired:", error)
              throw new GraphQLError('Fetching favorite books failed, expired user token', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.token
                }
              })  
            
            }
            else if (error instanceof jwt.JsonWebTokenError) {
              console.log("error while trying to verify an user, token is invalid:", error)
              throw new GraphQLError('Fetching favorite books failed, invalid user token', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.token
                }
              })  
              
            }
            else {
              console.log("Unknown error while trying to get favorite books:", error)
              throw new GraphQLError('Fetching favorite books failed, unknown error', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                }
              }) 
            }
          }

          
        
        
      }
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
        authorObject._id=authorObject._id.toString()  
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

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  
  

  //Without back-end database (MongoDB)
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

  //Without back-end database (MongoDB)
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
    addBook: async (root, args, context ) => {
      console.log("addBook, args:", args)
      //const book = new Book({ ...args})
      //console.log('addBook, new book model object:', book)
      
      const currentUser = context.currentUser
      
      console.log('addBook, context.currentUser:', currentUser)

      if(currentUser){
        console.log('addBook, valid user token found, adding a new book')

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
            console.log('addBook, error while trying to create an unknown author before saving the book:', error)
            throw new GraphQLError('Saving book failed, author name is too short', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }

          const book = new Book({ ...args, author:author})
          console.log('addBook, new book mongoose model object:', book)
          
          try{
            await book.save()
            const bookObject=book.toObject()
            bookObject._id=bookObject._id.toString()  
            let oldKey="_id"
            let newKey="id"
            if(bookObject.hasOwnProperty(oldKey)){
              bookObject[newKey]=bookObject[oldKey]
              delete bookObject[oldKey]
            }
            if(bookObject.author.hasOwnProperty(oldKey)){
              bookObject.author[newKey]=bookObject.author[oldKey]
              delete bookObject.author[oldKey]
            }

            console.log('addBook, book before returning:', bookObject)
            return bookObject
            //return book
          } catch(error){
            console.log("addBook, error while trying to save a book after creating the new author:", args.author)
            throw new GraphQLError('Saving book failed, book title is too short', {
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
        
          
          /*const foundAuthorObject=foundAuthor.toObject()
          foundAuthorObject._id=foundAuthorObject._id.toString()  
          let oldKey="_id"
          let newKey="id"
          if(foundAuthorObject.hasOwnProperty(oldKey)){
            foundAuthorObject[newKey]=foundAuthorObject[oldKey]
            delete foundAuthorObject[oldKey]
          }
          console.log('addBook, found author as plain JavaScript object:', foundAuthorObject)*/
        
          const book = new Book({ ...args, author:foundAuthor})
          console.log('addBook, new book mongoose model object:', book)

          try{
            await book.save()
            const bookObject=book.toObject()
            bookObject._id=bookObject._id.toString()  
            let oldKey="_id"
            let newKey="id"
            if(bookObject.hasOwnProperty(oldKey)){
              bookObject[newKey]=bookObject[oldKey]
              delete bookObject[oldKey]
            }
            
            
            if(bookObject.author.hasOwnProperty(oldKey)){
              bookObject.author[newKey]=bookObject.author[oldKey]
              delete bookObject.author[oldKey]
            }
            console.log('addBook, book before returning', bookObject)
            return bookObject
            //return book

          }catch(error){
            console.log('addBook, error while trying to save before a book and the author already exists in database:', error)
            
            if(error.errors.genres){
              throw new GraphQLError('Saving book failed, must have atleast 1 genre for the book', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.genres,
                  error
                }
              })
            }
            else if(error.errors.published){
              throw new GraphQLError('Saving book failed, published year cannot exceed 10000', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.published,
                  error
                }
              })
            }
            else {
                throw new GraphQLError('Saving book failed, book title may be too short', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    //invalidArgs: args.title,
                    error
                  }
                })
            }
          }
        }
      } else {
        console.log('addBook, no valid user token found, cannot add a new book')
        throw new GraphQLError('Adding a new book failed, no valid user token', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

    },
    //Without back-end database (MongoDB)
    /*editAuthor: (root, args) => {
      console.log("editAuthor, args:", args)
      const author = authors.find(a => a.name === args.name)
      if(author){
        const updatedAuthor = { ...author, born: args.born }
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
        return updatedAuthor
      } 
      else{
        return null
      }
    },*/
    editAuthor: async (root, args, context) => {
      console.log("editAuthor, args:", args)


      const currentUser = context.currentUser
      
      console.log('editAuthor, context.currentUser:', currentUser)

      if(currentUser){
        console.log('editAuthor, valid user token found, editing author allowed:', currentUser)
        const author = await Author.findOne({ name: args.name })
        if(author){
          console.log('editAuthor, author found:', author)
          try{
            
            
            //const newAuthor= new Author({ ..author, born:args.born })
            const editedAuthor= await Author.findByIdAndUpdate( author.id, {name:author.name, born:args.born}, { new: true, runValidators: true, context: 'query' })
            console.log('editAuthor, edited author:', editedAuthor)
            //await newAuthor.save()
            const allBooks = await Book.find({}).populate('author', { _id: 1, name: 1 })

            const authorsBooks =  allBooks.filter((b) => b.author.id === editedAuthor.id)
            console.log('editAuthor, all books of the author (needed for bookCount):', authorsBooks)
            //This is needed for object type conversion and to eliminate redundant __v field
            const editedAuthorValues={id:editedAuthor._id.toString(), name:editedAuthor.name, born:editedAuthor.born}
            
            //The following is needed because we need a bookCount attribute and
            //mongoDN documents retrieved with find are immutable 
            const editedAuthorWithBookCount={...editedAuthorValues, bookCount: authorsBooks.length}
            console.log('editAuthor, editedAuthorWithBookCount: ', editedAuthorWithBookCount)
            
            return editedAuthorWithBookCount
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
          console.log('editAuthor, no author found, cannot edit the author')
          throw new GraphQLError('Editing author failed, author not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name  
              }
            })
        }
      }
      else{
        console.log('editAuthor, no valid user found, cannot edit author')
        throw new GraphQLError('Editing author failed, no valid user token', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name  
            }
          })
      }
    },
    createUser: async (root, args) => {
        console.log('createUser, args:', args)
        

        const existingUser = await User.findOne({ username:args.username })
        if(existingUser){
          console.log('createUser, the username already exists, cannot create the new user')
          throw new GraphQLError('Creating the new user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username 
              }
            })
        } 
        
        if (args.username.length < 3) {
          console.log('createUser, the given username is too short, cannot create the new user')
          throw new GraphQLError('Username is too short, must be atleast 3 characters long', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username           
              }
            })
        }

        if(args.password.length < 3){
          console.log('createUser, the given password for the new user is too short, cannot create the new user')
          throw new GraphQLError('Password is too short, must be atleast 3 characters long', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.password           
              }
            })
        }

        if(args.favoriteGenre.length < 5){
          console.log('createUser, the favorite genre of the new user is too short, cannot create the new user')
          throw new GraphQLError('The favorite genre for the new user must be atleast 5 characters long,', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.favoriteGenre
              }
            })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(args.password, saltRounds)


        const user = new User({ username: args.username, passwordHash:passwordHash, favoriteGenre: args.favoriteGenre })

        return user.save()
          .catch(error => {
            console.log('createUser, creating the user failed for the following reason:', error)
    
            throw new GraphQLError('Creating the user failed, please try again', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },

    
    login: async (root, args) => {
      console.log('login, args:', args)
      const user = await User.findOne({ username: args.username })
  

      //await is needed for bcrypt.compare to prevent successful login with username alone, despite the redundancy warning
      const passwordCorrect =
      user === null ? false : await bcrypt.compare(args.password, user.passwordHash)


      if (!(user && passwordCorrect)) {
        console.log('login, wrong credentials, failed to login')
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
  
      console.log('login, normal login success, user for token:', userForToken)

      const signedToken = process.env.MODE.toLowerCase() !== "production" ?
          { value: jwt.sign(userForToken, process.env.JWT_SECRET, {
            expiresIn: 60 * 5
            }) 
          } :
          { value: jwt.sign(userForToken, process.env.JWT_SECRET, {
            expiresIn: 60 * 120
          }) }
        
        console.log('login, signed token:', signedToken)
        
        return signedToken
    },
      

    tokenLogin: async (root, args) => {
      console.log('tokenLogin, args:', args)
      
      try{
        const verifiedToken=jwt.verify(args.token, process.env.JWT_SECRET)
        console.log('tokenLogin, automatic login success, verified token:', verifiedToken)
        return verifiedToken
        

      }catch(error){
        console.log('tokenLogin, error:', code)
        if (error instanceof jwt.TokenExpiredError){
          console.log("error while retrieving trying automatic login for the user, token expired:", error)
          throw new GraphQLError('Automatic login failed, expired user token', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.token
            }
          })  
        
        }
        else if (error instanceof jwt.JsonWebTokenError) {
          console.log("error while trying automatic login for the user, token is invalid:", error)
          throw new GraphQLError('Automatic login fail, invalid user token', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.token
            }
          })  
          
        }
      }
  
    }
  },

  
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    console.log('Apollo Server backend error handler, catched error:', error.message)
    console.log('Apollo Server backend error handler, formatted error:', formattedError.message)
    if (formattedError.message.startsWith('Context creation failed: jwt expired: ')) {
      console.log('Automatic login attempt from frontend failed, user token expired')
      return { message: 'Automatic login failed, user token expired' };
  
    }
    return formattedError;
  
  },
  cors: {
    origin: 'http://localhost:4000',
    credentials: true
  }
})

startStandaloneServer(server, {
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
})