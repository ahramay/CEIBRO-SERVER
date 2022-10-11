import React, { useState, useEffect } from "react";
import { Badge, makeStyles, Typography } from "@material-ui/core";
import {
  getAllStatus,
  getColorByStatus,
  SET_SELECTED_STATUS,
} from "../../../config/project.config";
import { getStyleClass } from "../../../config/styles.config";
import colors from "../../../assets/colors";
import projectActions, {
  getProjectsWithPagination,
  getStatus,
} from "redux/action/project.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface StatusMenuInt {
  title: string;
  count: number;
}

interface StatusMenuProps {
  options: StatusMenuInt[];
}

export const StatusMenu: React.FC<StatusMenuProps> = (props) => {
  const { options } = props;
  const { getStatuses, drawerOpen } = useSelector(
    (state: RootState) => state.project
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("all");
  console.log("filter", filter);

  useEffect(() => {
    if (filter) {
      dispatch(projectActions.setSelectedStatus(filter));
      dispatch(getProjectsWithPagination());
    }
  }, [filter]);

  useEffect(() => {
    if (!drawerOpen) {
      dispatch(getStatus());
    }
  }, [drawerOpen]);

  console.log("getStatuses", getStatuses);

  return (
    <>
      {getStatuses &&
        getStatuses.map((option: any, index: any) => {
          return (
            <div
              onClick={() => setFilter(option.name)}
              key={index}
              className={`${classes.statusChip} ${getStyleClass(option.name)}`}
              style={{
                border:
                  filter === option.name
                    ? `1px solid ${colors.inputGrey}`
                    : "none",
                borderRadius: 5,
              }}
            >
              <Typography className={classes.chipTitle}>
                {option.name}
              </Typography>
              {option.count > 0 && (
                <Badge
                  className={classes.statusBage}
                  color="primary"
                  badgeContent={option.count}
                  style={{ marginRight: 20 }}
                ></Badge>
              )}
            </div>
          );
        })}
    </>
  );
};

export default StatusMenu;

const useStyles = makeStyles({
  statusChip: {
    padding: "5px 20px",
    // width: 100,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    // justifyContent: 'space-around',
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
    },
  },
  statusBage: {
    marginLeft: 15,
  },
  chipTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 500,
    textTransform: "capitalize",
  },
  ongoing: {
    background: getColorByStatus("ongoing"),
  },
  completed: {
    background: getColorByStatus("completed"),
  },
  draft: {
    background: getColorByStatus("draft"),
  },
  approved: {
    background: getColorByStatus("approved"),
  },
  submitted: {
    background: getColorByStatus("submitted"),
  },
  rejeced: {
    background: getColorByStatus("rejected"),
  },
});
