import { makeStyles, Typography } from "@material-ui/core"
import { MoreVert, PersonAddOutlined } from "@material-ui/icons"
import { useState } from "react"
import { BiTask } from "react-icons/bi"
import { BsArrow90DegLeft, BsArrow90DegRight } from "react-icons/bs"
import OutsideClickHandler from "react-outside-click-handler"
import { useDispatch } from "react-redux"
import colors from "../../../assets/colors"
import { SET_REPLY_TO_ID } from "../../../config/chat.config"
import { ChatMessageInterface } from "../../../constants/interfaces/chat.interface"
import { setTempMembersDialog } from "../../../redux/action/chat.action"
import ForwardMessage from './ForwardMessage'


interface ChatMessageMenueInt {
    message: ChatMessageInterface
}

const ChatMessageMenu: React.FC<ChatMessageMenueInt> = props => {
    const { message } = props;
    const classes = useStyles()
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);

    const handleToggle = (e: any) => {
        e.stopPropagation();
        setShow(!show)
    }

    const handleClick = (e: any) => {
        e.stopPropagation();
        dispatch({
            type: SET_REPLY_TO_ID,
            payload: message._id
        });
        setShow(false);
    }

    const addTempMember = (e: any) => {
        e?.stopPropagation();
        dispatch(setTempMembersDialog(true));
    }

    const openDialog = () => {
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    return (
        <div className="dropdown">
            <ForwardMessage onClose={closeDialog}  messageId={message._id} open={open} />
            <MoreVert className={classes.moreIcon} onClick={handleToggle} />
            {show && (
                <OutsideClickHandler onOutsideClick={handleToggle}>
                    <div className={`dropdown-content ${classes.dropdownContent}`}>
                        {(!message.replyOf || !message.myMessage) && (
                            <div className={`${classes.menuWrapper} dropdown-menu `} onClick={handleClick}>
                                <BsArrow90DegLeft className={classes.menuIcon} />
                                <Typography className={classes.menuText}>
                                    Reply to chat
                                </Typography>
                            </div>
                        )}
                        {message.type !== 'questioniar' && 
                            <div onClick={openDialog} className={`${classes.menuWrapper} dropdown-menu`}>
                                <BsArrow90DegRight className={classes.menuIcon} />
                                <Typography className={classes.menuText}>
                                    Forward message
                                </Typography>
                            </div>
                        }
                        <hr className={classes.break} />

                        <div className={`${classes.menuWrapper} dropdown-menu`}>
                            <BiTask className={classes.menuIcon} />
                            <Typography className={classes.menuText}>
                                Mark as task
                            </Typography>
                        </div>

                        <hr className={classes.break} />

                        <div onClick={addTempMember} className={`${classes.menuWrapper} dropdown-menu`}>
                            <PersonAddOutlined className={classes.menuIcon} />
                            <Typography className={`${classes.menuText}`}>
                                Add temporary member
                            </Typography>
                        </div>
                    </div>
                </OutsideClickHandler>
            )
            }
        </div>
    )
}

export default ChatMessageMenu

const useStyles = makeStyles({
    moreIcon: {
        fontSize: 24,
        color: colors.textPrimary,
        cursor: 'pointer'
    },
    dropdownContent: {
        minWidth: 200,
        display: 'block'
    },
    menuWrapper: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        cursor: 'pointer'
    },
    menuIcon: {
        fontSize: 14
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