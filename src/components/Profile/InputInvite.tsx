import { useEffect, useState } from "react";
import { makeStyles, Typography, CircularProgress } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import assets from "assets/assets";
import * as React from "react";
import colors from "assets/colors";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { sendInvitation } from "redux/action/user.action";
import { toast } from "react-toastify";
interface IAppProps {
  onError?: (err: string) => void;
}

const InputInvite: React.FunctionComponent<IAppProps> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isDiabled = !error && email && !loading ? false : true;

  let schema = yup.object().shape({
    email: yup.string().email(),
  });

  useEffect(() => {
    if (email) {
      schema
        .isValid({
          email,
        })
        .then((isValid: boolean) => {
          if (isValid) {
            setError("");
          } else {
            setError("Must be a valid email");
          }
        });
    } else {
      setError("");
    }
  }, [email]);

  useEffect(() => {
    props?.onError?.(error);
  }, [error]);

  const handleSubmit = () => {
    setLoading(true);
    dispatch(
      sendInvitation({
        body: {
          email,
        },
        success: () => {
          toast.success("Invitation sent successfully");
          setEmail("");
        },
        finallyAction: () => {
          setLoading(false);
        },
      })
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>
        <img src={assets.searchIcon} className="width-16" />
        <Typography className={classes.horizontalBreak}>|</Typography>
      </div>
      <div className={classes.inputWrapper}>
        <input
          type="text"
          className={`emptyBorder black-input ${classes.input}`}
          placeholder="Enter email or name surname"
          value={email}
          onChange={(e: any) => setEmail(e?.target.value)}
        />
      </div>
      <div className={classes.btnWrapper}>
        <button
          onClick={handleSubmit}
          disabled={isDiabled}
          className={`custom-btn ${classes.btn}`}
        >
          <Typography className={classes.btnText}>Invite</Typography>
          {isDiabled && loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputInvite;

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flex: 1,
    background: colors.white,
  },
  iconWrapper: {
    flex: 2,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 2,
    border: `1px solid ${colors.mediumGrey}`,
    borderRight: "none",
  },
  horizontalBreak: {
    color: colors.mediumGrey,
  },
  inputWrapper: {
    flex: 7,
    border: `1px solid ${colors.mediumGrey}`,
    borderRight: "none",
    borderLeft: "none",
    paddingRight: 5,
  },
  input: {
    height: 35,
    flex: 1,
    width: "100%",
  },
  btnWrapper: {
    flex: 2,
    display: "flex",
  },
  btn: {
    flex: 1,
    background: colors.primary,
    color: colors.white,
    borderColor: colors.primary,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    cursor: "pointer",
    position: "relative",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
