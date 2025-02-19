import { gql } from '@apollo/client'

export const ALL_AUTHORS=gql`
  query {
    allAuthors {
        name
        id
        born
        bookCount
      
    }
  }
`

export const ALL_BOOKS=gql`
  query {
    allBooks {
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
          born
        }
        genres
        id
      }
  }
  
`

export const EDIT_AUTHOR=gql`   
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
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
