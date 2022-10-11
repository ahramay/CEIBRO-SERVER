import {
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import TextField from "../../Utills/Inputs/TextField";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../../redux/action/auth.action";
import { RootState } from "../../../redux/reducers";
import Loading from "../../Utills/Loader/Loading";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";

interface ForgetPasswordForm {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

const ForgetPasswordForm: React.FC<ForgetPasswordForm> = (props) => {
  const classes = useStyles();
  const { tokenLoading, showSuccess, showError } = props;

  const { loginLoading, authErrorMessage, authSuccessMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const history = useHistory();
  const [checked, setChecked] = useState(true);
  const intl = useIntl();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;

  const handleSubmit = () => {
    const payload = {
      body: { email },
      success: (res: any) => {
        toast.success('Please check your email')
        setEmail("");
      },
      finallyAction: () => {
        setLoading(false);
      },
    };
    setLoading(true);
    dispatch(forgetPassword(payload));
  };

  return (
    <div className={`form-container ${classes.wrapper}`}>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>Email</Typography>
      </div>

      <div className={classes.loginForm}>
        {(showSuccess || tokenLoading) && (
          <Alert severity="success">
            {tokenLoading
              ? "Verifying otp"
              : "Email verified successfully. Please sign in!"}
          </Alert>
        )}

        {showError && <Alert severity="error">Link expired</Alert>}

        <TextField
          placeholder={intl.formatMessage({ id: "input.Email" })}
          className={classes.inputs}
          inputProps={{
            style: { height: 12 },
          }}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <div className={classes.actionWrapper}>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            // disabled={loginLoading}
            disabled={isDiabled}
            onClick={handleSubmit}
          >
            {/* {loginLoading ? (
              <Loading type="spin" color="white" height={14} width={14} />
            ) : (
              intl.formatMessage({ id: "input.send" })
            )} */}
            {isDiabled && loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
            {/* Send */}
            {intl.formatMessage({ id: "input.send" })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;

const useStyles = makeStyles({
  wrapper: {
    height: "94%",
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: "Inter",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    padding: "10px 13%",
    ["@media (max-width:960px)"]: {
      padding: "10 13%",
    },
  },
  remember: {
    marginTop: "35px !important",
    fontSize: 14,
    padding: 0,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: 500,
  },
  inputs: {
    marginTop: 40,
    height: 5,
  },
  loginButton: {
    height: 32,
    width: 21,
    fontSize: 14,
  },
  forget: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
  },
  logoWrapper: {
    paddingTop: "2%",
    paddingLeft: "6%",
  },
  titleWrapper: {
    paddingTop: "10%",
    paddingLeft: "12%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
