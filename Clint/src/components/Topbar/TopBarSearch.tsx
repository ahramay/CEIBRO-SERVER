import { makeStyles, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import assets from "assets/assets";
import * as React from "react";
import colors from "../../assets/colors";

interface IAppProps {
  onChange: (e: any) => void;
}

const TopBarSearch: React.FunctionComponent<IAppProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>
        <img src={assets.searchIcon} className={`width-16`} />
        <Typography className={classes.horizontalBreak}>|</Typography>
      </div>
      <div className={classes.inputWrapper}>
        <input
          type="text"
          className={`emptyBorder black-input ${classes.input}`}
          placeholder="Search"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default TopBarSearch;

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flex: 1,
    height: 38,
    border: `1px solid ${colors.borderGrey}`,
    background: colors.white,
    maxWidth: 300,
    borderRadius: 4,
    marginRight: 30,
  },
  iconWrapper: {
    flex: 2,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 2,
    borderBottom: `1px solid ${colors.grey}`,
    borderRight: "none",
  },
  horizontalBreak: {
    color: colors.mediumGrey,
  },
  inputWrapper: {
    flex: 7,
    borderBottom: `1px solid ${colors.grey}`,
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
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
