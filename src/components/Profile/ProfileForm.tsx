import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { BiTrash } from "react-icons/bi";

import colors from "../../assets/colors";
import { useMediaQuery } from "react-responsive";
import { Formik } from "formik";
import * as Yup from "yup";
import { getMyProfile, updateMyProfile } from "redux/action/auth.action";
import { RootState } from "redux/reducers";

const ProfileForm = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user: userData } = useSelector((state: RootState) => state.auth);

  const isDiabled = !loading ? false : true;

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const handleSubmit = (values: any, action: any) => {
    // console.log("values BBB: ", values);
    setLoading(true);
    const {
      firstName,
      surName,
      workEmail,
      phone,
      password,
      email,
      companyName,
      companyPhone,
      companyVat,
      companyLocation,
      currentlyRepresenting,
    } = values;

    const payload = {
      body: {
        firstName,
        surName,
        workEmail,
        phone,
        companyPhone,
        ...(password ? { password } : {}),
        companyName,
        companyVat,
        companyLocation,
        // email,
        currentlyRepresenting,
      },
      success: () => {
        dispatch(getMyProfile());
        console.log("passwor ref is ", passRef.current);
        action?.setFieldValue("password", "");
        action?.setFieldValue("confirmPassword", "");
        // if (passRef.current) {
        //   passRef.current.value = "";
        // }
        // if (confirmPassRef.current) {
        //   confirmPassRef.current.value = "";
        // }
      },
      finallyAction: () => {
        setLoading(false);
      },
    };
    dispatch(updateMyProfile(payload));
  };

  const profileSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    surName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    // workEmail: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords don't match."
    ),
    email: Yup.string().email("Invalid email").required("Required"),
    companyName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    companyVat: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    companyLocation: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .required("Required")
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/,
        "Invalid phone"
      )
      .required("Phone is required"),
    companyPhone: Yup.string()
      .required("Required")
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/,
        "Invalid phone"
      )
      .required("Phone is required"),
    currentlyRepresenting: Yup.boolean()
      .required("Required")
      .oneOf([true, false]),
  });

  return (
    <Grid item xs={12} md={6}>
      <Grid container>
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName: userData?.firstName,
            surName: userData?.surName,
            email: userData?.email,
            workEmail: userData?.workEmail,
            password: "",
            confirmPassword: "",
            companyName: userData?.companyName,
            companyVat: userData?.companyVat,
            companyLocation: userData?.companyLocation,
            phone: userData?.phone,
            companyPhone: userData?.companyPhone,
            currentlyRepresenting: userData?.currentlyRepresenting,
          }}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              {console.log("values are", values.phone)}
              <Grid item xs={12} md={6} style={{ maxWidth: "100%" }}>
                <Grid container>
                  <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.firstName &&
                          touched.firstName &&
                          errors.firstName}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Surname"
                      variant="outlined"
                      name="surName"
                      value={values.surName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.surName && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.surName && touched.surName && errors.surName}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="email"
                      variant="outlined"
                      name="email"
                      value={values.email}
                      onChange={(e: any) => {
                        e?.preventDefault?.();
                        e.target.blur();
                      }}
                      onFocus={(e: any) => {
                        e?.preventDefault?.();
                        e.target.blur();
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.email && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.email && touched.email && errors.email}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Contact number"
                      variant="outlined"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.phone && touched.phone && errors.phone}
                      </Typography>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className={`${classes.rowWrapper} ${classes.passwordRow}`}
                  >
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // disabled={true}
                      defaultValue={2435455}
                      type="password"
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      inputRef={passRef}
                      onBlur={handleBlur}
                    />

                    {errors.password && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.password && touched.password && errors.password}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // disabled={true}
                      defaultValue={2435455}
                      type="password"
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Confirm password"
                      variant="outlined"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputRef={confirmPassRef}
                    />

                    {errors.confirmPassword && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <hr className={classes.break} />
                  </Grid>

                  <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Company"
                      variant="outlined"
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.companyName && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.companyName &&
                          touched.companyName &&
                          errors.companyName}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="VAT"
                      variant="outlined"
                      name="companyVat"
                      value={values.companyVat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.companyVat && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.companyVat &&
                          touched.companyVat &&
                          errors.companyVat}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Location"
                      variant="outlined"
                      name="companyLocation"
                      value={values.companyLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.companyLocation && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.companyLocation &&
                          touched.companyLocation &&
                          errors.companyLocation}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Contact number"
                      variant="outlined"
                      name="companyPhone"
                      value={values.companyPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.companyPhone && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.companyPhone &&
                          touched.companyPhone &&
                          errors.companyPhone}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Work email"
                      variant="outlined"
                      name="workEmail"
                      value={values.workEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.workEmail && (
                      <Typography className={`error-text ${classes.errorText}`}>
                        {errors.workEmail &&
                          touched.workEmail &&
                          errors.workEmail}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="currentlyRepresenting"
                            // defaultChecked
                            classes={{
                              root: classes.root,
                              checked: classes.checked,
                            }}
                            value={values.currentlyRepresenting}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        }
                        label="Currently representing company"
                      />
                      {errors.currentlyRepresenting && (
                        <Typography
                          className={`error-text ${classes.errorText}`}
                        >
                          {errors.currentlyRepresenting &&
                            touched.currentlyRepresenting &&
                            errors.currentlyRepresenting}
                        </Typography>
                      )}
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} className={classes.rowWrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      type="submit"
                      disabled={isDiabled}
                      // disabled={!isValid}
                    >
                      <Typography className={classes.btnText}>
                        Update
                      </Typography>
                      {isDiabled && loading && (
                        <CircularProgress
                          size={20}
                          className={classes.progress}
                        />
                      )}
                    </Button>
                    <Button
                      variant="text"
                      // type="submit"
                      className={classes.delete}
                      size="medium"
                    >
                      <BiTrash className={classes.deleteIcon} /> Delete Account
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
export default ProfileForm;

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
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    // marginLeft: "auto",
    // marginRight: "auto"
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  placehol: {
    fontWeight: 500,
    fontSize: 12,
  },
});
