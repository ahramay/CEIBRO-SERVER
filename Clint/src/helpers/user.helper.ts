import { UserInterface } from "../constants/interfaces/user.interface";

export function mapUsers(users: UserInterface[]) {
  return users?.map((user: UserInterface) => ({
    label: user?.firstName + " " + user?.surName,
    value: user?.id,
  }));
}
