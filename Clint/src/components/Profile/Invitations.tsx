import { Badge, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import * as React from "react";
import colors from "../../assets/colors";
import InputInvite from "./InputInvite";
import ViewInvitations from "./ViewInvitations";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { getMyInvitesCount } from "redux/action/user.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
interface InvitationsProps {}

const Invitations: React.FunctionComponent<InvitationsProps> = (props) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { invites } = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    dispatch(getMyInvitesCount());
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.inviteWrapper}>
        <InputInvite onError={(err: string) => setError(err)} />
        {error && (
          <Typography style={{ paddingTop: 10 }} className={"error-text"}>
            {error}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} className={classes.viewInvitation}>
        <Typography className={classes.invitationText}>
          Invitations
          <Badge badgeContent={invites} className={classes.badge}></Badge>
        </Typography>
        <ViewInvitations />
      </Grid>
    </Grid>
  );
};

export default Invitations;

const useStyles = makeStyles({
  inviteWrapper: {
    background: colors.white,
    padding: "20px 15px",
    borderRadius: 5,
  },
  viewInvitation: {
    borderTop: `1px solid ${colors.lightGrey}`,
    background: colors.white,
    padding: "10px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invitationText: {
    fontSize: 14,
    fontWeight: 500,
  },
  badge: {
    marginLeft: 20,
    color: colors.white,
  },
});
