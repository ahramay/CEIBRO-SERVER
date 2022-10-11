
import { Drawer, Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import colors from '../../../assets/colors'
import { closeQuestioniarDrawer } from '../../../redux/action/chat.action';
// import colors from '../../../../assets/colors'
// import projectActions from '../../../../redux/action/project.action'
import { RootState } from '../../../redux/reducers';
import QuestioniarHeader from './QuestioniarHeader'
import QuestioniarBody from './QuestioniarBody'
// import CreateProjectBody from './CreateProjectBody'
// import CreateProjectFooter from './CreateProjectFooter'

const CreateQuestioniarDrawer = () => {
    const drawerOpen = useSelector((store: RootState) => store.chat.questioniarDrawer)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClose = () => {
        dispatch(closeQuestioniarDrawer());
    }

    return (    
        <Dialog 
            className={'custom-scrollbar'} 
            onClose={handleClose} 
            open={drawerOpen} 
        >
            <div className={classes.outerWrapper}>
                <QuestioniarHeader/>
                <QuestioniarBody/>
            </div>
        </Dialog>
    )
}

export default CreateQuestioniarDrawer;

const useStyles = makeStyles({
    outerWrapper: {
      
        backgroundColor: colors.white,
        height: '70vh',
        width:'610px',
        ['@media (max-width:960px)']: {
            // width: '100vw'
        }
    }
})
