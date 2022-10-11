import { Badge, IconButton, Grid, makeStyles, Typography } from '@material-ui/core'
import {
  Bookmark,
  BookmarkBorder,
  DockTwoTone,
  MoreVert,
  Star,
  StarBorder,
} from '@material-ui/icons'
import { BsDot } from 'react-icons/bs'
import colors from '../../../assets/colors'
import NameAvatar from '../Others/NameAvatar'
import ChatListMenu from './ChatListMenu'
import { ChatListInterface } from '../../../constants/interfaces/chat.interface'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import { addToFavourite, getAllChats } from '../../../redux/action/chat.action'

interface ChatListInterfaceProps {
  chat: ChatListInterface
  handleClick?: (e: any) => void
}

const ChatListChip: React.FC<ChatListInterfaceProps> = props => {
  const classes = useStyles()

  const { chat } = props
  const { username = 'Qasim', name, lastMessage, unreadCount, lastMessageTime, project } = chat
  const { user } = useSelector((state: RootState) => state.auth)
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat)

  const dispatch = useDispatch()

  const handleClick = () => {
    props.handleClick?.(chat)
  }

  const getStyles = () => {
    return {
      backgroundColor: String(selectedChat) === String(chat._id) ? colors.lightGrey : colors.white,
    }
  }

  const handleFavouriteClick = (e: any) => {
    e.stopPropagation()
    dispatch(
      addToFavourite({
        other: chat._id,
        success: () => {
          dispatch(getAllChats())
        },
      })
    )
  }

  const bookmarked = chat?.pinnedBy?.includes(user?.id)

  return (
    <Grid onClick={handleClick} className={classes.chatListWrapper} container style={getStyles()}>
      <Grid container>
        <Grid item xs={1} className={classes.bookMarkWrapper}>
          {unreadCount && unreadCount > 0 && <div className={classes.dot}></div>}
        </Grid>
        <Grid item xs={2} className={classes.avatarWrapper}>
          <NameAvatar background="white" firstName={name} />
        </Grid>

        <Grid item xs={6} className={classes.messageDetailWrapper}>
          <Typography className={classes.userName}>{name}</Typography>
          {unreadCount && unreadCount > 0 && (
            <Typography className={classes.message}>
              {lastMessage?.message?.substr(0, 22)}
            </Typography>
          )}
        </Grid>

        <Grid item xs={2} className={classes.timeOuterWrapper}>
          <div onClick={handleFavouriteClick}>
            {bookmarked ? (
              <Star className={classes.startFilled} />
            ) : (
              <StarBorder className={classes.bookmarked} />
            )}
          </div>
          <div className={classes.timeWrapper}>
            {unreadCount && unreadCount > 0 && (
              <Badge badgeContent={unreadCount} color="error"></Badge>
            )}
            <Typography className={classes.time}>{lastMessageTime}</Typography>
          </div>
        </Grid>

        <Grid item xs={1} className={classes.timeWrapper}>
          <ChatListMenu room={chat} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} style={{ paddingLeft: 10 }}>
          {project?.title && (
            <Typography className={classes.chatProject}>
              <span>Project: &nbsp;&nbsp;</span>
              <span className={classes.chatProjectName}>{project.title}</span>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChatListChip

const useStyles = makeStyles({
  chatListWrapper: {
    padding: 0,
    height: 70,
    border: `0.5px solid ${colors.grey}`,
    cursor: 'pointer',
  },
  bookMarkWrapper: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    marginTop: 15,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: `linear-gradient(180deg, #F1B740 0%, #FF7A00 100%)`,
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageDetailWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 6,
    paddingTop: 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userName: {
    fontSize: 14,
    fontWeight: 500,
  },
  message: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    paddingLeft: 2,
  },
  chatProject: {
    fontSize: 10,
    fontWeight: 500,
    color: colors.black,
  },
  chatProjectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  timeOuterWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  timeWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  time: {
    fontSize: 12,
    fontWeight: 500,
  },
  bookmarked: {
    color: colors.darkYellow,
    fontSize: 18,
  },
  startFilled: {
    color: colors.darkYellow,
    fontSize: 18,
  },
})
