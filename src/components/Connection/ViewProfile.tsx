import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
  IconButton,
} from '@material-ui/core'
import { Clear, Delete } from '@material-ui/icons'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import NameAvatar from '../Utills/Others/NameAvatar'
import { useDispatch } from 'react-redux'
import taskActions from '../../redux/action/task.action'
import { getUserById } from 'redux/action/user.action'
import { deleteMyConnection, getMyConnections } from '../../redux/action/user.action'
import { createSingleRoom } from '../../redux/action/chat.action'
import { useHistory } from 'react-router-dom'
interface IViewProfileProps {
  userId: string
  disabled: boolean
  connectionId: string;
}

const ViewProfile: React.FunctionComponent<IViewProfileProps> = props => {
  const { userId, disabled, connectionId } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [getUser, setGetUser] = useState<any>({})
  const dispatch = useDispatch()
  const history = useHistory()

  const handleToggle = () => {
    const payload = {
      success: (val: any) => {
        console.log('getUserByid', val)
        setGetUser(val.data)
      },
      other: {
        userId,
      },
    }
    dispatch(getUserById(payload))

    setOpen(!open)
  }
  console.log('hhh', getUser)
  const openTaskDrawer = () => {
    dispatch(taskActions.openDrawer())
  }

  const handleDelete = () => {
    const id: string = connectionId
    const payload: any = {
      other: {
        id,
      },
      params: {
        isEmailInvited: false,
      },
      success: () => dispatch(getMyConnections()),
    }
    dispatch(deleteMyConnection(payload))
    handleToggle()
  }

  const startRoom = () => {
    const payload = { other: { id: getUser?.id }, success: () => history.push('chat') }
    dispatch(createSingleRoom(payload))
  }

  //   const user = {
  //     image:
  //       "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg",
  //     name: "Kristo",
  //     surname: "Vaughn",
  //     email: "abc123@gmail.com",
  //     contact: "+372 5679 8908",
  //     company: "My company Ltd.",
  //     vat: "1324343554",
  //     location: "Vesse 12, Tallinn, Harjumaa 12345",
  //   };

  return (
    <>
      <Button
        onClick={handleToggle}
        className={classes.btn}
        variant="outlined"
        size="medium"
        color="primary"
        disabled={disabled}
      >
        View profile
      </Button>

      <Dialog onClose={handleToggle} open={open}>
        <DialogTitle>
          <div className={classes.titleWrapper}>
            <div className={classes.imgWrapper}>
              {getUser?.profilePic && (
                <NameAvatar
                  firstName={getUser?.firstName}
                  surName={getUser?.surName}
                  url={getUser?.profilePic || ''}
                  variant="large"
                />
              )}
            </div>
            <Clear onClick={handleToggle} className={classes.close} />
          </div>
        </DialogTitle>
        <DialogContent className={classes.wrapper}>
          <Grid container>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Name</Typography>
                <Typography className={classes.value}>{getUser?.firstName}</Typography>
              </div>
              <div>
                <Typography className={classes.title}>Surname</Typography>
                <Typography className={classes.value}>{getUser?.surName}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Email</Typography>
                <Typography className={classes.value}>
                  <a className={classes.email} href="#">
                    {getUser?.email}
                  </a>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Contact</Typography>
                <Typography className={classes.value}>{getUser?.phone}</Typography>
              </div>
            </Grid>
            <br />
            <br />

            <Grid item xs={12} className={`${classes.companyRow} ${classes.detailRow}`}>
              <div>
                <Typography className={classes.title}>Company</Typography>
                <Typography className={classes.value}>{getUser?.companyName}</Typography>
              </div>
              <div>
                <Typography className={classes.title}>VAT</Typography>
                <Typography className={classes.value}>{getUser?.companyVat}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Location</Typography>
                <Typography className={classes.value}>{getUser?.companyLocation}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Company contact number</Typography>
                <Typography className={classes.value}>{getUser?.companyPhone}</Typography>
              </div>
            </Grid>

            <Grid item xs={12} className={classes.btnWrapper}>
              <IconButton
                onClick={handleDelete}
                aria-label="delete"
                disableRipple={true}
                size={'small'}
                color="primary"
              >
                <Delete />
              </IconButton>
              <Button
                className={classes.btn}
                onClick={startRoom}
                variant="contained"
                size="medium"
                color="primary"
              >
                Start conversation
              </Button>
              <Button
                className={classes.btn}
                variant="contained"
                size="medium"
                color="primary"
                onClick={openTaskDrawer}
              >
                Create task
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewProfile

const useStyles = makeStyles({
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 0,
    alignItems: 'center',
  },
  wrapper: {
    width: 300,
  },
  imgWrapper: {
    maxWidth: 80,
    maxHeight: 80,
  },
  img: {
    width: '100%',
  },
  close: {
    color: colors.primary,
    cursor: 'pointer',
  },
  btn: {
    fontSize: 12,
    fontWeight: 'bold',
    '@media (max-width:960px)': {
      width: '100%',
      marginTop: 10,
    },
  },
  btnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: `25px 0px`,
    '@media (max-width:960px)': {
      flexDirection: 'column',
    },
  },
  detailRow: {
    display: 'flex',
    paddingTop: 10,
    gap: 30,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  value: {
    fontSize: 14,
    fontWeight: 500,
  },
  companyRow: {
    paddingTop: 40,
  },
  email: {
    color: colors.textPrimary,
  },
})
