import { Badge, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ContactPhone } from "@material-ui/icons";
import colors from "../../assets/colors";
import InputInvite from "../Profile/InputInvite";
import { MdInsertInvitation } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import assets from "../../assets/assets";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  getMyConnectionsCount,
  getMyInvitesCount,
  openViewInvitations,
} from "redux/action/user.action";
import ViewInvitations from "components/Profile/ViewInvitations";

const SmartMenuBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const dispatch = useDispatch();
  const { connections } = useSelector((state: RootState) => state?.user);
  const { invites } = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    dispatch(getMyConnectionsCount());
  }, []);

  useEffect(() => {
    dispatch(getMyInvitesCount());
  }, []);

  const goToConnections = () => {
    history.push("/connections");
  };

  return (
    <Grid container>
      <Grid item xs={12} md={5} lg={4}>
        <div className={`${classes.connectionWrapper} ongoing-badge`}>
          <Typography className={classes.connectionTitle}>
            <img src={assets.contactIcon} className={classes.connectionIcon} />
            <span className="align-center">
              <span
                className={`${classes.marginLeft} ${classes.myConnections}`}
              >
                My connections
              </span>
              <Badge badgeContent={connections} color="primary"></Badge>
            </span>
          </Typography>

          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={goToConnections}
            className={classes.viewBtn}
          >
            View
          </Button>
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        lg={3}
        className={classes.invitationOuterWrapper}
      >
        <div className={`${classes.connectionWrapper} ongoing-badge`}>
          <Typography className={classes.connectionTitle}>
            {isTabletOrMobile && (
              <MdInsertInvitation className={classes.inviteIcon} />
            )}
            <span className="align-center">
              <span
                className={`${classes.marginLeft} ${classes.invitationText}`}
              >
                Invitations
              </span>
              <Badge badgeContent={invites} color="error"></Badge>
            </span>
          </Typography>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            className={classes.viewBtn}
            onClick={() => dispatch(openViewInvitations())}
          >
            View
          </Button>
          <ViewInvitations hideBtn={true} />
        </div>
      </Grid>

      <Grid item xs={12} md={3} lg={5}>
        <div className={classes.searchWrapper}>
          <InputInvite />
        </div>
      </Grid>
    </Grid>
  );
};

export default SmartMenuBar;

const useStyles = makeStyles({
  connectionWrapper: {
    background: colors.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 15px",
    height: 60,
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
      padding: "10px 10px",
    },
  },
  marginLeft: {
    paddingRight: 20,
  },
  myConnections: {
    fontSize: 14,
    fontWeight: 500,
  },
  invitationText: {
    fontSize: 14,
    fontWeight: 500,
  },
  connectionTitle: {
    fontSize: 14,
    color: colors.black,
    display: "flex",
    alignItems: "center",
  },
  connectionIcon: {
    width: 18,
    color: colors.primary,
    paddingRight: 10,
  },
  inviteIcon: {
    fontSize: 18,
    color: colors.primary,
    paddingRight: 10,
  },
  invitationOuterWrapper: {
    paddingLeft: 10,
    ["@media (max-width:960px)"]: {
      // marginLeft: 0,
      padding: 0,
    },
  },
  searchInput: {
    height: 10,
    width: "100%",
  },
  searchWrapper: {
    padding: "0px 15px",
    height: 60,
    background: colors.white,
    display: "flex",
    alignItems: "center",
  },
  viewBtn: {
    padding: 10,
    fontSize: 12,
    fontWeight: "bold",
    borderWidth: "1.5px",
  },
});
