import { makeStyles, Typography } from "@material-ui/core";
import colors from "assets/colors";
import React, { useState } from "react";
import { classNames } from "react-select/dist/declarations/src/utils";
import { UserInterface } from "../../../constants/interfaces/user.interface";
import AnswerBy from "./AnswerBy";

interface AnswerByWrapper {
  users: UserInterface[];
}

const AnswerByWrapper: React.FC<AnswerByWrapper> = (props) => {
  const { users } = props;
  const classes = useStyles();
  const [expand, setExpand] = useState(false);

  if (users?.length === 0) {
    return null;
  }

  let cutValue = 1;

  let usersList = users;
  let remain = 0;
  if (!expand) {
    usersList = users?.slice(0, cutValue);
    remain = users?.length - cutValue;
  }

  return (
    <div className={classes.wrapper}>
      {usersList?.map?.((user: UserInterface) => {
        return (
          <AnswerBy
            url={user?.profilePic}
            firstName={user.firstName}
            surName={user.surName}
          />
        );
      })}
      {!expand && remain !== 0 && (
        <Typography
          onClick={() => {
            setExpand(true);
          }}
          className={classes.more}
        >
          +{remain} more
        </Typography>
      )}
    </div>
  );
};

export default AnswerByWrapper;

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  more: {
    fontSize: 14,
    paddingLeft: 20,
    fontWeight: 500,
    color: colors.textPrimary,
    cursor: "pointer",
  },
});
