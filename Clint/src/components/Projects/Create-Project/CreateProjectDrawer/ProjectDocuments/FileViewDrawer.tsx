import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import colors from "assets/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import FileViewer from "react-file-viewer";
import projectActions, {
  getFolder,
  getGroup,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";

interface AddGroupProps {}

const FileViewDrawer: React.FC<AddGroupProps> = () => {
  const classes = useStyles();
  // const roles = ["create", "edit", "delete", "self-made"];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isTimeProfile, setIsTimeProfile] = useState(false);

  const [name, setName] = useState();
  const [groups, setGroups] = useState();
  const [selectGroups, setSelectGroups] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;

  const {
    documentDrawer,
    groupList,
    selectedProject,
    FileViewerDrawer,
    folderFiles,
    filePath,
    fileType,
  } = useSelector((state: RootState) => state.project);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(projectActions.closeFileViewDrawer());
  };
  const onError = (e: any) => {
    console.log(e, "error in file-viewer");
  };

  // const filePath = folderFiles?.map?.((file) => {
  //   return file?.url;
  // });
  console.log("filePath", filePath);
  console.log("fileType", fileType);

  console.log("FileViewerDrawer", FileViewerDrawer);
  return (
    <Dialog open={FileViewerDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <FileViewer
            fileType={fileType}
            filePath={filePath}
            onError={onError}
          />
        </div>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleOk} color="primary" disabled={isDiabled}>
          Ok
          {isDiabled && loading && (
            <CircularProgress size={20} className={classes.progress} />
          )} 
        </Button>
        */}
        <Button onClick={handleClose} color="secondary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileViewDrawer;

const useStyles = makeStyles({
  menuWrapper: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  menuText: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 10,
    height: 30,
    color: colors.textPrimary,
  },
  dropdownWrapper: {
    maxWidth: 370,
    width: 370,
    height: "auto",
  },
  optionsWrapper: {
    width: "100%",
  },
  option: {
    display: "flex",
    justifyContent: "space-between",
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
