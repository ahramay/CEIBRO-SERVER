import { ActionInterface } from ".";
import {
  requestFail,
  requestPending,
  requestSuccess,
} from "../../utills/status";
import { GET_PROFILE, LOGIN, LOGOUT } from "../../config/auth.config";
import { REGISTER } from "redux-persist/es/constants";
import { UserInterface } from "constants/interfaces/user.interface";

interface authInterface {
  isLoggedIn: boolean;
  user: UserInterface | null | undefined;
  loginLoading: boolean;
  registerLoading: boolean;
  authSuccessMessage: string | null | undefined;
  authErrorMessage: string | null | undefined;
}

const intialStatue: authInterface = {
  isLoggedIn: false,
  user: null,
  loginLoading: false,
  registerLoading: false,
  authSuccessMessage: "",
  authErrorMessage: "",
};

const AuthReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case requestPending(LOGIN): {
      return {
        ...state,
        loginLoading: true,
      };
    }

    case requestSuccess(LOGIN): {
      localStorage.setItem("tokens", JSON.stringify(action.payload?.tokens));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        loginLoading: false,
      };
    }

    case requestFail(LOGIN): {
      // localStorage.setItem("tokens", JSON.stringify(action.payload?.tokens));
      return {
        ...state,
        loginLoading: false,
      };
    }

    case requestPending(REGISTER): {
      return {
        ...state,
        registerLoading: true,
      };
    }

    case requestSuccess(REGISTER): {
      return {
        ...state,
        registerLoading: false,
      };
    }

    case requestFail(REGISTER): {
      return {
        ...state,
        registerLoading: false,
      };
    }

    case LOGOUT: {
      localStorage.removeItem("tokens");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }

    case requestSuccess(GET_PROFILE): {
      return {
        ...state,
        user: action.payload,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
