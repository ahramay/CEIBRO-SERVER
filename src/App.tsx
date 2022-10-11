// ssh -i "ceibro_new_key.pem" ubuntu@ec2-16-171-45-183.eu-north-1.compute.amazonaws.com

import "fontsource-roboto";
import "moment-timezone";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import "./App.css";
import { sounds } from "./assets/assets";
import CreateQuestioniarDrawer from "./components/Chat/Questioniar/CreateQuestioniar";
import ViewQuestioniarDrawer from "./components/Chat/Questioniar/ViewQuestioniar";
import CreateProjectDrawer from "./components/Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer";
import CreateTaskDrawer from "./components/Tasks/Create-Task/CreateTaskDrawer";
import "./components/Topbar/ProfileBtn.css";
import {
  PUSH_MESSAGE, RECEIVE_MESSAGE, REFRESH_CHAT
} from "./config/chat.config";
import RouterConfig from "./navigation/RouterConfig";
import {
  getAllChats,
  setMessagesRead
} from "./redux/action/chat.action";
import { RootState } from "./redux/reducers";
import { SERVER_URL } from "./utills/axios";

export const SocketContext = createContext(null);
interface MyApp {}

const App: React.FC<MyApp> = () => {
  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
  const { selectedChat, type } = useSelector((store: RootState) => store.chat);
  const [socket, setSocket] = useState<any>(null);
  const dispatch = useDispatch();
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );
  const SERVER = SERVER_URL;
  const audio = new Audio(sounds.message);

  const playChatSound = (data: any) => {
    if (!data?.mutedFor?.includes(user.id)) {
      // audio.play();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const tokens = localStorage.getItem("tokens") || "{}";
      const myToken = JSON.parse(tokens)?.access?.token;
      const mySocket = io(SERVER, {
        query: {
          token: myToken,
        },
      });
      setSocket(mySocket);
      mySocket.on(RECEIVE_MESSAGE, (data) => {
        if (String(data.from) !== String(user?.id)) {
          if (String(data.chat) == String(selectedChat)) {
            dispatch({
              type: PUSH_MESSAGE,
              payload: data.message,
            });
            dispatch(setMessagesRead({ other: selectedChat }));
            playChatSound(data);
          } else {
            dispatch(getAllChats());
            playChatSound(data);
          }
        }
      });
      mySocket.on(REFRESH_CHAT, () => {
        dispatch(getAllChats());
      });

      return () => {
        mySocket.off(RECEIVE_MESSAGE);
        mySocket.off(REFRESH_CHAT);
      };
    }
  }, [isLoggedIn, selectedChat, user]);

  return (
    <div className="App">
      {/* <PermissionState> */}
      <CreateQuestioniarDrawer />
      {drawerOpen && <ViewQuestioniarDrawer />}
      <CreateProjectDrawer />
      <ToastContainer position="bottom-left" theme="colored" />
      <CreateTaskDrawer />
      <SocketContext.Provider value={socket}>
        <RouterConfig />
      </SocketContext.Provider>
      {/* </PermissionState> */}
    </div>
  );
};

export default App;
