import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListIcon from "@material-ui/icons/List";
import {
  CircularProgress,
  Grid,
  ListItemIcon,
  makeStyles,
  Typography,
  Drawer,
} from "@material-ui/core";
import InputText from "../../../../Utills/Inputs/InputText";
import SelectDropdown from "../../../../Utills/Inputs/SelectDropdown";
import { Close } from "@material-ui/icons";
import CreateWork from "./CreateWork";
import colors from "../../../../../assets/colors";
import WorkTable from "./WorkProfileTable";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  createNewProfile,
  getProjectProfile,
  getTimeProfileById,
  updateTimeProfile,
} from "redux/action/project.action";
import { toast } from "react-toastify";
import { RootState } from "redux/reducers";
import { avaialablePermissions } from "config/project.config";
import { checkTimeProfilePermission } from "helpers/project.helper";

const MemberDialog = () => {
  const {
    selectedProject,
    timeProfileDrawer,
    selectedTimeProfile,
    userPermissions,
  } = useSelector((state: RootState) => state.project);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const isDisabled = !loading ? false : true;

  const dispatch = useDispatch();

  const classes = useStyle();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(projectActions.closeTimeProfileDrawer());

    // setOpen(false);
  };
  const handleOk = () => {
    const payload = {
      body: { name },
      success: () => {
        toast.success("profile created successfuly");
        dispatch(projectActions.closeTimeProfileDrawer());
        dispatch(getProjectProfile({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(createNewProfile(payload));
  };

  const handleUpdate = () => {
    const payload = {
      body: { name },
      success: () => {
        toast.success("Time Profile Updated successfully");
        dispatch(projectActions.closeTimeProfileDrawer());
        dispatch(getProjectProfile({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedTimeProfile,
    };
    setLoading(true);

    dispatch(updateTimeProfile(payload));
  };

  const handleSubmit = () => {
    if (selectedTimeProfile) {
      handleUpdate();
    } else {
      handleOk();
    }
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (selectedTimeProfile && timeProfileDrawer) {
      dispatch(
        getTimeProfileById({
          other: selectedTimeProfile,
          success: (res) => {
            setName(res.data.name);
          },
        })
      );
    }
  }, [selectedTimeProfile, timeProfileDrawer]);

  useEffect(() => {
    setName("");
  }, [timeProfileDrawer]);

  const havePermission = checkTimeProfilePermission(
    userPermissions,
    avaialablePermissions.create_permission
  );

  console.log("profile havePermission", havePermission);
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        disabled={!havePermission ? true : false}
        // onClick={handleClickOpen}
        onClick={() => {
          if (havePermission) {
            dispatch(projectActions.openTimeProfileDrawer());
            dispatch(projectActions.setSelectedTimeProfile(null));
          }
        }}
      >
        Create new Profile
      </Button>
      <Grid container style={{ backgroundColor: "red" }}>
        <Drawer
          open={timeProfileDrawer}
          onClose={handleClose}
          anchor="right"
        >
          <div className={classes.outerWrapper}>
            <Grid item xs={12}>
              <DialogTitle id="customized-dialog-title" className="customized-title">
                <Typography className={classes.headerTitle}>Time Profile</Typography>
                <div className={classes.headerAction} onClick={handleClose}>
                  Close
                  <Close />
                </div>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} sm={12} className={classes.body}>
                    <InputText
                      value={name}
                      placeholder="Enter a profile layout name"
                      onChange={handleNameChange}
                      className={classes.input}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.bulkWrapper}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ListIcon />}
                    className={classes.actionButton}
                  >
                    Bulk edit
                  </Button>
                  <CreateWork />
                </Grid>
                <Grid item xs={12}>
                  <WorkTable />
                </Grid>

                {/* <div></div> */}

                {/* <InputText/>
                  <SelectDropdown title="Role"/> */}
              </DialogContent>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  disabled={isDisabled}
                >
                  {isDisabled && loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                  {selectedTimeProfile ? "Update" : "Add"}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Drawer>
      </Grid>
    </div>
  );
};

export default MemberDialog;

const useStyle = makeStyles({
  outerWrapper: {
    width: 'calc(88vw - 200px)',
    backgroundColor: colors.lightGrey,
    height: '100vh',
    ['@media (max-width:960px)']: {
      width: '100vw'
    }
  },
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  wrapper: {
    maxWidth: 800,
  },
  body: {
    maxWidth: 800,
    width: 1060,
  },
  meta: {
    marginTop: 10,
  },
  titleWrapper: {},
  headerTitle: {
    fontSize: 30,
    fontWeight: 500,
  },
  input: {
    width: 'calc(85vw - 200px)',
  },
  headerAction: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
    cursor: "pointer",
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  bulkWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
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
