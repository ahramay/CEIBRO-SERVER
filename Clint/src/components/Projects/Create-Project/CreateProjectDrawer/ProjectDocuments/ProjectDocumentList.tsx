import {
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import assets from "assets/assets";
import { FolderInterface } from "constants/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolder } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import Moment from "react-moment";
import ProjectDocumentMenu from "./ProjectDocsMenu";

interface ProjectDocumentListInt {
  onFolderClick?: (folder: FolderInterface) => any;
}

const ProjectDocumentList: React.FC<ProjectDocumentListInt> = (props) => {
  const { selectedProject, folderList } = useSelector(
    (state: RootState) => state?.project
  );
  const { user } = useSelector((state: RootState) => state?.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;

  console.log("folderList", folderList);

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: { selectedProject },
      };
      setLoading(true);

      dispatch(getFolder(payload));
    }
  }, [selectedProject]);

  const classes = useStyles();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleFolderClick = (folder: FolderInterface) => {
    props.onFolderClick?.(folder);

    // console.log("folder is", folder.id);
    // dispatch(setSelectedFolder(folder?.id));
  };

  return (
    <TableContainer style={{ height: "100%", overflow: "visible" }}>
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
        <TableBody>
          {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}

          {folderList?.map((row: FolderInterface) => {
            console.log("folder", row.name);
            return (
              <TableRow key={row?.name}>
                <TableCell
                  onClick={() => handleFolderClick(row)}
                  component="th"
                  scope="row"
                  className={classes.name}
                >
                  <img src={assets.usersFolder} className="width-16" />
                  <Typography className={`${classes.name}`}>
                    {row?.name}
                  </Typography>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  className={classes.modifyDate}
                >
                  {<Moment format="YYYY-MM-DD">{row?.createdAt}</Moment>}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  className={classes.modifyDate}
                >
                  {row?.group?.members?.length || 0} member(s)
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  style={{ padding: 6 }}
                  className={classes.modifyDate}
                >
                  {row?.access?.length > 0
                    ? `${row?.access?.length} member(s)`
                    : "Only you"}
                  {row.creator === user.id && (
                    <ProjectDocumentMenu
                      folderId={row.id || ""}
                      access={row?.access || []}
                      groupId={row?.group?.id || ""}
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectDocumentList;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  nameWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 11,
    borderBottom: "none",
  },
  name: {
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
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    marginTop: "300px",
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
