import {
  Button,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { FolderFileInterface } from "constants/interfaces/project.interface";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  getFolderFiles,
  uploadFileToFolder,
  deleteRole,
  getRoles,
  getGroup,
  deleteGroup
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import { useDropzone } from "react-dropzone";
import FilePreviewer from "components/Utills/ChatChip/FilePreviewer";
import FileViewDrawer from "./FileViewDrawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Moment from "react-moment";
import { RoleInterface } from "constants/interfaces/project.interface";
import { checkRolePermission } from "helpers/project.helper";
import { avaialablePermissions } from "config/project.config";
import FileMenu from "./fileMenu";
import { toast } from "react-toastify";
import { GroupInterface } from "constants/interfaces/project.interface";
import FileClip from "../../../../Utills/Inputs/FileClip/FileChip";
interface FolderFilesInt {
  selectedFolderId: string | null;
}

const FolderFiles: React.FC<FolderFilesInt> = (props) => {
  const { selectedProject, folderList, folderFiles, FileViewerDrawer, rolesList, userPermissions } =
    useSelector((state: RootState) => state?.project);
    console.log("rolesList", rolesList);
  console.log("folderFiles", folderFiles);

  const { selectedFolderId } = props;

  const dispatch = useDispatch();

  const getFiles = () => {
    if (selectedFolderId) {
      dispatch(
        getFolderFiles({
          other: { selectedFolder: selectedFolderId },
        })
      );
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const classes = useStyles();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      dispatch(
        uploadFileToFolder({
          body: formData,
          other: selectedFolderId,
          success: () => {
            getFiles();
          },
          finallyAction: () => {
            setLoading(false);
          },
        })
      );
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    disabled: loading,
  });



  const handleFileClick = (url: any, type: any) => {
    dispatch(projectActions.setSelectedFileUrl(url));
    dispatch(projectActions.setSelectedFileType(type));

    dispatch(projectActions.openFileViewDrawer());
  };
  console.log("FileViewerDrawer", FileViewerDrawer);

  const havePermission = checkRolePermission(
    userPermissions,
    avaialablePermissions.edit_permission
  );
  console.log("havePermission userd", userPermissions);

  const handleRoleClick = (id: any) => {
    if (havePermission) {
      dispatch(projectActions.setSelectedRole(id));
      dispatch(projectActions.openProjectRole());
    }
  };

  const handleDelete = (id: any) => {
    setLoading(true);
    dispatch(
      deleteRole({
        success: () => {
          toast.success("Deleted Successfully");
          dispatch(getFolderFiles({ other: selectedProject }));
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: id,
      })
    );
  };

  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: selectedProject,
      };
      setLoading(true);
      // dispatch(getGroup({ other: selectedProject }));
      dispatch(getGroup(payload));
    }
  }, [selectedProject]);

  const handleGroupClick = (id: any) => {
    dispatch(projectActions.getFolderFiles(id));
    dispatch(projectActions.openProjectFile());
  };

  const handleGroupDelete = (id: any) => {
    // alert("deleted");
    setLoading(true);
    dispatch(
      deleteGroup({
        success: () => {
          toast.success("Deleted Successfully");
          dispatch(getFolderFiles({ other: selectedProject }));
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: id,
      })
    );
  };



  return (
    <div
      {...getRootProps({
        onClick: (event: any) => event.stopPropagation(),
      })}
      style={{ minHeight: 300 }}
    >
      <input {...getInputProps()} />
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={`${classes.tableTitle}`}>Name</TableCell>
              <TableCell className={`${classes.tableTitle}`} align="right">
                Date modified
              </TableCell>
              <TableCell className={`${classes.tableTitle}`} align="right">
                Members
              </TableCell>
              <TableCell className={`${classes.tableTitle}`} align="right">
                Who can access
              </TableCell>
            </TableRow>
          </TableHead>
          {!isDragActive && !loading && folderFiles?.length > 0 && (
            <TableBody>
              {folderFiles?.map((file: FolderFileInterface) => {
                return (
                  <TableRow key={file?.name}>
                    <TableCell
                      onClick={() => { }}
                      style={{ display: "flex" }}
                      component="th"
                      scope="row"
                    >
                      <Typography
                        className={`${classes.fileName}`}
                        onClick={() =>
                          handleFileClick(file?.url, file?.fileType)
                        }
                      >
                        {file?.name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      className={classes.modifyDate}
                    >
                      <Moment format="YYYY-MM-DD HH:MM">
                        {file?.createdAt}
                      </Moment>
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      className={classes.modifyDate}
                    >
                      {file?.folder?.group?.members?.length || 0} member(s)
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      className={classes.modifyDate}
                    >
                      <Typography className={classes.access}>
                        Only you
                      </Typography>
                    </TableCell>
                    <TableCell
                     component="th"
                     scope="row"
                  
                     className={classes.modifyDates}
                    >
                    <Typography className={classes.accesss}>
                        {/* <img src={assets.moreIcon} className={`width-16`} /> */}
                        <FileMenu
                          onEdit={handleRoleClick}
                          onDelete={() => handleDelete(file?.folder?.id)}
                          name={file?.folder?.id}
                          />
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}

                   
                
              <FileViewDrawer />
            </TableBody>
          )}
        
        </Table>
      </TableContainer>
      {(isDragActive || loading || folderFiles?.length < 1) && (
        <DragMessage
          classes={classes}
          onBtnClick={open}
          showBtn={!isDragActive && !loading && folderFiles?.length < 1}
          message={
            loading
              ? "Uploading file"
              : isDragActive
                ? "Drop your file here ..."
                : folderFiles?.length < 1
                  ? "Drop to upload file or choose from computer"
                  : ""
          }
          loading={loading}
        />
      )}
      {loading && <CircularProgress size={20} className={classes.progress} />}
      {folderFiles?.map((file: FolderFileInterface) => (
        <FileClip
          name={file.name}
          // selectedFolderId={file.id || ""}
          handleClick={() => handleGroupClick(file?.id)}
          handleDelete={() => handleGroupDelete(file?.id)}
        />
      ))}
    </div>
    
  );
};

export default FolderFiles;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  uploadMessage: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  message: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 20,
  },
  nameWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 11,
    borderBottom: "none",
  },
  name: {
    borderBottom: "none",
  },
  fileName: {
    fontSize: 14,
    fontWeight: 500,
    paddingLeft: 5,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  modifyDate: {
    fontSize: 14,
    fontWeight: 500,
    // paddingLeft: 15,
  },
  folderIcon: {
    fontSize: 20,
    paddingRight: 20,
  },
  dateWrapper: {
    padding: 9,
    borderBottom: "none",
  },
  memberWrapper: {
    padding: 10,
    borderBottom: "none",
  },
  file: {
    marginLeft: 62,
  },
  fileActions: {
    color: colors.primary,
  },
  generic: {
    fontSize: 14,
    fontWeight: 500,
  },
  folder: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  tableTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  dragging: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    width: "100%",
  },
  draggingText: {
    fontSize: 14,
    fontWeight: 500,
  },
  access: {
    fontSize: 14,
    fontWeight: 500,
  },
  accesss:{
    margileft:"80px"
  },
  modifyDates:{
    margileft:"-80px"
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "300px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});

interface DragMessageInt {
  classes: any;
  message?: string;
  showBtn?: boolean;
  onBtnClick?: () => void;
  loading?: boolean;
}

const DragMessage: React.FC<DragMessageInt> = ({
  classes,
  message,
  showBtn,
  onBtnClick,
  loading,
}) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ paddingTop: 20 }}
    >
      <Typography className={classes.message}>{message}</Typography>
      {loading && <LinearProgress color="primary" style={{ width: 200 }} />}
      {showBtn && (
        <Button
          style={{ alignItems: "center" }}
          variant="outlined"
          color="primary"
          onClick={onBtnClick}
        >
          Browse...
        </Button>
      )}
      {/* </TableCell> */}
    </Grid>
  );
};
