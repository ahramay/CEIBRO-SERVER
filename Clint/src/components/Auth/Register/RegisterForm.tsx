import { Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import { useState } from 'react'
// import { useHistory } from 'react-router'
import assets from 'assets/assets'
import colors from 'assets/colors'
import TextField from 'components/Utills/Inputs/TextField'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { registerRequest } from 'redux/action/auth.action'
import { RootState } from 'redux/reducers'
import Loading from 'components/Utills/Loader/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup'

const RegisterForm = () => {
  const classes = useStyles()

  const { registerLoading } = useSelector((state: RootState) => state.auth)

  const intl = useIntl()
  const dispatch = useDispatch()
 
  const handleSubmit = (values: any, action: any) => {
    console.log('values: ', values)

    const { firstName, surName, userName, email, password } = values
    const payload = {
      body: {
        firstName,
        surName,
        username: userName,
        email,
        password,
      },
      success: (res: any) => {
        if (res) {
          // history.push('/verify-email')
        }
        action?.resetForm?.();
      },
    }
    dispatch(registerRequest(payload))
  }

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    surName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    userName: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
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
        <Typography className={classes.title}>Register</Typography>
      </div>

      <div className={classes.loginForm}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            surName: '',
            userName: '',
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
              <TextField
                placeholder={'First name'}
                className={classes.inputs}
                name="firstName"
                inputProps={{
                  style: { height: 12, width: '100%' },
                }}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.firstName && touched.firstName && errors.firstName}
                </Typography>
              )}
              <TextField
                placeholder={'Sur name'}
                className={classes.inputs}
                name="surName"
                value={values.surName}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.surName && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.surName && touched.surName && errors.surName}
                </Typography>
              )}
              <TextField
                placeholder={'User name'}
                className={classes.inputs}
                name="userName"
                value={values.userName}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.userName && touched.userName && errors.userName}
                </Typography>
              )}

              <TextField
                placeholder={intl.formatMessage({ id: 'input.Email' })}
                className={classes.inputs}
                name="email"
                value={values.email}
                inputProps={{
                  style: { height: 12 },
                }}
                error={true}
                helperText="Not a valid email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.email && touched.email && errors.email}
                </Typography>
              )}

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
                  disabled={!isValid || registerLoading}
                >
                  {registerLoading ? (
                    <Loading type="spin" color="white" height={14} width={20} />
                  ) : (
                    'Register'
                  )}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm

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
    marginTop: 20,
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
    height: 32,
    width: 21,
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
})
