import { SET_LOADER, HANDLE_STATE_DEMO } from './../../constants/ActionType'
import moment from 'moment'

const initState = {
    loader: false,
    form: {
        valueDDL: undefined,
        switch: false,
        inputField: '',
        textAreaField: '',
        inputNumber: undefined,
        datePicker: moment()
    },
    dataGrid: [
        {
            id: 1,
            name: 'Tes 1',
            value: 'Tes 1'
        },
        {
            id: 2,
            name: 'Tes 2',
            value: 'Tes 2'
        }
    ],
    dataDDL: [
        {
            id: 1,
            name: 'Tes 1',
            value: 'Tes 1'
        },
        {
            id: 2,
            name: 'Tes 2',
            value: 'Tes 2'
        }
    ]
}

const globalComponentReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state, loader: action.value
            }
        case HANDLE_STATE_DEMO:
            return {
                ...state, form: { ...state.form, [action.field]: action.value }
            }
        default:
            return state;
    }
}

export default globalComponentReducer