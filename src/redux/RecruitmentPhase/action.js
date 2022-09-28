import * as types from '../types'

export const handleStateGlobal = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL,
        property,
        value
    }
}
export const handleStateSort = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_SORT_PHASE,
        property,
        value
    }
}
export const handleStateFilter = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_FILTER_PHASE,
        property,
        value
    }
}
export const handleStateListData = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_LIST_PHASE,
        property,
        value
    }
}

export const handleStatePaging = (pageNo, pageSize, totalRows) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_PAGINATION_PHASE,
        pageNo,
        pageSize,
        totalRows
    }
}
export const handleStateModal = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_PHASE,
        property,
        value
    }
}
export const handleStateModalEmail = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
        property,
        value
    }
}
export const handleModalFLKBatch = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE,
        property,
        value
    }
}
export const handleStateModalEmailHiringManager = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_HIRING_MANAGER_PHASE,
        property,
        value
    }
}
export const handleStateModalEmailDate = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE,
        property,
        value
    }
}
export const fetchFilter = (vacancyId, PhaseId, typeFilter) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_FILTER_PHASE,
        vacancyId,
        PhaseId,
        typeFilter
    }
}
export const fetchList = data => {
    return {
        type: types.RECRUITMENT_PR_FETCH_LIST,
        data
    }
}
export const fetchMount = (vacancyId, PhaseId, typeFilter) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_MOUNT_PHASE,
        vacancyId,
        PhaseId,
        typeFilter
    }
}
export const fetchResetFilter = (vacancyId, PhaseId, typeFilter) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_RESET_FILTER_PHASE,
        vacancyId,
        PhaseId,
        typeFilter
    }
}
export const fetchEmailRedactional = (Activity, Action) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PAHSE,
        Activity,
        Action
    }
}
export const fetchSubmitEmail = param => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_PAHSE,
        param
    }
}
export const fetcSubmitEmailInvited = from => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_INVITED_PAHSE,
        from
    }
}
export const submitFeedbackOfferingFail = reqBody => {
    return {
        type: types.RECRUITMENT_PR_FETCH_LIST_SUBMIT_FEEDBACK_OFFERING,
        reqBody
    }
}
export const handleStateReference = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_REFERENCE_PAHSE,
        property,
        value
    }
}
export const fetchSubmitReference = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_REFERENCE_SUBMIT_PAHSE
    }
}
export const uploadOffering = (vacancyId, PhaseId) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_UPLOAD_OFFERING,
        vacancyId,
        PhaseId
    }
}
export const fetchDetail = (applicantId, applicationId) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DETAIL_PAHSE,
        applicantId,
        applicationId
    }
}
export const fetchdetailOffering = (applicantId, applicationId) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DETAILS_OFFERING,
        applicantId,
        applicationId
    }
}
export const fetchDeleteReference = id => {
    return {
        type: types.RECRUITMENT_PR_FETCH_REFERENCE_DELETE_PAHSE,
        id
    }
}
export const handleStateModalAction = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_ACTION_PAHSE,
        property,
        value
    }
}
export const handleStateModalActionData = data => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_ACTION_DATA_PAHSE,
        data
    }
}
export const fetchAction = (vacancyId, atsPhaseId) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_ACTION_PAHSE,
        vacancyId,
        atsPhaseId
    }
}
export const handleStateModalPool = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_POOL_PAHSE,
        property,
        value
    }
}
export const fetchCandidatePool = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_CANDIDATE_POOL_PAHSE
    }
}
export const handleStateModalCancelCandidate = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_CANCEL_PAHSE,
        property,
        value
    }
}
export const handleStateOnlineTest = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_OL_TEST_PAHSE,
        property,
        value
    }
}
export const fetchOnlineTest = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_ONLINE_TEST_PAHSE
    }
}
export const handleStateFlk = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_FLK_PAHSE,
        property,
        value
    }
}
export const fetchMasterData = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_MASTER_DATA_PAHSE
    }
}
export const handleStateForm2Flk = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_FORM2_PAHSE,
        property,
        value
    }
}
export const fetchSubmitFLK = (id, isFLKSubmit) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_SUBMIT_FLK_PAHSE,
        id,
        isFLKSubmit
    }
}
export const handleStatePsychological = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_PSYCHOLOGICAL_PAHSE,
        property,
        value
    }
}
export const handleStateFGD = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_FGD_PHASE,
        property,
        value
    }
}
export const handleStatePsychologicalCBT = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_PSYCHOLOGICAL_CBT,
        property,
        value
    }
}
export const fetchSubmitPsychological = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_SUBMIT_PSYCHOLOGICAL_PAHSE
    }
}
export const fetchSubmitPsychologicalCBT = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_SUBMIT_PSYCHOLOGICAL_CBT
    }
}
export const fetchEmailRedactionalDate = (Activity, Action) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_DATE_PAHSE,
        Activity,
        Action
    }
}
export const fetchSubmitEmailPsycolog = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_PSYCOLOG_PAHSE
    }
}
export const fetchFGDResult = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_FGD_RESULT_PAHSE
    }
}
export const handleStateModalInterview = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_INTERVIEW,
        property,
        value
    }
}
export const fetchDownloadFlk = ApplicantId => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DOWNLOAD_FLK_PAHSE,
        ApplicantId
    }
}
export const fetchListFeedback = offeringFailedByID => {
    return {
        type: types.RECRUITMENT_PR_FETCH_LIST_FEEDBACK_OFFERING,
        offeringFailedByID
    }
}

export const fetchListFailedby = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_LIST_FAILEDBY
    }
}
export const fetchDeleteDataCompany = applicantId => {
    return {
        type: types.RECRUITMENT_PR_DELETE_DATA_TABLE_INTERVIEW,
        applicantId
    }
}
export const addDataInterview = status => {
    return {
        type: types.RECRUITMENT_PR_ADD_DATA_TABLE_INTERVIEW,
        status
    }
}
export const getDataSchedule = id => {
    return {
        type: types.RECRUITMENT_PR_GET_DATA_INTERVIEW_SCHEDULE,
        id
    }
}
export const handleChangeDetailModal = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DETAIL_MODAL,
        property,
        value
    }
}
export const addDataScheduleInterviewer = (
    phase,
    applicantId,
    companyId,
    interviewer,
    jobPosition,
    date,
    applicationId
) => {
    return {
        type: types.RECRUITMENT_PR_ADD_SCHEDULE_INTERVIEWER,
        phase,
        applicantId,
        companyId,
        interviewer,
        jobPosition,
        date,
        applicationId
    }
}
export const fetchSubmitEmailFlk = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_FLK_PAHSE
    }
}
export const fetchSubmitEmailOffering = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_OFFERING_PAHSE
    }
}
export const fetchSubmitEmailFGD = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_FGD_PAHSE
    }
}
export const fetchSubmitEmailHr = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_SUBMIT_INTERVIEW_HR_PAHSE
    }
}
export const submitUploadResult = ApplicationInterviewId => {
    return {
        type: types.RECRUITMENT_PR_UPLOAD_RESULT,
        ApplicationInterviewId
    }
}

export const handleStateSubProperty = (property, subProperty, value) => {
    return {
        type: types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY,
        property,
        subProperty,
        value
    }
}

export const fetchDeleteInterviewer = (id, applicantId) => {
    return {
        type: types.RECRUITMENT_PR_DELETE_INTERVIEWER,
        id,
        applicantId
    }
}
export const fetchResendEmailHr = dataRow => {
    return {
        type: types.RECRUITMENT_PR_EMAIL_RESEND_INTERVIEW_HR_PAHSE,
        dataRow
    }
}
export const fetchEditInterviewer = id => {
    return {
        type: types.RECRUITMENT_PR_EDIT_INTERVIEW_HR_PAHSE,
        id
    }
}
export const getCompanyList = id => {
    return {
        type: types.RECRUITMENT_PR_GET_COMPANY_LIST,
        id
    }
}
export const submitResult = id => {
    return {
        type: types.RECRUITMENT_PR_SUBMIT_RESULT,
        id
    }
}
export const viewResult = (id, status, tgl) => {
    return {
        type: types.RECRUITMENT_PR_VIEW_RESULT,
        id,
        status,
        tgl
    }
}
export const handleStateFLK = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_FLK_APLICANY_PAHSE,
        property,
        value
    }
}
export const sendEmailFailed = phase => {
    return {
        type: types.RECRUITMENT_PR_SEND_FAILED_CANDIDATE,
        phase
    }
}

export const resetModal = modalName => {
    return {
        type: types.RESET_MODAL_FGD,
        modalName
    }
}

export const handleStateInvitationInterview = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_MODAL_INVITATION_INTERVIEW,
        property,
        value
    }
}

export const fetchEmailRedactionalInterview = (Activity, Action) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_INTERVIEW,
        Activity,
        Action
    }
}

export const fetchEmailRedactionalHiringManager = (Activity, Action) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_CV,
        Activity,
        Action
    }
}

export const fetchSubmitHireCandidate = param => {
    return {
        type: types.RECRUITMENT_PR_SEND_HIRE_CANDIDDATE,
        param
    }
}

export const fetchFGDTestResultDetails = id => {
    return {
        type: types.RECRUITMENT_PR_GET_FGD_TEST_RESULT,
        id
    }
}

export const fetchPsychoTestResultDetails = id => {
    return {
        type: types.RECRUITMENT_PR_GET_PSYCHO_TEST_RESULT,
        id
    }
}

export const fetchOTTestResultDetails = id => {
    return {
        type: types.RECRUITMENT_PR_GET_OT_TEST_RESULT,
        id
    }
}

export const fetchInterviewViewResult = id => {
    return {
        type: types.RECRUITMENT_PR_GET_INTERVIEW_VIEW_RESULT,
        id
    }
}

export const initFotmViewInterviewResult = () => {
    return {
        type: types.RECRUITMENT_PR_INIT_FORM_INTERVIEW_VIEW_RESULT
    }
}

export const handleStateUploadTest = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST,
        property,
        value
    }
}

export const fetchDownloadTemplate = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DOWNLOAD_TEMPLATE
    }
}

export const fetchUploadTestResult = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_UPLOAD_TEST
    }
}

export const downloadFileTemplate = () => {
    return {
        type: types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_DOWNLOAD_TEMPLATE
    }
}

export const downloadApplication = () => {
    return {
        type: types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_DOWNLOAD_APPLICATION
    }
}

export const fetchPsychoCBTUploadTestResult = () => {
    return {
        type: types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_UPLOAD_TEST_RESULT
    }
}

export const fetchPsychoCBTSwitch = () => {
    return {
        type: types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_SWITCH
    }
}

export const fetchUploadTestFGD = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_UPLOAD_TEST_FGD
    }
}

export const fecthDownloadTemplateFGD = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DOWNLOAD_TEMPLATE_FGD
    }
}

export const fetchLoginFLK = data => {
    return {
        type: types.FLK_POST_AUTH,
        data
    }
}

export const fetchSendExtend = (id, vacancy) => {
    return {
        type: types.RECRUITMENT_PR_SEND_EXTEND,
        id,
        vacancy
    }
}

export const fetchViewFormFLK = ApplicantId => {
    return {
        type: types.FLK_POST_VIEW,
        ApplicantId
    }
}

export const fetchSubmitFLKFreshGrad = (id, isFLKSubmit) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_SUBMIT_FLK_PAHSE_FRESHGRAG,
        id,
        isFLKSubmit
    }
}
export const resetActivityPriority = () => {
    return {
        type: types.RESET_ACTIVITY_PRIORITY
    }
}

export const resetJobPriority = () => {
    return {
        type: types.RESET_JOB_PRIORITY
    }
}

export const resetModalFailed1 = () => {
    return {
        type: types.RESET_MODAL_FAILED1
    }
}

export const setReadMore = (id, from, value) => {
    return {
        type: types.FLK_SET_READMORE,
        id,
        from,
        value
    }
}

export const setReadMoreImprove = (id, from, value) => {
    return {
        type: types.FLK_SET_READMORE_IMPROVE,
        id,
        from,
        value
    }
}

export const flkInitState = () => {
    return {
        type: types.FLK_INIT_STATE
    }
}

export const fetchViewInterviewResult = (applicantId, applicationId) => {
    return {
        type: types.INTERVIEW_RESULT_REVIEW_VIEW,
        applicantId,
        applicationId
    }
}
export const fetchViewInterviewHR = interviewId => {
    return {
        type: types.RECRUITMENT_PR_GET_INTERVIEW_VIEW_RESULT,
        interviewId
    }
}

export const fetchInterviewResultDownload = (applicantId, applicationId, InterviewResultId, ApplicantName) => {
    return {
        type: types.INTERVIEW_RESULT_REVIEW_VIEW_DOWNLOAD,
        applicantId,
        applicationId,
        InterviewResultId,
        ApplicantName
    }
}

export const fetchDownloadFLKBatch = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DOWNLOAD_FLK_BATCH
    }
}

export const fetchNotifHiring = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_NOTIF_HIRING
    }
}

export const fetchNotifHiringIntReview = () => {
    return {
        type: types.RECRUITMENT_PR_FETCH_NOTIF_HIRING_INT_REVIEW
    }
}

export const getListEmailTemplate = () => {
    return {
        type: types.RECRUITMENT_PR_GET_LIST_EMAIL_TEMPLATE
    }
}

export const handleStateModalEmailTemplate = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE,
        property,
        value
    }
}
export const resetEmailTemplateState = () => {
    return {
        type: types.RECRUITMENT_PR_RESET_EMAIL_TEMPLATE_STATE
    }
}

export const fetchEmailRedactionalInvited = (Activity, Action) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_INVITED,
        Activity,
        Action
    }
}

export const setApplicantListToSendEmailInvitation = applicantList => {
    return {
        type: types.SET_ATS_INVITED_APPLICANT_LIST_TO_SEND_EMAIL_INVITATION,
        applicantList
    }
}

export const handleStateModalEmailTemplateInterviewStep3 = (property, value) => {
    return {
        type: types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE_INTERVIEW_STEP_3,
        property,
        value
    }
}

export const fetchDownloadAttachmentInterviewResult = (url, fileName) => {
    return {
        type: types.RECRUITMENT_PR_FETCH_DOWNLOAD_ATTACHMENT_INTERVIEW,
        url,
        fileName
    }
}

export const fetchRecheckResult = () => {
    return {
        type: types.RECHECK_RESULT
    }
}
export const fetchRegenerateResult = () => {
    return {
        type: types.REGENERATE_RESULT
    }
}
export const fetchDownloadOLResult = () => {
    return {
        type: types.DOWNLOAD_OL_RESULT
    }
}
export const reOnlineTest = () => {
    return {
        type: types.REONLINE_TEST
    }
}
