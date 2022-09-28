const BASE_URL = "https://astralemonapi-qa.azurewebsites.net/api";
const BASE_URL_IMAGE_TEMP =
  "https://dsohsosharedstorage.blob.core.windows.net/astralemon-qa";
export const CLIENT_ID = "";

export const API_GET_TOKEN = `${BASE_URL}/Authentication/Login`;

//VACANCY
export const API_VACANCY_LIST = `${BASE_URL}/api/v2/vacancy/list`;

//AREA
export const API_MASTER_AREA = `${BASE_URL}/Master/GetMasterKabupaten`;
export const API_MASTER_AREA_ID = `${BASE_URL}/Master/GetKabupatenByMainDealerID?MainDealerID=`;
export const API_MASTER_AREA_LOGIN = `${BASE_URL}/Master/GetMasterDistrictByDealerCode`;

//DEALER
export const API_MASTER_DEALER = `${BASE_URL}/Master/GetMasterDealer`;
export const API_MASTER_DEALER_ID = `${BASE_URL}/Master/GetDealerByKabupatenIDs`;

//GET ALL MASTER DATA
export const API_MASTER_PROPOSAL = `${BASE_URL}/Master/GetMasterProposalSms`;
export const API_MASTER_CHANNEL = `${BASE_URL}/Master/GetMasterChannel`;
export const API_MASTER_ACTIVITY = `${BASE_URL}/Master/GetMasterActivity`;
export const API_MASTER_IMAGE = `${BASE_URL}/Master/GetMasterImage`;
export const API_MASTER_UNIT = `${BASE_URL}/Master/GetMasterUnit`;

//MASTER DATA
export const API_GET_CHANNEL_PERPAGE = `${BASE_URL}/Master/GetMasterChannelPerPage`;
export const API_CREATE_CHANNEL = `${BASE_URL}/Master/CreateMasterChannel`;
export const API_GET_ACTIVITY_PERPAGE = `${BASE_URL}/Master/GetMasterActivityPerPage`;
export const API_CREATE_ACTIVITY = `${BASE_URL}/Master/CreateMasterActivity`;
export const API_GET_IMAGE_PERPAGE = `${BASE_URL}/Master/GetMasterImagePerPage`;
export const API_CREATE_IMAGE = `${BASE_URL}/Master/CreateMasterImage`;
export const API_UPLOAD_IMAGE = `${BASE_URL}/Master/UploadImgMaster`;
export const URL_MASTER_IMAGE_TEMP = `${BASE_URL_IMAGE_TEMP}/lemon_ImageMapper/`;

//EVENT
export const API_GET_REFERENCES = `${BASE_URL}/Event/GetEventReference`;
export const API_GET_EVENT = `${BASE_URL}/Event/GetAll`;
export const API_GET_EVENT_PERPAGE = `${BASE_URL}/Event/GetEventPerPage`;
export const API_GET_EVENT_HEADER = `${BASE_URL}/Event/GetHeader?ID=`;
export const API_CREATE_EVENT = `${BASE_URL}/Event/CreateEvent`;
export const API_UPDATE_EVENT = `${BASE_URL}/Event/UpdateEvent`;
export const API_DELETE_EVENT = `${BASE_URL}/Event/deleteEvent?EventHeaderId=`;
export const API_PUBLISH_EVENT = `${BASE_URL}/Event/publishEvent?ID=`;

//WIFI
export const API_GET_WIFI = `${BASE_URL}/WifiGate/GetWifiListPerPage?Page=`;
export const API_GET_DETAIL_WIFI = `${BASE_URL}/WifiGate/GetWIFIGateDetail?id=`;
export const API_CREATE_WIFI = `${BASE_URL}/WifiGate/CreateWIFIGate`;
export const API_UPDATE_WIFI = `${BASE_URL}/WifiGate/UpdateWIFIGate`;

//WIFI LANDING
export const API_WIFI_LANDING_PAGE = `${BASE_URL}/WifiLandingPage/SubmitParticipant`;
export const API_BACKGROUND_WIFI_LANDING = `${BASE_URL}/WifiLandingPage/GetBackgroundImageForLandingPage`;

//LANDING
export const API_LANDING_PAGE = `${BASE_URL}/LandingPage/Insert`;
export const API_VALIDATE_LANDING = `${BASE_URL}/LandingPage/Validate`;

//Question
export const API_GET_QUESTION = `${BASE_URL}/Question/GetQuestionPerPage?Page=`;
export const API_POST_QUESTION = `${BASE_URL}/Question/CreateQuestion`;
export const API_GET_QUESTION_ALL = `${BASE_URL}/Question/GetAllQuestion`;
export const API_UPLOAD_IMAGE_QUESTION = `${BASE_URL}/Question/UploadQuestionImage`;
export const URL_IMAGE_TEMP_QUESTION = `${BASE_URL_IMAGE_TEMP}/lemon_QuestionImageTemp/`;
export const URL_IMAGE_QUESTION = `${BASE_URL_IMAGE_TEMP}/lemon_QuestionImage/`;
export const API_GET_QUESTION_BY_ID = `${BASE_URL}/Question/GetQuestionDetail?id=`;

//Survey
export const API_GET_SURVEY = `${BASE_URL}/Survei/GetSurveiListPerPage`;
export const API_POST_SURVEY = `${BASE_URL}/Survei/CreateSurvei`;
export const API_UPDATE_SURVEY = `${BASE_URL}/Survei/UpdateSurvei`;
export const API_DELETE_SURVEY = `${BASE_URL}/Survei/DeleteSurvei?id=`;
export const API_GET_SURVEY_BY_ID = `${BASE_URL}/Survei/GetSurveiById?id=`;
export const API_GET_WIFI_SURVEY = `${BASE_URL}/Survei/GetCurrentSurvei`;
export const API_SUBMIT_ANSWER_SURVEY = `${BASE_URL}/Question/SubmitAnswer`;

