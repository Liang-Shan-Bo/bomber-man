import { combineReducers } from 'redux'
import {
  MAN_MOVE,
} from './action'

const map = (state = {
  maps:[['lawn', 'wall', 'lawn', 'lawn', 'lawn', 'power', 'wall', 'lawn', 'lawn'],
          ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
          ['wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn'],
          ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
          ['lawn', 'lawn', 'lawn', 'lawn', 'wall', 'lawn', 'wall', 'lawn', 'door']]
}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const man = (state = {
  x:0,
  y:0,
  type: 'left',
}, action) => {
  switch (action.type) {
    case MAN_MOVE:
      return {
        ...state,
        x: action.man.x,
        y: action.man.y,
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  map,
  man,
})

export default rootReducer