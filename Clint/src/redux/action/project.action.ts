import {
  GroupInterface,
  ProjectOverviewInterface,
  RoleInterface,
} from "constants/interfaces/project.interface";
import configs, {
  CLOSE_ROLE_DRAWER,
  CREATE_PROJECT,
  CREATE_ROLES,
  GET_AVAILABLE_PROJECT_USERS,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
  GET_ROLES,
  OPEN_GROUP_DRAWER,
  OPEN_FILE_DRAWER,
  OPEN_ROLE_DRAWER,
  SET_PROJECT_OVERVIEW,
  SET_ROLE,
  SET_SELECTED_DATE,
  SET_SELECTED_PROJECT,
  SET_SELECTED_STATUS,
  CLOSE_GROUP_DRAWER,
  CREATE_GROUP,
  GET_GROUP,
  CLOSE_DOCUMENT_DRAWER,
  OPEN_DOCUMENT_DRAWER,
  GET_FOLDER,
  CREATE_FOLDER,
  CREATE_MEMBER,
  GET_MEMBER,
  UPDATE_MEMBER,
  GET_FOLDER_FILES,
  UPLOAD_FILE_TO_FOLDER,
  UPDATE_PROJECT,
  SET_SELECTED_ROLE,
  GET_ROLES_BY_ID,
  UPDATE_ROLE,
  SET_SELECTED_GROUP,
  GET_GROUP_BY_ID,
  UPDATE_GROUP,
  SET_GROUP,
  CREATE_NEW_PROFILE,
  GET_PROJECT_PROFILE,
  CLOSE_TIME_PROFILE_DRAWER,
  OPEN_TIME_PROFILE_DRAWER,
  SET_SELECTED_TIME_PROFILE,
  GET_TIME_PROFILE_BY_ID,
  UPDATE_TIME_PROFILE,
  GET_FILE,
  GET_STATUS,
  SET_SEARCH_PROJECT,
  CREATE_PROFILE_WORK,
  GET_NEW_WORK,
  DELETE_PROJECT,
  SET_SELECTED_WORK,
  CLOSE_WORK_DRAWER,
  DELETE_WORK,
  OPEN_WORK_DRAWER,
  GET_WORK_BY_ID,
  UPDATE_WORK,
  DELETE_MEMBER,
  GET_PERMISSIONS,
  SET_SELECTED_USER,
  UPDATE_PROJECT_PICTURE,
  DELETE_GROUP,
  DELETE_ROLE,
  CLOSE_MEMBER_DRAWER,
  OPEN_MEMBER_DRAWER,
  GET_AVAILABLE_PROJECT_MEMBERS,
  CLOSE_FILE_VIEW_DRAWER,
  OPEN_FILE_VIEW_DRAWER,
  SELECTED_FILE_URL,
  GET_GROUP_MEMBERS,
  SELECTED_FILE_TYPE,
  GET_GROUP_USERS,
  ADD_REMOVE_FOLDER_USER,
} from "../../config/project.config";
import { createAction } from "./action";

const projectActions = {
  openDrawer: () => {
    return {
      type: configs.OPEN_DRAWER,
    };
  },
  closeDrawer: () => {
    return {
      type: configs.CLOSE_DRAWER,
    };
  },
  setMenue: (id: number) => {
    return {
      type: configs.SET_MENUE,
      payload: id,
    };
  },
  setProjectOverview: (projectOverview: ProjectOverviewInterface) => {
    return {
      type: SET_PROJECT_OVERVIEW,
      payload: projectOverview,
    };
  },
  setRole: (role: RoleInterface) => {
    return {
      type: SET_ROLE,
      payload: role,
    };
  },
  setSelectedFileUrl: (url: any) => {
    return {
      type: SELECTED_FILE_URL,
      payload: url,
    };
  },
  setSelectedFileType: (type: any) => {
    return {
      type: SELECTED_FILE_TYPE,
      payload: type,
    };
  },
  setGroup: (group: GroupInterface) => {
    return {
      type: SET_GROUP,
      payload: group,
    };
  },

  setSelectedProject: (projectId: string | null) => {
    return {
      type: SET_SELECTED_PROJECT,
      payload: projectId,
    };
  },
  setSelectedRole: (roleId: string | null) => {
    return {
      type: SET_SELECTED_ROLE,
      payload: roleId,
    };
  },

  setSelectedGroup: (groupId: string | null) => {
    return {
      type: SET_SELECTED_GROUP,
      payload: groupId,
    };
  },

  getFolderFiles: (folderId: string | null) => {
    return {
      type: GET_FOLDER_FILES,
      payload: folderId,
    };
  },

  setSelectedStatus: (status: string) => {
    return {
      type: SET_SELECTED_STATUS,
      payload: status,
    };
  },
  setSelectedDate: (date: string) => {
    return {
      type: SET_SELECTED_DATE,
      payload: date,
    };
  },
  setSearchProject: (findProject: string) => {
    return {
      type: SET_SEARCH_PROJECT,
      payload: findProject,
    };
  },
  setSelectedUser: (selectedUserId: string | null) => {
    return {
      type: SET_SELECTED_USER,
      payload: selectedUserId,
    };
  },
  setSelectedwork: (id: string | null) => {
    return {
      type: SET_SELECTED_WORK,
      payload: id,
    };
  },

  openProjectRole: () => {
    return {
      type: OPEN_ROLE_DRAWER,
    };
  },

  closeProjectRole: () => {
    return {
      type: CLOSE_ROLE_DRAWER,
    };
  },
  openProjectGroup: () => {
    return {
      type: OPEN_GROUP_DRAWER,
    };
  },
  openProjectFile: () => {
    return {
      type: OPEN_FILE_DRAWER,
    };
  },
  closeProjectGroup: () => {
    return {
      type: CLOSE_GROUP_DRAWER,
    };
  },
  openFileViewDrawer: () => {
    return {
      type: OPEN_FILE_VIEW_DRAWER,
    };
  },
  closeFileViewDrawer: () => {
    return {
      type: CLOSE_FILE_VIEW_DRAWER,
    };
  },
  openProjectMemberDrawer: () => {
    return {
      type: OPEN_MEMBER_DRAWER,
    };
  },
  closeProjectMemberDrawer: () => {
    return {
      type: CLOSE_MEMBER_DRAWER,
    };
  },

  openProjectDocuments: () => {
    return {
      type: OPEN_DOCUMENT_DRAWER,
    };
  },
  closeProjectDocuments: () => {
    return {
      type: CLOSE_DOCUMENT_DRAWER,
    };
  },

  closeTimeProfileDrawer: () => {
    return {
      type: CLOSE_TIME_PROFILE_DRAWER,
    };
  },
  openTimeProfileDrawer: () => {
    return {
      type: OPEN_TIME_PROFILE_DRAWER,
    };
  },
  closeWorkDrawer: () => {
    return {
      type: CLOSE_WORK_DRAWER,
    };
  },
  openWorkDrawer: () => {
    return {
      type: OPEN_WORK_DRAWER,
    };
  },

  setSelectedTimeProfile: (timeProfileId: string | null) => {
    return {
      type: SET_SELECTED_TIME_PROFILE,
      payload: timeProfileId,
    };
  },
};

export const getProjectsWithPagination = createAction(
  GET_PROJECTS_WITH_PAGINATION
);
export const getAllProjects = createAction(GET_PROJECTS);
export const getAllProjectMembers = createAction(GET_PROJECTS_MEMBERS);
export const createProject = createAction(CREATE_PROJECT);
export const getAvailableProjectUsers = createAction(
  GET_AVAILABLE_PROJECT_USERS
);
export const getProjectDetail = createAction(GET_PROJECT_DETAIL);
export const getRoles = createAction(GET_ROLES);
export const getRolesById = createAction(GET_ROLES_BY_ID);

export const createRole = createAction(CREATE_ROLES);
export const createGroup = createAction(CREATE_GROUP);
export const getGroup = createAction(GET_GROUP);
export const getGroupById = createAction(GET_GROUP_BY_ID);

export const getFolder = createAction(GET_FOLDER);
export const createFolder = createAction(CREATE_FOLDER);
export const createMember = createAction(CREATE_MEMBER);
export const getMember = createAction(GET_MEMBER);
export const deleteMember = createAction(DELETE_MEMBER);

export const updateMember = createAction(UPDATE_MEMBER);
export const getFolderFiles = createAction(GET_FOLDER_FILES);
export const uploadFileToFolder = createAction(UPLOAD_FILE_TO_FOLDER);
export const updateProject = createAction(UPDATE_PROJECT);
export const updateRole = createAction(UPDATE_ROLE);
export const updateGroup = createAction(UPDATE_GROUP);

export const createNewProfile = createAction(CREATE_NEW_PROFILE);
export const getProjectProfile = createAction(GET_PROJECT_PROFILE);
export const getTimeProfileById = createAction(GET_TIME_PROFILE_BY_ID);
export const updateTimeProfile = createAction(UPDATE_TIME_PROFILE);
export const getFile = createAction(GET_FILE);
export const getStatus = createAction(GET_STATUS);
export const createProfileWork = createAction(CREATE_PROFILE_WORK);
export const getNewWork = createAction(GET_NEW_WORK);
export const deleteProject = createAction(DELETE_PROJECT);
export const getWorkById = createAction(GET_WORK_BY_ID);
export const updateWork = createAction(UPDATE_WORK);
export const deleteWork = createAction(DELETE_WORK);
export const getPermissions = createAction(GET_PERMISSIONS);
export const updateProjectPicture = createAction(UPDATE_PROJECT_PICTURE);
export const deleteGroup = createAction(DELETE_GROUP);
export const deleteRole = createAction(DELETE_ROLE);
export const getGroupMembers = createAction(GET_GROUP_MEMBERS);
export const getGroupUsers = createAction(GET_GROUP_USERS);
export const addRemoveFolderUser = createAction(ADD_REMOVE_FOLDER_USER);
export const getAvailableProjectMembers = createAction(
  GET_AVAILABLE_PROJECT_MEMBERS
);

export default projectActions;
