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
    constructor(props){
        super(props)
        this.state ={
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
            jurusanOthers: '',
            isJurusanOthers: '',
            gpaNem:'',
            outOf:'',
            isEditPendidikan: false,
            
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

    handleStateCustom = (property, value) => {
        const { source } = this.props
        if(property === "tingkat"){
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
            }else{
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

    handleStateForm = (property, value) => {
        this.setState({ 
            onSubmit: !this.state.onSubmit,
            [property]: value 
        })
        this.props.form.setFieldsValue({ [property]: value })

        if(property === "kota" ){
            this.setState({ 
                onSubmit: !this.state.onSubmit,
                kotaOthers: ''
            })
            this.props.form.setFieldsValue({ kotaOthers: '' })
        }else if(property === "namaInstitusi"){
            this.setState({ 
                onSubmit: !this.state.onSubmit,
                namaInstitusiOthers: ''
            })
            this.props.form.setFieldsValue({ namaInstitusiOthers: '' })
        }else if (property === "jurusan"){
            this.setState({ 
                onSubmit: !this.state.onSubmit,
                jurusanOthers: ''
            })
            this.props.form.setFieldsValue({ jurusanOthers: '' })
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
            'jurusanOthers',
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
                        JurusanOthers: _this.state.jurusanOthers,

                        ProgramStudi: _this.state.programStudi,
                        TahunMasuk: moment(_this.state.tahunMasuk).format("YYYY"),
                        TahunLulus: moment(_this.state.tahunLulus).format("YYYY"),
                        GpaNem: _this.state.gpaNem,
                        OutOf: _this.state.outOf
                    }
                    let foundIdx
                    if(_this.state.isEditPendidikan){
                        if(_this.state.EducationDetailsId === 0){
                            foundIdx = data.tablePendidikan.findIndex(x => x.PendidikanId === _this.state.PendidikanId)
                        }else{
                            foundIdx = data.tablePendidikan.findIndex(x => x.EducationDetailsId === _this.state.EducationDetailsId)
                        }
                        data.tablePendidikan[foundIdx] = dataParam
                    }else{
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
                        kotaOthers:'',
                        tahunLulus: '',
                        jurusan: '',
                        jurusanOthers: '',
                        gpaNem:'',
                        outOf:'',
                        isInstitusiOther: '',
                        isKotaOther: '',
                        isJurusanOthers: ''
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
            this.setState({outOf: 400})
            this.props.form.setFieldsValue({outOf: 400})
        } else {
            this.setState({outOf: parseFloat(4.00).toFixed(2)})
            this.props.form.setFieldsValue({outOf: parseFloat(4.00).toFixed(2)})
        }

        if(data.tablePendidikan[idx].NamaInstitution.toLowerCase() === "others" || data.tablePendidikan[idx].NamaInstitution.toLowerCase() === "other"){
            _this.setState({isInstitusiOther: "others"})
        }else{
            _this.setState({isInstitusiOther: ""})
        }
        if(data.tablePendidikan[idx].Kota.toLowerCase() === "others" || data.tablePendidikan[idx].Kota.toLowerCase() === "other"){
            _this.setState({isKotaOther: "others"})
        }else{
            _this.setState({isKotaOther: ""})
        }
        if(data.tablePendidikan[idx].Jurusan.toLowerCase() === "others" || data.tablePendidikan[idx].Jurusan.toLowerCase() === "other"){
            _this.setState({isJurusanOthers: "others"})
        }else{
            _this.setState({isJurusanOthers: ""})
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
            jurusanOthers: data.tablePendidikan[idx].JurusanOthers,
            gpaNem: data.tablePendidikan[idx].GpaNem,
            // outOf: data.tablePendidikan[idx].OutOf
        })
        this.props.form.setFieldsValue({
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
            jurusanOthers: data.tablePendidikan[idx].JurusanOthers,
            gpaNem: data.tablePendidikan[idx].GpaNem,
            // outOf: data.tablePendidikan[idx].OutOf
          })
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
                    if(_this.state.isEditInformal){
                        if(_this.state.FLKNonFormalEducationId === 0){
                            foundIdx = data.tablePelatihan.findIndex(x => x.NonformalId === _this.state.NonformalId)
                        }else{
                            foundIdx = data.tablePelatihan.findIndex(x => x.FLKNonFormalEducationId === _this.state.FLKNonFormalEducationId)
                        }
                        data.tablePelatihan[foundIdx] = dataParam
                    }else{
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

    handleStateDate = (property, value) => {
        const { handleState } = this.props
        handleState(property, moment(value, 'DD/MM/YYYY'))
    }

    onChangePage = (noPage) =>{
        const { data, handleStatePosisi, isDetails = false } = this.props
        let _this = this
        let isTablePendidikan  = data.tablePendidikan.length
        let kota = data.tablePendidikan.filter(x => x.Kota === "")
        let prodi = data.tablePendidikan.filter(x => x.ProgramStudi === "")
        this.props.form.validateFieldsAndScroll([
            'namaLengkap',
            'tempatLahir',
            'tanggalLahir',
            'kewarganegaraan',
            'kewarganegaraanOthers',
            'upload',
            'alamatLengkap',
            'noHP1',
            'email'
        ],(err, values) => {
            if (!err) {
                if(isDetails){
                    handleStatePosisi(noPage)
                }else{
                    if(isTablePendidikan === 0){
                        messages("Info", "Mohon untuk melengkapi data Pendidikan Formal", "info", false);
                    }
                    else if(kota.length !== 0 || prodi.length !== 0){
                        messages("Info", "Mohon untuk melengkapi data yang belum lengkap pada bagian Pendidikan Formal melalui action ubah", "info", false);
                    }
                    else{
                        handleStatePosisi(noPage)
                    }
                }
            }else{
                if(isDetails){
                    handleStatePosisi(noPage)
                }
                else _this.setState({ onSubmit: !_this.state.onSubmit })
            }
        })
    }

    render(){
        const { source, data, handleState, isDetails = false } = this.props
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
                    if(data.NamaInstitution.toLowerCase() === "others" || data.NamaInstitution.toLowerCase() === "other"){
                        return(
                            <p>{data.NamaInstitusiOthers}</p>
                        )
                    }else{
                        return(
                            <p>{data.NamaInstitution}</p>
                        )
                    }
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
                    if(data.Jurusan.toLowerCase() === "others" || data.Jurusan.toLowerCase() === "other"){
                        return(
                            <p>{data.JurusanOthers}</p>
                        )
                    }else{
                        return(
                            <p>{data.Jurusan}</p>
                        )
                    }
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
        return(
            <div style={isDetails ? { height: '80vh' } : { }}>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{paddingBottom:20}}>
                        <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                            <h3>A. BIODATA</h3>
                        </div>
                    </Col>
                </Row>
                <Row justify="start" style={{marginTop:15}}>
                    <Col lg={16} md={24} sm={24} xs={24} style={colStyle}>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="01. Nama Lengkap"
                                    name="namaLengkap"
                                    id="namaLengkap"
                                    isRequired={true}
                                    initialValue={data.namaLengkap}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    disabled={isDetails}
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
                                    labelField="02. Tempat Lahir"
                                    name="tempatLahir"
                                    id="tempatLahir"
                                    isRequired={true}
                                    formItemLayout={formItemLayoutSelect}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    disabled={isDetails}
                                    onSubmit={onSubmit}
                                    initialValue={data.tempatLahir}
                                    onChange={(e) => handleState('tempatLahir', e)}
                                    data={source.PlaceOfBirth}
                                    width={width < 576 ? "100%": "91%"}
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
                        <Row justify="start">
                            <Col md={23} sm={23} xs={24} offset={1} style={colStyle}>
                                <div style={ width < 576 ? { width: '96%' }: {width: '99%'}}>
                                    <Datepicker
                                        labelField="Tanggal Lahir"
                                        disabled={isDetails}
                                        name="tanggalLahir"
                                        id="tanggalLahir"
                                        isRequired={true}
                                        initialValue={data.tanggalLahir}
                                        formItemLayout={formItemLayoutDate}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        format={'DD/MM/YYYY'}
                                        onChange={(e, value) => this.handleStateDate('tanggalLahir', value)}
                                        validation={
                                            [
                                                {
                                                    required: !isDetails,
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
                                        labelField="Kewarganegaraan"
                                        name="kewarganegaraan"
                                        id="kewarganegaraan"
                                        isRequired={true}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={isDetails}
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
                                                name="kewarganegaraanOthers"
                                                id="kewarganegaraanOthers"
                                                initialValue={data.kewarganegaraanOthers}
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                disabled={isDetails}
                                                onChange={handleState}
                                                onSubmit={onSubmit}
                                                validation={
                                                    data.kewarganegaraan === "Asing" ? 
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the Kewarganegaraan"
                                                            },
                                                            {
                                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                                message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                            }
                                                        ]
                                                    : []
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
                                        labelField="03. Alamat Lengkap (domisili saat ini)"
                                        id="alamatLengkap"
                                        isRequired={true}
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
                                    labelField="04. No HP"
                                    name="noHP1"
                                    id="noHP1"
                                    isRequired={true}
                                    placeholder="cth. +628123456789"
                                    initialValue={data.noHP1}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    disabled={isDetails}
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
                                            //     pattern: new RegExp(/^(\+)[0-9]{10,15}$/g),
                                            //     message: "Please enter a valid Phone Number."
                                            // }
                                        ]
                                    }
                                />
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    placeholder="cth. +628123456789"
                                    name="noHP2"
                                    id="noHP2"
                                    initialValue={data.noHP2}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    disabled={isDetails}
                                    onChange={handleState}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: false,
                                            },
                                            // {
                                            //     pattern: new RegExp(/^(\+)[0-9]{10,15}$/g),
                                            //     message: "Please enter a valid Phone Number."
                                            // }
                                        ]
                                    }
                                />
                            </Col>
                        </Row>
                        <Row justify="start">
                            {/* <Col md={8} sm={8} xs={24} style={colStyle}>
                                <Input
                                    labelField="05. No. Telp. Rumah"
                                    placeholder="cth. 021"
                                    name="telpRumahCode"
                                    id="telpRumahCode"
                                    initialValue={data.telpRumahCode}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={handleState}
                                    onSubmit={onSubmit}
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
                            </Col> */}
                            <Col md={24} sm={24} xs={24} style={{...colStyle, marginTop:17}}>
                                {/* <div style={{width:'96%'}}> */}
                                    <Input
                                        labelField="05. No. Telp. Rumah"
                                        placeholder="cth. 0215400212"
                                        name="telpRumah"
                                        id="telpRumah"
                                        initialValue={data.telpRumah}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={isDetails}
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
                                {/* </div> */}
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Input
                                    labelField="06. Email"
                                    name="email"
                                    id="email"
                                    isRequired={true}
                                    initialValue={data.email}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    disabled={true} //isDetails
                                    onChange={handleState}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Email"
                                            },
                                            {
                                                pattern: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g),
                                                message: "Sorry, please enter a valid email address!"
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
                                    rules: [{ required: true, message: "Please upload the Profile Picture" }]
                                    })(
                                        <Upload accept="image/*" showUploadList={false} beforeUpload={this.onUpload} multiple={false} onChange={this.handleChange}>
                                            <Button
                                                disabled={isDetails} type="primary"><Icon type="upload" />Re-Upload Photo</Button>
                                        </Upload>
                                    )}
                                </Form.Item>
                                <p>Allowed Image File Extension: jpg, jpeg, png, jif, gif, bpm, tif</p>
                                <p>Maximum File Size: 2 MB<span style={{ color: "red" }}>*</span></p> 
                            </div>
                        </Col>
                    </Col>
                </Row>

                <Form onSubmit={this.onAddPendidikan.bind(this)}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                            <div style={{backgroundColor:'#bfbfbf', padding:5,}}>
                                <h3>B. PENDIDIKAN</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>01. Pendidikan Formal<span style={{ color: "red" }}>*</span></h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Col md={12} sm={24} xs={24}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="Tingkat"
                                        name="tingkat"
                                        id="tingkat"
                                        isRequired={true}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={isDetails}
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
                                        labelField="Nama Institusi"
                                        name="namaInstitusi"
                                        id="namaInstitusi"
                                        isRequired={true}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={isDetails}
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
                                                name="namaInstitusiOthers"
                                                id="namaInstitusiOthers"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                disabled={isDetails}
                                                onSubmit={onSubmit}
                                                initialValue={this.state.namaInstitusiOthers}
                                                onChange={(e, value) => this.handleStateForm(e, value)}
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
                                        labelField="Kota"
                                        name="kota"
                                        id="kota"
                                        isRequired={true}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={isDetails}
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
                                                name="kotaOthers"
                                                id="kotaOthers"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                disabled={isDetails}
                                                onSubmit={onSubmit}
                                                initialValue={this.state.kotaOthers}
                                                onChange={(e, value) => this.handleStateForm('kotaOthers', value)}
                                                data={source.City}
                                                width={width<576 ? '100%' : '137%'}
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
                                        labelField="Jurusan"
                                        name="jurusan"
                                        id="jurusan"
                                        isRequired={true}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={isDetails}
                                        onSubmit={onSubmit}
                                        initialValue={this.state.jurusan}
                                        onChange={(e, name) => {
                                            this.handleStateForm('jurusan', e)
                                            this.handleStateForm('isJurusanOthers', name.toLowerCase())
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
                                    this.state.isJurusanOthers === "others" || this.state.isJurusanOthers === "other" ? 
                                        <Col md={24} sm={24} xs={24}>
                                            <Input
                                                disabled={isDetails}
                                                name="jurusanOthers"
                                                id="jurusanOthers"
                                                formItemLayout={formItemLayout}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                onSubmit={onSubmit}
                                                initialValue={this.state.jurusanOthers}
                                                onChange={(e, value) => this.handleStateForm(e, value)}
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
                                        labelField="Program Studi"
                                        placeholder="cth. Teknik Informatika"
                                        name="programStudi"
                                        id="programStudi"
                                        isRequired={true}
                                        initialValue={this.state.programStudi}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={isDetails}
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
                                        labelField="Tahun Masuk"
                                        disabled={isDetails}
                                        name="tahunMasuk"
                                        id="tahunMasuk"
                                        mode="year"
                                        isRequired={true}
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
                                        labelField={<div>Tahun Lulus<span style={{ color: "red" }}>*</span> <span style={{fontStyle:'italic'}}>(or Perkiraan Tahun Lulus)</span></div>}
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
                                        <Col md={6} sm={12} xs={10} style={{marginRight: '50px'}}>
                                            <InputNumber
                                                isError={this.state.gpaNem > this.state.outOf}
                                                ErrorText={"GPA Max is " + this.state.outOf}
                                                step={this.state.outOf == 400 ? 0 : 0.01}
                                                labelField="GPA/NEM"
                                                name="gpaNem"
                                                id="gpaNem"
                                                isRequired={true}
                                                initialValue={this.state.gpaNem}
                                                formItemLayout={formItemLayout}
                                                disabled={isDetails}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                max={this.state.outOf}
                                                min={0}
                                                onChange={(e, value) => this.handleStateForm('gpaNem', value)}
                                                onSubmit={onSubmit}
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
                                                    labelField="out of"
                                                    name="outOf"
                                                    id="outOf"
                                                    disabled={true}
                                                    initialValue={this.state.outOf}
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onChange={(e, value) => this.handleStateForm('outOf', value)}
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
                                scroll={{x:1000}}
                            />
                        </Col>
                    </Row>
                </Form>
                
                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                            <h4>02. Publikasi</h4>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Radio.Group style={isDetails ? { marginTop: 10, marginBottom: '24px' } : { marginTop: 10 }}
                            disabled={isDetails} onChange={(e) => {handleState('publikasi', e.target.value)}} value={data.publikasi}>
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
                            <div style={{paddingTop:5, paddingBottom:10}}>
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
                                isRequired={true}
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
                                isRequired={true}
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
                                isRequired={true}
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
                
                <div style={{ textAlign: 'right', marginTop: 20 }}>
                    <Row justify="start">
                        <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                            <span style={{ fontSize: 20 }}>1/3</span>
                        </Col>
                        <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                            <Icon onClick={() => this.onChangePage(2)} style={{ cursor: 'pointer' }} type="right-circle" style={{ fontSize: 30 }} />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const WrappedForm = Form.create()(Form1);
export default WrappedForm