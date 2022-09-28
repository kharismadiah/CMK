import * as types from "../types";

const initState = {
  isLoading: false,
  pageNo: 1,
  pageSize: 25,
  totalRows: 25,
  show: {
    groupEvent: null,
    eventName: null,
    company: null,
    position: null,
    vacancy: null,
  },
  search: {
    applicantEmail: null,
    status: null,
    messageError: null,
  },
  source: {
    groupEvent: [],
    eventName: [],
    company: [],
    position: [],
    vacancy: [],
  },
  tableData: [],
  listTable: [],
  onResetSearchFlag: false,
  filterSource: [],
};

export default function(state = initState, action) {
  switch (action.type) {
    case types.OL_INTEGRATION_SET_LOADER: {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    case types.OL_INTEGRATION_MATER_DATA_SUCCESS: {
      return {
        ...state,
        source: {
          groupEvent: action.payload.groupEvent,
          eventName: action.payload.eventName,
          company: action.payload.company,
          position: action.payload.position,
          vacancy: action.payload.vacancy,
        },
      };
    }
    case types.OL_INTEGRATION_HANDLE_STATE_SHOW: {
      return {
        ...state,
        show: {
          ...state.show,
          [action.property]: action.value,
        },
      };
    }
    case types.OL_INTEGRATION_HANDLE_STATE_SEARCH: {
      return {
        ...state,
        search: {
          ...state.search,
          [action.property]: action.value,
        },
      };
    }
    case types.OL_INTEGRATION_CLEAR_SEARCH: {
      return {
        ...state,
        search: {
          ...initState.search,
        },
        listTable: state.tableData,
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        totalRows: state.tableData.length,
      };
    }
    case types.OL_INTEGRATION_CLEAR_SHOW: {
      return {
        ...state,
        show: {
          ...initState.show,
        },
        filterSource: initState.filterSource,
      };
    }
    case types.OL_INTEGRATION_HANDLE_STATE_PAGINATION: {
      return {
        ...state,
        pageNo: action.pageNo,
        pageSize: action.pageSize,
        totalRows: action.totalRows,
      };
    }
    case types.OL_INTEGRATION_FETCH_SHOW_SUCCESS: {
      // console.log(
      //   "🚀 ~ file: reducer.js ~ line 96 ~ function ~ action",
      //   action
      // );
      // debugger;
      return {  
        ...state,
        tableData: action.payload,
        listTable: action.payload,
      };
    }
    case types.OL_INTEGRATION_FETCH_SEARCH_SUCCESS: {
      return {
        ...state,
        listTable: action.data,
      };
    }
    case types.OL_INTEGRATION_HANDLE_STATE_GLOBAL: {
      return {
        ...state,
        [action.property]: action.value
      }
    }
    case types.OL_INTEGRATION_HANDLE_EVENTNAME_CHANGE: {
      return {
        ...state,
        show:{
          ...state.show,
          company: null,
          position: null,
          vacancy: null,
        }
      }
    }
    default:
      return {
        ...state,
      };
  }
}
