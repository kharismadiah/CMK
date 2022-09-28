import React, { Component } from 'react';
import { Col, Row, Icon, Upload, Radio, Table } from 'antd';

import Form from '../../../../uielements/form'
import Input from '../../../../CustomComponentAntd/customInput';
import InputNumber from '../../../../CustomComponentAntd/customInputNumber';
import Button from '../../../../uielements/button';
import Select from '../../../../CustomComponentAntd/customSelect';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import TextArea from '../../../../CustomComponentAntd/customTextArea';
import DatepickerMode from '../../../../CustomComponentAntd/customDatePickerMode';
import { messages } from "../../../../../components/messageBox"
import ImgUser from '../../../../../image/ImgUser.png'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group';

class Form1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            onCheckOther: false,
            EducationDetailsId: 0,
            PendidikanId: 0,
            tingkat: '',
            programStudi: '',
            namaInstitusi: '',
            namaInstitusiOthers: '',
            isInstitusiOther: '',
            tahunMasuk: '',
            kota: '',
            kotaOthers: '',
            isKotaOther: '',
            tahunLulus: '',
            jurusan: '',
            gpaNem: '',
            outOf: '',
            isEditPendidikan: false,
            isJurusanOther: '',

            FLKNonFormalEducationId: 0,
            NonformalId: 0,
            namaProgram: '',
            tahun: '',
            penyelenggara: '',
            keterangan: '',
            isEditInformal: false,

            OrganizationalExperienceId: 0,
            OrganisasiId: 0,
            namaOrganisasi: '',
            lingkup: '',
            jabatan: '',
            isEditOrganization: false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    onUpload = (e) => {
        const { handleState } = this.props
        if (e.size < 2097152) {
            var craeteUrl = URL.createObjectURL(e);
            handleState('photoUrl', craeteUrl)
            // handleState('Photo', e)
        } else {
            messages("Warning", "Image must smaller than 2MB!!", "warning", false)
        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        const { handleState } = this.props
        if (info.file.size < 2097152) {
            this.getBase64(info.file.originFileObj, imageUrl =>
                handleState('Photo', imageUrl)
            );
        }
    };

    handleStateForm = (property, value) => {
        this.setState({
            onSubmit: !this.state.onSubmit,
            [property]: value
        })
        this.props.form.setFieldsValue({ [property]: value })

        if (property === "kota") {
            this.setState({
                onSubmit: !this.state.onSubmit,
                kotaOthers: ''
            })
            this.props.form.setFieldsValue({ kotaOthers: '' })
        } else if (property === "namaInstitusi") {
            this.setState({
                onSubmit: !this.state.onSubmit,
                namaInstitusiOthers: ''
            })
            this.props.form.setFieldsValue({ namaInstitusiOthers: '' })
        }
    }

    onAddPendidikan = (e) => {
        const { handleState, source, data } = this.props
        e.preventDefault();
        let _this = this
        this.props.form.validateFields([
            'tingkat',
            'programStudi',
            'namaInstitusi',
            'namaInstitusiOthers',
            'tahunMasuk',
            'kota',
            'kotaOthers',
            'tahunLulus',
            'jurusan',
            'gpaNem',
            'outOf'], (err, values) => {
                if (!err) {
                    let dataParam = {
                        EducationDetailsId: _this.state.EducationDetailsId,
                        PendidikanId: _this.state.isEditPendidikan ? _this.state.PendidikanId : data.tablePendidikan.length + 1,
                        Tingkat: source.Degree.find(x => x.id === _this.state.tingkat).name,
                        TingkatId: _this.state.tingkat,

                        NamaInstitution: source.Institute.find(x => x.id === _this.state.namaInstitusi).name,
                        NamaInstitutionId: _this.state.namaInstitusi,
                        NamaInstitusiOthers: _this.state.namaInstitusiOthers,
                        Kota: source.City.find(x => x.id === _this.state.kota).name,
                        KotaID: _this.state.kota,
                        KotaOthers: _this.state.kotaOthers,
                        Jurusan: source.Major.find(x => x.id === _this.state.jurusan).name,
                        JurusanID: _this.state.jurusan,

                        ProgramStudi: _this.state.programStudi,
                        TahunMasuk: moment(_this.state.tahunMasuk).format("YYYY"),
                        TahunLulus: moment(_this.state.tahunLulus).format("YYYY"),
                        GpaNem: _this.state.gpaNem,
                        OutOf: _this.state.outOf,
                        JurusanOthers: _this.state.jurusanOthers
                    }
                    let foundIdx
                    if (_this.state.isEditPendidikan) {
                        if (_this.state.EducationDetailsId === 0) {
                            foundIdx = data.tablePendidikan.findIndex(x => x.PendidikanId === _this.state.PendidikanId)
                        } else {
                            foundIdx = data.tablePendidikan.findIndex(x => x.EducationDetailsId === _this.state.EducationDetailsId)
                        }
                        data.tablePendidikan[foundIdx] = dataParam
                    } else {
                        data.tablePendidikan.push(dataParam)
                    }
                    handleState('tablePendidikan', data.tablePendidikan)
                    _this.setState({
                        onSubmit: !_this.state.onSubmit,
                        isEditPendidikan: false,
                        EducationDetailsId: 0,
                        PendidikanId: 0,
                        tingkat: '',
                        programStudi: '',
                        namaInstitusi: '',
                        namaInstitusiOthers: '',
                        tahunMasuk: '',
                        kota: '',
                        kotaOthers: '',
                        tahunLulus: '',
                        jurusan: '',
                        gpaNem: '',
                        outOf: '',
                        jurusanOthers: '',
                        isKotaOther: '',
                        isInstitusiOther: '',
                        isJurusanOther: '',
                    })
                    _this.props.form.resetFields()
                } else {
                    _this.setState({ onSubmit: !_this.state.onSubmit })
                }
            })
    }

    onEditPendidikan = (idx) => {
        const { data, source } = this.props
        let _this = this
        let value = source.Degree.find((obj) => obj.id == data.tablePendidikan[idx].TingkatId)
        let name = value.name.toLowerCase()
        if (name.includes("sekolah")) {
            this.setState({ outOf: 400 })
            this.props.form.setFieldsValue({ outOf: 400 })
        } else {
            this.setState({ outOf: parseFloat(4.00).toFixed(2) })
            this.props.form.setFieldsValue({ outOf: parseFloat(4.00).toFixed(2) })
        }

        if (data.tablePendidikan[idx].NamaInstitution.toLowerCase() === "others" || data.tablePendidikan[idx].NamaInstitution.toLowerCase() === "other") {
            _this.setState({ isInstitusiOther: "others" })
        } else {
            _this.setState({ isInstitusiOther: "" })
        }
        if (data.tablePendidikan[idx].Kota.toLowerCase() === "others" || data.tablePendidikan[idx].Kota.toLowerCase() === "other") {
            _this.setState({ isKotaOther: "others" })
        } else {
            _this.setState({ isKotaOther: "" })
        }
        if (data.tablePendidikan[idx].Jurusan.toLowerCase() === "others" || data.tablePendidikan[idx].Jurusan.toLowerCase() === "other") {
            _this.setState({ isJurusanOther: "others" })
        } else {
            _this.setState({ isJurusanOther: "" })
        }

        _this.setState({
            onSubmit: !_this.state.onSubmit,
            isEditPendidikan: true,
            EducationDetailsId: data.tablePendidikan[idx].EducationDetailsId,
            PendidikanId: data.tablePendidikan[idx].PendidikanId,
            tingkat: data.tablePendidikan[idx].TingkatId,
            programStudi: data.tablePendidikan[idx].ProgramStudi,
            namaInstitusi: data.tablePendidikan[idx].NamaInstitutionId,
            namaInstitusiOthers: data.tablePendidikan[idx].NamaInstitusiOthers,
            tahunMasuk: moment(data.tablePendidikan[idx].TahunMasuk, 'YYYY'),
            kota: data.tablePendidikan[idx].KotaID,
            kotaOthers: data.tablePendidikan[idx].KotaOthers,
            tahunLulus: moment(data.tablePendidikan[idx].TahunLulus, 'YYYY'),
            jurusan: data.tablePendidikan[idx].JurusanID,
            // outOf: data.tablePendidikan[idx].OutOf,
            gpaNem: data.tablePendidikan[idx].GpaNem,
            jurusanOthers: data.tablePendidikan[idx].JurusanOthers
        })
        this.props.form.setFieldsValue({
            onSubmit: !_this.state.onSubmit,
            isEditPendidikan: true,
            EducationDetailsId: data.tablePendidikan[idx].EducationDetailsId,
            PendidikanId: data.tablePendidikan[idx].PendidikanId,
            tingkat: data.tablePendidikan[idx].TingkatId,
            programStudi: data.tablePendidikan[idx].ProgramStudi,
            namaInstitusi: data.tablePendidikan[idx].NamaInstitutionId,
            namaInstitusiOthers: data.tablePendidikan[idx].NamaInstitusiOthers,
            tahunMasuk: moment(data.tablePendidikan[idx].TahunMasuk, 'YYYY'),
            kota: data.tablePendidikan[idx].KotaID,
            kotaOthers: data.tablePendidikan[idx].KotaOthers,
            tahunLulus: moment(data.tablePendidikan[idx].TahunLulus, 'YYYY'),
            jurusan: data.tablePendidikan[idx].JurusanID,
            // outOf: data.tablePendidikan[idx].OutOf,
            gpaNem: data.tablePendidikan[idx].GpaNem,
            jurusanOthers: data.tablePendidikan[idx].JurusanOthers
        })
        this.handleStateCustom('tingkat', data.tablePendidikan[idx].TingkatId)
    }

    onDeletePendidikan = (idx) => {
        const { handleState, data } = this.props
        data.tablePendidikan.splice(idx, 1)
        handleState('tablePendidikan', data.tablePendidikan)
    }

    onAddPelatihan = (e) => {
        const { handleState, data } = this.props
        e.preventDefault();
        let _this = this
        this.props.form.validateFields([
            'namaProgram',
            'tahun',
            'penyelenggara'], (err, values) => {
                if (!err) {
                    let dataParam = {
                        FLKNonFormalEducationId: _this.state.FLKNonFormalEducationId,
                        NonformalId: _this.state.isEditInformal ? _this.state.NonformalId : data.tablePelatihan.length + 1,
                        NamaProgram: _this.state.namaProgram,
                        Penyelenggara: _this.state.penyelenggara,
                        Tahun: moment(_this.state.tahun).format("YYYY"),
                        Keterangan: _this.state.keterangan
                    }
                    let foundIdx
                    if (_this.state.isEditInformal) {
                        if (_this.state.FLKNonFormalEducationId === 0) {
                            foundIdx = data.tablePelatihan.findIndex(x => x.NonformalId === _this.state.NonformalId)
                        } else {
                            foundIdx = data.tablePelatihan.findIndex(x => x.FLKNonFormalEducationId === _this.state.FLKNonFormalEducationId)
                        }
                        data.tablePelatihan[foundIdx] = dataParam
                    } else {
                        data.tablePelatihan.push(dataParam)
                    }
                    handleState('tablePelatihan', data.tablePelatihan)
                    _this.setState({
                        onSubmit: !_this.state.onSubmit,
                        isEditInformal: false,
                        FLKNonFormalEducationId: 0,
                        NonformalId: 0,
                        namaProgram: '',
                        penyelenggara: '',
                        tahun: '',
                        keterangan: ''
                    })
                    _this.props.form.resetFields()
                } else {
                    _this.setState({ onSubmit: !_this.state.onSubmit })
                }
            })
    }

    onEditPelatihan = (idx) => {
        const { data } = this.props
        let _this = this
        _this.setState({
            onSubmit: !_this.state.onSubmit,
            isEditInformal: true,
            FLKNonFormalEducationId: data.tablePelatihan[idx].FLKNonFormalEducationId,
            NonformalId: data.tablePelatihan[idx].NonformalId,
            namaProgram: data.tablePelatihan[idx].NamaProgram,
            penyelenggara: data.tablePelatihan[idx].Penyelenggara,
            tahun: moment(data.tablePelatihan[idx].Tahun, 'YYYY'),
            keterangan: data.tablePelatihan[idx].Keterangan
        })
        this.props.form.setFieldsValue({
            onSubmit: !_this.state.onSubmit,
            isEditInformal: true,
            FLKNonFormalEducationId: data.tablePelatihan[idx].FLKNonFormalEducationId,
            NonformalId: data.tablePelatihan[idx].NonformalId,
            namaProgram: data.tablePelatihan[idx].NamaProgram,
            penyelenggara: data.tablePelatihan[idx].Penyelenggara,
            tahun: moment(data.tablePelatihan[idx].Tahun, 'YYYY'),
            keterangan: data.tablePelatihan[idx].Keterangan
        })
    }

    onDeletePelatihan = (idx) => {
        const { handleState, data } = this.props
        data.tablePelatihan.splice(idx, 1)
        handleState('tablePelatihan', data.tablePelatihan)
    }

    onAddOrganisasi = (e) => {
        const { handleState, source, data } = this.props
        e.preventDefault();
        let _this = this
        this.props.form.validateFields([
            'namaOrganisasi',
            'jabatan',
            'lingkup'], (err, values) => {
                if (!err) {
                    let dataParam = {
                        OrganizationalExperienceId: _this.state.OrganizationalExperienceId,
                        OrganisasiId: _this.state.isEditOrganization ? _this.state.OrganisasiId : data.tableOrganisasi.length + 1,
                        NamaOrganisasi: _this.state.namaOrganisasi,
                        Jabatan: source.OrganizationTitle.find(x => x.id === _this.state.jabatan).name,
                        JabatanId: _this.state.jabatan,
                        Lingkup: source.OrganizationScope.find(x => x.id === _this.state.lingkup).name,
                        LingkupId: _this.state.lingkup,
                    }
                    let foundIdx
                    if (_this.state.isEditOrganization) {
                        if (_this.state.OrganizationalExperienceId === 0) {
                            foundIdx = data.tableOrganisasi.findIndex(x => x.OrganisasiId === _this.state.OrganisasiId)
                        } else {
                            foundIdx = data.tableOrganisasi.findIndex(x => x.OrganizationalExperienceId === _this.state.OrganizationalExperienceId)
                        }
                        data.tableOrganisasi[foundIdx] = dataParam
                    } else {
                        data.tableOrganisasi.push(dataParam)
                    }
                    handleState('tableOrganisasi', data.tableOrganisasi)
                    _this.setState({
                        onSubmit: !_this.state.onSubmit,
                        isEditOrganization: false,
                        OrganizationalExperienceId: 0,
                        OrganisasiId: 0,
                        namaOrganisasi: '',
                        jabatan: '',
                        lingkup: ''
                    })
                    _this.props.form.resetFields()
                } else {
                    _this.setState({ onSubmit: !_this.state.onSubmit })
                }
            })
    }

    onEditOrganisasi = (idx) => {
        const { data } = this.props
        let _this = this
        _this.setState({
            onSubmit: !_this.state.onSubmit,
            isEditOrganization: true,
            OrganizationalExperienceId: data.tableOrganisasi[idx].OrganizationalExperienceId,
            OrganisasiId: data.tableOrganisasi[idx].OrganisasiId,
            namaOrganisasi: data.tableOrganisasi[idx].NamaOrganisasi,
            jabatan: data.tableOrganisasi[idx].JabatanId,
            lingkup: data.tableOrganisasi[idx].LingkupId
        })

        this.props.form.setFieldsValue({
            onSubmit: !_this.state.onSubmit,
            isEditOrganization: true,
            OrganizationalExperienceId: data.tableOrganisasi[idx].OrganizationalExperienceId,
            OrganisasiId: data.tableOrganisasi[idx].OrganisasiId,
            namaOrganisasi: data.tableOrganisasi[idx].NamaOrganisasi,
            jabatan: data.tableOrganisasi[idx].JabatanId,
            lingkup: data.tableOrganisasi[idx].LingkupId
        })
    }

    onDeleteOrganisasi = (idx) => {
        const { handleState, data } = this.props
        data.tableOrganisasi.splice(idx, 1)
        handleState('tableOrganisasi', data.tableOrganisasi)
    }

    handleStateCustom = (property, value) => {
        const { source } = this.props
        if (property === "tingkat") {
            let data = source.Degree.find((obj) => obj.id == value)
            let name = data.name.toLowerCase()
            if (name.includes("sekolah")) {
                this.setState({
                    onSubmit: !this.state.onSubmit,
                    [property]: value,
                    outOf: 400
                })
                this.props.form.setFieldsValue({
                    [property]: value,
                    outOf: 400
                })
            } else {
                this.setState({
                    onSubmit: !this.state.onSubmit,
                    [property]: value,
                    outOf: parseFloat(4.00).toFixed(2)
                })
                this.props.form.setFieldsValue({
                    [property]: value,
                    outOf: parseFloat(4.00).toFixed(2)
                })
            }
        }
    }

    handleStateDate = (property, value) => {
        const { handleState } = this.props
        handleState(property, moment(value, 'DD/MM/YYYY'))
    }

    onChangePage = (property, value) => {
        const { data, handleStatePosisi, isDetails = false } = this.props
        let isTablePendidikan = data.tablePendidikan.length
        let kota = data.tablePendidikan.filter(x => x.Kota === "")
        let prodi = data.tablePendidikan.filter(x => x.ProgramStudi === "")
        this.props.form.validateFieldsAndScroll([
            'namaLengkap',
            'tempatLahir',
            'tanggalLahir',
            'kewarganegaraan',
            'kewarganegaraanOthers',
            'alamatLengkap',
            'noHP1',
            'email',
            'upload',
            'judulSkripsi'
        ], (err, values) => {
            if (!err) {
                if (isDetails) {
                    handleStatePosisi(2)
                } else {
                    if (isTablePendidikan === 0) {
                        messages("Info", "Mohon untuk melengkapi data Pendidikan Formal", "info", false);
                    }
                    else if (kota.length !== 0 || prodi.length !== 0) {
                        messages("Info", "Mohon untuk melengkapi data yang belum lengkap pada bagian Pendidikan Formal melalui action ubah", "info", false);
                    }
                    else {
                        handleStatePosisi(2)
                    }
                }

            }
            else {
                if (isDetails) {
                    handleStatePosisi(2)
                } else this.setState({ onSubmit: !this.state.onSubmit })
            }
        })
    }

    render() {
        const { source, data, handleState, isDetails = false } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit } = this.state
        const { innerWidth: width, innerHeight: height } = window;
        
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        };

        const colStyle = {
            marginBottom: '-10px'
        };
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
        };
        let validatePhoto = typeof data.Photo

        const columnsEducation = [
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button
                            disabled={isDetails} onClick={() => this.onEditPendidikan(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button
                            disabled={isDetails} onClick={() => this.onDeletePendidikan(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                ),
                width: 100,
            },
            {
                title: 'Tingkat',
                dataIndex: 'Tingkat',
            },
            {
                title: 'Nama Institution',
                dataIndex: 'NamaInstitution',
                render: (text, data, idx) => {
                    return (data.NamaInstitution.toLowerCase() === 'others' ? data.NamaInstitusiOthers : text)
                }
            },
            {
                title: 'Negara/Kota',
                dataIndex: 'Kota',
            },
            {
                title: 'Jurusan',
                dataIndex: 'Jurusan',
                render: (text, data, idx) => {
                    return (text.toLowerCase() === 'others' ? data.JurusanOthers : text)
                }
            },
            {
                title: 'Program Studi',
                dataIndex: 'ProgramStudi',
            },
            {
                title: 'Tahun Masuk',
                dataIndex: 'TahunMasuk',
            },
            {
                title: 'Tahun Lulus',
                dataIndex: 'TahunLulus',
            },
            {
                title: 'IPK',
                dataIndex: 'GpaNem',
            },
        ];

        const columnsSertifikasi = [
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button
                            disabled={isDetails} onClick={() => this.onEditPelatihan(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button
                            disabled={isDetails} onClick={() => this.onDeletePelatihan(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                ),
                width: 100,
            },
            {
                title: 'Nama Program',
                dataIndex: 'NamaProgram',
            },
            {
                title: 'Penyelenggara',
                dataIndex: 'Penyelenggara',
            },
            {
                title: 'Tahun',
                dataIndex: 'Tahun',
            },
            {
                title: 'Keterangan',
                dataIndex: 'Keterangan',
            },
        ];

        const columnsOrganisasi = [
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button
                            disabled={isDetails} onClick={() => this.onEditOrganisasi(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button
                            disabled={isDetails} onClick={() => this.onDeleteOrganisasi(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                ),
                width: 100,
            },
            {
                title: 'Nama Organisasi',
                dataIndex: 'NamaOrganisasi',
            },
            {
                title: 'Jabatan',
                dataIndex: 'Jabatan',
            },
            {
                title: 'Lingkup',
                dataIndex: 'Lingkup',
            },
        ];

        return (
                <div style={isDetails ? { height: '80vh' } : {}}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ paddingBottom: 20 }}>
                            <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
                                <h3>A. BIODATA</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start" style={{ marginTop: 15 }}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Col lg={16} md={24} sm={24} xs={24} style={colStyle}>
                                <Row justify="start">
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="01. Nama Lengkap"
                                            name="namaLengkap"
                                            id="namaLengkap"
                                            initialValue={data.namaLengkap}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={handleState}
                                            onSubmit={onSubmit}
                                            width={width < 576 ? "100%": "137%"}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Nama Lengkap"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row justify="start">
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="02. Tempat Lahir"
                                            name="tempatLahir"
                                            id="tempatLahir"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={data.tempatLahir}
                                            onChange={(e, name) => handleState('tempatLahir', name)}
                                            data={source.PlaceOfBirth}
                                            width={width < 576 ? '100%': '91%'}
                                            validation={
                                                [
                                                    {
                                                        required: !isDetails,
                                                        message: "Please enter the Tempat Lahir"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                </Row>
                                {/* {
                                    data.tempatLahir.toLowerCase() === 'other' || data.tempatLahir.toLowerCase() === 'others' ?
                                        <Row justify="start">
                                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                                <Input
                                                    disabled={isDetails}
                                                    isRequired={false}
                                                    name="tempatLahirOther"
                                                    id="tempatLahirOther"
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onSubmit={onSubmit}
                                                    initialValue={data.tempatLahirOther}
                                                    onChange={handleState}
                                                    data={source.PlaceOfBirth}
                                                    validation={
                                                        [
                                                            {
                                                                required: !isDetails,
                                                                message: "Please enter the Tempat Lahir Other"
                                                            }
                                                        ]
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        :
                                        null
                                } */}
                                <Row justify="start">
                                    <Col md={23} sm={23} xs={24} offset={1} style={colStyle}>
                                        <div style={ width < 576 ? { width: '96%' }: {width: '99%'}}>
                                            <Datepicker
                                                isRequired={true}
                                                labelField="Tanggal Lahir"
                                                disabled={isDetails}
                                                name="tanggalLahir"
                                                id="tanggalLahir"
                                                initialValue={data.tanggalLahir}
                                                formItemLayout={formItemLayoutDate}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                format={'DD/MM/YYYY'}
                                                onChange={(e, value) => this.handleStateDate('tanggalLahir', value)}
                                                validation={
                                                    [
                                                        {
                                                            required: true,
                                                            message: "Please enter the Tanggal Lahir"
                                                        }
                                                    ]
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row justify="start">
                                    <Col md={24} sm={24} xs={24} offset={1} style={colStyle}>
                                        <div style={ width < 576 ? { width: '105%' } : { width: '96%' }}>
                                            <Select
                                                disabled={isDetails}
                                                isRequired={true}
                                                labelField="Kewarganegaraan"
                                                name="kewarganegaraan"
                                                id="kewarganegaraan"
                                                formItemLayout={formItemLayoutSelect}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                onSubmit={onSubmit}
                                                initialValue={data.kewarganegaraan}
                                                onChange={(e) => handleState('kewarganegaraan', e)}
                                                data={source.kewarganegaraan}
                                                validation={
                                                    [
                                                        {
                                                            required: !isDetails,
                                                            message: "Please enter the Kewarganegaraan"
                                                        },
                                                    ]
                                                }
                                            />
                                        </div>
                                    </Col>
                                    {
                                        data.kewarganegaraan === "Asing" ?
                                            <Col md={24} sm={24} xs={24} offset={1} style={colStyle}>
                                                <div style={width<576 ? { width: '70%' } : { width: '96%' }}>
                                                    <Input
                                                        disabled={isDetails}
                                                        name="kewarganegaraanOthers"
                                                        id="kewarganegaraanOthers"
                                                        initialValue={data.kewarganegaraanOthers}
                                                        formItemLayout={formItemLayout}
                                                        getFieldDecorator={getFieldDecorator}
                                                        Form={Form}
                                                        onChange={handleState}
                                                        onSubmit={onSubmit}
                                                        validation={
                                                            [
                                                                {
                                                                    required: true,
                                                                    message: "Please enter Kewarganegaraan"
                                                                },
                                                                {
                                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                                }
                                                            ]
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            : null
                                    }
                                </Row>
                                <Row justify="start">
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <div style={width<576 ? { width: '100%' } : { width: '137%' }}>
                                            <TextArea
                                                isRequired={true}
                                                labelField="03. Alamat Lengkap (domisili saat ini)"
                                                id="alamatLengkap"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                initialValue={data.alamatLengkap}
                                                disabled={isDetails}
                                                onChange={(e) => handleState('alamatLengkap', e.target.value)}
                                                validation={
                                                    [
                                                        {
                                                            required: true,
                                                            message: "Please enter the Alamat Lengkap"
                                                        }
                                                    ]
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row justify="start">
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="04. No HP"
                                            name="noHP1"
                                            id="noHP1"
                                            placeholder="cth. +628123456789"
                                            initialValue={data.noHP1}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={handleState}
                                            onSubmit={onSubmit}
                                            width={width<576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the No HP"
                                                    },
                                                    // {
                                                    //     pattern: new RegExp(/^(\+)[0-9]{​​​​​10,15}​​​​​$/g),
                                                    //     message: "Please enter a valid Phone Number"
                                                    // }
                                                ]
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row justify="start">
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            disabled={isDetails}
                                            placeholder="cth. +628123456789"
                                            name="noHP2"
                                            id="noHP2"
                                            initialValue={data.noHP2}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={handleState}
                                            onSubmit={onSubmit}
                                            width={width<576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: false,
                                                    },
                                                    // {
                                                    //     pattern: new RegExp(/^(\+)[0-9]{​​​​​10,15}​​​​​$/g),
                                                    //     message: "Please enter a valid Phone Number"
                                                    // }
                                                ]
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row justify="start">
                                    <Col md={24} sm={24} xs={24} style={{ ...colStyle, marginTop: 17 }}>
                                        <Input
                                            disabled={isDetails}
                                            labelField="05. No. Telp. Rumah"
                                            placeholder="cth. 0215400212"
                                            name="telpRumah"
                                            id="telpRumah"
                                            initialValue={data.telpRumah}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={handleState}
                                            onSubmit={onSubmit}
                                            width={width<576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: false,
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
                                        <Input
                                            disabled={true}
                                            isRequired={true}
                                            labelField="06. Email"
                                            name="email"
                                            id="email"
                                            initialValue={data.email}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={handleState}
                                            onSubmit={onSubmit}
                                            width={width<576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Email"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={8} md={24} sm={24} xs={24} style={colStyle}>
                                <Col xl={12} lg={24} md={12} sm={12} xs={24} style={{width:'200px',marginRight:'10px', marginBottom: '10px'}}>
                                    <div>
                                        <img loading="lazy" style={{ width: 200, height: 200, objectFit: 'cover' }}
                                            src={(
                                                data.Photo ?
                                                    (validatePhoto === "object" ? data.photoUrl : data.Photo)
                                                :
                                                    data.photoUrl ?
                                                        data.photoUrl
                                                    : ImgUser
                                                )}
                                            />
                                    </div>
                                </Col>
                                <Col xl={12} lg={24} md={12} sm={12} xs={24}>
                                    <div>
                                        <Form.Item label="" hasFeedback>
                                            {getFieldDecorator('upload', {
                                                initialValue: data.photoUrl,
                                                rules: [{ required: !isDetails, message: "Please upload the Profile Picture" }]
                                            })(
                                                <Upload accept="image/*" showUploadList={false} beforeUpload={this.onUpload} multiple={false} onChange={this.handleChange}>
                                                    <Button
                                                        disabled={isDetails} type="primary"><Icon type="upload" />Re-Upload Photo</Button>
                                                </Upload>
                                            )}
                                        </Form.Item>
                                        <p>Allowed Image File Extension: jpg, jpeg, png, jif, gif, bpm, tif</p>
                                        <p>Maximum File Size: 2 MB</p>
                                    </div>
                                </Col>
                            </Col>
                        </Col>
                    </Row>

                    <Form onSubmit={this.onAddPendidikan.bind(this)}>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
                                <div style={{ backgroundColor: '#bfbfbf', padding: 5, }}>
                                    <h3>B. PENDIDIKAN</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                    <h4>01. Pendidikan Formal</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Col md={12} sm={24} xs={24}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="Tingkat"
                                            name="tingkat"
                                            id="tingkat"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.tingkat}
                                            onChange={(e) => this.handleStateCustom('tingkat', e)}
                                            data={source.Degree}
                                            width={width<576 ? '100%' : '91%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tingkat"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="Nama Institusi"
                                            name="namaInstitusi"
                                            id="namaInstitusi"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.namaInstitusi}
                                            onChange={(e, name) => {
                                                this.handleStateForm('namaInstitusi', e)
                                                this.handleStateForm('isInstitusiOther', name.toLowerCase())
                                            }}
                                            data={source.Institute}
                                            width={width<576 ? '100%' : '91%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Nama Institusi"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    {
                                        this.state.isInstitusiOther === "others" || this.state.isInstitusiOther === "other" ?
                                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                                <Input
                                                    disabled={isDetails}
                                                    name="namaInstitusiOthers"
                                                    id="namaInstitusiOthers"
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onSubmit={onSubmit}
                                                    initialValue={this.state.namaInstitusiOthers}
                                                    onChange={(e, val) => {
                                                        this.handleStateForm(e, val)
                                                    }}
                                                    width={width<576 ? '100%' : '137%'}
                                                    validation={
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the Nama Institusi Others"
                                                            },
                                                        ]
                                                    }
                                                />
                                            </Col>
                                            : null
                                    }
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="Kota"
                                            name="kota"
                                            id="kota"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.kota}
                                            onChange={(e, name) => {
                                                this.handleStateForm('kota', e)
                                                this.handleStateForm('isKotaOther', name.toLowerCase())
                                            }}
                                            data={source.City}
                                            width={width<576 ? '100%' : '91%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Kota"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    {/* {
                                        this.state.isKotaOther === "others" || this.state.isKotaOther === "other" ?
                                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                                <Input
                                                    disabled={isDetails}
                                                    name="kotaOthers"
                                                    id="kotaOthers"
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onSubmit={onSubmit}
                                                    initialValue={this.state.kotaOthers}
                                                    onChange={(e, value) => this.handleStateForm(e, value)}
                                                    data={source.City}
                                                    validation={
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the Kota Others"
                                                            },
                                                        ]
                                                    }
                                                />
                                            </Col>
                                            : null
                                    } */}
                                    <Col md={24} sm={24} xs={24}>
                                        <Select
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="Jurusan"
                                            name="jurusan"
                                            id="jurusan"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.jurusan}
                                            onChange={(e, name) => {
                                                this.handleStateForm('jurusan', e)
                                                this.handleStateForm('isJurusanOther', name.toLowerCase())
                                            }}
                                            data={source.Major}
                                            width={width<576 ? '100%' : '91%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Jurusan"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    {
                                        this.state.isJurusanOther === "others" || this.state.isJurusanOther === "other" ?
                                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                                <Input
                                                    disabled={isDetails}
                                                    name="jurusanOthers"
                                                    id="jurusanOthers"
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onSubmit={onSubmit}
                                                    initialValue={this.state.jurusanOthers}
                                                    onChange={(e, val) => {
                                                        this.handleStateForm(e, val)
                                                    }}
                                                    width={width<576 ? '100%' : '137%'}
                                                    validation={
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the Nama Jurusan Others"
                                                            },
                                                        ]
                                                    }
                                                />
                                            </Col>
                                            : null
                                    }
                                </Col>

                                <Col md={12} sm={24} xs={24}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            disabled={isDetails}
                                            isRequired={true}
                                            labelField="Program Studi"
                                            placeholder="cth. Teknik Informatika"
                                            name="programStudi"
                                            id="programStudi"
                                            initialValue={this.state.programStudi}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleStateForm}
                                            onSubmit={onSubmit}
                                            width={width<576 ? '100%' : '137%'}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Program Studi"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            isRequired={true}
                                            labelField="Tahun Masuk"
                                            disabled={isDetails}
                                            name="tahunMasuk"
                                            id="tahunMasuk"
                                            mode="year"
                                            initialValue={this.state.tahunMasuk}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            onChange={(e, value) => this.handleStateForm('tahunMasuk', value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tahun Masuk"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            isRequired={true}
                                            labelField={<>Tahun Lulus <span style={{ fontStyle: 'italic' }}>(or Perkiraan Tahun Lulus)</span></>}
                                            disabled={isDetails}
                                            name="tahunLulus"
                                            id="tahunLulus"
                                            mode="year"
                                            initialValue={this.state.tahunLulus}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            onChange={(e, value) => this.handleStateForm('tahunLulus', value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tahun Lulus"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24}>
                                        <Row justify="start">
                                            <Col md={6} sm={12} xs={10} style={{marginRight:'50px'}}>
                                                <InputNumber
                                                    isRequired={true}
                                                    isError={this.state.gpaNem > this.state.outOf}
                                                    ErrorText={"GPA Max is " + this.state.outOf}
                                                    step={this.state.outOf == 400 ? 0 : 0.01}
                                                    labelField="GPA/NEM"
                                                    name="gpaNem"
                                                    id="gpaNem"
                                                    initialValue={this.state.gpaNem}
                                                    formItemLayout={formItemLayout}
                                                    disabled={isDetails}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    max={this.state.outOf}
                                                    min={0}
                                                    onChange={(e, value) => this.handleStateForm('gpaNem', value)}
                                                    onSubmit={onSubmit}
                                                    width={'100%'}
                                                    validation={
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the GPA/NEM"
                                                            }
                                                        ]
                                                    }
                                                />
                                            </Col>
                                            <Col md={10} sm={12} xs={10}>
                                                    <Input
                                                        disabled={isDetails}
                                                        labelField="out of"
                                                        name="outOf"
                                                        id="outOf"
                                                        disabled={true}
                                                        initialValue={this.state.outOf}
                                                        formItemLayout={formItemLayout}
                                                        getFieldDecorator={getFieldDecorator}
                                                        disabled={true}
                                                        Form={Form}
                                                        onChange={(e) => this.handleStateForm('outOf', e)}
                                                        onSubmit={onSubmit}
                                                        width={'100%'}
                                                        validation={
                                                            [
                                                                {
                                                                    pattern: new RegExp(/(^| )\d+(\.\d+)?(?=$| )/g),
                                                                    message: "Sorry, only number is allowed!"
                                                                }
                                                            ]
                                                        }
                                                    />
                                                {/* </div> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Col>
                        </Row>

                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Button disabled={isDetails} type="primary" htmlType="submit">Tambah Pendidikan</Button>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{marginTop:20, marginBottom: 20}}>
                                <Table
                                    columns={columnsEducation}
                                    dataSource={data.tablePendidikan}
                                    pagination={false}
                                    scroll={{x: 1000}}
                                />
                            </Col>
                        </Row>
                    </Form>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                <h4>02. Karya Ilmiah</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                <h4>a. Skripsi/Tugas Akhir</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Input
                                isRequired={true}
                                labelField="Judul"
                                placeholder="cth. Pengembangan Aplikasi Recruitment"
                                name="judulSkripsi"
                                id="judulSkripsi"
                                initialValue={data.judulSkripsi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={isDetails}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                width={width<576 ? '100%' : '137%'}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Judul"
                                        }
                                    ]
                                }
                            />
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Input
                                labelField="Tautan"
                                placeholder="cth. wwww.career.astra.co.id/linkskripsi"
                                name="tautanSkripsi"
                                id="tautanSkripsi"
                                initialValue={data.tautanSkripsi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={isDetails}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                width={width<576 ? '100%' : '137%'}
                                validation={
                                    [
                                        {
                                            required: false,
                                        }
                                    ]
                                }
                            />
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <h4>b. Publikasi</h4>
                            <Radio.Group style={isDetails ? { marginTop: 10, marginBottom: '24px' } : { marginTop: 10 }}
                                disabled={isDetails} onChange={(e) => { handleState('publikasi', e.target.value) }} value={data.publikasi}>
                                <Radio value="Jurnal">Jurnal</Radio>
                                <Radio value="Artikel">Artikel</Radio>
                                <Radio value="Karya Tulis">Karya Tulis</Radio>
                                <Radio value="Blog">Blog</Radio>
                                <Radio value="Buku">Buku</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={12} sm={12} xs={24} style={{...colStyle, marginTop:'20px'}}>
                            <Input
                                labelField="Judul"
                                placeholder="cth. Pengembangan Aplikasi Recruitment"
                                name="judulPublikasi"
                                id="judulPublikasi"
                                initialValue={data.judulPublikasi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={isDetails}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                width={width<576 ? '100%' : '137%'}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Judul"
                                        }
                                    ]
                                }
                            />
                        </Col>
                        <Col md={12} sm={12} xs={24} style={{...colStyle, marginTop:'20px'}}>
                            <Input
                                labelField="Tautan"
                                placeholder="cth. www.career.astra.co.id/linkjurnal"
                                name="tautanPublikasi"
                                id="tautanPublikasi"
                                initialValue={data.tautanPublikasi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={isDetails}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                width={width<576 ? '100%' : '137%'}
                                validation={
                                    [
                                        {
                                            required: false,
                                        }
                                    ]
                                }
                            />
                        </Col>
                    </Row>

                    <Form onSubmit={this.onAddPelatihan.bind(this)}>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                                    <h4>03. Pendidikan Informal terkait Program Studi (Pelatihan/Sertifikasi)</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Input
                                    labelField="Nama Program"
                                    placeholder="cth. Business Analyst Sertification"
                                    name="namaProgram"
                                    id="namaProgram"
                                    initialValue={this.state.namaProgram}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={isDetails}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Nama Program"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <DatepickerMode
                                    labelField="Tahun"
                                    disabled={isDetails}
                                    name="tahun"
                                    id="tahun"
                                    mode="year"
                                    initialValue={this.state.tahun}
                                    formItemLayout={formItemLayoutDate}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onSubmit={onSubmit}
                                    onChange={(e, value) => this.handleStateForm('tahun', value)}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Tahun"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="Penyelenggara"
                                    placeholder="cth. Menkominfo"
                                    name="penyelenggara"
                                    id="penyelenggara"
                                    initialValue={this.state.penyelenggara}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={isDetails}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Penyelenggara"
                                            },
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="Keterangan"
                                    name="keterangan"
                                    id="keterangan"
                                    initialValue={this.state.keterangan}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={isDetails}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: false,
                                            },
                                        ]
                                    }
                                />
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Button
                                    disabled={isDetails} type="primary" htmlType="submit">Tambah Pelatihan/Sertifikasi</Button>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{marginTop:20, marginBottom: 20}}>
                                <Table
                                    columns={columnsSertifikasi}
                                    dataSource={data.tablePelatihan}
                                    pagination={false}
                                    scroll={{x: 1000}}
                                />
                            </Col>
                        </Row>
                    </Form>

                    <Form onSubmit={this.onAddOrganisasi.bind(this)}>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <div style={{ paddingTop: 5, paddingBottom: 20 }}>
                                    <h4>04. Pengalaman Organisasi Kemahasiswaan Non-Kepanitiaan</h4>
                                    <h4 style={width < 576 ? {} : { marginLeft: 23 }}>(contoh: Badan Eksekutif, Himpunan, Unit Kegiatan Mahasiswa)</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Input
                                    labelField="Nama Organisasi"
                                    placeholder="cth. Eksekutif Mahasiswa"
                                    name="namaOrganisasi"
                                    id="namaOrganisasi"
                                    initialValue={this.state.namaOrganisasi}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={isDetails}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Nama Organisasi"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Select
                                    disabled={isDetails}
                                    labelField="Lingkup"
                                    name="lingkup"
                                    id="lingkup"
                                    formItemLayout={formItemLayoutSelect}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onSubmit={onSubmit}
                                    initialValue={this.state.lingkup}
                                    onChange={(e) => this.handleStateForm('lingkup', e)}
                                    data={source.OrganizationScope}
                                    width={width<576 ? '100%' : '91%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Lingkup"
                                            },
                                        ]
                                    }
                                />
                            </Col>
                        </Row>

                        <Row justify="start">
                            <Col md={12} sm={12} xs={24}>
                                <div style={{ width: '100%' }}>
                                    <Select
                                        disabled={isDetails}
                                        labelField="Jabatan"
                                        name="jabatan"
                                        id="jabatan"
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onSubmit={onSubmit}
                                        initialValue={this.state.jabatan}
                                        onChange={(e) => this.handleStateForm('jabatan', e)}
                                        data={source.OrganizationTitle}
                                        width={width<576 ? '100%' : '91%'}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Jabatan"
                                                },
                                            ]
                                        }
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Button
                                    disabled={isDetails} type="primary" htmlType="submit">Tambah Organisasi</Button>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{marginTop:20, marginBottom: 20}}>
                                <Table
                                    columns={columnsOrganisasi}
                                    dataSource={data.tableOrganisasi}
                                    pagination={false}
                                    scroll={{x: 1000}}
                                />
                            </Col>
                        </Row>
                    </Form>

                    <div style={{ textAlign: 'right', marginTop: 20 }}>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                                <span style={{ fontSize: 20 }}>1/3</span>
                            </Col>
                            <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                                <Icon onClick={() => this.onChangePage(!(this.props.isFlk))} style={{ cursor: 'pointer' }} type="right-circle" style={{ fontSize: 30 }} />
                            </Col>
                        </Row>
                    </div>
                </div>
        )
    }
}


const WrappedForm = Form.create()(Form1);
export default WrappedForm