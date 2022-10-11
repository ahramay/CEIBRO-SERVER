import { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import {
  RoleInterface,
  userRolesPermissions,
} from "constants/interfaces/project.interface";

export function formatDate(date: any) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function mapGroups(groups: any) {
  return groups?.map((list: any) => ({
    label: list.name,
    value: list.id,
  }));
}

export function mapRoles(roles: RoleInterface[]): dataInterface[] {
  return roles?.map((role: RoleInterface) => ({
    label: role.name || "",
    value: role.id || "",
  }));
}

export function checkRolePermission(
  permissions: userRolesPermissions | null,
  permissionToCheck: string
) {
  if (permissions?.admin) {
    return true;
  }
  return permissions?.roles?.includes?.(permissionToCheck);
}

export function checkMemberPermission(
  permissions: userRolesPermissions | null,
  permissionToCheck: string
) {
  if (permissions?.admin) {
    return true;
  }
  return permissions?.member?.includes?.(permissionToCheck);
}
export function checkTimeProfilePermission(
  permissions: userRolesPermissions | null,
  permissionToCheck: string
) {
  if (permissions?.admin) {
    return true;
  }
  return permissions?.timeProfile?.includes?.(permissionToCheck);
}
