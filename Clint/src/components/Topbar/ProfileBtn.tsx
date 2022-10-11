import {
  Avatar,
  Badge,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ContactPhone,
  Create,
  PermContactCalendar,
  PersonAdd,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  getMyConnectionsCount,
  getMyInvitesCount,
  openViewInvitations,
} from "redux/action/user.action";
import { RootState } from "redux/reducers";
import colors from "../../assets/colors";
import { logoutUser } from "../../redux/action/auth.action";
import assets from "assets/assets";
import "./ProfileBtn.css";

const ProfileBtn = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { connections } = useSelector((state: RootState) => state.user);
  const { invites } = useSelector((state: RootState) => state?.user);

  const image =
    "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg";

  useEffect(() => {
    dispatch(getMyInvitesCount());
  }, []);

  useEffect(() => {
    dispatch(getMyConnectionsCount());
  }, []);

  const history = useHistory();

  const handleProfileClick = () => {
    handleOutsideClick();
    history.push("/profile");
  };

  const handleConnectionClick = () => {
    handleOutsideClick();
    history.push("/connections");
  };

  const toggle = () => {
    setOpen(!open);
  };

  const handleOutsideClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="dropdown" style={{ float: "right" }}>
      <Button
        onClick={toggle}
        style={{ padding: 0 }}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <Avatar
          variant="square"
          alt="Cindy Baker"
          className={classes.small}
          src={user?.profilePic}
        ></Avatar>
      </Button>
      {open && (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div className="dropdown-content" id="dropdownContent">
            <div
              onClick={handleProfileClick}
              className={`${classes.menuItem} dropdown-menu`}
            >
              <div className={classes.menuText}>
                <Typography>
                  {user?.firstName} {user?.surName}
                </Typography>
                <Typography className={classes.subMenuText}>
                  {user?.companyName}
                </Typography>
              </div>
              <div className={classes.menuAction}>
                <img src={assets.bluePencil} className={`w-16`} />
              </div>
            </div>

            <hr className={classes.break} />

            <div
              className={`${classes.menuItem} dropdown-menu`}
              onClick={handleConnectionClick}
            >
              <div className={classes.smallMenuText}>
                <img src={assets.contactsBlack} className="w-16" />
                <Typography className={classes.smallText}>
                  My connections
                </Typography>
              </div>
              <div className={`${classes.menuAction} ongoing-badge`}>
                <Badge color="primary" badgeContent={connections}></Badge>
              </div>
            </div>

            <div
              className={`${classes.menuItem} dropdown-menu`}
              onClick={() => dispatch(openViewInvitations())}
            >
              <div className={classes.smallMenuText}>
                <img src={assets.addUser} className={`w-16`} />
                <Typography className={classes.smallText}>
                  Invitations
                </Typography>
              </div>
              <div className={`${classes.menuAction} rejected-badge`}>
                <Badge color="primary" badgeContent={invites}></Badge>
              </div>
            </div>

            <hr className={classes.break} />

            <div
              className={`${classes.menuItem} dropdown-menu`}
              onClick={handleLogout}
            >
              <div className={classes.smallMenuText}>
                <img src={assets.logout} className={"w-16"} />
                <Typography className={classes.smallText}>Logout</Typography>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default ProfileBtn;

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: 5,
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
  },
  menuText: {
    fontSize: 18,
    fontWeight: 500,
    display: "flex",
    flexDirection: "column",
  },
  smallMenuText: {
    fontSize: 18,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  menuAction: {
    paddingRight: 10,
  },
  createIcon: {
    fontSize: 16,
    color: colors.lightPurpuple,
  },
  menuIcon: {},
  subMenuText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
  smallMenuIcon: {
    fontSize: 18,
  },
  smallText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textPrimary,
    marginLeft: 5,
  },
}));
