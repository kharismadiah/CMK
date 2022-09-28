import { all, call, put, select } from 'redux-saga/effects'
import { messages } from '../../components/messageBox'
import * as types from '../types'
import Config from '../../service/config'
import Endpoint from '../../service/endpoint'
import { POST, GET } from '../../service/api'
import { Header } from '../../service/header'
import { takeLatest } from 'redux-saga'

const getStateHowToApply = state => state.HowToApply

export function* fetchMaintain() {
    try {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: true })
        let stateHowToApply = yield select(getStateHowToApply)
        let body = {}
        const response = yield call(POST, Config.BASE_URL + Endpoint.HOW_TO_APPLY_MAINTAIN_POST, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            yield put({ type: types.HOW_TO_APPLY_HANDLE_STATE, property: 'dataVideo', value: response.HowToApply })
            yield put({ type: types.HOW_TO_APPLY_HANDLE_STATE, property: 'dataImage', value: response.HowToApplyImage })
        } else {
            messages('Error', response.Message, 'error', false)
        }
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    }
}

export function* fetchGetDetailVideo(param) {
    try {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: true })
        let stateHowToApply = yield select(getStateHowToApply)
        let id = param.id
        const response = yield call(GET, Config.BASE_URL + Endpoint.HOW_TO_APPLY_DETAILS_BY_ID_GET + id, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let data = {
                id: response.HowToApply.HowToApplyId,
                sectionTitle: response.HowToApply.HowToApplyTitle,
                sectionDescription: response.HowToApply.HowToApplyDesc,
                youtubeLink: response.HowToApply.HowToApplyLink,
                setDefault: response.HowToApply.IsVideoDefault
            }
            yield put({ type: types.HOW_TO_APPLY_GET_DETAIL_VIDEO_SUCCESS, value: data })
        } else {
            messages('Info', response.Message, 'info', false)
        }
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    }
}

export function* fetchGetDetailImage(param) {
    try {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: true })
        let stateHowToApply = yield select(getStateHowToApply)
        let id = param.id
        const response = yield call(GET, Config.BASE_URL + Endpoint.HOW_TO_APPLY_DETAILS_BY_ID_GET + id, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            let data = {
                id: response.HowToApplyImage.howToApplyId,
                sectionTitle: response.HowToApplyImage.HowToApplyTitle,
                setDefault: response.HowToApplyImage.isVideoDefault,
                form: response.HowToApplyImage.HowToApplyList.map(x => ({
                    id: x.HowToApplyImageId,
                    sectionSubtitle: x.HowToApplySubTitle,
                    sectionDescription: x.HowToApplyDesc,
                    imageUrl: x.HowToApplyLink,
                    image: '',
                    imageName: x.HowToApplyLink
                }))
            }
            yield put({ type: types.HOW_TO_APPLY_HANDLE_STATE, property: 'formImage', value: data })
        } else {
            messages('Info', response.Message, 'info', false)
        }
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    }
}

export function* fetchSubmit(param) {
    try {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: true })
        let stateHowToApply = yield select(getStateHowToApply)
        let dataVideo = stateHowToApply.formVideo
        let dataImage = stateHowToApply.formImage
        let type = param.dataType
        let body = {}
        if (type === 'Video') {
            body = {
                howtoapplyid: dataVideo.id,
                isvideodefault: dataVideo.setDefault,
                howToApplyTitle: dataVideo.sectionTitle,
                howtoapplylist: [
                    {
                        id: dataVideo.id,
                        type: 'Video',
                        title: dataVideo.sectionTitle,
                        description: dataVideo.sectionDescription,
                        image: '',
                        link: dataVideo.youtubeLink,
                        HowToApplySubTitle: '',
                        HowToApplyImageId: ''
                    }
                ]
            }
        } else {
            body = {
                howtoapplyid: dataImage.id,
                isvideodefault: dataImage.setDefault,
                howToApplyTitle: dataImage.sectionTitle,
                howtoapplylist: dataImage.form.map((x, i) => ({
                    id: x.id,
                    type: 'Image',
                    title: dataImage.sectionTitle,
                    description: x.sectionDescription,
                    image: x.image ? x.image : x.imageUrl,
                    link: '',
                    HowToApplySubTitle: x.sectionSubtitle,
                    HowToApplyImageId: x.id
                }))
            }
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.HOW_TO_APPLY_SUBMIT_POST, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            messages('Success', response.Message, 'info', false)
            param.history.goBack()
        } else {
            messages('Info', response.Message, 'info', false)
        }
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    }
}

export function* fetchDefault(param) {
    try {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: true })
        let stateHowToApply = yield select(getStateHowToApply)
        let dataImage = stateHowToApply.dataImage
        let dataVideo = stateHowToApply.dataVideo
        let type = param.dataType
        let body = {}
        if (type === 'Video') {
            body = {
                howtoapplyid: dataVideo.HowToApplyId,
                isvideodefault: true,
                howToApplyTitle: dataVideo.HowToApplyTitle,
                howtoapplylist: [
                    {
                        id: dataVideo.HowToApplyId,
                        type: 'Video',
                        title: dataVideo.HowToApplyTitle,
                        description: dataVideo.HowToApplyDesc,
                        image: '',
                        link: dataVideo.HowToApplyLink,
                        HowToApplySubTitle: '',
                        HowToApplyImageId: ''
                    }
                ]
            }
        } else {
            // var reader = new FileReader();
            // var imageUrl = reader.cre
            // reader.readAsDataURL("https://dsohsosharedstorage.blob.core.windows.net/astracareerfiles/2020/11/20/d967d113-837a-40de-ae50-2bddbe88a9aa.jpg?sv=2015-12-11&sr=b&sig=FmvnuvHjPXzF9BtVLTbExFLDFHj8bAmwGYFZKXrT5Aw%3D&se=2020-11-21T06%3A46%3A23Z&sp=r");
            // reader.onloadend = function() {
            //     var base64data = reader.result;
            // }
            body = {
                howtoapplyid: dataImage.howToApplyId,
                isvideodefault: false,
                howToApplyTitle: dataImage.HowToApplyTitle,
                howtoapplylist: dataImage.HowToApplyList.map((x, i) => ({
                    id: x.HowToApplyImageId,
                    type: 'Image',
                    title: dataImage.HowToApplyTitle,
                    description: x.HowToApplyDesc,
                    image: x.HowToApplyLink,
                    link: '',
                    HowToApplySubTitle: x.HowToApplySubTitle,
                    HowToApplyImageId: x.HowToApplyImageId
                }))
            }
        }
        const response = yield call(POST, Config.BASE_URL + Endpoint.HOW_TO_APPLY_SUBMIT_POST, body, {
            headers: Header()
        })
        if (response.Acknowledge === 1) {
            messages('Success', response.Message, 'info', false)
            yield call(fetchMaintain)
        } else {
            messages('Info', response.Message, 'info', false)
        }
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    } catch (error) {
        yield put({ type: types.HOW_TO_APPLY_SET_LOADER, value: false })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.HOW_TO_APPLY_FETCH_MAINTAIN, fetchMaintain),
        takeLatest(types.HOW_TO_APPLY_GET_DETAIL_VIDEO, fetchGetDetailVideo),
        takeLatest(types.HOW_TO_APPLY_GET_DETAIL_IMAGE, fetchGetDetailImage),
        takeLatest(types.HOW_TO_APPLY_POST_SUBMIT, fetchSubmit),
        takeLatest(types.HOW_TO_APPLY_POST_DEFAULT, fetchDefault)
    ])
}
