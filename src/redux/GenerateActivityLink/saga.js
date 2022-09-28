import { all, call, put, select } from 'redux-saga/effects'
import { messages } from '../../components/messageBox'
import appAction from './actions'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, POSTBLOB } from '../../service/api'
import { Header } from '../../service/header'
import { takeLatest } from 'redux-saga'
import * as types from '../types'
import { saveAs } from 'file-saver'

const getRootState = state => state.GenerateActivityLink
// const getStateLogin = state => state.Auth
// const { setLoader } = appAction

export function* fetchGenerateActivityLinkMasterData() {
    try {
        yield put({ type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER, value: true })
        let body = {
            /* it's should be empty object */
        }

        const response = yield call(POST, Config.BASE_URL + Endpoint.GENERATE_ACTIVITY_LINK_MASTER_DATA, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let data = {
                GroupEventList: response.GroupEventList.map(x => ({
                    ...x,
                    id: x.GroupEventId,
                    name: x.GroupEventName
                })),
                EventList: response.EventList.map(x => ({ ...x, id: x.EventId, name: x.EventName })),
                VacancyList: response.VacancyList.map(x => ({ ...x, id: x.VacancyId, name: x.PositionTitleName })),
                MediaList: response.MediaList.map(x => ({ ...x, id: x.MediaId, name: x.MediaName })),
                CompanyList: response.CompanyList.map(x => ({ ...x, id: x.CompanyId, name: x.CompanyName }))
            }
            yield put({ type: types.SET_GENERATE_ACTIVITY_LINK_MASTER_DATA, value: data })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export function* createGenerateActivityLink(param) {
    try {
        yield put({ type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER, value: true })
        let stateGenerateActivityLink = yield select(getRootState)
        let { form, fileName: objFileName } = stateGenerateActivityLink

        let extension = '.xlsx'

        let fileName = `${objFileName.groupEvent}_${objFileName.event}_${objFileName.vacancy}_${objFileName.platform}${extension}`
        let fallbackFileName = 'GroupEvent_EventDesc_VacancyTitle_ActivityName' + extension

        let body = {
            eventId: form.eventId,
            groupEventId: form.groupEventId,
            Company: form.Company,
            vacancyId: form.vacancyId,
            activityPLatformId: form.activityPLatformId,
            isQRCode: form.isQRCode
        }

        const response = yield call(POSTBLOB, Config.BASE_URL + Endpoint.CREATE_GENERATE_ACTIVITY_LINK, body, {
            headers: Header()
        })
        var blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

        saveAs(blob, fileName ? fileName : fallbackFileName)

        if (response) {
            yield put({ type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER, value: false })
            // yield put({ type: types.RESET_INPUT_GENERATE_ACTIVITY_LINK })
            messages('Success', 'Download Activity Link Success ', 'success', false)
            // param.history.goBack()
        } else {
            messages('Error', /* response.Message, */ 'error', false)
        }
        yield put({ type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.SET_INPUT_GENERATE_ACTIVITY_LINK_LOADER, value: false })
        messages('Info', 'Oops, something wrong !', 'info', false)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.FETCH_GENERATE_ACTIVITY_LINK_MASTER_DATA_REQUESTED, fetchGenerateActivityLinkMasterData),
        takeLatest(types.CREATE_GENERATE_ACTIVITY_LINK_REQUESTTED, createGenerateActivityLink)
    ])
}
