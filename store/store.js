import {createStore} from 'redux'

const initialState = {
  count: 0
}

const ADD = 'ADD'

function reducer(state = initialState,action) {
  switch(action.type) {
    case ADD:
      return {count: state.count + action.value}
    default:
      return state
  }
}

const store = createStore(reducer)


export default store