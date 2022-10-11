import { Grid } from '@material-ui/core'
import ProjectSection from './ProjectSection'
import TaskSection from './TaskSection'
import SmartMenuBar from './SmartMenuBar'

const Dashboard = () => {

    return (
        <Grid item xs={12}>
            <SmartMenuBar/>
            <TaskSection/>
            <ProjectSection/>
        </Grid>
    );
}

export default Dashboard;