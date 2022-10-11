import React from "react";
import { makeStyles } from "@material-ui/core";
import colors from "assets/colors";

interface SeenByInt {
  url: string | any;
  firstName: string;
  surName: string;
}

const AnswerBy: React.FC<SeenByInt> = (props) => {
  const { url, firstName, surName } = props;
  const classes = useStyles();

  const letters =
    firstName?.[0]?.toUpperCase?.() + (surName?.[0]?.toUpperCase?.() || "");

  return (
    <div className={classes.seenAvatar}>
      {!url && letters}
      {url && <img src={url} className={classes.seenChip} />}
    </div>
  );
};

export default AnswerBy;

const useStyles = makeStyles({
  seenAvatar: {
    width: 30,
    height: 30,
    background: colors.grey,
    fontSize: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  seenChip: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
