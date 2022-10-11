import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageTile from "./ImageTile";
import "./login.css";
import LoginForm from "./LoginForm";

import { LoginInterface } from "../../../constants/interfaces/Login.interface";
import { useMediaQuery } from "react-responsive";
import assets from "../../../assets/assets";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { useEffect } from "react";
import colors from "../../../assets/colors";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { baseURL } from "utills/axios";
import axios from "axios";

const Login: React.FC<LoginInterface> = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);
  const [tokenLoading, setTokenLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const queryParams = queryString.parse(history?.location?.search);
    if (queryParams?.token) {
      // verifying email verification token
      setTokenLoading(true);
      axios
        .post(`${baseURL}/auth/verify-email?token=${queryParams?.token}`)
        .then((response) => {
          setSuccess(true);
          setTokenLoading(false);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        })
        .catch((err) => {
          setError(true);
          setTokenLoading(false);
          setTimeout(() => {
            setError(false);
          }, 5000);
          console.log("error is ", err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  const goToSignup = () => {
    history.push("/register");
  };
  return (
    <Grid container className={classes.login}>
      <Grid item xs={12} md={6} lg={4} className={classes.form}>
        <LoginForm
          tokenLoading={tokenLoading}
          showSuccess={success}
          showError={error}
        />
        <Typography className={classes.dontHave}>
          Don't have an account?{" "}
          <span onClick={goToSignup} className={classes.signup}>
            Sign Up!
          </span>
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

export default Login;

const useStyles = makeStyles((theme) => {
  return {
    login: {
      display: "flex",
      ["@media (max-width:960px)"]: {
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
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
      cursor: "pointer",
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
