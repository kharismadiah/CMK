import { 
  SET_LOADER,
  
  INIT_FORM_SEARCH_USER,
  INIT_FORM_USER,

  HANDLE_STATE_USER,
  HANDLE_STATE_FORM_USER,
  HANDLE_STATE_FORM_JOB_CODE,

  GET_USER_LIST_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_LOAD_USER_SUCCESS,
  GET_USER_SEARCH_SUCCESS,
  GET_REGION_COMPANY_SUCCESS,

  RESET_PASSWORD_SUCCESS
} from "../types";
import actions from "../../customApp/redux/githubSearch/actions";

const initState = {
  isLoading: false,
  isDisabled: false,
  isResetPass: false,
  haha: '',
    
  branch:'',
  fullName:'',
  email:'',
  emailDelete:'',
  phone:'',
  ReCAPTCHA: '',

  pageNo: 1,
  pageSize: 10,
  totalRows: 0,
  totalRowsMaster: 0,

  regionList:[],
  companyList:[],
  branchList:[],
  jobCodeList:[],
  userList:[],
  userListMaster:[],
  roleList:[],
  loadUserCreationForm:[],

  userId:'',
  formUser:{
    email:'',
    npk:'',
    companyId:'',
    jobDescription:'',
    fullName:'',
    jobCodeId:'',
    branchId:'',
    regionId:'',
    phone:'',
    roleName:'',
    // region:''
  }
};

export default (state = initState, action) => {

  switch (action.type) {
    case SET_LOADER: {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case INIT_FORM_USER:{
      return{
        ...state,
        formUser:{
          ...state.formUser,
          email: null,
          npk: null,
          companyId: null,
          jobDescription:null,
          fullName: null,
          jobCodeId: null,
          branchId: null,
          regionId:null,
          phone: null,
          roleName: null,
        }
      }
    }
    case INIT_FORM_SEARCH_USER:{
      return{
        ...state,
        branch: '',
        fullName: '',
        email: '',
        phone: ''
      }
    }
    case HANDLE_STATE_USER:{
      return {
        ...state,
        [action.field]: action.value
      }
    }
    case HANDLE_STATE_FORM_USER:{
      return{
        ...state,
        formUser: {...state.formUser, [action.field]: action.value}
      }
    }
    case HANDLE_STATE_FORM_JOB_CODE:{
      let jobCodeId = action.value
      let jobCode = state.jobCodeList.find(obj => jobCodeId === obj.id)
      return{
        ...state,
        formUser:{
          ...state.formUser,
          [action.field] : action.value,
          jobDescription : jobCode.value
        }
      }
    }
    case GET_USER_LIST_SUCCESS:{
      return{
        ...state,
        userList: action.value
      }
    }
    case GET_USER_DETAILS_SUCCESS:{
      let data = action.value
      return{
        ...state,
        userId: data.UserId,
        formUser:{
          ...state.formUser,
          email: data.Email,
          npk: data.Npk,
          companyId: data.CompanyId,
          fullName: data.FullName,
          jobCodeId: data.JobCodeId,
          regionId: data.RegionId,
          phone: data.Phone,
          branchId: data.BranchId
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}



