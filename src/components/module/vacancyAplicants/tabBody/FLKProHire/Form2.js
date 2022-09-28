import React, { Component } from 'react';
import { Col, Row, Icon, Checkbox, Radio, Table } from 'antd';
import moment from 'moment'

import Form from '../../../../uielements/form'
import Input from '../../../../CustomComponentAntd/customInput';
import Button from '../../../../uielements/button';
import Select from '../../../../CustomComponentAntd/customSelect';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import DatepickerMode from '../../../../CustomComponentAntd/customDatePickerMode';
import TextArea from '../../../../CustomComponentAntd/customTextArea';
import ButtonGroup from 'antd/lib/button/button-group';
import { messages } from "../../../../../components/messageBox"

import _ from 'lodash';

class Form2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,

            //Keluarga
            FLKFamilyStatusId: 0,
            FamilyId: 0,
            keluarga: '',
            usia: '',
            pendidikanTerakhir: '',
            pekerjaan: '',
            status: false,
            isEditFamily: false,
            isPresent: false,

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
            improvement: '',
            bidangKerja1: '',
            bidangKerja2: '',
            bidangKerja3: '',
            industri: '',
            industriDesc: '',
            tahunMulai: '',
            tahunSelesai: '',
            gajiTerakhir: '',
            jumlahBawahan: '',
            industriName: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    onAddFamily = (e) => {
        const { handleState, source, data } = this.props
        e.preventDefault();
        let _this = this
        this.props.form.validateFields([
            'keluarga',
            'usia',
            'pendidikanTerakhir',
            'pekerjaan'
        ], (err, values) => {
            if (!err) {
                let _pendidikanTerakhir = source.Degree.find(x => x.id === _this.state.pendidikanTerakhir)
                let dataParam = {
                    FLKFamilyStatusId: _this.state.FLKFamilyStatusId,
                    FamilyId: _this.state.isEditFamily ? _this.state.FamilyId : data.tableFamily.length + 1,
                    keluarga: source.FamilyStatus.find(x => x.id === _this.state.keluarga).name,
                    keluargaId: _this.state.keluarga,
                    usia: _this.state.usia,
                    status: _this.state.status,
                    pendidikanTerakhir: _pendidikanTerakhir ? _pendidikanTerakhir.name : '',
                    pendidikanTerakhirId: _this.state.pendidikanTerakhir,
                    pekerjaan: _this.state.pekerjaan ? source.Occupation.find(x => x.id === _this.state.pekerjaan).name : '',
                    pekerjaanId: _this.state.pekerjaan ? _this.state.pekerjaan : ''
                }
                let foundIdx
                if (_this.state.isEditFamily) {
                    if (_this.state.FLKFamilyStatusId === 0) {
                        foundIdx = data.tableFamily.findIndex(x => x.FamilyId === _this.state.FamilyId)
                    } else {
                        foundIdx = data.tableFamily.findIndex(x => x.FLKFamilyStatusId === _this.state.FLKFamilyStatusId)
                    }
                    data.tableFamily[foundIdx] = dataParam
                } else {
                    data.tableFamily.push(dataParam)
                }
                handleState('tableFamily', data.tableFamily)
                _this.setState({
                    onSubmit: !_this.state.onSubmit,
                    isEditFamily: false,
                    FLKFamilyStatusId: 0,
                    FamilyId: 0,
                    keluarga: '',
                    usia: '',
                    status: false,
                    pendidikanTerakhir: '',
                    pekerjaan: '',
                })
                _this.props.form.resetFields()
            } else {
                _this.setState({ onSubmit: !_this.state.onSubmit })
            }
        })
    }

    onDeleteFamily = (idx) => {
        const { handleState, data } = this.props
        data.tableFamily.splice(idx, 1)
        handleState('tableFamily', data.tableFamily)
    }

    onEditFamily = (idx) => {
        const { data } = this.props
        let _this = this
        _this.setState({
            onSubmit: !_this.state.onSubmit,
            isEditFamily: true,
            FLKFamilyStatusId: data.tableFamily[idx].FLKFamilyStatusId,
            FamilyId: data.tableFamily[idx].FamilyId,
            keluarga: data.tableFamily[idx].keluargaId,
            usia: data.tableFamily[idx].usia,
            status: data.tableFamily[idx].status,
            pendidikanTerakhir: data.tableFamily[idx].pendidikanTerakhirId,
            pekerjaan: data.tableFamily[idx].pekerjaanId
        })
        this.props.form.setFieldsValue({
            FLKFamilyStatusId: data.tableFamily[idx].FLKFamilyStatusId,
            FamilyId: data.tableFamily[idx].FamilyId,
            keluarga: data.tableFamily[idx].keluargaId,
            usia: data.tableFamily[idx].usia,
            status: data.tableFamily[idx].status,
            pendidikanTerakhir: data.tableFamily[idx].pendidikanTerakhirId,
            pekerjaan: data.tableFamily[idx].pekerjaanId
        })
    }

    onAddJobExperience = (e) => {
        const { handleState, source, data } = this.props
        e.preventDefault();
        let _this = this
        this.props.form.validateFields([
            'namaInstitusi',
            'jabatan',
            'posisi',
            'tipePosisi',
            'descPekerjaan1',
            'descPekerjaan2',
            // 'descPekerjaan3',
            // 'improvement',
            'bidangKerja1',
            // 'bidangKerja2',
            // 'bidangKerja3',
            'improvement',
            'industri',
            'industriDesc',
            'tahunMulai',
            'tahunSelesai',
            'gajiTerakhir',
            // 'jumlahBawahan'
        ], (err, values) => {
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
                    JobExperienceId: _this.state.isEditJobExperience ? _this.state.JobExperienceId : data.tableJobExperience.length + 1,
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
                    improvement: _this.state.improvement,
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
                    jumlahBawahan: _this.state.jumlahBawahan,
                    readMoreJob: false,
                    readMoreImprove: false,
                }
                let foundIdx
                if (_this.state.isEditJobExperience) {
                    if (_this.state.WorkExperienceId === 0) {
                        foundIdx = data.tableJobExperience.findIndex(x => x.JobExperienceId === _this.state.JobExperienceId)
                    } else {
                        foundIdx = data.tableJobExperience.findIndex(x => x.WorkExperienceId === _this.state.WorkExperienceId)
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
                    improvement: '',
                    bidangKerja1: '',
                    bidangKerja2: '',
                    bidangKerja3: '',
                    industri: '',
                    industriDesc: '',
                    tahunMulai: '',
                    tahunSelesai: '',
                    gajiTerakhir: '',
                    jumlahBawahan: '',
                    industriName: '',
                })
                this.props.form.resetFields()
            } else {
                this.setState({
                    onSubmit: !this.state.onSubmit
                })
            }
        })
    }

    onDeleteJobExperience = (idx) => {
        const { handleState, data } = this.props
        data.tableJobExperience.splice(idx, 1)
        handleState('tableJobExperience', data.tableJobExperience)
    }

    onEditJobExperience = (idx) => {
        const { data } = this.props
        let _this = this
        if (data.tableJobExperience[idx].tipePosisi.toLowerCase().includes("non")) {
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
            improvement: data.tableJobExperience[idx].improvement,
            bidangKerja1: data.tableJobExperience[idx].bidangKerja1Id,
            bidangKerja2: data.tableJobExperience[idx].bidangKerja2Id,
            bidangKerja3: data.tableJobExperience[idx].bidangKerja3Id,
            industri: data.tableJobExperience[idx].industriId,
            industriDesc: data.tableJobExperience[idx].industriDesc,
            industriName: data.tableJobExperience[idx].industri.toLowerCase().includes("other") ? "others" : '',
            tahunMulai: moment(data.tableJobExperience[idx].tahunMulai, 'MM/YYYY'),
            tahunSelesai: moment(data.tableJobExperience[idx].tahunSelesai, 'MM/YYYY'),
            gajiTerakhir: data.tableJobExperience[idx].gajiTerakhir,
            jumlahBawahan: data.tableJobExperience[idx].jumlahBawahan
        })
        this.props.form.setFieldsValue({
            WorkExperienceId: data.tableJobExperience[idx].WorkExperienceId,
            JobExperienceId: data.tableJobExperience[idx].JobExperienceId,
            namaInstitusi: data.tableJobExperience[idx].namaInstitusi,
            jabatan: data.tableJobExperience[idx].jabatanId,
            posisi: data.tableJobExperience[idx].posisi,
            tipePosisi: data.tableJobExperience[idx].tipePosisiId,
            descPekerjaan1: data.tableJobExperience[idx].descPekerjaan1,
            descPekerjaan2: data.tableJobExperience[idx].descPekerjaan2,
            descPekerjaan3: data.tableJobExperience[idx].descPekerjaan3,
            improvement: data.tableJobExperience[idx].improvement,
            bidangKerja1: data.tableJobExperience[idx].bidangKerja1Id,
            bidangKerja2: data.tableJobExperience[idx].bidangKerja2Id,
            bidangKerja3: data.tableJobExperience[idx].bidangKerja3Id,
            industri: data.tableJobExperience[idx].industriId,
            industriDesc: data.tableJobExperience[idx].industriDesc,
            tahunMulai: moment(data.tableJobExperience[idx].tahunMulai, 'MM/YYYY'),
            tahunSelesai: moment(data.tableJobExperience[idx].tahunSelesai, 'MM/YYYY'),
            gajiTerakhir: data.tableJobExperience[idx].gajiTerakhir,
            jumlahBawahan: data.tableJobExperience[idx].jumlahBawahan
        })
    }

    handleSetData = (property, value) => {
        this.setState({
            onSubmit: !this.state.onSubmit,
            [property]: value
        })
        this.props.form.setFieldsValue({
            [property]: value,
        })
        if (property === "industri") {
            this.props.form.setFieldsValue({
                "industriDesc": '',
            })
        }
        if (property === "usia" && _.inRange(value, 0, 6)) {
            this.setState({
                pendidikanTerakhir: ''
            })
            this.props.form.setFieldsValue({
                "pendidikanTerakhir": '',
            })
        }
        if (property == "isPresent" && value == false) {
            this.setState({
                [property]: value,
                "tahunSelesai": null,
            })
            this.props.form.setFieldsValue({
                tahunSelesai: null,
            })
        }
    }
    handleStateDate = (property, value) => {
        const { handleState } = this.props
        handleState(property, moment(value, 'DD/MM/YYYY'))
    }

    onChangePage = (noPage) => {
        const { handleStatePosisi, data, isDetails = false } = this.props
        let _this = this
        let improvement = data.tableJobExperience.filter(x => x.improvement === "")
        let sallary = data.tableJobExperience.filter(x => x.gajiTerakhir === 0)
        let isSpouse = data.tableFamily.filter(x => x.keluarga.toLowerCase().includes('suami'))
        let isTableFamily = data.tableFamily.length
        let isTableJobExp = data.tableJobExperience.length
        this.props.form.validateFieldsAndScroll([
            'sejakTahun',
            'problemSituasi',
            'problemTindakan',
            'problemTugas',
            'problemHasil',
            'obstacleSituasi',
            'obstacleTindakan',
            'obstacleTugas',
            'obstacleHasil'], (err, values) => {
                if (noPage === 1) {
                    handleStatePosisi(noPage)
                } else {
                    if (!err) {
                        if (isDetails) {
                            handleStatePosisi(noPage)
                        } else {
                            if (data.statusPernikahan === "menikah" && isTableFamily === 0) {
                                messages("Info", "Mohon untuk melengkapi data Susunan Keluarga Inti", "info", false);
                            }
                            else if (data.statusPernikahan === "menikah" && isSpouse.length === 0) {
                                messages("Info", "Mohon untuk melengkapi data status Hubungan dengan keluarga Suami/Istri di Susunan Keluarga Inti", "info", false);
                            }
                            else if (isTableJobExp === 0) {
                                messages("Info", "Mohon untuk melengkapi data Pengalaman Kerja", "info", false);
                            }
                            else if (improvement.length !== 0 || sallary.length !== 0) {
                                messages("Info", "Mohon untuk melengkapi data yang belum lengkap pada bagian Pengalaman Kerja melalui action ubah", "info", false);
                            }
                            else {
                                handleStatePosisi(noPage)
                            }
                        }
                    } else {
                        if (isDetails) {
                            handleStatePosisi(noPage)
                        }
                        else _this.setState({ onSubmit: !_this.state.onSubmit })
                    }
                }
            })
    }

    showButton(text, data) {
        const { setReadMore } = this.props
        let id
        let from
        if (data.JobExperienceId) {
            id = data.JobExperienceId
            from = "new"
        } else {
            id = data.WorkExperienceId
            from = "old"
        }
        if (text.length > 45 && data.readMoreJob === false) {
            return (
                <Button onClick={() => setReadMore(id, from, true)}>Read more</Button>
            )
        }
        else if (text.length > 45 && data.readMoreJob === true) {
            return (
                <Button onClick={() => setReadMore(id, from, false)}>Read less</Button>
            )
        }
        else {
            return ""
        }
    }

    showButtonImprove(text, data) {
        const { setReadMoreImprove } = this.props
        let id
        let from
        if (data.JobExperienceId) {
            id = data.JobExperienceId
            from = "new"
        } else {
            id = data.WorkExperienceId
            from = "old"
        }
        if (text.length > 45 && data.readMoreImprove === false) {
            return (
                <Button onClick={() => setReadMoreImprove(id, from, true)}>Read more</Button>
            )
        }
        else if (text.length > 45 && data.readMoreImprove === true) {
            return (
                <Button onClick={() => setReadMoreImprove(id, from, false)}>Read less</Button>
            )
        }
        else {
            return ""
        }
    }

    render() {
        const { data, handleState, source, isDetails = false } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit } = this.state
        const { innerWidth: width, innerHeight: height } = window;

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        };

        const colStyle = {
            marginBottom: '-10px',
            position: "relative"
        };
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
        };

        const columnsFamily = [
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button
                            disabled={isDetails} onClick={() => this.onEditFamily(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button
                            disabled={isDetails} onClick={() => this.onDeleteFamily(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                )
            },
            {
                title: 'Keluarga',
                dataIndex: 'keluarga',
            },
            {
                title: 'Usia',
                dataIndex: 'usia',
            },
            {
                title: 'Pendidikan Terakhir',
                dataIndex: 'pendidikanTerakhir',
            },
            {
                title: 'Pekerjaan',
                dataIndex: 'pekerjaan',
            },
        ]

        const columnsJobExperience = [
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button
                            disabled={isDetails} onClick={() => this.onEditJobExperience(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button
                            disabled={isDetails} onClick={() => this.onDeleteJobExperience(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                ),
                width: 50
            },
            {
                title: 'Nama Institusi',
                dataIndex: 'namaInstitusi',
                width: 50
            },
            {
                title: 'Jabatan',
                dataIndex: 'jabatan',
                width: 50
            },
            {
                title: 'Deskripsi Pekerjaan',
                dataIndex: 'jobDescFullName',
                render: (text, data, idx) => {
                    return (
                        <>
                            <div style={data.readMoreJob ? {} : {
                                textOverflow: "ellipsis", width: "300px", overflow: "hidden", whiteSpace: "nowrap"
                            }}>
                                {text}
                            </div>
                            <div style={{ justifyContent: "flex-end", display: "flex" }}>
                                {this.showButton(text, data)}
                            </div>
                        </>
                    )
                },
                width: 100
            },
            {
                title: 'Improvement',
                dataIndex: 'improvement',
                render: (text, data, idx) => {
                    return (
                        <>
                            <div style={data.readMoreImprove ? {} : {
                                textOverflow: "ellipsis", width: "300px", overflow: "hidden", whiteSpace: "nowrap"
                            }}>
                                {text}
                            </div>
                            <div style={{ justifyContent: "flex-end", display: "flex" }}>
                                {this.showButtonImprove(text, data)}
                            </div>
                        </>
                    )
                },
                width: 100
            },
            {
                title: 'Tahun Mulai',
                dataIndex: 'tahunMulai',
                width: 50
            },
            {
                title: 'Tahun Selesai',
                dataIndex: 'tahunSelesai',
                width: 50
            },
            {
                title: 'Gaji Terakhir',
                dataIndex: 'gajiTerakhir',
                width: 50
            },
            {
                title: 'Jumlah Bawahan Langsung',
                dataIndex: 'jumlahBawahan',
                width: 50
            },
        ]


        return (
            <div>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
                        <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
                            <h3>C. Keluarga</h3>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={3} sm={3} xs={24}>
                            <h4>01. Status Pernikahan<span style={{ color: "red" }}>*</span></h4>
                            <Radio.Group style={isDetails ? { marginTop: 10, marginBottom: '24px' } : { marginTop: 10 }}
                                disabled={isDetails} onChange={(e) => { handleState('statusPernikahan', e.target.value) }} value={data.statusPernikahan}>
                                <Radio value="lajang">Lajang</Radio>
                                <Radio value="menikah">Menikah</Radio>
                            </Radio.Group>
                        </Col>
                    </Col>
                </Row>

                {
                    data.statusPernikahan === "menikah" ?
                        <Form onSubmit={this.onAddFamily.bind(this)}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24}>
                                    <Col md={12} sm={12} xs={24} style={colStyle}>
                                        <div style={{ width: '99%', marginTop: 10, }}>
                                            <Datepicker
                                                labelField="Sejak Tahun"
                                                disabled={isDetails}
                                                name="sejakTahun"
                                                id="sejakTahun"
                                                isRequired={true}
                                                initialValue={data.sejakTahun}
                                                formItemLayout={formItemLayoutDate}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                onSubmit={onSubmit}
                                                format={'DD/MM/YYYY'}
                                                onChange={(e, value) => this.handleStateDate('sejakTahun', value)}
                                                validation={
                                                    [
                                                        {
                                                            required: true,
                                                            message: "Please enter the Sejak Tahun"
                                                        }
                                                    ]
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Col>
                            </Row>

                            <Row justify="start">
                                <Col md={24} sm={24} xs={24}>
                                    <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                        <h4>02. Susunan Keluarga Inti (jika "Lajang", silahkan dikosongkan)<span style={{ color: "red" }}>*</span></h4>
                                    </div>
                                </Col>
                                <Col md={12} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="Status Hubungan dengan Keluarga"
                                        name="keluarga"
                                        id="keluarga"
                                        isRequired={true}
                                        initialValue={this.state.keluarga}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.FamilyStatus}
                                        onChange={(e) => this.handleSetData('keluarga', e)}
                                        disabled={isDetails}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '91%'}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Keluarga"
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                                <Col md={12} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="Pendidikan Terakhir"
                                        name="pendidikanTerakhir"
                                        id="pendidikanTerakhir"
                                        isRequired={true}
                                        initialValue={this.state.pendidikanTerakhir}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Degree}
                                        onChange={(e) => this.handleSetData('pendidikanTerakhir', e)}
                                        // disabled={isDetails}
                                        disabled={
                                            this.state.usia !== "" ?
                                                _.inRange(this.state.usia, 0, 6) ?
                                                    true
                                                    : isDetails
                                                : isDetails
                                        }
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '91%'}
                                        validation={
                                            [
                                                {
                                                    required: _.inRange(this.state.usia, 0, 6) ? false : true,
                                                    message: "Please enter the Pendidikan Terakhir"
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                                <Col md={12} sm={24} xs={24} style={colStyle}>
                                    <Col md={4} sm={4} xs={4} style={{ colStyle, marginRight: '30px' }}>
                                        <Input
                                            labelField="Usia"
                                            name="usia"
                                            id="usia"
                                            isRequired={true}
                                            initialValue={this.state.usia}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            disabled={isDetails}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            onSubmit={onSubmit}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Usia"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={20} sm={16} xs={16} style={{ marginBottom: '-10px', marginTop: '25px' }}>
                                        <Checkbox checked={this.state.status} disabled={isDetails} onChange={(e) => this.handleSetData('status', e.target.checked)}><b>Alm./Almh.</b></Checkbox>
                                    </Col>

                                </Col>
                                <Col md={12} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="Pekerjaan"
                                        name="pekerjaan"
                                        id="pekerjaan"
                                        isRequired={_.inRange(this.state.usia, 0, 6) ? false : true}
                                        initialValue={this.state.pekerjaan}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={isDetails}
                                        Form={Form}
                                        data={source.Occupation}
                                        onChange={(e) => this.handleSetData('pekerjaan', e)}
                                        onSubmit={onSubmit}
                                        width={width < 576 ? '100%' : '91%'}
                                        validation={
                                            [
                                                {
                                                    required: _.inRange(this.state.usia, 0, 6) ? false : true,
                                                    message: "Please enter the Pekerjaan"
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24}>
                                    <Button
                                        disabled={isDetails} type="primary" htmlType="submit">Tambah Keluarga Inti</Button>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                                    <Table
                                        columns={columnsFamily}
                                        dataSource={data.tableFamily}
                                        pagination={false}
                                        scroll={{ x: 1000 }}
                                    />
                                </Col>
                            </Row>
                        </Form>
                        : null
                }

                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
                        <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
                            <h3>D. Pengalaman Kerja</h3>
                        </div>
                    </Col>
                </Row>

                <Form onSubmit={this.onAddJobExperience.bind(this)}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                <h4>01. Kerja<span style={{ color: "red" }}>*</span></h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Row>
                                <Col md={12} sm={12} xs={24}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Nama Institusi"
                                            name="namaInstitusi"
                                            id="namaInstitusi"
                                            isRequired={true}
                                            initialValue={this.state.namaInstitusi}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            disabled={isDetails}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Nama Institusi"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Jabatan"
                                            name="jabatan"
                                            id="jabatan"
                                            isRequired={true}
                                            initialValue={this.state.jabatan}
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            data={source.PositionTitle}
                                            onChange={(e) => this.handleSetData('jabatan', e)}
                                            disabled={isDetails}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '91%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Jabatan"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Posisi"
                                            name="posisi"
                                            id="posisi"
                                            isRequired={true}
                                            initialValue={this.state.posisi}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            disabled={isDetails}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Posisi"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Tipe Posisi"
                                            name="tipePosisi"
                                            id="tipePosisi"
                                            isRequired={true}
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
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Jabatan"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                                            <TextArea
                                                labelField="Deskripsi Pekerjaan"
                                                placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom berikut terlebih dahulu"
                                                id="descPekerjaan1"
                                                isRequired={true}
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                initialValue={this.state.descPekerjaan1}
                                                disabled={isDetails}
                                                onSubmit={onSubmit}
                                                onChange={(e) => this.handleSetData('descPekerjaan1', e.target.value)}
                                                validation={
                                                    [
                                                        {
                                                            required: true,
                                                            message: "Please enter the Deskripsi Pekerjaan"
                                                        }
                                                    ]
                                                }
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
                                                maxLength={500}
                                                initialValue={this.state.descPekerjaan2}
                                                disabled={isDetails}
                                                onSubmit={onSubmit}
                                                onChange={(e) => this.handleSetData('descPekerjaan2', e.target.value)}
                                                validation={
                                                    this.state.descPekerjaan3 !== "" ?
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the Deskripsi Pekerjaan (Lanjutan 1)"
                                                            }
                                                        ]
                                                        :
                                                        [
                                                            {
                                                                message: "Please enter the Deskripsi Pekerjaan (Lanjutan 1)"
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
                                                placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom Deskripsi Pekerjaan dan Deskripsi Pekerjaan (Lanjutan 1) terlebih dahulu"
                                                id="deskripsiPekerjaan3"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                maxLength={500}
                                                initialValue={this.state.descPekerjaan3}
                                                disabled={isDetails}
                                                onChange={(e) => this.handleSetData('descPekerjaan3', e.target.value)}
                                                validation={
                                                    [
                                                        {
                                                            message: "Please enter the Deskripsi Pekerjaan (Lanjutan 2)"
                                                        }
                                                    ]
                                                }
                                            />
                                        </div>
                                    </Col>

                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                                            <TextArea
                                                labelField="Perbaikan (improvement) yang pernah dilakukan terkait pekerjaan diatas"
                                                placeholder="Improvement"
                                                id="improvement"
                                                isRequired={true}
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                initialValue={this.state.improvement}
                                                disabled={isDetails}
                                                onSubmit={onSubmit}
                                                onChange={(e) => this.handleSetData('improvement', e.target.value)}
                                                validation={
                                                    [
                                                        {
                                                            required: true,
                                                            message: "Please enter the Deskripsi Improvement"
                                                        }
                                                    ]
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} sm={12} xs={24}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Bidang Kerja"
                                            name="bidangKerja1"
                                            id="bidangKerja1"
                                            isRequired={true}
                                            initialValue={this.state.bidangKerja1}
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            data={source.Function}
                                            onChange={(e) => this.handleSetData('bidangKerja1', e)}
                                            disabled={isDetails}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '91%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Bidang Kerja 1"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    {
                                        this.state.isTipePosisi === "non management trainee" || this.state.isTipePosisi === "" ?
                                            null
                                            :
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
                                                        onChange={(e) => this.handleSetData('bidangKerja2', e)}
                                                        disabled={isDetails}
                                                        width={width < 576 ? '100%' : '91%'}
                                                        validation={
                                                            [
                                                                {
                                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                                }
                                                            ]
                                                        }
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
                                                        onChange={(e) => this.handleSetData('bidangKerja3', e)}
                                                        disabled={isDetails}
                                                        width={width < 576 ? '100%' : '91%'}
                                                        validation={
                                                            [
                                                                {
                                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                                }
                                                            ]
                                                        }
                                                    />
                                                </Col>
                                            </React.Fragment>
                                    }
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Industri"
                                            name="industri"
                                            id="industri"
                                            isRequired={true}
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
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Industri"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    {this.state.industriName === 'others' ?
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
                                                validation={
                                                    [
                                                        {
                                                            required: true,
                                                            message: "Please enter the Industri Others"
                                                        },
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                            message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                        }
                                                    ]
                                                }
                                            />
                                        </Col>
                                        : null}
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            labelField="Tahun Mulai"
                                            disabled={isDetails}
                                            name="tahunMulai"
                                            id="tahunMulai"
                                            mode="month"
                                            format={'MM/YYYY'}
                                            isRequired={true}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.tahunMulai}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleSetData.bind(this)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tahun Mulai"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            labelField="Tahun Selesai"
                                            disabled={this.state.isPresent == true ? true : isDetails}
                                            name="tahunSelesai"
                                            id="tahunSelesai"
                                            mode="month"
                                            format={'MM/YYYY'}
                                            isRequired={true}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.tahunSelesai}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleSetData.bind(this)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tahun Selesai"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={12} sm={12} xs={24} style={colStyle}>
                                        <Checkbox
                                            labelField="Hingga saat ini"
                                            name="present"
                                            id="present"
                                            initialValue={this.state.isPresent}
                                            Form={Form}
                                            onChange={(e, data) => {
                                                this.handleSetData("isPresent", !this.state.isPresent);
                                                this.handleSetData("tahunSelesai", moment("01/12/9999"));
                                            }}
                                            getFieldDecorator={getFieldDecorator}
                                            text="Ya"
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Gaji Terakhir"
                                            name="gajiTerakhir"
                                            id="gajiTerakhir"
                                            isRequired={true}
                                            initialValue={this.state.gajiTerakhir}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            disabled={isDetails}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Gaji"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[1-9][0-9]{0,15}$/g),
                                                        message: "Please update salary to more than Rp 0"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Jumlah Bawahan Langsung"
                                            name="jumlahBawahan"
                                            id="jumlahBawahan"
                                            initialValue={this.state.jumlahBawahan}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            disabled={isDetails}
                                            width={width < 576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        message: "Please enter the Jumlah Bawahan"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Button
                                disabled={isDetails} type="primary" htmlType="submit">Tambah Pengalaman Kerja</Button>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                            <Table
                                columns={columnsJobExperience}
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
                            <h4>03. Ceritakan pengalaman ketika Saudara mengatasi permasalahan yang paling sulit<span style={{ color: "red" }}>*</span></h4>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Situasi"
                                id="problemSituasi"
                                placeholder="Situasi permasalahan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemSituasi}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('problemSituasi', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Situasi"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Tindakan"
                                id="problemTindakan"
                                placeholder="Tindakan yang dilakukan"
                                placeholder="Tindakan yang dilakukan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemTindakan}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('problemTindakan', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Tindakan"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Tugas"
                                id="problemTugas"
                                placeholder="Tugas dalam mengatasi permasalahan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemTugas}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('problemTugas', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Tugas"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Hasil"
                                id="problemHasil"
                                placeholder="Hasil tindakan yang dilakukan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemHasil}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('problemHasil', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Hasil"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                            <h4>04. Ceritakan pengalaman ketika Saudara mengatasi hambatan/tantangan yang sangat besar dalam menyelesaikan tugas<span style={{ color: "red" }}>*</span></h4>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Situasi"
                                id="obstacleSituasi"
                                placeholder="Situasi permasalahan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleSituasi}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('obstacleSituasi', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Situasi"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Tindakan"
                                id="obstacleTindakan"
                                placeholder="Tindakan yang dilakukan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleTindakan}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('obstacleTindakan', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Tindakan"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Tugas"
                                id="obstacleTugas"
                                placeholder="Tugas dalam mengatasi permasalahan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleTugas}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('obstacleTugas', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Tugas"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={width < 576 ? { width: '100%' } : { width: '137%' }}>
                            <TextArea
                                labelField="Hasil"
                                id="obstacleHasil"
                                placeholder="Hasil tindakan yang dilakukan"
                                isRequired={true}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleHasil}
                                disabled={isDetails}
                                onSubmit={onSubmit}
                                onChange={(e) => handleState('obstacleHasil', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: !isDetails,
                                            message: "Please enter the Hasil"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{ paddingBottom: 20 }}>
                        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                            <Icon onClick={() => this.onChangePage(1)} style={{ cursor: 'pointer' }} type="left-circle" style={{ fontSize: 30 }} />
                            <span style={{ fontSize: 20 }}>2/3</span>
                            <Icon onClick={() => this.onChangePage(3)} style={{ cursor: 'pointer' }} type="right-circle" style={{ fontSize: 30 }} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedForm = Form.create()(Form2);
export default WrappedForm