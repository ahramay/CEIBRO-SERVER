import { takeLatest } from 'redux-saga/effects'
import {
  ACCEPT_ALL_INVITES,
  ACCEPT_INVITE,
  GET_AVAILABLE_CHAT_USER,
  GET_AVAILABLE_USERS,
  GET_MY_ALL_INVITES,
  GET_MY_CONNECTIONS,
  DELETE_MY_CONNECTION,
  GET_MY_CONNECTIONS_COUNT,
  GET_MY_INVITES_COUNT,
  GET_USER_BY_ID,
  SEND_INVITATION,
  UPDATE_PROFILE_PIC,
} from '../../config/user.config'
import apiCall from '../../utills/apiCall'

const inviteUser = apiCall({
  type: SEND_INVITATION,
  method: 'post',
  path: '/users/invite',
})

const getMyAllInvites = apiCall({
  type: GET_MY_ALL_INVITES,
  method: 'get',
  path: '/users/invite',
})
const acceptInvite = apiCall({
  type: ACCEPT_INVITE,
  method: 'post',
  path: payload => `users/invite/accept/${payload?.other?.accepted}`,
})

const getMyConnections = apiCall({
  type: GET_MY_CONNECTIONS,
  method: 'get',
  path: '/users/connections',
})

const deleteMyConnection = apiCall({
  type: DELETE_MY_CONNECTION,
  method: 'delete',
  path: (payload: any) => {
    let url = `/users/connection/${payload?.other?.id}`

    const params: string = Object.keys(payload.params).map(
      key => `${key}=${payload.params[key]}&`
    )[0]

    return params ? `${url}?${params.substring(-1)}` : url
  },
})

const acceptAllInvite = apiCall({
  type: ACCEPT_ALL_INVITES,
  method: 'post',
  path: payload => `users/invite/accept-all/${payload?.other?.accepted}`,
})

const getMyAllInviteCount = apiCall({
  type: GET_MY_INVITES_COUNT,
  method: 'get',
  path: '/users/invite/count',
})
const getMyConnectionsCount = apiCall({
  type: GET_MY_CONNECTIONS_COUNT,
  method: 'get',
  path: '/users/connections/count',
})

const getUserById = apiCall({
  type: GET_USER_BY_ID,
  method: 'get',
  path: payload => `/users/${payload.other.userId}`,
})

const updateProfilePic = apiCall({
  type: UPDATE_PROFILE_PIC,
  method: 'patch',
  isFormData: true,
  path: `/users/profile/pic`,
})

const getAvailableChatUsers = apiCall({
  type: GET_AVAILABLE_CHAT_USER,
  method: 'get',
  path: (payload: any) => `/chat/member/available/${payload?.other}`,
})

const getAvailableUsers = apiCall({
  type: GET_AVAILABLE_USERS,
  method: 'get',
  path: payload => {
    let url = `/users/available`
    if (payload.other) {
      url = `${url}?includeMe=true`
    }
    return url
  },
})

function* userSaga() {
  yield takeLatest(SEND_INVITATION, inviteUser)
  yield takeLatest(GET_MY_ALL_INVITES, getMyAllInvites)
  yield takeLatest(ACCEPT_INVITE, acceptInvite)
  yield takeLatest(GET_MY_CONNECTIONS, getMyConnections)
  yield takeLatest(DELETE_MY_CONNECTION, deleteMyConnection)
  yield takeLatest(ACCEPT_ALL_INVITES, acceptAllInvite)
  yield takeLatest(GET_MY_INVITES_COUNT, getMyAllInviteCount)
  yield takeLatest(GET_USER_BY_ID, getUserById)
  yield takeLatest(UPDATE_PROFILE_PIC, updateProfilePic)
  yield takeLatest(GET_MY_CONNECTIONS_COUNT, getMyConnectionsCount)
  yield takeLatest(GET_AVAILABLE_CHAT_USER, getAvailableChatUsers)
  yield takeLatest(GET_AVAILABLE_USERS, getAvailableUsers)
}

export default userSaga
