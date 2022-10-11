import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Delete, PersonAdd } from "@material-ui/icons";
import assets from "assets/assets";
import { FolderFileInterface } from "constants/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useDispatch ,useSelector} from "react-redux";
import {  getFolderFiles } from "redux/action/project.action";
import colors from "../../../../assets/colors";
import HorizontalBreak from "../../Others/HorizontalBreak";
import { MenuOptions } from "../../Others/MenuButton";
import NameAvatar from "../../Others/NameAvatar";
import FileMenu from "./FileMenu";
import { RootState } from "redux/reducers";
import { FolderInterface } from "constants/interfaces/project.interface";
const menue: MenuOptions[] = [
  {
    title: "Manage Group",
    icon: <BiPencil />,
  },
  {
    title: "Add people",
    icon: <PersonAdd />,
  },
  {
    title: "Delete Group",
    icon: <Delete />,
  },
];

interface FolderFilesInt {
  name: string;
  selectedFolderId?: FolderInterface | null;
  handleClick: () => void;
  handleDelete: () => void;
}

const GroupChip: React.FC<FolderFilesInt> = (props) => {
  const { name, handleClick,selectedFolderId, handleDelete } = props;
  const { folderFiles } = useSelector((state: RootState) => state?.project);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<FolderFileInterface[]>([]);
  const [findDoc, setFindDoc] = useState<any>();
  console.log("folder id", selectedFolderId?.id);
  console.log("folderFiles", folderFiles);
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      dispatch(
        getFolderFiles({
          other: { selectedFolder: selectedFolderId?.id },
          success: (res) => {
            setMembers(res.data);
          },
        })
      );
    }
  }, [open, selectedFolderId]);

  return (
    <div>
      <div className={classes.groupChip} onClick={handleToggle}>
        <div className={classes.title}>
          {open ? (
            <img src={assets.chevrondown} className="w-16" />
          ) : (
            <img src={assets.chevronRight} className="width-16" />
          )}
          <Typography className={classes.titleText}>{name}</Typography>
        </div>
        {/* <div className={classes.action}>
          <FileMenu
            onDelete={handleDelete}
            selectedFolderId={selectedFolderId}
            onEdit={handleClick}
            name={name}
          />
        </div> */}
      </div>
      {open && (
        <Grid container style={{ flexDirection: "column" }}>
          {members?.map?.((member: FolderFileInterface) => {
            if(!member) {
              return null;
            }
            
            return (
              <Grid
                key={member.id}
                container
                style={{ maxWidth: 300 }}
                className="chat-member-chip"
              >
                <Grid item xs={2} style={{ paddingTop: 5 }}>
                  <NameAvatar
                    firstName={member?.name}
                    surName={member?.fileType}
                    url={member?.url}
                    variant="small"
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  style={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    className={`chat-member-name ${classes.memberName}`}
                  >
                    {member?.name} {member?.fileType}
                  </Typography>
                  <Typography
                    className={`${classes.memberCompany} chat-member-company`}
                  >
                    Company: {member?.url}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      )}
      <HorizontalBreak color={colors.grey} />
    </div>
  );
};

export default GroupChip;

const useStyles = makeStyles({
  groupChip: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 12,
    cursor: "pointer",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    color: colors.primary,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 500,
    paddingLeft: 5,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 700,
  },
  memberCompany: {
    fontSize: 12,
    fontWeight: 500,
  },
});
