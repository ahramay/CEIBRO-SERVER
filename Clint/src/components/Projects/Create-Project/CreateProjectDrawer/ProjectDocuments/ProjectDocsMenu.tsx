import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import CustomCheckbox from "components/Utills/Inputs/Checkbox";
import { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import NameAvatar from "components/Utills/Others/NameAvatar";
import { UserInterface } from "constants/interfaces/user.interface";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  addRemoveFolderUser,
  getFolder,
  getGroupUsers,
} from "redux/action/project.action";
import assets from "../../../../../assets/assets";
import colors from "../../../../../assets/colors";
import Loading from "components/Utills/Loader/Loading";
import { RootState } from "redux/reducers";

interface ProjectDocsMenuInt {
  groupId: string;
  folderId: string;
  access: string[];
}

const ProjectDocsMenu: React.FC<ProjectDocsMenuInt> = (props) => {
  const classes = useStyles();
  const { groupId, access, folderId } = props;
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const [selectedUsers, setSelectedUsers] = useState<String[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<UserInterface[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      setLoading(true);
      dispatch(
        getGroupUsers({
          other: groupId,
          success: (res) => {
            setMembers(res.data);
          },
          finallyAction: () => {
            setLoading(false);
          },
        })
      );
    } else {
      setMembers([]);
    }
  }, [show]);

  useEffect(() => {
    setSelectedUsers(access);
  }, [access]);

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setShow(!show);
  };

  const handleUserChange = (e: any) => {
    if (!selectedUsers?.includes?.(e?.target?.value)) {
      setSelectedUsers([...selectedUsers, e.target.value]);
      dispatch(
        addRemoveFolderUser({
          other: {
            folderId,
            userId: e.target.value,
          },
          success: () => {
            dispatch(
              getFolder({
                other: { selectedProject },
              })
            );
          },
        })
      );
    } else {
      removeSelectedUser(e?.target?.value);
    }
  };

  const removeSelectedUser = (userId: any) => {
    setSelectedUsers(
      selectedUsers?.filter?.((user: any) => String(user) !== String(userId))
    );
  };

  return (
    <div className="dropdown">
      <IconButton onClick={handleToggle}>
        <img src={assets.moreIcon} className={classes.moreIcon} />
      </IconButton>
      {show && (
        <OutsideClickHandler onOutsideClick={handleToggle}>
          <div className={`dropdown-content ${classes.dropdownContent}`}>
            <Grid container>
              {loading && (
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 100,
                    }}
                  >
                    <Loading
                      type="spin"
                      color={colors.primary}
                      height={14}
                      width={14}
                    />
                  </Grid>
                </Grid>
              )}
              {!loading &&
                members?.map((member: UserInterface, index: number) => {
                  return (
                    <Grid container className={classes.wrapper}>
                      <Grid item xs={2}>
                        <NameAvatar
                          firstName={member?.firstName}
                          surName={member?.surName}
                          url={member?.profilePic}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <div>
                          <Typography className={classes.titleText}>
                            {member?.firstName} {member?.surName}
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item xs={2} className={classes.checkbox}>
                        <CustomCheckbox
                          onClick={handleUserChange}
                          value={member?.id}
                          name={"s"}
                          checked={selectedUsers?.includes?.(member?.id)}
                        />
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default ProjectDocsMenu;

const useStyles = makeStyles({
  moreIcon: {
    cursor: "pointer",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContent: {
    minWidth: 220,
    height: 180,
    overflowY: "auto",
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
  small: {
    // width: theme.spacing(5),
    // height: theme.spacing(5),
  },
  outerMenu: {
    width: 350,
    left: 0,
  },
  searchInput: {
    width: 340,
    height: 30,
    border: `1px solid ${colors.borderGrey}`,
  },
  smallRadioButton: {
    fontSize: "14px !important",
    "& svg": {
      width: "0.8em",
      height: "0.8em",
    },
    "&$checked": {
      color: "green",
    },
  },
  suggestedUsersTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    marginBottom: 10,
  },
  wrapper: {
    // borderBottom: `1px solid ${colors.grey}`,
    marginBottom: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  subTitleText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  actionWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 25,
    paddingTop: 10,
    paddingBottom: 15,
  },
  actionBtn: {
    fontSize: 12,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.textGrey,
  },
  suggestUser: {
    maxHeight: 300,
    overflow: "auto",
  },
  selectedUser: {
    height: 50,
    width: 50,
    position: "relative",
  },
  cancelIcon: {
    fontSize: 14,
    position: "absolute",
    color: colors.textGrey,
    top: -5,
    right: 5,
  },
});
