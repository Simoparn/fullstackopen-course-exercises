import { useState } from 'react'
//import { useQuery } from '@apollo/client'
//import { ALL_BOOKS } from '../queries'



const Recommendations = (props) => {


    //console.log('Recommendations, favorite books:', props.favoriteBooks)

    if (!props.show) {
        return null
      }

    return (

        <div>
            <h2>Recommendations</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    <br />
                </tbody>
            </table>
        </div>

    )

}


export default Recommendations
