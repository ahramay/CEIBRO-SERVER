import { makeStyles, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import * as React from "react";
import colors from "../../assets/colors";
// @ts-ignore
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getRoomMessages } from "../../redux/action/chat.action";
import { SET_PAGINATION_BLOCK } from "../../config/chat.config";
import assets from "assets/assets";

interface IAppProps {}

const MessageSearch: React.FunctionComponent<IAppProps> = (props) => {
  const classes = useStyles();
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();

  const handleSearchChange = _.debounce((e: any) => {
    const value = e?.target?.value;
    setSearch(value);
    dispatch({
      type: SET_PAGINATION_BLOCK,
      payload: true,
    });
    dispatch(
      getRoomMessages({
        other: {
          roomId: selectedChat,
          search: value,
        },
        success: () => {
          setTimeout(() => {
            dispatch({
              type: SET_PAGINATION_BLOCK,
              payload: false,
            });
          }, 1000);
        },
      })
    );
  }, 300);

  return (
    <div className={classes.wrapper}>
      <div className={classes.btnWrapper}>
        <Search />
      </div>
    </div>
  );
};

export default MessageSearch;

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    background: colors.white,
  },

  horizontalBreak: {
    
  },

  btnWrapper: {
    display: "flex",
    color: colors.primary,
  },
 
 
});
