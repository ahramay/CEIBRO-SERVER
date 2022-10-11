import {
  CLEAR_SELECTED_CHAT,
  PIN_MESSAGE,
  GET_CHAT,
  SEND_REPLY_MESSAGE,
  GET_MESSAGES,
  MUTE_CHAT,
  ADD_TO_FAVOURITE,
  PUSH_MESSAGE,
  SET_MESSAGE_READ,
  SET_SELECTED_CHAT,
  OPEN_QUESTIONIAR_DRAWER,
  CLOSE_QUESTIONIAR_DRAWER,
  SET_QUESTIONS,
  GET_ROOM_MEDIA,
  SET_MEMBERS_DIALOG,
  SET_TEMP_MEMBERS_DIALOG,
  ADD_MEMBERS_TO_CHAT,
  ADD_TEMP_MEMBERS_TO_CHAT,
  SAVE_QUESTIONIAR,
  OPEN_VIEW_QUESTIONIAR_DRAWER,
  CLOSE_VIEW_QUESTIONIAR_DRAWER,
  SET_SELECTED_QUESTIONIAR,
  GET_QUESTIONIAR,
  SAVE_QUESTIONIAR_ANSWERS,
  DELETE_CONVERSATION,
  FORWARD_CHAT,
  UPDATE_MESSAGE_BY_ID,
  GET_USER_QUESTIONIAR_ANSWER,
  GET_UP_CHAT_MESSAGE,
  GET_PINNED_MESSAGES,
  GET_ROOM_QUESTIONIAR,
  EDIT_ROOM_NAME,
  GO_TO_MESSAGES,
  GET_DOWN_CHAT_MESSAGE,
  SET_DOWN_BLOCK,
  CREATE_SINGLE_ROOM,
} from '../../config/chat.config'
import { createAction } from './action'

export const getAllChats = createAction(GET_CHAT)
export const createSingleRoom = createAction(CREATE_SINGLE_ROOM)
export const setSelectedChat = createAction(SET_SELECTED_CHAT)
export const clearSelectedChat = createAction(CLEAR_SELECTED_CHAT)
export const pushMessage = createAction(PUSH_MESSAGE)
export const getRoomMessages = createAction(GET_MESSAGES)
export const setMessagesRead = createAction(SET_MESSAGE_READ)
export const muteChat = createAction(MUTE_CHAT)
export const addToFavourite = createAction(ADD_TO_FAVOURITE)
export const sendReplyMessage = createAction(SEND_REPLY_MESSAGE)
export const pinMessage = createAction(PIN_MESSAGE)
export const getRoomMedia = createAction(GET_ROOM_MEDIA)
export const addMemberToChat = createAction(ADD_MEMBERS_TO_CHAT)
export const addTempMemberToChat = createAction(ADD_TEMP_MEMBERS_TO_CHAT)
export const saveQuestioniar = createAction(SAVE_QUESTIONIAR)
export const getQuestioniarById = createAction(GET_QUESTIONIAR)
export const saveQuestioniarAnswers = createAction(SAVE_QUESTIONIAR_ANSWERS)
export const deleteConversation = createAction(DELETE_CONVERSATION)
export const forwardChat = createAction(FORWARD_CHAT)
export const updateMessageById = createAction(UPDATE_MESSAGE_BY_ID)
export const getUserQuestioniarAnswer = createAction(GET_USER_QUESTIONIAR_ANSWER)
export const getUpMessages = createAction(GET_UP_CHAT_MESSAGE)
export const getDownMessages = createAction(GET_DOWN_CHAT_MESSAGE)
export const getPinnedMessages = createAction(GET_PINNED_MESSAGES)
export const getRoomQuestioniars = createAction(GET_ROOM_QUESTIONIAR)
export const editRoomName = createAction(EDIT_ROOM_NAME)

export const openQuestioniarDrawer = () => ({
  type: OPEN_QUESTIONIAR_DRAWER,
  payload: true,
})

export const closeQuestioniarDrawer = () => ({
  type: CLOSE_QUESTIONIAR_DRAWER,
  payload: false,
})

export const openViewQuestioniarDrawer = () => ({
  type: OPEN_VIEW_QUESTIONIAR_DRAWER,
  payload: true,
})

export const closeViewQuestioniarDrawer = () => ({
  type: CLOSE_VIEW_QUESTIONIAR_DRAWER,
  payload: false,
})

export const setSelectedQuestioniar = (questioniarId: any) => ({
  type: SET_SELECTED_QUESTIONIAR,
  payload: questioniarId,
})

export const setQuestions = (payload: any) => ({
  type: SET_QUESTIONS,
  payload,
})

export const setMembersDialog = (open: boolean) => ({
  type: SET_MEMBERS_DIALOG,
  payload: open,
})

export const setTempMembersDialog = (open: boolean) => ({
  type: SET_TEMP_MEMBERS_DIALOG,
  payload: open,
})

export const goToMessage = (messageId: string) => ({
  type: GO_TO_MESSAGES,
  payload: messageId,
})

export const setDownBlock = (block: boolean) => ({
  type: SET_DOWN_BLOCK,
  payload: block,
})
