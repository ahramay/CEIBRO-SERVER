export interface TaskCardInterface {
  task: TaskInterface;
}

export interface TaskInterface {
  dueDate: string;
  assignedTo: string;
  title: string;
  subTasks: number;
  docs: number;
  chat: number;
  status: "Ongoing" | "Rejected" | "Done" | "Draft" | "Submitted";
  owner: string;
  members: number | 1;
}
