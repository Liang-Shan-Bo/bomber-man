import {
  MAN_MOVE,
} from './action'

export default (state = {
  map:{
    maps:[['lawn', 'wall', 'lawn', 'lawn', 'lawn', 'power', 'wall', 'lawn', 'lawn'],
          ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
          ['wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn'],
          ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
          ['lawn', 'lawn', 'lawn', 'lawn', 'wall', 'lawn', 'wall', 'lawn', 'door']]
  },
  man: {
    x:0,
    y:0,
    type: 'left',
  }
}, action) => {
  switch (action.type) {
    case MAN_MOVE:
      const { x, y} = action.man
      return {
        ...state,
        man: {
          x,
          y,
        }
      }
    default:
      return state
  }
}
