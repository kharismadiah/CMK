import React, { Component } from 'react'
import { Col, Row, Icon, Radio, Table } from 'antd'
import moment from 'moment'
import Checkbox from '../../../../CustomComponentAntd/customCheckbox'
import Form from '../../../../uielements/form'
import Input from '../../../../CustomComponentAntd/customInput'
import Button from '../../../../uielements/button'
import Select from '../../../../CustomComponentAntd/customSelect'
import Datepicker from '../../../../CustomComponentAntd/customDatePicker'
import DatepickerMode from '../../../../CustomComponentAntd/customDatePickerMode'
import TextArea from '../../../../CustomComponentAntd/customTextArea'
import ButtonGroup from 'antd/lib/button/button-group'
import { messages } from '../../../../../components/messageBox'

class Form2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSubmit: false,
            isOther: false,
            degree: '',
            startYear: '',
            institute: '',
            graduatedYear: '',
            major: '',
            gpaNem: '',
            outOf: '',
            isPresent: false,
            structure: '',
            dateOfBirth: '',
            name: '',
            education: '',
            gender: 'Male',
            occupation: '',

            //Magang
            FLKInternshipId: 0,
            InternshipId: 0,
            isEditInternship: false,
            internInstitutionName: '',
            internStartDate: '',
            internEndDate: '',
            internDesc: '',
            internFunction: '',
            internFunctionID: '',
            internIndustry: '',
            internIndustryID: '',
            internIndustryOther: '',
            companyName: '',

            //Kerja
            WorkExperienceId: 0,
            JobExperienceId: 0,
            isEditJobExperience: false,
            namaInstitusi: '',
            jabatan: '',
            posisi: '',
            tipePosisi: '',
            isTipePosisi: '',
            descPekerjaan1: '',
            descPekerjaan2: '',
            descPekerjaan3: '',
            bidangKerja1: '',
            bidangKerja2: '',
            bidangKerja3: '',
            industri: '',
            industriDesc: '',
            tahunMulai: '',
            tahunSelesai: '',
            gajiTerakhir: '',
            industriName: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    onAddIntership = e => {
        const { handleState, data } = this.props
        e.preventDefault()
        let _this = this
        this.props.form.validateFields(
            [
                'internInstitutionName',
                'internStartDate',
                'internEndDate',
                'internDesc',
                'internFunction',
                'internIndustry'
            ],
            (err, values) => {
                if (!err) {
                    let dataParam = {
                        FLKInternshipId: _this.state.FLKInternshipId,
                        InternshipId: _this.state.isEditInternship
                            ? _this.state.InternshipId
                            : data.tableMagang.length + 1,
                        InternInstitutionName: _this.state.internInstitutionName,
                        InternStartDate: moment(_this.state.internStartDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
                        InternEndDate: _this.state.isPresent
                            ? '01/12/9999'
                            : moment(_this.state.internEndDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
                        InternDesc: _this.state.internDesc,
                        InternshipCompanyIndustryName: _this.state.internIndustry,
                        InternshipCompanyIndustryId: _this.state.internIndustryID,
                        InternshipCompanyIndustryNameOther: _this.state.internIndustryOther,
                        InternshipVacancyDepartmentName: _this.state.internFunction,
                        InternshipVacancyDepartmentId: _this.state.internFunctionID,
                        IsPresent: _this.state.isPresent
                    }
                    let foundIdx
                    if (_this.state.isEditInternship) {
                        if (_this.state.FLKInternshipId === 0) {
                            foundIdx = data.tableMagang.findIndex(x => x.InternshipId === _this.state.InternshipId)
                        } else {
                            foundIdx = data.tableMagang.findIndex(
                                x => x.FLKInternshipId === _this.state.FLKInternshipId
                            )
                        }
                        data.tableMagang[foundIdx] = dataParam
                    } else {
                        data.tableMagang.push(dataParam)
                    }
                    handleState('tableMagang', data.tableMagang)
                    _this.setState({
                        onSubmit: !_this.state.onSubmit,
                        isEditInternship: false,
                        FLKInternshipId: 0,
                        InternshipId: 0,
                        internInstitutionName: '',
                        internStartDate: '',
                        internEndDate: '',
                        internDesc: '',
                        isPresent: false,
                        internIndustry: '',
                        internIndustryID: '',
                        internIndustryOther: '',
                        internFunction: '',
                        internFunctionID: ''
                    })
                    _this.props.form.resetFields()
                } else {
                    _this.setState({ onSubmit: !_this.state.onSubmit })
                }
            }
        )
    }

    onEditInternship = idx => {
        const { data } = this.props
        let _this = this
        _this.setState({
            onSubmit: !_this.state.onSubmit,
            isEditInternship: true,
            FLKInternshipId: data.tableMagang[idx].FLKInternshipId,
            InternshipId: data.tableMagang[idx].InternshipId,
            internInstitutionName: data.tableMagang[idx].InternInstitutionName,
            internStartDate: moment(data.tableMagang[idx].InternStartDate, 'DD/MM/YYYY'),
            internEndDate: moment(data.tableMagang[idx].InternEndDate, 'DD/MM/YYYY'),
            internDesc: data.tableMagang[idx].InternDesc,
            isPresent: data.tableMagang[idx].IsPresent,
            internIndustry: data.tableMagang[idx].InternshipCompanyIndustryName,
            internIndustryID: data.tableMagang[idx].InternshipCompanyIndustryId,
            internIndustryOther: data.tableMagang[idx].InternshipCompanyIndustryNameOther,
            internFunction: data.tableMagang[idx].InternshipVacancyDepartmentName,
            internFunctionID: data.tableMagang[idx].InternshipVacancyDepartmentId
        })

        this.props.form.setFieldsValue({
            onSubmit: !_this.state.onSubmit,
            isEditInternship: true,
            FLKInternshipId: data.tableMagang[idx].FLKInternshipId,
            InternshipId: data.tableMagang[idx].InternshipId,
            internInstitutionName: data.tableMagang[idx].InternInstitutionName,
            internStartDate: moment(data.tableMagang[idx].InternStartDate, 'DD/MM/YYYY'),
            internEndDate: moment(data.tableMagang[idx].InternEndDate, 'DD/MM/YYYY'),
            internDesc: data.tableMagang[idx].InternDesc,
            isPresent: data.tableMagang[idx].IsPresent,
            internIndustry: data.tableMagang[idx].InternshipCompanyIndustryName,
            internIndustryID: data.tableMagang[idx].InternshipCompanyIndustryId,
            internIndustryOther: data.tableMagang[idx].InternshipCompanyIndustryNameOther,
            internFunction: data.tableMagang[idx].InternshipVacancyDepartmentName,
            internFunctionID: data.tableMagang[idx].InternshipVacancyDepartmentId
        })
    }

    onDeleteInternship = idx => {
        const { handleState, data } = this.props
        data.tableMagang.splice(idx, 1)
        handleState('tableMagang', data.tableMagang)
    }

    showButton(text, data) {
        const { setReadMore } = this.props
        let id
        let from
        if (data.JobExperienceId) {
            id = data.JobExperienceId
            from = 'new'
        } else {
            id = data.WorkExperienceId
            from = 'old'
        }
        if (text !== null) {
            if (text.length > 46 && data.readMoreJob === false) {
                return <Button onClick={() => setReadMore(id, from, true)}>Read more</Button>
            } else if (text.length > 46 && data.readMoreJob === true) {
                return <Button onClick={() => setReadMore(id, from, false)}>Read less</Button>
            } else {
                return ''
            }
        } else {
            return ''
        }
    }

    onAddJobExperience = e => {
        const { handleState, source, data } = this.props
        e.preventDefault()
        let _this = this
        this.props.form.validateFields(
            [
                'namaInstitusi',
                'jabatan',
                'posisi',
                'tipePosisi',
                'descPekerjaan1',
                'descPekerjaan2',
                // 'descPekerjaan3',
                'bidangKerja1',
                // 'bidangKerja2',
                // 'bidangKerja3',
                'industri',
                'industriDesc',
                'tahunMulai',
                'tahunSelesai',
                'gajiTerakhir'
            ],
            (err, values) => {
                if (!err) {
                    let bidangData2 = source.Function.find(x => x.id === _this.state.bidangKerja2)
                    let bidangData3 = source.Function.find(x => x.id === _this.state.bidangKerja3)
                    let jobDescFull = ''
                    if (this.state.descPekerjaan1) {
                        jobDescFull = this.state.descPekerjaan1
                        if (this.state.descPekerjaan2) {
                            jobDescFull = jobDescFull.concat(', ', this.state.descPekerjaan2)
                            if (this.state.descPekerjaan3) {
                                jobDescFull = jobDescFull.concat(', ', this.state.descPekerjaan3)
                            }
                        }
                    }
                    let dataParam = {
                        WorkExperienceId: _this.state.WorkExperienceId,
                        JobExperienceId: _this.state.isEditJobExperience
                            ? _this.state.JobExperienceId
                            : data.tableJobExperience.length + 1,
                        namaInstitusi: _this.state.namaInstitusi,
                        jabatan: source.PositionTitle.find(x => x.id === _this.state.jabatan).name,
                        jabatanId: _this.state.jabatan,
                        posisi: _this.state.posisi,
                        tipePosisi: source.PositionType.find(x => x.id === _this.state.tipePosisi).name,
                        tipePosisiId: _this.state.tipePosisi,
                        descPekerjaan1: _this.state.descPekerjaan1,
                        descPekerjaan2: _this.state.descPekerjaan2,
                        descPekerjaan3: _this.state.descPekerjaan3,
                        jobDescFullName: jobDescFull,
                        bidangKerja1: source.Function.find(x => x.id === _this.state.bidangKerja1).name,
                        bidangKerja1Id: _this.state.bidangKerja1,
                        bidangKerja2: bidangData2 ? bidangData2.name : '',
                        bidangKerja2Id: _this.state.bidangKerja2,
                        bidangKerja3: bidangData3 ? bidangData3.name : '',
                        bidangKerja3Id: _this.state.bidangKerja3,
                        industri: source.Industry.find(x => x.id === _this.state.industri).name,
                        industriId: _this.state.industri,
                        industriDesc: _this.state.industriDesc,
                        tahunMulai: moment(_this.state.tahunMulai).format('MM/YYYY'),
                        tahunSelesai: moment(_this.state.tahunSelesai).format('MM/YYYY'),
                        gajiTerakhir: _this.state.gajiTerakhir,
                        readMoreJob: false
                    }
                    let foundIdx
                    if (_this.state.isEditJobExperience) {
                        if (_this.state.WorkExperienceId === 0) {
                            foundIdx = data.tableJobExperience.findIndex(
                                x => x.JobExperienceId === _this.state.JobExperienceId
                            )
                        } else {
                            foundIdx = data.tableJobExperience.findIndex(
                                x => x.WorkExperienceId === _this.state.WorkExperienceId
                            )
                        }
                        data.tableJobExperience[foundIdx] = dataParam
                    } else {
                        data.tableJobExperience.push(dataParam)
                    }
                    handleState('tableJobExperience', data.tableJobExperience)
                    this.setState({
                        onSubmit: !this.state.onSubmit,
                        isEditJobExperience: false,
                        WorkExperienceId: 0,
                        JobExperienceId: 0,
                        namaInstitusi: '',
                        jabatan: '',
                        posisi: '',
                        tipePosisi: '',
                        isTipePosisi: '',
                        descPekerjaan1: '',
                        descPekerjaan2: '',
                        descPekerjaan3: '',
                        bidangKerja1: '',
                        bidangKerja2: '',
                        bidangKerja3: '',
                        industri: '',
                        industriDesc: '',
                        tahunMulai: '',
                        tahunSelesai: '',
                        gajiTerakhir: '',
                        industriName: ''
                    })
                    this.props.form.resetFields()
                } else {
                    this.setState({
                        onSubmit: !this.state.onSubmit
                    })
                }
            }
        )
    }

    onEditJob = idx => {
        const { data } = this.props
        let _this = this
        if (data.tableJobExperience[idx].tipePosisi.toLowerCase().includes('non')) {
            _this.setState({ isTipePosisi: 'non management trainee' })
        } else {
            _this.setState({ isTipePosisi: 'MT' })
        }

        _this.setState({
            onSubmit: !_this.state.onSubmit,
            isEditJobExperience: true,
            WorkExperienceId: data.tableJobExperience[idx].WorkExperienceId,
            JobExperienceId: data.tableJobExperience[idx].JobExperienceId,
            namaInstitusi: data.tableJobExperience[idx].namaInstitusi,
            jabatan: data.tableJobExperience[idx].jabatanId,
            posisi: data.tableJobExperience[idx].posisi,
            tipePosisi: data.tableJobExperience[idx].tipePosisiId,
            descPekerjaan1: data.tableJobExperience[idx].descPekerjaan1,
            descPekerjaan2: data.tableJobExperience[idx].descPekerjaan2,
            descPekerjaan3: data.tableJobExperience[idx].descPekerjaan3,
            bidangKerja1: data.tableJobExperience[idx].bidangKerja1Id,
            bidangKerja2: data.tableJobExperience[idx].bidangKerja2Id,
            bidangKerja3: data.tableJobExperience[idx].bidangKerja3Id,
            industri: data.tableJobExperience[idx].industriId,
            industriDesc: data.tableJobExperience[idx].industriDesc,
            tahunMulai: moment(data.tableJobExperience[idx].tahunMulai, 'MM/YYYY'),
            tahunSelesai: moment(data.tableJobExperience[idx].tahunSelesai, 'MM/YYYY'),
            gajiTerakhir: data.tableJobExperience[idx].gajiTerakhir,
            industriName: data.tableJobExperience[idx].industri.toLowerCase().includes('other') ? 'others' : ''
        })
        this.props.form.setFieldsValue({
            onSubmit: !_this.state.onSubmit,
            isEditJobExperience: true,
            WorkExperienceId: data.tableJobExperience[idx].WorkExperienceId,
            JobExperienceId: data.tableJobExperience[idx].JobExperienceId,
            namaInstitusi: data.tableJobExperience[idx].namaInstitusi,
            jabatan: data.tableJobExperience[idx].jabatanId,
            posisi: data.tableJobExperience[idx].posisi,
            tipePosisi: data.tableJobExperience[idx].tipePosisiId,
            descPekerjaan1: data.tableJobExperience[idx].descPekerjaan1,
            descPekerjaan2: data.tableJobExperience[idx].descPekerjaan2,
            descPekerjaan3: data.tableJobExperience[idx].descPekerjaan3,
            bidangKerja1: data.tableJobExperience[idx].bidangKerja1Id,
            bidangKerja2: data.tableJobExperience[idx].bidangKerja2Id,
            bidangKerja3: data.tableJobExperience[idx].bidangKerja3Id,
            industri: data.tableJobExperience[idx].industriId,
            industriDesc: data.tableJobExperience[idx].industriDesc,
            tahunMulai: moment(data.tableJobExperience[idx].tahunMulai, 'MM/YYYY'),
            tahunSelesai: moment(data.tableJobExperience[idx].tahunSelesai, 'MM/YYYY'),
            gajiTerakhir: data.tableJobExperience[idx].gajiTerakhir
        })
    }

    onDeleteJob = idx => {
        const { handleState, data } = this.props
        data.tableJobExperience.splice(idx, 1)
        handleState('tableJobExperience', data.tableJobExperience)
    }

    handleSetData = (property, value) => {
        this.setState({
            onSubmit: !this.state.onSubmit,
            [property]: value
        })
        this.props.form.setFieldsValue({
            [property]: value
        })
        if (property === 'industri') {
            this.props.form.setFieldsValue({
                industriDesc: ''
            })
        }
        if (property == 'isPresent' && value == false) {
            this.setState({
                [property]: value,
                internEndDate: null
            })
            this.props.form.setFieldsValue({
                internEndDate: null
            })
        }
    }

    handleStateDate = (property, value) => {
        const { handleState } = this.props
        handleState(property, moment(value, 'DD/MM/YYYY'))
    }

    valForm = () => {
        const { handleStatePosisi, data, isDetails = false } = this.props
        let sallary = data.tableJobExperience.filter(x => x.gajiTerakhir === 0)
        let jobDesc = data.tableJobExperience.filter(x => x.jobDescFullName === null)
        this.props.form.validateFieldsAndScroll(
            [
                'statusPernikahan',
                'anakKe',
                'jumlahSaudara',
                'alamatLengkap',
                'titleAyah',
                'usiaAyah',
                'pendidikanTerakhirAyah',
                'pekerjaanAyah',
                'titleIbu',
                'usiaIbu',
                'pendidikanTerakhirIbu',
                'pekerjaanIbu',
                'problemSituasi',
                'problemTindakan',
                'problemTugas',
                'problemHasil',
                'obstacleSituasi',
                'obstacleTindakan',
                'obstacleTugas',
                'obstacleHasil'
            ],
            (err, values) => {
                if (!err) {
                    if (isDetails) {
                        handleStatePosisi(3)
                    } else {
                        if (
                            (data.statusPernikahan === 'menikah' && data.sejakTahun === '') ||
                            data.statusPernikahan === ''
                        ) {
                            let cusErr = {
                                sejakTahun: {
                                    errors: [
                                        {
                                            field: 'sejakTahun',
                                            message: 'Please enter the Sejak Tahun'
                                        }
                                    ]
                                }
                            }
                            this.props.form.validateFieldsAndScroll(cusErr)
                        } else if (sallary.length !== 0 || jobDesc.length !== 0) {
                            messages(
                                'Info',
                                'Mohon untuk melengkapi data yang belum lengkap pada bagian Pengalaman Kerja melalui action ubah',
                                'info',
                                false
                            )
                        } else {
                            handleStatePosisi(3)
                        }
                    }
                } else {
                    if (isDetails) {
                        handleStatePosisi(3)
                    } else this.setState({ onSubmit: !this.state.onSubmit })
                }
            }
        )
    }

    render() {
        const { data, handleStatePosisi, handleState, source, isDetails = false } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit } = this.state
        const { innerWidth: width, innerHeight: height } = window

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        }

        const colStyle = {
            marginBottom: '-10px'
        }
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        }
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
        }

        const columnsMagang = [
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button disabled={isDetails} onClick={() => this.onEditInternship(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button disabled={isDetails} onClick={() => this.onDeleteInternship(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                ),
                width: 100
            },
            {
                title: 'Nama Institusi',
                dataIndex: 'InternInstitutionName'
            },
            {
                title: 'Tanggal Mulai',
                dataIndex: 'InternStartDate'
            },
            {
                title: 'Tanggal Selesai',
                dataIndex: 'InternEndDate'
            }
        ]

        const columnsPengalaman = [
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button disabled={isDetails} onClick={() => this.onEditJob(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button disabled={isDetails} onClick={() => this.onDeleteJob(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                ),
                width: 100
            },
            {
                title: 'Nama Institusi',
                dataIndex: 'namaInstitusi'
            },
            {
                title: 'Jabatan',
                dataIndex: 'jabatan'
            },
            {
                title: 'Deskripsi Pekerjaan',
                dataIndex: 'jobDescFullName',
                render: (text, data, idx) => {
                    return (
                        <>
                            <div
                                style={
                                    data.readMoreJob
                                        ? {}
                                        : {
                                              textOverflow: 'ellipsis',
                                              width: '300px',
                                              overflow: 'hidden',
                                              whiteSpace: 'nowrap'
                                          }
                                }
                            >
                                {text}
                            </div>
                            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                {this.showButton(text, data)}
                            </div>
                        </>
                    )
                },
                width: 100
            },
            {
                title: 'Tahun Mulai',
                dataIndex: 'tahunMulai'
            },
            {
                title: 'Tahun Selesai',
                dataIndex: 'tahunSelesai'
            },
            {
                title: 'Gaji Terakhir',
                dataIndex: 'gajiTerakhir'
            }
        ]

        return (
            <div>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
                        <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
                            <h3>C. KELUARGA</h3>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={3} sm={3} xs={24}>
                            <h4>
                                01. Status Pernikahan<span style={{ color: 'red' }}>*</span>
                            </h4>
                            <Radio.Group
                                style={isDetails ? { marginTop: 10, marginBottom: '24px' } : { marginTop: 10 }}
                                disabled={isDetails}
                                onChange={e => {
                                    handleState('statusPernikahan', e.target.value)
                                    handleState('sejakTahun', '')
                                }}
                                value={data.statusPernikahan}
                            >
                                <Radio value="lajang">Lajang</Radio>
                                <Radio value="menikah">Menikah</Radio>
                            </Radio.Group>
                        </Col>
                    </Col>
                </Row>
                {data.statusPernikahan === 'menikah' ? (
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <div
                                    style={{
                                        width: '99%',
                                        marginTop: 10,
                                        marginBottom: '24px'
                                    }}
                                >
                                    <Datepicker
                                        isRequired={data.statusPernikahan === 'menikah'}
                                        labelField="Sejak Tahun"
                                        disabled={isDetails}
                                        name="sejakTahun"
                                        id="sejakTahun"
                                        initialValue={data.sejakTahun}
                                        formItemLayout={formItemLayoutDate}
                                        getFieldDecorator={getFieldDecorator}
                                        onSubmit={onSubmit}
                                        Form={Form}
                                        format={'DD/MM/YYYY'}
                                        onChange={(e, value) => this.handleStateDate('sejakTahun', value)}
                                        validation={[
                                            {
                                                required: true,
                                                message: 'Please enter the Sejak Tahun'
                                            }
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Col>
                    </Row>
                ) : null}
                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                            <h4>
                                02. Keluarga <span style={{ color: 'red' }}>*</span>
                            </h4>
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={4} sm={4} xs={5} style={{ ...colStyle, marginRight: '5px' }}>
                            <Input
                                labelField="Anak ke"
                                name="anakKe"
                                id="anakKe"
                                initialValue={data.anakKe}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                onChange={handleState}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                width={width < 576 ? '100%' : '137%'}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Anak ke'
                                    },
                                    {
                                        pattern: new RegExp(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g),
                                        message: 'Sorry, only numbers (0-9) are allowed!'
                                    }
                                ]}
                            />
                        </Col>
                        {/* <Col md={1} sm={1} xs={24} style={colStyle}>
                            <h4 style={{ paddingTop: 25 }}>dari</h4>
                        </Col> */}
                        <Col md={4} sm={4} xs={5} style={{ ...colStyle, marginRight: '10px' }}>
                            <Input
                                labelField="dari"
                                name="jumlahSaudara"
                                id="jumlahSaudara"
                                initialValue={data.jumlahSaudara}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={isDetails}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                width={width < 576 ? '100%' : '137%'}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Jumlah Saudara'
                                    },
                                    {
                                        pattern: new RegExp(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g),
                                        message: 'Sorry, only numbers (0-9) are allowed!'
                                    }
                                ]}
                            />
                        </Col>
                        <Col md={1} sm={1} xs={2} style={colStyle}>
                            <h4 style={{ paddingTop: 25 }}>bersaudara</h4>
                        </Col>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={12} sm={12} xs={24}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24}>
                                    <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                        <h4>a. Ayah</h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={4} sm={4} xs={6} style={colStyle}>
                                    <Select
                                        isRequired={true}
                                        labelField="Nama"
                                        name="titleAyah"
                                        id="titleAyah"
                                        initialValue={data.titleAyah}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.FamilyTitle}
                                        onChange={e => handleState('titleAyah', e)}
                                        disabled={isDetails}
                                        onSubmit={onSubmit}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Family Title'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col md={20} sm={20} xs={18} style={{ marginBottom: '-10px', marginTop: '17px' }}>
                                    <Input
                                        name="namaAyah"
                                        id="namaAyah"
                                        initialValue={data.namaAyah}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        disabled={isDetails}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '135%'}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Nama Ayah'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        isRequired={true}
                                        labelField="Usia"
                                        name="usiaAyah"
                                        id="usiaAyah"
                                        initialValue={data.usiaAyah}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={isDetails}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '137%'}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Usia Ayah'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        isRequired={true}
                                        labelField="Pendidikan Terakhir"
                                        name="pendidikanTerakhirAyah"
                                        id="pendidikanTerakhirAyah"
                                        initialValue={data.pendidikanTerakhirAyah}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Degree}
                                        onChange={e => handleState('pendidikanTerakhirAyah', e)}
                                        disabled={isDetails} //disabled jika familiTitle almarhun
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '91%'}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Pendidikan Terakhir Ayah'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        isRequired={true}
                                        labelField="Pekerjaan"
                                        name="pekerjaanAyah"
                                        id="pekerjaanAyah"
                                        initialValue={data.pekerjaanAyah}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={isDetails}
                                        Form={Form}
                                        onChange={e => handleState('pekerjaanAyah', e)}
                                        onSubmit={onSubmit}
                                        data={source.Occupation}
                                        width={width < 576 ? '100%' : '91%'}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Pekerjaan Ayah'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} sm={12} xs={24}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24}>
                                    <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                        <h4>b. Ibu</h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={4} sm={4} xs={6} style={colStyle}>
                                    <Select
                                        isRequired={true}
                                        labelField="Nama"
                                        name="titleIbu"
                                        id="titleIbu"
                                        initialValue={data.titleIbu}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.FamilyTitle}
                                        onChange={e => handleState('titleIbu', e)}
                                        disabled={isDetails}
                                        onSubmit={onSubmit}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Family Title'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col md={20} sm={20} xs={18} style={{ marginBottom: '-10px', marginTop: '17px' }}>
                                    <Input
                                        name="namaIbu"
                                        id="namaIbu"
                                        initialValue={data.namaIbu}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        disabled={isDetails}
                                        width={width < 576 ? '100%' : '135%'}
                                        onSubmit={onSubmit}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Nama Ibu'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        isRequired={true}
                                        labelField="Usia"
                                        name="usiaIbu"
                                        id="usiaIbu"
                                        initialValue={data.usiaIbu}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={isDetails}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '137%'}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Usia Ibu'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        isRequired={true}
                                        labelField="Pendidikan Terakhir"
                                        name="pendidikanTerakhirIbu"
                                        id="pendidikanTerakhirIbu"
                                        initialValue={data.pendidikanTerakhirIbu}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Degree}
                                        onChange={e => handleState('pendidikanTerakhirIbu', e)}
                                        disabled={isDetails}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '91%'}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Pendidikan Terakhir Ibu'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        isRequired={true}
                                        labelField="Pekerjaan"
                                        name="pekerjaanIbu"
                                        id="pekerjaanIbu"
                                        initialValue={data.pekerjaanIbu}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={isDetails}
                                        Form={Form}
                                        data={source.Occupation}
                                        onChange={e => handleState('pekerjaanIbu', e)}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '91%'}
                                        validation={[
                                            {
                                                required: !isDetails,
                                                message: 'Please enter the Pekerjaan Ibu'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>

                <Form onSubmit={this.onAddIntership.bind(this)}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
                            <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
                                <h3>D. PENGALAMAN</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                <h4>01. Magang/Praktek Kerja Lapangan(PKL)</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={12} sm={12} xs={24}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        labelField="Nama Institusi"
                                        name="internInstitutionName"
                                        id="internInstitutionName"
                                        initialValue={this.state.internInstitutionName}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={this.handleSetData}
                                        disabled={isDetails}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '137%'}
                                        validation={[
                                            {
                                                required: true,
                                                message: 'Please enter the Nama Institusi'
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={12} sm={12} xs={24} style={colStyle}>
                                    <div style={{ position: 'relative' }}>
                                        <Select
                                            labelField="Function"
                                            //   disabled={InputApplication.isDisabled}
                                            name="internFunction"
                                            id="internFunction"
                                            initialValue={this.state.internFunction}
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            data={source.JobFunction}
                                            value={this.state.internFunction}
                                            onChange={(id, val) => {
                                                this.handleSetData('internFunction', val)
                                                this.handleSetData('internFunctionID', id)
                                            }}
                                            onSubmit={onSubmit}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please choose the Function'
                                                }
                                            ]}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={12} sm={12} xs={24} style={colStyle}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <div style={{ position: 'relative' }}>
                                            <Select
                                                labelField="Industry"
                                                // disabled={InputApplication.isDisabled}
                                                name="internIndustry"
                                                id="internIndustry"
                                                initialValue={this.state.internIndustry}
                                                formItemLayout={formItemLayoutSelect}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                data={source.Industry}
                                                value={this.state.internIndustry}
                                                onChange={(id, val) => {
                                                    if (val === 'Others') {
                                                        this.setState({ isOther: !this.state.isOther })
                                                    }
                                                    this.handleSetData('internIndustry', val)
                                                    this.handleSetData('internIndustryID', id)
                                                }}
                                                onSubmit={onSubmit}
                                                validation={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose the Industry'
                                                    }
                                                ]}
                                            />
                                        </div>
                                        {/* <div id="popupIndustry"></div> */}
                                    </Col>
                                    {this.state.isOther ? (
                                        <Col md={24} sm={24} xs={24} style={colStyle}>
                                            <Input
                                                // disabled={InputApplication.isDisabled}
                                                name="industryOther"
                                                id="industryOther"
                                                initialValue={this.state.internIndustryOther}
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                required={[]}
                                                value={this.state.internIndustryOther}
                                                onChange={(e, data) => this.handleSetData('internIndustryOther', data)}
                                                // onSubmit={onAddInternship}
                                                // validation={[
                                                //   {
                                                //     required: true,
                                                //     message: "Please enter the Industry Other",
                                                //   },
                                                //   {
                                                //     pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                //     message:
                                                //       "Sorry, only letters (a-z), numbers (0-9) are allowed!",
                                                //   },
                                                // ]}
                                            />
                                        </Col>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <div style={{ width: '99%' }}>
                                        <Datepicker
                                            labelField="Tanggal Mulai"
                                            disabled={isDetails}
                                            name="internStartDate"
                                            id="internStartDate"
                                            initialValue={this.state.internStartDate}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            format={'DD/MM/YYYY'}
                                            onSubmit={onSubmit}
                                            onChange={(e, value) => this.handleSetData('internStartDate', value)}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Tanggal Mulai'
                                                }
                                            ]}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <div style={{ width: '99%' }}>
                                        <Datepicker
                                            labelField="Tanggal Selesai"
                                            disabled={this.state.isPresent === true ? true : isDetails}
                                            name="internEndDate"
                                            id="internEndDate"
                                            initialValue={this.state.internEndDate}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            format={'DD/MM/YYYY'}
                                            onSubmit={onSubmit}
                                            onChange={(e, value) => this.handleSetData('internEndDate', value)}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Tanggal Selesai'
                                                }
                                            ]}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={12} sm={12} xs={24} style={colStyle}>
                                    <Checkbox
                                        labelField="Hingga saat ini"
                                        name="present"
                                        id="present"
                                        initialValue={this.state.isPresent}
                                        Form={Form}
                                        onChange={(e, data) => {
                                            this.handleSetData('isPresent', data)
                                            this.handleSetData('internEndDate', moment('01/12/9999'))
                                        }}
                                        getFieldDecorator={getFieldDecorator}
                                        text="Ya"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} sm={12} xs={24}>
                            <Col md={24} sm={24} xs={24}>
                                <TextArea
                                    labelField="Deskripsi Tugas"
                                    id="internDesc"
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    initialValue={this.state.internDesc}
                                    disabled={isDetails}
                                    onChange={e => this.handleSetData('internDesc', e.target.value)}
                                    minRows={8}
                                    onSubmit={onSubmit}
                                    validation={[
                                        {
                                            required: true,
                                            message: 'Please enter the Deskripsi Tugas'
                                        }
                                    ]}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Button disabled={isDetails} type="primary" htmlType="submit">
                                Tambah Magang/PKL
                            </Button>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                            <Table
                                columns={columnsMagang}
                                dataSource={data.tableMagang}
                                pagination={false}
                                scroll={{ x: 1000 }}
                            />
                        </Col>
                    </Row>
                </Form>

                <Form onSubmit={this.onAddJobExperience.bind(this)}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                <h4>02. Kerja (jika ada)</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Row>
                                <Col md={12} sm={24} xs={24}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Nama Institusi"
                                            name="namaInstitusi"
                                            id="namaInstitusi"
                                            // isRequired={true}
                                            initialValue={this.state.namaInstitusi}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            disabled={isDetails}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '137%'}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Nama Institusi'
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Jabatan"
                                            name="jabatan"
                                            id="jabatan"
                                            initialValue={this.state.jabatan}
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            data={source.PositionTitle}
                                            onChange={e => this.handleSetData('jabatan', e)}
                                            disabled={isDetails}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '91%'}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Jabatan'
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Posisi"
                                            name="posisi"
                                            id="posisi"
                                            initialValue={this.state.posisi}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            disabled={isDetails}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '137%'}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Posisi'
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Tipe Posisi"
                                            name="tipePosisi"
                                            id="tipePosisi"
                                            initialValue={this.state.tipePosisi}
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            data={source.PositionType}
                                            onChange={(e, name) => {
                                                this.handleSetData('tipePosisi', e)
                                                this.handleSetData('isTipePosisi', name.toLowerCase())
                                            }}
                                            disabled={isDetails}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '91%'}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Jabatan'
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                                            <TextArea
                                                labelField="Deskripsi Pekerjaan"
                                                placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom berikut terlebih dahulu"
                                                id="descPekerjaan1"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                minRow={3}
                                                initialValue={this.state.descPekerjaan1}
                                                disabled={isDetails}
                                                onSubmit={onSubmit}
                                                onChange={e => this.handleSetData('descPekerjaan1', e.target.value)}
                                                validation={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter the Deskripsi Pekerjaan'
                                                    }
                                                ]}
                                            />
                                        </div>
                                    </Col>

                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                                            <TextArea
                                                labelField="Deskripsi Pekerjaan (Lanjutan 1)"
                                                placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom Deskripsi Pekerjaan terlebih dahulu"
                                                id="descPekerjaan2"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                minRow={3}
                                                maxLength={500}
                                                initialValue={this.state.descPekerjaan2}
                                                disabled={isDetails}
                                                onSubmit={onSubmit}
                                                onChange={e => this.handleSetData('descPekerjaan2', e.target.value)}
                                                validation={
                                                    this.state.descPekerjaan3 !== ''
                                                        ? [
                                                              {
                                                                  required: true,
                                                                  message:
                                                                      'Please enter the Deskripsi Pekerjaan (Lanjutan 1)'
                                                              }
                                                          ]
                                                        : [
                                                              {
                                                                  message:
                                                                      'Please enter the Deskripsi Pekerjaan (Lanjutan 1)'
                                                              }
                                                          ]
                                                }
                                            />
                                        </div>
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                                            <TextArea
                                                labelField="Deskripsi Pekerjaan (Lanjutan 2)"
                                                placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom Deskripsi Pekerjaan dan Deskripsi pekerjaan (Lanjutan 1) terlebih dahulu"
                                                id="deskripsiPekerjaan3"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                minRow={3}
                                                maxLength={500}
                                                initialValue={this.state.descPekerjaan3}
                                                disabled={isDetails}
                                                onChange={e => {
                                                    this.handleSetData('descPekerjaan3', e.target.value)
                                                }}
                                                validation={[
                                                    {
                                                        message: 'Please enter the Deskripsi Pekerjaan (Lanjutan 2)'
                                                    }
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} sm={24} xs={24}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Bidang Kerja"
                                            name="bidangKerja1"
                                            id="bidangKerja1"
                                            initialValue={this.state.bidangKerja1}
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            data={source.Function}
                                            onChange={e => this.handleSetData('bidangKerja1', e)}
                                            disabled={isDetails}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '91%'}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Bidang Kerja 1'
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                }
                                            ]}
                                        />
                                    </Col>

                                    {this.state.isTipePosisi === 'non management trainee' ||
                                    this.state.isTipePosisi === '' ? null : (
                                        <React.Fragment>
                                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                                <Select
                                                    labelField="Bidang Kerja 2"
                                                    name="bidangKerja2"
                                                    id="bidangKerja2"
                                                    initialValue={this.state.bidangKerja2}
                                                    formItemLayout={formItemLayoutSelect}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    data={source.Function}
                                                    onChange={e => this.handleSetData('bidangKerja2', e)}
                                                    disabled={isDetails}
                                                    onSubmit={onSubmit}
                                                    width={width < 576 ? '100%' : '91%'}
                                                    validation={[
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                            message:
                                                                'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                        }
                                                    ]}
                                                />
                                            </Col>
                                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                                <Select
                                                    labelField="Bidang Kerja 3"
                                                    name="bidangKerja3"
                                                    id="bidangKerja3"
                                                    initialValue={this.state.bidangKerja3}
                                                    formItemLayout={formItemLayoutSelect}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    data={source.Function}
                                                    onChange={e => this.handleSetData('bidangKerja3', e)}
                                                    disabled={isDetails}
                                                    onSubmit={onSubmit}
                                                    width={width < 576 ? '100%' : '91%'}
                                                    validation={[
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                            message:
                                                                'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                        }
                                                    ]}
                                                />
                                            </Col>
                                        </React.Fragment>
                                    )}
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Industri"
                                            name="industri"
                                            id="industri"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.industri}
                                            disabled={isDetails}
                                            onChange={(e, val) => {
                                                this.handleSetData('industri', e)
                                                this.handleSetData('industriName', val.toLowerCase())
                                            }}
                                            data={source.Industry}
                                            width={width < 576 ? '100%' : '91%'}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Industri'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    {this.state.industriName === 'others' || this.state.industriName === 'other' ? (
                                        <Col md={24} sm={24} xs={24} style={colStyle}>
                                            <Input
                                                name="industriDesc"
                                                id="industriDesc"
                                                initialValue={this.state.industriDesc}
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                disabled={isDetails}
                                                Form={Form}
                                                onChange={this.handleSetData}
                                                onSubmit={onSubmit}
                                                width={width < 576 ? '100%' : '137%'}
                                                validation={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter the Industri Others'
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                    }
                                                ]}
                                            />
                                        </Col>
                                    ) : null}
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            labelField="Tahun Mulai"
                                            disabled={isDetails}
                                            name="tahunMulai"
                                            id="tahunMulai"
                                            mode="month"
                                            format={'MM/YYYY'}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.tahunMulai}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleSetData.bind(this)}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Tahun Mulai'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            labelField="Tahun Selesai"
                                            disabled={isDetails}
                                            name="tahunSelesai"
                                            id="tahunSelesai"
                                            mode="month"
                                            format={'MM/YYYY'}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.tahunSelesai}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleSetData.bind(this)}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Tahun Selesai'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Gaji Terakhir"
                                            name="gajiTerakhir"
                                            id="gajiTerakhir"
                                            initialValue={this.state.gajiTerakhir}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            disabled={isDetails}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '137%'}
                                            validation={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Gaji'
                                                },
                                                {
                                                    pattern: new RegExp(/^[1-9][0-9]{0,15}$/g),
                                                    message: 'Please update salary to more than Rp 0'
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Button disabled={isDetails} type="primary" htmlType="submit">
                                Tambah Pengalaman Kerja
                            </Button>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                            <Table
                                columns={columnsPengalaman}
                                dataSource={data.tableJobExperience}
                                pagination={false}
                                scroll={{ x: 1000 }}
                            />
                        </Col>
                    </Row>
                </Form>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                            <h4>03. Ceritakan pengalaman ketika Saudara mengatasi permasalahan yang paling sulit</h4>
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Situasi"
                                id="problemSituasi"
                                placeholder="Situasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                onSubmit={onSubmit}
                                initialValue={data.problemSituasi}
                                disabled={isDetails}
                                onChange={e => handleState('problemSituasi', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Situasi'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Tindakan"
                                id="problemTindakan"
                                placeholder="Tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemTindakan}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={e => handleState('problemTindakan', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Tindakan'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Tugas"
                                id="problemTugas"
                                placeholder="Tugas dalam mengatasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemTugas}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={e => handleState('problemTugas', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Tugas'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Hasil"
                                id="problemHasil"
                                placeholder="Hasil tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemHasil}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={e => handleState('problemHasil', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Hasil'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                            <h4>
                                04. Ceritakan pengalaman ketika Saudara mengatasi hambatan/tantangan yang sangat besar
                                dalam menyelesaikan tugas
                            </h4>
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Situasi"
                                id="obstacleSituasi"
                                placeholder="Situasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleSituasi}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={e => handleState('obstacleSituasi', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Situasi'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Tindakan"
                                id="obstacleTindakan"
                                placeholder="Tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleTindakan}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={e => handleState('obstacleTindakan', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Tindakan'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Tugas"
                                id="obstacleTugas"
                                placeholder="Tugas dalam mengatasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleTugas}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={e => handleState('obstacleTugas', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Tugas'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                isRequired={true}
                                labelField="Hasil"
                                id="obstacleHasil"
                                placeholder="Hasil tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleHasil}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={e => handleState('obstacleHasil', e.target.value)}
                                validation={[
                                    {
                                        required: !isDetails,
                                        message: 'Please enter the Hasil'
                                    }
                                ]}
                            />
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{ paddingBottom: 20 }}>
                        <div
                            style={{
                                marginTop: 20,
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Icon
                                onClick={() => handleStatePosisi(1)}
                                style={{ cursor: 'pointer' }}
                                type="left-circle"
                                style={{ fontSize: 30 }}
                            />
                            <span style={{ fontSize: 20 }}>2/3</span>
                            <Icon
                                onClick={() => this.valForm(!this.props.isFlk)}
                                style={{ cursor: 'pointer' }}
                                type="right-circle"
                                style={{ fontSize: 30 }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedForm = Form.create()(Form2)
export default WrappedForm
