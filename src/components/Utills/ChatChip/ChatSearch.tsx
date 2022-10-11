import { IconButton, makeStyles, Typography, Grid } from "@material-ui/core";

import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import colors from "../../../assets/colors";
import { RootState } from "../../../redux/reducers";
import { Search } from "@material-ui/icons";
import { SET_PAGINATION_BLOCK } from "../../../config/chat.config";
import { getRoomMessages } from "../../../redux/action/chat.action";
import _ from "lodash";
import DatePicker from '../../Utills/Inputs/DatePicker'

interface ChatUserMenuInt {
    enable: boolean;
}

const ChatSearch: React.FC<ChatUserMenuInt> = (props) => {
    const classes = useStyles();
    const { enable } = props;
    const [show, setShow] = useState(false);
    const { selectedChat } = useSelector((state: RootState) => state.chat);
    const [username, setUsername] = React.useState("");
    const [company, setCompany] = React.useState("");
    const dispatch = useDispatch();
    const [date, setDate] = useState<string>('')
    const handleToggle = () => {
        enable && setShow(!show);
    };



    const handleSearchChange = _.debounce((e: any) => {
        const value = e?.target?.value;
        setCompany(value);

        dispatch({
            type: SET_PAGINATION_BLOCK,
            payload: true,
        });
        dispatch(
            getRoomMessages({
                other: {
                    roomId: selectedChat,
                    copmany: value
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
        <div className="dropdown">
            {/* <MoreVert className={classes.moreIcon} onClick={handleToggle} /> */}
            <IconButton style={{ opacity: enable ? 1 : 0.5 }} onClick={handleToggle}>
                <Search />
            </IconButton>
            {show && (
                <OutsideClickHandler onOutsideClick={handleToggle}>

                    <div className={`dropdown-content ${classes.dropdownContent}`}>
                        <div>
                            <Typography className={classes.wrapper}>
                                <div className={classes.iconWrapper}>
                                    Username
                                    <Typography className={classes.horizontalBreak}>|</Typography>
                                </div>
                                <div className={classes.inputWrapper}>
                                    <input
                                        type="text"
                                        className={`emptyBorder ${classes.input}`}
                                        placeholder="Enter @username"
                                    // onChange={handleSearchChange}
                                    />
                                </div>
                                <div className={classes.categories}>
                                    .
                                </div>
                            </Typography>
                        </div>

                        <hr className={classes.break} />

                        <div>
                            <Typography
                                className={classes.wrapper}
                            >
                                <div className={classes.iconWrapper}>
                                    Company
                                    <Typography className={classes.horizontalBreak}>|</Typography>
                                </div>
                                <div className={classes.inputWrapper}>
                                    <input
                                        type="text"
                                        className={`emptyBorder ${classes.input}`}
                                        placeholder="Enter company"
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className={classes.categories}>
                                    .
                                </div>

                            </Typography>
                        </div>
                        <hr className={classes.break} />
                        <div>
                            <Typography
                                className={classes.wrapper}
                            >
                                <div className={classes.iconWrapper}>
                                    Group
                                    <Typography className={classes.horizontalBreak}>|</Typography>
                                </div>
                                <div className={classes.inputWrapper}>
                                    <input
                                        type="text"
                                        className={`emptyBorder ${classes.input}`}
                                        placeholder="Enter Group"
                                    // onChange={handleSearchChange}
                                    />
                                </div>
                                <div className={classes.categories}>
                                    .
                                </div>

                            </Typography>
                        </div>

                        <hr className={classes.break} />

                        <div>
                            <Grid item xs={12} md={3} className={classes.datePicker}>
                                <Typography>
                                    <DatePicker onChange={(e: any) => setDate(e.target.value)} />
                                </Typography>
                            </Grid>
                        </div>
                    </div>

                </OutsideClickHandler>
            )}
        </div>
    );
};

export default ChatSearch;

const useStyles = makeStyles({

    moreIcon: {
        cursor: "pointer",
    },
    dropdownContent: {
        minWidth: 815,
        display: "block",
        minHeight: 278,
    },
    menuWrapper: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "flex-start",
    },
    menuIcon: {
        fontSize: 14,
    },
    datePicker: {
        padding: 5,
    },
    menuText: {
        flex: 4,
        border: `0.2px solid ${colors.inputGrey}`,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        borderRight: "none",
        borderLeft: "none",
        paddingRight: 5,
    },
    break: {
        border: 0,
        borderTop: `1px solid ${colors.grey}`,
    },
    deleteConversation: {
        color: colors.btnRed,
    },
    deleteText: {
        color: colors.btnRed,
    },

    wrapper: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
        background: colors.white,
    },
    iconWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingLeft: 2,
        border: `0.2px solid ${colors.inputGrey}`,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        borderRight: "none",
    },
    horizontalBreak: {
        color: colors.mediumGrey,
    },
    inputWrapper: {
        flex: 4,
        border: `0.2px solid ${colors.inputGrey}`,
        cursor: "pointer",
        borderRight: "none",
        borderLeft: "none",
        paddingRight: 5,
    },

    input: {
        height: 35,
        flex: 1,
        width: "100%",
    },
    btnWrapper: {
        flex: 3,
        display: "flex",
    },
    btn: {
        flex: 1,
        background: colors.primary,
        color: colors.white,
        borderColor: colors.primary,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        cursor: "pointer",
    },
    btnText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    categories: {
        border: `0.2px solid ${colors.inputGrey}`,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        // borderRight: "none",
        borderLeft: "none",
    },
});
