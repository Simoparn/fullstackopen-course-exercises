import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
//import blogService from '../services/blogs'
import  { getAllUsers } from '../reducers/allUsersInfoReducer'


const initialState=[]


const allBlogsInfoSlice = createSlice({  

    name: 'allblogsinfo',  
    initialState,
    //blogs left empty below for json-server database/axios experiment 
    //initialState:[],
    reducers: { 


        setAllBlogsInfo(state, action){
            console.log('setAllBlogsInfo, setting all blogs in front-end:', action.payload)
            return action.payload
        }

    }
})

export const { setAllBlogsInfo } = allBlogsInfoSlice.actions

//Needed for Loggedin component

export const getAllBlogs = () => {
  
  return async dispatch => {
   
    const allUsersInfo = await userService.getAll()
    let allBlogs=[]
    allUsersInfo.forEach((userInfo)=>{
        console.log('getAllBlogs, found userInfo while concatenating blogs:', userInfo)
        allBlogs=allBlogs.concat(userInfo.blogs)
        
    })
    //const allBlogs = await blogService.getAll()
    console.log('getAllBlogs, all blogs after going through the data for all users:', allBlogs)
    dispatch(setAllBlogsInfo(allBlogs))
  }
  
}


export default allBlogsInfoSlice.reducer