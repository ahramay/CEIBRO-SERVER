import { Grid, Typography, makeStyles } from "@material-ui/core";

import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import MultipleQuestion from "./MultipleQuestion";
import CheckBoxQuestion from "./CheckBoxQuestion";
import ShortAnswer from "./ShortAnswer";

interface createQuestionInt {
  question: QuestioniarInterface;
}

const CreateQuestion: React.FC<createQuestionInt> = (props) => {
  const classes = useStyles();
  const { question } = props;

  if (question.type === "multiple") {
    return <MultipleQuestion question={question} />;
  }
  if (question.type === "checkbox") {
    return <CheckBoxQuestion question={question} />;
  }
  if (question.type === "shortAnswer") {
    return <ShortAnswer question={question} />;
  }
  return <h3>Invalid question type</h3>;
};

export default CreateQuestion;

const useStyles = makeStyles({
  wrapper: {
    padding: 20,
  },
});
