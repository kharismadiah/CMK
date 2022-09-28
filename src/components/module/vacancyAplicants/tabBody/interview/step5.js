import React, { Component } from 'react';
import {
    Col,
    Row,
    DatePicker,
    Divider,
    Icon,
    Upload,
    Button,
    message,
    Input,
    Carousel
} from 'antd';
import InputNonForm from '../../../../CustomComponentAntd/customInputNonForm';
import moment from 'moment';
import Select from '../../../../CustomComponentAntd/customSelect';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/RecruitmentPhase/action';
import actions_auth from '../../../../../redux/auth/actions';
import Form from '../../../../uielements/form'
import { saveAs } from 'file-saver';
import "./carouselCustom.scss"


const { TextArea } = Input;

class Step4 extends Component {

    componentWillUnmount() {
        const { handleChangeDetailModal } = this.props
        handleChangeDetailModal('interviewer', '')
        handleChangeDetailModal("interviewDate", '')
    }

    onUpload = (e) => {
        const { handleState, handleChangeDetailModal } = this.props
        if (e.size < 2097152) {
            var craeteUrl = URL.createObjectURL(e);
            handleState('photoUrl', craeteUrl)
            handleState('photo', e)
            handleChangeDetailModal('uploadFile', e)
        } else {
            messages("Warning", "Image must smaller than 2MB!!", "warning", false)
        }
    }
    onDownload = (e) => {
        saveAs(e);
    }
    mapDisplay = (dataDis) => {
        const { RecruitmentPhase, handleChangeDetailModal, submitUploadResult } = this.props;
        const { company } = RecruitmentPhase.modal.Interview;
        const { getFieldDecorator } = this.props.form
        const rowStyle = {
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap',
        };
        const colStyle = {
            marginBottom: '-15px',
        };
        return (
            dataDis.map((x, y) => {
                return (
                    <div>
                        <Row style={rowStyle} justify='start'>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <InputNonForm
                                        labelField='Nama Calon'
                                        disabled={true}
                                        name='name'
                                        id='name'
                                        value={x.ApplicantName}
                                    // onChange={handleStateModalDetail}
                                    />
                                </Col>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <InputNonForm
                                        labelField='Company'
                                        disabled={true}
                                        name='company'
                                        id='company'
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        value={company}
                                    // onChange={handleStateModalDetail}
                                    />
                                </Col>
                            </Col>
                        </Row>
                        <Row style={rowStyle} justify='start'>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <InputNonForm
                                        labelField='Nama Posisi'
                                        disabled={true}
                                        name='position'
                                        id='position'
                                        value={x.Position}
                                    // onChange={handleStateModalDetail}
                                    />
                                </Col>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <InputNonForm
                                        labelField='Interviewer'
                                        disabled={true}
                                        name='interviewer'
                                        id='interviewer'
                                        value={x.Interviewer}
                                    // onChange={handleStateModalDetail}
                                    />
                                </Col>
                            </Col>
                        </Row>
                        <Row style={rowStyle} justify='start'>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <InputNonForm
                                        labelField='Dept/Div'
                                        disabled={true}
                                        name='dept'
                                        id='dept'
                                        value={x.Department}
                                    // onChange={handleStateModalDetail}
                                    />
                                </Col>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <h5>Tgl Wawancara</h5>
                                    <DatePicker
                                        labelField='Tgl Wawancara'
                                        disabled={true}
                                        name='tanggal'
                                        id='tanggal'
                                        className='modal-datepicker'
                                        value={moment(x.InterviewDate, "DD/MM/YYYY")}
                                    // onChange={handleStateModalDetail}
                                    />
                                </Col>
                            </Col>
                        </Row>

                        <Row style={rowStyle} justify='start' className='text-center'>
                            <Col
                                md={24}
                                sm={24}
                                xs={24}
                                style={{ marginTop: '1.8rem' }}>
                                <Divider>Hasil Interview</Divider>
                            </Col>
                        </Row>
                        <Row style={rowStyle} justify='start' className='text-center'>
                            <Col md={24} sm={24} xs={24}>
                                {/* <Upload accept="image/*" showUploadList={false} beforeUpload={this.onUpload} multiple={false}>
                            <Button disabled={true} type="primary"><Icon type="upload" />Upload Interview Form</Button>
                        </Upload> */}
                                <Button type="primary" onClick={() => this.onDownload(x.UploadedInterviewForm)}><Icon type="download" />Download Interview Form</Button>
                                {/* <div><a href={UploadedInterviewForm} >File</a></div> */}
                            </Col>
                        </Row>
                        <Row style={rowStyle} justify='start' className='text-center'>
                            <Col md={24} sm={24} xs={24}>
                                <h2>Form Penilaian Interview</h2>
                            </Col>
                        </Row>
                        <Row style={rowStyle} justify='start' className='text-center'>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <h5>Kompetensi Teknikal <span style={{color:"red"}}>*</span></h5>
                                    <TextArea rows={4} style={{ width: '92%' }} value={x.KompetensiTeknikal} disabled={true} onChange={(e) => {
                                        handleChangeDetailModal('kompetensiTeknikalInter', e.target.value)
                                    }} />
                                </Col>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <h5>Kompetensi Non Teknikal <span style={{color:"red"}}>*</span></h5>
                                    <TextArea rows={4} style={{ width: '92%' }} disabled={true} value={x.KompetensiNonTeknikal} onChange={(e) => handleChangeDetailModal('kompetensiNonTeknikalInter', e.target.value)} />
                                </Col>
                            </Col>
                        </Row>
                        <Row style={rowStyle} justify='start' className='text-center'>
                            <Col md={24} sm={24} xs={24}>
                                <h2 style={{ marginTop: '2rem' }}>Area Pengembangan</h2>
                            </Col>
                        </Row>
                        <Row style={rowStyle} justify='start' className='text-center'>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <h5>Kompetensi Teknikal <span style={{color:"red"}}>*</span></h5>
                                    <TextArea rows={4} style={{ width: '92%' }} disabled={true} value={x.KompetensiTeknikalAP} onChange={(e) => handleChangeDetailModal('kompetensiTeknikalArea', e.target.value)} />
                                </Col>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <h5>Kompetensi Non Teknikal <span style={{color:"red"}}>*</span></h5>
                                    <TextArea rows={4} style={{ width: '92%' }} disabled={true} value={x.KompetensiNonTeknikalAP} onChange={(e) => handleChangeDetailModal('kompetensiNonTeknikalArea', e.target.value)} />
                                </Col>
                            </Col>
                        </Row>
                        <Row
                            style={rowStyle}
                            justify='center'
                            className='text-center'>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <h5
                                        style={{
                                            marginTop: '2rem',
                                            textAlign: 'left',
                                            textIndent: '20px',
                                        }}>
                                        Catatan
                                        <span style={{color:"red"}}>*</span>
                                    </h5>
                                    <TextArea rows={4} disabled={true} style={{ width: '96%' }} value={x.InterviewResultNotes} onChange={(e) => handleChangeDetailModal('notes', e.target.value)} />
                                </Col>
                            </Col>
                        </Row>
                        <Row
                            style={rowStyle}
                            justify='start'
                            className='text-center mt-2'>
                            <Col md={18} sm={18} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="Kesimpulan"
                                        name="kesimpulam"
                                        id="kesimpulan"
                                        disabled={false}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={true}
                                        initialValue={x.InterviewResultKesimpulan}
                                        onChange={(e) => handleChangeDetailModal('kesimpulan', e)}
                                        data={[{ id: 'Disarankan', name: 'Disarankan' }, { id: 'Dipertimbangkan', name: 'Dipertimbangkan' }, { id: 'Tidak Disarankan', name: 'Tidak Disarankan' }]}
                                        isRequired={true}
                                        validation={
                                            [
                                                {
                                                    required: false,
                                                    message: "Please enter the Kesimpulan"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Col>
                            <Col md={2} sm={2} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="Golongan"
                                        name="golonganNum"
                                        id="golonganNum"
                                        disabled={false}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={true}
                                        initialValue={x.InterviewResultGolNumeric}
                                        onChange={(e) => handleChangeDetailModal('golonganNum', e)}
                                        data={[{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }]}
                                        isRequired={true}
                                        allowClear={true}
                                        validation={
                                            [
                                                {
                                                    required: false,
                                                    message: "Please enter the Golongan"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Col>
                            <Col offset={1} md={2} sm={2} xs={24} style={colStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="Golongan"
                                        name="golonganApl"
                                        id="golonganApl"
                                        disabled={false}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        disabled={true}
                                        initialValue={x.InterviewResultGolAlphabet}
                                        onChange={(e) => handleChangeDetailModal('golonganApl', e)}
                                        data={[{ id: 'A', name: 'A' }, { id: "B", name: 'B' }, { id: "C", name: 'C' }]}
                                        isRequired={true}
                                        allowClear={true}
                                        validation={
                                            [
                                                {
                                                    required: false,
                                                    message: "Please enter the Golongan"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Col>
                        </Row>

                        <Row
                            style={rowStyle}
                            justify='start'
                            className='text-center mt-2'>
                            <Button disabled={true} type='primary' onClick={() => {
                                submitUploadResult()
                            }}>
                                Save Interview Result
                            </Button>
                        </Row>

                    </div>
                )
            })
        )
    }
    render() {
        const { sourceTable, RecruitmentPhase, handleStatePosisi, handleChangeDetailModal, submitUploadResult, viewResult, handleStateGlobal, title } = this.props;
        const { ApplicationId, Interviewer, ApplicantName, Position, Department, InterviewDate, UploadedInterviewForm, KompetensiTeknikal, KompetensiNonTeknikal,
            KompetensiTeknikalAP, KompetensiNonTeknikalAP, InterviewResultNotes, tanggalSearch, InterviewResultKesimpulan, InterviewResultGolNumeric, InterviewResultGolAlphabet } = RecruitmentPhase.dataViewResult;
        const { getFieldDecorator } = this.props.form
        const colStyle = {
            marginBottom: '-15px',
        };
        const rowStyle = {
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap',
        };
        return (
            <React.Fragment>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        fontSize: 20,
                    }}>
                    VIEW INTERVIEW RESULT
                </div>
                <div>
                    <Row style={rowStyle} justify='start'>
                        <Col md={12} sm={12} xs={24} >
                            <Col md={24} sm={24} xs={24} >
                                <h5>Tgl Wawancara</h5>
                                <DatePicker
                                    labelField='Tgl Wawancara'
                                    disabled={false}
                                    name='tanggalSearch'
                                    id='tanggalSearch'
                                    className='modal-datepicker'
                                    format={"DD/MM/YYYY"}
                                    value={RecruitmentPhase.tanggalSearch}
                                    onChange={(e) => handleStateGlobal('tanggalSearch', e)}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Button type='prymary' onClick={() => { viewResult("", "cari") }}>Cari</Button>
                            </Col>
                        </Col>
                    </Row>
                    {/* <Row style={rowStyle} justify='start'>

                    </Row> */}
                </div>
                <Carousel >
                    {/* afterChange={onChange} */}
                    {this.mapDisplay(RecruitmentPhase.dataViewResult)}
                </Carousel>


                <Row style={rowStyle} justify='start'>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Button
                                style={{ marginTop: '2rem' }}
                                onClick={() => {
                                    handleStatePosisi(3)
                                    let changeStep = {
                                        ...RecruitmentPhase.interviewType,
                                        step: 3,
                                        interviewType: title,
                                    }
                                    handleStateGlobal('interviewType', changeStep);
                                }}>
                                <Icon type='left' />
                                Previous Page
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    RecruitmentPhase: state.RecruitmentPhase,
    Auth: state.Auth,
    userRole: state.Auth.roleName,
});

const WrappedForm = Form.create()(Step4);

export default connect(mapStateToProps, {
    ...actions,
    ...actions_auth,
})(WrappedForm);
