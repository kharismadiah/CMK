import * as types from '../types'
import moment from 'moment'

const initState = {
    isLoading: false,
    isDisabled: false,
    fromPage: '',

    pageNo: 1,
    pageSize: 10,
    totalRows: 0,
    totalRowsMaster: 0,
    statusCallback: '1',
    indexIsEdit: 0,

    gridInputApplicationList: [],
    vacancyId: '',
    applicationId: '',
    vacancyCodeSearch: '',
    vacancyCodeList: [],
    candidateId: '',
    candidateName: '',
    Gender: '',
    search: '',
    searchList: [
        { id: 1, value: 'General', name: 'General' },
        { id: 2, value: 'MT & Trainee', name: 'MT & Trainee' },
        { id: 3, value: 'Pro Hire', name: 'Pro Hire' },
        { id: 4, value: 'Refference', name: 'Refference' }
    ],

    genderList: [
        { id: 2, value: 'Female', name: 'Female' },
        { id: 1, value: 'Male', name: 'Male' }
    ],
    domicileList: [],
    yearOfExpList: [],
    isDomicileOther: false,
    msgImageFileType: '',
    msgImageFileSize: '',
    msgCvFileType: '',
    personalData: {
        ApplicantId: '',
        candidateId: '',
        FullName: '',
        Email: '',
        DateOfBirth: '',
        Gender: '',
        Domicile: '',
        DomicileOther: '',
        PhoneNumber: '',
        YoeMonth: '',
        YoeYear: '',
        ExpectedSalary: '',
        SeekingOpportunity: '',
        PeriodEmailSuggest: '',
        cv: '',
        cvRaw: '',
        CVUrl: '',
        profilePicture: '',
        profilePictureRaw: '',
        ProfilePicUrl: '',
        activity: ''
    },

    degreeList: [],
    institutionList: [],
    majorList: [],
    isInstitutionOther: false,
    isMajorOther: false,
    educationList: [
        {
            EducationId: 0,
            Degree: '',
            Major: '',
            DegreeId: 0,
            InstitutionOther: '',
            MajorId: 0,
            StartYear: '',
            GraduatedYear: '',
            GPA: 0,
            GPAMax: 0,
            InstituteUniversityId: 0,
            IsPresent: false
        }
    ],
    education: {
        degree: '',
        institution: '',
        institutionOther: '',
        major: '',
        startYear: '',
        graduatedYear: '',
        gpa: 0,
        gpamax: '',
        nem: 0,
        isPresent: false
    },

    organizationScopeList: [],
    organizationTitleList: [],
    organizationList: [
        {
            OrganizationId: 0,
            OrganizationName: '',
            OrganizationScope: '',
            OrganiziationRole: '',
            Scope: 0,
            Title: 0
        }
    ],
    organization: {
        organizationName: '',
        scope: '',
        title: ''
    },

    jobTitleList: [],
    jobFunctionList: [],
    jobFunctionList2: [{ id: 1, value: '10', name: '10' }, { id: 2, value: '20', name: '20' }],
    jobFunctionList3: [{ id: 1, value: '10', name: '10' }, { id: 2, value: '20', name: '20' }],
    jobPositionList: [{ id: 1, value: '10', name: '10' }, { id: 2, value: '20', name: '20' }],
    jobIndustryList: [{ id: 1, value: '10', name: '10' }, { id: 2, value: '20', name: '20' }],
    jobExperienceList: [
        {
            JobExperienceId: 0,
            CompanyName: '',
            JobTitle: '',
            Position: '',
            PositionType: '',
            JobFunctionId: 0,
            JobFunction2Id: 0,
            JobFunction3Id: 0,
            Industry: '',
            IndustryOther: '',
            StartDate: moment(),
            EndDate: moment(),
            Main_Job_1: '',
            Main_Job_2: '',
            Main_Job_3: ''
        }
    ],
    jobExperience: {
        companyName: '',
        jobTitle: '',
        position: '',
        positionType: '',
        function: '',
        function2: '',
        function3: '',
        industry: '',
        industryOther: '',
        startDate: '',
        endDate: '',
        present: false,
        mainJob1: '',
        mainJob2: '',
        mainJob3: ''
    },
    emailSuggestionList: [],
    salaryList: [],
    positionTypeList: [],
    industryList: [],
    positionList: [],
    mediaList: [],

    internshipList: [],
    internship: {
        CompanyName: '',
        Function: '',
        Industry: '',
        IndustryOther: '',
        StartDate: '',
        EndDate: '',

        /**
         * internStartDate: '',
         * internEndDate: '',
         */

        IsPresent: false,
        JobDesc: '',

        startDateString: '',
        endDateString: ''
    },
    internshipFunction: [],
    internshipIndustry: [],
    onAddInternship: false,
    onAddStatus: '',
    isShowSelectEmailTemplate: false,
    emailTemplateList: [],
    emailTemplateTotalRows: 0,
    emailTemplateCurrentPage: 1,
    selectedEmailTemplateId: null,
    emailActivity: '',
    modalEmail: {
        visible: false,
        EmailConfigId: null,
        subject: '',
        body: '',
        signature: ''
    },
    listApplicantNonRegis: [],
    listApplicantRegis: [],
    applicantRegisStatus: 'non regis',
    triggerList: [],
    activityList: []
}

export default function InputApplicationReducer(state = initState, action) {
    switch (action.type) {
        case types.SET_INPUTAPP_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.INIT_PAGING_INPUTAPP: {
            return {
                ...state,
                pageNo: 1,
                pageSize: 10,
                totalRows: 0
            }
        }
        case types.INIT_FORM_SEARCH_INPUTAPP: {
            return {
                ...state,
                vacancyCode: '',
                vacancyCodeSearch: '',
                candidateId: '',
                candidateName: '',
                Gender: '',
                search: ''
            }
        }
        case types.INIT_FORM_INPUTAPP: {
            return {
                ...state,
                personalData: {
                    ...state.personalData,
                    SeekingOpportunity: '',
                    PeriodEmailSuggest: ''
                },
                educationList: [],
                education: {},
                organizationList: [],
                organization: {},
                jobExperienceList: [],
                jobExperience: {
                    companyName: '',
                    jobTitle: '',
                    position: '',
                    function: '',
                    function2: '',
                    function3: '',
                    industry: '',
                    industryOther: '',
                    startDate: '',
                    endDate: '',
                    present: false,
                    mainJob1: '',
                    mainJob2: '',
                    mainJob3: ''
                }
            }
        }
        case types.INIT_FORM_EDUCATION: {
            return {
                ...state,
                education: {
                    degree: '',
                    institution: '',
                    institutionOther: '',
                    major: '',
                    startYear: '',
                    graduatedYear: '',
                    gpa: '',
                    gpamax: '',
                    nem: 0
                }
            }
        }
        case types.INIT_FORM_PERSONAL: {
            return {
                ...state,
                personalData: {
                    ApplicantId: '',
                    candidateId: '',
                    FullName: '',
                    Email: '',
                    DateOfBirth: '',
                    Gender: '',
                    Domicile: '',
                    DomicileOther: '',
                    PhoneNumber: '',
                    YearsOfExperience: '',
                    ExpectedSalary: '',
                    SeekingOpportunity: '',
                    PeriodEmailSuggest: '',
                    cv: '',
                    profilePicture: ''
                }
            }
        }
        case types.INIT_FORM_ORGANIZATION: {
            return {
                ...state,
                organization: {
                    organizationName: '',
                    scope: '',
                    title: ''
                }
            }
        }
        case types.INIT_FORM_JOB_EXPERIENCE: {
            return {
                ...state,
                jobExperience: {
                    companyName: '',
                    jobTitle: '',
                    position: '',
                    function: '',
                    function2: '',
                    function3: '',
                    industry: '',
                    industryOther: '',
                    startDate: '',
                    endDate: '',
                    present: false,
                    mainJob1: '',
                    mainJob2: '',
                    mainJob3: ''
                }
            }
        }
        case types.INIT_FORM_INTERNSHIP: {
            //debugger
            return {
                ...state,
                internship: {
                    CompanyName: '',
                    Function: '',
                    Industry: '',
                    IndustryOther: '',
                    StartDate: '',
                    EndDate: '',
                    startDateString: '',
                    endDateString: '',
                    IsPresent: false,
                    JobDesc: ''
                }
            }
        }
        case types.HANDLE_STATE_INPUTAPP: {
            return {
                ...state,
                [action.field]: action.value
            }
        }
        case types.HANDLE_STATE_INPUTAPP_FORM: {
            if (action.field == 'personalData') {
                return {
                    ...state,
                    personalData: { ...state.personalData, [action.value]: action.data }
                }
            } else if (action.field == 'education') {
                return {
                    ...state,
                    education: { ...state.education, [action.value]: action.data }
                }
            } else if (action.field == 'organization') {
                return {
                    ...state,
                    organization: { ...state.organization, [action.value]: action.data }
                }
            } else if (action.field == 'jobExperience') {
                return {
                    ...state,
                    jobExperience: { ...state.jobExperience, [action.value]: action.data }
                }
            } else if (action.field == 'internship') {
                if (action.value == 'IsPresent') {
                    return {
                        ...state,
                        internship: {
                            ...state.internship,
                            [action.value]: action.data,
                            EndDate: moment('01-01-9999', 'MM-DD-YYYY'),
                            endDateString: moment('01-01-9999', 'MM-DD-YYYY').format()
                            // internEndDate: moment('01-01-9999', 'MM-DD-YYYY')
                        }
                    }
                } else if (action.value == 'StartDate') {
                    // debugger
                    return {
                        ...state,
                        internship: {
                            ...state.internship,
                            [action.value]: action.data,
                            StartDate: action.data,
                            // startDateString: moment.isMoment(action.data)
                            //     ? state.internship.StartDate
                            //     : moment(action.data).format()
                        }
                    }
                } else if (action.value == 'EndDate') {
                    // debugger
                    return {
                        ...state,
                        internship: {
                            ...state.internship,
                            [action.value]: action.data,
                            EndDate: action.data
                        }
                    }
                } else {
                    return {
                        ...state,
                        internship: {
                            ...state.internship,
                            [action.value]: action.data
                        }
                    }
                }
            } else if (action.field == 'internshipList') {
                debugger
                return {
                    ...state,
                    internshipList: action.data
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case types.SET_INPUTAPP_LIST: {
            return {
                ...state,
                gridInputApplicationList: action.value
            }
        }
        case types.SET_INPUTAPP_DETAILS: {
            let data = action.value
            let personalData = action.value.PersonalData
            let educationList = action.value.EducationList
            let organizationList = action.value.OrganizationList
            let jobExperienceList = action.value.JobExperienceList
            return {
                ...state,
                vacancyCode: data.VacancyId,
                vacancyId: data.VacancyId,
                applicationId: data.ApplicationId,
                personalData: {
                    ...personalData,
                    ApplicantId: personalData.ApplicantId,
                    candidateId: personalData.CandidateId,
                    FullName: personalData.FullName,
                    Email: personalData.Email,
                    DateOfBirth: moment(personalData.DateOfBirth, 'DD/MM/YYYY', true),
                    Gender: personalData.Gender,
                    Domicile: parseInt(personalData.Domicile),
                    DomicileOther: personalData.DomicileOther,
                    PhoneNumber: personalData.PhoneNumber,
                    YearsOfExperience: personalData.YearsOfExperience,
                    SeekingOpportunity: personalData.SeekingOpportunity,
                    // PeriodEmailSuggest: personalData.PeriodEmailSuggest,
                    cv: personalData.CVUrl,
                    profilePicture: personalData.ProfilePicUrl,
                    Salary: personalData.SalaryId // baru
                },
                educationList: educationList,
                organizationList: organizationList,
                jobExperienceList: jobExperienceList
            }
        }
        case types.SET_INPUTAPP_MASTERDATA: {
            return {
                ...state,
                domicileList: action.value.domicileList,
                yearOfExpList: action.value.yearOfExpList,
                degreeList: action.value.degreeList,
                institutionList: action.value.institutionList,
                majorList: action.value.majorList,
                jobTitleList: action.value.jobTitleList,
                jobFunctionList: action.value.jobFunctionList,
                organizationScopeList: action.value.organizationScopeList,
                organizationTitleList: action.value.organizationTitleList,
                vacancyCodeList: action.value.vacancyCodeList,
                emailSuggestionList: action.value.emailSuggestionList,
                salaryList: action.value.salaryList,
                positionTypeList: action.value.positionTypeList,
                industryList: action.value.industryList,
                positionList: action.value.positionList,
                mediaList: action.value.mediaList
            }
        }
        case types.INPUT_APPLICATION_SET_MODAL_EMAIL_TEMPLATE_VISIBILITY: {
            return {
                ...state,
                isShowSelectEmailTemplate: action.value
            }
        }
        case types.INPUT_APPLICATION_HANDLE_STATE_GLOBAL: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.INPUT_APPLICATION_RESET_EMAIL_TEMPLATE_STATE: {
            return {
                ...state,
                emailTemplateList: initState.emailTemplateList,
                emailTemplateTotalRows: initState.emailTemplateTotalRows,
                emailTemplateCurrentPage: initState.emailTemplateCurrentPage
                // selectedEmailTemplateId: initState.selectedEmailTemplateId
            }
        }
        case types.INPUT_APPLICATION_HANDLE_STATE_MODAL_EMAIL: {
            return {
                ...state,
                modalEmail: {
                    ...state.modalEmail,
                    [action.property]: action.value
                }
            }
        }
        case types.INPUT_APPLICATION_FETCH_EMAIL_TEMPLATE_SUCCESS: {
            return {
                ...state,
                modalEmail: {
                    ...state.modalEmail,
                    ...action.payload,
                    subject: action.payload.subject.replace(/(\r\n|\n|\r)/gm, '')
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}
