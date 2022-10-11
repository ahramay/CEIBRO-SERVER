import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ProjectCard from "../../Utills/ProjectCard/ProjectCard";
import CreateProject from "../../Utills/ProjectCard/CreateProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import {
  ProjectInterface,
  projectOverviewTemplate,
} from "constants/interfaces/project.interface";
import { makeStyles } from "@material-ui/core";
import projectActions from "redux/action/project.action";

const ProjectList = () => {
  const { projects, projectsLoading } = useSelector(
    (state: RootState) => state.project
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const openCreateProject = () => {
    dispatch(projectActions.setSelectedProject(null));
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));
    dispatch(projectActions.openDrawer());
  };
  return (
    <Grid container>
      {projects && projects.length > 0 ? (
        <>
          {projects?.map((project: ProjectInterface, index: number) => {
            return <ProjectCard key={index} project={project} />;
          })}
          <CreateProject />
        </>
      ) : (
        <>
          {!projectsLoading && (
            <Grid container style={{ height: 400 }}>
              <Grid item xs={12} className={classes.noProject}>
                <Typography className={classes.noProjectText}>
                  Not any project was created by you or you’re not participating
                  yet
                </Typography>
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={openCreateProject}
                >
                  Create new
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default ProjectList;

const useStyles = makeStyles({
  noProject: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection: "column",
    marginBottom: 40,
  },
  noProjectText: {
    fontSize: 14,
    fontWeight: 500,
    gap: 20,
  },
});

const projects: ProjectInterface[] = [
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
  //   dueDate: "26-07-2021",
  //   owner: "Ilja Nikolajev",
  //   title: "New project Title 1",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Draft",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajeadfadf ajdlfjas ldv",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
  //   dueDate: "26-07-2021",
  //   owner: "Ilja Nikolajev",
  //   title: "New project Title 1",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Draft",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajev",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
  //   dueDate: "26-07-2021",
  //   owner: "Ilja Nikolajev",
  //   title: "New project Title 1",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Draft",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajev",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
  //   dueDate: "26-07-2021",
  //   owner: "Ilja Nikolajev",
  //   title: "New project Title 1",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Draft",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajev",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
];
