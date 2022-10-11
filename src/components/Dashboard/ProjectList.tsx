import { Grid } from "@material-ui/core";
import { ProjectInterface } from "constants/interfaces/project.interface";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsWithPagination } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import ProjectCard from "../Utills/ProjectCard/ProjectCard";

const ProjectList = () => {
  const { projects } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsWithPagination());
  }, []);

  return (
    <Grid container>
      {projects &&
        projects.map((project: ProjectInterface, index: number) => {
          return <ProjectCard key={index} project={project} />;
        })}
    </Grid>
  );
};

export default ProjectList;
