import { createContext } from "react";
const initialState = {
  admin: "re",
  role: "r",
  member: "e",
  timeProfile: "gg",
};
const permissionContext = createContext(initialState);

export default permissionContext;
