import {
  Badge,
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Textfield from "../Utills/Inputs/TextField";
import { Create, NotificationsNoneSharp } from "@material-ui/icons";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import "./topbar.css";
import appActions from "../../redux/action/app.action";
import projectActions from "../../redux/action/project.action";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
// import { RootState } from '../../redux/reducers'
import colors from "../../assets/colors";
import { Link } from "react-router-dom";
import ProfileBtn from "./ProfileBtn";
import Title from "./Title";
import { useHistory } from "react-router";
import { RootState } from "../../redux/reducers";
import assets from "assets/assets";
import TopBarSearch from "./TopBarSearch";

const Topbar = (props: any) => {
  const classes = useStyles();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  // const { navbar } = useSelector((store: RootState) => store.app)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNavbar = () => {
    dispatch(appActions.toggleNavbar());
  };

  return (
    <div className={`topbar ${classes.topNavbarWrapper}`}>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.container}
      >
        {isTabletOrMobile && (
          <Grid item xs={2} className={classes.menuIconWrapper}>
            <MenuIcon onClick={toggleNavbar} />
          </Grid>
        )}

        <Grid
          item
          xs={4}
          md={history.location.pathname.includes("chat") ? 5 : 4}
          className={classes.titleContainer}
        >
          <Title />
        </Grid>

        {!isTabletOrMobile && (
          <Grid
            item
            xs={1}
            md={history?.location.pathname.includes("chat") ? 2 : 3}
          ></Grid>
        )}

        <Grid
          xs={6}
          md={5}
          item
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {!isTabletOrMobile &&
            !window?.location?.pathname?.includes(`chat`) && (
              <TopBarSearch onChange={(e: any) => {}} />
            )}
          {!isTabletOrMobile && (
            <div className={classes.nameWrapper}>
              <Typography className={classes.username}>
                {user?.firstName}
              </Typography>
              <Typography className={classes.username}>
                {user?.surName}
              </Typography>
            </div>
          )}
          <ProfileBtn />

          {!isTabletOrMobile && (
            <Typography className={classes.notification}>
              <Badge badgeContent={4}>
                <img
                  src={assets.notification}
                  className={`${classes.bell} width-16`}
                />
              </Badge>
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Topbar;

const useStyles = makeStyles((theme) => ({
  topNavbarWrapper: {
    height: 70,
    paddingRight: 20,
    background: colors.white,
  },
  notification: {
    alignSelf: "center",
  },
  menuIconWrapper: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  },
  container: {
    height: "100%",
  },
  searchInput: {
    height: 12,
    marginRight: 30,
  },
  bell: {
    // color: colors.white,
    fontSize: 20,
  },
  titleContainer: {
    display: "flex",
    // justifyContent: 'space-evenly',
    // ['@media (max-width:960px)']: {
    justifyContent: "space-between",
    // }
  },
  nameWrapper: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
    fontSize: 14,
    fontWeight: 500,
  },
  username: {
    fontSize: 14,
    fontWeight: 500,
  },
}));
