import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import colors from "assets/colors";
import Input from "components/Utills/Inputs/Input";
import HorizontalBreak from "components/Utills/Others/HorizontalBreak";
import { groupTemplate } from "constants/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  createGroup,
  getGroup,
  getGroupById,
  updateGroup,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";

interface AddGroupProps {}

const AddGroup: React.FC<AddGroupProps> = () => {
  const classes = useStyles();
  // const roles = ["create", "edit", "delete", "self-made"];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isTimeProfile, setIsTimeProfile] = useState(false);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { groupDrawer, group, selectedGroup, selectedProject } = useSelector(
    (state: RootState) => state.project
  );
  console.log("group", group?.name);

  const isDiabled = !loading ? false : true;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(projectActions.closeProjectGroup());
  };

  const handleOk = () => {
    const payload = {
      body: { name },
      success: () => {
        toast.success("Group created successfully");
        dispatch(projectActions.closeProjectGroup());
        dispatch(getGroup({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(createGroup(payload));
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
  useEffect(() => {
    if (selectedGroup && groupDrawer) {
      dispatch(
        getGroupById({
          other: selectedGroup,
          success: (res) => {
            // console.log("res group", res.data.name);
            setName(res.data.name);
          },
        })
      );
    }
  }, [groupDrawer, selectedGroup]);

  const handleUpdate = () => {
    const payload = {
      body: { name },
      success: () => {
        toast.success("Group Updated successfully");
        dispatch(projectActions.closeProjectGroup());
        dispatch(getGroup({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedGroup,
    };
    setLoading(true);

    dispatch(updateGroup(payload));
  };

  const handleSubmit = () => {
    if (selectedGroup) {
      handleUpdate();
    } else {
      handleOk();
    }
  };

  useEffect(() => {
    setName("");
  }, [groupDrawer]);

  return (
    <Dialog open={groupDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input
            value={name}
            title="Group"
            placeholder="Enter group name"
            onChange={handleNameChange}
          />
          <br />
          <HorizontalBreak color={colors.grey} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.cancel}
          onClick={handleClose}
          color="secondary"
          autoFocus
        >
          Cancel
        </Button>
        <Button
          className={classes.ok}
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={isDiabled}
        >
          {selectedGroup ? "Update" : "Ok"}

          {isDiabled && loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroup;

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
    height: 300,
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
  cancel: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.textGrey,
  },
  ok: {
    fontSize: 12,
    fontWeight: 700,
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
