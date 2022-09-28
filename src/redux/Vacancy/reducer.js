import {
  SET_LOADER,
  INIT_STATE_VACANCY,
  INIT_FORM_SEARCH,
  INIT_FORM_SEARCH_APPROVAL,
  INIT_FORM_SEARCH_DRAFT,
  INIT_FORM_SEARCH_CLOSED,
  INIT_FORM_SEARCH_REVISION,
  INIT_FORM_SEARCH_ARCHIVED,
  INIT_FORM_VACANCY,
  INIT_PAGING,

  HANDLE_STATE_VACANCY,
  HANDLE_STATE_VACANCY_STATUS,
  HANDLE_STATE_EVENT_NAME,
  HANDLE_STATE_POSITION,
  HANDLE_STATE_FORM_VACANCY,
  HANDLE_STATE_EVENT_LIST_MASTER,
  HANDLE_CANDIDATE_TYPE,

  GET_ACTIVE_VACANCY_SEARCH,
  GET_REVISION_VACANCY_SEARCH,
  GET_APPROVAL_VACANCY_SEARCH,
  GET_DRAFT_VACANCY_SEARCH,
  GET_CLOSED_VACANCY_SEARCH,
  GET_ARCHIVED_VACANCY_SEARCH,

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
  HANDLE_STATE_COMPANY
} from "../types";
import moment from 'moment'

const initState = {
  // roles: '',
  isLoading: false,
  isDisabled: false,
  fromPage: "",
  userLogin: "",
  statusCallback: "1",

  pageNo: 1,
  pageSize: 10,
  totalRows: 0,
  totalRowsMaster: 0,
  vacancyCode: "",
  vacancyTitle: "",
  company: "",
  totalNeeds: "",
  totalFulfillment: "",
  candidates: "",
  status: "",
  gridActiveVacancy: [],
  gridActiveVacancyMaster: [],
  filteredActiveVacancy: [],
  vacancyStatusField: [{ id: 1, value: "Active", name: "Active" }, { id: 4, value: "Waiting for Publish", name: "Waiting for Publish" }, { id: 5, value: "Published", name: "Published" }, { id: 15, value: "Internal Use", name: "Internal Use" }],

  vacancyCodeRevision: "",
  vacancyTitleRevision: "",
  companyRevision: "",
  totalNeedsRevision: "",
  totalFulfillmentRevision: "",
  candidatesRevision: "",
  statusRevision: "",
  gridRevisionVacancy: [],
  gridRevisionVacancyMaster: [],
  filteredRevisionVacancy: [],
  vacancyStatusRevisionField: [{ id: 7, value: "Waiting for Revision", name: "Waiting for Revision" }],

  vacancyCodeApproval: "",
  vacancyTitleApproval: "",
  companyApproval: "",
  totalNeedsApproval: "",
  totalFulfillmentApproval: "",
  candidatesApproval: "",
  statusApproval: "",
  gridApprovalVacancy: [],
  gridApprovalVacancyMaster: [],
  filteredApprovalVacancy: [],
  vacancyStatusApprovalField: [{ id: 3, value: "Waiting for Approval", name: "Waiting for Approval" }],

  vacancyCodeDraft: "",
  vacancyTitleDraft: "",
  companyDraft: "",
  totalNeedsDraft: "",
  totalFulfillmentDraft: "",
  candidatesDraft: "",
  statusDraft: "",
  gridDraftVacancy: [],
  gridDraftVacancyMaster: [],
  filteredDraftVacancy: [],
  vacancyStatusDraftField: [{ id: 2, value: "Draft", name: "Draft" }],

  vacancyCodeClosed: "",
  vacancyTitleClosed: "",
  companyClosed: "",
  totalNeedsClosed: "",
  totalFulfillmentClosed: "",
  candidatesClosed: "",
  statusClosed: "",
  gridClosedVacancy: [],
  gridClosedVacancyMaster: [],
  filteredClosedVacancy: [],
  vacancyStatusClosedField: [{ id: 9, value: "Closed", name: "Closed" }],

  vacancyCodeArchived: "",
  vacancyTitleArchived: "",
  companyArchived: "",
  totalNeedsArchived: "",
  totalFulfillmentArchived: "",
  candidatesArchived: "",
  statusArchived: "",
  gridArchivedVacancy: [],
  gridArchivedVacancyMaster: [],
  filteredArchivedVacancy: [],
  vacancyStatusArchivedField: [{ id: 16, value: "Archived", name: "Archived" }],

  eventListData: [],
  groupEventList: [],
  mediaList: [],
  eventListMaster: [],

  vacancyId: '',
  eventList: [],
  vacancyStatusList: [],
  vacancyStatusListMaster: [],
  positionList: [],
  companyList: [],
  functionList: [],
  jobSpecializationList: [],
  atsPhaseTypeList: [],

  //ID => 16 Archived, 15 Internal Use, 9 Closed,
  vacancyStatusCreate: [{ id: 5, value: "Publish", name: "Publish" }, { id: 15, value: "Internal Use", name: "Internal Use" }],
  vacancyStatusWaitingForPublish: [{ id: 4, value: "Waiting for Publish", name: "Waiting for Publish" }, { id: 5, value: "Published", name: "Published" }, { id: 15, value: "Internal Use", name: "Internal Use" }, { id: 9, value: "Closed", name: "Closed" }, { id: 16, value: "Archived", name: "Archived" }],
  vacancyStatusPublished: [{ id: 5, value: "Published", name: "Published" }, { id: 15, value: "Internal Use", name: "Internal Use" }, { id: 9, value: "Closed", name: "Closed" }, { id: 16, value: "Archived", name: "Archived" }],
  vacancyStatusInternalUse: [{ id: 15, value: "Internal Use", name: "Internal Use" }, { id: 9, value: "Closed", name: "Closed" }, { id: 16, value: "Archived", name: "Archived" }],
  vacancyStatusClosed: [{ id: 9, value: "Closed", name: "Closed" }, { id: 16, value: "Archived", name: "Archived" }],
  vacancyStatus: {
    id: '',
    name: '',
    value: ''
  }, //Sama kaya di formVacancy, cuma ini ga di ganti2 aja

  generalFilterList: [],
  categoryList: [
    { id: 3, value: "All", name: "All" },
    { id: 1, value: "Fresh Graduate/Student", name: "Fresh Graduate/Student" },
    { id: 2, value: "Professional", name: "Professional" },
  ],
  vacancyTypeList: [{ id: 1, value: "private", name: "private" }, { id: 2, value: "public", name: "public" }],
  candidateTypeList: [], // [{ id: 1, value: "General", name: "General" }, { id: 2, value: "MT & Trainee", name: "MT & Trainee" }, { id: 3, value: "Pro Hire", name: "Pro Hire" }, { id: 4, value: "Refference", name: "Refference" }],
  formVacancy: {
    documentStatus: '',
    vacancyStatus: '', //publish, internal use
    vacancyType: '', //private, public
    createDate: moment(), //auto generate
    eventName: '',
    publishDate: '', //moment()
    endDate: '', //moment()
    position: '',
    vacancyCode: '', //auto generate
    vacancyTitle: '',
    company: '',
    category: '', //fresh graduate, professional, all
    function: '',
    jobSpecialization: '',
    generalFilter: '',
    businessLine:'',
    indonesiaJobDescription:'', //indonesia
    englishJobDescription:'',
    indonesiaJobRequirement: '',//indonesia
    englishJobRequirement:'',
    competenceDescription: '',
    totalNeeds: '',
    totalFullfilled: '',
    candidateType: '', //general, MT & Trainee, Pro Hire, Refference
    notes: '',
    notesHistory: '',
    phases: [],
    phaseName: '',
    phaseTitle: '',
    onlineTest: 'Online Test',
    flk: 'FLK',
    cbt: 'CBT',
    fgd: 'FGD',
    interview: 'Interview'
  },
  formATSPhaseType: {
    phaseTypeCode: '',
    phaseType: '',
    description: '',
    atsPhase: [],
  },
  phaseTypeList: [],
  sourceATSPhase: [],
  sourceApplicantPhase: [],
  isGeneralFilter: '',
};


export default function VacancyReducer(state = initState, action) {
  switch (action.type) {
    case SET_LOADER: {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case INIT_STATE_VACANCY: {
      return {
        ...state,
        fromPage: '',
        vacancyId: '',
        vacancyStatus: {
          id: '',
          value: '',
          name: ''
        },
      }
    }
    case INIT_PAGING: {
      return {
        ...state,
        pageNo: 1,
        pageSize: 10,
        totalRows: 0,
        totalRowsMaster: 0,
      }
    }
    case INIT_FORM_SEARCH: {
      return {
        ...state,
        vacancyTitle: "",
        vacancyCode:"",
        company: "",
        totalNeeds: "",
        totalFulfillment: "",
        candidates: "",
        status: "",
      }
    }
    case INIT_FORM_SEARCH_APPROVAL: {
      return {
        ...state,
        vacancyCodeApproval: "",
        vacancyTitleApproval: "",
        companyApproval: "",
        totalNeedsApproval: "",
        totalFulfillmentApproval: "",
        candidatesApproval: "",
        statusApproval: "",
      }
    }
    case INIT_FORM_SEARCH_DRAFT: {
      return {
        ...state,
        vacancyCodeDraft: "",
        vacancyTitleDraft: "",
        companyDraft: "",
        totalNeedsDraft: "",
        totalFulfillmentDraft: "",
        candidatesDraft: "",
        statusDraft: "",
      }
    }
    case INIT_FORM_SEARCH_CLOSED: {
      return {
        ...state,
        vacancyCodeClosed: "",
        vacancyTitleClosed: "",
        companyClosed: "",
        totalNeedsClosed: "",
        totalFulfillmentClosed: "",
        candidatesClosed: "",
        statusClosed: "",
      }
    }
    case INIT_FORM_SEARCH_REVISION: {
      return {
        ...state,
        vacancyCodeRevision: "",
        vacancyTitleRevision: "",
        companyRevision: "",
        totalNeedsRevision: "",
        totalFulfillmentRevision: "",
        candidatesRevision: "",
        statusRevision: "",
      }
    }
    case INIT_FORM_SEARCH_ARCHIVED: {
      return {
        ...state,
        vacancyCodeArchived: "",
        vacancyTitleArchived: "",
        companyArchived: "",
        totalNeedsArchived: "",
        totalFulfillmentArchived: "",
        candidatesArchived: "",
        statusArchived: "",
      }
    }
    case INIT_FORM_VACANCY: {
      return {
        ...state,
        formVacancy: {
          ...state.formVacancy,
          // documentStatus: null,
          vacancyStatus: undefined,
          vacancyType: undefined,
          createDate: moment(),
          eventName: undefined,
          publishDate: '',
          endDate: undefined,
          position: undefined,
          vacancyCode: undefined,
          vacancyTitle: undefined,
          company: undefined,
          category: undefined,
          function: undefined,
          jobSpecialization: undefined,
          generalFilter: undefined,

          businessLine:'',
          indonesiaJobDescription:'',
          englishJobDescription:'',
          indonesiaJobRequirement: '',
          englishJobRequirement:'',

          competenceDescription: undefined,
          totalNeeds: undefined,
          totalFullfilled: undefined,
          candidateType: undefined,
          notes: undefined,
          notesHistory: undefined,
          phases: [],
          phaseName: undefined,
          phaseTitle: undefined,
          onlineTest: "Online Test",
          flk: "FLK",
          cbt: "CBT",
          fgd: "FGD",
          interview: "Interview"
        },
        formATSPhaseType: {
          phaseTypeCode: '',
          phaseType: '',
          description: '',
          atsPhase: [],
        },
        phaseTypeList: [],
        sourceATSPhase: [],
        sourceApplicantPhase: [],
        isGeneralFilter: ''
      }
    }
    case HANDLE_STATE_VACANCY:
      return {
        ...state,
        [action.field]: action.value
      }
    case HANDLE_STATE_FORM_VACANCY:
      // state.formVacancy[action.field] = action.value
      return {
        ...state,
        formVacancy: { ...state.formVacancy, [action.field]: action.value }
      }
    case HANDLE_STATE_VACANCY_STATUS: {
      let userRole = action.data
      let vacancyType = action.value
      let status = ''
      if (userRole == "ho" || userRole == "aiho") {
        switch (vacancyType) {
          case 1: //private
            status = "internal use" //Internal Use
            break;
          case 2: //public
            status = "waiting for publish" //Waiting for Publish
            break;
          case 3:
            status = "closed"
          default:
            break;
        }
      } else if (userRole == "affco") {
        switch (vacancyType) {
          case 1: //private
            status = "internal use" //Internal User
            break;
          case 2: //public
            status = "waiting for approval" //Waiting for Approval
            break;
          case 3:
            status = "waiting for approval"
          default:
            break;
        }
      }
      return {
        ...state,
        formVacancy: {
          ...state.formVacancy,
          [action.field]: action.value,
          vacancyStatus: status
        }
      }
    }
    case HANDLE_STATE_EVENT_NAME: {
      let event = action.value
      let _vacancyCode = ''
      let eventListMaster = state.eventListMaster
      let company = state.formVacancy.company
      let matchEvent = eventListMaster.find(obj => obj.EventId === event)
      let _event = state.eventList.find(obj => obj.id === event)
      let position = state.positionList.find(obj => obj.id === state.formVacancy.position)
      if (position != undefined && company != undefined) {
        let bag1 = _event.value.concat("/", position.positionCode)
        _vacancyCode = bag1.concat("/", company)
      }
      var eventEndDate = moment(matchEvent.EndDate)
      var tempEndDate = eventEndDate.clone().add(60,'day')
      return {
        ...state,
        formVacancy: {
          ...state.formVacancy,
          [action.field]: action.value,
          publishDate: moment(matchEvent.StartDate),
          endDate: tempEndDate,
          vacancyCode: _vacancyCode
        }
      }
    }
    case HANDLE_STATE_POSITION: {
      let _vacancyCode = ''
      let position = action.value
      let company = state.formVacancy.company
      let event = state.eventList.find(obj => obj.id === state.formVacancy.eventName)
      let _position = state.positionList.find(obj => obj.id === position)
      if (event != undefined && company != undefined) {
        let bag1 = event.value.concat("/", _position.positionCode)
        _vacancyCode = bag1.concat("/", company)
      }
      return {
        ...state,
        formVacancy: {
          ...state.formVacancy,
          [action.field]: action.value,
          vacancyCode: _vacancyCode
        }
      }
    }
    case HANDLE_STATE_COMPANY: {
      let _vacancyCode = ''
      let company = action.value
      let position = state.formVacancy.position
      let businessLine = state.companyList.find(obj => obj.id === action.value)
      let event = state.eventList.find(obj => obj.id === state.formVacancy.eventName)
      let _position = state.positionList.find(obj => obj.id === position)
      if (event != undefined && position != undefined) {
        let bag1 = event.value.concat("/", _position.positionCode)
        _vacancyCode = bag1.concat("/", company)
      }
      return {
        ...state,
        formVacancy: {
          ...state.formVacancy,
          [action.field]: action.value,
          vacancyCode: _vacancyCode,
          businessLine: businessLine.businessLine
        }
      }
    }
    case HANDLE_STATE_EVENT_LIST_MASTER: {
      let eventListMaster = action.value
      let i
      let data = []
      let dateNow = moment().format('DD/MM/YYYY')
      let eventValidDate = eventListMaster.filter(obj => obj.EndDate > dateNow)
      let _eventList = state.eventList
      let eventListData = _eventList.filter(obj => eventValidDate.find(obj1 => obj1.EventName === obj.name))
      return {
        ...state,
        [action.field]: action.value,
        eventList: eventListData
      }
    }
    case GET_ACTIVE_VACANCY_SEARCH: {
      let filteredActiveVacancy = [];
      if (state.gridActiveVacancyMaster.length != 0) {
        for (let i = 0; i < state.gridActiveVacancyMaster.length; i++) {
          if (action.filter.VacancyTitle != "") {
            if (action.filter.VacancyTitle === state.gridActiveVacancyMaster[i].VacancyTitle) {
              filteredActiveVacancy.push(state.gridActiveVacancyMaster[i]);
            }
          } else {
            if (action.filter.VacancyStatusName != "") {
              if (action.filter.VacancyStatusName === state.gridActiveVacancyMaster[i].VacancyStatusName) {
                filteredActiveVacancy.push(state.gridActiveVacancyMaster[i]);
              }
            } else {
              if (action.filter.Company != "") {
                if (action.filter.Company === state.gridActiveVacancyMaster[i].Company) {
                  filteredActiveVacancy.push(state.gridActiveVacancyMaster[i]);
                }
              } else {
                if (action.filter.TotalNeeds != "") {
                  if (action.filter.TotalNeeds == state.gridActiveVacancyMaster[i].TotalNeeds) {
                    filteredActiveVacancy.push(state.gridActiveVacancyMaster[i]);
                  }
                } else {
                  if (action.filter.TotalFulfilled != "") {
                    if (action.filter.TotalFulfilled == state.gridActiveVacancyMaster[i].TotalFulfilled) {
                      filteredActiveVacancy.push(state.gridActiveVacancyMaster[i]);
                    }
                  } else {
                    if (action.filter.CandidateType != "") {
                      if (action.filter.CandidateType == state.gridActiveVacancyMaster[i].CandidateType) {
                        filteredActiveVacancy.push(state.gridActiveVacancyMaster[i]);
                      }
                    } else {
                      if (action.filter.VacancyCode != "") {
                        if (action.filter.VacancyCode == state.gridActiveVacancyMaster[i].VacancyCode) {
                          filteredActiveVacancy.push(state.gridActiveVacancyMaster[i]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        gridActiveVacancy: filteredActiveVacancy
      }
    }
    case GET_REVISION_VACANCY_SEARCH: {
      let filteredRevisionVacancy = [];
      // filteredRevisionVacancy.filter((gridRevisionVacancyMaster, index) => object.id == 1)
      if (state.gridRevisionVacancyMaster.length != 0) {
        for (let i = 0; i < state.gridRevisionVacancyMaster.length; i++) {
          if (action.filter.VacancyTitle != "") {
            if (action.filter.VacancyTitle === state.gridRevisionVacancyMaster[i].VacancyTitle) {
              filteredRevisionVacancy.push(state.gridRevisionVacancyMaster[i]);
            }
          } else {
            if (action.filter.VacancyStatusName != "") {
              if (action.filter.VacancyStatusName === state.gridRevisionVacancyMaster[i].VacancyStatusName) {
                filteredRevisionVacancy.push(state.gridRevisionVacancyMaster[i]);
              }
            } else {
              if (action.filter.Company != "") {
                if (action.filter.Company === state.gridRevisionVacancyMaster[i].Company) {
                  filteredRevisionVacancy.push(state.gridRevisionVacancyMaster[i]);
                }
              } else {
                if (action.filter.TotalNeeds != "") {
                  if (action.filter.TotalNeeds == state.gridRevisionVacancyMaster[i].TotalNeeds) {
                    filteredRevisionVacancy.push(state.gridRevisionVacancyMaster[i]);
                  }
                } else {
                  if (action.filter.TotalFulfilled != "") {
                    if (action.filter.TotalFulfilled == state.gridRevisionVacancyMaster[i].TotalFulfilled) {
                      filteredRevisionVacancy.push(state.gridRevisionVacancyMaster[i]);
                    }
                  } else {
                    if (action.filter.CandidateType != "") {
                      if (action.filter.CandidateType == state.gridRevisionVacancyMaster[i].CandidateType) {
                        filteredRevisionVacancy.push(state.gridRevisionVacancyMaster[i]);
                      }
                    } else {
                      if (action.filter.VacancyCode != "") {
                        if (action.filter.VacancyCode == state.gridRevisionVacancyMaster[i].VacancyCode) {
                          filteredRevisionVacancy.push(state.gridRevisionVacancyMaster[i]);
                        }
                      }
                    } 
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        gridRevisionVacancy: filteredRevisionVacancy
      }
    }
    case GET_APPROVAL_VACANCY_SEARCH: {
      let filteredApprovalVacancy = [];
      // filteredApprovalVacancy.filter((gridApprovalVacancyMaster, index) => object.id == 1)
      if (state.gridApprovalVacancyMaster.length != 0) {
        for (let i = 0; i < state.gridApprovalVacancyMaster.length; i++) {
          if (action.filter.VacancyTitle != "") {
            if (action.filter.VacancyTitle === state.gridApprovalVacancyMaster[i].VacancyTitle) {
              filteredApprovalVacancy.push(state.gridApprovalVacancyMaster[i]);
            }
          } else {
            if (action.filter.VacancyStatusName != "") {
              if (action.filter.VacancyStatusName === state.gridApprovalVacancyMaster[i].VacancyStatusName) {
                filteredApprovalVacancy.push(state.gridApprovalVacancyMaster[i]);
              }
            } else {
              if (action.filter.Company != "") {
                if (action.filter.Company === state.gridApprovalVacancyMaster[i].Company) {
                  filteredApprovalVacancy.push(state.gridApprovalVacancyMaster[i]);
                }
              } else {
                if (action.filter.TotalNeeds != "") {
                  if (action.filter.TotalNeeds == state.gridApprovalVacancyMaster[i].TotalNeeds) {
                    filteredApprovalVacancy.push(state.gridApprovalVacancyMaster[i]);
                  }
                } else {
                  if (action.filter.TotalFulfilled != "") {
                    if (action.filter.TotalFulfilled == state.gridApprovalVacancyMaster[i].TotalFulfilled) {
                      filteredApprovalVacancy.push(state.gridApprovalVacancyMaster[i]);
                    }
                  } else {
                    if (action.filter.CandidateType != "") {
                      if (action.filter.CandidateType == state.gridApprovalVacancyMaster[i].CandidateType) {
                        filteredApprovalVacancy.push(state.gridApprovalVacancyMaster[i]);
                      }
                    } else {
                      if (action.filter.VacancyCode != "") {
                        if (action.filter.VacancyCode == state.gridApprovalVacancyMaster[i].VacancyCode) {
                          filteredApprovalVacancy.push(state.gridApprovalVacancyMaster[i]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        gridApprovalVacancy: filteredApprovalVacancy
      }
    }
    case GET_DRAFT_VACANCY_SEARCH: {
      let filteredDraftVacancy = [];
      // filteredDraftVacancy.filter((gridDraftVacancyMaster, index) => object.id == 1)
      if (state.gridDraftVacancyMaster.length != 0) {
        for (let i = 0; i < state.gridDraftVacancyMaster.length; i++) {
          if (action.filter.VacancyTitle != "") {
            if (action.filter.VacancyTitle === state.gridDraftVacancyMaster[i].VacancyTitle) {
              filteredDraftVacancy.push(state.gridDraftVacancyMaster[i]);
            }
          } else {
            if (action.filter.VacancyStatusName != "") {
              if (action.filter.VacancyStatusName === state.gridDraftVacancyMaster[i].VacancyStatusName) {
                filteredDraftVacancy.push(state.gridDraftVacancyMaster[i]);
              }
            } else {
              if (action.filter.Company != "") {
                if (action.filter.Company === state.gridDraftVacancyMaster[i].Company) {
                  filteredDraftVacancy.push(state.gridDraftVacancyMaster[i]);
                }
              } else {
                if (action.filter.TotalNeeds != "") {
                  if (action.filter.TotalNeeds == state.gridDraftVacancyMaster[i].TotalNeeds) {
                    filteredDraftVacancy.push(state.gridDraftVacancyMaster[i]);
                  }
                } else {
                  if (action.filter.TotalFulfilled != "") {
                    if (action.filter.TotalFulfilled == state.gridDraftVacancyMaster[i].TotalFulfilled) {
                      filteredDraftVacancy.push(state.gridDraftVacancyMaster[i]);
                    }
                  } else {
                    if (action.filter.CandidateType != "") {
                      if (action.filter.CandidateType == state.gridDraftVacancyMaster[i].CandidateType) {
                        filteredDraftVacancy.push(state.gridDraftVacancyMaster[i]);
                      }
                    } else {
                      if (action.filter.VacancyCode != "") {
                        if (action.filter.VacancyCode == state.gridDraftVacancyMaster[i].VacancyCode) {
                          filteredDraftVacancy.push(state.gridDraftVacancyMaster[i]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        gridDraftVacancy: filteredDraftVacancy
      }
    }
    case GET_CLOSED_VACANCY_SEARCH: {
      let filteredClosedVacancy = [];
      // filteredClosedVacancy.filter((gridClosedVacancyMaster, index) => object.id == 1)
      if (state.gridClosedVacancyMaster.length != 0) {
        for (let i = 0; i < state.gridClosedVacancyMaster.length; i++) {
          if (action.filter.VacancyTitle != "") {
            if (action.filter.VacancyTitle === state.gridClosedVacancyMaster[i].VacancyTitle) {
              filteredClosedVacancy.push(state.gridClosedVacancyMaster[i]);
            }
          } else {
            if (action.filter.VacancyStatusName != "") {
              if (action.filter.VacancyStatusName === state.gridClosedVacancyMaster[i].VacancyStatusName) {
                filteredClosedVacancy.push(state.gridClosedVacancyMaster[i]);
              }
            } else {
              if (action.filter.Company != "") {
                if (action.filter.Company === state.gridClosedVacancyMaster[i].Company) {
                  filteredClosedVacancy.push(state.gridClosedVacancyMaster[i]);
                }
              } else {
                if (action.filter.TotalNeeds != "") {
                  if (action.filter.TotalNeeds == state.gridClosedVacancyMaster[i].TotalNeeds) {
                    filteredClosedVacancy.push(state.gridClosedVacancyMaster[i]);
                  }
                } else {
                  if (action.filter.TotalFulfilled != "") {
                    if (action.filter.TotalFulfilled == state.gridClosedVacancyMaster[i].TotalFulfilled) {
                      filteredClosedVacancy.push(state.gridClosedVacancyMaster[i]);
                    }
                  } else {
                    if (action.filter.CandidateType != "") {
                      if (action.filter.CandidateType == state.gridClosedVacancyMaster[i].CandidateType) {
                        filteredClosedVacancy.push(state.gridClosedVacancyMaster[i]);
                      }
                    } else {
                      if (action.filter.VacancyCode != "") {
                        if (action.filter.VacancyCode == state.gridClosedVacancyMaster[i].VacancyCode) {
                          filteredClosedVacancy.push(state.gridClosedVacancyMaster[i]);
                        } else {
                          filteredClosedlVacancy.push(state.gridClosedVacancyMaster[i]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        gridClosedVacancy: filteredClosedVacancy
      }
    }
    case GET_ARCHIVED_VACANCY_SEARCH: {
      let filteredArchivedVacancy = [];
      // filteredArchivedVacancy.filter((gridArchivedVacancyMaster, index) => object.id == 1)
      if (state.gridArchivedVacancyMaster.length != 0) {
        for (let i = 0; i < state.gridArchivedVacancyMaster.length; i++) {
          if (action.filter.VacancyTitle != "") {
            if (action.filter.VacancyTitle === state.gridArchivedVacancyMaster[i].VacancyTitle) {
              filteredArchivedVacancy.push(state.gridArchivedVacancyMaster[i]);
            }
          } else {
            if (action.filter.VacancyStatusName != "") {
              if (action.filter.VacancyStatusName === state.gridArchivedVacancyMaster[i].VacancyStatusName) {
                filteredArchivedVacancy.push(state.gridArchivedVacancyMaster[i]);
              }
            } else {
              if (action.filter.Company != "") {
                if (action.filter.Company === state.gridArchivedVacancyMaster[i].Company) {
                  filteredArchivedVacancy.push(state.gridArchivedVacancyMaster[i]);
                }
              } else {
                if (action.filter.TotalNeeds != "") {
                  if (action.filter.TotalNeeds == state.gridArchivedVacancyMaster[i].TotalNeeds) {
                    filteredArchivedVacancy.push(state.gridArchivedVacancyMaster[i]);
                  }
                } else {
                  if (action.filter.TotalFulfilled != "") {
                    if (action.filter.TotalFulfilled == state.gridArchivedVacancyMaster[i].TotalFulfilled) {
                      filteredArchivedVacancy.push(state.gridArchivedVacancyMaster[i]);
                    }
                  } else {
                    if (action.filter.CandidateType != "") {
                      if (action.filter.CandidateType == state.gridArchivedVacancyMaster[i].CandidateType) {
                        filteredArchivedVacancy.push(state.gridArchivedVacancyMaster[i]);
                      }
                    } else {
                      if (action.filter.VacancyCode != "") {
                        if (action.filter.VacancyCode == state.gridArchivedVacancyMaster[i].VacancyCode) {
                          filteredArchivedVacancy.push(state.gridArchivedVacancyMaster[i]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        gridArchivedVacancy: filteredArchivedVacancy
      }
    }
    case SET_ACTIVE_LIST:
      return {
        ...state,
        gridActiveVacancy: action.value
      }
    case SET_APPROVAL_LIST:
      return {
        ...state,
        gridApprovalVacancy: action.value
      }
    case SET_REVISION_LIST:
      return {
        ...state,
        gridRevisionVacancy: action.value
      }
    case SET_DRAFT_LIST:
      return {
        ...state,
        gridDraftVacancy: action.value
      }
    case SET_CLOSED_LIST:
      return {
        ...state,
        gridClosedVacancy: action.value
      }
    case SET_ARCHIVED_LIST:
      return {
        ...state,
        gridArchivedVacancy: action.value
      }
    case SET_EVENT_LIST: {
      let list = action.value
      let i
      let data = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { 
          "id": list[i].EventId,
          "value": list[i].EventName,
          "name": list[i].EventDescription 
            ? list[i].EventDescription + " - " + list[i].EventName
            : list[i].EventName }
        data.push(value)
      }
      return {
        ...state,
        eventList: data
      }
    }
    case SET_STATUS_LIST: {
      let list = action.value
      let i
      let data = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].VacancyStatusId, "value": list[i].VacancyStatusName, "name": list[i].VacancyStatusName }
        data.push(value)
      }
      return {
        ...state,
        vacancyStatusList: data
      }
    }
    case SET_POSITION_LIST: {
      let list = action.value
      let i
      let data = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].PositionId, "value": list[i].PositionName, "name": list[i].PositionName, "positionCode": list[i].PositionCode }
        data.push(value)
      }
      return {
        ...state,
        positionList: data
      }
    }
    case SET_COMPANY_LIST: {
      let list = action.value
      let i
      let data = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].CompanyId, "value": list[i].CompanyName, "name": list[i].CompanyName, "businessLine": list[i].CompanyCategoryName}
        data.push(value)
      }
      return {
        ...state,
        companyList: data
      }
    }
    case SET_FUNCTION_LIST: {
      let list = action.value
      let i
      let data = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].VacancyDepartmentId, "value": list[i].VacancyDepartmentTitle, "name": list[i].VacancyDepartmentTitle }
        data.push(value)
      }
      return {
        ...state,
        functionList: data
      }
    }
    case SET_JOB_LIST: {
      let list = action.value
      let i
      let data = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].JobSpecializationId, "value": list[i].JobSpecializationName, "name": list[i].JobSpecializationName }
        data.push(value)
      }
      return {
        ...state,
        jobSpecializationList: data
      }
    }
    case SET_GENERAL_FILTER_LIST: {
      let list = action.value
      let i
      let data = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].GeneralFilteringId, "value": list[i].GeneralFilteringName, "name": list[i].GeneralFilteringName }
        data.push(value)
      }
      return {
        ...state,
        generalFilterList: data
      }
    }
    case SET_DETAILS_VACANCY: {
      let vacancy = action.value1.respondVacancy
      let vacancyStatus = action.value1.vacancyStatus
      let value = action.value2
      let businessLine = state.companyList.find(obj => obj.id === vacancy.CompanyId)
      return {
        ...state,
        vacancyStatus: vacancyStatus,
        formVacancy: {
          ...state.formVacancy,
          vacancyType: value.vacancyType,
          vacancyStatus: vacancyStatus.name,
          createDate: moment(vacancy.CreateDate, "DD/MM/YYYY", true),
          eventName: vacancy.EventId,
          publishDate: moment(vacancy.PublishDate, "DD/MM/YYYY", true),
          endDate: moment(vacancy.EndDate, "DD/MM/YYYY", true),
          position: vacancy.PositionId,
          vacancyCode: vacancy.VacancyCode,
          vacancyTitle: vacancy.VacancyTitle,
          company: vacancy.CompanyId,
          category: parseInt(vacancy.Category), //Dari BE di kasih string
          function: vacancy.FunctionId,
          jobSpecialization: vacancy.JobSpecializationId,
          generalFilter: vacancy.GeneralFilterId,

          businessLine: businessLine ? businessLine.businessLine : "",
          indonesiaJobDescription: vacancy.JobDescription,
          englishJobDescription: vacancy.JobDescriptionEnglish ? vacancy.JobDescriptionEnglish : "",
          indonesiaJobRequirement: vacancy.JobRequirement,
          englishJobRequirement: vacancy.JobRequirementEnglish ? vacancy.JobRequirementEnglish : "",

          competenceDescription: vacancy.CompetenceDescription,
          totalNeeds: vacancy.TotalNeeds,
          totalFullfilled: vacancy.TotalFulfilled,
          candidateType: vacancy.ATSPhaseTypeId,
          notes: '',
          notesHistory: vacancy.NotesHistory,
          phases: [],
          phaseName: '',
          phaseTitle: '',
          onlineTest: 'Online Test',
          flk: 'FLK',
          cbt: 'CBT',
          fgd: 'FGD',
          interview: 'Interview'
        }
      }
    }
    case SET_DETAILS_COPY_VACANCY: {
      let vacancy = action.value1.respondVacancy
      let vacancyStatus = action.value1.vacancyStatus
      let value = action.value2
      let businessLine = state.companyList.find(obj => obj.id === vacancy.CompanyId)

      // let vacancy = action.value1
      // let value = action.value2
      return {
        ...state,
        formVacancy: {
          ...state.formVacancy,
          vacancyType: value.vacancyType,
          vacancyStatus: vacancyStatus.name,
          createDate: moment(),
          eventName: vacancy.EventId,
          publishDate: moment(vacancy.PublishDate, "DD/MM/YYYY", true),
          endDate: moment(vacancy.EndDate, "DD/MM/YYYY", true),
          position: vacancy.PositionId,
          vacancyCode: vacancy.VacancyCode,
          vacancyTitle: vacancy.VacancyTitle,
          company: vacancy.CompanyId,
          category: parseInt(vacancy.Category), //Dari BE di kasih string
          function: vacancy.FunctionId,
          jobSpecialization: vacancy.JobSpecializationId,
          generalFilter: vacancy.GeneralFilterId,
          
          businessLine: businessLine ? businessLine.businessLine : "",
          indonesiaJobDescription: vacancy.JobDescription,
          englishJobDescription: vacancy.JobDescriptionEnglish ? vacancy.JobDescriptionEnglish : "",
          indonesiaJobRequirement: vacancy.JobRequirement,
          englishJobRequirement: vacancy.JobRequirementEnglish ? vacancy.JobRequirementEnglish : "",

          competenceDescription: vacancy.CompetenceDescription,
          totalNeeds: vacancy.TotalNeeds,
          totalFullfilled: vacancy.TotalFulfilled,
          candidateType: vacancy.ATSPhaseTypeId,
          notes: '',
          notesHistory: '',
          phases: [],
          phaseName: '',
          phaseTitle: '',
          onlineTest: 'Online Test',
          flk: 'FLK',
          cbt: 'CBT',
          fgd: 'FGD',
          interview: 'Interview'
        }
      }
    }
    case SET_VAC_ATS_PHASE_TYPE_DETAILS: {
      return {
        ...state,
        formATSPhaseType: {
          ...action.payload
        }
      }
    }
    case SET_ATSPHASETYPE_MATER_DATA_SUCCESS: {
      return {
        ...state,
        phaseTypeList: action.payload.phaseTypeList,
        sourceATSPhase: action.payload.sourceATSPhase,
        sourceApplicantPhase: action.payload.sourceApplicantPhase,
      }
    }
    case HANDLE_CANDIDATE_TYPE: {
      return {
        ...state,
        formATSPhaseType: {
          ...state.formATSPhaseType,
          atsPhase: action.value
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}





