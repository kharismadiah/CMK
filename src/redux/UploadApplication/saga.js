import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { messages } from "../../components/messageBox"
import { Header, HeaderMultipartFile } from "../../service/header";
import { POST, POSTBLOB} from "../../service/api";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import * as types from "../types";

const getStateUploadApplication = state => state.UploadApplication;

export function* downloadTemplate(){
    try {
        yield put({ type: types.SET_UPLOADAPP_LOADER, value: true})
        const uploadApplication = yield select(getStateUploadApplication);
        let body = {
            "groupEventId" : uploadApplication.groupEvent,
            "eventId"  : uploadApplication.event
        }
        //Http request khsus download excel beda -> POSTBLOB
        const response = yield call(POSTBLOB, Config.BASE_URL + Endpoint.DOWNLOAD_UPLOADAPP_POST, body, { headers: Header() });

        var data = response
        var _blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        var anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(_blob);
        let tempEventName = uploadApplication.eventList.find(x=>x.EventId === body.eventId).EventName.replace(/\//g,"-")
        anchor.download = `TemplateUploadApplication_${tempEventName}.xlsx`;
        anchor.click();

        // if (response.Acknowledge == 1) {
            
        // }
        // else {
        //   messages("Error", response.Message, "error", false);
        // }
        yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
    } 
    catch (error) {
        yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
        messages("Info", "Oops, something wrong !", "info", false);
    } 
}

export function* hitUploadAppMasterData() {
  try {
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: true})
    let body = {
        MasterData : [
          {objectName: "GroupEvent"},
          {objectName: "Event"}
        ]
    }
    
    const resMasterData = yield call(POST, Config.BASE_URL + Endpoint.MASTER_DATA, body, { headers: Header() });
    
    if (resMasterData.Acknowledge == 1) {
      let groupEventAffcoFilter = resMasterData.GroupEventList.filter(x => (x.GroupEventName.toLowerCase().includes("general") || (x.GroupEventName.toLowerCase().includes("virtue")) ))
      let groupEventAffco = groupEventAffcoFilter.map((x) => ({ ...x, id: x.GroupEventId, name: x.GroupEventName}))
     
      let data = {
        groupEventList: resMasterData.GroupEventList.map(x => ({...x, id: x.GroupEventId, name: x.GroupEventName})),
        groupEventListAffco: groupEventAffco,
        eventList: resMasterData.EventList.map(x => ({...x, id: x.EventId, name: x.EventDescription + " - " + x.EventName}))
      }
      yield put({ type: types.SET_UPLOADAPP_MASTERDATA, value: data });
    }
    else {
      messages("Error", resMasterData.Message, "error", false);
    }
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
  } catch (error) {
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitUploadApplication(){
  try {
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: true})
    const uploadApplication = yield select(getStateUploadApplication);

    var formData = new FormData()
    formData.append('request', uploadApplication.uploadRaw)

    const response = yield call(POST, Config.BASE_URL + Endpoint.UPLOAD_UPLOADAPP_POST, formData, { headers: HeaderMultipartFile() });
    if (response.Acknowledge == 1) {
      let data = response.ErrorResults.map((x) => ({...x, Email:x.CandidateId}))
      yield put({ type: types.UPLOAD_UPLOADAPP_SUCCESS, field: "listOfResult", value: data });
      
      let data2 = response.ListNonRegistered.map((x)=>({applicantId : x.ApplicantId, vacancyCode: x.VacancyCode}))
      yield put ({type : types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'listApplicantNonRegis', value: data2})

      let data3 = response.ListRegistered.map((x)=>({applicantId : x.ApplicantId, vacancyCode : x.VacancyCode}))
      yield put ({type : types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'listApplicantRegis', value: data3})
      
      // yield put ({type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'vacancyCodeToBeRetrieved', value: response.vacancyCode})

      if (data2.length>0 && data3.length>0) {
          yield put({type: types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY, property: "registeredQueue", value: true})
          yield put({type: types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY, property: "nonRegistered", value: true})
          yield put ({type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: "currentSendEmail", value: "nonRegistered"})
      } else if (data2.length>0) {
        yield put({type: types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY, property: "nonRegistered", value: true})
        yield put ({type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: "currentSendEmail", value: "nonRegistered"})
      } else if (data3.length>0) {
        yield put({type: types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY, property: "registered", value: true})
        yield put ({type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: "currentSendEmail", value: "registered"})
      }
      yield call (getListEmailTemplate)

      messages("Success", response.Message, "success", false);
    }
    else {
      let data = response.ErrorResults.map((x) => ({...x, Email:x.CandidateId}))
      yield put({ type: types.UPLOAD_UPLOADAPP_SUCCESS, field: "listOfResult", value: data });
      messages("Error", response.Message, "error", false);
    }
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
  } catch (error) {
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getListEmailTemplate() {
  try {
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: true})
    const uploadApplication = yield select(getStateUploadApplication);
      const body = {
        "Activity": uploadApplication.isShowSelectEmailTemplate.nonRegistered ? "Upload Application - Not Registered":
                    "Upload Application - Registered",
        "Action": "Submit",
        "EmailDetailsId":0
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.CHECK_EMAIL_TEMPLATE, body, { headers: Header() });
      const response2 = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_ACTIVITY, {}, { headers: Header() });
      if (response.Acknowledge == 1 && response2.Acknowledge == 1) {
        yield put({ type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'activityList', 
                        value: response2.Data.map(x => ({ ...x, id: x.EmailActivityId, name: x.ActivityName })) })
       if (response.EmailDetails.length>0) yield put({ type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'selectedEmailTemplateId', value: response.EmailDetails[0].EmailDetailsId});
        yield put({ type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'emailTemplateList', value: response.EmailDetails});
        yield put({ type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'emailTemplateTotalRows', value: response.EmailDetails.length });
        yield call (hitTriggerMasterData)
      }
      else {
        messages("Error", response.Message, "error", false);
      }
      yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
    } catch (error) {
      yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
      messages("Info", "Oops, something wrong !", "info", false);
    }
}

export function* getEmailTemplate() {
  try {
      yield put({ type: types.SET_UPLOADAPP_LOADER, value: true})
      const uploadApplication = yield select(getStateUploadApplication)
      const body = {
          "Activity": uploadApplication.selectedEmailTemplateId !== null ?
                      uploadApplication.isShowSelectEmailTemplate.nonRegistered ? "Upload Application - Not Registered":
                      "Upload Application - Registered":"",
          "Action": uploadApplication.selectedEmailTemplateId !== null ?"Submit":"",
          "EmailDetailsId": uploadApplication.selectedEmailTemplateId
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TEMPLATE , body, { headers: Header() });
      if (response.Acknowledge === 1) {
          let data = {
              visible: true,
              EmailConfigId: response.EmailConfigId,
              subject: response.Subject,
              body: response.Body,
              signature: response.Signature,
          }
          yield put({ type: types.UPLOAD_APPLICATION_FETCH_EMAIL_TEMPLATE_SUCCESS, payload: data })
          yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
      } else {
        yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
          messages("Error", response.Message, "error", false);
      }

  } catch (error) {
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
      messages("Error", response.Message, "error", false);
  }
}

export function* sendEmailNotification() {
  try {
    yield put({ type: types.SET_UPLOADAPP_LOADER, value: true})
    const uploadApplication = yield select(getStateUploadApplication)

    let data = uploadApplication.currentSendEmail === 'nonRegistered' ? uploadApplication.listApplicantNonRegis :
                    uploadApplication.listApplicantRegis

    let tempVacancyList = []

    for (let i=0; i<data.length; i++) {
      if (tempVacancyList.length === null || tempVacancyList.length < 1){
        tempVacancyList = [...tempVacancyList, data[i].vacancyCode]
      } else {
          let flag = true
        for (let j = 0; j<tempVacancyList.length; j++) {
          if (tempVacancyList[j] === data[i].vacancyCode) {
              flag = false
              break
          }
        }
        if (flag) {
            tempVacancyList = [...tempVacancyList, data[i].vacancyCode]    
          }
      }
    }

    
    let tempApplicantMappingBox = []
    for (let i=0; i<tempVacancyList.length; i++) {
      tempApplicantMappingBox = [
        ...tempApplicantMappingBox,
        {
          vacancyCode : tempVacancyList[i],
          applicantList : []
        }
      ]
    }

    for (let i=0; i<data.length; i++) {
      for (let j=0; j<tempApplicantMappingBox.length; j++) {
        if (tempApplicantMappingBox[j].vacancyCode === data[i].vacancyCode){
          tempApplicantMappingBox[j] = {
            ...tempApplicantMappingBox[j],
            applicantList : [
              ...tempApplicantMappingBox[j].applicantList, 
              {
                applicantId : data[i].applicantId
              }
            ]
          }
          break
        }
      }
    }
    
    let response = []
    let totalResponse = 0
    let errorMessage = ""
    for (let i=0; i<tempApplicantMappingBox.length; i++) {
        let body = {
          vacancyCode : tempApplicantMappingBox[i].vacancyCode,
          applicantList: tempApplicantMappingBox[i].applicantList,
          emailTemplate: {
              subject: uploadApplication.modalEmail.subject,
              body: uploadApplication.modalEmail.body,
              signature: uploadApplication.modalEmail.signature
          },
          source: "Upload"
        }
        
        response[i] = yield call(POST, Config.BASE_URL + Endpoint.INPUT_UPLOAD_APP_SEND_EMAIL, body, { headers: Header() });
        if (response[i].Acknowledge === 1) {
          totalResponse ++;
        } else errorMessage = response[i].Message
    }
      if (totalResponse === tempApplicantMappingBox.length) {
          messages("Info", response[0].Message, "info", false);
          yield put({type: types.UPLOAD_APPLICATION_HANDLE_STATE_MODAL_EMAIL, property: 'visible', value: false})
          if (uploadApplication.isShowSelectEmailTemplate.registeredQueue) {
            yield put ({type : types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY, property: 'registered', value:true})
            yield put ({type : types.UPLOAD_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY, property: 'registeredQueue', value:false})
            yield put ({type : types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property: 'currentSendEmail', value:'registered'})
            yield call (getListEmailTemplate)
          }
      } else {
        yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
          messages("Error", errorMessage, "error", false);
          tempVacancyList = []
          tempApplicantMappingBox = []
          response = []
          totalResponse = 0
          errorMessage = ""
      }
      yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
  } catch (error) {
        yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
  }
}

export function* hitTriggerMasterData() {
  try {
      yield put({ type: types.SET_UPLOADAPP_LOADER, value: true})
      const uploadApplication = yield select(getStateUploadApplication)
    let activity = uploadApplication.isShowSelectEmailTemplate.nonRegistered ? "Upload Application - Not Registered": "Upload Application - Registered"
    let body = {
          "EmailActivityId": uploadApplication.activityList.find(x=>x.ActivityName === activity).EmailActivityId
    }
    const response = yield call(POST, Config.BASE_URL + Endpoint.GET_EMAIL_TRIGGER, body, { headers: Header() });

    if (response.Acknowledge == 1) {
      yield put({ type: types.UPLOAD_APPLICATION_HANDLE_STATE_GLOBAL, property :'triggerList', value: response.Data.map(x => ({id: x.EmailTriggerId, triggerName: x.Remarks, value: x.TriggerName })) });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
      yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
  } catch (error) {
      yield put({ type: types.SET_UPLOADAPP_LOADER, value: false})
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.DOWNLOAD_UPLOADAPP, downloadTemplate),
        takeLatest(types.GET_UPLOADAPP_MASTERDATA, hitUploadAppMasterData),
        takeLatest(types.UPLOAD_UPLOADAPP, hitUploadApplication),
        takeLatest(types.UPLOAD_APPLICATION_GET_LIST_EMAIL_TEMPLATE, getListEmailTemplate),
        takeLatest(types.UPLOAD_APPLICATION_GET_EMAIL_TEMPLATE, getEmailTemplate),
        takeLatest(types.UPLOAD_APPLICATION_SEND_EMAIL_NOTIFICATION, sendEmailNotification),
        takeLatest(types.UPLOAD_APPLICATION_GET_TRIGGER_MASTER_DATA, hitTriggerMasterData)
    ]);
}