



import { IconButton, makeStyles, Typography } from "@material-ui/core"
import { BookmarkBorder, Chat, Delete, Markunread, MoreVert, Star, StarBorder } from "@material-ui/icons"
import { useConfirm } from "material-ui-confirm"
import { useState } from "react"
import { BsBookmark } from "react-icons/bs"
import { GrVolume, GrVolumeMute } from "react-icons/gr"
import OutsideClickHandler from "react-outside-click-handler"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import assets from "../../../assets/assets"
import colors from "../../../assets/colors"
import { ChatListInterface } from "../../../constants/interfaces/chat.interface"
import { addMemberToChat, addToFavourite, deleteConversation, getAllChats, muteChat, setSelectedChat } from "../../../redux/action/chat.action"
import { RootState } from "../../../redux/reducers"

interface ChatListMenueInt {
    room: ChatListInterface
}

const ChatListMenu: React.FC<ChatListMenueInt> = (props) => {
    const { room } = props;
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { chat, selectedChat } = useSelector((state: RootState) => state.chat);
    const isMuted = room?.mutedBy?.includes(user?.id);
    const isFavourite = room?.pinnedBy?.includes(user?.id);
    const dispatch = useDispatch();
    const confirm = useConfirm();

    const handleToggle = (e: any) => {
        e.stopPropagation();
        setShow(!show)
    }

    const markAsUnread = () => {
    }

    const handleChatMute = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(muteChat({ other: room._id, success: () => {
            const message = `Chat ${isMuted ? "Un muted": "muted"}`;
            setShow(false);
            dispatch(getAllChats({ success: () => {
                toast.success(message);
            }}))
        } }));   
    }

    const handleFavouriteClick = (e: any) => {
        e.stopPropagation()
        dispatch(addToFavourite({ other: room._id, success: () => {
            setShow(false);
            dispatch(getAllChats());
        } }));  
    }

    const markunread = (e: any) => {
        e.stopPropagation() 
    }

    const handleDeleteClick = (e: any) => {
        e.stopPropagation();
        confirm({ description: 'Are you confirm want to delete' })
        .then(() => { 
            dispatch(deleteConversation({
                other: room._id,
                success: () => {
                    dispatch(getAllChats({
                        success: (_res: any) => {
                            if(_res?.data?.[0]?._id) {
                                dispatch(setSelectedChat({ other: _res?.data?.[0]?._id }));
                            }
                        }
                    }));
                }
            }))
        })
    }

    return (
        <div className="dropdown">
            {/* <MoreVert className={classes.moreIcon} onClick={handleToggle} /> */}
            <IconButton onClick={handleToggle}>
                <img 
                    src={assets.moreIcon} 
                    className={classes.moreIcon} 
                /> 
            </IconButton>
            {show && (
                    <OutsideClickHandler onOutsideClick={handleToggle}>
                        <div className={`dropdown-content ${classes.dropdownContent}`}>
                            <div className={`${classes.menuWrapper} dropdown-menu pointer`} onClick={markunread}>
                                {/* <Chat className={classes.menuIcon} /> */}
                                <img src={assets.unreadMessage} className="width-16" />
                                <Typography className={`${classes.menuText} align-center`}>
                                    Mark unread
                                </Typography>
                            </div>
                            <div className={`${classes.menuWrapper} dropdown-menu pointer ${classes.starMenu}`} onClick={handleChatMute}>
                                {isMuted ? (
                                    <img src={assets.volumeMute} className="width-16" />
                                ): (
                                    <GrVolume className={classes.menuIcon} />
                                )}
                                <Typography className={`${classes.menuText} align-center`}>
                                    {isMuted ? "Un mute": "Mute"} chat
                                </Typography>
                            </div>

                            <hr className={classes.break} />

                            <div className={`${classes.menuWrapper} dropdown-menu pointer`} onClick={handleFavouriteClick}>
                                {isFavourite? 
                                    // (<Star className={`${classes.star} ${classes.menuIcon}`} />):
                                    (<img src={assets.favouriteFilledIcon} className={`width-16`} />): 
                                    (<img src={assets.favouriteIcon} className={`width-16`} />)
                                    // (<StarBorder className={`${classes.star} ${classes.menuIcon}`} />)
                                }
                                <Typography className={`${classes.menuText} align-center ${classes.starText}`}>
                                    {isFavourite? (
                                        "Remove from favorites"
                                        ): (
                                        "Add to favorites"
                                    )}
                                </Typography>
                            </div>

                            <hr className={classes.break} />

                            <div 
                                className={`${`${classes.menuWrapper} dropdown-menu`} ${classes.deleteConversation}`}
                                onClick={handleDeleteClick}
                            >
                                <img src={assets.trashIcon} className={`width-16`} />
                                <Typography className={`${classes.menuText} align-center ${classes.deleteText}`}>
                                    Delete conversation
                                </Typography>
                            </div>
                        </div>
                    </OutsideClickHandler>
                )
            }
        </div>
    )
}

export default ChatListMenu

const useStyles = makeStyles({
    moreIcon: {
        cursor: 'pointer'
    },
    dropdownContent: {
        minWidth: 180,
        display: 'block'
    },
    menuWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    menuIcon: {
        fontSize: 14
    },
    star: {
        color: colors.darkYellow,
        fontSize: 20
    },
    starText: {
        marginLeft: "4px !important"
    },
    starMenu: {
        display: 'flex',
        alignItems: ''
    },
    menuText: {
        fontSize: 14,
        fontWeight: 500,
        marginLeft: 10,
        height: 30,
        color: colors.textPrimary
    },
    break: {
        border: 0,
        borderTop: `1px solid ${colors.grey}`
    },
    deleteConversation: {
        color: colors.btnRed
    },
    deleteText: {
        color: colors.btnRed
    }
})