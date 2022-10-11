import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import ListItemIcon from "@material-ui/icons/List";
import { TramSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import colors from "../../../../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../../Utills/Inputs/InputText";
import projectActions, {
  getFile,
  getFolder,
  getFolderFiles,
  getGroup,
} from "redux/action/project.action";
import DocumentDrawer from "./DocumentDrawer";
import { FolderInterface } from "constants/interfaces/project.interface";
import { RootState } from "redux/reducers";

interface headerInterface {
  selectedFolder?: FolderInterface | null;
  handleGoBack: () => any;
  isFolder: boolean;
}

const ProjectDocumentHeader: React.FC<headerInterface> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedProject, folderList } = useSelector(
    (state: RootState) => state?.project
  );
  const { selectedFolder, handleGoBack, isFolder } = props;
  const [findDoc, setFindDoc] = useState<any>();
  // console.log("findDoc", findDoc);

  console.log("folder id", selectedFolder?.id);

  useEffect(() => {
    if (findDoc) {
      dispatch(getFolder({ other: { selectedProject, findDoc } }));
    }
  }, [findDoc]);

  useEffect(() => {
    if (selectedFolder && findDoc) {
      dispatch(
        getFolderFiles({
          other: { selectedFolder: selectedFolder?.id, findDoc },
        })
      );
    }
  }, [selectedFolder, findDoc]);

  return (
    <Grid container>
      <Grid item xs={12} md={2} className={classes.actionWrapper}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ListItemIcon />}
          className={classes.actionButton}
        >
          Bulk edit
        </Button>
      </Grid>
      <Grid item xs={12} md={7} className={classes.actionWrapper}>
        <InputText
          placeholder={isFolder ? "Find folder" : "Find document"}
          onChange={(e: any) => setFindDoc(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3} className={classes.secondActionWrapper}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.actionButton}
          onClick={() => {
            dispatch(projectActions.openProjectDocuments());
          }}
        >
          Create a folder
        </Button>
        <DocumentDrawer />
        <div className={classes.viewIcons}>
          <BsGrid style={{ color: colors.primary }} />
          <AiOutlineUnorderedList />
        </div>
      </Grid>
      <Grid item xs={12} className={classes.breadCrums}>
        <Typography onClick={handleGoBack} className={classes.breadCrumsText}>
          Document /
        </Typography>
        {selectedFolder && (
          <Typography className={classes.breadCrumsFolder}>
            &nbsp;{selectedFolder?.name}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectDocumentHeader;

const useStyles = makeStyles({
  breadCrums: {
    paddingTop: 10,
    display: "flex",
  },
  breadCrumsText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textGrey,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  breadCrumsFolder: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },
  actionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    ["@media (max-width:960px)"]: {
      paddingBottom: 10,
    },
  },
  secondActionWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
    },
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  viewIcons: {
    display: "flex",
    justifyContent: "space-between",
    width: "50px",
  },
});
