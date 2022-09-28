import {
  SET_LOADER,
  INIT_FORM_SEARCH,
  INIT_FORM_ASSIGNMENT,
  INIT_FORM_VAC_INFO,

  HANDLE_STATE_ASSIGNMENT,
  HANDLE_STATE_FORM_ASSIGNMENT,
  HANDLE_STATE_FORM_VACANCY_INFORMATION,
  HANDLE_STATE_ADD_VAC_INFO,
  HANDLE_DELETE_VAC_INFO,
  HANDLE_EDIT_VACANCY_INFO,
  HANDLE_UPDATE_VACANCY_INFO,

  GET_ASSIGMENT_SEARCH,
  GET_VACANCY_INFORMATION,

  SET_ASSIGNMENT_LIST,
  SET_POSITION_LIST,
  SET_EMPLOYEE_STATUS_LIST,
  SET_APPLICATION_STATUS_LIST,
  SET_DETAILS_ASSIGNMENT,
  SET_VACANCY_INFORMATION_LIST,
  SUCCESS_SET_DATA_ASSIGNMENT
} from "../types";
import moment from 'moment'

const initState = {
  isLoading: false,
  isDisabled: false,
  fromPage: "",
  userLogin: "",

  pageNo: 1,
  pageSize: 10,
  totalRows: 0,
  totalRowsMaster: 0,

  dateFrom: '',
  dateTo: '',
  company: '',
  ptkNumber: '',
  function: '',
  department: '',
  division: '',
  totalNeeds: '',
  status: '',
  position: '',

  PTKNumber: "",
  Position: "",
  Department: "",
  Division: "",
  HiringManager: "",
  VacancyName: "",

  selectedRowTable: [],
  gridAssignment: [],
  gridAssignmentMaster: [],
  filteredAssignment: [],

  ptkAssignmentId: '',
  HRList: [],
  positionList: [],
  companyList: [],
  functionList: [],
  employeeStatusList: [],
  applicationStatusList: [],
  getVacancyListByID: "",
  formAssignment: {
    ptkDate: "",
    division: "",
    ptkNumber: "",
    deptHead: "",
    position: null,
    totalNeeds: null,
    golongan: "",
    fullfillDate: "",
    company: "",
    employeeStatus: "",
    department: "",
    applicationStatus: "",
    function: "",
    vacancyCode: "",
    availableCandidate: "", //auto generate
    ptkFullfillment: "",
  },

  vacancyInformationList: [],
  vacancyInformationListMaster: [],
  gridVacancyInformation: [],
  gridVacancyInformationMaster: [],

  addVacancyInformationGrid: [],
  addVacancyInformationAPI: [],
  editVacancyInformationGrid: [],
  editVacancyInformationAPI: [],

  formVacancyInformation: {
    VacancyId: "",
    VacancyCode: "",
    AvailableCandidates: "", //auto generate
    PTKFulfillment: "",
  },
};


export default function AssignmentReducer(state = initState, action) {
  switch (action.type) {
    case SET_LOADER: {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case INIT_FORM_SEARCH: {
      return {
        ...state,
        dateFrom: "",
        dateTo: "",
        company: "",
        ptkNumber: "",
        function: "",
        department: "",
        division: "",
        totalNeeds: "",
        status: "",
        position: "",
        HiringManager: "",
        VacancyName: "",
      };
    }
    case INIT_FORM_ASSIGNMENT: {
      return {
        ...state,
        formAssignment: {
          ...state.formAssignment,
          ptkDate: null,
          division: null,
          ptkNumber: null,
          deptHead: null,
          position: null,
          totalNeeds: null,
          golongan: null,
          fullfillDate: null,
          company: null,
          employeeStatus: null,
          department: null,
          applicationStatus: null,
          function: null,
          vacancyCode: null,
          availableCandidate: null,
          ptkFullfillment: null,
        }
      }
    }
    case INIT_FORM_VAC_INFO:{
      return{
        ...state,
        formVacancyInformation:{
          ...state.formVacancyInformation,
          VacancyId: "",
          VacancyCode: "",
          AvailableCandidates: "",
          PTKFulfillment: "",
        }
      }
    }
    case HANDLE_STATE_ASSIGNMENT:
      return {
        ...state,
        [action.field]: action.value
      }
    case HANDLE_STATE_FORM_ASSIGNMENT:
      return {
        ...state,
        formAssignment: { ...state.formAssignment, [action.field]: action.value }
      }
    case HANDLE_STATE_FORM_VACANCY_INFORMATION:{
      if(action.field == "VacancyCode"){
        let vacInfo = state.vacancyInformationListMaster
        let _availableCandidates = vacInfo.find(obj => action.value === obj.VacancyId)
        return{
          ...state,
          formVacancyInformation: {
            ...state.formVacancyInformation,
            [action.field]: action.value,
            VacancyId: _availableCandidates.VacancyId,
            AvailableCandidates: _availableCandidates.AvailableCandidates
          }
        }
      }else{
        
        return{
          ...state,
          formVacancyInformation: {
            ...state.formVacancyInformation,
            [action.field]: action.value
          }
        }
      }
      
    }
    case HANDLE_STATE_ADD_VAC_INFO:{
      let valueGrid = action.value
      let valueAPI = action.data
      let dataGrid=[], dataAPI=[]
      if(state.fromPage == "edit"){
        dataGrid = state.editVacancyInformationGrid
        dataAPI = state.editVacancyInformationAPI
        if(action.field == "addVacancyInformation"){
          dataGrid.push(valueGrid)
        }
        state.editVacancyInformationGrid = dataGrid
      }else if(state.fromPage == "add"){
        dataGrid = state.addVacancyInformationGrid
        dataAPI = state.addVacancyInformationAPI
        if(action.field == "addVacancyInformation"){
          dataGrid.push(valueGrid)
        }
        state.addVacancyInformationGrid = dataGrid
      }
      return{
        ...state
      }
    }
    case HANDLE_DELETE_VAC_INFO: {
      let id = action.data
      let dataGrid, dataAPI, grid
      if(action.value == "add"){
        grid = state.addVacancyInformationGrid.find(obj => obj.VacancyId == id)
        dataAPI = state.addVacancyInformationAPI.filter(obj => obj.VacancyCode !== grid.VacancyCode)
        dataGrid = state.addVacancyInformationGrid.filter(obj => obj.VacancyId != id)
        state.addVacancyInformationGrid = dataGrid
        state.addVacancyInformationAPI = dataAPI
      }else if(action.value == "edit"){
        grid = state.editVacancyInformationGrid.find(obj => obj.VacancyId == id)
        dataAPI = state.editVacancyInformationAPI.filter(obj => obj.VacancyCode !== grid.VacancyCode)
        dataGrid = state.editVacancyInformationGrid.filter(obj => obj.VacancyId != id)
        state.editVacancyInformationGrid = dataGrid
        state.editVacancyInformationAPI = dataAPI
      }
      return{
        ...state
      }
    }
    case HANDLE_EDIT_VACANCY_INFO:{
      let data
      let idSelected = action.value
      if(action.field == "add"){
        data = state.addVacancyInformationGrid.find(obj => obj.VacancyId == idSelected)
        state.formVacancyInformation = data
        return{
          ...state
        }
      }else{ // edit
        data = state.editVacancyInformationGrid.find(obj => obj.VacancyId == idSelected)
        return{
          ...state,
          formVacancyInformation:{
            ...state.formVacancyInformation,
            VacancyId: data.VacancyId,
            VacancyCode: data.VacancyCode,
            AvailableCandidates: data.AvailableCandidates,
            PTKFulfillment: data.PTKFulfillment,
          }
        }
      }
    }
    case HANDLE_UPDATE_VACANCY_INFO:{
      let dataGrid = [], dataAPI = {}, findIndexGrid, findIndexAPI
      let currentData = state.formVacancyInformation
      if(action.field == "add"){
        findIndexGrid = state.addVacancyInformationGrid.findIndex(obj => obj.VacancyId == currentData.VacancyId)
        findIndexAPI = state.addVacancyInformationAPI.findIndex(obj => obj.VacancyCode == currentData.VacancyCode)
        dataAPI = {
          "VacancyId": currentData.VacancyId,
          "VacancyCode": currentData.VacancyCode,
          "PTKFulfillment": currentData.PTKFulfillment
        }
        state.addVacancyInformationGrid[findIndexGrid] = currentData
        state.editVacancyInformationAPI[findIndexAPI] = dataAPI
      }else if(action.field == "edit"){
        findIndexGrid = state.editVacancyInformationGrid.findIndex(obj => obj.VacancyId == currentData.VacancyId)
        findIndexAPI = state.editVacancyInformationAPI.findIndex(obj => obj.VacancyCode == currentData.VacancyCode)
        dataAPI = {
          "VacancyId": currentData.VacancyId,
          "VacancyCode": currentData.VacancyCode,
          "PTKFulfillment": currentData.PTKFulfillment,
          "AvailableCandidates": currentData.AvailableCandidates
        }
        state.editVacancyInformationGrid[findIndexGrid] = currentData
        state.editVacancyInformationAPI[findIndexAPI] = dataAPI
      }
      return{
        ...state
      }
    }
    case GET_ASSIGMENT_SEARCH: {
      let filteredAssignment = [];
      if (state.gridAssignmentMaster.length != 0) {
        for (let i = 0; i < state.gridAssignmentMaster.length; i++) {
          if (action.filter.PTKNumber != "") {
            if (action.filter.PTKNumber === state.gridAssignmentMaster[i].PTKNumber) {
              filteredAssignment.push(state.gridAssignmentMaster[i]);
            }
          } else {
            if (action.filter.Position != "") {
              if (action.filter.Position === state.gridAssignmentMaster[i].Position) {
                filteredAssignment.push(state.gridAssignmentMaster[i]);
              }
            } else {
              if (action.filter.Department != "") {
                if (action.filter.Department === state.gridAssignmentMaster[i].Department) {
                  filteredAssignment.push(state.gridAssignmentMaster[i]);
                }
              } else {
                if (action.filter.Division != "") {
                  if (action.filter.Division == state.gridAssignmentMaster[i].Division) {
                    filteredAssignment.push(state.gridAssignmentMaster[i]);
                  }
                } else {
                  if (action.filter.TotalNeeds != "") {
                    if (action.filter.TotalNeeds == state.gridAssignmentMaster[i].TotalNeeds) {
                      filteredAssignment.push(state.gridAssignmentMaster[i]);
                    }
                  } else {
                    filteredAssignment.push(state.gridAssignmentMaster[i]);
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        gridAssignment: filteredAssignment
      }
    }
    case GET_VACANCY_INFORMATION: {
      let editedVacancyInformation = [];
      if (state.gridVacancyInformationMaster.length != 0) {
        for (let i = 0; i < state.gridVacancyInformationMaster.length; i++) {
          if (action.filter.VacancyCode != "") {
            if (action.filter.VacancyCode === state.gridVacancyInformationMaster[i].VacancyCode) {
              editedVacancyInformation.push(state.gridVacancyInformationMaster[i]);
            }
          } else {
            if (action.filter.AvailableCandidate != "") {
              if (action.filter.AvailableCandidate === state.gridVacancyInformationMaster[i].AvailableCandidate) {
                editedVacancyInformation.push(state.gridVacancyInformationMaster[i]);
              }
            } else {
              if (action.filter.PTKFulfillment != "") {
                if (action.filter.PTKFulfillment === state.gridVacancyInformationMaster[i].PTKFulfillment) {
                  editedVacancyInformation.push(state.gridVacancyInformationMaster[i]);
                }
              } else {
                editedVacancyInformation.push(state.gridVacancyInformationMaster[i]);
              }
            }
          }
        }
      }
      return {
        ...state,
        gridVacancyInformation: editedVacancyInformation
      }
    }
    case SET_ASSIGNMENT_LIST:
      return {
        ...state,
        gridAssignment: action.value
      }
    case SET_POSITION_LIST: {
      let list = action.value
      let data = []
      for (let i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].PositionId, "value": list[i].PositionName, "name": list[i].PositionName }
        data.push(value)
      }
      return {
        ...state,
        positionList: data
      }
    }
    case SET_EMPLOYEE_STATUS_LIST: {
      let list = action.value
      let data = []
      for (let i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].EmployeeStatusId, "value": list[i].EmployeeStatusName, "name": list[i].EmployeeStatusName }
        data.push(value)
      }
      return {
        ...state,
        employeeStatusList: data
      }
    }
    case SET_APPLICATION_STATUS_LIST: {
      let list = action.value
      let data = []
      for (let i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].ApplicationStatusId, "value": list[i].ApplicationStatusName, "name": list[i].ApplicationStatusName }
        data.push(value)
      }
      return {
        ...state,
        applicationStatusList: data
      }
    }
    case SET_DETAILS_ASSIGNMENT: {
      let assignment = action.value
      // let dropdown = action.value2
      return {
        ...state,
        formAssignment: {
          ...state.formAssignment,
          ptkDate: moment(assignment.PTKDate, "DD/MM/YYYY"),
          ptkNumber: assignment.PTKNumber,
          deptHead: assignment.UserHiringManagerId,
          position: assignment.PositionId,
          totalNeeds: assignment.TotalNeeds,
          golongan: assignment.Golongan,
          department: assignment.Department,
          employeeStatus: assignment.EmployeeStatusId,
          division: assignment.Division,
          applicationStatus: assignment.ApplicationStatusId,
          vacancyCode: assignment.VacancyInformaion[0].VacancyCode,
          availableCandidate: '',
          ptkFullfillment: assignment.VacancyInformaion[0].PTKFulfillment,
          fullfillDate: moment(assignment.FulfillmentDate, "DD/MM/YYYY", true),
          company: assignment.CompanyId,
          function: assignment.FunctionID,
        }
      }
    }
    case SET_VACANCY_INFORMATION_LIST:
      let list = action.value
      let i
      let vacCode = []
      let ptkFull = []
      for (i = 0; i < list.length; i++) {
        let value = {}
        value = { "id": list[i].VacancyId, "value": list[i].VacancyCode, "name": list[i].VacancyCode}
        vacCode.push(value)
      }
      return {
        ...state,
        vacancyInformationList: vacCode,
        vacancyInformationListMaster: action.value
      }
    case SUCCESS_SET_DATA_ASSIGNMENT: {
      return {
        ...state,
        ...action.data
      }
    }
    default:
      return {
        ...state
      }
  }
}



