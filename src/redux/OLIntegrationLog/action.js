import * as types from "../types";

export const fetchGetMasterData = () => {
  return {
    type: types.OL_INTEGRATION_FETCH_MATER_DATA,
  };
};
export const handleStateShow = (property, value) => {
  return {
    type: types.OL_INTEGRATION_HANDLE_STATE_SHOW,
    property,
    value,
  };
};
export const handleStateSearch = (property, value) => {
  return {
    type: types.OL_INTEGRATION_HANDLE_STATE_SEARCH,
    property,
    value,
  };
};
export const handleClearSearch = () => {
  return {
    type: types.OL_INTEGRATION_CLEAR_SEARCH,
  };
};
export const handleClearShow = () => {
  return {
    type: types.OL_INTEGRATION_CLEAR_SHOW,
  };
};
export const fetchShow = (value) => {
  return {
    type: types.OL_INTEGRATION_FETCH_SHOW,
    value,
  };
};
export const fetchSearch = (tableData, searchParam) => {
  return {
    type: types.OL_INTEGRATION_FETCH_SEARCH,
    tableData,
    searchParam,
  };
};
export const fetchCheck = (value,successAction) => {
  return {
    type: types.OL_INTEGRATION_FETCH_RECHECK,
    value,
    successAction,
  };
};
export const fetchCheckAll = (tableData,successAction) => {
  return {
    type: types.OL_INTEGRATION_FETCH_RECHECK_ALL,
    tableData,
    successAction,
  };
};
export const fetchRegenerateFailed = (value,successAction) => {
  return {
    type: types.OL_INTEGRATION_FETCH_REGENERATE_FAILED,
    value,
    successAction,
  };
};
export const fetchRegenerateFailedAll = (tableData,successAction) => {
  return {
    type: types.OL_INTEGRATION_FETCH_REGENERATE_FAILED_ALL,
    tableData,
    successAction,
  };
};

export const handlePaginationState = (pageNo, pageSize, totalRows) => {
  return {
    type: types.OL_INTEGRATION_HANDLE_STATE_PAGINATION,
    pageNo,
    pageSize,
    totalRows
  }
}

export const handleStateGlobal = (property, value) => {
  return {
    type: types.OL_INTEGRATION_HANDLE_STATE_GLOBAL,
    property,
    value
  }
}

export const handleEventNameChange = () => {
  return{
    type: types.OL_INTEGRATION_HANDLE_EVENTNAME_CHANGE,
  }
}