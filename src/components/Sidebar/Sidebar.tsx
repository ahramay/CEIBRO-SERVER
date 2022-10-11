import { Badge, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import assets from '../../assets/assets'
import colors from '../../assets/colors'
import { SingleConfig } from '../../navigation/SidebarConfig'
import { RootState } from '../../redux/reducers'
import { useMediaQuery } from 'react-responsive'
import OutsideClickHandler from 'react-outside-click-handler'
import appActions from '../../redux/action/app.action'
import './sidebar.css'
import { getAllChats } from '../../redux/action/chat.action'

function Sidebar() {
  const classes = useStyles()
  const configs = useSelector((store: RootState) => store.app.sidebarRoutes)
  const navbarOpen = useSelector((store: RootState) => store.app.navbar)
  const dispatch = useDispatch()
  const history = useHistory()
  const intl = useIntl()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' })

  useEffect(() => {
    dispatch(getAllChats())
  }, [dispatch])

  const handleRouteClick = (config: SingleConfig) => {
    history.push(`/${config.path}`)
    if (isTabletOrMobile && navbarOpen) {
      dispatch(appActions.setNavbarOpen(false))
    }
  }

  const getNavbarStyles = () => {
    let styles = {}
    if (isTabletOrMobile) {
      styles = {
        left: navbarOpen ? '0px' : '-300px',
      }
    }
    return styles
  }

  const toggleSidebar = () => {
    dispatch(appActions.toggleNavbar())
  }

  return (
    <OutsideClickHandler onOutsideClick={toggleSidebar} disabled={!isTabletOrMobile || !navbarOpen}>
      <div className={`${classes.sidebarWrapper} sidebarWrapper`} style={getNavbarStyles()}>
        <div className={classes.logoWrapper}>
          <img src={assets.logo} alt="ceibro-logo" />
        </div>

        <div className={classes.menueWrapper}>
          {configs &&
            Object.values(configs).map((config: any) => {
              return (
                <div
                  key={config.title}
                  className={`${classes.menue} ${
                    window.location.pathname.includes(config.path) ? classes.active : ''
                  }`}
                  onClick={() => handleRouteClick(config)}
                >
                  <div className={classes.iconWrapper}>
                    <Typography className={classes.icon}>
                      <img src={config.icon} className={classes.iconInner} alt={''} />
                    </Typography>
                  </div>
                  <Typography className={classes.title}>
                    {intl.formatMessage({ id: config.title })}
                  </Typography>
                  <div className={classes.badge}>
                    {config.notification > 0 && (
                      <Badge badgeContent={config.notification} color="error"></Badge>
                    )}
                  </div>
                </div>
              )
            })}
        </div>

        <div className={classes.admin}>
       
          <Typography className={classes.helpText}>admin</Typography>
        </div>
        <div className={classes.help}>
          <div className={classes.helpInnerWrapper}></div>
          <img src={assets.questionMarkIcon} className={classes.helpIcon} alt={''} />
          <Typography className={classes.helpText}>Help</Typography>
        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default Sidebar

const useStyles = makeStyles(theme => ({
  sidebarWrapper: {
    background: colors.grey,
    width: 200,
    height: '100vh',
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: 4,
    },
  },
  logoWrapper: {
    maxHeight: 150,
  },
  menueWrapper: {
    height: 'calc(100vh - 200px)',
    overflowY: 'auto',
  },
  menue: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 15px',
    paddingRight: 0,
    borderBottom: `1px solid ${colors.backgroundColor}`,
    fontSize: 16,
    fontWeight: 500,
    color: colors.primary,
    cursor: 'pointer',
    gap: 13,
    '&:hover': {
      background: colors.white,
    },
  },
  iconWrapper: {
    flex: 1,
    display: 'flex',
  },
  icon: {
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: colors.white,
    color: colors.black,
  },
  title: {
    flex: 4,
    fontSize: 16,
    fontWeight: 500,
  },
  badge: {
    flex: 1,
  },
  active: {
    background: colors.white,
    color: `${colors.black} !important`,
  },
  admin:{
    top: '-40px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  help: {
    height: '20px',
    display: 'flex',
    top:"-20px",
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  helpIcon: {
    color: colors.white,
    // fontSize: 25,
    position: 'absolute',
    zIndex: 2,
    left: 45,
  },
  helpInnerWrapper: {
    background: colors.black,
    left: 65,
    position: 'absolute',
    zIndex: 1,
    width: 10,
    height: 10,
  },
  helpText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.primary,
  },
  iconInner: {
    width: 12,
    heihgt: 12,
  },
}))
