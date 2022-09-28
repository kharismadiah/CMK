import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { LOGIN_SUCCESS, LOGOUT, IS_LOADING, GET_ROLE_SUCCESS, HANDLE_STATE_LOGIN } from "../types";

const INIT_STATE = {
  fullName: '',
  roleName: '',
  listRoleName:'',
  RoleDescription: '',
  companySource: '',
  username: '',
  idToken: '',
  expired: '',
  isLoading: false,
  loginData: {
    role: ""
  },
};

const persistConfig = {
  key: "loginData",
  storage: storage,
  whitelist: ["loginData"]
};

export default persistReducer(persistConfig, (state = INIT_STATE, action) => {
  switch (action.type) {
    case HANDLE_STATE_LOGIN:{
      let data = action.value
      if(action.field == "roleName"){
        data = action.value.toLowerCase()
      }
      return{
        ...state,
        [action.field]: data
      }
    }
    case GET_ROLE_SUCCESS:{
      return{
        ...state,
        roles: action.value
      }
    }
    case LOGIN_SUCCESS:
      return { ...state, idToken: action.token, loginData: action.loginData};
    case IS_LOADING:
      return { ...state, isLoading: action.payload };
    case LOGOUT:
      return { ...state };
    default:
      return { ...state };
  }
});
