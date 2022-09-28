import * as types from "../types";
  
  const initState = {
    isLoading: false,
    isDisabled: false,
    isEdit: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,

    formSearch: {
      name:'',
      description:''
    },
    formAssigneeType: {
      assigneeTypeId:'',
      assigneeTypeCode:'',
      name:'',
      description:''
    },
    source:{
      assigneeTypeList:[]
    },
    listAssigneType:[]
  };
  
  export default function AssigneeTypeReducer(state = initState, action) {
    switch (action.type) {
      case types.ASSIGNEE_TYPE_SET_LOADER: {
        return {
          ...state,
          isLoading: action.value
        }
      }
      case types.ASSIGNEE_TYPE_MATER_DATA_SUCCESS: {
        return {
          ...state,
          source:{
            ...state.source,
            assigneeTypeList: action.payload.assigneeTypeList
          }
        }
      }
      case types.ASSIGNEE_TYPE_HANDLE_STATE_SEARCH: {
        return {
          ...state,
          formSearch: {
            ...state.formSearch,
            [action.property]: action.value
          }
        }
      }
      case types.ASSIGNEE_TYPE_HANDLE_STATE_PAGINATION: {
        return {
          ...state,
          pageNo: action.pageNo,
          pageSize: action.pageSize,
          totalRows: action.totalRows,
        }
      }
      case types.ASSIGNEE_TYPE_CLEAR_FORM_SEARCH: {
        return {
          ...state,
          formSearch: {
            ...initState.formSearch
          }
        }
      }
      case types.ASSIGNEE_TYPE_HANDLE_STATE_FORM: {
        return {
          ...state,
          formAssigneeType: {
            ...state.formAssigneeType,
            [action.property]: action.value
          }
        }
      }
      case types.ASSIGNEE_TYPE_CLEAR_FORM: {
        return {
          ...state,
          formAssigneeType: {
            assigneeTypeCode: '',
            name: '',
            description: ''
          },
        }
      }
      case types.ASSIGNEE_TYPE_GET_DETAIL_SUCCESS: {
        return {
          ...state,
          formAssigneeType: {
            ...action.payload
          }
        }
      }
      case types.ASSIGNEE_TYPE_HANDLE_STATE: {
        return {
          ...state,
          [action.property]: action.value
        }
      }
      case types.ASSIGNEE_TYPE_FETCH_SEARCH_SUCCESS: {
        return {
          ...state,
          listAssigneType: action.value.AssigneeTypeList,
          totalRows: action.value.TotalRecords
        }
      }
      default:
        return {
          ...state
        }
    }
  }