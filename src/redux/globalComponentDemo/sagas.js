import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import * as types from './../../constants/ActionType'
import { setLoader } from './action'
import { MessageError, MessageSuccess, MessageInfo } from '../../components/messageBox'
import { GET, POST, PUT, DELETE } from './../../constants/API'
import { Header } from './../../constants/Header'
import Config from './../../service/config'
import Endpoint from './../../service/endpoint'

export function* getDataInit(){
    try {
        yield put(setLoader(true))
        
        
        yield put(setLoader(false))
    } catch (error) {
        MessageError(error)
        yield put(setLoader(false))
    }
}


export default function* rootSaga() {
    yield all([
        takeEvery(types.GET_DATA_INIT, getDataInit)
    ])
}