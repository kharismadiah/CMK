import { all } from 'redux-saga/effects'
import authSagas from './auth/saga'
import vacancy from './Vacancy/saga'
import assignment from './Assignment/saga'
import user from './User/saga'
import ATSPhaseType from './ATSPhaseType/saga'
import ATSPhase from './ATSPhase/saga'
import ATSType from './ATSType/saga'
import Event from './Event/saga'
import Position from './Position/saga'
import inputApplication from './InputApplication/saga'
import UploadApplication from './UploadApplication/saga'
import emailConfiguration from './EmailConfiguration/saga'
import ListOfApplicant from './ListOfApplicant/saga'

import MappingWorkExperience from './MappingWorkExperience/saga'
import MaintainGeneralFilter from './MaintainGeneralFilter/saga'
import ConfigGeneralFilter from './ConfigGeneralFilter/saga'
import ApplicantPhase from './ApplicantPhase/saga'
import ApplicantStatus from './ApplicantStatus/saga'
import MappingPhaseStatus from './MappingPhaseStatus/saga'
import GmailSidebar from './GmailSidebar/saga'
import VacancyTitle from './VacancyTitle/saga'
import RecruitmentProcess from './RecruitmentProcess/saga'
import RecruitmentPhase from './RecruitmentPhase/saga'
import OnlineTest from './OnlineTest/saga'
import PsychologicalTest from './PsychologicalTest/saga'
import Interview from './Interview/saga'
import AssigneeType from './AssigneeType/saga'
import EmailReminder from './EmailReminder/saga'
import ConfigCandidatePool from './ConfigCandidatePool/saga'
import CandidatePool from './CandidatePool/saga'
import CompanyRegistration from './CompanyRegistration/saga'
import DownloadMasterData from './DownloadMasterData/saga'
import MasterSuggestionVacancy from './MasterSuggestionVacancy/saga'
import Assignee from './Assignee/saga'
import HowToApply from './HowToApply/saga'
import GenerateActivityLink from './GenerateActivityLink/saga'
import ReportAnalytics from './ReportAnalytics/saga'
import OLIntegrationLog from './OLIntegrationLog/saga'

import GlobalComponentDemo from './globalComponentDemo/sagas'

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        vacancy(),
        assignment(),
        user(),
        ATSPhaseType(),
        ATSPhase(),
        ATSType(),
        Position(),
        Event(),
        inputApplication(),
        UploadApplication(),
        emailConfiguration(),

        GlobalComponentDemo(),
        ListOfApplicant(),
        MappingWorkExperience(),
        MaintainGeneralFilter(),
        ConfigGeneralFilter(),
        ApplicantPhase(),
        ApplicantStatus(),
        MappingPhaseStatus(),
        GmailSidebar(),
        VacancyTitle(),
        RecruitmentProcess(),
        RecruitmentPhase(),
        OnlineTest(),
        PsychologicalTest(),
        Interview(),
        AssigneeType(),
        EmailReminder(),
        ConfigCandidatePool(),
        CandidatePool(),
        CompanyRegistration(),
        DownloadMasterData(),
        MasterSuggestionVacancy(),
        Assignee(),
        HowToApply(),
        GenerateActivityLink(),
        ReportAnalytics(),
        OLIntegrationLog()
    ])
}
