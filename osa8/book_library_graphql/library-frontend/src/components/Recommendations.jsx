import { useState } from 'react'
//import { useQuery } from '@apollo/client'
//import { ALL_BOOKS } from '../queries'



const Recommendations = (props) => {


    

    console.log('Recommendations rendered, favorite books:', props.favoriteBooks)

    if (!props.show) {
        return null
      }

    return (

        <div>
            <h2>Recommendations</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {props.favoriteBooks.map((b)=>(
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )

}


export default Recommendations
