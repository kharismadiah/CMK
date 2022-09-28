import { all, takeLatest, call, fork, put, select, take } from "redux-saga/effects";
import { messages, success, deleteData } from "../../components/messageBox"

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import * as types from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST, GET, DELETE, DELETE2 } from "../../service/api";
import { HeaderToken, Header, HeaderClient } from "../../service/header";


const getStatePosition = state => state.Position;

export function * masterDataPosition(){
    try{
        yield put({ type: types.POSITION_SET_LOADER, value: true})
        let bodyMasterDate = {
            MasterData : [
                { "ObjectName": "Grade" },
                { "ObjectName": "JobTitle" }
            ]
        }
        const resMasterData = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, bodyMasterDate, { headers: Header() });
        if(resMasterData.Acknowledge == 1){
            let dataMaster = {
                sourceGradeList: resMasterData.GradeList.map(x => ({...x, id: x.Id, name: x.GradeName})),
                sourceJobTitleList: resMasterData.JobTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
            }
            yield put({ type: types.POSITION_MASTER_DATA_SUCCESS, value: dataMaster})
        }
        yield put({ type: types.POSITION_SET_LOADER, value: false})
    } catch(error){
        yield put({ type: types.POSITION_SET_LOADER, value: false})
    }
}

export function* fetchSearch(param) {
    try {
        yield put({ type: types.POSITION_SET_LOADER, value: true})
        let statePosition = yield select(getStatePosition)
        yield put({ 
            type: types.POSITION_HANDLE_PAGINATION,
            pageNo: param.property.pageNo,
            pageSize: param.property.pageSize,
            totalRows: param.property.totalRows
          })
        let bodyMasterDate = {
            MasterData:[
                {"ObjectName": "Grade"},
                { "ObjectName": "JobTitle" }
            ]
        }
        const resMasterData = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, bodyMasterDate, { headers: Header() });

        if(resMasterData.Acknowledge == 1){
            let dataMaster = {
                sourceGradeList: resMasterData.GradeList.map(x => ({...x, id: x.Id, name: x.GradeName})),
                sourceJobTitleList: resMasterData.JobTitleList.map(x => ({ ...x, id: x.Id, name: x.Name })),
            }
            yield put({ type: types.POSITION_MASTER_DATA_SUCCESS, value: dataMaster})

            let body = {
                pageNo: param.property.pageNo,
                pageSize: 10,
                PositionName: statePosition.searchPosition.positionName,
                Grade: statePosition.searchPosition.grade,
                Level: statePosition.searchPosition.level,
                positionCode: statePosition.searchPosition.positionCode,
            }
            const response = yield call(POST, Config.BASE_URL + Endpoint.POSITION_LIST_POST, body, { headers: Header() });
    
            if(response.Acknowledge === 1){
                yield put({ type: types.POSITION_FETCH_SEARCH_SUCCESS, value: response.PositionList})
                yield put({ type: types.POSITION_HANDLE_STATE, property:"totalRows", value: response.TotalRecords})
                yield put({ type: types.POSITION_SET_LOADER, value: false})
            }

        }else{

            yield put({ type: types.POSITION_SET_LOADER, value: false})
        }
    } catch (error) {
        yield put({ type: types.POSITION_SET_LOADER, value: false})
    }
}

export function* postForm(params){
    try {
        yield put({ type: types.POSITION_SET_LOADER, value: true})
        let statePosition = yield select(getStatePosition)
        
        if(!statePosition.isEdit){
            let body = {
                PositionCode: "",
                PositionName: statePosition.formPosition.positionName,
                PositionDesc: statePosition.formPosition.positionDesc,
                Grade: statePosition.formPosition.grade,
                Level: statePosition.formPosition.level
            }
            const response = yield call(POST, Config.BASE_URL + Endpoint.POSITION_CREATE_POST, body, { headers: Header() });
            if (response.Acknowledge == 1) {
                yield put({ type: types.POSITION_SET_LOADER, value: false})
                messages("Success", 'Data has been saved', "success", false);
                params.history.goBack()
            }else{
                messages("Error", response.Message, "error", false);
            }
        }else{
            let body = {
                PositionCode: statePosition.formPosition.positionCode,
                PositionName: statePosition.formPosition.positionName,
                PositionDesc: statePosition.formPosition.positionDesc,
                Grade: statePosition.formPosition.grade,
                Level: statePosition.formPosition.level
            }
            let id = statePosition.formPosition.positionId
            const response = yield call(POST, Config.BASE_URL + Endpoint.POSITION_UPDATE_POST + id, body, { headers: Header() });
            if (response.Acknowledge == 1) {
                yield put({ type: types.POSITION_SET_LOADER, value: false})
                messages("Success", 'Data has been saved', "success", false);
                params.history.goBack()
            }else{
                messages("Error", response.Message, "error", false);
            }
        }
        yield put({ type: types.POSITION_SET_LOADER, value: false})
    } catch (error) {
        yield put({ type: types.POSITION_SET_LOADER, value: false})
    }
}

export function* getDetailForm(params){
    try {
        yield put({ type: types.POSITION_SET_LOADER, value: true})
        const response = yield call(GET, Config.BASE_URL + Endpoint.POSITION_DETAIL_GET + params.value, { headers: Header() });

        if (response.Acknowledge == 1) {
            let _dataForm = {
                positionId: response.PositionId,
                positionCode: response.PositionCode,
                positionName: response.PositionName,
                positionDesc: response.PositionDesc,
                grade: response.GradeID,
                level: response.Level,
              }
            yield put({ type: types.POSITION_GET_DETAIL_FORM_SUCCESS, payload: _dataForm })
            yield put({ type: types.POSITION_SET_LOADER, value: false})
        }
        
    } catch (error) {
        yield put({ type: types.POSITION_SET_LOADER, value: false})
    }
}

export function* deletePosition(params){
    try {
        yield put({ type: types.POSITION_SET_LOADER, value: true})
        const response = yield call(DELETE2, Config.BASE_URL + Endpoint.POSITION_DEL + params.value, { headers: Header() });

        if (response.Acknowledge == 1) {
            messages("Success", response.Message, "success", false);
            yield put({ type: types.POSITION_SET_LOADER, value: false})
            window.location.href = `${process.env.PUBLIC_URL}/dashboard/Position`
        }
    } catch (error) {
        yield put({ type: types.POSITION_SET_LOADER, value: false})
    }
}


export default function* rootSaga() {
    yield all([
        takeLatest(types.POSITION_FETCH_SEARCH, fetchSearch),
        takeLatest(types.POSITION_SUBMIT_FORM, postForm),
        takeLatest(types.POSITION_GET_DETAIL_FORM, getDetailForm),
        takeLatest(types.POSITION_DELETE, deletePosition),
        takeLatest(types.POSITION_MASTER_DATA, masterDataPosition),
        
    ]);
}