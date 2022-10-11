import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../assets/colors";
import { GoPencil } from "react-icons/go";
import { useDispatch } from "react-redux";
import { updateProfilePic } from "redux/action/user.action";
import { toast } from "react-toastify";
import { getMyProfile } from "redux/action/auth.action";
import assets from "assets/assets";

interface ProfileImagePicker {
  profilePic: string | undefined | null;
}

const ProfileImagePicker: React.FC<ProfileImagePicker> = (props) => {
  const { profilePic } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null | undefined>();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (profilePic) {
      setUrl(profilePic);
    }
  }, [profilePic]);

  const handleClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));

      const formdata = new FormData();
      formdata.append("profilePic", e?.target?.files?.[0]);
      dispatch(
        updateProfilePic({
          body: formdata,
          success: () => {
            dispatch(getMyProfile());
            toast.success("profile pic updated");
          },
        })
      );
    }
  };

  return (
    <Grid item xs={12} md={2}>
      <input
        ref={ref}
        id="files"
        accept="image/*"
        className={classes.inputFile}
        type="file"
        onChange={handleFileChange}
      />
      <div
        onClick={handleClick}
        className={classes.outerWrapper}
        style={{ background: `url(${url})` }}
      >
        <img src={assets.whitePencil} className={`width-16 ${classes.icon}`} />
      </div>
    </Grid>
  );
};

export default ProfileImagePicker;

const useStyles = makeStyles({
  outerWrapper: {
    border: `1px solid ${colors.purpleGrey}`,
    height: 200,
    maxWidth: "100%",
    position: "relative",
    cursor: "pointer",
    backgroundSize: "cover !important",
  },
  icon: {
    position: "absolute",
    left: 0,
    bottom: 0,
    color: colors.white,
    background: colors.primary,
    padding: 2,
  },
  inputFile: {
    visibility: "hidden",
  },
});
