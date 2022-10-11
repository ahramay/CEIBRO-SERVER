import { Grid, Typography, makeStyles } from "@material-ui/core";
import { memo, useEffect, useState } from "react";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import TextField from "../Inputs/TextField";
// @ts-ignore
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { setQuestions } from "../../../redux/action/chat.action";
interface ShowAnswerInt {
  question: QuestioniarInterface;
}

let debounceTimeout: any = null;

const ShowAnswer: React.FC<ShowAnswerInt> = memo((props) => {
  const classes = useStyles();
  const [answer, setAnswer] = useState<any>("");
  const dispatch = useDispatch();
  const {
    question: { question, answer: previousAnswer, id },
  } = props;
  const { questioniars, answeredByMe } = useSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    if (previousAnswer) {
      setAnswer(previousAnswer);
    }
  }, []);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      //   updating question in global state
      const myQuestioniars = JSON.parse(JSON.stringify(questioniars));
      const myQuestionIndex: number = myQuestioniars?.findIndex(
        (question: QuestioniarInterface) => question?.id === id
      );
      if (myQuestionIndex > -1) {
        const myQuestion: QuestioniarInterface =
          myQuestioniars[myQuestionIndex];
        if (myQuestion) {
          myQuestion.answer = answer;
          dispatch(setQuestions(myQuestioniars));
        }
      }
    }, 300);
  }, [answer]);

  const handleAnswerChange = (event: any) => {
    console.log("value is ", event.target.value);
    setAnswer((event.target as HTMLInputElement).value);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography className={classes.question}>{question}</Typography>
      </Grid>
      <Grid item xs={12} style={{ paddingTop: 5 }}>
        {!answeredByMe && (
          <TextField
            inputProps={{
              style: { height: 15 },
            }}
            className={classes.inputs}
            placeholder="Type your answer"
            onChange={handleAnswerChange}
            value={answer}
            disabled={answeredByMe}
          />
        )}
        {answeredByMe && (
          <Typography>
            <b>Ans:</b> {answer}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
});

export default ShowAnswer;

const useStyles = makeStyles({
  wrapper: {
    paddingTop: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 500,
  },
  inputs: {
    width: "100%",
  },
});
