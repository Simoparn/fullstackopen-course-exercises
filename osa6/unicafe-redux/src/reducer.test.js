import { createStore } from 'redux'
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
      data: {
        good: 0,
        ok: 0,
        bad: 0
      }
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    //const store = createStore(counterReducer)
    //store.dispatch({type: 'GOOD',
    //data: {
    //  good: 'the app state is in redux store',
    //  ok: true,
    //  bad: 1
    //}
    //})
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('reducer is a pure function', () => {

    const action = {
      type: 'GOOD',
      data: {
        good: 1,
        ok: 0,
        bad: 0
      }
    }
    
    const state=initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    deepFreeze(newState)
    //Check that good increments again to 2 when good:1 is passed as action
    expect(newState).toHaveProperty('good', 2)
    expect(newState).toHaveProperty('ok', 0)
    expect(newState).toHaveProperty('bad', 0)
    //expect(newState).toContainEqual(action.data)
    //Alternative for toHaveProperty
    expect(newState).toEqual({...initialState, good: 2})

  

  })
})