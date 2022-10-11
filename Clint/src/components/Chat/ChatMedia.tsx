import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import FilePreviewer from "../Utills/ChatChip/FilePreviewer";

interface chatMInt {
  media: any;
}

const ChatMembers: React.FC<chatMInt> = (props) => {
  const { media } = props;

  return (
    <Grid container className="chat-member-chip" style={styles.wrapper}>
      {media?.map?.((file: any) => {
        return (
          <Grid item xs={4} md={3} lg={2} style={{ padding: 2 }}>
            <FilePreviewer file={file} showControls={false} hideName={true} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChatMembers;

const styles = {
  wrapper: {
    height: "auto",
    maxHeight: 240,
    overflow: "auto",
  },
};
