import { makeStyles, Typography } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import colors from '../../assets/colors';

const NoConversation = () => {
    
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Chat className={classes.chatIcon} />
            <Typography className={classes.message}>
                No conversation selected
            </Typography>
        </div>
    )
}

export default NoConversation;

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '80%'
    },
    message: {
        color: colors.lightBlack
    },
    chatIcon: {
        fontSize: 50,
        color: colors.lightBlack
    }
})