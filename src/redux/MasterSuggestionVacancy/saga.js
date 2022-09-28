import { all, takeLatest, call, put, select } from "redux-saga/effects";
import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE, PUT } from "../../service/api";
import { messages } from "../../components/messageBox"
import { Header } from "../../service/header";

const getStateMasterSuggestionVacancy = state => state.MasterSuggestionVacancy;

export function* getMasterData(){
    try {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: true })
        let body = {
            MasterData:[
                {
                    ObjectName: "CreteriaSection"
                },
                {
                    ObjectName: "PrimaryCriteria"
                }
            ]
        }
        const resMasterData = yield call(POST, Config.API_MASTERDATA, body, { headers: Header() })
        if(resMasterData.Acknowledge === 1){
            let data = {
                criteriaSection: resMasterData.criteriaSectionList.map(x => ({...x, id: x.sectionId, name: x.sectionName })),
                PrimaryCriteria: resMasterData.primarySectionList.map(x => ({...x, id: x.CriteriaId, name: x.criteriaName })),
            }

            yield put({ type: types.MASTER_SUGGESTION_VACANCY_MASTER_DATA_SUCCESS, data: data})
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
        }else{
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
            messages("Error", resMasterData.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
    }
}

export function* fetchSearch(){
    try {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: true })
        let stateMasterSuggestVacancy = yield select(getStateMasterSuggestionVacancy)
        let search = stateMasterSuggestVacancy.searchSuggestionVacancy

        let body = {
            // pageNo: param.data.pageNo,
            // pageSize: param.data.pageSize,
            suggestionVacancyName: search.suggestionVacancyName,
            criteriaSection: search.criteriaSection,
            primaryCriteria: search.primaryCriteria
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.MASTER_SUGGEST_VACANCY_LIST_POST, body, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_FETCH_SEARCH_SUCCESS, data: response })
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
        }else{
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
            messages("Info", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
    }
}

export function* fetchSubmit(param){
    try {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: true })
        let stateMasterSuggestVacancy = yield select(getStateMasterSuggestionVacancy)
        let form = stateMasterSuggestVacancy.formSuggestionVacancy

        let body = {
            suggestionVacancyName: form.suggestionVacancyName,
            criteriaList: form.criteria
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.MASTER_SUGGEST_VACANCY_CREATE_POST, body, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
            param.history.goBack()
        }else{
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
            messages("Info", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
    }
}

export function* fetchActivate(param){
    try {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: true })
        let stateMasterSuggestVacancy = yield select(getStateMasterSuggestionVacancy)
        let form = stateMasterSuggestVacancy.formSuggestionVacancy

        let body = {
            suggestionVacancyName: form.suggestionVacancyName,
            criteriaList: form.criteria
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.MASTER_SUGGEST_VACANCY_ACTIVATE_POST, body, { headers: Header() });
        if(response.Acknowledge === 1){
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
            param.history.goBack()
        }else{
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
            messages("Info", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
    }
}

export function* fetchDetail(param){
    try {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: true })
        let stateMasterSuggestVacancy = yield select(getStateMasterSuggestionVacancy)

        let body = {
            id: param.id
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.MASTER_SUGGEST_VACANCY_DETAILS_POST, body, { headers: Header() });
        if(response.Acknowledge === 1){
            let data = {
                suggestionVacancyId: response.suggestionVacancyId,
                suggestionVacancyName: response.suggestionVacancyName,
                criteria: response.criteriaList
            }
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_FETCH_DETAIL_SUCCESS, data })
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
        }else{
            yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
            messages("Info", response.Message, "error", false);
        }
    } catch (error) {
        yield put({ type: types.MASTER_SUGGESTION_VACANCY_SET_LOADER, value: false })
    }
}

export default function* rootSaga(){
    yield all([
        takeLatest(types.MASTER_SUGGESTION_VACANCY_FETCH_MASTER_DATA, getMasterData),
        takeLatest(types.MASTER_SUGGESTION_VACANCY_FETCH_SEARCH, fetchSearch),
        takeLatest(types.MASTER_SUGGESTION_VACANCY_FETCH_SUBMIT, fetchSubmit),
        takeLatest(types.MASTER_SUGGESTION_VACANCY_FETCH_ACTIVATE, fetchActivate),
        takeLatest(types.MASTER_SUGGESTION_VACANCY_FETCH_DETAIL, fetchDetail),
        
        
    ]);
}