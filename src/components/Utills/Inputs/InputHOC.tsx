import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import assets from "assets/assets";
import React, { FC } from "react";
import colors from "../../../assets/colors";

interface InputHOCInterface {
  title: string;
  showIcon?: boolean;
}

const InputHOC: FC<InputHOCInterface> = (props) => {
  const { children, showIcon, title } = props;
  const classes = useStyles();

  return (
    <div className={classes.outerWrapper}>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>{title}</Typography>
      </div>
      {children}
      {showIcon && (
        <img src={assets.calender} className={`w-16 ${classes.calender}`} />
      )}
    </div>
  );
};

export default InputHOC;

const useStyles = makeStyles({
  calender: {
    position: "absolute",
    right: "10%",
  },
  outerWrapper: {
    position: "relative",
    background: colors.white,
    display: "flex",
    alignItems: "center",
    border: `1.5px solid ${colors.borderGrey}`,
    paddingRight: 8,
    borderRadius: 4,
    maxWidth: "100%",
  },
  titleWrapper: {
    padding: 11,
    minWidth: 45,
    // flex: 1,
    textAlign: "center",
    borderRight: `1px solid ${colors.borderGrey}`,
  },
  title: {
    fontSize: 10,
    fontWeight: 500,
    color: colors.textGrey,
  },
});
