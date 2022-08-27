const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      //console.log("state before change:", state)
      const good=state.good
      const newGoodState = { 
        ...state, 
        good: good + 1
      }
      //console.log('State with incremented good: ', newState)
      
      return newGoodState
    case 'OK':
      const ok=state.ok
      const newOkState = { 
        ...state, 
        ok: ok + 1 
      }
      return newOkState
    case 'BAD':
      const bad=state.bad
      const newBadState = { 
        ...state, 
        bad: bad + 1 
      }
      return newBadState
    case 'ZERO':
      const zero=state.reset
      const zeroState = { 
        good : 0,
        ok : 0,
        bad : 0
       
      }
      return zeroState
    default: return state
  }
  
}

export default counterReducer