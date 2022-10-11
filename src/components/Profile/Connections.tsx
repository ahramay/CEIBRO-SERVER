import { Badge, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ContactPhoneOutlined } from "@material-ui/icons";
import * as React from "react";
import { useHistory } from "react-router";
import colors from "../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useState, useEffect } from "react";
import { getMyConnectionsCount } from "redux/action/user.action";
import assets from "assets/assets";

interface IConnectionsProps {}

const Connections: React.FunctionComponent<IConnectionsProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { connections } = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    dispatch(getMyConnectionsCount());
  }, []);

  const handleClick = () => {
    history.push("/connections");
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.connections}>
        <Typography className={`${classes.connectionText} ongoing-badge`}>
          <img
            src={assets.contactIcon}
            className={`${classes.icon} w-16`}
          />
          My conections
          <Badge
            color="primary"
            badgeContent={connections}
            className={classes.badge}
          ></Badge>
        </Typography>
        <Button onClick={handleClick} color="primary" variant="outlined">
          View
        </Button>
      </Grid>
    </Grid>
  );
};

export default Connections;

const useStyles = makeStyles({
  connections: {
    borderTop: `1px solid ${colors.lightGrey}`,
    background: colors.white,
    padding: "10px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  contactPhone: {
    color: colors.primary,
    paddingRight: 10,
  },
  connectionText: {
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  badge: {
    marginLeft: 20,
  },
  icon: { width: 18, height: 18, paddingRight: 10 }
});
