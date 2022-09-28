import { all, call, put, select } from "redux-saga/effects";
import { messages } from "../../components/messageBox"
import appAction from "./actions";
import {
  HANDLE_STATE_VACANCY,
  HANDLE_STATE_FORM_VACANCY,
  HANDLE_STATE_EVENT_LIST_MASTER,

  GET_ACTIVE_VACANCY,
  GET_REVISION_VACANCY,
  GET_APPROVAL_VACANCY,
  GET_ARCHIVED_VACANCY,
  GET_DRAFT_VACANCY,
  GET_CLOSED_VACANCY,
  GET_LOAD_FORM_VACANCY,
  GET_LOAD_FORM_VACANCY2 ,
  GET_DETAILS_VACANCY,
  GET_EVENT_CREATE_LOAD,
  GET_EVENT_LIST_MASTER,
  GET_DETAILS_ATS_PHASE_TYPE,

  SET_ACTIVE_LIST,
  SET_REVISION_LIST,
  SET_APPROVAL_LIST,
  SET_ARCHIVED_LIST,
  SET_DRAFT_LIST,
  SET_CLOSED_LIST,
  SET_EVENT_LIST,
  SET_STATUS_LIST,
  SET_POSITION_LIST,
  SET_COMPANY_LIST,
  SET_FUNCTION_LIST,
  SET_JOB_LIST,
  SET_DETAILS_VACANCY,
  SET_DETAILS_COPY_VACANCY,
  SET_GENERAL_FILTER_LIST,
  SET_VAC_ATS_PHASE_TYPE_DETAILS,
  SET_ATSPHASETYPE_MATER_DATA_SUCCESS,

  SUBMIT_VACANCY,
  DRAFT_VACANCY,
  UPDATE_DRAFT_VACANCY,
  DELETE_VACANCY,

  APPROVE_VACANCY,
  CLOSE_VACANCY,
} from "../types";
import Config from "../../service/config";
import Endpoint from "../../service/endpoint";
import { POST } from "../../service/api";
import { Header } from "../../service/header";
import { takeLatest } from "redux-saga";
import moment from 'moment';
import { filterUniqueData } from "../../helpers/filter-unique-array";
import { sortArrayDropdown } from "../../helpers/sort-dropdown";

const getStateVacancy = state => state.Vacancy;
const getStateAuth = state => state.Auth;
const { setLoader } = appAction

export function* hitActiveVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let value = data.data
    let field = data.field
    let body = {}
    if (field === "search") {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": vacancy.vacancyCode,
        "VacancyTitle": vacancy.vacancyTitle,
        "VacancyStatus": vacancy.status === "" ? "Active" : vacancy.status,
        "Company": vacancy.company,
        "TotalNeeds": vacancy.totalNeeds,
        "TotalFulfilled": vacancy.totalFulfillment,
        "CandidateType": vacancy.candidates
      }
    } else {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyTitle": "",
        "VacancyCode": "",
        "VacancyStatus": "Active",
        "Company": "",
        "TotalNeeds": "",
        "TotalFulfilled": "",
        "CandidateType": ""
      }
    }

    const response = yield call(POST, Config.API_VACANCY + Endpoint.VACANCY_LIST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: SET_ACTIVE_LIST, value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'gridActiveVacancyMaster', value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'totalRows', value: response.TotalRecords });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'pageNo', value: value });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitRevisionVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let value = data.data
    let field = data.field
    let body = {}
    if (field === "search") {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": vacancy.vacancyCodeRevision,
        "VacancyTitle": vacancy.vacancyTitleRevision,
        "VacancyStatus": vacancy.statusRevision == "" ? "Revision" : vacancy.statusRevision, //Harus nya di isi revision
        "Company": vacancy.companyRevision,
        "TotalNeeds": vacancy.totalNeedsRevision,
        "TotalFulfilled": vacancy.totalFulfillmentRevision,
        "CandidateType": vacancy.candidatesRevision
      }
    }
    else {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": "",
        "VacancyTitle": "",
        "VacancyStatus": "Revision", //Harus nya di isi revision
        "Company": "",
        "TotalNeeds": "",
        "TotalFulfilled": "",
        "CandidateType": ""
      }
    }
    //EndPoint nya harusnya REVISION_LIST
    const response = yield call(POST, Config.API_VACANCY + Endpoint.ACTIVE_VACANCY_LIST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: SET_REVISION_LIST, value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'gridRevisionVacancyMaster', value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'totalRows', value: response.TotalRecords });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'pageNo', value: value });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitApprovalVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let value = data.data
    let field = data.field
    let body = {}
    if (field === "search") {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": vacancy.vacancyCodeApproval,
        "VacancyTitle": vacancy.vacancyTitleApproval,
        "VacancyStatus": vacancy.statusApproval === "" ? "Approval" : vacancy.statusApproval,
        "Company": vacancy.companyApproval,
        "TotalNeeds": vacancy.totalNeedsApproval,
        "TotalFulfilled": vacancy.totalFulfillmentApproval,
        "CandidateType": vacancy.candidatesApproval
      }
    }
    else {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": "",
        "VacancyTitle": "",
        "VacancyStatus": "Approval",
        "Company": "",
        "TotalNeeds": '',
        "TotalFulfilled": "",
        "CandidateType": ""
      }
    }
    const response = yield call(POST, Config.API_VACANCY + Endpoint.VACANCY_LIST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: SET_APPROVAL_LIST, value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'gridApprovalVacancyMaster', value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'totalRows', value: response.TotalRecords });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'pageNo', value: value });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitDraftVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let value = data.data
    let field = data.field
    let body = {}
    if (field === "search") {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": vacancy.vacancyCodeDraft,
        "VacancyTitle": vacancy.vacancyTitleDraft,
        "VacancyStatus": vacancy.statusDraft === "" ? "Draft" : vacancy.statusDraft,
        "Company": vacancy.companyDraft,
        "TotalNeeds": vacancy.totalNeedsDraft,
        "TotalFulfilled": vacancy.totalFulfillmentDraft,
        "CandidateType": vacancy.candidatesDraft
      }
    }
    else {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": "",
        "VacancyTitle": "",
        "VacancyStatus": "Draft",
        "Company": "",
        "TotalNeeds": "",
        "TotalFulfilled": "",
        "CandidateType": ""
      }
    }
    const response = yield call(POST, Config.API_VACANCY + Endpoint.VACANCY_LIST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: SET_DRAFT_LIST, value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'gridDraftVacancyMaster', value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'totalRows', value: response.TotalRecords });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'pageNo', value: value });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitClosedVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let value = data.data
    let field = data.field
    let body = {}
    if (field === "search") {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": vacancy.vacancyCodeClosed,
        "VacancyTitle": vacancy.vacancyTitleClosed,
        "VacancyStatus": vacancy.statusClosed === "" ? "Closed" : vacancy.statusClosed,
        "Company": vacancy.companyClosed,
        "TotalNeeds": vacancy.totalNeedsClosed,
        "TotalFulfilled": vacancy.totalFulfillmentClosed,
        "CandidateType": vacancy.candidatesClosed
      }
    }
    else {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": "",
        "VacancyTitle": "",
        "VacancyStatus": "Closed",
        "Company": "",
        "TotalNeeds": "",
        "TotalFulfilled": "",
        "CandidateType": ""
      }
    }
    const response = yield call(POST, Config.API_VACANCY + Endpoint.VACANCY_LIST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: SET_CLOSED_LIST, value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'gridClosedVacancyMaster', value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'totalRows', value: response.TotalRecords });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'pageNo', value: value });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitArchivedVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let value = data.data
    let field = data.field
    let body = {}
    if (field === "search") {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyCode": vacancy.vacancyCodeArchived,
        "VacancyTitle": vacancy.vacancyTitleArchived,
        "VacancyStatus": vacancy.statusArchived === "" ? "Archived" : vacancy.statusArchived,
        "Company": vacancy.companyArchived,
        "TotalNeeds": vacancy.totalNeedsArchived,
        "TotalFulfilled": vacancy.totalFulfillmentArchived,
        "CandidateType": vacancy.candidatesArchived
      }
    }
    else {
      body = {
        "PageNo": value,
        "PageSize": 10,
        "VacancyTitle": "",
        "VacancyCode": "",
        "VacancyStatus": "Archived",
        "Company": "",
        "TotalNeeds": "",
        "TotalFulfilled": "",
        "CandidateType": ""
      }
    }
    const response = yield call(POST, Config.API_VACANCY + Endpoint.VACANCY_LIST, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: SET_ARCHIVED_LIST, value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'gridArchivedVacancyMaster', value: response.VacancyList });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'totalRows', value: response.TotalRecords });
      yield put({ type: HANDLE_STATE_VACANCY, field: 'pageNo', value: value });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitLoadVacancyForm() {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    // const login = yield select(getStateLogin);
    let body = {}
    const response = yield call(POST, Config.BASE_URL + Endpoint.LOAD_VACANCY, body, { headers: Header() });

    if (response.Acknowledge === 1) {
    let candidateTypeList = []
    let param
    response.ATSPhaseTypeList.map((obj) => {
      let value = {}
      value = { "id": obj.ATSTypeId, "value": obj.ATSPhaseTypeDescription, "name": obj.ATSPhaseTypeDescription, "ATSPhaseTypeCode": obj.ATSPhaseTypeCode }
      candidateTypeList.push(value)
    })

    let generalFilteringList = filterUniqueData(response.GeneralFilteringList, 'GeneralFilteringId', 'GeneralFilteringName');
    if(Array.isArray(generalFilteringList) && generalFilteringList.length > 0) {
      generalFilteringList = sortArrayDropdown(generalFilteringList, 'GeneralFilteringName');
    }

    // let lisOfEvent = response.EventList.map((x) => ({
    //   ...x,
    //   name: x.EventDescription ? x.EventDescription + " - " + x.EventName: x.EventName
    // }));

    yield put({ type: HANDLE_STATE_EVENT_LIST_MASTER, field: "eventListMaster", value: response.EventList });
    yield put({ type: SET_EVENT_LIST, value: response.EventList });
    yield put({ type: SET_STATUS_LIST, value: response.VacancyStatusList });
    yield put({ type: SET_POSITION_LIST, value: response.PositionList });
    yield put({ type: SET_COMPANY_LIST, value: response.CompanyList });
    yield put({ type: SET_FUNCTION_LIST, value: response.FunctionList });
    yield put({ type: SET_JOB_LIST, value: response.JobSpecializationList });

    yield put({
      type: SET_GENERAL_FILTER_LIST,
      value: generalFilteringList
    });
    
    yield put({ type: HANDLE_STATE_VACANCY, field: "atsPhaseTypeList", value: response.ATSPhaseTypeList });
    yield put({ type: HANDLE_STATE_VACANCY, field: "candidateTypeList", value: candidateTypeList });
      if (vacancy.statusCallback === "1") {
        yield put({ type: GET_ACTIVE_VACANCY, data: 1, field: "search" })
      } else if (vacancy.statusCallback === "2") {
        yield put({ type: GET_REVISION_VACANCY, data: 1, field: "search" })
      } else if (vacancy.statusCallback === "3") {
        yield put({ type: GET_APPROVAL_VACANCY, data: 1, field: "search" })
      } else if (vacancy.statusCallback === "4") {
        yield put({ type: GET_DRAFT_VACANCY, data: 1, field: "search" })
      } else if (vacancy.statusCallback === "5") {
        yield put({ type: GET_CLOSED_VACANCY, data: 1, field: "search" })
      } else if (vacancy.statusCallback === "6") {
        yield put({ type: GET_ARCHIVED_VACANCY, data: 1, field: "search" })
      }
      
      // yield put({ type: GET_EVENT_CREATE_LOAD })
    }
    else {
    messages("Error", response.Message, "error", false);
    }
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitLoadVacancyForm2() {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let body = {}
    const response = yield call(POST, Config.BASE_URL + Endpoint.LOAD_VACANCY, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      let candidateTypeList = []
      let param
      response.ATSPhaseTypeList.map((obj) => {
        let value = {}
        value = { "id": obj.ATSTypeId, "value": obj.ATSPhaseTypeDescription, "name": obj.ATSPhaseTypeDescription, "ATSPhaseTypeCode": obj.ATSPhaseTypeCode }
        candidateTypeList.push(value)
      })
      yield put({ type: HANDLE_STATE_EVENT_LIST_MASTER, field: "eventListMaster", value: response.EventList });
      yield put({ type: SET_EVENT_LIST, value: response.EventList });
      yield put({ type: SET_STATUS_LIST, value: response.VacancyStatusList });
      yield put({ type: SET_POSITION_LIST, value: response.PositionList });
      yield put({ type: SET_COMPANY_LIST, value: response.CompanyList });
      yield put({ type: SET_FUNCTION_LIST, value: response.FunctionList });
      yield put({ type: SET_JOB_LIST, value: response.JobSpecializationList });
      yield put({ type: SET_GENERAL_FILTER_LIST, value: response.GeneralFilteringList });
      yield put({ type: HANDLE_STATE_VACANCY, field: "atsPhaseTypeList", value: response.ATSPhaseTypeList });
      yield put({ type: HANDLE_STATE_VACANCY, field: "candidateTypeList", value: candidateTypeList });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* closeVacancy (data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let id = data.data
    let body = {
      "vacancyId" : id
    }
    const response2 = yield call(POST, Config.BASE_URL + Endpoint.CLOSE_VACANCY, body, { headers: Header() });   
      if (response2.Acknowledge === 1) {   
        messages("Success", 'Berhasil mengubah status vacancy', "success", false);
        let field = ''
        if (vacancy.vacancyCode !== "" || vacancy.vacancyTitle !== "" || vacancy.company !== ""
            || vacancy.totalNeeds !== "" || vacancy.totalFulfillment !== "" ||
            vacancy.candidates !== "" || vacancy.status !== "") field = "search"
        yield call(hitActiveVacancy, {data:vacancy.pageNo, field:field})
      }
      else {
        messages("Error", response2.Message, "error", false);
      }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* hitDetailsVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let id = data.data
    let body = {
      "vacancyId": id
    }
    const response = yield call(POST, Config.API_VACANCY + Endpoint.DETAIL_VACANCY, body, { headers: Header() });
    if (response.Acknowledge === 1) {
      response.Vacancy.GeneralFilterId = response.Vacancy.GeneralFilterId ? parseInt(response.Vacancy.GeneralFilterId) : ''
      let _vacancyType = vacancy.vacancyTypeList.find(obj => response.Vacancy.VacancyType === obj.value)
      // if(vacancy.statusCallback === "1" ){ //active
      //   if(vacancy.fromPage === "edit"){
      //     if(_vacancyStatus.id === 4 ){ //waiting for publish
      //       yield put({ type: HANDLE_STATE_VACANCY, field: "isDisabled", value: true });
      //     }
      //   }
      // }
      let _data = {
        vacancyType: _vacancyType.id
        // candidateType: _candidate.id
      }

      let applicantPhaseList = response.Vacancy.Phases.map(x => {
        return {
          ...x,
          name: x.PhaseName, labelName: x.PhaseTitle
        }
      })
      let mapDataRes = {
        atsPhase: applicantPhaseList
      }
      let resVacancy
      if (response.Vacancy.TotalFulfilled === undefined) {
        resVacancy = { ...response.Vacancy, TotalFulfilled: "" }
      } else {
        resVacancy = response.Vacancy
      }
      let _vacancyStatus = vacancy.vacancyStatusList.find(obj => response.Vacancy.VacancyStatusId === obj.id)
      let dataResVacancy={
        vacancyStatus: _vacancyStatus,
        respondVacancy: resVacancy
      }

      let isGeneralFilter = resVacancy.Phases.find(x => x.PhaseName.toLowerCase().includes("general filter"))
      if (vacancy.fromPage === "copy") {
        yield put({ type: SET_DETAILS_COPY_VACANCY, value1: dataResVacancy, value2: _data });
        yield put({ type: SET_VAC_ATS_PHASE_TYPE_DETAILS, payload: mapDataRes })
        yield put({ type: HANDLE_STATE_VACANCY, field: "isGeneralFilter", value: isGeneralFilter })
      } else {
        yield put({ type: SET_DETAILS_VACANCY, value1: dataResVacancy, value2: _data, });
        yield put({ type: SET_VAC_ATS_PHASE_TYPE_DETAILS, payload: mapDataRes })
        yield put({ type: HANDLE_STATE_VACANCY, field: "isGeneralFilter", value: isGeneralFilter })
      }
      yield put({ type: HANDLE_STATE_VACANCY, field: "vacancyId", value: response.Vacancy.VacancyId });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getDetailATSPhaseType(param) {
  try {
    // yield put({ type: types.ATSPHASETYPE_SET_LOADER, value: true})
    yield put(setLoader(true));

    let bodyMaster = {
      MasterData: [
        {
          ObjectName: "ATSPhase"
        },
        {
          ObjectName: "ATSPhaseType"
        },
        {
          ObjectName: "ApplicantPhaseList"
        }
      ]
    }
    const resMasterData = yield call(POST, Config.API_MASTERDATA, bodyMaster, { headers: Header() })

    if (resMasterData.Acknowledge === 1) {
      let atsPhaseList = resMasterData.ATSPhaseList.map(x => ({ ...x, name: x.atsPhase }))
      let data = {
        phaseTypeList: resMasterData.ATSPhaseTypeList.map(x => ({ ...x, id: x.ATSTypeId, name: x.ATSPhaseTypeDescription })),
        sourceATSPhase: resMasterData.ATSPhaseList.map(x => ({ ...x, name: x.atsPhase })),
        // sourceApplicantPhase: resMasterData.ApplicantPhaseList.map(x => ({id:x.Id, name: x.ApplicantPhaseName}))
      }
      yield put({ type: SET_ATSPHASETYPE_MATER_DATA_SUCCESS, payload: data });
      let body = {
        atsPhaseTypeCode: param.data
      }
      const response = yield call(POST, Config.BASE_URL + Endpoint.ATS_PHASE_TYPE_DETAIL_POST, body, { headers: Header() });

      if (response.Acknowledge === 1) {
        let applicantPhaseList = response.applicantPhaseList.map(x => {
          let masterData = atsPhaseList.find((obj2) => (obj2.id === x.atsPhaseId))
          return {
            ...x,
            phase: x.phase, name: masterData.name, labelName: masterData.name, atsPhase: x.atsPhaseId, applicantPhase: x.applicantPhaseId
          }
        })
        let isGeneralFilter = applicantPhaseList.find(x => x.name.toLowerCase().includes("general filter"))
        let mapDataRes = {
          phaseTypeCode: response.atsPhaseTypeCode,
          phaseType: response.atsPhaseTypeId,
          description: response.description,
          atsPhase: applicantPhaseList
        }
        if (!isGeneralFilter) {
          yield put({ type: HANDLE_STATE_FORM_VACANCY, field: "generalFilter", value: '' })
        }
        yield put({ type: SET_VAC_ATS_PHASE_TYPE_DETAILS, payload: mapDataRes })
        yield put({ type: HANDLE_STATE_VACANCY, field: "isGeneralFilter", value: isGeneralFilter})
        yield put(setLoader(false));
      } else {
        yield put(setLoader(false));
        messages("Error", response.Message, "error", false);
      }
    } else {
      yield put(setLoader(false));
      messages("Error", resMasterData.Message, "error", false);
    }
  } catch (error) {
    yield put(setLoader(false));
  }
}



export function* submitVacancy(value) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let form = vacancy.formVacancy
    let formAtsPhaseType = vacancy.formATSPhaseType
    let phases = []
    let from = value.data
    let history = value.history

    let body = {}
    formAtsPhaseType.atsPhase.map((obj) => {
      let data = { "phaseName": obj.name, "phaseTitle": obj.labelName }
      phases.push(data)
    })
    let _publishDate = moment(form.publishDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let _endDate = moment(form.endDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let vacancyType = vacancy.vacancyTypeList.find(obj => form.vacancyType === obj.id)
    let category = vacancy.categoryList.find(obj => form.category === obj.id)
    let candidate = vacancy.candidateTypeList.find(obj => form.candidateType === obj.id)
    let vacancyStatus = vacancy.vacancyStatusList.find(obj => form.vacancyStatus.toLowerCase() === obj.name.toLowerCase())
    let link = ''
    if (from === "submit") {
      link = Endpoint.SUBMIT_VACANCY
      body = {
        "VacancyStatusId": vacancyStatus.id, // form.vacancyStatus,
        "VacancyType": vacancyType.value, //
        "EventId": form.eventName,
        "PublishDate": _publishDate,
        "EndDate": _endDate,
        "PositionId": form.position,
        "VacancyTitle": form.vacancyTitle,
        "CompanyId": form.company,
        "Category": category.value, //
        "FunctionId": form.function,
        "JobSpecializationId": form.jobSpecialization,
        "GeneralFilterId": form.generalFilter,
        "publishType": vacancyType.value, //
        "JobDescription": form.indonesiaJobDescription,
        "JobDescriptionEnglish": form.englishJobDescription,
        "JobRequirement": form.indonesiaJobRequirement,
        "JobRequirementEnglish": form.englishJobRequirement,
        "CompetenceDescription": form.competenceDescription,
        "TotalNeeds": form.totalNeeds, //parseInt(form.totalNeeds), //angka
        "TotalFulfilled": form.totalFullfilled,
        "ATSPhaseTypeId": form.candidateType, //id
        "CandidateType": candidate.value, //string
        "Notes": form.notes,
        "Phases": phases
      }
    } 
    else if (from === "update") {
      link = Endpoint.UPDATE_VACANCY
      body = {
        "VacancyId": vacancy.vacancyId, //beda vacancyId aja
        "VacancyStatusId": vacancyStatus.id, // form.vacancyStatus,
        "VacancyType": vacancyType.value, //
        "EventId": form.eventName,
        "PublishDate": _publishDate,
        "EndDate": _endDate,
        "PositionId": form.position,
        "VacancyTitle": form.vacancyTitle,
        "CompanyId": form.company,
        "Category": category.value, //
        "FunctionId": form.function,
        "JobSpecializationId": form.jobSpecialization,
        "GeneralFilterId": form.generalFilter,
        "publishType": vacancyType.value, //
        "JobDescription": form.indonesiaJobDescription,
        "JobDescriptionEnglish": form.englishJobDescription,
        "JobRequirement": form.indonesiaJobRequirement,
        "JobRequirementEnglish": form.englishJobRequirement,
        "CompetenceDescription": form.competenceDescription,
        "TotalNeeds": parseInt(form.totalNeeds), //angka
        "TotalFulfilled": form.totalFullfilled,
        "CandidateType": candidate.value, //string
        "ATSPhaseTypeId": form.candidateType, //id
        "Notes": form.notes,
        "Phases": phases
      }
    }
    else if (from === "tabRevise") {
      link = Endpoint.REVISE_TABVACANCY
      body = {
        "VacancyId": vacancy.vacancyId, //beda vacancyId aja
        "VacancyStatusId": vacancyStatus.id,
        "VacancyType": vacancyType.value, //
        "EventId": form.eventName,
        "PublishDate": _publishDate,
        "EndDate": _endDate,
        "PositionId": form.position,
        "VacancyTitle": form.vacancyTitle,
        "CompanyId": form.company,
        "Category": category.value, //
        "FunctionId": form.function,
        "JobSpecializationId": form.jobSpecialization,
        "GeneralFilterId": form.generalFilter,
        "publishType": vacancyType.value, //
        "JobDescription": form.indonesiaJobDescription,
        "JobDescriptionEnglish": form.englishJobDescription,
        "JobRequirement": form.indonesiaJobRequirement,
        "JobRequirementEnglish": form.englishJobRequirement,
        "CompetenceDescription": form.competenceDescription,
        "TotalNeeds": parseInt(form.totalNeeds), //angka
        "TotalFulfilled": form.totalFullfilled,
        "ATSPhaseTypeId": form.candidateType, //id
        "CandidateType": candidate.value, //string
        "Notes": form.notes,
        "Phases": phases
      }
    }
    const response = yield call(POST, Config.BASE_URL + link, body, { headers: Header() });
    console.log(body)
    if (response.Acknowledge === 1) {
      messages("Success", 'Data has been saved', "success", false);
      history.goBack()
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* updateDraftVacancy(value) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    const auth = yield select(getStateAuth);
    let form = vacancy.formVacancy
    let formAtsPhaseType = vacancy.formATSPhaseType
    let phases = []
    let from = value.data
    let history = value.history
    let link = ''
    let body = {}
    formAtsPhaseType.atsPhase.map((obj) => {
      let data = { "phaseName": obj.name, "phaseTitle": obj.labelName }
      phases.push(data)
    })

    let _publishDate = moment(form.publishDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let _endDate = moment(form.endDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let vacancyType = vacancy.vacancyTypeList.find(obj => form.vacancyType === obj.id)
    let category = vacancy.categoryList.find(obj => form.category === obj.id)
    let candidate = vacancy.candidateTypeList.find(obj => form.candidateType === obj.id)
    let vacStatusDraft = vacancy.vacancyStatusList.find(obj => obj.name.toLowerCase() === "draft")
    let vacancyStatus
    if(auth.roleName.toLowerCase() === "ho"){
      vacancyStatus = vacancy.vacancyStatusList.find(obj => obj.name.toLowerCase() === "waiting for publish")
    }else{
      vacancyStatus = vacancy.vacancyStatusList.find(obj => obj.name.toLowerCase() === "waiting for approval")
    }
    if (from === "submitDraft") {
      link = Endpoint.UPDATE_VACANCY
      body = {
        "VacancyId": vacancy.vacancyId, //beda vacancyId aja
        "VacancyStatusId": vacancyStatus.id, // auth.roleName == "ho" ? 4 : 3, //form.vacancyStatus, 
        "VacancyType": vacancyType.value, //
        "EventId": form.eventName,
        "PublishDate": _publishDate,
        "EndDate": _endDate,
        "PositionId": form.position,
        "VacancyTitle": form.vacancyTitle,
        "CompanyId": form.company,
        "Category": category.value,
        "FunctionId": form.function,
        "JobSpecializationId": form.jobSpecialization,
        "GeneralFilterId": form.generalFilter,
        "publishType": vacancyType.value, 
        "JobDescription": form.indonesiaJobDescription,
        "JobDescriptionEnglish": form.englishJobDescription,
        "JobRequirement": form.indonesiaJobRequirement,
        "JobRequirementEnglish": form.englishJobRequirement,
        "CompetenceDescription": form.competenceDescription,
        "TotalNeeds": form.totalNeeds, //angka
        "TotalFulfilled": form.totalFullfilled,
        "CandidateType": candidate.value, //string
        "ATSPhaseTypeId": form.candidateType, //id
        "Notes": form.notes,
        "Phases": phases
      }
    } else if (from === "updateDraft") {
      link = Endpoint.UPDATE_VACANCY
      body = {
        "VacancyId": vacancy.vacancyId, //beda vacancyId aja
        "VacancyStatusId": vacStatusDraft.id,
        "VacancyType": vacancyType.value,
        "EventId": form.eventName,
        "PublishDate": _publishDate,
        "EndDate": _endDate,
        "PositionId": form.position,
        "VacancyTitle": form.vacancyTitle,
        "CompanyId": form.company,
        "Category": category.value,
        "FunctionId": form.function,
        "JobSpecializationId": form.jobSpecialization,
        "GeneralFilterId": form.generalFilter,
        "publishType": vacancyType.value, 
        "JobDescription": form.indonesiaJobDescription,
        "JobDescriptionEnglish": form.englishJobDescription,
        "JobRequirement": form.indonesiaJobRequirement,
        "JobRequirementEnglish": form.englishJobRequirement,
        "CompetenceDescription": form.competenceDescription,
        "TotalNeeds": form.totalNeeds, //angka
        "TotalFulfilled": form.totalFullfilled,
        "CandidateType": candidate.value, //string
        "ATSPhaseTypeId": form.candidateType, //id
        "Notes": form.notes,
        "Phases": phases
      }
    }
    const response = yield call(POST, Config.BASE_URL + link, body, { headers: Header() });
    if (response.Acknowledge === 1) {
      messages("Success", 'Data has been saved', "success", false);
      history.goBack()
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* draftVacancy(value) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let history = value.history
    let form = vacancy.formVacancy
    let formAtsPhaseType = vacancy.formATSPhaseType
    let phases = []
    formAtsPhaseType.atsPhase.map((obj) => {
      let data = { "phaseName": obj.name, "phaseTitle": obj.labelName }
      phases.push(data)
    })
    let _publishDate = moment(form.publishDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let _endDate = moment(form.endDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    let vacancyType = vacancy.vacancyTypeList.find(obj => form.vacancyType === obj.id)
    let category = vacancy.categoryList.find(obj => form.category === obj.id)
    let candidate = vacancy.candidateTypeList.find(obj => form.candidateType === obj.id)
    let body = {
      "VacancyType": vacancyType.value,
      "EventId": form.eventName,
      "PublishDate": _publishDate,
      "EndDate": _endDate,
      "PositionId": form.position,
      "VacancyTitle": form.vacancyTitle,
      "CompanyId": form.company,
      "Category": category.value,
      "FunctionId": form.function,
      "JobSpecializationId": form.jobSpecialization,
      "GeneralFilterId": form.generalFilter,
      "publishType": vacancyType.value, 
      "JobDescription": form.indonesiaJobDescription,
      "JobDescriptionEnglish": form.englishJobDescription,
      "JobRequirement": form.indonesiaJobRequirement,
      "JobRequirementEnglish": form.englishJobRequirement,
      "CompetenceDescription": form.competenceDescription,
      "TotalNeeds": form.totalNeeds, //angka
      "TotalFulfilled": form.totalFullfilled,
      "CandidateType": candidate.value, //string
      "ATSPhaseTypeId": form.candidateType,//id
      "Notes": form.notes,
      "Phases": phases
    }
    const data = yield call(POST, Config.API_VACANCY + Endpoint.DRAFT_VACANCY, body, { headers: Header() });
    
    if (data.Acknowledge === 1) {
      messages("Success", 'Data has been save as draft', "success", false);
      history.goBack()
    }
    else {
      messages("Error", data.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* approveVacancy(value) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let from = value.data
    let history = value.history
    let link = null

    if (from === "approve") {
      link = Endpoint.APPROVE_VACANCY
    } else if (from === "revise") {
      link = Endpoint.REVISE_VACANCY
    } else if (from === "reject") {
      link = Endpoint.REJECT_VACANCY
    }
    let body = {
      "VacancyId": vacancy.vacancyId,
      "Notes": vacancy.formVacancy.notes,
      "VacancyTitle": vacancy.formVacancy.vacancyTitle,
      "JobDescription": vacancy.formVacancy.indonesiaJobDescription,
      "JobDescriptionEnglish": vacancy.formVacancy.englishJobDescription,
      "JobRequirement": vacancy.formVacancy.indonesiaJobRequirement,
      "JobRequirementEnglish": vacancy.formVacancy.englishJobRequirement,
      "CompetencyDescription": vacancy.formVacancy.competenceDescription,
      "totalFulfilled": vacancy.formVacancy.totalFullfilled
    }
    const data = yield call(POST, Config.API_VACANCY + link, body, { headers: Header() });

    if (data.Acknowledge === 1) {
      messages("Success", 'Data has been saved', "success", false);
      history.goBack()
    }
    else {
      messages("Error", data.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getEventCreateLoad() {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let body = {}
    const response = yield call(POST, Config.API_EVENT + Endpoint.LOAD_EVENT, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: HANDLE_STATE_VACANCY, field: "eventListData", value: response.EventList });
      yield put({ type: HANDLE_STATE_VACANCY, field: "groupEventList", value: response.GroupEventList });
      yield put({ type: HANDLE_STATE_VACANCY, field: "mediaList", value: response.MediaList });
      yield put({ type: GET_EVENT_LIST_MASTER });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* getEventListMaster() {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let body = {
      "eventId": 0,
      "eventDescription": ""
    }
    const response = yield call(POST, Config.API_EVENT + Endpoint.LIST_EVENT, body, { headers: Header() });

    if (response.Acknowledge === 1) {
      yield put({ type: HANDLE_STATE_EVENT_LIST_MASTER, field: "eventListMaster", value: response.EventList });
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export function* deleteVacancy(data) {
  try {
    yield put(setLoader(true));
    const vacancy = yield select(getStateVacancy);
    let vacancyId = data.data
    let body = {
      "vacancyId": vacancyId
    }

    const response = yield call(POST, Config.API_VACANCY + Endpoint.DELETE_VACANCY, body, { headers: Header() });
    

    if (response.Acknowledge === 1) {
      messages("Success", response.Message, "success", false);
      yield put({ type: GET_ACTIVE_VACANCY })
    }
    else {
      messages("Error", response.Message, "error", false);
    }
    yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    messages("Info", "Oops, something wrong !", "info", false);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_ACTIVE_VACANCY, hitActiveVacancy),
    takeLatest(GET_REVISION_VACANCY, hitRevisionVacancy),
    takeLatest(GET_APPROVAL_VACANCY, hitApprovalVacancy),
    takeLatest(GET_DRAFT_VACANCY, hitDraftVacancy),
    takeLatest(GET_CLOSED_VACANCY, hitClosedVacancy),
    takeLatest(GET_ARCHIVED_VACANCY, hitArchivedVacancy),
    takeLatest(GET_LOAD_FORM_VACANCY, hitLoadVacancyForm),
    takeLatest(GET_LOAD_FORM_VACANCY2, hitLoadVacancyForm2),
    takeLatest(GET_DETAILS_VACANCY, hitDetailsVacancy),
    takeLatest(SUBMIT_VACANCY, submitVacancy),
    takeLatest(DRAFT_VACANCY, draftVacancy),
    takeLatest(UPDATE_DRAFT_VACANCY, updateDraftVacancy),
    takeLatest(APPROVE_VACANCY, approveVacancy),
    takeLatest(GET_EVENT_CREATE_LOAD, getEventCreateLoad),
    takeLatest(GET_EVENT_LIST_MASTER, getEventListMaster),
    takeLatest(DELETE_VACANCY, deleteVacancy),
    takeLatest(GET_DETAILS_ATS_PHASE_TYPE, getDetailATSPhaseType),
    takeLatest(CLOSE_VACANCY, closeVacancy),
  ]);
}
