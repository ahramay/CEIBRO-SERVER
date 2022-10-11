import { QuestioniarInterface } from "../constants/interfaces/questioniar.interface";

export function formatDate(date: any) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function removeCurrentUser(values: any, currentUser: any) {
  return values?.filter(
    (user: any) => String(user.value) !== String(currentUser)
  );
}

export function validateQuestions(questioniars: any): boolean {
  let isValidated = false;
  try {
    questioniars?.forEach?.((question: QuestioniarInterface) => {
      if (question.type === "checkbox" || question.type === "multiple") {
        // have qustion and all options filled
        isValidated =
          (question?.question?.length &&
            question?.options?.every?.((option: string) => option?.length)) ||
          false;
      } else {
        if (question?.type === "shortAnswer") {
          // have question typed
          isValidated = question?.question?.length > 0;
        }
      }
    });
  } catch (e) {
    console.log("error i s", e);
    isValidated = false;
  }
  return isValidated;
}

export function getDate(addDays?: number): string {
  // return date in "yyyy-mm-dd" format
  let dtToday = new Date();

  if (addDays) {
    // adding days to current date
    dtToday = new Date(dtToday.setDate(dtToday.getDate() + addDays));
  }

  let month: any = dtToday.getMonth() + 1;
  let day: any = dtToday.getDate();
  let year: any = dtToday.getFullYear();

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  let maxDate = year + "-" + month + "-" + day;
  return maxDate;
}
