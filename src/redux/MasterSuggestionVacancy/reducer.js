import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    searchSuggestionVacancy:{
        suggestionVacancyName:'',
        criteriaSection:'',
        primaryCriteria:''
    },
    formSuggestionVacancy:{
        suggestionVacancyId:0,
        suggestionVacancyName:'',
        criteria:[
            {
                sectionId:'',
                criteriaId:''
            }
        ]
    },
    sourceTable:[
        {
            suggestionVacancyId: 1,
            suggestionVacancyNam: "Hallo",
            primaryCriteria: "1",
            active: true
        }
    ],
    sourceSuggestionVacancy:{
        criteriaSection:[],
        primaryCriteria:[]
    }
}

export default function (state = initState, action){
    switch (action.type) {
        case types.MASTER_SUGGESTION_VACANCY_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_HANDLE_STATE_SEARCH:{
            return{
                ...state,
                searchSuggestionVacancy:{
                    ...state.searchSuggestionVacancy,
                    [action.property]: action.value
                }
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_INIT_STATE_SEARCH:{
            return{
                ...state,
                searchSuggestionVacancy:{
                    ...initState.searchSuggestionVacancy
                }
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_HANDLE_STATE_FORM:{
            return{
                ...state,
                formSuggestionVacancy:{
                    ...state.formSuggestionVacancy,
                    [action.property]: action.value
                }
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_INIT_STATE_FORM:{
            return{
                ...state,
                formSuggestionVacancy:{
                    ...initState.formSuggestionVacancy
                }
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_MASTER_DATA_SUCCESS:{
            return{
                ...state,
                sourceSuggestionVacancy:{
                    ...state.sourceSuggestionVacancy,
                    ...action.data
                }
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_FETCH_SEARCH_SUCCESS:{
            return{
                ...state,
                sourceTable: action.data.suggestionVacancyList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_FETCH_DELETE:{
            return{
                ...state
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_FETCH_DETAIL_SUCCESS:{
            return{
                ...state,
                formSuggestionVacancy: {
                    ...state.formSuggestionVacancy,
                    ...action.data
                }
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_FETCH_EDIT:{
            return{
                ...state
            }
        }
        case types.MASTER_SUGGESTION_VACANCY_FETCH_SUBMIT:{
            return{
                ...state
            }
        }
        default:
            return{
                ...state
            }
    }
}