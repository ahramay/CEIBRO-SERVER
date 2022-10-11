import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core'
import { BsArrow90DegLeft, BsArrow90DegRight } from "react-icons/bs"
import colors from "../../../assets/colors"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { toast } from 'react-toastify';
import { forwardChat } from '../../../redux/action/chat.action'

interface ForwardMessageInt {
    open: boolean;
    messageId: string;
    onClose: () => void;
}

const ForwardMessage: React.FC<ForwardMessageInt> = (props) => {
    const classes = useStyles();
    const [selected, setSelected] = useState<string[]>([])
    const { chat, selectedChat } = useSelector((store: RootState) => store.chat)
    const { open, messageId } = props;
    const dispatch = useDispatch();

    const myChats = chat.filter((room: any) => String(room._id !== String(selectedChat)))

    const handleCancel = () => {
        props.onClose();
    }
    const handleOk = () => {
        const payload = {
            body: {
                messageId,
                chatIds: selected
            },
            success: () => {
                toast.success("Forwarded successfully")
            }
        }
        dispatch(forwardChat(payload))
        props.onClose();
    }

    const openDialog = () => {
    }

    const handleClick = (roomId: string) => {
        setSelected(
            selected.includes(roomId) ? selected.filter(chatId => roomId !== chatId): [...selected, roomId]
        )
    }
  
  return <>
            <Dialog
                open={open}
                onClose={props.onClose}
            >
                <DialogTitle id="confirmation-dialog-title">Forward to chat</DialogTitle>
                <DialogContent className={classes.roomWrapper}>
                    {myChats?.map((room: any) => {
                        const check: any = selected.includes(room._id) || false;
                        return (
                            <div className={classes.room}>
                                <Checkbox checked={check} onClick={() => handleClick(room._id)} className={classes.check} />
                                <Typography className={classes.name}>
                                    {room.name}
                                </Typography>
                            </div>
                        )
                    })}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOk} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>



  </>;
}

export default ForwardMessage;

const useStyles = makeStyles({
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
    room: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        width: 300,
    },
    roomWrapper: {
        maxHeight: '300px'
    },
    check: {
        flex: 1
    },
    name: {
        flex: 8
    }
})