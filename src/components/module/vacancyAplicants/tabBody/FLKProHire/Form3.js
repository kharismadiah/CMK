import React, { Component } from 'react';
import { Col, Row, Icon, Checkbox, Radio, Table } from 'antd';
import moment from 'moment'

import Form from '../../../../uielements/form';
import Input from '../../../../CustomComponentAntd/customInput';
import Button, { ButtonGroup } from '../../../../uielements/button';
import Select from '../../../../CustomComponentAntd/customSelect';
import InputNonForm from '../../../../CustomComponentAntd/customInputNonForm';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import { messages, messagesConfirm } from "../../../../../components/messageBox"
import {Cookie} from '../../../../../service/header';
import 'sweetalert2/dist/sweetalert2.min.css'

class Form3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            onSubmit: false,

            FLKReferenceId: 0,
            ReferenceId: 0,
            isEditReference: false,
            referenceName: '',
            referenceCompany: '', //Table: branch/company
            referenceTitle: '', //Table: positionTitle
            referencePhone: '',
            referenceEmail: '',
            referenceRelation: '',
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    onEditReference = (idx) => {
        const { data } = this.props
        let _this = this
        _this.setState({
            onSubmit: !_this.state.onSubmit,
            isEditReference: true,
            FLKReferenceId: data.tableReference[idx].FLKReferenceId,
            ReferenceId: data.tableReference[idx].ReferenceId,
            referenceName: data.tableReference[idx].referenceName,
            referenceCompany: data.tableReference[idx].referenceCompanyId,
            referenceTitle: data.tableReference[idx].referenceTitleId,
            referencePhone: data.tableReference[idx].referencePhone,
            referenceEmail: data.tableReference[idx].referenceEmail,
            referenceRelation: data.tableReference[idx].referenceRelation,
        })
        this.props.form.setFieldsValue({
            FLKReferenceId: data.tableReference[idx].FLKReferenceId,
            ReferenceId: data.tableReference[idx].ReferenceId,
            referenceName: data.tableReference[idx].referenceName,
            referenceCompany: data.tableReference[idx].referenceCompanyId,
            referenceTitle: data.tableReference[idx].referenceTitleId,
            referencePhone: data.tableReference[idx].referencePhone,
            referenceEmail: data.tableReference[idx].referenceEmail,
            referenceRelation: data.tableReference[idx].referenceRelation,
        })
    }

    onDeleteReference = (idx) => {
        const { handleState, data } = this.props
        data.tableReference.splice(idx, 1)
        handleState('tableReference', data.tableReference)
    }

    onAddReference = (e) => {
        const { handleState, source, data } = this.props
        e.preventDefault();
        let _this = this
        this.props.form.validateFieldsAndScroll([
            'referenceName',
            'referenceCompany',
            'referenceTitle',
            'referencePhone',
            'referenceEmail',
            'referenceRelation'
        ], (err, values) => {
            if(!err){
                let dataParam = {
                    FLKReferenceId: _this.state.FLKReferenceId,
                    ReferenceId: _this.state.isEditReference ? _this.state.ReferenceId : data.tableReference.length + 1,
                    referenceName: _this.state.referenceName,
                    referenceCompany: source.Branch.find(x => x.id === _this.state.referenceCompany).name,
                    referenceCompanyId: _this.state.referenceCompany,
                    referenceTitle: source.PositionTitle.find(x => x.id === _this.state.referenceTitle).name,
                    referenceTitleId: _this.state.referenceTitle,
                    referencePhone: _this.state.referencePhone,
                    referenceEmail: _this.state.referenceEmail,
                    referenceRelation: _this.state.referenceRelation,
                }
                let foundIdx
                if(_this.state.isEditReference){
                    if(_this.state.FLKReferenceId === 0){
                        foundIdx = data.tableReference.findIndex(x => x.ReferenceId === _this.state.ReferenceId)
                    }else{
                        foundIdx = data.tableReference.findIndex(x => x.FLKReferenceId === _this.state.FLKReferenceId)
                    }
                    data.tableReference[foundIdx] = dataParam
                }else{
                    data.tableReference.push(dataParam)
                }
                handleState('tableReference', data.tableReference)
                _this.setState({
                    onSubmit: !_this.state.onSubmit,
                    isEditReference: false,
                    FLKReferenceId: 0,
                    ReferenceId: 0,
                    referenceName: '',
                    referenceCompany: '',
                    referenceTitle: '',
                    referencePhone: '',
                    referenceEmail: '',
                    referenceRelation: '',
                })
                _this.props.form.resetFields()
            }else{
                _this.setState({ onSubmit: !_this.state.onSubmit })
            }
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
    }

    handleStateDate = (property, value) => {
        const { handleState } = this.props
        handleState(property, moment(value, 'DD/MM/YYYY'))
    }

    onSubmitFlk = () => {
        const { fetchSubmitFLK, data, isDetails = false } = this.props
        let id = Cookie.getWithoutExpired('ahs_id')
        let _this = this
        let socialActivity = [data.socialActivity1.value, data.socialActivity2.value, data.socialActivity3.value, data.socialActivity4.value, data.socialActivity5.value, data.socialActivity6.value, data.socialActivity7.value, data.socialActivity8.value, data.socialActivity9.value, data.socialActivity10.value]
        let facility = [data.facility1.value, data.facility2.value, data.facility3.value, data.facility4.value, data.facility5.value, data.facility6.value, data.facility7.value, data.facility8.value, data.facility9.value, data.facility10.value, data.facility11.value, data.facility12.value, data.facility13.value, data.facility14.value, data.facility15.value, data.facility16.value, data.facility17.value]
        let cekSocialActivity = socialActivity.find(element => element == true)
        let cekFacility = facility.find(element => element == true)
        
        this.props.form.validateFieldsAndScroll([
            'salary',
            'dateAvailable',
        ],(err, values) => {
            if (!err) {
                if(id !== null){
                    if (cekSocialActivity === undefined) {          
                        messages("Info", "Silahkan memilih hobi", "info", false);
                    }
                    else if(cekFacility === undefined){
                        messages("Info", "Silahkan memilih fasilitas", "info", false);
                    }
                    else{
                        messagesConfirm(id, fetchSubmitFLK, isDetails, 'Simpan Data Personal',
                         'Data yang Anda berikan akan kami gunakan untuk tahapan proses rekrutmen berikutnya, pastikan seluruh data telah diisi dengan lengkap dan benar. Apakah Anda yakin ingin menyimpan Data Personal?', 'info')
                    }
                }else{
                    messages("Info", "Token Expired, Please Relogin", "info", false);
                }
                _this.setState({ onSubmit: !_this.state.onSubmit })
            }else{
                _this.setState({ onSubmit: !_this.state.onSubmit })
            }
            
        })
    }

    handleStateChecked = (property, value) => {
        const { handleState, data } = this.props
        handleState(property, { ...data[property], value })
    }

    onChangePage = (noPage) => {
        const { handleStatePosisi } = this.props
        handleStatePosisi(noPage)
    }

    render(){
        const { data, source, handleState, isDetails = false, RecruitmentPhase } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { onSubmit } = this.state;
        const { innerWidth: width, innerHeight: height } = window;

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 },
        };

        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 },
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 },
        };

        const columnsReference = [
            {
                title: 'Actions',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <ButtonGroup>
                        <Button
                            disabled={isDetails} onClick={() => this.onEditReference(idx)}>
                            <Icon type="edit" style={{ fontSize: 20 }} />
                        </Button>
                        <Button
                            disabled={isDetails} onClick={() => this.onDeleteReference(idx)}>
                            <Icon type="delete" style={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                )
            },
            {
                title: 'Nama Lengkap',
                dataIndex: 'referenceName'
            },
            {
                title: 'Perusahaan',
                dataIndex: 'referenceCompany'
            },
            {
                title: 'Jabatan',
                dataIndex: 'referenceTitle'
            },
            {
                title: 'No. HP',
                dataIndex: 'referencePhone'
            },
            {
                title: 'Email',
                dataIndex: 'referenceEmail'
            },
            {
                title: 'Relasi',
                dataIndex: 'referenceRelation'
            }
        ]
        return(
            <div>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                        <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                            <h3>E. AKTIVITAS SOSIAL</h3>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                        <h4>01. Aktivitas Sosial</h4>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                        <h4>Aktivitas yang rutin dilakukan<span style={{ color: "red" }}>*</span></h4>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={12} sm={12} xs={24}>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity1.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity1', e.target.checked)}>Menghadiri komunikasi sosial</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity2.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity2', e.target.checked)}>Menghadiri komunitas yang berkaitan dengan hobi (klub)</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity3.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity3', e.target.checked)}>Mengikuti aktivitas sukarela (voulenteering)</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity4.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity4', e.target.checked)}>Mengunjungi museum/pameran/pertunjukan</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity5.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity5', e.target.checked)}>Melakukan aktivitas rekreasional (contoh: berbelanja, travelling, dll.)</Checkbox>
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24}>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity6.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity6', e.target.checked)}>Arisan dengan teman/kenalan</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity7.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity7', e.target.checked)}>Menongkrong dengan teman/kenalan</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity8.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity8', e.target.checked)}>Mengikuti kegiatan keagamaan</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity9.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity9', e.target.checked)}>Menghadiri pesta</Checkbox>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                <Checkbox checked={data.socialActivity10.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('socialActivity10', e.target.checked)}>
                                Lainnya
                                <InputNonForm
                                    disabled={isDetails ? true : !data.socialActivity10.value}
                                    name="socialActivityOthers"
                                    id="socialActivityOthers"
                                    value={!data.socialActivity10.value ? "" : data.socialActivityOthers}
                                    onChange={handleState}
                                />
                                </Checkbox>
                            </Col>
                        </Col>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                        <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                            <h3>F. Minat Kerja</h3>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={8} sm={8} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>01. Sebutkan gaji yang Saudara harapkan<span style={{ color: "red" }}>*</span></h4>
                            </div>
                        </Col>
                        <Col md={8} sm={8} xs={24}>
                            <Select
                                name='salary'
                                id='salary'
                                disabled={isDetails}
                                formItemLayout={formItemLayoutSelect}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                onSubmit={onSubmit}
                                initialValue={data.salary}
                                onChange={(e) => handleState("salary", e)}
                                data={source.Salary}
                                width={width<576 ? '100%' : '91%'}
                                validation={
                                    [
                                        {
                                        required: true,
                                        message: "Please enter the Salary"
                                        }
                                    ]
                                }
                            />
                        </Col>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={8} sm={8} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>02. Kapan Saudara dapat mulai bekerja<span style={{ color: "red" }}>*</span></h4>
                            </div>
                        </Col>
                        <Col md={8} sm={8} xs={8}>
                            <Datepicker
                                disabled={isDetails}
                                name='dateAvailable'
                                id='dateAvailable'
                                initialValue={data.dateAvailable}
                                formItemLayout={formItemLayoutDate}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                onSubmit={onSubmit}
                                format={'DD/MM/YYYY'}
                                onChange={(e, value) => this.handleStateDate('dateAvailable', value)}
                                validation={
                                [
                                    {
                                    required: true,
                                    message: "Please enter the date available"
                                    }
                                ]
                                }
                            />
                        </Col>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={8} sm={8} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>03. Kesediaan ditempatkan di luar DKI Jakarta<span style={{ color: "red" }}>*</span></h4>
                            </div>
                        </Col>
                        <Col md={8} sm={8} xs={24}>
                            <Radio.Group 
                                disabled={isDetails}
                                style={{ marginTop: 10 }}
                                onChange={(e) => handleState('placementAvailibility', e.target.value)}
                                value={data.placementAvailibility}
                            >
                                <Radio value="Tidak Bersedia">Tidak Bersedia</Radio>
                                <Radio value="Bersedia">Bersedia</Radio>
                            </Radio.Group>
                        </Col>
                    </Col>
                </Row>
                    
                {
                    data.placementAvailibility === "Bersedia" ?
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Col md={8} sm={8} xs={24} style={{paddingTop:5, paddingBottom:10}}></Col>
                                <Col md={16} sm={24} xs={24}>
                                    <Row justify="start">
                                        <Col md={24} sm={24} xs={24}>
                                            <div style={{paddingTop:5, paddingBottom:10}}>
                                                <h4>Jika bersedia, pilih lokasi yang Saudara sukai (boleh lebih dari 1)<span style={{ color: "red" }}>*</span></h4>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row justify="start">
                                    <Col md={24} sm={24} xs={24}>
                                        <Col md={12} sm={24} xs={24}>
                                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                                <Checkbox checked={data.city1.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('city1', e.target.checked)}>Depok, Tangerang, Bekasi, Bogor</Checkbox>
                                            </Col>
                                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                                <Checkbox checked={data.city2.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('city2', e.target.checked)}>Pulau Jawa (Non-Jabodetabek)</Checkbox>
                                            </Col>
                                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                                <Checkbox checked={data.city3.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('city3', e.target.checked)}>Pulau Sumatera</Checkbox>
                                            </Col>
                                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                                <Checkbox checked={data.city4.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('city4', e.target.checked)}>Pulau Kalimantan</Checkbox>
                                            </Col>
                                        </Col>
                                        <Col md={12} sm={24} xs={24}>
                                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                                <Checkbox checked={data.city5.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('city5', e.target.checked)}>Pulau Sulawesi</Checkbox>
                                            </Col>
                                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                                <Checkbox checked={data.city6.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('city6', e.target.checked)}>Pulau Bali & Nusa Tenggara</Checkbox>
                                            </Col>
                                            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                                <Checkbox checked={data.city7.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('city7', e.target.checked)}>Papua & Kepulauan Maluku</Checkbox>
                                            </Col>
                                        </Col>
                                    </Col>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    : null
                }

                
                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                        <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                            <h3>G. LAIN-LAIN</h3>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                            <h4>01. Fasilitas yang Saudara dapatkan di perusahaan saat ini<span style={{ color: "red" }}>*</span></h4>
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={8} sm={12} xs={24}>
                            <Row>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility1.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility1', e.target.checked)}>Makanan & Minuman</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility2.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility2', e.target.checked)}>Kendaraan Operasional (CPO/Pinjem)</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility3.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility3', e.target.checked)}>Asuransi Kesehatan</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility4.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility4', e.target.checked)}>Asuransi Jiwa</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility5.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility5', e.target.checked)}>Dana Pensiun</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility6.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility6', e.target.checked)}>Insentif/Bonus</Checkbox>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={8} sm={12} xs={24}>
                            <Row>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility7.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility7', e.target.checked)}>Kebugaran (gym)</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility8.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility8', e.target.checked)}>Transportasi (Co: bensin, parkir, tol, dll.)</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility9.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility9', e.target.checked)}>Tunjangan Hari Raya (THR)</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility10.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility10', e.target.checked)}>Pelatihan</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility11.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility11', e.target.checked)}>Tunjangan Jabatan</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility12.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility12', e.target.checked)}>Tunjangan Cuti</Checkbox>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={8} sm={12} xs={24}>
                            <Row>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility13.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility13', e.target.checked)}>Tunjangan lembur (Co: transportasi, makanan & minuman, dll.)</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility14.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility14', e.target.checked)}>Program pinjaman/pembiayaan (rumah, pendidikan, kendaraan pribadi, ibadah, dll.)</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility15.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility15', e.target.checked)}>Tunjangan perjalanan dinas</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility16.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility16', e.target.checked)}>Tunjangan telekomunikasi (Co: pulsa, kuota, internet, dll.)</Checkbox>
                                </Col>
                                <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                                    <Checkbox checked={data.facility17.value} disabled={isDetails} onChange={(e) => this.handleStateChecked('facility17', e.target.checked)}>
                                        Lainnya
                                        <InputNonForm
                                            disabled={isDetails ? true : !data.facility17.value}
                                            name="facilityOthers"
                                            id="facilityOthers"
                                            value={!data.facility17.value ? "" : data.facilityOthers}
                                            onChange={handleState}
                                        />
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>

                <Form onSubmit={this.onAddReference.bind(this)}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>02. Reference</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="Nama Lengkap"
                                    name="referenceName"
                                    id="referenceName"
                                    placeholder=""
                                    isRequired={true}
                                    initialValue={this.state.referenceName}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={this.handleSetData}
                                    disabled={isDetails}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Nama Lengkap"
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="No.Hp"
                                    name="referencePhone"
                                    id="referencePhone"
                                    placeholder=""
                                    isRequired={true}
                                    initialValue={this.state.referencePhone}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={this.handleSetData}
                                    disabled={isDetails}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the No. HP"
                                            },
                                            // {
                                            //     pattern: new RegExp(/^(\+)[0-9]{10,15}$/g),
                                            //     message: "Please enter a valid Phone Number."
                                            // }
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24}>
                                <Select
                                    labelField="Perusahaan"
                                    name="referenceCompany"
                                    id="referenceCompany"
                                    placeholder=""
                                    isRequired={true}
                                    initialValue={this.state.referenceCompany}
                                    formItemLayout={formItemLayoutSelect}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    data={source.Branch}
                                    onChange={(e) => this.handleSetData('referenceCompany', e)}
                                    disabled={isDetails}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '91%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Perusahaan"
                                            },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="Email"
                                    name="referenceEmail"
                                    id="referenceEmail"
                                    placeholder=""
                                    isRequired={true}
                                    initialValue={this.state.referenceEmail}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={this.handleSetData}
                                    disabled={isDetails}
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
                            <Col md={12} sm={12} xs={24}>
                                <Select
                                    labelField="Jabatan"
                                    name="referenceTitle"
                                    id="referenceTitle"
                                    isRequired={true}
                                    formItemLayout={formItemLayoutSelect}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onSubmit={onSubmit}
                                    initialValue={this.state.referenceTitle}
                                    disabled={isDetails}
                                    onChange={(e) => this.handleSetData('referenceTitle', e)}
                                    data={source.PositionTitle}
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
                            </Col>
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="Relasi"
                                    name="referenceRelation"
                                    id="referenceRelation"
                                    placeholder=""
                                    isRequired={true}
                                    initialValue={this.state.referenceRelation}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={this.handleSetData}
                                    disabled={isDetails}
                                    onSubmit={onSubmit}
                                    width={width<576 ? '100%' : '137%'}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Relasi"
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

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Button disabled={isDetails} type="primary" htmlType="submit">Tambah Referensi</Button>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                            <Table
                                columns={columnsReference}
                                dataSource={data.tableReference}
                                pagination={false}
                                scroll={{x:1000}}
                            />
                        </Col>
                    </Row>
                </Form>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:20, paddingBottom:10, textAlign: 'center'}}>
                            <h2>Data yang Saudara berikan bersifat rahasia, dan hanya akan diberikan kepada pihak-pihak yang berwenang.</h2>
                        </div>
                    </Col>
                </Row>

                <Row justify='start' style={{ marginTop: 20 }}>
                    <Col offset={20} md={4} sm={4} xs={4}>
                        <Button disabled={isDetails} type='primary' onClick={this.onSubmitFlk.bind(this)} style={{float: 'right'}}>Simpan Data Personal</Button>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                        <div
                            style={{
                                marginTop: 20,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Icon
                                onClick={() => this.onChangePage(2)}
                                style={{ cursor: 'pointer' }}
                                type='left-circle'
                                style={{ fontSize: 30 }}
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                        <div style={{ marginTop: 20 }}>
                            <span style={{ fontSize: 20 }}>3/3</span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedForm = Form.create()(Form3);
export default WrappedForm;