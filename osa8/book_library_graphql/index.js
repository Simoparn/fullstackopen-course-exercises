const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
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
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
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
]

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
  }
`

const resolvers = {
  Query: {
    bookCount: (root, args)=>{
      return books.length
    },
    authorCount: (root, args)=>{
      return authors.length
    },
    allBooks: (root, args)=>{
      //console.log("allBooks, args:", args) 
      if(args.author || args.genre){
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
    
        return books
      
    },
    allAuthors: (root, args)=>{
      
      const authorsWithBookCount=authors.map(a=>{
          const count = books.filter(b => b.author === a.name).length
          a.bookCount=count
          return a
          
        }
      )
      //console.log("authorsWithBookCount: ", authorsWithBookCount)
      return authors
    
    },
  },

  Book: {
    author: (root) => {
      //console.log("author resolver, root.author:", root.author)
      return {
        name: root.author,
        //born: root.born,
        //id: uuid()
        
      }
    },
    
  },
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
    addBook: (root, args) => {
      console.log("addBook, root:", root)
      console.log("addBook, args:", args)
      const book = { ...args, id: uuid() }

      books = books.concat(book)
    
      return book

    }
  },
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})