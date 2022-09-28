import * as types from "../types";

const initState = {
  isLoading: false,
  pageNo: 1,
  pageSize: 5,
  totalRows: 5,
  filterVacancyList: {
    visible: false,
    serach: "",


    company: [],
    branch: [],

    groupEventList: [], //platform
    eventList: [], //sourcing
    positionList: [],
    activityList: [],
    vacancyStatus: [],


    yoeYearFrom: null,
    yoeMonthFrom: null,
    yoeYearTo: null,
    yoeMonthTo: null,
  },
  listVacancy: [],
  isHome:true,
  ptkId:undefined,
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.RECRUITMENT_PR_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_FILTER: {
            return {
                ...state,
                filterVacancyList: {
                    ...state.filterVacancyList,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_FILTER_SUCCESS: {
            return {
                ...state,
                filterVacancyList: {
                    ...state.filterVacancyList,
                    ...action.data,
                    
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows,
            }
        }
        case types.RECRUITMENT_PR_FETCH_DASHBOARD_SUCCESS: {
            // let phase = {
            //     ATSPhaseId: 8,
            //     ATSPhaseName:"CV Review"
            //   }
            //   let vacancyList = action.data.vacancyList.map((data) =>{
            //     data.PhaseList.push(phase)
            //   })
            return {
                ...state,
                listVacancy: action.data.vacancyList,
                // totalRows: state.isHome?5:action.data.totalRecords
                totalRows: state.isHome && (action.data.totalRecords%10 === 0 || action.data.totalRecords%10 > 5) ? 
                            action.data.totalRecords + 5 : action.data.totalRecords,
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL: {
            return {
                ...state, 
                [action.property]: action.value
            }
        }
        case types.RECRUITMENT_PR_RESET_STATE_FILTER: {
            return {
                ...state,
                filterVacancyList: {...initState.filterVacancyList}
            }
        }
        default:
            return {
                ...state
            }
    }
}  