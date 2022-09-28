import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Auth from './auth/reducer'
import App from './app/reducer'
import ThemeSwitcher from './themeSwitcher/reducer'
import LanguageSwitcher from './languageSwitcher/reducer'
import Vacancy from './Vacancy/reducer'
import ATSPhaseType from './ATSPhaseType/reducer'
import ATSPhase from './ATSPhase/reducer'
import ATSType from './ATSType/reducer'
import Event from './Event/reducer'
import Position from './Position/reducer'
import Assignment from './Assignment/reducer'
import User from './User/reducer'
import InputApplication from './InputApplication/reducer'
import UploadApplication from './UploadApplication/reducer'
import EmailConfiguration from './EmailConfiguration/reducer'
import ListOfApplicant from './ListOfApplicant/reducer'

import MappingWorkExperience from './MappingWorkExperience/reducer'
import MaintainGeneralFilter from './MaintainGeneralFilter/reducer'
import ConfigGeneralFilter from './ConfigGeneralFilter/reducer'
import ApplicantPhase from './ApplicantPhase/reducer'
import ApplicantStatus from './ApplicantStatus/reducer'
import MappingPhaseStatus from './MappingPhaseStatus/reducer'
import GmailSidebar from './GmailSidebar/reducer'
import VacancyTitle from './VacancyTitle/reducer'
import RecruitmentProcess from './RecruitmentProcess/reducer'
import RecruitmentPhase from './RecruitmentPhase/reducer'
import OnlineTest from './OnlineTest/reducer'
import PsychologicalTest from './PsychologicalTest/reducer'
import Interview from './Interview/reducer'
import AssigneeType from './AssigneeType/reducer'
import EmailReminder from './EmailReminder/reducer'
import ConfigCandidatePool from './ConfigCandidatePool/reducer'
import CandidatePool from './CandidatePool/reducer'
import CompanyRegistration from './CompanyRegistration/reducer'
import DownloadMasterData from './DownloadMasterData/reducer'
import MasterSuggestionVacancy from './MasterSuggestionVacancy/reducer'
import Assignee from './Assignee/reducer'
import HowToApply from './HowToApply/reducer'
import ReportAnalytics from './ReportAnalytics/reducer'
import OLIntegrationLog from './OLIntegrationLog/reducer'

import GlobalComponentDemo from './globalComponentDemo/reducer'
import GenerateActivityLink from './GenerateActivityLink/reducer'

export default {
    Auth,
    App,
    ThemeSwitcher,
    LanguageSwitcher,
    GlobalComponentDemo,

    Vacancy,
    ATSPhaseType,
    ATSPhase,
    ATSType,
    Event,
    Assignment,
    User,

    InputApplication,
    UploadApplication,
    EmailConfiguration,
    ListOfApplicant,
    Position,

    MappingWorkExperience,
    MaintainGeneralFilter,
    ConfigGeneralFilter,
    ApplicantPhase,
    ApplicantStatus,
    MappingPhaseStatus,
    GmailSidebar,
    VacancyTitle,
    RecruitmentProcess,
    RecruitmentPhase,
    OnlineTest,
    PsychologicalTest,
    Interview,
    AssigneeType,
    EmailReminder,
    ConfigCandidatePool,
    CandidatePool,
    CompanyRegistration,
    DownloadMasterData,
    MasterSuggestionVacancy,
    Assignee,
    HowToApply,
    GenerateActivityLink,
    ReportAnalytics,
    OLIntegrationLog
}
