import * as React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../../assets/assets";
import { RootState } from "../../../redux/reducers";
import NameAvatar from "../Others/NameAvatar";
import { useConfirm } from "material-ui-confirm";
import { addMemberToChat, getAllChats } from "../../../redux/action/chat.action";
import { toast } from "react-toastify";
import { UserInterface } from "constants/interfaces/user.interface";
import ChatMemberSearch from "../../Chat/ChatMemberSearch";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import colors from "../../../assets/colors";
import OutsideClickHandler from "react-outside-click-handler";
import { SET_CHAT_SIDE_BAR } from "../../../config/chat.config";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import ChatMemberSub from './ChatMemberSub';

interface ChatMembersenb {
  enable: boolean;
}




const ChatMembers: React.FC<ChatMembersenb> = (props) => {
  const { enable } = props;
  const [show, setShow] = useState(false);
  const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
  const [personName, setPersonName] = React.useState<string[]>([]);
  const members = selectedChat
    ? chat.find((room: any) => String(room._id) == String(selectedChat))
      ?.members
    : [];
  const [searchText, setSearchText] = useState("");
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    sidebarOpen,
  } = useSelector((state: RootState) => state.chat);
  const [openIndex, setOpenIndex] = useState<number>(0);

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


  const getStyles = () => {
    return {
      width: sidebarOpen ? 240 : 50,
      background: colors.lightGrey,
    };
  };

  const handleClickSide = (index: number) => {
    if (!sidebarOpen) {
      dispatch({
        type: SET_CHAT_SIDE_BAR,
        payload: true,
      });
    }
    setOpenIndex((openIndex) => (index === openIndex ? 0 : index));
  };

  const handleOutsideClick = () => {
    if (sidebarOpen) {
      setOpenIndex(0);
      dispatch({
        type: SET_CHAT_SIDE_BAR,
        payload: false,
      });
    }
  };

  console.log("clicked", sidebarOpen)


  return (
    <div className="chat-members">
      <div className={classes.wrappe}>
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <button className="accordion" onClick={() => handleClickSide(1)}>
            <Grid item xs={12} className={classes.wrapper}>
              <Grid item xs={8} className={`accordion-title ${classes.iconWrapper} ${
                  openIndex === 1 ? "active" : ""
                }`}  >
                <Typography>All Members</Typography>
                <Typography className={classes.horizontalBreak}>|</Typography>
                {sidebarOpen && <KeyboardArrowDown />}
              </Grid>
            </Grid>
          </button>
          {openIndex === 1 && <ChatMemberSub enable={props.enable} />}
        </OutsideClickHandler>
      </div>
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
  moreIcon: {
    cursor: "pointer",
  },
  wrappe: {

  },
  mediaSidebarWrapper: {
    position: "absolute",
    right: 18,
    zIndex: 10,
    background: "white",
    height: "calc(10vh - 15px)",
    display: "flex",
    flexDirection: "column",
  },
  dropdownContent: {
    minWidth: 815,
    display: "block",
    minHeight: 278,
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
