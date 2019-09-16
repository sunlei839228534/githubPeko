import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'

const LOGOUT = 'LOGOUT'

const userInitialState = {

}



function userReducer(state = userInitialState,action ){
  switch(action.type) {
    case LOGOUT: {
      return {}
    }
    default:
      return state
  }
}

const allReducers = combineReducers({
  user: userReducer
})


// action creators

export function logOut() {
  return dispatch => {
    axios.post('/logout').then(resp => {
      if(resp.status === 200) {
        dispatch({
          type: LOGOUT
        })
      }else {
        console.log("logout faled",resp)
      }
    }).catch(err=>console.log(err))
  }
}


export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign({},{
      user: userInitialState
    },state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}