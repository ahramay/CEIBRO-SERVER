import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import SelectDropdown from "../Inputs/SelectDropdown";
import { dbUsers } from "../../Topbar/CreateChat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import {
  addMemberToChat,
  setMembersDialog,
} from "../../../redux/action/chat.action";
import { toast } from "react-toastify";
import { getAllChats } from "../../../redux/action/chat.action";
import { getAvailableChatUsers } from "redux/action/user.action";
import { mapUsers } from "helpers/user.helper";

interface AddChatMemberProps {}

const AddChatMember: React.FC<AddChatMemberProps> = () => {
  const classes = useStyles();
  const { membersDialog, selectedChat, chat } = useSelector(
    (state: RootState) => state.chat
  );
  const chatMembers =
    chat?.find((room: any) => room._id === selectedChat)?.members || [];
  const memberIds = chatMembers?.map((member: any) => member.id);
  const [availableUsers, setAvailableUsers] = useState<any>([]);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<any>();

  useEffect(() => {
    if (selectedChat && membersDialog) {
      const payload = {
        other: selectedChat,
        success: (res: any) => {
          const myUsers = mapUsers(res.data);
          setAvailableUsers(myUsers);
        },
      };
      dispatch(getAvailableChatUsers(payload));
    }
  }, [membersDialog]);

  const handleOk = () => {
    dispatch(
      addMemberToChat({
        other: {
          roomId: selectedChat,
          userId: selectedUser?.value,
        },
        success: () => {
          dispatch(getAllChats());
          toast.success("New member added successfully");
          setSelectedUser(null);
        },
      })
    );
    handleClose();
  };

  const handleClose = () => {
    dispatch(setMembersDialog(false));
  };

  return (
    <Dialog open={membersDialog} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Select a user"}</DialogTitle>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <SelectDropdown
            title="User"
            placeholder="Please select a user"
            data={availableUsers}
            value={selectedUser}
            handleChange={(e: any) => setSelectedUser(e)}
            noOptionMessage="No user available"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={!selectedUser} onClick={handleOk} color="primary">
          Ok
        </Button>
        <Button onClick={handleClose} color="secondary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChatMember;

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
    maxWidth: 300,
    width: 300,
    height: 300,
  },
});
