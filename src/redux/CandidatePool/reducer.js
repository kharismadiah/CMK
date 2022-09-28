import { DROPDOWN_GENDER } from "../../constants/dropdown";
import * as types from "../types";

let dropdownAll = {
    id: 'All',
    name: 'All'
}

const initState = {
    isLoading: false,
    isShowSelectVacancy: false,
    pageNo: 1,
    pageSize: 25,
    totalRows: 25,
    pageNoInvited: 1,
    pageSizeInvited: 25,
    totalRowsInvited: 25,
    pageNoVacancy: 1,
    pageSizeVacancy: 10,
    totalRowsVacancy: 10,

    pageNoRequestList: 1,
    pageSizeRequestList: 25,
    totalRowsRequestList: 25,

    formRequestTestTool: {
        ApplicantId: [],
        GradeId: '',
        TestTypeCode: ''
    },
    formRequestAffco: {
        ApplicantId: '',
        Category: '',
        gpaMin: '',
        gpaMax: '',
        CandidateName: '',
        GraduationFromYear: '',
        GraduationToYear: '',
        Gender: [],
        SeekingOpportunities: [],
        Degree: [],
        OrganizationExperienceScope: [],
        OrganizationExperienceTitle: [],
        Institute: [],
        JobExperienceTitle: [],
        JobExperienceFunction: [],
        JobExperienceFunction: [],
        ageFrom: '',
        ageTo: '',
        Major: []
    },
    search: {
        category: '',
        gpaNem: '',
        gpaNemTo: '',
        candidateName: '',
        applicantId: '',
        graduationYear: '',
        graduationYearTo: '',
        gender: [],
        activeSeekingOportunities: false,
        degree: [],
        organizationalExperienceScope: [],
        institution: [],
        organizationalExperienceTitle: [],
        major: [],
        jobExperienceTitle: [],
        age: '',
        ageTo: '',
        jobExperienceFunction: [],
        seekingJobStatus: [],
        seekingJobStatusName: [],
        yearsOfExp: '',
        yearsOfExpTo: ''
    },
    source: {
        category: [{ id: 'Fresh Graduate/Student', name: "Fresh Graduate/Student" }, { id: 'Professional', name: "Professional" }],
        categoryVacancy: [{ id: 1, value: "Fresh Graduation", name: "Fresh Graduation" }, { id: 2, value: "Professional", name: "Professional" }, { id: 3, value: "All", name: "All" }],
        gender: DROPDOWN_GENDER,
        degree: [],
        organizationalExperienceScope: [],
        institution: [],
        organizationalExperienceTitle: [],
        major: [],
        jobExperienceTitle: [],
        jobExperienceFunction: [],
        latestApplicantPhaseStatus: [],
        Domicile: [],
        YearsOfExperience: [],
        SeekingJobStatusList: [],
        cbtTestType: [],
        requestCandidateTestType: [],
        requestCandidateTestTool: [],
        requestCandidateGrade: [],
        requestAffcoList: []
    },
    listTableCandidate: [],
    selectedRowTableCandidate: [],
    filteredSelectedRowTableCandidate: [],
    searchInvited: '',
    selectedSubTabFromInvitedTab: '1',
    invitedFilter: {
        applicantId: 'All',
        name: 'All',
        gender: 'All',
        degree: 'All',
        institution: 'All',
        major: 'All',
        invitedDate: 'All',
        invitedBy: 'All',
        company: 'All',
        vacancyCode: 'All',
        vacancyTitle: 'All',
        confirmationStatus: 'All',
        confirmationDate: 'All',
        expiredDate: 'All',
        totalInvited: 'All',
        totalExtended: 'All',
        expiredProcess: 'All',
        latestAtsPhase: 'All',
        latestAtsStatus: 'All',
        processDate: 'All'
    },
    sourceInvited: {
        applicantId: [],
        name: [],
        institution: [],
        company: [],
        gender: [],
        major: [],
        vacancyCode: [],
        vacancyTitle: [],
        degree: [],
        invitedDate: [],
        expiredDate: [],
        invitedBy: [],
        latestAtsPhase: [],
        latestAtsStatus: [],
        processDate: [],
        expiredProcess: []
    },
    sourceInvitedTab145: {
        applicantId: [],
        name: [],
        institution: [],
        company: [],
        gender: [],
        major: [],
        vacancyCode: [],
        vacancyTitle: [],
        degree: [],
        invitedDate: [],
        invitedBy: [],
        expiredDate: []
    },
    sourceInvitedTab23: {
        applicantId: [],
        name: [],
        institution: [],
        company: [],
        gender: [],
        major: [],
        vacancyCode: [],
        vacancyTitle: [],
        degree: [],
        invitedDate: [],
        invitedBy: [],
        latestAtsPhase: [],
        latestAtsStatus: [],
        processDate: [],
        expiredProcess: []
    },
    listInvited: [],
    temListInvited: [],
    selectedKeyRowTableInvited: [],
    selectedRowTableInvited: [],
    serachVacancy: {
        eventName: '',
        company: '',
        category: '',
        function: '',
        vacancyTitle: ''
    },
    listTableVacancy: [],
    activeVacancyDetails: {
        VacancyId: '',
        VacancyStatusId: '',
        VacancyCode: '',
        EventId: '',
        PublishDate: '',
        EndDate: '',
        CompanyId: '',
        Category: '',
        JobSpecializationId: '',
        GeneralFilterId: '',
        JobRequirement: '',
        JobDescription: '',
        CompetenceDescription: '',
        NotesHistory: '',
        PositionId: '',
        VacancyTitle: '',
        VacancyType: '',
        FunctionId: '',
        TotalNeeds: '',
        TotalFulfilled: '',
        CandidateType: '',
        Candidates: 0,
        CreateDate: '',
        ATSPhaseTypeId: 0,
        Phases: []
    },
    selectedRowTableRadioVacancy: {
        vacancyCode: '',
        vacancyId: null
    },
    PersonalData: {
        ApplicantId: null,
        FullName: null,
        Email: null,
        DateOfBirth: null,
        Gender: null,
        Domicile: null,
        PhoneNumber: null,
        YearsOfExperience: null,
        ActivelySeekingOpportunities: null,
        PhotoURL: null,
        CvURL: null
    },
    educationFilter: {
        degree: 'All',
        institution: 'All',
        major: 'All',
        startYear: 'All',
        graduationYear: 'All',
        gpaNem: 'All'
    },
    organizationFilter: {
        organizationName: 'All',
        scope: 'All',
        title: 'All'
    },
    jobFilter: {
        companyName: 'All',
        title: 'All',
        position: 'All',
        function: 'All',
        startDate: 'All',
        endDate: 'All'
    },
    invitationFilter: {
        invitedDate: 'All',
        invitedBy: 'All',
        company: 'All',
        vacancyCode: 'All',
        vacancyTitle: 'All',
        confirmation: 'All',
        confirmationDate: 'All',
        source: 'All'
    },
    applicationFilter: {
        groupEvent: 'All',
        eventCode: 'All',
        event: 'All',
        eventDesc: 'All',
        company: 'All',
        vacancyCode: 'All',
        vacancyTitle: 'All',
        atsPhase: 'All',
        status: 'All',
        date: 'All',
        file: 'All'
    },
    sourceEducation: {
        degree: [],
        institution: [],
        major: [],
        startYear: [],
        graduationYear: [],
        gpaNem: []
    },
    sourceOrganization: {
        organizationName: [],
        scope: [],
        title: []
    },
    sourceJob: {
        companyName: [],
        title: [],
        position: [],
        function: [],
        startDate: [],
        endDate: []
    },
    sourceInvitation: {
        invitedDate: [],
        invitedBy: [],
        company: [],
        vacancyCode: [],
        vacancyTitle: [],
        confirmation: [],
        confirmationDate: [],
        source: []
    },
    sourceApplication: {
        groupEvent: [],
        eventCode: [],
        event: [],
        eventDes: [],
        company: [],
        vacancyCode: [],
        vacancyTitle: [],
        atsPhase: [],
        status: [],
        date: [],
        file: []
    },
    searchEducation: '',
    searchOrganization: '',
    searchJob: '',
    searchInvitation: '',
    searchApplication: '',
    EducationList: [],
    tempEducationList: [],
    OrganizationList: [],
    tempOrganizationList: [],
    JobExperienceList: [],
    tempJobExperienceList: [],
    InvitationHistoryList: [],
    tempInvitationHistoryList: [],
    ApplicationHistoryList: [],
    tempApplicationHistoryList: [],
    formEmail: {
        subject: null,
        body: null,
        signature: null
    },
    applicantId: '',
    isVisibleSelectType: false,
    isVisibleSelectTestTool: false,
    isVisibleGridRequestAffco: false,
    isVisibleRequestcandidateData: false,
    isVisibleSelectGrade: false,
    isVisibleModalDuration: false,
    isVisibleModalRejectNotes: false,
    modalDuration: 3,
    notesRejectModal: '',
    testType: '',
    selectGradeModal: '',
    selectedTestTool: [],
    isVisibleUploadResult: false,
    modalRequestList: {
        isVisible: false,
        sourceTable: []
    },
    candidatePoolTestRequestId: '',
    checkInviteToJoinCandidate: [],
    inviteToJoinCheckResponse: {
        waitingApplicants: [],
        acceptedApplicants: [],
        declinedApplicants: [],
        expiredApplicants: [],
        extendedApplicants: []
    },
    inviteToJoinStatus: {
        popUpDeclined: false,
        popUpWaiting: false,
        popUpAllAccepted: false,
        popUpFewAccepted: false,
        popUpMaxExtended: false
    },
    isShowPopUp: false,
    isShowSelectEmailTemplate: false,
    emailTemplateList: [],
    emailTemplateTotalRows: 0,
    emailTemplateCurrentPage: 1,
    selectedEmailTemplateId: 0,
    triggerList: [],
    activityList: [],
    showFewAcceptedModal: false,
    formAcceptance: {
        CandidatePoolRequestId: '',
        ViewDuration: '',
        RejectNotes: '',
        EmailHR: '',
        isAccepted: ''
    },


    searchHistory: {
        requestIdHistory:'',
        applicantIdHistory:'',
        requestTypeHistory:'',
        requestStatusHistory:'',
        requestByHistory:'',
        requestDateStartHistory:'',
        requestDateEndHistory:'',
        confirmByHistory:'',
        confirmDateStartHistory:'',
        confirmDateEndHistory:'',
        failedInformationHistory:''
    },

    historyListPagination: {
        pageNo: 1,
        pageSize: 25,
        totalRows: 25
    },

    historyList: [],

    searchRequestList: "",

    buttonType: "",

    uploadRawPdfResult: {},
    uploadPdfResultName:{},
    isLoadingRequestList: false,
    resetChooseTestStateFlag: false,
    acceptRejectResetStateFlag: false,
    isOpenConfirmationAcceptReqModal: false,
    fetchHistoryListTimer: 0,
    resetCheckBoxMainTableFlag:false
}

export default function(state = initState, action) {
    switch (action.type) {
        case types.CANDIDATE_POOL_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.CANDIDATE_POOL_FETCH_MASTER_DATA_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    degree: action.payload.degree,
                    organizationalExperienceScope: action.payload.organizationalExperienceScope,
                    institution: action.payload.institution,
                    organizationalExperienceTitle: action.payload.organizationalExperienceTitle,
                    major: action.payload.major,
                    jobExperienceTitle: action.payload.jobExperienceTitle,
                    jobExperienceFunction: action.payload.jobExperienceFunction,
                    latestApplicantPhaseStatus: action.payload.latestApplicantPhaseStatus,
                    SeekingJobStatusList: action.payload.SeekingJobStatusList,
                    cbtTestType: action.payload.cbtTestType
                }
            }
        }
        case types.CANDIDATE_POOL_MATER_DATA_DETAIL_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    Domicile: action.payload.Domicile,
                    YearsOfExperience: action.payload.YearsOfExperience
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_FETCH_LIST_SUCCESS: {
            return {
                ...state,
                listTableCandidate: action.data.CandidatePoolList,
                totalRows: action.data.TotalRecords
            }
        }
        case types.CANDIDATE_POOL_INIT_STATE_SEARCH: {
            return {
                ...state,
                search: {
                    ...initState.search
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_INVITED: {
            return {
                ...state,
                pageNoInvited: action.pageNo,
                pageSizeInvited: action.pageSize,
                totalRowsInvited: action.totalRows
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_VACANCY: {
            return {
                ...state,
                pageNoVacancy: action.pageNo,
                pageSizeVacancy: action.pageSize,
                totalRowsVacancy: action.totalRows
            }
        }
        case types.CANDIDATE_POOL_FETCH_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                sourceEducation: {
                    ...state.sourceEducation,
                    degree: [dropdownAll, ...action.data.sourceEducation.degree],
                    institution: [dropdownAll, ...action.data.sourceEducation.institution],
                    major: [dropdownAll, ...action.data.sourceEducation.major],
                    startYear: [dropdownAll, ...action.data.sourceEducation.startYear],
                    graduationYear: [dropdownAll, ...action.data.sourceEducation.graduationYear],
                    gpaNem: [dropdownAll, ...action.data.sourceEducation.gpaNem]
                },
                sourceOrganization: {
                    organizationName: [dropdownAll, ...action.data.sourceOrganization.organizationName],
                    scope: [dropdownAll, ...action.data.sourceOrganization.scope],
                    title: [dropdownAll, ...action.data.sourceOrganization.title]
                },
                sourceJob: {
                    companyName: [dropdownAll, ...action.data.sourceJob.companyName],
                    title: [dropdownAll, ...action.data.sourceJob.title],
                    position: [dropdownAll, ...action.data.sourceJob.position],
                    function: [dropdownAll, ...action.data.sourceJob.function],
                    startDate: [dropdownAll, ...action.data.sourceJob.startDate],
                    endDate: [dropdownAll, ...action.data.sourceJob.endDate]
                },
                sourceInvitation: {
                    invitedDate: [dropdownAll, ...action.data.sourceInvitation.invitedDate],
                    invitedBy: [dropdownAll, ...action.data.sourceInvitation.invitedBy],
                    company: [dropdownAll, ...action.data.sourceInvitation.company],
                    vacancyCode: [dropdownAll, ...action.data.sourceInvitation.vacancyCode],
                    vacancyTitle: [dropdownAll, ...action.data.sourceInvitation.vacancyTitle],
                    confirmation: [dropdownAll, ...action.data.sourceInvitation.confirmation],
                    confirmationDate: [dropdownAll, ...action.data.sourceInvitation.confirmationDate],
                    source: [dropdownAll, ...action.data.sourceInvitation.source]
                },
                sourceApplication: {
                    groupEvent: [dropdownAll, ...action.data.sourceApplication.groupEvent],
                    eventCode: [dropdownAll, ...action.data.sourceApplication.eventCode],
                    event: [dropdownAll, ...action.data.sourceApplication.event],
                    eventDesc: [dropdownAll, ...action.data.sourceApplication.eventDesc],
                    company: [dropdownAll, ...action.data.sourceApplication.company],
                    vacancyCode: [dropdownAll, ...action.data.sourceApplication.vacancyCode],
                    vacancyTitle: [dropdownAll, ...action.data.sourceApplication.vacancyTitle],
                    atsPhase: [dropdownAll, ...action.data.sourceApplication.atsPhase],
                    status: [dropdownAll, ...action.data.sourceApplication.status],
                    date: [dropdownAll, ...action.data.sourceApplication.date],
                    file: [dropdownAll, ...action.data.sourceApplication.file]
                },
                PersonalData: action.data.PersonalData,
                EducationList: action.data.EducationList,
                tempEducationList: action.data.EducationList,
                OrganizationList: action.data.OrganizationList,
                tempOrganizationList: action.data.OrganizationList,
                JobExperienceList: action.data.JobExperienceList,
                tempJobExperienceList: action.data.JobExperienceList,
                InvitationHistoryList: action.data.InvitationHistoryList,
                tempInvitationHistoryList: action.data.InvitationHistoryList,
                ApplicationHistoryList: action.data.ApplicationHistoryList,
                tempApplicationHistoryList: action.data.ApplicationHistoryList
            }
        }
        case types.CANDIDATE_POOL_CLEAR_STATE_DETAIL_RESUME: {
            return {
                ...state,
                PersonalData: initState.PersonalData,
                EducationList: [],
                tempEducationList: [],
                OrganizationList: [],
                tempOrganizationList: [],
                JobExperienceList: [],
                tempJobExperienceList: [],
                InvitationHistoryList: [],
                tempInvitationHistoryList: [],
                ApplicationHistoryList: [],
                tempApplicationHistoryList: []
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_GLOBAL: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_SERACH: {
            return {
                ...state,
                serachVacancy: {
                    ...state.serachVacancy,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_FETCH_GET_ACTIVE_VACANCY_SUCCESS: {
            return {
                ...state,
                listTableVacancy: action.data.VacancyList,
                totalRowsVacancy: action.data.TotalRecords
            }
        }
        case types.CANDIDATE_POOL_CLEAR_ACTIVE_VACANCY: {
            return {
                ...state,
                serachVacancy: {
                    ...initState.serachVacancy
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_EMAIL: {
            return {
                ...state,
                formEmail: {
                    ...state.formEmail,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_FETCH_EMAIL_REDACTIONAL_SUCCESS: {
            return {
                ...state,
                formEmail: {
                    ...state.formEmail,
                    subject: action.payload.Subject.replace(/(\r\n|\n|\r)/gm, ''),
                    body: action.payload.Body,
                    signature: action.payload.Signature
                }
            }
        }
        case types.CANDIDATE_POOL_FETCH_DETAILS_ACTIVE_VACANCY_SUCCESS: {
            return {
                ...state,
                activeVacancyDetails: action.payload
            }
        }
        case types.CANDIDATE_POOL_FETCH_TAB_INVITED_SUCCESS: {
            return {
                ...state,
                sourceInvited: {
                    ...state.sourceInvited,
                    applicantId: [dropdownAll, ...action.data.sourceInvited.applicantId],
                    name: [dropdownAll, ...action.data.sourceInvited.name],
                    institution: [dropdownAll, ...action.data.sourceInvited.institution],
                    company: [dropdownAll, ...action.data.sourceInvited.company],
                    gender: [dropdownAll, ...action.data.sourceInvited.gender],
                    major: [dropdownAll, ...action.data.sourceInvited.major],
                    vacancyCode: [dropdownAll, ...action.data.sourceInvited.vacancyCode],
                    degree: [dropdownAll, ...action.data.sourceInvited.degree],
                    invitedDate: [dropdownAll, ...action.data.sourceInvited.invitedDate],
                    invitedBy: [dropdownAll, ...action.data.sourceInvited.invitedBy],
                    latestAtsPhase: [dropdownAll, ...action.data.sourceInvited.latestAtsPhase],
                    latestAtsStatus: [dropdownAll, ...action.data.sourceInvited.latestAtsStatus],
                    processDate: [dropdownAll, ...action.data.sourceInvited.processDate],
                    expiredProcess: [dropdownAll, ...action.data.sourceInvited.expiredProcess]
                },
                listInvited: action.data.listInvited,
                temListInvited: action.data.temListInvited,
                totalRowsInvited: action.data.TotalRecords
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_INVITED_FILTER: {
            return {
                ...state,
                invitedFilter: {
                    ...state.invitedFilter,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_RESET_FILTER_INVITED: {
            return {
                ...state,
                invitedFilter: {
                    ...initState.invitedFilter
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_EDUCATION_FILTER: {
            return {
                ...state,
                educationFilter: {
                    ...state.educationFilter,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_RESET_FILTER_EDUCATION: {
            return {
                ...state,
                educationFilter: {
                    ...initState.educationFilter
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_ORG_FILTER: {
            return {
                ...state,
                organizationFilter: {
                    ...state.organizationFilter,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_RESET_FILTER_ORG: {
            return {
                ...state,
                organizationFilter: {
                    ...initState.organizationFilter
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_JOB_FILTER: {
            return {
                ...state,
                jobFilter: {
                    ...state.jobFilter,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_RESET_FILTER_JOB: {
            return {
                ...state,
                jobFilter: {
                    ...initState.jobFilter
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_INVT_FILTER: {
            return {
                ...state,
                invitationFilter: {
                    ...state.invitationFilter,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_RESET_FILTER_INVIT: {
            return {
                ...state,
                invitationFilter: {
                    ...initState.invitationFilter
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_APP_FILTER: {
            return {
                ...state,
                applicationFilter: {
                    ...state.applicationFilter,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_RESET_FILTER_APP: {
            return {
                ...state,
                applicationFilter: {
                    ...initState.applicationFilter
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_REQUEST_LIST: {
            return {
                ...state,
                modalRequestList: {
                    ...state.modalRequestList,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_FETCH_REQUEST_LIST_SUCCESS: {
            return {
                ...state,
                modalRequestList: {
                    ...action.data
                }
            }
        }
        case types.CANDIDATE_POOL_FETCH_REQUEST_AND_GENERATE_LIST_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    requestAffcoList: action.data.sourceTable
                },
                // isVisibleGridRequestAffco: action.data.isVisible
            }
        }
        case types.CANDIDATE_POOL_REQUEST_TESTTYPE_LIST_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    requestCandidateTestType: action.data.payloadTestType,
                    requestCandidateGrade: action.data.payloadGrade
                },
                isVisibleSelectType: action.data.isVisible
            }
        }
        case types.CANDIDATE_POOL_FETCH_LIST_TESTTOOL_SUCCESS: {
            return {
                ...state,
                source: {
                    ...state.source,
                    requestCandidateTestTool: action.data.payloadTestTool
                }
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_PAGINATION_REQUEST_LIST: {
            return {
                ...state,
                pageNoRequestList: action.pageNo,
                pageSizeRequestList: action.pageSize,
                totalRowsRequestList: action.totalRows
            }
        }
        case types.CANDIDATE_POOL_HANDLE_STATE_SEARCH_HISTORY: {
            return {
                ...state,
                searchHistory:{
                    ...state.searchHistory,
                    [action.property]: action.value
                }
            }
        }
        case types.CANDIDATE_POOL_INIT_STATE_SEARCH_HISTORY: {
            return {
                ...state,
                searchHistory: {
                    ...initState.searchHistory
                }
            }
        }

        case types.CANDIDATE_POOL_HANDLE_STATE_HISTORY_PAGINATION: {
            return {
                ...state,
                historyListPagination: {
                    pageNo: action.pageNo,
                    pageSize: action.pageSize,
                    totalRows: action.totalRows
                }
            }
        }

        case types.CANDIDATE_POOL_FETCH_HISTORY_LIST_SUCCESS: {
            return {
                ...state,
                historyList: action.data
            }
        }
        
        case types.CANDIDATE_POOL_HANDLE_EMAIL_TEMPLATE: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.CANDIDATE_POOL_RESET_EMAIL_TEMPLATE_STATE: {
            return {
                ...state,
                emailTemplateList: initState.emailTemplateList,
                emailTemplateTotalRows: initState.emailTemplateTotalRows,
                emailTemplateCurrentPage: initState.emailTemplateCurrentPage,
                selectedEmailTemplateId: initState.selectedEmailTemplateId
            }
        }

        case types.CANDIDATE_POOL_CHANGE_TAB_KEY: {
            return {
                ...state,
                selectedSubTabFromInvitedTab: action.activeKey
            }
        }
        case types.CANDIDATE_POOL_FETCH_TAB_INVITED_SUCCESS_TAB_2_3: {
            return {
                ...state,
                sourceInvitedTab23: {
                    ...state.sourceInvitedTab23,
                    applicantId: [dropdownAll, ...action.data.sourceInvited.applicantId],
                    name: [dropdownAll, ...action.data.sourceInvited.name],
                    institution: [dropdownAll, ...action.data.sourceInvited.institution],
                    company: [dropdownAll, ...action.data.sourceInvited.company],
                    gender: [dropdownAll, ...action.data.sourceInvited.gender],
                    major: [dropdownAll, ...action.data.sourceInvited.major],
                    vacancyTitle: [dropdownAll, ...action.data.sourceInvited.vacancyTitle],
                    vacancyCode: [dropdownAll, ...action.data.sourceInvited.vacancyCode],
                    degree: [dropdownAll, ...action.data.sourceInvited.degree],
                    invitedDate: [dropdownAll, ...action.data.sourceInvited.invitedDate],
                    invitedBy: [dropdownAll, ...action.data.sourceInvited.invitedBy],
                    latestAtsPhase: [dropdownAll, ...action.data.sourceInvited.latestAtsPhase],
                    latestAtsStatus: [dropdownAll, ...action.data.sourceInvited.latestAtsStatus],
                    processDate: [dropdownAll, ...action.data.sourceInvited.processDate],
                    expiredProcess: [dropdownAll, ...action.data.sourceInvited.expiredProcess]
                },
                listInvited: action.data.listInvited,
                temListInvited: action.data.temListInvited,
                totalRowsInvited: action.data.TotalRecords
            }
        }
        case types.CANDIDATE_POOL_FETCH_TAB_INVITED_SUCCESS_TAB_1_4_5: {
            return {
                ...state,
                sourceInvitedTab145: {
                    ...state.sourceInvitedTab145,
                    applicantId: [dropdownAll, ...action.data.sourceInvited.applicantId],
                    name: [dropdownAll, ...action.data.sourceInvited.name],
                    institution: [dropdownAll, ...action.data.sourceInvited.institution],
                    company: [dropdownAll, ...action.data.sourceInvited.company],
                    gender: [dropdownAll, ...action.data.sourceInvited.gender],
                    major: [dropdownAll, ...action.data.sourceInvited.major],
                    vacancyTitle: [dropdownAll, ...action.data.sourceInvited.vacancyTitle],
                    vacancyCode: [dropdownAll, ...action.data.sourceInvited.vacancyCode],
                    degree: [dropdownAll, ...action.data.sourceInvited.degree],
                    invitedDate: [dropdownAll, ...action.data.sourceInvited.invitedDate],
                    invitedBy: [dropdownAll, ...action.data.sourceInvited.invitedBy],
                    expiredDate: [dropdownAll, ...action.data.sourceInvited.expiredDate]
                },
                listInvited: action.data.listInvited,
                temListInvited: action.data.temListInvited,
                totalRowsInvited: action.data.TotalRecords
            }
        }

        case types.CANDIDATE_POOL_RESET_TAB_INVITED_2_3: {
            return {
                ...state,
                sourceInvitedTab23: {
                    ...state.sourceInvitedTab23,
                    applicantId: [dropdownAll],
                    name: [dropdownAll],
                    institution: [dropdownAll],
                    company: [dropdownAll],
                    gender: [dropdownAll],
                    major: [dropdownAll],
                    vacancyTitle: [dropdownAll],
                    vacancyCode: [dropdownAll],
                    degree: [dropdownAll],
                    invitedDate: [dropdownAll],
                    invitedBy: [dropdownAll],
                    latestAtsPhase: [dropdownAll],
                    latestAtsStatus: [dropdownAll],
                    processDate: [dropdownAll],
                    expiredProcess: [dropdownAll]
                },
                listInvited: [],
                temListInvited: [],
                totalRowsInvited: [],
                searchInvited: '',
                selectedKeyRowTableInvited: [],
                selectedRowTableInvited: []
            }
        }

        case types.CANDIDATE_POOL_RESET_TAB_INVITED_1_4_5: {
            return {
                ...state,
                sourceInvitedTab145: {
                    ...state.sourceInvitedTab145,
                    applicantId: [dropdownAll],
                    name: [dropdownAll],
                    institution: [dropdownAll],
                    company: [dropdownAll],
                    gender: [dropdownAll],
                    major: [dropdownAll],
                    vacancyTitle: [dropdownAll],
                    vacancyCode: [dropdownAll],
                    degree: [dropdownAll],
                    invitedDate: [dropdownAll],
                    invitedBy: [dropdownAll],
                    latestAtsPhase: [dropdownAll],
                    latestAtsStatus: [dropdownAll],
                    processDate: [dropdownAll],
                    expiredProcess: [dropdownAll]
                },
                listInvited: [],
                temListInvited: [],
                totalRowsInvited: [],
                searchInvited: '',
                selectedKeyRowTableInvited: [],
                selectedRowTableInvited: []
            }
        }
        case types.CANDIDATE_POOL_RESET_STATE_EMAIL_MODAL: {
            return {
                ...state,
                inviteToJoinCheckResponse: {
                    ...state.inviteToJoinCheckResponse,
                    waitingApplicants: initState.inviteToJoinCheckResponse.waitingApplicants,
                    acceptedApplicants: initState.inviteToJoinCheckResponse.acceptedApplicants,
                    declinedApplicants: initState.inviteToJoinCheckResponse.declinedApplicants,
                    expiredApplicants: initState.inviteToJoinCheckResponse.expiredApplicants,
                    extendedApplicants: initState.inviteToJoinCheckResponse.extendedApplicants
                },
                inviteToJoinStatus: {
                    ...state.inviteToJoinStatus,
                    popUpDeclined: initState.inviteToJoinStatus.popUpDeclined,
                    popUpWaiting: initState.inviteToJoinStatus.popUpWaiting,
                    popUpAllAccepted: initState.inviteToJoinStatus.popUpAllAccepted,
                    popUpFewAccepted: initState.inviteToJoinStatus.popUpFewAccepted,
                    popUpMaxExtended: initState.inviteToJoinStatus.popUpMaxExtended
                },
                isShowPopUp: initState.isShowPopUp
            }
        }
        case types.CANDIDATE_POOL_SET_LOADER_REQUEST_LIST: {
            return {
                ...state,
                isLoadingRequestList: action.value
            }
        }

        default:
            return {
                ...state
            }
    }
}
