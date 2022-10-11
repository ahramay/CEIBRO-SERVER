import { ActionInterface } from '.'
import { requestSuccess } from '../../utills/status'

import {
  CLOSE_VIEW_INVITATIONS,
  GET_MY_CONNECTIONS_COUNT,
  GET_MY_INVITES_COUNT,
  OPEN_VIEW_INVITATIONS,
  DELETE_MY_CONNECTION,
} from 'config/user.config'

interface UserReducerInt {
  invites: any
  connections: any
  openInvites: boolean
}

const intialStatue: UserReducerInt = {
  invites: [],
  connections: [],
  openInvites: false,
}

const UserReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case requestSuccess(GET_MY_INVITES_COUNT): {
      return {
        ...state,
        invites: action.payload,
      }
    }
    case requestSuccess(DELETE_MY_CONNECTION): {
      return {
        ...state,
        connections: action.payload,
      }
    }
    case requestSuccess(GET_MY_CONNECTIONS_COUNT): {
      return {
        ...state,
        connections: action.payload,
      }
    }

    case OPEN_VIEW_INVITATIONS: {
      return {
        ...state,
        openInvites: true,
      }
    }

    case CLOSE_VIEW_INVITATIONS: {
      return {
        ...state,
        openInvites: false,
      }
    }

    // case requestSuccess(GET_MY_INVITES_COUNT): {
    //   return {
    //     ...state,
    //     createChatLoading: false,
    //   };
    // }

    default:
      return state
  }
}

export default UserReducer
