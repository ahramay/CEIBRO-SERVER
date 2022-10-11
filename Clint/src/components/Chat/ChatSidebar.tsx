import { Grid, makeStyles, Typography } from '@material-ui/core'
import {
  Add,
  Bookmark,
  BookmarkBorder,
  BookmarkOutlined,
  Chat,
  ContactPhone,
  Star,
  StarBorder,
} from '@material-ui/icons'
import assets from 'assets/assets'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../assets/colors'
import { SET_CHAT_TYPE, SET_CHAT_SEARCH, SET_FAVOURITE_FILTER } from '../../config/chat.config'
import { clearSelectedChat, getAllChats } from '../../redux/action/chat.action'
import { RootState } from '../../redux/reducers'
import InputText from '../Utills/Inputs/InputText'
import ChatList from './ChatList'
import ChatRoomSearch from './ChatRoomSearch'

const ChatSidebar = () => {
  const classes = useStyles()
  const { type, favouriteFilter } = useSelector((store: RootState) => store.chat)
  const messageListType = [
    {
      name: 'View all',
      value: 'all',
    },
    {
      name: 'Unread',
      value: 'unread',
    },
    {
      name: 'Favorites',
      value: 'favorites',
      icon: assets.favouriteFilledIcon,
    },
  ]

  const [filter, setFilter] = useState(messageListType[0].name)

  const dispatch = useDispatch()

  const handleMessageTypeClick = (chatType: any, index: number) => {
    setFilter(chatType.name)
    if (index === 2) {
      handleMenuClick(true)
    } else {
      handleMenuClick(false)
    }
    dispatch({
      type: SET_CHAT_TYPE,
      payload: chatType.value,
    })
  }

  const handleMenuClick = (value: boolean) => {
    dispatch({
      type: SET_FAVOURITE_FILTER,
      payload: value,
    })
  }

  const handleChatRoomSearch = (e: any) => {
    dispatch(clearSelectedChat())
    dispatch({
      type: SET_CHAT_SEARCH,
      payload: e?.target?.value,
    })
    dispatch(getAllChats())
  }

  return (
    <Grid container className={classes.outerWrapper}>
      {/* <Grid item xs={12} className={classes.iconsWrapper}>
        <Grid
          item
          xs={6}
          className={`${classes.menuOuterWrapper} ${classes.rightBorder}`}
        >
          <Chat
            onClick={() => handleMenuClick(false)}
            className={`${classes.menuIcons} ${
              !favouriteFilter ? classes.activeIcon : ""
            }`}
          />
        </Grid>
        <Grid item xs={6} className={classes.menuOuterWrapper}>
          <StarBorder
            onClick={() => handleMenuClick(true)}
            className={`${classes.menuIcons} ${
              favouriteFilter ? classes.activeIcon : ""
            }`}
          />
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <ChatRoomSearch onChange={handleChatRoomSearch} />
      </Grid>
      <Grid item xs={12} className={classes.messageTypeWrapper}>
        {messageListType.map((chatType: any, index: number) => {
          return (
            <>
              {chatType?.icon && (
                <img src={chatType.icon} className={`width-16`} style={{ height: 14 }} />
              )}
              <Typography
                onClick={() => handleMessageTypeClick(chatType, index)}
                key={index}
                className={`${classes.messageTypeText} ${
                  filter === chatType.name ? classes.activeMessageType : ''
                }`}
              >
                {chatType.name}
              </Typography>
              {index < 2 && <Typography className={classes.messagetypeBreak}>|</Typography>}
            </>
          )
        })}
      </Grid>
      <Grid item xs={12} className={`${classes.chatList} hide-scrollbar`}>
        <ChatList />
      </Grid>
    </Grid>
  )
}

export default ChatSidebar

const useStyles = makeStyles({
  outerWrapper: {
    border: `0.5px solid ${colors.grey}`,
    borderTop: 'none',
    height: '100%',
    display: 'block',
  },
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderBottom: `0.5px solid ${colors.grey}`,
  },
  menuOuterWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  rightBorder: {
    borderRight: `1px solid ${colors.grey}`,
  },
  menuIcons: {
    fontSize: 20,
    color: colors.textPrimary,
    padding: 8,
    cursor: 'pointer',
  },
  addWrapper: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  activeIcon: {
    color: colors.white,
    background: colors.darkYellow,
    borderRadius: 50,
  },
  addText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 500,
  },
  addIcon: {
    fontSize: 20,
  },
  messageTypeWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '10px 2px',
  },
  messageTypeText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textPrimary,
    cursor: 'pointer',
  },
  messagetypeBreak: {
    color: colors.mediumGrey,
  },
  activeMessageType: {
    color: colors.black,
  },
  chatList: {
    height: 'calc(100vh - 260px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
})
