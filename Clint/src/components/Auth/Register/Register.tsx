import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageTile from "./ImageTile";
import "./register.css";
import RegisterForm from "./RegisterForm";
import { useMediaQuery } from "react-responsive";
import assets from "assets/assets";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useEffect } from "react";
import colors from "assets/colors";

const Register = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const history = useHistory();

  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    history.push('/login')
  }

  return (
    <Grid container className={classes.register}>
      <Grid item xs={12} md={6} lg={4} className={`${classes.form} hide-scrollbar`}>
        <RegisterForm />
        <Typography className={classes.dontHave}>
          Already have an account?{" "}
          <span onClick={handleClick} className={classes.signup}>Sign in!</span>
        </Typography>
      </Grid>

      {!isTabletOrMobile && (
        <Grid item xs={12} md={6} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default Register;

const useStyles = makeStyles((theme) => {
  return {
    register: {
      display: "flex",
      ["@media (max-width:960px)"]: {
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
      overflowY: 'scroll',
      paddingBottom: 10,
      ["@media (max-width:960px)"]: {
        background: `url(${assets.visual})`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
      },
    },
    tileWrapper: {
      position: "relative",
    },
    dontHave: {
      paddingLeft: "12%",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer"
    },
    signup: {
      color: colors.textPrimary,
    },
    // formTile: {
    //     display: 'inline-block',
    //     margin: 'auto',
    //     textAlign: 'center'
    // }
  };
});
