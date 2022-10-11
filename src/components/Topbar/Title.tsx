import React from "react";
import { useDispatch } from "react-redux";
import { Typography, Button, makeStyles, IconButton } from "@material-ui/core";
import projectActions from "../../redux/action/project.action";
import taskActions from "../../redux/action/task.action";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import colors from "../../assets/colors";
import SelectDropdown from "../Utills/Inputs/SelectDropdown";
import { useMediaQuery } from "react-responsive";
import { ArrowBack } from "@material-ui/icons";
import CreateChat from "./CreateChat";
import { projectOverviewTemplate } from "constants/interfaces/project.interface";

const Title = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = useHistory();
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const openProjectDrawer = () => {
    dispatch(projectActions.setSelectedProject(null));
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));
    dispatch(projectActions.openDrawer());
  };

  const openTaskDrawer = () => {
    dispatch(taskActions.openDrawer());
  };

  const goBack = () => {
    history.goBack();
  };

  const BackIcon = () => (
    <ArrowBack className={classes.backIcon} onClick={goBack} />
  );

  const getTitle = () => {
    if (location.pathname.includes("project"))
      return (
        <>
          <div className={classes.projectTitle}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.dashboardTitleText}
            >
              Project
            </Typography>
            <Button
              onClick={openProjectDrawer}
              size="small"
              color="primary"
              variant="contained"
            >
              Create new
            </Button>
          </div>
        </>
      );

    if (location.pathname.includes("task"))
      return (
        <>
          <div className={classes.taskTitle}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.dashboardTitleText}
            >
              Task
            </Typography>
            <Button
              onClick={openTaskDrawer}
              size="small"
              color="primary"
              variant="contained"
            >
              Create new
            </Button>
          </div>
        </>
      );

    if (location.pathname.includes("dashboard"))
      return (
        <>
          <div className={classes.dashboardTitle}>
            <Typography
              variant="h6"
              className={classes.dashboardTitleText}
              component="h6"
            >
              Dashboard
            </Typography>
            {/* {!isTabletOrMobile && 
                        <Button 
                            size="small" 
                            color="primary" 
                            variant="contained"
                        >
                            <Link className={classes.login} to="/login">
                                Login
                            </Link>
                        </Button>
                    } */}
          </div>
        </>
      );

    if (location.pathname.includes("chat"))
      return (
        <>
          <div className={classes.chatTitle}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.dashboardTitleText}
            >
              Chat
            </Typography>
          </div>
          {!isTabletOrMobile && (
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <CreateChat />
            </div>
          )}
        </>
      );

    if (location.pathname.includes("connections"))
      return (
        <>
          <div className={classes.chatTitle}>
            <BackIcon />
            <Typography
              className={classes.profileTitle}
              variant="h6"
              component="h6"
            >
              My connections
            </Typography>
          </div>
        </>
      );

    if (location.pathname.includes("profile"))
      return (
        <>
          <div className={classes.chatTitle}>
            <BackIcon />
            <Typography
              className={classes.profileTitle}
              variant="h6"
              component="h6"
            >
              Profile
            </Typography>
          </div>
        </>
      );
  };

  return <>{getTitle()}</>;
};

export default Title;

const useStyles = makeStyles({
  login: {
    color: colors.white,
    textDecoration: "none",
  },
  profileTitle: {
    fontSize: 30,
    fontWeight: 500,
  },
  chatTitle: {
    paddingLeft: 33,
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ["@media (max-width:960px)"]: {
      paddingLeft: 0,
    },
  },
  backIcon: {
    color: colors.primary,
    paddingRight: 20,
    cursor: "pointer",
  },
  projectTitle: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingLeft: 33,
    gap: 20,
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
    },
  },
  taskTitle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: 33,
    gap: 20,
    alignItems: "center",
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
    },
  },
  dashboardTitle: {
    display: "flex",
    paddingLeft: 33,
    width: "100%",
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
      paddingLeft: 0,
    },
  },
  dashboardTitleText: {
    fontSize: 30,
    fontWeight: 500,
  },
});
