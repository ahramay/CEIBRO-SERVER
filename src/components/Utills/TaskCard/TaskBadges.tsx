import { Badge } from "@material-ui/core";
import { getStyleClass } from "config/styles.config";
import React from "react";

const TaskBadges = () => {
  const badges = [
    {
      count: 8,
      status: "Ongoing",
    },
    {
      count: 3,
      status: "Approvedw",
    },
    {
      count: 5,
      status: "Done",
    },
    {
      count: 1,
      status: "Draft",
    },
    {
      count: 2,
      status: "Rejected",
    },

    {
      count: 12,
      status: "Submitted",
    },
  ];

  return (
    <>
      {badges?.map((badge) => {
        return (
          <div className={getStyleClass(badge.status)}>
            <Badge color="primary" badgeContent={badge.count}></Badge>
          </div>
        );
      })}
    </>
  );
};

export default TaskBadges;
