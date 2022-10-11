import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import colors from "../../../assets/colors";
import {
  QuestioniarInterface,
  QuestioniarOptionInterface,
} from "../../../constants/interfaces/questioniar.interface";
import { RadioProps } from "@material-ui/core/Radio";
import { setQuestions } from "../../../redux/action/chat.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import AnswerByWrapper from "./AnswerByWrapper";
import { UserInterface } from "constants/interfaces/user.interface";
interface multipleQuestionInt {
  question: QuestioniarInterface;
  handleChange?: (value: any) => void;
}

const MultipleQuestion: React.FC<multipleQuestionInt> = (props) => {
  const classes = useStyles();
  const { questioniars, answeredByMe } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [selected, setSelected] = useState<any>(-1);
  const dispatch = useDispatch();
  const {
    question: { type, id, question, options, answer },
  } = props;

  useEffect(() => {
    if (answer && typeof answer === "string") {
      setSelected(+answer);
    }
  }, []);

  useEffect(() => {
    //   updating question in global state
    const myQuestioniars = JSON.parse(JSON.stringify(questioniars));
    const myQuestionIndex: number = myQuestioniars?.findIndex(
      (question: QuestioniarInterface) => question?.id === id
    );
    if (myQuestionIndex > -1) {
      const myQuestion: QuestioniarInterface = myQuestioniars[myQuestionIndex];
      if (myQuestion) {
        myQuestion.answer = selected;
        dispatch(setQuestions(myQuestioniars));
      }
    }
  }, [selected]);

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(+(event.target as HTMLInputElement).value);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography className={classes.question}>{question}</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset" style={{ width: "100%" }}>
          <RadioGroup
            onChange={handleChangeAnswer}
            value={selected}
            name="gender1"
          >
            {options?.map(
              (option: QuestioniarOptionInterface, index: number) => {
                return (
                  <Grid container>
                    <Grid item xs={11}>
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={<CustomRadio />}
                        label={option.option}
                        disabled={answeredByMe}
                        className={`options-text ${classes.smallRadioButton}`}
                      />
                    </Grid>

                    <Grid item xs={1} className={classes.answeredByWrapper}>
                      <Typography className={classes.answeredByPercentage}>
                        {option?.percentage || 0}%
                      </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.answerUserWrapper}>
                      <AnswerByWrapper users={option?.selectedBy || []} />
                    </Grid>
                  </Grid>
                );
              }
            )}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default MultipleQuestion;

const CustomRadio = withStyles({
  root: {
    "&$checked": {
      color: colors.darkYellow,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const useStyles = makeStyles({
  wrapper: {
    paddingTop: 20,
  },
  answeredByWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
  },
  answeredByPercentage: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.green,
  },
  answerUserWrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    padding: "2px 10px",
  },
  question: {
    fontSize: 18,
    fontWeight: 500,
  },
  smallRadioButton: {
    fontSize: "14px !important",
    fontWeight: 500,
    "& svg": {
      width: "0.8em",
      height: "0.8em",
    },
    "&$checked": {
      color: "green",
    },
  },
});
