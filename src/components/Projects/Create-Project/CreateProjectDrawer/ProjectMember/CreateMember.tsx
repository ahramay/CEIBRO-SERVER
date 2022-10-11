import { CircularProgress, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import colors from "assets/colors";
import { avaialablePermissions } from "config/project.config";
import { checkMemberPermission, mapGroups } from "helpers/project.helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  createMember,
  getAvailableProjectMembers,
  getGroup,
  getMember,
  getRoles,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import CreateableSelectDropdown from "../../../../Utills/Inputs/CreateAbleSelect";
import SelectDropdown, {
  dataInterface,
} from "../../../../Utills/Inputs/SelectDropdown";

const MemberDialog = () => {
  const {
    documentDrawer,
    groupList,
    rolesList,
    selectedProject,
    userPermissions,
    memberDrawer,
  } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [groups, setGroups] = useState();
  const [roles, setRoles] = useState();
  const [selectGroups, setSelectGroups] = useState<any>();
  const [selectRoles, setSelectRoles] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableUsers, setAvailableUsers] = useState<dataInterface[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<dataInterface | null>(
    null
  );

  const classes = useStyle();
  const isDiabled = !loading ? false : true;

  const handleClickOpen = () => {
    // setOpen(true);
    dispatch(projectActions.openProjectMemberDrawer());
  };
  console.log("mem permisssion", userPermissions);
  const handleClose = () => {
    setOpen(false);
    dispatch(projectActions.closeProjectMemberDrawer());
  };

  useEffect(() => {
    dispatch(getGroup({ other: selectedProject }));
    dispatch(getRoles({ other: selectedProject }));
    dispatch(
      getAvailableProjectMembers({
        other: selectedProject,
        success: (res) => {
          setAvailableUsers(res.data);
        },
      })
    );
  }, []);

  useEffect(() => {
    if (groupList) {
      const newGroups = mapGroups(groupList);
      setGroups(newGroups);
    }
  }, [groupList]);

  useEffect(() => {
    if (rolesList) {
      const newRoles = mapGroups(rolesList);
      setRoles(newRoles);
    }
  }, [rolesList]);

  const havePermission = checkMemberPermission(
    userPermissions,
    avaialablePermissions.create_permission
  );

  const handleOk = () => {
    const payload = {
      body: {
        email: selectedEmail?.value,
        roleId: selectRoles?.value,
        groupId: selectGroups?.value,
        // subContractor: selectGroups?.value,
      },
      success: () => {
        toast.success("Member created successfully");
        dispatch(getMember({ other: { projectId: selectedProject } }));
        handleClose();
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);

    dispatch(createMember(payload));
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        disabled={havePermission ? false : true}
        onClick={handleClickOpen}
      >
        Add a member
      </Button>
      <Dialog
        open={memberDrawer}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className={classes.body}>
            <div>
              <CreateableSelectDropdown
                title="Role"
                data={availableUsers}
                value={selectedEmail}
                handleChange={(e: any) => setSelectedEmail(e)}
                zIndex={11}
                noOptionMessage={"No user available"}
              />
              {/* <InputText
                placeholder="Search or/and add email"
                onChange={handleNameChange}
              /> */}
            </div>
            <div className={classes.meta} style={{ zIndex: 1000 }}>
              <SelectDropdown
                title="Role"
                data={roles}
                handleChange={(e: any) => setSelectRoles(e)}
                zIndex={10}
                noOptionMessage="No role available"
              />
            </div>
            <div className={classes.meta}>
              <SelectDropdown
                title="Group"
                data={groups}
                noOptionMessage="No group available"
                handleChange={(e: any) => setSelectGroups(e)}
                zIndex={8}
              />
            </div>

            {/* <Typography variant="h5" className={classes.subContractor}>
              Subcontractor Company
            </Typography>
            <div className={classes.meta}>
              <SelectDropdown
                title="Name"
                data={groups}
                handleChange={(e: any) => setSelectGroups(e)}
                zIndex={5}
              />
            </div> */}
          </div>
          {/* <InputText/>
          <SelectDropdown title="Role"/> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleOk}
            color="primary"
            variant="contained"
            disabled={isDiabled}
          >
            Add
            {isDiabled && loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberDialog;

const useStyle = makeStyles({
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  body: {
    width: 360,
    minHeight: 300,
  },
  meta: {
    marginTop: 10,
  },
  subContractor: {
    fontSize: 14,
    fontWeight: 700,
    paddingTop: 10,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    // marginTop: "50px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
