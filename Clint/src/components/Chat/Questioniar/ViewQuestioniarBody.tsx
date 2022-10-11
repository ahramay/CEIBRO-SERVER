import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import {
  closeQuestioniarDrawer,
  closeViewQuestioniarDrawer,
  getUserQuestioniarAnswer,
  saveQuestioniar,
  saveQuestioniarAnswers,
  setQuestions,
} from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import CreateQuestion from "../../Utills/Questioniar/Question.create";
import PreviewQuestion from "../../Utills/Questioniar/PreviewQuestion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";
import { dbUsers } from "../../Topbar/CreateChat";
import { formatDate, removeCurrentUser } from "../../../helpers/chat.helpers";
import { toast } from "react-toastify";
import assets from "../../../assets/assets";

const QuestioniarBody = () => {
  const classes = useStyles();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    questioniars,
    selectedChat,
    questioniarsLoading,
    selectedQuestioniar,
    answeredByMe,
    chat,
    questioniarInfo,
  } = useSelector((store: RootState) => store.chat);
  const { user } = useSelector((store: RootState) => store.auth);
  const myQuestion = String(questioniarInfo?.sender) === String(user?.id);

  const membersList = selectedChat
    ? chat.find((room: any) => String(room._id) == String(selectedChat))
        ?.members
    : [];

  const [values, setValue] = useState();

  useEffect(() => {
    setValue(removeCurrentUser(dbUsers, user?.id));
    // const chatIndex = chat?.findIndex?.((room: any) => String(room._id) === String(selectedChat))
  }, []);

  const everyFilled = questioniars?.every((question: any) => {
    if (question?.type === "shortAnswer") {
      return question?.answer?.length > 0;
    }
    if (question?.type === "multiple") {
      return question?.answer?.toString()?.length > 0;
    }

    if (question?.type === "checkbox") {
      return Array.isArray(question?.answer) && question?.answer.length > 0;
    }

    return false;
  });

  const dispatch = useDispatch();
  const myDate = formatDate(questioniarInfo?.dueDate);

  const listOfMember = membersList?.map((member: any) => ({
    label: ` ${member?.firstName} ${member?.surName}`,
    value: member?.id,
  }));

  const handleSave = () => {
    const myQuestions = questioniars?.map((question: QuestioniarInterface) => {
      return {
        id: question.id,
        answer: question.answer,
      };
    });
    const payload = {
      body: {
        questions: myQuestions,
      },
      success: () => {
        toast.success("Answers saved");
      },
      other: selectedQuestioniar,
    };
    dispatch(saveQuestioniarAnswers(payload));
  };

  const handleClose = () => {
    dispatch(closeViewQuestioniarDrawer());
  };

  const handleUserChange = (e: any) => {
    setLoading(true);
    setMember(e);
    dispatch(
      getUserQuestioniarAnswer({
        other: {
          userId: e?.value,
          questioniarId: questioniarInfo?.id,
        },
        success: () => {
          setLoading(false);
        },
      })
    );
  };

  return (
    <>
      <Grid container direction="column" className={classes.wrapper}>
        <Grid item xs={12} className={classes.myWrapper}>
          {!questioniarsLoading && (
            <Grid container className={classes.wrapper2}>
              <Grid item xs={12} md={5}>
                <DatePicker disabled={true} value={myDate} />
              </Grid>
              <Grid item xs={12} md={3} className={classes.participantWrapper}>
                <Typography className={classes.participant}>
                  Participants list
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                className={classes.timeRemainingWrapper}
              >
                <img src={assets.nudgeIcon} className={classes.nudgeIcon} />
                <Typography className={classes.remainingText}>
                  1 day before
                </Typography>
              </Grid>

              {/* <Grid item xs={12}>
                <div className={classes.datePickerWrapper}>
                  <SelectDropdown
                    title="View answer"
                    data={listOfMember}
                    handleChange={handleUserChange}
                    isMulti={false}
                    // value={members}
                  />
                  {!questioniarInfo?.isAnswered && member && !loading && (
                    <div>
                      <Typography className={classes.error}>
                        Not Answered yet
                      </Typography>
                    </div>
                  )}
                </div>
              </Grid> */}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.wrapper3}>
        {questioniars &&
          !questioniarsLoading &&
          questioniars.map((question: QuestioniarInterface, index: number) => {
            return <PreviewQuestion key={question.id} question={question} />;
          })}
        {questioniarsLoading && (
          <Typography>Loading please wait ....</Typography>
        )}

        {!answeredByMe && !questioniarsLoading && (
          <Grid item xs={12} className={classes.questionsWrapper}>
            <Button
              disabled={!everyFilled}
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button onClick={handleClose} variant="text">
              cancel
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default QuestioniarBody;

const useStyles = makeStyles({
  wrapper: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 10,
    borderBottom: `1px solid ${colors.grey}`,
    height: "auto",
    background: colors.white,
    width: "100%",
    minWidth: 500,
    maxWidth: 500,
    ["@media (max-width:960px)"]: {
      minWidth: 300,
    },
  },
  wrapper3: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 30,
    height: "auto",
    background: colors.white,
    width: "100%",
    minWidth: 500,
    maxWidth: 500,
    ["@media (max-width:960px)"]: {
      minWidth: 300,
    },
  },
  datePickerWrapper: {
    maxWidth: 300,
    marginTop: 10,
  },
  assignedToWrapper: {
    maxWidth: 500,
    marginTop: 10,
  },
  myWrapper: {
    paddingTop: 0,
    maxWidth: 500,
  },
  questionsWrapper: {
    paddingTop: 30,
    maxWidth: 500,
  },
  preview: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
  },
  wrapper2: {
    // display: "flex",
  },
  error: {
    color: colors.btnRed,
    paddingTop: 5,
    fontSize: 12,
    fontWeight: 400,
  },
  timeRemainingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },
  nudgeIcon: {},
  remainingText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.inputGrey,
  },
  participantWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  participant: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textPrimary,
  },
});
