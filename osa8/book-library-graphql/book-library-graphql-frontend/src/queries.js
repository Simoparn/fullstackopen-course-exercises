import { gql } from '@apollo/client'



const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author{
      name
      id
      born
    }
    id
    genres
  }
`


export const ALL_AUTHORS=gql`
  query {
    allAuthors {
        name
        born
        id
        bookCount
      
    }
  }
`

export const ALL_BOOKS=gql`
  query {
    allBooks {
      ...BookDetails
    }
} ${BOOK_DETAILS}  
  
`

export const FAVORITE_BOOKS=gql`
  query favoriteBooks($token: String) {
    favoriteBooks(token: $token) {
      title
      published
      author{
        name
      }
      id
      genres
    }
  }

`

export const ADD_BOOK=gql`   
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
      addBook(title: $title, author: $author, published: $published, genres: $genres){
        title
        published
        author{
          name
          id
          born
        }
        genres
        id
      }
  }
  
`

export const EDIT_AUTHOR=gql`   
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
    id
    bookCount
  }
}
`

export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!, $favoriteGenre: String!) {
  createUser(
    username: $username, password: $password, favoriteGenre: $favoriteGenre
  ) {
    username
    favoriteGenre
    id
 }
}
`



export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login (
    username: $username
    password: $password
  ) {
    value
  }
}
`


export const TOKEN_LOGIN = gql`
mutation tokenLogin($token: String) {
  tokenLogin (
    token: $token  
  ) {
    value
  }
}
`
export const BOOK_ADDED = gql`
  subscription Subscription {    
    bookAdded {      
      ...BookDetails    
    }  
  }  ${BOOK_DETAILS}
`