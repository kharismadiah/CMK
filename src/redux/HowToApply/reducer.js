import * as types from "../types"

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    dataVideo:[{
        HowToApplyId: '',
        HowToApplyType: '',
        HowToApplyTitle: '',
        HowToApplyDesc: '',
        HowToApplyLink: '',
        IsVideoDefault: false,
    }],
    dataImage:{
        howToApplyId: '',
        isVideoDefault: false,
        HowToApplyTitle: '',
        HowToApplyList: [{
            HowToApplyImageId:'',
            HowToApplyType: '',
            HowToApplySubTitle: '',
            HowToApplyDesc: '',
            HowToApplyLink: '',
        }]
    },
    formVideo:{
        id: '',
        sectionTitle: '',
        sectionDescription: '',
        youtubeLink: '',
        setDefault: false
    },
    formImage:{
        id: '',
        sectionTitle: '',
        setDefault: false,
        form: [
            {
                id: '',
                image: '',
                imageUrl: '',
                imageName: '',
                sectionSubtitle: '',
                sectionDescription: ''
            }
        ]
    }
}

export default function HowToApply(state = initState, action){
    switch(action.type){
        case types.HOW_TO_APPLY_SET_LOADER: {
            return{
                ...state,
                isLoading: action.value
            }
        }
        case types.HOW_TO_APPLY_HANDLE_STATE:{
            return{
                ...state,
                [action.property]: action.value
            }
        }
        case types.HOW_TO_APPLY_HANDLE_STATE_FORM:{
            return{
                ...state,
                [action.property]:{
                    ...state[action.property],
                    [action.subProperty]: action.value
                }
            }
        }
        case types.HOW_TO_APPLY_FETCH_MAINTAIN_SUCCESS:{
            return{
                ...state,
                [action.property]: action.value
            }
        }
        case types.HOW_TO_APPLY_GET_DETAIL_VIDEO_SUCCESS:{
            return{
                ...state,
                formVideo: {
                    ...action.value
                }
            }
        }
        case types.HOW_TO_APPLY_GET_DETAIL_IMAGE_SUCCESS:{
            return{
                ...state,
                [action.property]:{
                    ...state[action.property],
                    [action.subProperty]: action.value
                }
            }
        }
        case types.HOW_TO_APPLY_INIT_STATE:{
            return{
                ...state,
                dataVideo:{
                    ...initState.dataVideo
                },
                dataImage:{
                    ...initState.dataImage
                },
                formVideo:{
                    ...initState.formVideo
                },
                formImage:{
                    ...initState.formImage
                }
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}