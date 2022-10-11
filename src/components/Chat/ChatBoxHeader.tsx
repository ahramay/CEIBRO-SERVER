import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Cancel, Check, Clear, Create, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../assets/colors";
import { ChatListInterface } from "../../constants/interfaces/chat.interface";
import { RootState } from "../../redux/reducers";
import ChatUserMenu from "../Utills/ChatChip/ChatUserMenu";
import ChatSearch from "./../Utills/ChatChip/ChatSearch";
import AddChatMember from "../Utills/ChatChip/AddChatMember";
import { ClipLoader } from "react-spinners";
import TextField from "components/Utills/Inputs/TextField";
import { FormEvent, HTMLInputTypeAttribute, useState } from "react";
import { editRoomName } from "redux/action/chat.action";
import { requestSuccess } from "utills/status";
import { GET_CHAT } from "config/chat.config";
interface ChatBoxHeaderProps {
  chat?: ChatListInterface;
  enable: boolean;
}

const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    upScrollLoading,
    chat: allChats,
    selectedChat,
  } = useSelector((store: RootState) => store.chat);
  const myChat = allChats?.find?.(
    (room: any) => String(room._id) == String(selectedChat)
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e?.target?.value);
  };

  const handleUpdate = () => {
    setLoading(true);
    dispatch(
      editRoomName({
        body: { name },
        success: () => {
          setEdit(false);
          let allRooms = JSON.parse(JSON.stringify(allChats));
          const index = allRooms?.findIndex?.(
            (room: any) => String(room._id) == String(selectedChat)
          );
          if (index > -1) {
            allRooms[index].name = name;
            dispatch({
              type: requestSuccess(GET_CHAT),
              payload: allRooms,
            });
          }
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: myChat?._id,
      })
    );
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <Grid container className={classes.wrapper}>
      <AddChatMember />
      {upScrollLoading && (
        <div className={classes.loadingWrapper}>
          <div className={classes.innerLoading}>
            <ClipLoader size={20} color={colors.primary} />
          </div>
        </div>
      )}
      {myChat && (
        <>
          <Grid item xs={3} md={1} className={classes.editWrapper}>
            {!edit && (
              <Create
                onClick={() => {
                  setEdit(true);
                  setName(myChat.name);
                }}
                className={classes.editIcon}
              />
            )}
          </Grid>
          <Grid item xs={9} md={4} className={classes.usernameWrapper}>
            {edit ? (
              <div className={`${classes.editInputWrapper} editInputWrapper`}>
                <TextField
                  inputProps={{ maxLength: 20 }}
                  value={name}
                  onChange={handleNameChange}
                />
                <IconButton size="small" onClick={handleCancel}>
                  <Clear className={classes.cancelIcon} />
                </IconButton>
                {loading ? (
                  <div className={classes.loading}>
                    <CircularProgress disableShrink={false} size={15} />
                  </div>
                ) : (
                  <IconButton size="small" onClick={handleUpdate}>
                    <Check className={classes.checkIcon} />
                  </IconButton>
                )}
              </div>
            ) : (
              <>
                <Typography className={classes.username}>
                  {myChat?.name}
                </Typography>
                {myChat?.project && (
                  <Typography className={classes.projectName}>
                    Project:{" "}
                    <span className={classes.projectTitle}>
                      {" "}
                      {myChat?.project?.title}{" "}
                    </span>
                  </Typography>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={6} className={classes.moreWrapper}>
            <ChatSearch enable={props.enable} />
          </Grid>
          <Grid item xs={1} className={classes.moreWrapper}>
            <ChatUserMenu enable={props.enable} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ChatBoxHeader;

const useStyles = makeStyles({
  wrapper: {
    borderBottom: `1px solid ${colors.grey}`,
    height: 40,
    ["@media (max-width:960px)"]: {
      height: 60,
    },
  },
  editIcon: {
    cursor: "pointer",
    color: colors.textPrimary,
    fontSize: 14,
    borderRadius: 5,
    border: `0.5px solid ${colors.lightGrey}`,
    padding: 6,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
  },
  editWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editInputWrapper: {
    marginTop: "auto",
    marginBottom: "auto",
    display: "flex",
  },
  cancelIcon: {
    fontSize: 18,
    color: colors.btnRed,
    cursor: "pointer",
  },
  checkIcon: {
    fontSize: 18,
    color: colors.green,
    cursor: "pointer",
  },
  usernameWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ["@media (max-width:960px)"]: {
      justifyContent: "center",
    },
  },
  loading: { display: "flex", alignItems: "center" },
  avatarWrapper: {
    paddingLeft: 20,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  moreWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ["@media (max-width:960px)"]: {
      display: "none",
    },
  },
  projectName: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 10,
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 10,
    color: colors.textPrimary,
  },
  loadingWrapper: {
    position: "absolute",
    left: "55%",
    top: "10%",
    zIndex: 3,
  },
  innerLoading: {
    padding: 5,
    background: "white",
    display: "flex",
    borderRadius: "50%",
    boxShadow: "0px 1px 17px #cac6c6",
  },
});
