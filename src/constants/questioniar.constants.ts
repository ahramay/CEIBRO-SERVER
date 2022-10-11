import { QuestioniarInterface } from "./interfaces/questioniar.interface";

export const availableQuestionTypes = [
  { value: "multiple", label: "Multiple" },
  { value: "checkbox", label: "Checkbox" },
  { value: "shortAnswer", label: "Short Answer" },
];

export const getNewQuestionTemplate = (id: any) => {
  // const newQuestionTemplate: QuestioniarInterface = {
  //   type: "multiple",
  //   question: "Question for questionary with single choice?",
  //   id,
  //   options: [
  //     "Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id elit.",
  //     "Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
  //     "Donec sed odio dui. Maecenas faucibus mollis interdum.",
  //   ],
  // };
  const newQuestionTemplate: QuestioniarInterface = {
    type: "multiple",
    question: "",
    id,
    options: [""],
  };
  return newQuestionTemplate;
};
