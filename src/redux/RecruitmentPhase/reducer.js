import * as types from '../types'
import moment from 'moment'
import actions from '../auth/actions'

const initState = {
    isLoading: false,
    pageNo: 1,
    pageSize: 10,
    totalRows: 10,
    cbtType: '',
    defaultTab: '1',
    sort: {
        visible: false,
        sortType: 0,
        valueSort: '',
        listSort: []
    },
    filter: {
        visible: false,
        search: '',
        major: [],
        pengalaman: [],
        reference: [],
        universitas: [],
        status: [],
        branch: [],
        company: [],
        event: [],
        groupEvent: [],
        vacancyStatus: [],
        gpaMin: null,
        gpaMax: null,
        onlineTestResult: [],
        autogeneralfilterstatuslist: [],
        olResultStatusList: [],
        yoeYearFrom: '',
        yoeMonthFrom: '',
        yoeYearTo: '',
        yoeMonthTo: '',
        emailStatusList: []
    },
    formList: {
        vacancyId: null,
        atsPhaseId: null,
        totalApplicant: 0,
        date: null,
        searchList: '',
        IsEnableNotifyHR: false,
        listData: []
    },
    modal: {
        visible: false,
        PersonalData: {
            Address: '',
            Age: '',
            ApplicantId: '',
            ApplicantName: '',
            ApplicationId: '',
            CVUrl: '',
            GPA: '',
            MajorName: '',
            ProfilePicUrl: '',
            UniversityName: '',
            Gender: null,
            BirthDate: '',
            Email: '',
            PhoneNumber: '',
            YearsOfExperience: '',
            CurrentDomicile: '',
            EducationDetail: [],
            OrganizationDetail: [],
            JobExperienceDetail: []
        },
        Reference: [],
        OnlineTest: {
            TestDate: '',
            TestResult: '',
            Notes: '',
            TestResultLink: '',
            CutOffCode: '',
            CutOffName: '',
            TestTool: ''
        },
        Fgd: {
            TestDate: '',
            TestResult: '',
            Notes: '',
            TestResultLink: ''
        },
        PsycologicalTest: {
            TestDate: '',
            TestResult: '',
            Notes: '',
            TestResultLink: ''
        },
        Interview: {
            NamaCalon: '',
            NamaPosition: '',
            Department: '',
            CompanyList: [],
            interviewCompanyId: null,
            interviewer: '',
            interviewerJobPosition: '',
            interviewDate: '',
            result: '',
            kesimpulan: '',
            golonganApl: '',
            golonganNum: '',
            kompetensiTeknikalInter: '',
            kompetensiNonTeknikalInter: '',
            kompetensiTeknikalArea: '',
            kompetensiNonTeknikalArea: '',
            notes: '',
            uploadFile: {
                name: ''
            },
            uploadFileName: '',
            company: ''
        }
    },
    source: {
        Branch: [],
        Domicile: [],
        PlaceOfBirth: [],
        kewarganegaraan: [
            {
                id: 'Indonesia',
                name: 'Indonesia'
            },
            {
                id: 'Asing',
                name: 'Asing'
            }
        ],
        Degree: [],
        Institute: [],
        City: [],
        Major: [],
        Function: [],
        PositionType: [],
        OrganizationScope: [],
        OrganizationTitle: [],
        PositionTitle: [],
        Industry: [],
        JobTitle: [],
        JobFunction: [],
        Company: [],
        FamilyStructure: [],
        FamilyStatus: [],
        FamilyTitle: [],
        // Structure: [
        //     {
        //         id: 1,
        //         name: 'Father'
        //     },
        //     {
        //         id: 2,
        //         name: 'Mother'
        //     },
        //     {
        //         id: 3,
        //         name: 'Child 1'
        //     },
        //     {
        //         id: 4,
        //         name: 'Child 2'
        //     },
        //     {
        //         id: 5,
        //         name: 'Child 3'
        //     },
        //     {
        //         id: 6,
        //         name: 'Child 4'
        //     },
        //     {
        //         id: 7,
        //         name: 'Child 5'
        //     },
        //     {
        //         id: 8,
        //         name: 'Child 6'
        //     },
        // ],
        // StructureSpouse: [
        //     { id: "1", name: 'Spouse' },
        //     { id: "2", name: 'Child 1' },
        //     { id: "3", name: 'Child 2' },
        //     { id: "4", name: 'Child 3' },
        //     { id: "5", name: 'Child 4' },
        // ],
        Salary: [],

        //Pro hire
        Occupation: [],
        dataHobby: [
            { hobby: 'hobby1', hobbyName: 'Membaca Fiksi' },
            { hobby: 'hobby2', hobbyName: 'Membaca Non-Fiksi' },
            { hobby: 'hobby3', hobbyName: 'Membaca Koran/Artikel Berita' },
            {
                hobby: 'hobby4',
                hobbyName: 'Kegiatan Investasi (Contoh: trading saham, komoditas, valas, dll.)'
            },
            {
                hobby: 'hobby5',
                hobbyName: 'Menulis (Contoh: cerpen, buku, artikel. dll.)'
            },
            { hobby: 'hobby6', hobbyName: 'Menggambar/Melukis' },
            { hobby: 'hobby7', hobbyName: 'Bermain Musik' },
            { hobby: 'hobby8', hobbyName: 'Bernyanyi' },
            {
                hobby: 'hobby9',
                hobbyName:
                    'Olahraga Kompetitif (Fokus untuk memang, contoh: sepakbola, bulu tangkis, basket, catur, dll.)'
            },
            {
                hobby: 'hobby10',
                hobbyName:
                    'Olahraga Non-Kompetitif (Fokus kesenangan/kebugaran/pengingkatan kesehatan, contoh: yoga, jogging, pilates, aerobik, dll.)'
            }
        ],
        dataActivityPriority: [
            {
                activity: 'activityPriority1',
                activityName:
                    'Kegiatan mengerjakan sesuatu dengan tangan atau alat-alat mekanis secara terampil, seperti kegiatan yang memanfaatkan keterampilan tangan (menjahit, menenun, membuat kue, dll.), bidang mekanik, pertanian, listrik, serta teknik'
            },
            {
                activity: 'activityPriority2',
                activityName:
                    'Kegiatan yang melibatkan pengamatan terhadap gejalan fisik, biologis, serta budaya, seperti penelitian dan segala hal yang berbau ilmiah'
            },
            {
                activity: 'activityPriority3',
                activityName:
                    'Kegiatan yang memanfaatkan kreativitas dan imajinasi untuk menciptakan bentuk atau produk seni, seperti pekerja seni (seniman)'
            },
            {
                activity: 'activityPriority4',
                activityName:
                    'Kegiatan menginformasikan, melatih, mengembangkan, menyembuhkan, atau mencerahkan orang lain, seperti membantu atau mengajar orang lain (melayani orang lain)'
            },
            {
                activity: 'activityPriority5',
                activityName:
                    'Kegiatan yang menuntut kemampuan untuk memepengaruhi orang lain dalam rangka mencapai tujuan organisasi atau mendapatkan manfaat ekonomis, seperti menjual atau mengelola orang lain'
            },
            {
                activity: 'activityPriority6',
                activityName:
                    'Kegiatan yang melibatkan pemanfaatan data yang konkret, teratur, dan sistematis, seperti pencatatan, perhitungan, sistem bisnis, serta klerikal'
            }
        ],
        dataJobPriority: [
            { job: 'jobPriority1', jobName: 'Coorporate Communication' },
            { job: 'jobPriority2', jobName: 'Finance, Accounting, Tax' },
            { job: 'jobPriority3', jobName: 'Human Capital (HC)' },
            { job: 'jobPriority4', jobName: 'Information Technology (IT)' },
            { job: 'jobPriority5', jobName: 'Audit & Risk Management' },
            { job: 'jobPriority6', jobName: 'Legal' },
            { job: 'jobPriority7', jobName: 'Logistic/Supply Chain' },
            { job: 'jobPriority8', jobName: 'Marketing' },
            { job: 'jobPriority9', jobName: 'Production & Engineering' },
            { job: 'jobPriority10', jobName: 'Sales' },
            { job: 'jobPriority11', jobName: 'Security & Task Force' },
            {
                job: 'jobPriority12',
                jobName: 'Strategic Planning & Business Development'
            },
            { job: 'jobPriority13', jobName: 'Data & Statistics' },
            { job: 'jobPriority14', jobName: '' }
        ],
        dataFacility: [
            { facility: 'facility1', facilityName: 'Makanan & Minuman' },
            {
                facility: 'facility2',
                facilityName: 'Kendaraan Operasional (CPO/Pinjem)'
            },
            { facility: 'facility3', facilityName: 'Asuransi Kesehatan' },
            { facility: 'facility4', facilityName: 'Asuransi Jiwa' },
            { facility: 'facility5', facilityName: 'Dana Pensiun' },
            { facility: 'facility6', facilityName: 'Insentif/Bonus' },
            { facility: 'facility7', facilityName: 'Kebugaran (gym)' },
            {
                facility: 'facility8',
                facilityName: 'Transportasi (Co: bensin, parkir, tol, dll.)'
            },
            { facility: 'facility9', facilityName: 'Tunjangan Hari Raya (THR)' },
            { facility: 'facility10', facilityName: 'Pelatihan' },
            { facility: 'facility11', facilityName: 'Tunjangan Jabatan' },
            { facility: 'facility12', facilityName: 'Tunjangan Cuti' },
            {
                facility: 'facility13',
                facilityName: 'Tunjangan lembur (Co: transportasi, makanan & minuman, dll.)'
            },
            {
                facility: 'facility14',
                facilityName: 'Program pinjaman/pembiayaan (rumah, pendidikan, kendaraan pribadi, ibadah, dll.)'
            },
            { facility: 'facility15', facilityName: 'Tunjangan perjalanan dinas' },
            {
                facility: 'facility16',
                facilityName: 'Tunjangan telekomunikasi (Co: pulsa, kuota, internet, dll.)'
            }
        ]
    },
    modalEmailHiringManager: {
        visible: false,
        EmailConfigId: null,
        subject: '',
        body: '',
        signature: '',
        date: moment()
    },
    Interview: {
        NamaCalon: '',
        NamaPosition: '',
        Department: '',
        CompanyList: [],
        interviewCompanyId: null,
        interviewer: '',
        interviewerJobPosition: '',
        interviewDate: '',
        result: '',
        kesimpulan: '',
        golonganApl: '',
        golonganNum: '',
        kompetensiTeknikalInter: '',
        kompetensiNonTeknikalInter: '',
        kompetensiTeknikalArea: '',
        kompetensiNonTeknikalArea: '',
        notes: '',
        uploadFile: {
            name: ''
        },
        uploadFileName: '',
        company: ''
    },
    modalEmail: {
        visible: false,
        EmailConfigId: null,
        subject: '',
        body: '',
        signature: ''
    },
    modalEmailDate: {
        visible: false,
        EmailConfigId: null,
        subject: '',
        body: '',
        signature: ''
    },
    modalPool: {
        visible: false,
        date: moment()
    },
    modalAction: {
        visible: false,
        actionName: '',
        checked: false
    },
    modalCustomAction: {
        visible: false,
        actionName: ''
    },
    modalOnlineTest: {
        visible: false,
        ApplicationId: null,
        ApplicantID: null,
        tglTest: moment(),
        hasilTest: 1,
        testTool: '',
        cutOffCode: '',
        cutOffName: '',
        notesOnline: '',
        uploadFile: ''
    },
    modalCancelCandidate: {
        visible: false,
        date: moment(),
        isHire: false
    },
    modalPsychological: {
        visible: false,
        ApplicationId: null,
        tglTest: moment(),
        hasilTest: 1,
        notesOnline: '',
        uploadFile: '',
        cutOffCode: '',
        cutOffName: '',
        testTool: ''
    },
    modalPsychologicalCBT: {
        visible: false,
        ApplicationId: null,
        tglTest: moment(),
        hasilTest: 1,
        notesOnline: '',

        eventName: '',
        vacancyTitle: '',
        position: '',
        company: '',
        uploadFile: '',
        uploadResult: []
    },
    modalInvitationInterview: {
        visible: false,
        EmailConfigId: null,
        subject: '',
        body: '',
        signature: ''
    },
    modalEditInterview: {
        visible: false,
        id: '',
        interviewCompanyId: '',
        actionName: '',
        NamaCalon: '',
        NamaPosition: '',
        interviewer: '',
        Department: '',
        interviewerJobPosition: '',
        interviewDate: ''
    },
    reference: {
        referenceName: '',
        referenceTitle: '',
        referenceCompany: '',
        ReferencePhone: '',
        sourceTable: []
    },
    FLK: {
        applicantID: '',
        visible: true,
        //page 1 - fresh grad
        photoUrl: '',
        Photo: '',
        namaLengkap: '',
        tempatLahir: '',
        tempatLahirOther: '',
        tanggalLahir: '',
        kewarganegaraan: '',
        kewarganegaraanOthers: '',
        alamatLengkap: '',
        noHP1: '',
        noHP2: '',
        telpRumahCode: '',
        telpRumah: '',
        email: '',
        workExperienceCategory: '',

        tablePendidikan: [],
        judulSkripsi: '',
        tautanSkripsi: '',
        publikasi: 'Jurnal',
        judulPublikasi: '',
        tautanPublikasi: '',

        tablePelatihan: [],
        tableOrganisasi: [],

        //page2 - fresh grad
        statusPernikahan: 'lajang',
        sejakTahun: '',
        anakKe: '',
        jumlahSaudara: '',
        namaAyah: '',
        usiaAyah: '',
        pendidikanTerakhirAyah: '',
        pekerjaanAyah: '',
        titleAyah: '',
        namaIbu: '',
        usiaIbu: '',
        pendidikanTerakhirIbu: '',
        pekerjaanIbu: '',
        titleIbu: '',
        tableFamily: [],

        tableMagang: [],
        tableJobExperience: [],

        problemSituasi: '',
        problemTugas: '',
        problemTindakan: '',
        problemHasil: '',
        obstacleSituasi: '',
        obstacleTugas: '',
        obstacleTindakan: '',
        obstacleHasil: '',

        //page3 - freshgrad
        hobby1: { HobbyId: '', HobbyName: 'Membaca Fiksi', value: false },
        hobby2: { HobbyId: '', HobbyName: 'Membaca Non-Fiksi', value: false },
        hobby3: {
            HobbyId: '',
            HobbyName: 'Membaca Koran/Artikel Berita',
            value: false
        },
        hobby4: { HobbyId: '', HobbyName: 'Kegiatan Investasi', value: false },
        hobby5: { HobbyId: '', HobbyName: 'Menulis', value: false },
        hobby6: { HobbyId: '', HobbyName: 'Menggambar/Melukis', value: false },
        hobby7: { HobbyId: '', HobbyName: 'Bermain Musik', value: false },
        hobby8: { HobbyId: '', HobbyName: 'Bernyanyi', value: false },
        hobby9: { HobbyId: '', HobbyName: 'Olahraga Kompetitif', value: false },
        hobby10: {
            HobbyId: '',
            HobbyName: 'Olahraga Non-Kompetitif',
            value: false
        },
        hobbyList: [],

        socialActivity1: {
            ActivityId: '',
            ActivityName: 'Menghadiri komunikasi sosial',
            value: false
        },
        socialActivity2: {
            ActivityId: '',
            ActivityName: 'Menghadiri komunitas yang berkaitan dengan hobi (klub)',
            value: false
        },
        socialActivity3: {
            ActivityId: '',
            ActivityName: 'Mengikuti aktivitas sukarela (voulenteering)',
            value: false
        },
        socialActivity4: {
            ActivityId: '',
            ActivityName: 'Mengunjungi museum/pameran/pertunjukan',
            value: false
        },
        socialActivity5: {
            ActivityId: '',
            ActivityName: 'Melakukan aktivitas rekreasional (contoh: berbelanja, travelling, dll.)',
            value: false
        },
        socialActivity6: {
            ActivityId: '',
            ActivityName: 'Arisan dengan teman/kenalan',
            value: false
        },
        socialActivity7: {
            ActivityId: '',
            ActivityName: 'Menongkrong dengan teman/kenalan',
            value: false
        },
        socialActivity8: {
            ActivityId: '',
            ActivityName: 'Mengikuti kegiatan keagamaan',
            value: false
        },
        socialActivity9: {
            ActivityId: '',
            ActivityName: 'Menghadiri pesta',
            value: false
        },
        socialActivity10: { ActivityId: '', ActivityName: '', value: false },
        socialActivityOthers: '',
        salary: '',
        dateAvailable: '',
        placementAvailibility: 'Tidak Bersedia',
        city1: {
            CityId: '',
            CityName: 'Depok, Tangerang, Bekasi, Bogor',
            value: false
        },
        city2: {
            CityId: '',
            CityName: 'Pulau Jawa (Non-Jabodetabek)',
            value: false
        },
        city3: { CityId: '', CityName: 'Pulau Sumatera', value: false },
        city4: { CityId: '', CityName: 'Pulau Kalimantan', value: false },
        city5: { CityId: '', CityName: 'Pulau Sulawesi', value: false },
        city6: { CityId: '', CityName: 'Pulau Bali & Nusa Tenggara', value: false },
        city7: { CityId: '', CityName: 'Papua & Kepulauan Maluku', value: false },

        activityPriority1: false,
        activityPriority2: false,
        activityPriority3: false,
        activityPriority4: false,
        activityPriority5: false,
        activityPriority6: false,
        tableActivityPriority: [],

        jobPriority1: false,
        jobPriority2: false,
        jobPriority3: false,
        jobPriority4: false,
        jobPriority5: false,
        jobPriority6: false,
        jobPriority7: false,
        jobPriority8: false,
        jobPriority9: false,
        jobPriority10: false,
        jobPriority11: false,
        jobPriority12: false,
        jobPriority13: false,
        jobPriority14: false,
        tableActivityPriorityJob: [],

        jobPriorityOthers: '',
        tablePsychotest: [],
        psychotestDate: '',
        psychotestOrganizer: '',
        psychotestPurpose: '',

        facility1: false,
        facility2: false,
        facility3: false,
        facility4: false,
        facility5: false,
        facility6: false,
        facility7: false,
        facility8: false,
        facility9: false,
        facility10: false,
        facility11: false,
        facility12: false,
        facility13: false,
        facility14: false,
        facility15: false,
        facility16: false,
        facility17: false,
        facilityOthers: '',

        tableReference: []
    },
    dataCompanyList: [],
    dataInterviewSchedule: [],
    modalFailed1: {
        visible: false,
        feedback: '',
        IsInteviewResult: false,
        feedback1: '',
        personalReason: ''
    },
    modalFailed2: {
        visible: false,
        feedback: '',
        feedback2: ''
    },
    dataInterviewer: [],
    dataViewResult: [],
    isUser: false,
    isFailedCandidate: false,
    phaseId: 0,
    interviewType: {
        step: 1,
        interviewType: ''
    },
    tanggalSearch: moment(),
    modalPsychologicalTest: {
        visible: false,
        tglTest: moment(),
        hasilTest: 1,
        notesPsychological: '',
        uploadFileName: '',
        ApplicationId: '',
        notesOnline: '',
        uploadFile: ''
    },
    modalFGD: {
        visible: false,
        tglTest: moment(),
        hasilTest: 1,
        uploadFileName: '',
        ApplicationId: '',
        notesOnline: '',
        uploadFile: ''
    },
    isCBT: false,
    modalSwitch: {
        visible: false,
        actionName: ''
    },
    modalUploadTestResult: {
        visible: false,
        PhaseName: null,
        eventName: null,
        position: null,
        vacancyTitle: null,
        company: null,
        file: null,
        sourceTable: []
    },
    modalExtend: {
        visible: false,
        ApplicantId: '',
        VacancyId: ''
    },
    modalInterviewResult: {
        visible: false,
        actionName: '',
        checked: false,
        dataList: []
    },
    modalOfferingResult: {
        visible: false,
        actionName: '',
        checked: false,
        uploadFile: '',
        uploadFileName: '',
        urlPdf: '',
        ApplicantId: '',
        ApplicationId: ''
    },
    modalFailedOffering: {
        listFailedby: [],
        listFeedback: [],
        visible: false,
        actionName: '',
        checked: false,
        failedBy: '',
        perusahaan: [],
        reason: [],
        reqBody: '',
        mandatoryFeedback: false
    },
    modalDownloadBatchFLK: {
        visible: false,
        actionName: '',
        checked: false
    },
    HiddenfeatureRolebyAuth: {
        HiringManager: {
            Invited: {
                SendInvitation: true
            },
            GeneralFilter: {
                PassFail: true
            },
            ReviewCV: {
                NotifyHM: true
            },
            FLK: {
                PassFail: true,
                SendFLKLink: true,
                DatepickerSendInvt: true
            },
            OTNonAstra: {
                PassFail: true,
                CancelbyCandidate: true,
                SendInvitation: true,
                DownloadFileTemplate: true,
                UploadTestResult: true,
                UploadTestResultBatch: true
            },
            OT: {
                PassFail: true,
                CancelbyCandidate: true,
                DownloadFileTemplate: true,
                UploadTestResultBatch: true,
                UploadTestResult: true
            },
            PsychologicalTestNon: {
                PassFail: true,
                CancelbyCandidate: true,
                SendInvitation: true,
                DownloadFileTemplate: true,
                UploadTestResult: true,
                UploadTestResultBatch: true,
                MovetoCBT: true,
                DatepickerSendInvt: true
            },
            PsychologicalTestCBT: {
                PassFail: true,
                CancelbyCandidate: true,
                DownloadCandidate: true,
                UploadTestResult: true,
                UploadTestResultBatch: true,
                MovetoCBT: true,
                DownloadFileTemplate: true,
                DatepickerSendInvt: false
            },
            FGD: {
                PassFail: true,
                CancelbyCandidate: true,
                SendInvitation: true,
                DownloadCandidate: true,
                UploadTestResult: true,
                UploadTestResultBatch: true,
                DatepickerSendInvt: true,
                DownloadFileTemplate: true
            },
            InterviewHR: {
                PassFail: true,
                CancelbyCandidate: true,
                InterviewType: true,
                Failed: true
            },
            ReviewIR: {
                PassFail: false,
                NotifyHM: true
            },
            InterviewUser: {
                PassFail: true,
                CancelbyCandidate: true,
                Failed: true,
                InterviewType: true
            },
            Offering: {
                PassFail: true,
                Failed: true,
                CancelbyCandidate: true,
                AddEditOfferingResult: false
            }
        },
        HC: {
            Invited: {
                SendInvitation: true
            },
            GeneralFilter: {
                PassFail: true
            },
            ReviewCV: {
                PassFail: true,
                NotifyHM: true
            },
            FLK: {
                PassFail: true,
                SendFLKLink: true,
                DatepickerSendInvt: true
            },
            OTNonAstra: {
                PassFail: true,
                CancelbyCandidate: true,
                SendInvitation: true,
                DownloadFileTemplate: true,
                UploadTestResult: true,
                UploadTestResultBatch: true
            },
            OT: {
                PassFail: true,
                CancelbyCandidate: true,
                DownloadFileTemplate: true,
                UploadTestResultBatch: true,
                SendInvitation: false
            },
            PsychologicalTestNon: {
                PassFail: true,
                CancelbyCandidate: true,
                SendInvitation: true,
                DownloadFileTemplate: true,
                UploadTestResult: true,
                UploadTestResultBatch: true,
                MovetoCBT: true,
                DownloadCandidate: true,
                DatepickerSendInvt: true
            },
            PsychologicalTestCBT: {
                PassFail: true,
                CancelbyCandidate: true,
                DownloadCandidate: true,
                DownloadFileTemplate: true,
                UploadTestResult: true,
                MovetoCBT: true,
                SendInvitation: false,
                DatepickerSendInvt: true
            },
            FGD: {
                PassFail: true,
                CancelbyCandidate: true,
                SendInvitation: true,
                DownloadCandidate: true,
                UploadTestResult: true,
                UploadTestResultBatch: true,
                DatepickerSendInvt: true,
                DownloadFileTemplate: true
            },
            InterviewHR: {
                PassFail: true,
                CancelbyCandidate: true,
                InterviewType: false,
                Failed: true
            },
            InterviewUser: {
                PassFail: true,
                CancelbyCandidate: true,
                InterviewType: true,
                Failed: true
            },
            ReviewIR: {
                PassFail: true,
                NotifyHM: true
            }
        }
    },
    modalSelectEmailTemplate: {
        visible: false,
        emailTemplateList: [],
        emailTemplateTotalRows: 0,
        emailTemplateCurrentPage: 1,
        selectedEmailTemplateId: null,
        activity: '',
        action: ''
    },
    triggerList: [],
    activityList: [],
    applicantListToSendEmailInvitation: [],

    modalSelectEmailTemplateInterviewStep3: {
        visible:false
    },
    clearFlagModalFailedInterview: false
}
export default function(state = initState, action) {
    switch (action.type) {
        case types.RECRUITMENT_PR_SET_LOADER: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_GLOBAL: {
            return {
                ...state,
                [action.property]: action.value
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_SORT_PHASE: {
            return {
                ...state,
                sort: {
                    ...state.sort,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_FILTER_PHASE: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_LIST_PHASE: {
            return {
                ...state,
                formList: {
                    ...state.formList,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_MODAL_PHASE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_PHASE: {
            return {
                ...state,
                modalEmail: {
                    ...state.modalEmail,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_HIRING_MANAGER_PHASE: {
            return {
                ...state,
                modalEmailHiringManager: {
                    ...state.modalEmailHiringManager,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_MODAL_EMAIL_DATE_PHASE: {
            return {
                ...state,
                modalEmailDate: {
                    ...state.modalEmailDate,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_FILTER_PHASE_SUCCESS: {
            return {
                ...state,
                sort: {
                    ...state.sort,
                    ...action.data.sort
                },
                filter: {
                    ...state.filter,
                    ...action.data.filter
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_PAGINATION_PHASE: {
            return {
                ...state,
                pageNo: action.pageNo,
                pageSize: action.pageSize,
                totalRows: action.totalRows
            }
        }
        case types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PAHSE_SUCCESS: {
            return {
                ...state,
                modalEmail: {
                    ...state.modalEmail,
                    ...action.data,
                    subject: action.data.subject.replace(/(\r\n|\n|\r)/gm,"")
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_DATE_PAHSE_SUCCESS: {
            return {
                ...state,
                modalEmailDate: {
                    ...state.modalEmailDate,
                    ...action.data,
                    subject: action.data.subject.replace(/(\r\n|\n|\r)/gm,"")
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_REFERENCE_PAHSE: {
            return {
                ...state,
                reference: {
                    ...state.reference,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_INIT_STATE_REFERENCE_PAHSE: {
            return {
                ...state,
                reference: {
                    ...state.reference,
                    referenceName: '',
                    referenceTitle: '',
                    referenceCompany: '',
                    ReferencePhone: ''
                }
            }
        }
        case types.RECRUITMENT_PR_MASTER_DATA_SUCCESS_PAHSE: {
            return {
                ...state,
                source: {
                    ...state.source,
                    ...action.data
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_ACTION_PAHSE: {
            return {
                ...state,
                modalAction: {
                    ...state.modalAction,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_ACTION_DATA_PAHSE: {
            return {
                ...state,
                modalAction: {
                    ...state.modalAction,
                    ...action.data
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_POOL_PAHSE: {
            return {
                ...state,
                modalPool: {
                    ...state.modalPool,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_CANCEL_PAHSE: {
            return {
                ...state,
                modalCancelCandidate: {
                    ...state.modalCancelCandidate,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_OL_TEST_PAHSE: {
            return {
                ...state,
                modalOnlineTest: {
                    ...state.modalOnlineTest,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_FLK_PAHSE: {
            return {
                ...state,
                FLK: {
                    ...state.FLK,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_FORM2_PAHSE: {
            return {
                ...state,
                FLK: {
                    ...state.FLK,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_LIST_SUCCESS: {
            return {
                ...state,
                formList: {
                    ...state.formList,
                    vacancyId: action.data.vacancyId,
                    atsPhaseId: action.data.atsPhaseId,
                    totalApplicant: action.data.TotalApplicants,
                    listData: action.data.ApplicantList,
                    vacancyName: action.data.vacancyName,
                    PhaseName: action.data.PhaseName,
                    CompanyName: action.data.CompanyName,
                    IsEnableNotifyHR: action.data.IsEnableNotifyHR
                },
                modalUploadTestResult: {
                    ...action.data.modalUploadTestResult
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_DETAILS_OFFERING_SUCCESS: {
            return {
                ...state,
                modalOfferingResult: {
                    ...state.modalOfferingResult,
                    uploadFileName: action.data.uploadFileName,
                    urlPdf: action.data.urlPdf
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_DETAIL_PAHSE_SUCCESS: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    PersonalData: {
                        ...state.modal.PersonalData,
                        ...action.data.PersonalData
                    },
                    Reference: action.data.Reference,
                    OnlineTest: action.data.OnlineTest,
                    Fgd: action.data.Fgd,
                    PsycologicalTest: action.data.PsycologicalTest,
                    Interview: action.data.Interview
                },
                FLK: {
                    ...state.FLK,
                    ...action.data.Flk
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_PSYCHOLOGICAL_PAHSE: {
            return {
                ...state,
                modalPsychological: {
                    ...state.modalPsychological,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_FGD_PHASE: {
            return {
                ...state,
                modalFGD: {
                    ...state.modalFGD,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_PSYCHOLOGICAL_CBT: {
            return {
                ...state,
                modalPsychologicalCBT: {
                    ...state.modalPsychologicalCBT,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_DETAIL_MODAL: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    Interview: {
                        ...state.modal.Interview,
                        [action.property]: action.value
                    }
                }
            }
        }
        case types.RECRUITMENT_PR_CHANGE_SUB_PROPERTY: {
            return {
                ...state,
                [action.property]: {
                    ...state[action.property],
                    [action.subProperty]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_VIEW_FLK_FORM_SUCCESS_PAHSE: {
            return {
                ...state,
                FLK: {
                    ...state.FLK,
                    ApplicantFLK: {
                        ...state.FLK.ApplicantFLK,
                        ...action.data.ApplicantFLK
                    },
                    tableEducation: action.data.EducationList,
                    tableJobExperience: action.data.JobExperienceList,
                    tableFamily: action.data.FamilyStatusList,
                    tableFamilyStructure: action.data.FamilyStructureList,
                    tableReference: action.data.ReferenceList
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_FLK_APLICANY_PAHSE: {
            return {
                ...state,
                FLK: {
                    ...state.FLK,
                    ApplicantFLK: {
                        ...state.FLK.ApplicantFLK,
                        [action.property]: action.value
                    }
                }
            }
        }
        case types.RESET_MODAL_FGD: {
            return {
                ...state,
                [action.modalName]: {
                    visible: false,
                    tglTest: moment(),
                    hasilTest: 1,
                    notesPsychological: '',
                    uploadFileName: '',
                    ApplicationId: '',
                    notesOnline: '',
                    uploadFile: '',
                    testTool: '',
                    cutOffCode: '',
                    cutOffName: ''
                }
            }
        }
        case types.RECRUITMENT_PR_HANDLE_STATE_MODAL_INVITATION_INTERVIEW: {
            return {
                ...state,
                modalInvitationInterview: {
                    ...state.modalInvitationInterview,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PAHSE_INTERVIEW_SUCCESS: {
            return {
                ...state,
                modalInvitationInterview: {
                    ...state.modalInvitationInterview,
                    ...action.data
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_EMAIL_REDAC_PHASE_CV_SUCCESS: {
            return {
                ...state,
                modalEmailHiringManager: {
                    ...state.modalEmailHiringManager,
                    ...action.data
                }
            }
        }
        case types.RECRUITMENT_PR_GET_FGD_TEST_RESULT_SUCCESS: {
            return {
                ...state,
                modalFGD: {
                    ...state.modalFGD,
                    ...action.payload
                }
            }
        }
        case types.RECRUITMENT_PR_GET_PSYCHO_TEST_RESULT_SUCCESS: {
            return {
                ...state,
                modalPsychological: {
                    ...state.modalPsychological,
                    ...action.payload
                }
            }
        }
        case types.RECRUITMENT_PR_GET_OT_TEST_RESULT_SUCCESS: {
            return {
                ...state,
                modalOnlineTest: {
                    ...state.modalOnlineTest,
                    ...action.payload
                }
            }
        }
        case types.RECRUITMENT_PR_GET_INTERVIEW_VIEW_RESULT_SUCCESS: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    Interview: { ...state.modal.Interview, ...action.payload }
                }
            }
        }
        case types.RECRUITMENT_PR_INIT_FORM_INTERVIEW_VIEW_RESULT: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    Interview: {
                        ...state.modal.Interview,
                        uploadFile: '',
                        kompetensiTeknikalInter: '',
                        kompetensiNonTeknikalInter: '',
                        kompetensiTeknikalArea: '',
                        kompetensiNonTeknikalArea: '',
                        notes: '',
                        kesimpulan: '',
                        golonganApl: '',
                        golonganNum: ''
                    }
                }
            }
        }
        case types.RECRUITMENT_PR_PSYCHOLOGICAL_TEST_CBT_UPLOAD_TEST_RESULT_SUCCESS: {
            return {
                ...state,
                modalPsychologicalCBT: {
                    ...state.modalPsychologicalCBT,
                    uploadResult: action.payload
                }
            }
        }
        case types.RECRUITMENT_PR_HANLDE_STATE_UPLOAD_TEST: {
            return {
                ...state,
                modalUploadTestResult: {
                    ...state.modalUploadTestResult,
                    [action.property]: action.value
                }
            }
        }
        case types.FLK_POST_VIEW_SUCCESS: {
            return {
                ...state,
                FLK: {
                    ...state.FLK,
                    ...action.payload
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_LIST_FAILEDBY_SUCCESS: {
            return {
                ...state,
                modalFailedOffering: {
                    ...state.modalFailedOffering,
                    listFailedby: action.payload
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_FLK_BATCH: {
            return {
                ...state,
                modalDownloadBatchFLK: {
                    ...state.modalDownloadBatchFLK,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_FETCH_LIST_FEEDBACK_OFFERING_SUCCESS: {
            return {
                ...state,
                modalFailedOffering: {
                    ...state.modalFailedOffering,
                    listFeedback: action.payload
                }
            }
        }
        case types.RESET_ACTIVITY_PRIORITY: {
            return {
                ...state,
                FLK: {
                    ...state.FLK,
                    activityPriority1: false,
                    activityPriority2: false,
                    activityPriority3: false,
                    activityPriority4: false,
                    activityPriority5: false,
                    activityPriority6: false,
                    tableActivityPriority: []
                }
            }
        }
        case types.RESET_JOB_PRIORITY: {
            return {
                ...state,
                FLK: {
                    ...state.FLK,
                    jobPriority1: false,
                    jobPriority2: false,
                    jobPriority3: false,
                    jobPriority4: false,
                    jobPriority5: false,
                    jobPriority6: false,
                    jobPriority7: false,
                    jobPriority8: false,
                    jobPriority9: false,
                    jobPriority10: false,
                    jobPriority11: false,
                    jobPriority12: false,
                    jobPriority13: false,
                    jobPriority14: false,
                    jobPriorityOthers: '',
                    tableActivityPriorityJob: []
                }
            }
        }
        case types.RESET_MODAL_FAILED1: {
            return {
                ...state,
                modalFailed1: {
                    visible: false,
                    feedback: '',
                    IsInteviewResult: false,
                    feedback1: '',
                    personalReason: ''
                }
            }
        }
        case types.FLK_SET_READMORE: {
            if (action.from == 'new') {
                return {
                    ...state,
                    FLK: {
                        ...state.FLK,
                        tableJobExperience: state.FLK.tableJobExperience.map((x, i) => {
                            return x.JobExperienceId == action.id
                                ? {
                                      ...state.FLK.tableJobExperience[i],
                                      readMoreJob: action.value
                                  }
                                : {
                                      ...state.FLK.tableJobExperience[i]
                                  }
                        })
                    }
                }
            } else if (action.from == 'old') {
                return {
                    ...state,
                    FLK: {
                        ...state.FLK,
                        tableJobExperience: state.FLK.tableJobExperience.map((x, i) => {
                            return x.WorkExperienceId == action.id
                                ? {
                                      ...state.FLK.tableJobExperience[i],
                                      readMoreJob: action.value
                                  }
                                : {
                                      ...state.FLK.tableJobExperience[i]
                                  }
                        })
                    }
                }
            }
            return {
                ...state
            }
        }
        case types.FLK_SET_READMORE_IMPROVE: {
            if (action.from == 'new') {
                return {
                    ...state,
                    FLK: {
                        ...state.FLK,
                        tableJobExperience: state.FLK.tableJobExperience.map((x, i) => {
                            return x.JobExperienceId == action.id
                                ? {
                                      ...state.FLK.tableJobExperience[i],
                                      readMoreImprove: action.value
                                  }
                                : {
                                      ...state.FLK.tableJobExperience[i]
                                  }
                        })
                    }
                }
            } else if (action.from == 'old') {
                return {
                    ...state,
                    FLK: {
                        ...state.FLK,
                        tableJobExperience: state.FLK.tableJobExperience.map((x, i) => {
                            return x.WorkExperienceId == action.id
                                ? {
                                      ...state.FLK.tableJobExperience[i],
                                      readMoreImprove: action.value
                                  }
                                : {
                                      ...state.FLK.tableJobExperience[i]
                                  }
                        })
                    }
                }
            }
            return {
                ...state
            }
        }
        case types.FLK_INIT_STATE: {
            return {
                ...state,
                FLK: initState.FLK
            }
        }
        case types.INTERVIEW_RESULT_REVIEW_VIEW_SUCCESS: {
            return {
                ...state,
                modalInterviewResult: {
                    ...state.modalInterviewResult,
                    dataList: action.payload
                }
            }
        }

        case types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE: {
            return {
                ...state,
                modalSelectEmailTemplate: {
                    ...state.modalSelectEmailTemplate,
                    [action.property]: action.value
                }
            }
        }
        case types.RECRUITMENT_PR_RESET_EMAIL_TEMPLATE_STATE: {
            return {
                ...state,
                modalSelectEmailTemplate: {
                    ...state.modalSelectEmailTemplate,
                    emailTemplateList: initState.modalSelectEmailTemplate.emailTemplateList,
                    emailTemplateTotalRows: initState.modalSelectEmailTemplate.emailTemplateTotalRows,
                    emailTemplateCurrentPage: initState.modalSelectEmailTemplate.emailTemplateCurrentPage
                    // selectedEmailTemplateId: initState.modalSelectEmailTemplate.selectedEmailTemplateId,
                }
            }
        }

        case types.SET_ATS_INVITED_APPLICANT_LIST_TO_SEND_EMAIL_INVITATION:
            return {
                ...state,
                applicantListToSendEmailInvitation: action.applicantList
            }
        case types.RECRUITMENT_PR_HANDLE_STATE_EMAIL_TEMPLATE_INTERVIEW_STEP_3  : {
            return {
                ...state,
                modalSelectEmailTemplateInterviewStep3: {
                    ...state.modalSelectEmailTemplateInterviewStep3,
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
