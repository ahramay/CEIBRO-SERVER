import {
  Grid,
  Typography,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import TextField from "../Inputs/TextField";
import { Cancel } from "@material-ui/icons";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import InputText from "../Inputs/InputText";
import SelectDropdown from "../Inputs/SelectDropdown";
import { availableQuestionTypes } from "../../../constants/questioniar.constants";
// @ts-ignore
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import colors from "../../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { setQuestions } from "../../../redux/action/chat.action";
import assets from "../../../assets/assets";

interface createQuestionInt {
  id: number | string;
}

let debounceTimeOut: any = null;
let settled = false;

const CreateQuestion: React.FC<createQuestionInt> = (props) => {
  const classes = useStyles();
  const intervalRef = useRef<any>();
  const { id } = props;
  const dispatch = useDispatch();
  const [questionText, setQuestionText] = useState<string>("");
  const [questionType, setQuestionType] = useState<any>(
    availableQuestionTypes[0]
  );
  const [options, setOptions] = useState<any>([""]);

  const { questioniars } = useSelector((state: RootState) => state.chat);

  const handleQuestionChange = (e: any) => {
    setQuestionText(e.target.value);
  };

  const handleQuestionTypeChange = (e: any) => {
    setQuestionType(e);
  };

  const handleAddNewChoice = () => {
    setOptions([...options, ""]);
  };

  useEffect(() => {
    if (questioniars) {
      const myQuestioniars = JSON.parse(JSON.stringify(questioniars));
      const myQuestion: QuestioniarInterface = myQuestioniars?.find(
        (question: QuestioniarInterface) => question?.id === id
      );
      if (myQuestion) {
        setQuestionText(myQuestion.question);
        if (myQuestion.type) {
          const myQuestiontype = availableQuestionTypes.find(
            (type: any) => myQuestion.type === type.value
          );
          if (myQuestiontype) {
            setQuestionType(myQuestiontype);
          }
        }
        setOptions(myQuestion.options);
        settled = true;
        intervalRef.current = true;
      }
    }
  }, []);

  useEffect(() => {
    if (intervalRef.current && settled) {
      if (debounceTimeOut) {
        clearTimeout(debounceTimeOut);
      }

      debounceTimeOut = setTimeout(() => {
        //   updating question in global state
        const myQuestioniars = JSON.parse(JSON.stringify(questioniars));
        const myQuestionIndex: number = myQuestioniars?.findIndex(
          (question: QuestioniarInterface) => question?.id === id
        );
        if (myQuestionIndex > -1) {
          const myQuestion: QuestioniarInterface =
            myQuestioniars[myQuestionIndex];
          if (myQuestion) {
            myQuestion.question = questionText;
            myQuestion.type = questionType?.value;
            myQuestion.options = options;
            myQuestioniars[myQuestionIndex] = myQuestion;
            dispatch(setQuestions(myQuestioniars));
          }
        }
      }, 400);
    }
  }, [options, questionText, questionType]);

  // console.log(
  //   "availableQuestionTypes",
  //   availableQuestionTypes?.map(
  //     (element: any) =>
  //       element.value.charAt(0).toUpperCase() +
  //       element.value.substring(1).toLowerCase()
  //   )
  // );

  function capitalize(arr: any) {
    for (var i = 0; i < arr.length; i++) {
      var first = arr[i].label;
      var last = arr[i].value;
      arr[i].label =
        first?.slice(0, 1)?.toUpperCase() + first?.slice(1)?.toLowerCase();
      arr[i].value =
        last?.slice(0, 1)?.toUpperCase() + last?.slice(1)?.toLowerCase();
    }
    return arr;
  }

  function cap(arr: any) {
    arr.map((ele: any) => {
      const first = ele.label;
      const last = ele.value;
    });
  }

  const availableQuestionsTypesList = availableQuestionTypes

  // const availableQuestionsTypesList = availableQuestionTypes?.map(
  //   (element: any) =>
  //     element.label.charAt(0).toUpperCase() +
  //     element.label.substring(1).toLowerCase()
  // );

  const handleChangeInput = (e: any, index: number) => {
    const myOptions = options;
    let myOptionText = options?.[index];
    myOptionText = e?.target?.value;
    myOptions[index] = myOptionText;
    setOptions([...myOptions]);
  };

  const handleRemove = (index: number) => {
    if (options.length > 1) {
      const newOptions = [
        ...options.slice(0, index),
        ...options.slice(index + 1, options.length),
      ];
      setOptions(JSON.parse(JSON.stringify(newOptions)));
    }
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} className={"create-question-row"}>
        <div className={classes.questionWrapper}>
          <TextField
            inputProps={{
              style: { height: 15 },
            }}
            className={classes.inputs}
            placeholder="Type your question"
            onChange={handleQuestionChange}
            value={questionText}
          />
        </div>
        <div className={classes.questionType}>
          <SelectDropdown
            placeholder={"Question type"}
            title={"Question type"}
            data={availableQuestionsTypesList}
            handleChange={handleQuestionTypeChange}
            value={questionType}
          />
        </div>

        {(questionType?.value === "multiple" ||
          questionType?.value === "checkbox") && (
          <div className={classes.optionsOuterWrapper}>
            {options &&
              options.map((option: any, index: number) => {
                return (
                  <div key={index} className={classes.optionsChip}>
                    <div className={classes.optionNumberWrapper}>
                      <Typography className={classes.inputIndex}>
                        {index + 1}.
                      </Typography>
                    </div>
                    <div className={classes.optionInput}>
                      <TextField
                        inputProps={{
                          style: { height: 15 },
                        }}
                        className={classes.inputs}
                        placeholder="Type reply text"
                        value={option}
                        onChange={(e: any) => handleChangeInput(e, index)}
                      />
                    </div>
                    <div className={classes.optionDelete}>
                      <IconButton onClick={() => handleRemove(index)}>
                        <img src={assets.clearIcon} />
                      </IconButton>
                    </div>
                  </div>
                );
              })}

            <div className={classes.addOptionWrapper}>
              <Button
                onClick={handleAddNewChoice}
                variant="text"
                size="small"
                color="primary"
              >
                + Add choice variant
              </Button>
            </div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default CreateQuestion;

const useStyles = makeStyles({
  wrapper: {
    padding: "15px 0px",
  },
  questionWrapper: {
    maxWidth: 450,
    paddingBottom: 10,
  },
  questionType: {
    maxWidth: 450,
    paddingBottom: 10,
  },
  optionsOuterWrapper: {
    maxWidth: 450,
    background: colors.secondaryGrey,
    padding: 20,
  },
  optionNumberWrapper: {
    width: "5%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  delete: {
    color: colors.btnRed,
  },
  optionInput: {
    width: "85%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  optionDelete: {
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },
  optionsChip: {
    width: "100%",
    display: "flex",
  },
  addOptionWrapper: {
    color: colors.textPrimary,
    paddingLeft: 30,
    paddingTop: 20,
  },
  inputs: {
    width: "100%",
  },
  inputIndex: {
    fontWeight: 500,
    fontSize: 14,
  },
});
