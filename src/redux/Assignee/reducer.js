import * as types from "../types";
  
  const initState = {
    isLoading: false,
    isDisabled: false,
    isEdit: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,

    formSearch: {
      assigneeType:'',
      username:''
    },
    formAssignee: {
      assigneeId:'',
      assigneeCode:'',
      assigneeTypeId:'',
      // assigneeType:'',
      userProfileId: '',
      userName: '',
      name:'',
      email:''
    },
    source:{
        assigneeTypeList:[],
        userProfile:[]
    },
    listAssignee:[]
  };
  
  export default function AssigneeReducer(state = initState, action) {
    switch (action.type) {
      case types.ASSIGNEE_SET_LOADER: {
        return {
          ...state,
          isLoading: action.value
        }
      }
      case types.ASSIGNEE_INIT_STATE_SEARCH: {
        return {
            ...state,
            formSearch: {
                ...initState.formSearch,
            }
        }
      }
      case types.ASSIGNEE_MATER_DATA_SUCCESS: {
        return {
          ...state,
          source:{
            ...state.source,
            assigneeTypeList: action.payload.assigneeTypeList
          }
        }
      }
      case types.ASSIGNEE_HANDLE_STATE_SEARCH: {
        return {
          ...state,
          formSearch: {
            ...state.formSearch,
            [action.property]: action.value
          }
        }
      }
      case types.ASSIGNEE_HANDLE_STATE_PAGINATION: {
        return {
          ...state,
          pageNo: action.pageNo,
          pageSize: action.pageSize,
          totalRows: action.totalRows,
        }
      }
      case types.ASSIGNEE_CLEAR_FORM_SEARCH: {
        return {
          ...state,
          formSearch: {
            ...initState.formSearch
          }
        }
      }
      case types.ASSIGNEE_HANDLE_STATE_FORM: {
        return {
          ...state,
          formAssignee: {
            ...state.formAssignee,
            [action.property]: action.value
          }
        }
      }
      case types.ASSIGNEE_CLEAR_FORM: {
        return {
          ...state,
          formAssignee: {
            assigneeTypeId:'',
            name:'',
            email:''
          },
        }
      }
      case types.ASSIGNEE_GET_DETAIL_SUCCESS: {
        return {
          ...state,
          formAssignee: {
            ...action.payload
          }
        }
      }
      case types.ASSIGNEE_HANDLE_STATE: {
        return {
          ...state,
          [action.property]: action.value
        }
      }
      case types.ASSIGNEE_FETCH_SEARCH_SUCCESS: {
        return {
          ...state,
          listAssignee: action.value.AssigneeList,
          totalRows: action.value.TotalRecords
        }
      }
      case types.ASSIGNEE_FETCH_USERPROFILE_LIST_SUCCESS:{
        return{
          ...state,
          source:{
            ...state.source,
            userProfile: action.value.userProfile
          }
        }
      }
      default:
        return {
          ...state
        }
    }
  }