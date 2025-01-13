import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const initialState=[]


const allBlogsInfoSlice = createSlice({  

    name: 'allblogsinfo',  
    initialState,
    //blogs left empty below for json-server database/axios experiment 
    //initialState:[],
    reducers: { 




    }
})


//Needed for Userssummary component

export const getAllBlogs = () => {
  
  return async dispatch => {
    const allBlogs = await blogService.getAll()
  }
  
}


export default allBlogsInfoSlice.reducer