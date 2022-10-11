import { Typography, Button, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import assets from 'assets/assets'
import colors from 'assets/colors'
import TextField from 'components/Utills/Inputs/TextField'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from 'redux/action/auth.action'
import { RootState } from 'redux/reducers'
import Loading from 'components/Utills/Loader/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Alert } from '@material-ui/lab'
import queryString from 'query-string'

const ResetPasswordForm = () => {
  const classes = useStyles()

  const { registerLoading } = useSelector((state: RootState) => state.auth)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>()
  const [error, setError] = useState<boolean>(false)

  const intl = useIntl()
  const dispatch = useDispatch()
  const history = useHistory()
  const isDiabled = !loading ? false : true

  const handleSubmit = (values: any, action: any) => {
    console.log('values: ', values)

    // console.log("success", success);
    const { password } = values
    const queryParams = queryString.parse(history?.location?.search)

    const payload = {
      body: { password, token: queryParams.token },
      success: (res: any) => {
        setSuccess(res)
        if (res) {
          history.push('/login')
        }
        toast.success('Password Reset Successfully')
        action?.resetForm?.()
      },
      onFailAction: (err: any) => {
        setError(true)

        setTimeout(() => {
          setError(false)
        }, 3000)
      },
      showErrorToast: false,

      finallyAction: () => {
        setLoading(false)
      },
      other: queryParams?.token,
    }
    setLoading(true)
    dispatch(resetPassword(payload))
  }

  const registerSchema = Yup.object().shape({
    // otp: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Required"),
    password: Yup.string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain at least 8 characters, one uppercase and one number'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], "Passwords don't match."),
  })

  return (
    <div className={`form-container ${classes.wrapper} hide-scrollbar`}>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>Reset Password</Typography>
      </div>

      <div className={classes.loginForm}>
        <Formik
          initialValues={{
            password: '',
            // otp: "",
            confirmPassword: '',
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              {(success || loading) && (
                <Alert severity="success">
                  {loading ? 'Verifying' : 'Password Reset Successfully'}
                </Alert>
              )}

              {error && <Alert severity="error">Invalid OTP</Alert>}

              {/* <TextField
                placeholder={"Enter OTP"}
                className={classes.inputs}
                name="otp"
                value={values.otp}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.otp && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.otp && touched.otp && errors.otp}
                </Typography>
              )} */}
              <TextField
                type="password"
                placeholder={intl.formatMessage({ id: 'input.Password' })}
                className={classes.inputs}
                name="password"
                value={values.password}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFill={false}
              />
              {errors.password && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.password && touched.password && errors.password}
                </Typography>
              )}

              <TextField
                type="password"
                placeholder={'Confirm password'}
                name="confirmPassword"
                value={values.confirmPassword}
                className={classes.inputs}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                </Typography>
              )}

              <div className={classes.actionWrapper}>
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  //   disabled={!isValid || registerLoading}
                  disabled={isDiabled}
                >
                  {/* {registerLoading ? (
                    <Loading type="spin" color="white" height={14} width={20} />
                  ) : (
                    "Reset Password"
                  )} */}
                  {isDiabled && loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                  Reset Password
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ResetPasswordForm

const useStyles = makeStyles({
  wrapper: {
    minHeight: '94%',
    overflowY: 'auto',
    marginBottom: 20,
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
    padding: '10px 13%',
    '@media (max-width:960px)': {
      padding: '10 13%',
    },
  },
  remember: {
    marginTop: 25,
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
  },
  inputs: {
    marginTop: 30,
    height: 8,
    width: '100%',
  },
  loginButton: {
    height: 40,
    width: 140,
    fontSize: 13,

    fontWeight: 500,
  },
  forget: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
  },
  logoWrapper: {
    paddingTop: '2%',
    paddingLeft: '6%',
  },
  titleWrapper: {
    paddingTop: '3%',
    paddingLeft: '12%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
  progress: {
    color: colors.primary,
    position: 'absolute',
    zIndex: 1,
    margin: 'auto',
    left: 0,
    right: 0,
    top: 10,
    textAlign: 'center',
  },
})
