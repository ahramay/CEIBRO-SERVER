import { Grid, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../assets/assets";
import { RootState } from "../../redux/reducers";
import NameAvatar from "../Utills/Others/NameAvatar";
import { useConfirm } from "material-ui-confirm";
import { addMemberToChat, getAllChats } from "../../redux/action/chat.action";
import { toast } from "react-toastify";
import { UserInterface } from "constants/interfaces/user.interface";
import ChatMemberSearch from "./ChatMemberSearch";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import colors from "../../assets/colors";

interface ChatMembersenb {
  enable: boolean;
}

const ChatMembers: React.FC<ChatMembersenb> = (props) => {
  const { enable } = props;
  const [show, setShow] = useState(false);
  const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
  const members = selectedChat
    ? chat.find((room: any) => String(room._id) == String(selectedChat))
      ?.members
    : [];
  const [searchText, setSearchText] = useState("");
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = (userId: any) => {
    // console.log('confirm is ', confirm
    confirm({ description: "User will be removed from this chat" }).then(() => {
      dispatch(
        addMemberToChat({
          other: {
            roomId: selectedChat,
            userId: userId,
          },
          success: () => {
            dispatch(getAllChats());
            toast.success("Chat member removed successfully");
          },
        })
      );
    });
  };

  const handleSearchChange = (e: any) => {
    setSearchText(e?.target?.value);
  };

  let myMembers = members;
  if (searchText && members) {
    myMembers = members?.filter((member: UserInterface) => {
      console.log(
        'checking searchText "',
        searchText,
        '" in ',
        member.firstName
      );
      return (
        member?.firstName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        member?.surName?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    });
  }


  const handleToggle = () => {
    enable && setShow(!show);
};


  return (
    <div className="chat-members">
        <IconButton style={{ opacity: enable ? 1 : 0.5 }} onClick={handleToggle}>
      <Grid container >
        <Grid item xs={12} className={classes.wrapper}>
          <Grid item xs={8} className={classes.iconWrapper}>
            <option>All Members</option>
            <Typography className={classes.horizontalBreak}>|</Typography>
            <select className={classes.categories}></select>
          </Grid>
          <Grid item xs={4}><Typography>Hello</Typography></Grid>
        </Grid>
    
      </Grid>
      </IconButton>

      <ChatMemberSearch value={searchText} handleChange={handleSearchChange} />
      {myMembers?.map?.((member: UserInterface) => {
        return (
          <Grid key={member.id} container className="chat-member-chip">
            <Grid item xs={2} style={{ paddingTop: 5 }}>
              <NameAvatar
                firstName={member?.firstName}
                surName={member?.surName}
                url={member?.profilePic}
                variant="small"
              />
            </Grid>
            <Grid
              item
              xs={8}
              style={{ padding: 2, display: "flex", flexDirection: "column" }}
            >
              <Typography className={`chat-member-name ${classes.memberName}`}>
                {member.firstName} {member.surName}
              </Typography>
              <Typography
                className={`${classes.memberCompany} chat-member-company`}
              >
                Company: {member.companyName}
              </Typography>
            </Grid>
            <Grid item xs={2} style={styles.trashWrapper}>
              <IconButton onClick={() => handleClick(member.id)}>
                <img
                  className="w-16"
                  src={assets.trashIcon}
                  style={styles.trashImage}
                />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default ChatMembers;

const styles = {
  trashWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trashImage: {
    cursor: "pointer",
  },
};

const useStyles = makeStyles({
  memberName: {
    fontSize: 14,
    fontWeight: 700,
  },
  memberCompany: {
    fontSize: 12,
    fontWeight: 500,
  },
  wrapper: {
    
    
  },
  iconWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 10,
    padding: 2,
    border: `0.1px solid ${colors.inputGrey}`,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    // borderLeft: "none",
    // borderRight: "none",
  },
  horizontalBreak: {
    color: colors.mediumGrey,
  },

  categories: {
    border: `0.2px solid ${colors.inputGrey}`,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderRight: "none",
    borderLeft: "none",
    borderTop: "none",
    borderBottom: "none",
    "&:focus": {
      outline: "none",
    },
  }
});
