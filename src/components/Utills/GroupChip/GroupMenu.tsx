import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import { RootState } from "../../../redux/reducers";

interface GroupMenueInt {
  onEdit: () => void;
  onDelete: () => void;
  groupId: string;
  name: string;
}

const GroupMenu: React.FC<GroupMenueInt> = (props) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const confirm = useConfirm();

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setShow(!show);
  };

  const handleEdit = () => {
    props.onEdit();
  };
  const handleDelete = (e: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    confirm({
      title: "Please confirm",
      description: `Are you confirm want to delete ${props.name} group?`,
    }).then(() => {
      props.onDelete();
    });
  };

  return (
    <div className="dropdown">
      <IconButton onClick={handleToggle}>
        <img src={assets.moreIcon} className={classes.moreIcon} />
      </IconButton>
      {show && (
        <OutsideClickHandler onOutsideClick={handleToggle}>
          <div className={`dropdown-content ${classes.dropdownContent}`}>
            <div
              onClick={handleEdit}
              className={`${classes.menuWrapper} dropdown-menu pointer`}
            >
              <img src={assets.blackPencil} className="width-16" />
              <Typography className={`${classes.menuText} align-center`}>
                Manage group
              </Typography>
            </div>

            <hr className={classes.break} />

            <div className={`${classes.menuWrapper} dropdown-menu pointer`}>
              <img src={assets.addUser} className="width-16" />
              <Typography className={`${classes.menuText} align-center`}>
                Add people
              </Typography>
            </div>

            <hr className={classes.break} />

            <div
              onClick={handleDelete}
              className={`${classes.menuWrapper} dropdown-menu pointer`}
            >
              <img src={assets.trashIcon} className="width-16" />
              <Typography className={`${classes.menuText} align-center`}>
                Delete group
              </Typography>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default GroupMenu;

const useStyles = makeStyles({
  moreIcon: {
    cursor: "pointer",
  },
  dropdownContent: {
    minWidth: 180,
    display: "block",
  },
  menuWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menuIcon: {
    fontSize: 14,
  },
  star: {
    color: colors.darkYellow,
    fontSize: 20,
  },
  starText: {
    marginLeft: "4px !important",
  },
  starMenu: {
    display: "flex",
    alignItems: "",
  },
  menuText: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 10,
    height: 30,
    color: colors.textPrimary,
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
  deleteConversation: {
    color: colors.btnRed,
  },
  deleteText: {
    color: colors.btnRed,
  },
});
