import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers";
import InputText from "../../../../Utills/Inputs/InputText";
import InputTextArea from "../../../../Utills/Inputs/InputTextArea";

const ProjectOverViewForm = () => {
  const dispatch = useDispatch();
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );
  const handleTitleChange = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        title: e.target.value,
      })
    );
  };
  const handleLocationChange = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        location: e.target.value,
      })
    );
  };
  const handleDescriptionChange = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        description: e.target.value,
      })
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <InputText
          onChange={handleTitleChange}
          name="title"
          placeholder="Enter Project title"
          value={projectOverview.title || ""}
        />
      </Grid>

      <Grid item xs={12} style={styles.inputWrapper}>
        <InputText
          onChange={handleLocationChange}
          name="location"
          placeholder="Enter a location address"
          value={projectOverview.location}
        />
      </Grid>

      <Grid item xs={12} style={styles.inputWrapper}>
        <InputTextArea
          onChange={handleDescriptionChange}
          name="description"
          placeholder="Enter project description"
          value={projectOverview.description}
        />
      </Grid>
    </Grid>
  );
};

export default ProjectOverViewForm;

const styles = {
  inputWrapper: {
    marginTop: 15,
  },
};
