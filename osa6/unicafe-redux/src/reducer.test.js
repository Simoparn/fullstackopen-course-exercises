
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
      //data field for action is useful for more complex applications
      data: {
        good: 0,
        ok: 0,
        bad: 0
      }
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('reducer is a pure function', () => {

    const action = {
      type: 'GOOD',
      //data field for action is useful for more complex applications
      data: {
        good: 2,
        ok: 0,
        bad: 0
      }
    }
    
    const state=initialState

    //Incrementing and checking for pure function with deep-freeze
    deepFreeze(state)
    const newState = counterReducer(state, action)
    deepFreeze(newState)
    const lastState = counterReducer(newState, action)
    deepFreeze(lastState)
    
    //Check that good increments again to 2 when GOOD is passed again as action
    expect(lastState).toHaveProperty('good', 2)
    expect(lastState).toHaveProperty('ok', 0)
    expect(lastState).toHaveProperty('bad', 0)
    expect(lastState).toEqual(action.data)
    
    //Alternative for toHaveProperty
    expect(lastState).toEqual({...newState, good: 2})

  

  })
})