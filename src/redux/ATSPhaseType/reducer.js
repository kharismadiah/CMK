import {
  ATSPHASETYPE_SET_LOADER,
  ATSPHASETYPE_MATER_DATA_SUCCESS,
  ATSPHASETYPE_HANDLE_STATE_SEARCH,
  ATSPHASETYPE_HANDLE_STATE_PAGINATION,
  ATSPHASETYPE_CLEAR_FORM_SEARCH,
  ATSPHASETYPE_HANDLE_STATE_FORM,
  ATSPHASETYPE_HANDLE_STATE,
  ATSPHASETYPE_FETCH_SEARCH_SUCCESS,
  ATSPHASETYPE_CLEAR_FORM,
  ATSPHASETYPE_GET_DETAIL_SUCCESS
} from "../types";

const initState = {
  isLoading: false,
  isDisabled: false,
  isEdit: false,
  pageNo: 1,
  pageSize: 10,
  totalRows: 10,
  formSearch: {
    phaseTypeCode: '',
    phaseType: '',
    description: '',
  },
  formATSPhaseType: {
    phaseTypeCode: '',
    phaseType: '',
    description: '',
    atsPhase: [
      {
        phase: '',
        atsPhase: '',
        applicantPhase: ''
      }
    ],
  },
  phaseTypeList: [],
  sourcePhase: [
    {
      id: 1,
      name: 1
    }
  ],
  sourceATSPhase: [],
  sourceApplicantPhase: [
    {
      id: 1,
      name: 1
    }
  ],
};

export default function VacancyReducer(state = initState, action) {
  switch (action.type) {
    case ATSPHASETYPE_SET_LOADER: {
      return {
        ...state,
        isLoading: action.value
      }
    }
    case ATSPHASETYPE_MATER_DATA_SUCCESS: {
      return {
        ...state,
        phaseTypeList: action.payload.phaseTypeList, //ATSTypeList
        sourceATSPhase: action.payload.sourceATSPhase, //ATSPhaseTypeList
        sourceApplicantPhase: action.payload.sourceApplicantPhase, //ApplicantPhaseList
      }
    }
    case ATSPHASETYPE_HANDLE_STATE_SEARCH: {
      return {
        ...state,
        formSearch: {
          ...state.formSearch,
          [action.property]: action.value
        }
      }
    }
    case ATSPHASETYPE_HANDLE_STATE_PAGINATION: {
      return {
        ...state,
        pageNo: action.pageNo,
        pageSize: action.pageSize,
        totalRows: action.totalRows,
      }
    }
    case ATSPHASETYPE_CLEAR_FORM_SEARCH: {
      return {
        ...state,
        formSearch: {
          ...initState.formSearch
        }
      }
    }
    case ATSPHASETYPE_HANDLE_STATE_FORM: {
      return {
        ...state,
        formATSPhaseType: {
          ...state.formATSPhaseType,
          [action.property]: action.value
        }
      }
    }
    case ATSPHASETYPE_CLEAR_FORM: {
      return {
        ...state,
        formATSPhaseType: {
          // phaseTypeCode: '',
          phaseType: '',
          description: '',
          atsPhase: [
            {
              phase: '',
              atsPhase: '',
              applicantPhase: ''
            }
          ],
        },
        sourcePhase: [
          {
            id: 1,
            name: 1
          }
        ],
      }
    }
    case ATSPHASETYPE_GET_DETAIL_SUCCESS: {
      return {
        ...state,
        formATSPhaseType: {
          ...action.payload
        }
      }
    }
    case ATSPHASETYPE_HANDLE_STATE: {
      return {
        ...state,
        [action.property]: action.value
      }
    }
    case ATSPHASETYPE_FETCH_SEARCH_SUCCESS: {
      return {
        ...state,
        listATSPhaseType: action.value.atsPhaseTypeList,
        totalRows: action.value.totalRecords
      }
    }
    default:
      return {
        ...state
      }
  }
}