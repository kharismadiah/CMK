'use strict';
import Endpoint from './endpoint';
const POST_TOKEN_QA = 'https://hrappsdev.astra.co.id/astrahrportalauthwebapi/api/Login?login=true'
const POST_TOKEN_UTT = 'https://hrappsstg.astra.co.id/astrahrportalauthwebapi/api/Login?login=true'
const POST_TOKEN_PRD = 'https://hrapps.astra.co.id/astrahrportalauthwebapi/api/Login?login=true'

const API_VACANCY_QA = 'https://hrappsdev.astra.co.id/newarswebapi/api/v2/Vacancy/'
const API_VACANCY_UTT = 'https://hrappsstg.astra.co.id/newarswebapi/api/v2/Vacancy/'
const API_VACANCY_PRD = 'https://hrapps.astra.co.id/newarswebapi/api/v2/Vacancy/'

const API_ASSIGNMENT_QA = 'https://hrappsdev.astra.co.id/newarswebapi/api/v2/ptkassignment/'
const API_ASSIGNMENT_UTT = 'https://hrappsstg.astra.co.id/newarswebapi/api/v2/ptkassignment/'
const API_ASSIGNMENT_PRD = 'https://hrapps.astra.co.id/newarswebapi/api/v2/ptkassignment/'


const API_USER_QA = 'https://devproxy.astra.co.id/astrahrportalwebapi_dev/api/UserProfileAirsys/'
const API_USER_UTT = 'https://devproxy.astra.co.id/astrahrportalwebapi_stg/api/UserProfileAirsys/'
const API_USER_PRD = 'https://astraapps.astra.co.id/ahshrportalwebapi/api/UserProfileAirsys/'

const API_EMAIL_QA = 'https://hrappsdev.astra.co.id/newarswebapi/api/v2/emailConfiguration/'
const API_EMAIL_UTT = 'https://hrappsstg.astra.co.id/newarswebapi/api/v2/emailConfiguration/'
const API_EMAIL_PRD = 'https://hrapps.astra.co.id/newarswebapi/api/v2/emailConfiguration/'

const API_MASTERDATA_QA = 'https://hrappsdev.astra.co.id/newarswebapi/api/v2/masterdata'
const API_MASTERDATA_UTT = 'https://hrappsstg.astra.co.id/newarswebapi/api/v2/masterdata'
const API_MASTERDATA_PRD = 'https://hrapps.astra.co.id/newarswebapi/api/v2/masterdata'

const API_EVENT_QA = 'https://hrappsdev.astra.co.id/newarswebapi/api/v2/event/'
const API_EVENT_UTT = 'https://hrappsstg.astra.co.id/newarswebapi/api/v2/event/'
const API_EVENT_PRD = 'https://hrapps.astra.co.id/newarswebapi/api/v2/event/'

const API_NEWARSWEBAPI_QA = 'https://hrappsdev.astra.co.id/newarswebapi/'
const API_NEWARSWEBAPI_UTT = 'https://hrappsdev.astra.co.id/newarswebapi/'
const API_NEWARSWEBAPI_PRD = 'https://hrappsdev.astra.co.id/newarswebapi/'

const API_DOMAIN_QA = 'https://a2000mobilecmsapi.azurewebsites.net/'
const API_DOMAIN_UTT = 'https://devproxy.astra.co.id/api2wdealer-qa/api/Master'
const API_DOMAIN_PRD = 'https://devproxy.astra.co.id/api2wdealer-qa/api/Master'

const API_SERVICE_QA = 'https://a2000mobilecmsapi.azurewebsites.net'
const API_SERVICE_UTT = 'https://a2000mobilecmsapi-stg.azurewebsites.net'
const API_SERVICE_PRD = 'https://newcmsauto2000mobile.azurewebsites.net'

const CLIENT_TAG_QA = "00A3AC68-2B64-4294-939A-EA4594AE837B"
const CLIENT_TAG_UTT = "9E4D8DB3-BBF9-403B-9B87-5DDC4F7122B7"
const CLIENT_TAG_PRD = "EFA40564-E409-4F48-80D3-CC60966698F2"

const APPLICATION_CODE_QA = "1F664BA0-B8AF-4520-917F-95CD871F4AE1"
const APPLICATION_CODE_UTT = "250C10A5-A4D9-406F-9853-58001A474714"
const APPLICATION_CODE_PRD = "BBB36F59-EBC0-46B7-AA32-77CD1DE7EC7F"

const CLIENT_ID_QA = "15BAB838-9314-46D9-A678-B79733721003"
const CLIENT_ID_UTT = "25A68964-00A4-46F3-9E80-5BFCDB28D922"
const CLIENT_ID_PRD = "CFC10F83-1353-470F-90A7-62E4B1E341E4"

const CLIENT_SECRET_QA = "H7H4okWlYInxigZIYOauajwJIvtKdW4XEZcAzQ9LhpE="
const CLIENT_SECRET_UTT = "H7H4okWlYInxigZIYOauajwJIvtKdW4XEZcAzQ9LhpE="
const CLIENT_SECRET_PRD = "H7H4okWlYInxigZIYOauajwJIvtKdW4XEZcAzQ9LhpE="

const BASE_URL_QA = "https://hrappsdev.astra.co.id/newarswebapi/"
const BASE_URL_UTT = "https://hrappsstg.astra.co.id/newarswebapi/"
const BASE_URL_PROD = "https://hrapps.astra.co.id/newarswebapi/"

const BASE_URL_QA_ASTRA_CAREER = "https://astracareerdevapi.azurewebsites.net/"
const BASE_URL_STG_ASTRA_CAREER = "https://careerservicestg.astra.co.id/"
const BASE_URL_PROD_ASTRA_CAREER = 'https://careerservice.astra.co.id/'

const CAPTCHA_KEY_QA = "6LehNvQUAAAAAC63poEPifanYuT9rUK4-_EemYwv"
const CAPTCHA_KEY_UTT = "6LehNvQUAAAAAC63poEPifanYuT9rUK4-_EemYwv"
const CAPTCHA_KEY_PROD = "6Lf8jcYZAAAAAKe9xuOlEQrowGqqXDrEmNSy8be3"

const PUB_KEY = "-----BEGIN PUBLIC KEY-----MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB0cAUXx1O0EySTUcWdXUl0rO/HmKxM5DcmtRwuD9bVYsVYNT4bancz8W604CkNHnDP1RMLPPfpWvFqvF46tUc6813BvcOwQAEANILBu1zKFyGR/GOGkvVTONxznoLbIHMwBPtriKGWba2FHX0Ss/c7aVJ3jsE9ZNnY8DLJr25XQc9lhfjkWh9eUnGjE8PfDrk1cbDD4L7XvlPjwAkQn4P70haaNeuWHSAaySb6ZMNeFzvLfbk6p9zid/c5PDJZ4TRFhuYdNOPvexF6k470M3pIsWJo/fru+3ehOTfHVbM8GTZewVCP7T0rdY/8njJgdaHngG0kkq4/5JALOOkk5m3NAgMBAAE=-----END PUBLIC KEY-----"

let API_DOMAIN, API_SERVICE, CLIENT_TAG, APPLICATION_CODE, CLIENT_ID, CLIENT_SECRET, HEADERS, API_VACANCY, API_ASSIGNMENT, API_USER, API_EVENT, POST_TOKEN, API_EMAIL, API_MASTERDATA, API_NEWARSWEBAPI, BASE_URL, CAPTCHA_KEY, BASE_URL_ASTRA_CAREER = null;
// console.log(process.env)
if (process.env.API_ENV == 'production' || process.env.API_ENV == 'PROD') {
    CLIENT_ID = CLIENT_ID_PRD
    CLIENT_SECRET = CLIENT_SECRET_PRD
    API_DOMAIN = API_DOMAIN_PRD
    API_SERVICE = API_SERVICE_PRD
    CLIENT_TAG = CLIENT_TAG_PRD
    APPLICATION_CODE = APPLICATION_CODE_PRD

    API_VACANCY = API_VACANCY_PRD
    API_USER = API_USER_PRD
    POST_TOKEN = POST_TOKEN_PRD
    API_ASSIGNMENT = API_ASSIGNMENT_PRD
    API_EVENT = API_EVENT_PRD
    API_EMAIL = API_EMAIL_PRD
    API_MASTERDATA = API_MASTERDATA_PRD
    API_NEWARSWEBAPI = API_NEWARSWEBAPI_PRD
    BASE_URL = BASE_URL_PROD
    BASE_URL_ASTRA_CAREER = BASE_URL_PROD_ASTRA_CAREER
    CAPTCHA_KEY = CAPTCHA_KEY_PROD
}
else if (process.env.API_ENV == 'stagging' || process.env.API_ENV == 'UTT') {
    CLIENT_ID = CLIENT_ID_UTT
    CLIENT_SECRET = CLIENT_SECRET_UTT
    API_DOMAIN = API_DOMAIN_UTT
    API_SERVICE = API_SERVICE_UTT
    CLIENT_TAG = CLIENT_TAG_UTT
    APPLICATION_CODE = APPLICATION_CODE_UTT
    API_VACANCY = API_VACANCY_UTT
    API_USER = API_USER_UTT
    POST_TOKEN = POST_TOKEN_UTT
    API_ASSIGNMENT = API_ASSIGNMENT_UTT
    API_EVENT = API_EVENT_UTT
    API_EMAIL = API_EMAIL_UTT
    API_MASTERDATA = API_MASTERDATA_UTT
    API_NEWARSWEBAPI = API_NEWARSWEBAPI_UTT
    BASE_URL = BASE_URL_UTT
    BASE_URL_ASTRA_CAREER = BASE_URL_STG_ASTRA_CAREER
    CAPTCHA_KEY = CAPTCHA_KEY_UTT
}
else if (process.env.API_ENV == 'development' || process.env.API_ENV == 'DEVELOPMENT' || process.env.API_ENV == 'QA') {
    CLIENT_ID = CLIENT_ID_QA
    CLIENT_SECRET = CLIENT_SECRET_QA
    API_DOMAIN = API_DOMAIN_QA
    API_SERVICE = API_SERVICE_QA
    CLIENT_TAG = CLIENT_TAG_QA
    APPLICATION_CODE = APPLICATION_CODE_QA
    API_VACANCY = API_VACANCY_QA
    API_USER = API_USER_QA
    POST_TOKEN = POST_TOKEN_QA
    API_ASSIGNMENT = API_ASSIGNMENT_QA
    API_EVENT = API_EVENT_QA
    API_EMAIL = API_EMAIL_QA
    API_MASTERDATA = API_MASTERDATA_QA
    API_NEWARSWEBAPI = API_NEWARSWEBAPI_QA
    BASE_URL = BASE_URL_QA
    BASE_URL_ASTRA_CAREER = BASE_URL_QA_ASTRA_CAREER
    CAPTCHA_KEY = CAPTCHA_KEY_QA
}

const Config = {
    CLIENT_ID: CLIENT_ID,
    CLIENT_SECRET: CLIENT_SECRET,
    CLIENT_TAG: CLIENT_TAG,
    APPLICATION_CODE: APPLICATION_CODE,
    API_DOMAIN: API_DOMAIN,
    API_SERVICE: API_SERVICE,
    PUB_KEY: PUB_KEY,
    API_VACANCY: API_VACANCY,
    API_USER: API_USER,
    POST_TOKEN: POST_TOKEN,
    API_VACANCY_LIST: API_VACANCY_QA + Endpoint.ACTIVE_VACANCY_LIST,
    API_ASSIGNMENT: API_ASSIGNMENT,
    API_EVENT: API_EVENT,
    API_EMAIL: API_EMAIL,
    API_MASTERDATA: API_MASTERDATA,
    API_NEWARSWEBAPI: API_NEWARSWEBAPI,
    BASE_URL: BASE_URL,
    BASE_URL_ASTRA_CAREER: BASE_URL_ASTRA_CAREER,
    CAPTCHA_KEY: CAPTCHA_KEY
}

export default Config;
