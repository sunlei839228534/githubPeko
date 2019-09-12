import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
  count: 0
}

const ADD = 'ADD'

const userInitialState = {
  username: 'jokey'
}

export function add (num) {
  return {
    type: ADD,
    num
  }
}
function countReducer(state = initialState,action) {
  switch(action.type) {
    case ADD:
      return {count: state.count + (action.num || 1)}
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'

function userReducer(state = userInitialState,action ){
  switch(action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name,
      }
    default:
      return state
  }
}

const allReducers = combineReducers({
  counter: countReducer,
  user: userReducer
})

const store = createStore(allReducers,composeWithDevTools(applyMiddleware(ReduxThunk)))


export default function initializeStore() {
  const store = createStore(
    allReducers,
    Object.assign({},{
      counter: initialState,
      user: userInitialState
    },state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}