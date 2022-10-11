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
import { loginRequest, otpVerify } from "../../../redux/action/auth.action";
import { RootState } from "../../../redux/reducers";
import Loading from "../../Utills/Loader/Loading";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";

interface VerifyEmailForm {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

const VerifyEmailForm: React.FC<VerifyEmailForm> = (props) => {
  const classes = useStyles();
  const { tokenLoading, showSuccess, showError } = props;

  const { loginLoading, authErrorMessage, authSuccessMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const history = useHistory();
  const [checked, setChecked] = useState(true);
  const intl = useIntl();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);

  console.log("otp", otp);
  const isDiabled = !loading ? false : true;

  const handleSubmit = () => {
    setError(false);

    const payload = {
      other: otp,
      success: (res: any) => {
        setSuccess(res);
        setOtp("");
        toast.success("OTP Verified");
        history.push("/login");
      },
      onFailAction: (err: any) => {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 3000);
      },
      showErrorToast: false,

      finallyAction: () => {
        setLoading(false);
      },
    };
    setLoading(true);
    dispatch(otpVerify(payload));
  };

  return (
    <div className={`form-container ${classes.wrapper}`}>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>OTP</Typography>
      </div>

      <div className={classes.loginForm}>
        {(success || loading) && (
          <Alert icon={!loading} severity="success">
            {loading ? "Verifying OTP..." : "Register User Successfully"}
          </Alert>
        )}

        {error && <Alert severity="error">Invalid OTP</Alert>}

        {showError && <Alert severity="error">Link expired</Alert>}

        <TextField
          placeholder={intl.formatMessage({ id: "input.otp" })}
          className={classes.inputs}
          inputProps={{
            style: { height: 12 },
          }}
          onChange={(e: any) => setOtp(e.target.value)}
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
              intl.formatMessage({ id: "input.verify" })
            )} */}

            {isDiabled && loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
            {intl.formatMessage({ id: "input.verify" })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;

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
