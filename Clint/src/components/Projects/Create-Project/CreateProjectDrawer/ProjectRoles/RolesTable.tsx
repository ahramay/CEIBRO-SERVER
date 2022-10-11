import {
  Checkbox,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import "./roles-table.css";
import colors from "assets/colors";
import React, { useEffect, useState } from "react";
import InputCheckbox from "../../../../Utills/Inputs/InputCheckbox";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import projectActions, {
  deleteRole,
  getRoles,
  getRolesById,
} from "redux/action/project.action";
import assets from "assets/assets";
import { RoleInterface } from "constants/interfaces/project.interface";
import { checkRolePermission } from "helpers/project.helper";
import { avaialablePermissions } from "config/project.config";
import RoleMenu from "./RoleMenu";
import { toast } from "react-toastify";

// store?: RootState
const RolesTable = () => {
  const { selectedProject, rolesList, selectedRole, userPermissions } =
    useSelector((state: RootState) => state?.project);

  console.log("rolesList", rolesList);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);

  const isDiabled = !loading ? false : true;
  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: selectedProject,
      };
      setLoading(true);
      dispatch(getRoles(payload));
    }
  }, [selectedProject]);

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
          dispatch(getRoles({ other: selectedProject }));
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: id,
      })
    );
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.name}>Role name</Typography>
      </Grid>

      <Grid item xs={12} className={classes.dataContainer}>
        {loading && <CircularProgress size={20} className={classes.progress} />}
        {rolesList?.map((role: RoleInterface) => {
          return (
            <div
              className={classes.roleChip}
              onClick={() => handleRoleClick(role?.id)}
            >
              <div className={classes.roleInner}>
                <Typography className={classes.roleName}>
                  {role.name}
                </Typography>
                <div className={classes.roleDetail}>
                  {role.admin && (
                    <Typography className={classes.detail}>Admin</Typography>
                  )}
                  {(role?.roles?.length || 0) > 0 && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Role: &nbsp;
                      </Typography>
                      {role?.roles?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                  {(role?.member?.length || 0) > 0 && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Member: &nbsp;
                      </Typography>
                      {role?.member?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                  {(role?.timeProfile?.length || 0) > 0 && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Time Profile: &nbsp;
                      </Typography>
                      {role?.timeProfile?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className={classes.roleMenu}>
                {/* <img src={assets.moreIcon} className={`width-16`} /> */}
                <RoleMenu
                  onEdit={handleRoleClick}
                  onDelete={() => handleDelete(role?.id)}
                  name={role?.name}
                />
              </div>
            </div>
          );
        })}
      </Grid>
    </Grid>
    // <TableContainer className="roles-table">
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className={classes.rowTop}>Owner</TableCell>
    //         <TableCell className={classes.rowTop} align="right"></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rolesList?.map((row: any) => (
    //         <TableRow key={row.name}>
    //           <TableCell component="th" scope="row" className={classes.name}>
    //             {row.name}
    //           </TableCell>
    //           <TableCell align="right">
    //             <img src={assets.moreIcon} />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default RolesTable;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  rowTop: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.textGrey,
  },
  titleContainer: {
    padding: "15px 1px",
    borderBottom: `1px solid ${colors.ternaryGrey}`,
  },
  name: {
    fontSize: 12,
    color: colors.textGrey,
    fontWeight: 500,
  },
  dataContainer: {},
  roleChip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
    borderBottom: `1px solid ${colors.grey}`,
  },
  roleInner: {
    display: "flex",
    flexDirection: "column",
  },
  roleName: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },
  roleDetail: {
    display: "flex",
    textTransform: "capitalize",
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.textGrey,
  },
  detail: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  roleMenu: {},
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
