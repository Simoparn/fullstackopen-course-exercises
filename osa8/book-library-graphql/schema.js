
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
    allBooksCount: Int!
    allAuthorsCount: Int!
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
    
type Subscription {
    bookAdded: Book!
}   
`

module.exports = typeDefs