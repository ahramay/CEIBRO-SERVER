import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import React, { useRef, useState } from 'react'
import {
  acceptAllInvites,
  closeViewIvitations,
  openViewInvitations,
} from 'redux/action/user.action'
import colors from '../../assets/colors'
import NameAvatar from '../Utills/Others/NameAvatar'
import InvitationsList from './InvitationsList'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'

interface IViewInvitationsProps {
  hideBtn?: boolean
}

const ViewInvitations: React.FunctionComponent<IViewInvitationsProps> = props => {
  const dispatch = useDispatch()
  const ref = useRef()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { openInvites } = useSelector((state: RootState) => state.user)
  const { hideBtn } = props

  const handleOpen = () => {
    // setOpen(!open);
    dispatch(openViewInvitations())
  }

  //   React.useEffect(() => {
  //     const payload = {
  //       success: (val: any) => {
  //         setAcceptAll(val);
  //       },
  //     };
  //     dispatch(acceptAllInvites(payload));
  //   }, []);

  //   const getMyInvites = () => {
  //     const payload = {
  //       success: (res: any) => {
  //         // console.log("all invites", res?.data[0]?.from);
  //         setmyAllInvites(res?.data);
  //       },
  //     };
  //     dispatch(getMyAllInvites(payload));
  //   };

  const acceptAllHandler = (accepted: boolean) => {
    console.log('id', accepted)
    const payload = {
      success: (val: any) => {
        //  @ts-ignore
        ref?.current?.getMyInvites() //accessing invitationList component
      },
      other: {
        accepted,
      },
    }
    dispatch(acceptAllInvites(payload))
  }

  const handleClose = () => {
    dispatch(closeViewIvitations())
  }

  return (
    <>
      {!hideBtn && (
        <Button color="primary" onClick={handleOpen} variant="outlined">
          View
        </Button>
      )}
      <Dialog onClose={handleClose} open={openInvites}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className={classes.titleWrapper}>
            <Button
              className={classes.acceptBtn}
              color="primary"
              variant="text"
              onClick={() => acceptAllHandler(true)}
            >
              Accept all
            </Button>
            <Button
              className={classes.declineBtn}
              variant="text"
              onClick={() => acceptAllHandler(false)}
            >
              Decline all
            </Button>
          </div>
        </DialogContent>
        <InvitationsList ref={ref} />
      </Dialog>
    </>
  )
}

export default ViewInvitations

const useStyles = makeStyles({
  titleWrapper: {
    width: 400,
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.mediumGrey}`,
    paddingBottom: 10,
  },
  acceptBtn: {
    fontSize: 14,
    fontWeight: 500,
  },
  declineBtn: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.btnRed,
  },
})
