const Endpoint = {
    AUTHENTICATION: 'oauth2/token',
    LOGOUT:
        'oidc/logout?id_token_hint=0af1fce8-8faa-39f4-8e2a-a2ec086c2735&post_logout_redirect_uri=astra.co.id&state=1',

    API: 'api',
    v2: 'v2',

    //Vacancy - start
    VACANCY_LIST: 'List',
    ACTIVE_VACANCY_LIST: 'List',

    SUBMIT_VACANCY: 'api/v2/Vacancy/submit',
    REVISE_TABVACANCY: 'api/v2/Vacancy/revise/submit',
    REVISE_VACANCY: 'revise',
    DETAIL_VACANCY: 'detail',
    LOAD_VACANCY: 'api/v2/Vacancy/load',
    UPDATE_VACANCY: 'api/v2/Vacancy/update',
    DRAFT_VACANCY: 'draft',
    REJECT_VACANCY: 'reject',
    APPROVE_VACANCY: 'approve',
    DELETE_VACANCY: 'delete',
    CLOSE_VACANCY: '/api/v2/vacancy/close',
    //Vacancy

    //ASSIGNMENT - start
    ASSIGNMENT_LIST: 'list',
    ASSIGNMENT_HM: 'listptkhm',
    LOAD_ASSIGNMENT: 'load',
    SUBMIT_ASSIGNMENT: 'submit',
    DETAIL_ASSIGNMENT: 'detail?id=',
    UPDATE_ASSIGNMENT: 'update',
    UPDATE_STATUS_ASSIGNMENT: 'updatestatus',
    PTK_FUNCTION: 'api/v2/ptkfunction/list',
    HR_LIST: 'api/v2/user/hrlist',
    //ASIGNMENT - end

    //User - start
    USER_LIST: 'SearchCriteria?list',
    USER_DETAILS_BY_ID: 'Detail?detail',
    DELETE_USER_BY_ID: 'Delete?delete',
    LOAD_USER_CREATION: 'LoadForm?load',
    CREATE_USER: 'Create?create',
    UPDATE_USER: 'Update?update',
    RESET_PASSWORD: 'ResetPassword?reset',
    regionAndCompany: 'api/v2/branch?id=',
    //User - end

    //Event - Start
    LOAD_EVENT: 'load',
    LIST_EVENT: 'list',
    SAVE_EVENT: 'save',
    //Event - End

    //Master Data - Start
    MASTER_DATA: 'api/v2/masterdata',
    //Master Data - End

    //Email Config
    EMAIL_CONFIG: 'emailConfiguration',
    GET_DEL_EMAIL: 'api/v2/emailConfiguration?',
    LIST_EMAIL: 'api/v2/emailConfiguration/list',
    SAVE_EMAIL: 'api/v2/emailConfiguration/save',
    UPDATE_EMAIL: 'api/v2/emailConfiguration/update',
    UPDATE_STATUS: 'api/v2/emailConfiguration/updateStatus',
    //Email Config

    //Input Application -  Start
    APP_LIST: 'api/v2/application/list',
    APP_CREATE: 'api/v2/Application/create',
    APP_UPDATE: 'api/v2/Application/update',
    APP_DETAILS: 'api/v2/application?id=',
    //Input Application - End

    //Upload Application
    DOWNLOAD_UPLOADAPP_POST: 'api/v2/application/template/download',
    UPLOAD_UPLOADAPP_POST: 'api/v2/application/upload',
    
    //dropdown
    GET_DROPDOWN: 'Dropdown/DropdownTaxID',
    GET_DROPDOWN_FAKTUR: 'Dropdown/DropdownInvoiceNo',
    GET_DROPDOWN_DOKUMEN: 'Dropdown/DropdownReturnDoc',

    //Faktur Keluaran
    FK_GET: 'MaintainFPK/SearchFPKMonitoring',
    FK_DETAIL: 'MaintainFPK/RetrieveFPKDataSingle',
    FK_UNDUH: 'MaintainFPK/DownloadFPKDataReportCSV',
    FK_UNDUH_BATAL: 'MaintainFPK/DownloadFPKDataReportRejectedCSV',
    FK_GET_MAINTAIN: 'MaintainFPK/SearchFPKMaintain',
    FK_IMPORT: 'ImportFPKUI/UploadFakturPajakKeluaran',
    FK_SAVE_MAINTAIN: 'MaintainFPK/SaveEditedFPK',
    FK_IMPORT_SUCCESS: 'ViewFPKUI/ViewFakturPajakKeluaran',
    FK_DJP: 'MaintainFPK/ReadyToSendFPK',
    FK_DJP_SINGLE: 'MaintainFPK/ReadyToSendFPKSingle',
    SAVE_UPLOAD: 'SaveFPKUI/SaveFakturPajakKeluaran',
    FK_BATAL: 'MaintainFPK/CancelFPK',
    FK_BATAL_SINGLE: 'MaintainFPK/CancelFPKSingle',
    FK_REUPLOAD: 'MaintainFPK/ReuploadFPK',
    FK_SAVE_REUPLOAD: 'MaintainFPK/SaveReuploadFPK',
    FK_UNDUH_PDF: 'MaintainFPK/GetFakturPajakAsPDF',
    FK_KIRIM_KEMBALI: 'MaintainFPK/ResendToDJP',
    FK_UNDUH_UPLOAD: 'DownloadFPKUI/GetUploadedResultAsExcel',
    FK_REUPLOAD_SUCCESS: 'MaintainFPK/ReuploadReportFPK',
    FK_UNDUH_REUPLOAD: 'MaintainFPK/DownloadFPKReuploadDataReportCSV',
    FK_GET_TRX: 'GetTransactionStatus/Index',
    FK_GET_IDKET: 'MaintainFPK/GetDropdownAdditionalInfo',

    //Faktur Masukan
    FM_GET: 'MaintainFPM/SearchFPMMonitoring',
    FM_DETAIL: 'MaintainFPM/RetrieveFPMDataSingle',
    FM_UNDUH: 'MaintainFPM/DownloadFPMDataReportCSV',
    FM_UNDUH_BATAL: 'MaintainFPM/DownloadFPMDataReportRejectedCSV',
    FM_GET_MAINTAIN: 'MaintainFPM/SearchFPMMaintain',
    FM_SAVE_MAINTAIN: 'MaintainFPM/SaveEditedFPM',
    FM_IMPORT_SUCCESS: 'ViewFPMUI/ViewFakturPajakKeluaran',
    FM_DJP: 'MaintainFPM/ReadyToSendFPM',
    FM_DJP_SINGLE: 'MaintainFPM/ReadyToSendFPMSingle',
    FM_BATAL: 'MaintainFPM/CancelFPM',
    FM_BATAL_SINGLE: 'MaintainFPM/CancelFPMSingle',
    FM_UNDUH_MAINTAIN: 'MaintainFPM/DownloadFPMDataReportMaintainCSV',
    FM_KIRIM_KEMBALI: 'MaintainFPM/ResendToDJPFPM',
    FM_REUPLOAD: 'MaintainFPM/ReuploadFPM',
    FM_SAVE_REUPLOAD: 'MaintainFPM/SaveReuploadFPM',
    FM_REUPLOAD_SUCCESS: 'MaintainFPM/ReuploadReportFPM',
    FM_UNDUH_REUPLOAD: 'MaintainFPM/DownloadFPMReuploadDataReportCSV',

    //Retur Keluaran
    RK_GET: 'MaintainReturFPK/SearchReturFPKMonitoring',
    RK_DETAIL: 'MaintainReturFPK/RetrieveReturFPKDataSingle',
    RK_UNDUH: 'MaintainReturFPK/DownloadReturFPKDataReportCSV',
    RK_UNDUH_BATAL: 'MaintainReturFPK/DownloadFPKDataReportRejectedCSV',
    RK_GET_MAINTAIN: 'MaintainReturFPK/SearchReturFPKMaintain',
    RK_DJP: 'MaintainReturFPK/ReadyToSendReturFPK',
    RK_DJP_SINGLE: 'MaintainReturFPK/ReadyToSendReturFPKSingle',
    RK_SAVE_MAINTAIN: 'MaintainReturFPK/SaveEditedReturFPK',
    RK_BATAL: 'MaintainReturFPK/CancelReturFPK',
    RK_BATAL_SINGLE: 'MaintainReturFPK/CancelReturFPKSingle',
    RK_REUPLOAD: 'MaintainReturFPK/ReuploadReturFPK',
    RK_KIRIM_KEMBALI: 'MaintainReturFPK/ResendToDJPReturFPK',
    RK_SAVE_REUPLOAD: 'MaintainReturFPK/SaveReuploadReturFPK',
    RK_REUPLOAD_SUCCESS: 'MaintainReturFPK/ReuploadReportReturFPK',
    RK_UNDUH_REUPLOAD: 'MaintainReturFPK/DownloadReturFPKReuploadDataReportCSV',

    //Retur Masukkan
    RM_GET: 'MaintainReturFPM/SearchReturFPMMonitoring',
    RM_DETAIL: 'MaintainReturFPM/RetrieveReturFPMDataSingle',
    RM_UNDUH: 'MaintainReturFPM/DownloadReturFPMDataReportCSV',
    RM_UNDUH_BATAL: 'MaintainReturFPM/DownloadReturFPMDataReportRejectedCSV',
    RM_GET_MAINTAIN: 'MaintainReturFPM/SearchReturFPMMaintain',
    RM_DJP: 'MaintainReturFPM/ReadyToSendReturFPM',
    RM_DJP_SINGLE: 'MaintainReturFPM/ReadyToSendReturFPMSingle',
    RM_SAVE_MAINTAIN: 'MaintainReturFPM/SaveEditedReturFPM',
    RM_BATAL: 'MaintainReturFPM/CancelReturFPM',
    RM_KIRIM_KEMBALI: 'MaintainReturFPM/ResendToDJPReturFPM',
    RM_BATAL_SINGLE: 'MaintainReturFPM/CancelReturFPMSingle',
    RM_UNDUH_MAINTAIN: 'MaintainReturFPM/DownloadReturFPMDataReportMaintainCSV',
    RM_REUPLOAD: 'MaintainReturFPM/ReuploadReturFPM',
    RM_SAVE_REUPLOAD: 'MaintainReturFPM/SaveReuploadReturFPM',
    RM_REUPLOAD_SUCCESS: 'MaintainReturFPM/ReuploadReportReturFPM',
    RM_UNDUH_REUPLOAD: 'MaintainReturFPM/DownloadReturFPMReuploadDataReportCSV',

    //reference
    REFERENCE_GET: 'Reference/Get',
    REFERENCE_DELETE: 'Reference/Delete',
    REFERENCE_SAVE: 'Reference/Save',

    //management Upload
    MU_SAVE: 'ManagementUpload/Save',
    MU_GET: 'ManagementUpload/Get',

    //Posting SPT
    PSPT_GET_CHECKPKPM: 'CekJumlahDokumenPKPM',
    PSPT_POST_SPT: 'PostingSPT',

    //Buka SPT
    BUKASPT_GET_SPT: 'MaintainSPT',
    DETAIL_SPT: 'GetSPT',
    SAVE_SPT: 'SaveSPT',
    VIEW_SPT: 'ViewDjpVerSPT/ViewSPT',
    SUBMIT_SPT: 'SubmitSPT/SubmitSPT',
    LAPOR_SPT: 'LaporSPT/LaporSPT',
    SPT_UNDUH_PDF: 'DownloadSPT',
    BPE_UNDUH_PDF: 'DownloadSPT/DownloadBPE',
    GET_NTTE: 'GetNTTE/GetNTTE',
    GET_SPT: 'GetDjpVerSPT',
    CAL_SPT: 'SaveSPT/Recalc',
    STATUS_SPT: 'GetTransactionStatus/GetStatusSPT',

    //check uer
    CHECK: 'UserAccount/GetUserInfo',

    ATS_PHASE_TYPE_LIST_POST: 'api/v2/atsphasetype/list',
    ATS_PHASE_TYPE_LIST_DEL: 'api/v2/atsphasetype/delete',
    ATS_PHASE_TYPE_DETAIL_POST: 'api/v2/atsphasetype/detail',
    ATS_PHASE_TYPE_SAVE_POST: 'api/v2/atsphasetype/save',
    ATS_PHASE_TYPE_UPDATE_POST: 'api/v2/atsphasetype/update',

    ATS_TYPE_LIST_POST: 'api/v2/atstype/list',
    ATS_TYPE_SAVE_POST: 'api/v2/atstype/submit',
    ATS_TYPE_LIST_DEL: 'api/v2/atstype/delete',
    ATS_TYPE_DETAIL_GET: 'api/v2/atstype/detail',
    ATS_TYPE_UPDATE_POST: 'api/v2/atstype/update',
    ATS_TYPE_DELETE_LIST: 'api/v2/atstype/delete?id=',

    EVENT_LIST_POST: 'api/v2/event/list',
    EVENT_DELETE_LIST: 'api/v2/event/delete',
    EVENT_SAVE_POST: 'api/v2/event/save',
    EVENT_DETAIL_GET: 'api/v2/event/detail',
    EVENT_UPDATE_POST: 'api/v2/event/update',

    APPLICANT_LIST_POST: 'api/v2/applicant/list',
    APPLICANT_TAG_POST: 'api/v2/applicant/tag',
    APPLICANT_RELEASE_POST: 'api/v2/applicant/release',
    APPLICANT_DETAIL_GET: 'api/v2/Applicant',
    APPLICANT_ACTIVE_VACANCY_POST: 'api/v2/vacancy/invitetojoin/list',
    APPLICANT_DETAIL_ACTIVE_VACANCY_POST: 'api/v2/Vacancy/detail',
    APPLICANT_EMAIL_REDACTIONAL_POST: 'api/v2/emailConfiguration/emailTemplate',
    APPLICANT_SEND_INVITATION_EMAIL_POST: 'api/v2/applicant/invitetojoin/sendemail',

    //ATS PHASE
    ATS_PHASE_LIST_POST: 'api/v2/atsphase/list',
    ATS_PHASE_CREATE_POST: 'api/v2/atsphase/save',
    ATS_PHASE_DEL: 'api/v2/atsphase?id=',
    ATS_PHASE_DETAIL_GET: 'api/v2/atsphase?id=',

    //POSITION
    POSITION_LIST_POST: 'api/v2/position/list',
    POSITION_CREATE_POST: 'api/v2/position/submit',
    POSITION_DEL: 'api/v2/position/delete?id=',
    POSITION_DETAIL_GET: 'api/v2/position/detail?id=',
    POSITION_UPDATE_POST: 'api/v2/position/update?id=',

    GN_FILTER_LIST_POST: 'api/v2/generalfilter/list',
    GN_FILTER_SUBMIT_POST: 'api/v2/generalfilter/create',
    GN_FILTER_DETAIL_GET: 'api/v2/generalfilter',
    GN_FILTER_DELETE_DEL: 'api/v2/generalfilter/delete',
    GN_FILTER_UPDATE_PUT: 'api/v2/generalfilter/update',

    GF_CONFIG_LIST_POST: 'api/v2/generalFilterConfig/list',
    GF_CONFIG_SUBMIT_POST: 'api/v2/generalFilterConfig/submit',
    GF_CONFIG_DETAIL_GET: 'api/v2/generalFilterConfig/detail',
    GF_CONFIG_DELETE_DEL: 'api/v2/generalFilterConfig/delete',
    GF_CONFIG_UPDATE_POST: 'api/v2/generalFilterConfig/update',

    APPLICANT_PHASE_LIST_POST: 'api/v2/applicantPhase/list',
    APPLICANT_PAHSE_DETAIL_POST: 'api/v2/ApplicantPhase/details',
    APPLICANT_PHASE_SUBMIT_POST: 'api/v2/applicantphase/create',
    APPLICANT_PHASE_UPDATE_PUT: 'api/v2/ApplicantPhase/update',
    APPLICANT_PHASE_DELETE_DEL: 'api/v2/applicantPhase/delete',

    APPLICANT_STATUS_LIST_POST: 'api/v2/ApplicantStatus/list',
    APPLICANT_STATUS_DETAIL_POST: 'api/v2/ApplicantStatus/detail',
    APPLICANT_STATUS_SUBMIT_POST: 'api/v2/ApplicantStatus/save',
    APPLICANT_STATUS_UPDATE_POST: 'api/v2/ApplicantStatus/update',
    APPLICANT_STATUS_DELETE_DEL: 'api/v2/ApplicantStatus/delete',

    MAPP_PHASE_STATUS_LIST_POST: 'api/v2/ApplicantPhaseStatus/list',
    MAPP_PHASE_STATUS_DETAIL_POST: 'api/v2/ApplicantPhaseStatus/details',
    MAPP_PHASE_STATUS_SUBMIT_POST: 'api/v2/ApplicantPhaseStatus/create',
    MAPP_PHASE_STATUS_DELETE_DEL: 'api/v2/applicantPhaseStatus/delete',
    MAPP_PHASE_STATUS_UPDATE_POST: 'api/v2/applicantPhaseStatus/update',

    RECRUITMENT_FILTER_POST: 'api/v2/recruitmentprocess/dashboard/filter',
    RECRUITMENT_DASHBOARD_POST: 'api/v2/recruitmentprocess/dashboard',
    RECRUITMENT_DASHBOARD_POST_VACANCYLIST_PTK: 'api/v2/recruitmentprocess/dashboard/vacancylistptk',
    RECRUITMENT_DASHBOARD_GET: 'api/v2/recruitmentprocess/vacancy/dashboard',
    RECRUITMENT_DASHBOARD_POST_TEST_TOOL: 'api/v2/recruitmentProcess/vacancy/OnlinetestType/confirmupdate',
    RECRUITMENT_DASHBOARD_POST_UPDATE_ONLINE_TEST: 'api/v2/recruitmentProcess/vacancy/OnlinetestType/update',

    RECRUITMENT_PHASE_LIST_POST: 'api/v2/recruitmentprocess/applicant/list',
    RECRUTIMENT_PHASE_EMAIL_REDACTION_POST: 'api/v2/emailConfiguration/emailTemplate',
    RECRUTIMENT_PHASE_EMAIL_CVREVIEW_POST: 'api/v2/recruitmentprocess/CVReview/emailnotify',
    RECRUTIMENT_PHASE_EMAIL_INT_REVIEW_POST: 'api/v2/recruitmentprocess/notifyhrmanager',
    RECRUTIMENT_PHASE_EMAIL_SUBMIT_POST: 'api/v2/applicant/invitetojoin/sendemail',
    RECRUTIMENT_PHASE_DETAIL_POST: 'api/v2/recruitmentprocess/applicant/detail',
    RECRUTIMENT_PHASE_REFERENCE_SUBMIT_POST: 'api/v2/applicantReference/create',
    RECRUITMENT_PHASE_REFERENCE_DELETE_POST: 'api/v2/applicantReference/delete',
    RECRUITMENT_PHASE_REFERENCE_UPDATE_POST: 'api/v2/applicantReference/update',
    RECRUITMENT_PHASE_ACTION_POST: 'api/v2/recruitmentprocess/applicant/action',
    RECRUITMENT_PHASE_POOL_POST: 'api/v2/recruitmentprocess/applicant/action/candidatePool',
    RECRUITMENT_PHASE_ONLINE_TEST_POST: 'api/v2/recruitmentprocess/applicant/Onlinetest/uploadresult',
    RECRUITMENT_PHASE_FLK_SUBMIT_POST: 'api/v2/recruitmentprocess/applicant/FLK/submit',
    RECRUITMENT_PHASE_FLK_DOWNLOAD_POST: 'api/v2/recruitmentprocess/applicant/FLK/download',
    RECRUITMENT_PHASE_FLK_SEND_EMAIL_POST: 'api/v2/recruitmentprocess/applicant/sendemail/flk',
    RECRUITMENT_PHASE_OFFERING_SEND_EMAIL_POST: 'api/v2/recruitmentprocess/applicant/sendemail/offering',
    RECRUITMENT_PHASE_PSYCHOLOGICAL_SUBMIT_POST: 'api/v2/recruitmentprocess/applicant/Psychologicaltest/uploadresult',
    RECRUTIMENT_PHASE_EMAIL_PSYCHOLOGICAL_SUBMIT_POST:
        'api/v2/recruitmentprocess/applicant/sendemail/PsychologicalTest',
    RECRUITMENT_PHASE_FGD_RESULT_POST: 'api/v2/recruitmentprocess/applicant/fgdtest/uploadresult',
    RECRUITMENT_PHASE_HIRE_CANDIDATE_POST: 'api/v2/recruitmentprocess/applicant/action/hire',
    RECRUITMENT_DELETE_DATA_INTERVIEW: 'api/v2/atsphaseinterview/company/delete?id=',
    RECRUITMENT_ADD_DATA_INTERVIEW: 'api/v2/atsphaseinterview/company/save',
    RECRUITMENT_DATA_INTERVIEW_SCHEDULE: 'api/v2/atsphaseinterview/ScheduleInterview/list',
    RECRUITMENT_ADD_SCHEDULE_INTERVIEWER: 'api/v2/atsphaseinterview/ScheduleInterview/create',
    RECRUITMENT_PHASE_FGD_SEND_EMAIL_POST: 'api/v2/recruitmentprocess/applicant/sendemail/FocusGroupDiscussion',
    RECRUITMENT_PHASE_INTERVIEW_HR_SEND_EMAIL_POST: 'api/v2/recruitmentprocess/applicant/sendemail/InterviewHR',
    RECRUITMENT_PHASE_UPLOAD_RESULT: 'api/v2/atsphaseinterview/InterviewResult/upload',
    RECRUITMENT_PHASE_DELETE_INTERVIEWER: 'api/v2/atsphaseinterview/ScheduleInterview/delete?id=',
    RECRUITMENT_PHASE_UPDATE_INTERVIEWER: 'api/v2/atsphaseinterview/ScheduleInterview/update?id=',
    RECRUITMENT_GET_COMPANY_LIST: 'api/v2/atsphaseinterview/company/list',
    RECRUITMENT_PHASE_SUBMIT_RESULT: 'api/v2/atsphaseinterview/ScheduleInterview/result/update',
    RECRUITMENT_PHASE_VIEW_RESULT: 'api/v2/InterviewResult/viewResult',
    RECRUITMENT_PHASE_VIEW_FLK_GET: 'api/v2/recruitmentprocess/applicant/FLK/ViewFLKForm',
    RECRUITMENT_PHASE_MASTER_DATA_FLK: 'api/v2/recruitmentprocess/applicant/FLK/masterdata',
    RECRUITMENT_PHASE_FAILED_INTERVIEW: 'api/v2/atsphaseInterview/failCandidate',
    RECRUITMENT_PHASE_FGD_TEST_RESULT_GET: 'api/v2/recruitmentprocess/applicant/fgdtest/detail?id=',
    RECRUITMENT_PHASE_PSYCHO_TEST_RESULT_GET: 'api/v2/recruitmentprocess/applicant/Psychologicaltest/detail?id=',
    RECRUITMENT_PHASE_OT_TEST_RESULT_GET: 'api/v2/recruitmentprocess/applicant/Onlinetest/detail?id=',
    RECRUITMENT_PHASE_INTERVIEW_VIEW_RESULT_GET: 'api/v2/InterviewResult/viewResultbyID?appInterviewId=',
    RECRUITMENT_PHASE_DOWN_TEMPLATE_POST: 'api/v2/recruitmentprocess/applicant/Onlinetest/downloadtemplate',
    RECRUITMENT_PHASE_UPLOAD_TEST_POST: 'api/v2/recruitmentprocess/applicant/Onlinetest/uploadtemplate',
    RECRUITMENT_PHASE_FGD_DOWN_TEMPLATE_POST: 'api/v2/recruitmentprocess/applicant/fgdtest/downloadtemplate',
    RECRUITMENT_PHASE_FGD_UPLOAD_TEST_POST: 'api/v2/recruitmentprocess/applicant/fgdtest/uploadtemplate',
    RECRUITMENT_PHASE_INTERVIEW_RESULT_VIEW: 'api/v2/recruitmentprocess/applicant/viewInterview',
    RECRUITMENT_PHASE_INTERVIEW_RESULT_DOWNLOAD_PDF: 'api/v2/atsphaseinterview/interviewreview/download',
    RECRUITMENT_PHASE_INTERVIEW_RESULT_DOWNLOAD_FLKBATCH: 'api/v2/recruitmentprocess/applicant/FLK/downloadBatch',
    RECRUTIMENT_OFFERING_ADDEDIT_DETAILS_POST: 'api/v2/recruitmentprocess/applicant/phaseoffering/detail',
    RECRUTIMENT_OFFERING_ADDEDIT_UPLOAD_FILE: 'api/v2/recruitmentprocess/applicant/phaseoffering/upload',
    RECRUTIMENT_OFFERING_LIST_FAILEDBY: 'api/v2/recruitmentprocess/applicant/phaseoffering/listfailedby',
    RECRUTIMENT_OFFERING_LIST_FEEDBACK: 'api/v2/recruitmentprocess/applicant/phaseoffering/listfailedfeedback',
    RECRUTIMENT_OFFERING_LIST_FEEDBACK_SUBMIT: 'api/v2/recruitmentprocess/applicant/phaseoffering/savefeedback',
    RECRUITMENT_REQUEST_DOWNLOAD_OLRESULT: 'api/v2/recruitmentProcess/downloadolresult',
    RECRUITMENT_REQUEST_REGENERATE_OLRESULT: 'api/v2/recruitmentProcess/vacancy/regenerateolresult',
    RECRUITMENT_REQUEST_REONLINETEST: 'api/v2/recruitmentProcess/vacancy/reonlinetest',
    RECRUITMENT_REQUEST_RECHECK_RESULT: 'api/v2/recruitmentProcess/vacancy/recheckolresult',

    ASSIGNEE_TYPE_LIST_POST: 'api/v2/AssigneeType/list',
    ASSIGNEE_TYPE_CREATE_POST: 'api/v2/AssigneeType/create',
    ASSIGNEE_TYPE_GET_POST: 'api/v2/AssigneeType/details',
    ASSIGNEE_TYPE_UPDATE_POST: 'api/v2/AssigneeType/update',
    ASSIGNEE_TYPE_DEL_POST: 'api/v2/AssigneeType/delete',

    ASSIGNEE_LIST_POST: 'api/v2/Assignee/list',
    ASSIGNEE_CREATE_POST: 'api/v2/Assignee/create',
    ASSIGNEE_GET_POST: 'api/v2/Assignee/details',
    ASSIGNEE_UPDATE_POST: 'api/v2/Assignee/update',
    ASSIGNEE_DEL_POST: 'api/v2/Assignee/delete',

    EMAIL_REMINDER_LIST_POST: 'api/v2/emailreminder/list',
    EMAIL_REMINDER_CREATE_POST: 'api/v2/emailreminder/create',
    EMAIL_REMINDER_DETAILS_POST: 'api/v2/emailreminder/details',
    EMAIL_REMINDER_UPDATE_POST: 'api/v2/emailreminder/update',
    EMAIL_REMINDER_DELETE_POST: 'api/v2/emailreminder/delete',

    CFG_CANDIDATE_POOL_LIST_POST: 'api/v2/candidatepoolconfig/list',
    CFG_CANDIDATE_POOL_CREATE_POST: 'api/v2/candidatepoolconfig/create',
    CFG_CANDIDATE_POOL_DETAILS_POST: 'api/v2/candidatePoolConfig/details',
    CFG_CANDIDATE_POOL_UPDATE_POST: 'api/v2/candidatePoolConfig/update',
    CFG_CANDIDATE_POOL_DELETE_POST: 'api/v2/candidatePoolConfig/delete',

    CANDIDATE_POOL_LIST: 'api/v2/CandidatePool/list',
    CANDIDATE_POOL_REQUESTAFFO_LIST: 'api/v2/CandidatePoolAFFCO/testrequest/list',
    CANDIDATE_POOL_REQUESTAFFO_TESTTYPE_LIST: 'api/v2/CandidatePoolAFFCO/testrequest/dropdowntesttype',
    CANDIDATE_POOL_REQUESTAFFO_TESTTOOL_LIST: 'api/v2/CandidatePoolAFFCO/testrequest/dropdowntesttool',
    CANDIDATE_POOL_REQUESTAFFO_GRADE_LIST: 'api/v2/CandidatePoolAFFCO/testrequest/dropdowngrade',
    CANDIDATE_POOL_INVITED_LIST: 'api/v2/CandidatePool/applicant/list',
    CANDIDATE_POOL_EXTEND: 'api/v2/CandidatePool/Applicant/extendConfirm',
    CANDIDATE_POOL_RESUME_DETAIL: 'api/v2/CandidatePool/applicant/resume',
    CANDIDATE_POOL_INVITE_JOINT: 'api/v2/CandidatePool/invitetojoin',

    CANDIDATE_POOL_REQUEST: 'api/v2/candidatepool/testRequest/submit',
    CANDIDATE_POOL_REQUEST_LIST: 'api/v2/candidatepool/testRequest/list',
    CANDIDATE_POOL_REQUEST_RESULT: 'api/v2/candidatepool/testRequest/uploadResult',
    
    CANDIDATE_POOL_REQUEST_APPROVAL_OLRESULT: 'api/v2/CandidatePoolAFFCO/testrequest/acceptancerequest',
    CANDIDATE_POOL_POST_SUBMIT_REQUESTCANDIDATE: 'api/v2/CandidatePoolAFFCO/testrequest/submit',

    COMPANY_RGST_LIST_POST: 'api/v2/cbtcompany/list',
    COMPANY_RGST_CREATE_POST: 'api/v2/cbtcompany/create',
    COMPANY_RGST_DETAIL_POST: 'api/v2/cbtcompany/detail',
    COMPANY_RGST_UPDATE_POST: 'api/v2/cbtCompany/update',
    COMPANY_RGST_DELETE: 'api/v2/cbtcompany/delete',

    DWN_MASTER_DATA_SOURCE_POST: 'api/v2/downloadMasterData/tables',
    DWN_MASTER_DATA_POSITION_POST: 'api/v2/downloadMasterData/Position/List',
    DWN_MASTER_DATA_GROUP_EVENT_POST: 'api/v2/downloadMasterData/GroupEvent/List',
    DWN_MASTER_DATA_EVENT_LIST_POST: 'api/v2/downloadmasterdata/event/List',
    DWN_MASTER_DATA_VACANCY_LIST_POST: 'api/v2/downloadmasterdata/vacancy/List',
    DWN_MASTER_DATA_DOWN_MASTER_POST: 'api/v2/downloadmasterdata',

    RECRUITMENT_PHASE_PT_CBT_DOWNLOAD_TEMPLATE_POST: 'api/v2/atspsychologicaltest/downloadtemplate', //done
    RECRUITMENT_PHASE_PT_CBT_UPLOAD_TEMPLATE_POST: 'api/v2/atspsychologicaltest/uploadTemplate',
    RECRUITMENT_PHASE_PT_CBT_UPLOAD_RESULT_GET: 'api/v2/recruitmentprocess/applicant/Psychologicaltest/uploadResult',
    RECRUITMENT_PHASE_PT_CBT_DETAILS_GET: 'api/v2/recruitmentprocess/applicant/Psychologicaltest/details?id=',
    RECRUITMENT_PHASE_PT_CBT_SWITCH_POST: 'api/v2/recruitmentprocess/applicant/Psychologicaltest/switch',
    RECRUITMENT_PHASE_PT_CBT_DOWNLOAD_APPLICANT_POST: 'api/v2/atspsychologicaltest/applicant/download', //done

    MASTER_SUGGEST_VACANCY_CREATE_POST: 'api/v2/suggestionVacancy/create',
    MASTER_SUGGEST_VACANCY_LIST_POST: 'api/v2/suggestionVacancy/list',
    MASTER_SUGGEST_VACANCY_DETAILS_POST: 'api/v2/suggestionVacancy',
    MASTER_SUGGEST_VACANCY_UPDATE_POST: 'api/v2/suggestionVacancy/update',
    MASTER_SUGGEST_VACANCY_ACTIVATE_POST: 'api/v2/suggestionVacancy/activate',
    MASTER_SUGGEST_VACANCY_DELETE: 'api/v2/suggestionVacancy/delete',

    FLK_LOGIN_POST: 'api/v2/applicant/flk/login',
    FLK_VIEW_POST: 'api/v2/applicant/FLK/View',
    FLK_MASTERDATA_GET: 'api/v2/applicant/FLK/masterData',
    FLK_FRESH_GRADUATION_SUBMIT_POST: 'api/v2/applicant/FLK/freshgraduate/submit',
    FLK_PROFESSIONAL_SUBMIT_POST: 'api/v2/applicant/FLK/professional/submit',

    CANDIDATE_EXTEND: 'api/v2/candidatepool/applicant/extend',

    USERPROFILE_LIST_GET: 'api/v2/user/userslist',

    HOW_TO_APPLY_MAINTAIN_POST: 'api/virtue/howtoapply/list',
    HOW_TO_APPLY_DETAILS_BY_ID_GET: 'api/virtue/howtoapply/detail?id=',
    HOW_TO_APPLY_SUBMIT_POST: 'api/virtue/howtoapply/save',

    //WORKING MAPPING EXP
    WORKING_MAPPING_EXP_FETCH_LIST_POST: 'api/v1/yoe/get-all',
    WORKING_MAPPING_EXP_DELETE: 'api/v1/yoe/delete',
    WORKING_MAPPING_EXP_SUBMIT_POST: 'api/v1/yoe/save',
    WORKING_MAPPING_EXP_DETAIL_GET: 'api/v1/yoe/get-data-by-id',


    //new endpoint candidate pool history list
    CANDIDATE_POOL_HISTORY_LIST: 'api/v2/CandidatePool/DataRequest/Histories',

    //new endpoint candidate pool drodown request and generate
    CANDIDATE_POOL_DROPDOWN_GRADE_LIST: 'api/v2/CandidatePool/DropdownGrade',
    CANDIDATE_POOL_DROPDOWN_TESTTOOL_LIST: 'api/v2/CandidatePool/DropDownTestTool',
    CANDIDATE_POOL_GENERATE_DATA_LIST: 'Api/v2/CandidatePool/DataRequest',
    CANDIDATE_POOL_VIEW_AFFCO_DATA_REQUEST: 'Api/v2/CandidatePool/DataRequest/AFFCO',
    CANDIDATE_POOL_ACCEPT_REQUEST: 'Api/v2/CandidatePool/DataRequest/Accept',
    CANDIDATE_POOL_REJECT_REQUEST: 'Api/v2/CandidatePool/DataRequest/Reject',
    
    //new endpoint ------------------------------------------
    CHECK_EMAIL_TEMPLATE: 'api/v2/emailConfiguration/emailActionCheck',
    GET_EMAIL_TEMPLATE: 'api/v2/emailConfiguration/emailtemplate',

    // Generate Activity Link - Start
    GENERATE_ACTIVITY_LINK_MASTER_DATA: '/api/v2/linkactivity/load',
    CREATE_GENERATE_ACTIVITY_LINK: '/api/v2/linkactivity/generate',
    // Generate Activity Link - End

    //new endpoint get email activity masterdata
    GET_EMAIL_ACTIVITY: 'api/v2/emailConfiguration/getEmailActivity',

    GET_EMAIL_TRIGGER: 'api/v2/emailConfiguration/getEmailTrigger',
    CHECK_MULTIPLE_EMAIL_TEMPLATE: 'api/v2/emailConfiguration/saveCheck',
    INPUT_UPLOAD_APP_SEND_EMAIL: 'api/v2/Application/SendEmail',

    CANDIDATE_POOL_INVITED_LIST_FILTERED_WAITING_DECLINED_EXPIRED: 'api/v2/CandidatePoolAFFCO/applicant/waitinglist',
    CANDIDATE_POOL_INVITED_LIST_FILTERED_ACCEPTED_ON_PROGRESS: 'api/v2/CandidatePoolAFFCO/applicant/acclist',
    CANDIDATE_POOL_INVITED_LIST_FILTERED_ACCEPTED_FAILED: 'api/v2/CandidatePoolAFFCO/applicant/acclistfailed',
    //new endpoint invite to join
    CHECK_INVITE_TO_JOIN_APPLICANT: '/api/v2/Applicant/invitetojoin/checkinvitation',
    //NEW ENDPOINT PTK
    RECRUITMENT_FILTER_POST_PTK: 'api/v2/recruitmentprocess/dashboard/filter/ptk',

    //Report Analytics - TODO
    REPORT_ANALYTICS_MASTER_DATA: 'api/v2/downloadReport/dropdownData',
    REPORT_EXPORT_POST: 'api/v2/downloadReport/export',
    REPORT_FETCH_INFO_DOWNLOAD: 'api/v2/downloadReport/downloadFile',
    REPORT_REEXPORT_POST: '',
    REPORT_FORM_HISTORY_POST: 'api/v2/downloadReport/inquiry',
    OLINTEGRATIONLOG_FETCH_MASTER_DATA : 'api/v2/recruitmentprocess/olintegration/load',
    OLINTEGRATIONLOG_FETCH_DATA : 'api/v2/recruitmentprocess/olintegration/log',
    OLINTEGRATIONLOG_FETCH_RECHECK : 'api/v2/recruitmentProcess/vacancy/recheckolresult',
    OLINTEGRATIONLOG_FETCH_REGENERATE_FAILED : 'api/v2/recruitmentProcess/vacancy/regenerateolresult',

    //another new api candidate pool
    CANDIDATE_POOL_DROPDOWN_TESTTYPE_LIST : 'api/v2/CandidatePool/DropdownTestType',
    CANDIDATE_POOL_GENERATE_REQUEST : 'Api/v2/CandidatePool/DataRequest/Submit',
    CANDIDATE_POOL_REGENERATE_REQUEST: 'Api/v2/CandidatePool/DataRequest/Regenerate',

    CANDIDATE_POOL_CONFIRM_NORMHO: 'api/v2/CandidatePool/DataRequest/NormHoGenerate',
}

export default Endpoint
