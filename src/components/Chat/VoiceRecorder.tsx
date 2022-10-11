import { Grid, makeStyles } from "@material-ui/core";
import {
  Mic,
  PauseCircleOutlineSharp,
  PlayArrowOutlined,
} from "@material-ui/icons";
// @ts-ignore
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import assets from "../../assets/assets";
import colors from "../../assets/colors";

interface VoiceRecorderInterface {
  onCancel: () => void;
  handleSubmit: (blob: any) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderInterface> = (props) => {
  const [recordState, setRecordState] = useState(null);
  const [show, setShow] = useState(false);
  const [pause, setPause] = useState(false);
  const [url, setUrl] = useState<any>(null);
  const [blob, setBlob] = useState<any>(null);
  const [sendOnStop, setSendOnStop] = useState<boolean>(false);

  const classes = useStyles();

  useLayoutEffect(() => {
    //@ts-ignore
    navigator?.getUserMedia?.(
      // constraints
      {
        audio: true,
      },

      // successCallback
      function (localMediaStream: any) {
        setRecordState(RecordState.START);
      },

      // errorCallback
      function (err: any) {
        if (err) {
          // Explain why you need permission and how to update the permission setting
        }
      }
    );
  }, []);

  const start = () => {
    setRecordState(RecordState.START);
  };

  const stop = (audio: any) => {
    console.log("🚀 ~ file: VoiceRecorder.tsx ~ line 27 ~ stop ~ audio", audio);
    setUrl(audio.url);
    setBlob(audio);
    if (sendOnStop) {
      props?.handleSubmit(audio);
    }
    // setRecordState(RecordState.STOP)
  };

  const handlePause = () => {
    setRecordState(RecordState.STOP);
    setPause(true);
  };

  const handleResume = () => {
    setRecordState(RecordState.START);
    setPause(false);
    setUrl(null);
  };

  const handleSend = () => {
    if (pause) {
      props?.handleSubmit(blob);
    } else {
      setSendOnStop(true);
      setRecordState(RecordState.STOP);
    }
  };

  return (
    <Grid item xs={12} direction="row-reverse" className={classes.inputWrapper}>
      <div className={classes.sendWrapper}>
        <img
          src={assets.sendIcon}
          onClick={handleSend}
          className={classes.sendIcon}
        />
      </div>
      {pause ? (
        <Mic className={classes.icons} onClick={handleResume} />
      ) : (
        <PauseCircleOutlineSharp
          className={classes.icons}
          onClick={handlePause}
        />
      )}
      <AudioReactRecorder
        backgroundColor={"white"}
        canvasWidth={100}
        canvasHeight={100}
        state={recordState}
        onStop={stop}
      />
      {pause && url && (
        <audio controls>
          <source src={url} />
        </audio>
      )}
      <BiTrash className={classes.trash} onClick={props?.onCancel} />
    </Grid>
  );
};

export default VoiceRecorder;

const useStyles = makeStyles({
  inputWrapper: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 25,
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${colors.lightGrey}`,
  },
  sendWrapper: {
    fontSize: 18,
    textAlign: "center",
    cursor: "pointer",
  },
  icons: {
    cursor: "pointer",
  },
  sendIcon: {
    borderRadius: 5,
    background: colors.primary,
    padding: 10,
    color: colors.white,
  },
  trash: {
    cursor: "pointer",
  },
});
