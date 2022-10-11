import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SelectDropdown, {
  dataInterface,
} from "../../../../Utills/Inputs/SelectDropdown";
import { Close } from "@material-ui/icons";
import colors from "../../../../../assets/colors";
import Input from "components/Utills/Inputs/Input";
import InputSwitch from "../../../../Utills/Inputs/InputSwitch";
import InputCheckbox from "components/Utills/Inputs/InputCheckbox";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  createProfileWork,
  getNewWork,
  getRoles,
  getWorkById,
  updateWork,

} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { mapRoles } from "helpers/project.helper";
import { toast } from "react-toastify";



const CreateWork = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isDisabled = !loading ? false : true;
  const {
    selectedProject,
    rolesList,
    selectedTimeProfile,
    selectedWork,
    workDrawer,
  } = useSelector((state: RootState) => state.project);
  const [name, setName] = useState("");
  const workTempale = {
    name: "",
    roles: [],
    time: false,
    timeRequired: false,
    quantity: false,
    quantityRequired: false,
    comment: false,
    commentRequired: false,
    photo: false,
    photoRequired: false,
  };
  


  const rolesData = mapRoles(rolesList);

  const [data, setData] = useState<any>(workTempale);
  const [work, setWork] = useState<any>();

  const handleChange = (name: string, value: boolean) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getRoles({ other: selectedProject }));
  }, []);

  const classes = useStyle();

  const handleClickOpen = () => {
    dispatch(projectActions.setSelectedwork(null));
    dispatch(projectActions.openWorkDrawer());
  };

  function handleClose() {
    dispatch(projectActions.closeWorkDrawer());
  }
  const handleOk = () => {
    let body = JSON.parse(JSON.stringify(data));
    body.roles = body?.roles.map((role: dataInterface) => {
      return role.value;
    });
    setLoading(true);

    dispatch(
      createProfileWork({
        other: selectedTimeProfile,
        body,
        success: () => {
          toast.success("Work created");
          handleClose();
          dispatch(getNewWork({ other: selectedTimeProfile }));
        },
        finallyAction: () => {
          setLoading(false);
        },
      })
    );
  };

  useEffect(() => {
    setData(workTempale);
  }, [workDrawer]);

  useEffect(() => {
    if (selectedWork && workDrawer) {
      const payload = {
        success: (res: any) => {
          setData(res.data);
        },
        other: selectedWork,
      };
      dispatch(getWorkById(payload));
    }
  }, [selectedWork, workDrawer]);

  const updateWorkHandle = () => {
    const myRoles = data.roles.map((role: dataInterface) => {
      console.log("role is ", role);
      return role.value;
    });
    let body = {
      name: data.name,
      roles: myRoles,
      time: data.time,
      timeRequired: data.timeRequired,
      quantity: data.quantity,
      quantityRequired: data.quantityRequired,
      comment: data.comment,
      commentRequired: data.commentRequired,
      photo: data.photo,
      photoRequired: data.photoRequired,
    };

    const payload = {
      body,
      success: () => {
        toast.success("Work Updated successfully");
        dispatch(getNewWork({ other: selectedTimeProfile }));
        dispatch(projectActions.closeWorkDrawer());
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedWork,
    };
    setLoading(true);

    dispatch(updateWork(payload));
  };

  const handleSubmit = () => {
    if (selectedWork) {
      updateWorkHandle();
    } else {
      handleOk();
    }
  };
  
  
  const handleNameChange = (e: any) => {
    setName(e.target.value);
    // dispatch(projectActions.setGroup(groupTemplate));

    // if (selectedGroup) {
    //   dispatch(
    //     projectActions.setGroup({
    //       ...group,
    //       name: e.target?.value,
    //     })
    //   );
    // }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        onClick={handleClickOpen}
        disabled={!selectedTimeProfile}
      >
        Add new work
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Dialog
            open={workDrawer}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="customized-dialog-title" className="customized-title">
              <Typography className={classes.headerTitle}>Add work</Typography>
              <div className={classes.headerAction} onClick={handleClose}>
                <Close />
              </div>
            </DialogTitle>
            <DialogContent>
              <Grid container className={classes.body}>
            
                <DialogContent>
                  <div className={classes.dropdownWrapper}>
                    <Input
                      value={name}
                      title="Location"
                      placeholder="Enter location name"
                      onChange={handleNameChange}
                    />
                    <br />
                  </div>
                </DialogContent>


{/* 
                <Grid item xs={12} className={classes.rolesWrapper}>
                  <InputSwitch
                    value={data.time}
                    onChange={(e: any) => handleChange("time", e.target?.checked)}
                    label="Add time"
                  />
                  {data.time && (
                    <div>
                      <InputCheckbox
                        label={"Obligatory field"}
                        checked={data.timeRequired}
                        onChange={(checked: boolean) =>
                          handleChange("timeRequired", checked)
                        }
                      />
                    </div>
                  )}
                </Grid> */}

                {/* <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch
                value={data.quantity}
                onChange={(e: any) =>
                  handleChange("quantity", e.target?.checked)
                }
                label="Quantity"
              />

              {data.quantity && (
                <div>
                  <InputCheckbox
                    label={"Obligatory field"}
                    checked={data.quantityRequired}
                    onChange={(checked: boolean) =>
                      handleChange("quantityRequired", checked)
                    }
                  />
                </div>
              )}
            </Grid> */}

                {/* <Grid item xs={12} className={classes.rolesWrapper}>
                  <InputSwitch
                    value={data.comment}
                    onChange={(e: any) =>
                      handleChange("comment", e.target?.checked)
                    }
                    label="Comment"
                  />

                  {data.comment && (
                    <div>
                      <InputCheckbox
                        label={"Obligatory field"}
                        checked={data.commentRequired}
                        onChange={(checked: boolean) =>
                          handleChange("commentRequired", checked)
                        }
                      />
                    </div>
                  )}
                </Grid> */}

                {/* <Grid item xs={12} className={classes.rolesWrapper}>
                  <InputSwitch
                    value={data.photo}
                    onChange={(e: any) => handleChange("photo", e.target?.checked)}
                    label="Photo"
                  />
                  {data.photo && (
                    <div>
                      <InputCheckbox
                        label={"Obligatory field"}
                        checked={data.photoRequired}
                        onChange={(checked: boolean) =>
                          handleChange("photoRequired", checked)
                        }
                      />
                    </div>
                  )}
                </Grid> */}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                disabled={isDisabled}
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                {isDisabled && loading && (
                  <CircularProgress size={20} className={classes.progress} />
                )}
                {selectedWork ? "Update" : "Add"}
                {/* Add */}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateWork;

const useStyle = makeStyles({
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  body: {
    maxWidth: 800,
  },
  meta: {
    marginTop: 10,
  },
  titleWrapper: {},
  headerTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  dropdownWrapper: {
    maxWidth: 370,
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
  rolesWrapper: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
