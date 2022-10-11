import {
  Grid,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { RootState } from "redux/reducers";
import colors from "../../assets/colors";
import ProfileForm from "./ProfileForm";
import ProfileImagePicker from "./ProfileImagePicker";
import Requests from "./Requests";

const Dashboard = () => {
  const classes = useStyles();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Grid container>
      <ProfileImagePicker profilePic={user?.profilePic} />
      {isTabletOrMobile && <Requests />}
      <ProfileForm />
      {!isTabletOrMobile && <Requests />}
    </Grid>
  );
};

export default Dashboard;

const useStyles = makeStyles({
  rowWrapper: {
    padding: "10px 20px",
  },
  delete: {
    color: colors.btnRed,
  },
  deleteIcon: {
    fontSize: 20,
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.white}`,
  },
  imageWrapper: {},
  userImage: {
    width: "100%",
    borderRadius: 5,
  },
  imageInnerWrapper: {
    position: "relative",
  },
  imageIconWrapper: {
    position: "absolute",
    bottom: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  editPic: {
    background: colors.primary,
    color: colors.white,
    fontSize: 18,
  },
  trashPic: {
    background: colors.btnRed,
    color: colors.white,
    fontSize: 18,
  },
  passwordRow: {
    marginTop: 20,
  },
  root: {
    color: colors.darkYellow,
    "&$checked": {
      color: colors.darkYellow,
    },
  },
  checked: {},
});
