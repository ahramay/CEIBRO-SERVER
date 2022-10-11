import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ProjectOverview from "./ProjectOverview/ProjectOverview";
import ProjectRoles from "./ProjectRoles/ProjectRoles";
import ProjectMembers from "./ProjectMember/ProjectMembers";
import ProjectGroups from "./ProjectGroups/ProjectGroups";
import ProjectDocuments from "./ProjectDocuments/ProjectDocuments";
import TimeProfile from "./TimeProfile/TimeProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import { getPermissions } from "redux/action/project.action";

const CreateProjectBody = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [permissionRef, setPermissionRef] = useState<any>();
  const {
    menue: selectedMenue,
    selectedProject,
    drawerOpen,
  } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    if (!drawerOpen && permissionRef) {
      clearInterval(permissionRef);
    }
  }, [drawerOpen, permissionRef]);

  useEffect(() => {
    // alert(selectedProject);
    if (selectedProject) {
      if (permissionRef) {
        clearInterval(permissionRef);
      }
      setPermissionRef(
        setInterval(() => {
          if (selectedProject) {
            dispatch(getPermissions({ other: selectedProject }));
          }
        }, 60000)
      );
    } else {
      clearInterval(permissionRef);
    }
    return () => {
      if (permissionRef) {
        clearInterval(permissionRef);
      }
    };
  }, [selectedProject]);

  return (
    <Grid container className={classes.body}>
      {selectedMenue === 1 && <ProjectOverview />}
      {selectedMenue === 2 && <ProjectRoles />}
      {selectedMenue === 3 && <ProjectGroups />}
      {selectedMenue === 4 && <ProjectDocuments />}
      {selectedMenue === 5 && <ProjectMembers />}
      {selectedMenue === 6 && <TimeProfile />}
    </Grid>
  );
};

export default CreateProjectBody;

const useStyles = makeStyles({
  body: {
    padding: 20,
    overflowY: "scroll",
    height: "calc(100vh - 190px)",
    ["@media (max-width:960px)"]: {
      paddingTop: 10,
    },
  },
});
