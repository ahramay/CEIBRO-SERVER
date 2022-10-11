import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import projectActions from "redux/action/project.action";
import colors from "../../../assets/colors";
import { useDispatch } from "react-redux";
import { projectOverviewTemplate } from "constants/interfaces/project.interface";

const ProjectCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openProjectDrawer = () => {
    dispatch(projectActions.setSelectedProject(null));
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));

    dispatch(projectActions.openDrawer());
  };

  return (
    <Grid
      className={classes.cardOuterWrapper}
      item
      xs={12}
      sm={6}
      md={3}
      lg={3}
      xl={2}
      onClick={openProjectDrawer}
    >
      <Add className={classes.icon} />
      <Typography className={classes.text}>Create new project</Typography>
    </Grid>
  );
};

export default ProjectCard;

const useStyles = makeStyles({
  cardOuterWrapper: {
    padding: 5,
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
    "&:hover": {
      border: `1px solid ${colors.mediumGrey}`,
      borderRadius: 4,
    },
    height: 270,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  icon: {
    fontSize: 40,
    fontWeight: "normal",
    color: colors.primary,
  },
});
