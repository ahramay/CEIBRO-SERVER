import React, { FC, useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";

import "./inputText.css";
import { Typography, makeStyles } from "@material-ui/core";
import colors from "assets/colors";

interface InputSwitchtInterface {
  label: string;
  onChange?: (e: any) => void;
  value?: boolean;
  name?: string;
}

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const InputTextArea: FC<InputSwitchtInterface> = (props) => {
  const { label, onChange, value, name } = props;
  const classes = useStyles();

  return (
    <div style={styles.wrapper}>
      <FormControlLabel
        control={<IOSSwitch checked={value} name={name} />}
        label={label ? label : ""}
        onClick={(e: any) => onChange?.(e)}
        name={name}
        classes={{ label: classes.inputLabel }}
      />
    </div>
  );
};

export default InputTextArea;

const useStyles = makeStyles({
  inputLabel: {
    paddingLeft: 10,
  },
});

const styles = {
  wrapper: {
    // width: "100%",
  },
  formControlLabel: {
    fontSize: 14,
    fontWeight: 500,
  },
};

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 30,
      height: 20,
      padding: 0,
      margin: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      marginRight: 0,
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: colors.green,
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: colors.green,
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 10,
      height: 10,
      marginTop: 4,
      marginLeft: 2,
    },
    track: {
      borderRadius: 26 / 2,
      border: `green`,
      backgroundColor: colors.inputGrey,
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
