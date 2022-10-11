import React from 'react'
import { alpha, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import colors from '../../../assets/colors'

export default function CustomizedInputs(props) {
  return <BootstrapInput {...props} />
}

const BootstrapInput = withStyles(theme => ({
  root: {
    // boxSizing: 'unset',
    // height: 'unset',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    'label + &': {
      marginTop: theme.spacing(3),
    },
    width: '100%',
  },
  input: {
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
    border: `1px solid ${colors.purpleGrey}`,
    borderRadius: 4,
    position: 'relative',
    padding: '10px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(colors.lightPurpuple, 0.25)} 0 0 0 0.2rem`,
      borderColor: colors.lightPurpuple,
    },
  },
}))(InputBase)
