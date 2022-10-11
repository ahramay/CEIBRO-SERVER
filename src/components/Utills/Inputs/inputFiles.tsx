import { FC, createRef, useCallback, useEffect, useState } from "react";
import InputHOC from "./InputHOC";
import "./inputText.css";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  getFolderFiles,
  uploadFileToFolder,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../assets/colors";
import { useDropzone } from "react-dropzone";

import LinearProgress from "@material-ui/core/LinearProgress";



interface FolderFilesInt {
  selectedFolderId: string | null;
}

const InputFiles: FC<FolderFilesInt> = (props) => {
  const { selectedProject, folderList, folderFiles, FileViewerDrawer } =
    useSelector((state: RootState) => state?.project);

  console.log("folderFiles", folderFiles);
  const classes = useStyles();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
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

  return (
    <div>
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
    </div>
  );
};

export default InputFiles;

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
