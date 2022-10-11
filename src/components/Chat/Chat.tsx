import { Grid, makeStyles } from "@material-ui/core";
import { SET_CHAT_SEARCH } from "config/chat.config";
import { UserInterface } from "constants/interfaces/user.interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import colors from "../../assets/colors";
import { CHAT_LIST, CHAT_MESSAGE } from "../../constants/chat.constants";
import { clearSelectedChat } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import "./chat.css";
import ChatBody from "./ChatBody";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatForm from "./ChatForm";
import ChatSidebar from "./ChatSidebar";
import MediaSidebar from "./MediaSidebar";

interface ChatProps {
  enable: boolean;
}

const Chat: React.FC<ChatProps> = (props) => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [messages, setMessage] = useState(CHAT_MESSAGE);
  const {
    selectedChat,
    sidebarOpen,
    chat: allChats,
  } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [enable, setEnable] = useState(false);

  const sendMessage = (text: string) => {
    const today = new Date();
    const nowTime = (today.getHours() % 12) + ":" + today.getMinutes() + " Pm";

    setMessage([
      ...messages,
      {
        username: "Kristo Vunukainen",
        time: nowTime,
        companyName: "Electrician",
        message: text,
        seen: false,
        myMessage: true,
        _id: "",
        type: "message",
      },
    ]);

    setTimeout(() => {
      const chatBox: any = document.getElementById("chatBox") || {
        scrollTop: 0,
        scrollHeight: 0,
      };
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 300);

    setTimeout(() => {
      setMessage((old) => [
        ...old,
        {
          username: "Kristo Vunukainen",
          time: nowTime,
          companyName: "Electrician",
          message: "I am fine . ",
          seen: false,
          myMessage: false,
          _id: "",
          type: "message",
        },
      ]);
      setTimeout(() => {
        const chatBox: any = document.getElementById("chatBox") || {
          scrollTop: 0,
          scrollHeight: 0,
        };
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 300);
    }, 6000);

    return text;
  };

  useEffect(() => {
    dispatch({
      type: SET_CHAT_SEARCH,
      payload: null,
    });
    dispatch(clearSelectedChat());
    return () => {
      dispatch(clearSelectedChat());
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const myChat = allChats?.find?.(
        (room: any) => String(room._id) == String(selectedChat)
      );
      console.log("myChat: ", myChat);
      if (myChat) {
        let members = myChat?.members || [];
        let myUserIndex = members?.findIndex?.(
          (member: UserInterface) => member.id === user?.id
        );
        setEnable(myUserIndex > -1);
      } else {
        setEnable(false);
      }
    }
  }, [selectedChat, allChats]);

  return (
    <>
      {selectedChat && enable && <MediaSidebar enable={props.enable} />}
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} md={sidebarOpen && !isTabletOrMobile ? 4 : 3}>
          <ChatSidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md={sidebarOpen && !isTabletOrMobile ? 8 : 9}
          style={{ background: "white" }}
        >
          <ChatBoxHeader enable={enable} chat={CHAT_LIST[0]} />
          <ChatBody messages={messages} />
          <ChatForm enable={enable} handleSendClick={sendMessage} />
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;

const useStyles = makeStyles({
  wrapper: {
    background: colors.white,
    position: "relative",
    height: "calc(100vh - 85px)",
  },
});
