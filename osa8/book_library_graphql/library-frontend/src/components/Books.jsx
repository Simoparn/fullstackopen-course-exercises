import { useState } from 'react'
import { useQuery } from '@apollo/client'
//import { ALL_BOOKS } from '../queries'



const Books = (props) => {


  const [genre, setGenre] = useState(null)
  const handleSelectedGenreChange = (event) => {
    setGenre(event.target.value)
  }


  let bookgenres=[]

  props.books.forEach((b) => { 
    //console.log('this book:', b)
    b.genres.forEach((g) => {
      //console.log('genre for this book:', g)
      if(!bookgenres.includes(g)){
        bookgenres.push(g)
      }
    })
  })

  console.log('Books, selected genre:', genre)
  console.log('Books, unique book genres:', bookgenres)

  if (!props.show) {
    return null
  }



  return (
    <div>
      <h2>books</h2>
      In genre <b>{genre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          <br/>
          {props.books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <select value={genre} onChange={handleSelectedGenreChange}>
        <option value={genre}>{genre}</option>
          {bookgenres.map((g) => (
            <option value={g}>{g}</option>
        ))}
      </select>
    </div>
  )
}

export default Books
