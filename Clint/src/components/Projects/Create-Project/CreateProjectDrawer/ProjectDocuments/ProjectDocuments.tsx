import { Grid, makeStyles } from "@material-ui/core";
import { FolderInterface } from "constants/interfaces/project.interface";
import { useState } from "react";
import colors from "../../../../../assets/colors";
import FolderFiles from "./FolderFiles";
import ProjectDocumentHeader from "./ProjectDocumentHeader";
import ProjectDocumentList from "./ProjectDocumentList";

const ProjectDocuments = () => {
  const classes = useStyles();
  const [folder, setFolder] = useState<FolderInterface | any>(null);

  const handleFolderClick = (folder: FolderInterface) => {
    setFolder(folder);
  };

  const handleGoBack = () => {
    if (folder) {
      setFolder(null);
    }
  };

  return (
    <>
      <Grid item xs={12} alignItems="flex-start">
        <ProjectDocumentHeader
          handleGoBack={handleGoBack}
          selectedFolder={folder}
          isFolder={!folder}
        />
        <Grid item xs={12} className={classes.groupsWrapper}>
          {!folder && <ProjectDocumentList onFolderClick={handleFolderClick} />}
          {folder && <FolderFiles selectedFolderId={folder?.id} />}
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDocuments;

const useStyles = makeStyles({
  titleWrapper: {
    paddingTop: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    paddingBottom: 10,
  },
  groupsWrapper: {
    height: "100%",
  },
});
