import { createSlice } from '@reduxjs/toolkit'

//const anecdoteFilterAtStart = ""
const anecdoteFilterAtStart = ""
const initialState=anecdoteFilterAtStart


//Old way to define reducers without @reduxjs/toolkit, see below and above comments
/*
const anecdoteFilterReducer = (state = initialState, action) => {
    //console.log('ACTION IN ANECDOTEFILTEREDUCER: ', action)
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
  }



  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
*/

/*Better way to define reducers with @reduxjs/toolkit, see above and below comments*/
  const anecdoteFilterSlice = createSlice({  
    name: 'anecdotefilter',  
    initialState,  
    reducers: {    
      filterChange(state, action) {  
        console.log('action in filterChange:', action.payload)    
        const filter = action.payload   
        const changedFilterState=filter     
        return changedFilterState
    
      }

    },
  })


////Old way to define reducers without "@reduxjs/toolkit", see above comments
//export default anecdoteFilterReducer
export const {filterChange} = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer