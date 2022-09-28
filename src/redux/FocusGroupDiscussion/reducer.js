import * as types from "../types";

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    sort: {
        visible: false,
        sortType: 1,
        valueSort: 1,
    },
    filter: {
        visible: false,
        search: '',
        major: [
            {
                name: 'major 1',
                selected: false
            },
            {
                name: 'major 2',
                selected: false
            },
            {
                name: 'major 3',
                selected: false
            },
            {
                name: 'major 4',
                selected: false
            },
            {
                name: 'major 5',
                selected: false
            }
        ],
        pengalaman: [
            {
                name: '0-2',
                jumlah: '(7)',
                selected: false
            },
            {
                name: '2-4',
                jumlah: '(21)',
                selected: false
            },
            {
                name: '4-8',
                jumlah: '(14)',
                selected: false
            },
            {
                name: '>8',
                jumlah: '(2)',
                selected: false
            },
        ],
        reference: [
            {
                name: 'Referensi',
                selected: false
            },
            {
                name: 'Tidak Referensi',
                selected: false
            },
        ],
        universitas: [
            {
                name: 'Universitas 1',
                selected: false
            },
            {
                name: 'Universitas 2',
                selected: false
            },
            {
                name: 'Universitas 3',
                selected: false
            },
            {
                name: 'Universitas 4',
                selected: false
            },
            {
                name: 'Universitas 5',
                selected: false
            }
        ],
        status: [
            {
                name: 'Cancel',
                selected: false
            },
            {
                name: 'Failed',
                selected: false
            },
        ]
    },
    formList: {
        totalApplicant: 120,
        current: 4,
        total: 50,
        searchList: '',
        listData: [
            {
                img: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg',
                nama: 'Kevin Romeo',
                alamat: 'jakarta',
                umur: '25 Tahun',
                time: '1 Menit',
                kampus: 'Universitas Brawijaya - IT',
                gpa: 'GPA 3.52',
                date: 'Lorem Ipsum is simply dummy text',
                status: 'Lorem Ipsum is simply dummy text',
                resume: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
                table: [
                    {
                        name: 'nama',
                        title: 'title',
                        company: 'company',
                        phone: '08394'
                    }
                ],
                checked: false
            },
            {
                img: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg',
                nama: 'Erik',
                alamat: 'jakarta',
                umur: '25 Tahun',
                time: '1 Menit',
                kampus: 'Universitas Brawijaya - IT',
                gpa: 'GPA 3.52',
                date: 'Lorem Ipsum is simply dummy text',
                status: 'Lorem Ipsum is simply dummy text',
                resume: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
                table: [
                    {
                        name: 'nama',
                        title: 'title',
                        company: 'company',
                        phone: '08394'
                    }
                ],
                checked: true
            }
        ],

    },
    modalDetail: {
        visible: false,
        name: 'kevin romeo',
        company: 'astra',
        title: 'dept',
        phone: 'div',
        sourceTable: []
    },
    modalAction: {
        visible: false,
        checked: false,
    },
    modalEmail: {
        visible: false,
        subject: '',
        body: '',
        signature: ''
    },
    modalPool: {
        visible: false,
        date: false,
    },
    modalPsychologicalTest: {
        visible: false,
        tglTest: null,
        hasilTest: 1,
        notesPsychological: '',
        uploadFileName: ''
    },
    resultPsychologicalTest: {
        // dummy data
        tglTest: '23/02/2020',
        hasilTest: 'Pass',
        notes: 'Ini adalah catatan dari user terhadap kandidat ketika melakukan psychological test'
    }
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.PSYCHOLOGICAL_TEST_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_SORT: {
            return {
                ...state,
                sort: {
                    ...state.sort,
                    [action.property]: action.value
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_FILTER: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.property]: action.value
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_LIST_DATA: {
            return {
                ...state,
                formList: {
                    ...state.formList,
                    [action.property]: action.value
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_MODAL_DETAIL: {
            return {
                ...state,
                modalDetail: {
                    ...state.modalDetail,
                    [action.property]: action.value
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_MODAL_DETAIL_PARAM: {
            return {
                ...state,
                modalDetail: {
                    ...state.modalDetail,
                    ...action.data
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_MODAL_EMAIL: {
            return {
                ...state,
                modalEmail: {
                    ...state.modalEmail,
                    [action.property]: action.value
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_MODAL_ACTION: {
            return {
                ...state,
                modalAction: {
                    ...state.modalAction,
                    [action.property]: action.value
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_MODAL_POOL: {
            return {
                ...state,
                modalPool: {
                    ...state.modalPool,
                    [action.property]: action.value
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_CREAR_STATE_MODAL_EMAIL: {
            return {
                ...state,
                modalEmail: {
                    ...initState.modalEmail
                }
            }
        }
        case types.PSYCHOLOGICAL_TEST_HANDLE_STATE_MODAL_PSYCHOLOGICAL_TEST: {
            return {
                ...state,
                modalPsychologicalTest: {
                    ...state.modalPsychologicalTest,
                    [action.property]: action.value
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}  