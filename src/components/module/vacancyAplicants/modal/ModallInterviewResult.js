import React, { Component } from 'react'
import { Col, Row, DatePicker, Divider, Icon, Upload, Button, message, Input, Carousel, Modal, Tooltip } from 'antd'
import Form from '../../../uielements/form'
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm'
import Select from '../../../CustomComponentAntd/customSelect'
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../../../../redux/RecruitmentPhase/action'
import { saveAs } from 'file-saver'
import './ModalInterviewResult.scss'

const { TextArea } = Input

class ModallInterviewResult extends Component {
    mapDisplay = dataDis => {
        // const { RecruitmentPhase, handleChangeDetailModal, submitUploadResult } = this.props;
        const { getFieldDecorator } = this.props.form
        const rowStyle = {
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap'
        }
        const colStyle = {
            marginBottom: '15px'
        }
        const headerCoLStyle = {
            display: 'flex',
            justifyContent: 'flex-end'
        }

        return dataDis.map((x, y) => {
            return (
                <div>
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24} style={headerCoLStyle}>
                            <Col md={2} sm={2} xs={2} style={colStyle}>
                                <Tooltip
                                    title={x.UrlDownloadFile == 0 ? 'Attachment not available' : 'Download Attachment'}
                                    onClick={() =>
                                        x.UrlDownloadFile == 0
                                            ? null
                                            : this.onDownloadAttchment(x.UrlDownloadFile, x.FileNameDownload)
                                    }
                                >
                                    <Icon
                                        type="download"
                                        style={{
                                            fontSize: 20,
                                            padding: '1px',
                                            cursor: 'pointer',
                                            color: x.UrlDownloadFile == 0 ? '#c9bfbf' : null
                                        }}
                                    />
                                </Tooltip>
                            </Col>
                            <Col md={2} sm={2} xs={2} style={colStyle}>
                                <Tooltip
                                    title="Save PDF"
                                    onClick={() =>
                                        this.onDownloadPdf(
                                            x.applicantId,
                                            x.applicationId,
                                            x.InterviewResultId,
                                            x.ApplicantName
                                        )
                                    }
                                >
                                    <Icon
                                        type="save"
                                        style={{
                                            fontSize: 20,
                                            padding: '1px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Tooltip>
                            </Col>
                        </Col>
                    </Row>
                    <Row style={rowStyle} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <InputNonForm
                                    labelField="Nama Calon"
                                    disabled={true}
                                    name="name"
                                    id="name"
                                    value={x.ApplicantName}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <InputNonForm
                                    labelField="Interviewer"
                                    disabled={true}
                                    name="interviewer"
                                    id="interviewer"
                                    value={x.Interviewer}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <InputNonForm
                                    labelField="Nama Posisi"
                                    disabled={true}
                                    name="position"
                                    id="position"
                                    value={x.Position}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <InputNonForm
                                    labelField="Kesimpulan"
                                    disabled={true}
                                    name="Kesimpulan"
                                    id="Kesimpulan"
                                    value={x.InterviewResultKesimpulan}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <InputNonForm
                                    labelField="Dept/Div"
                                    disabled={true}
                                    name="dept"
                                    id="dept"
                                    value={x.Department}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <InputNonForm
                                    labelField="Golongan"
                                    disabled={true}
                                    name="golongan"
                                    id="golongan"
                                    value={x.InterviewResultGolNumeric}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <h5>Tgl Wawancara</h5>
                                <DatePicker
                                    labelField="Tgl Wawancara"
                                    disabled={true}
                                    name="tanggal"
                                    id="tanggal"
                                    className="modal-datepicker"
                                    value={moment(x.InterviewDate, 'DD/MM/YYYY')}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24}>
                                <InputNonForm
                                    labelField="Sub-Golongan"
                                    disabled={true}
                                    name="subgolongan"
                                    id="subgolongan"
                                    value={x.InterviewResultGolAlphabet}
                                    allowClear={true}
                                    // onChange={handleStateModalDetail}
                                />
                            </Col>
                        </Col>
                    </Row>

                    <Row style={rowStyle} justify="start" className="text-center">
                        <Col md={24} sm={24} xs={24}>
                            <h2>Form Penilaian Interview</h2>
                        </Col>
                    </Row>
                    <Row style={rowStyle} justify="start" className="text-center">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <h5>Kompetensi Teknikal</h5>
                                <TextArea
                                    rows={4}
                                    style={{ width: '92%' }}
                                    value={x.KompetensiTeknikal}
                                    disabled={true}
                                    onChange={e => {
                                        // handleChangeDetailModal('kompetensiTeknikalInter', e.target.value)
                                    }}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <h5>Kompetensi Non Teknikal</h5>
                                <TextArea
                                    rows={4}
                                    style={{ width: '92%' }}
                                    disabled={true}
                                    value={x.KompetensiNonTeknikal}
                                    onChange={e => {
                                        // handleChangeDetailModal('kompetensiNonTeknikalInter', e.target.value)}
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row style={rowStyle} justify="start" className="text-center">
                        <Col md={24} sm={24} xs={24}>
                            <h2 style={{ marginTop: '2rem' }}>Area Pengembangan</h2>
                        </Col>
                    </Row>
                    <Row style={rowStyle} justify="start" className="text-center">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <h5>Kompetensi Teknikal</h5>
                                <TextArea
                                    rows={4}
                                    style={{ width: '92%' }}
                                    disabled={true}
                                    value={x.KompetensiTeknikalAP}
                                    onChange={e => {
                                        // handleChangeDetailModal('kompetensiTeknikalArea', e.target.value)
                                    }}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <h5>Kompetensi Non Teknikal</h5>
                                <TextArea
                                    rows={4}
                                    style={{ width: '92%' }}
                                    disabled={true}
                                    value={x.KompetensiNonTeknikalAP}
                                    onChange={e => {
                                        // handleChangeDetailModal('kompetensiNonTeknikalArea', e.target.value)
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row style={rowStyle} justify="center" className="text-center">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <h5
                                    style={{
                                        marginTop: '2rem',
                                        textAlign: 'left',
                                        textIndent: '20px'
                                    }}
                                >
                                    Catatan
                                </h5>
                                <TextArea
                                    rows={4}
                                    disabled={true}
                                    style={{ width: '96%' }}
                                    value={x.InterviewResultNotes}
                                    onChange={e => {
                                        // handleChangeDetailModal('notes', e.target.value)
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                </div>
            )
        })
    }

    onDownloadAttchment = (UrlDownloadFile, FileNameDownload) => {
        const { downloadAttachment } = this.props
        downloadAttachment(UrlDownloadFile, FileNameDownload)
        // saveAs(UrlDownloadFile, FileNameDownload)
    }

    onDownloadPdf = (ApplicantId = 0, ApplicationId = 0, InterviewResultId = 0, ApplicantName = '') => {
        let { downloadPdf } = this.props
        downloadPdf(ApplicantId, ApplicationId, InterviewResultId, ApplicantName)
    }

    render() {
        let { title, visible, handleState, checked, onSubmit, dataList } = this.props
        const rowStyle = {
            marginBottom: 15
        }
        const colStyle = {
            textAlign: 'center'
        }

        let data = dataList.map(x => {
            return {
                applicantId: x.applicantId,
                applicationId: x.applicationId,
                InterviewResultId: x.InterviewResultId,
                UrlDownloadFile: x.UrlDownloadFile,
                FileNameDownload: x.FileNameDownload,
                ApplicantName: x.ApplicantName,
                Position: x.Position,
                Interviewer: x.Interviewer,
                // Department: x.Department,
                Department: x.Department,
                UploadedInterviewForm: '',
                InterviewResultKesimpulan: x.InterviewResultKesimpulan,
                InterviewResultGolNumeric: x.InterviewResultGolNumeric,
                InterviewResultGolAlphabet: x.InterviewResultGolAlphabet,
                InterviewDate: x.InterviewDate,
                KompetensiTeknikal: x.kompetensiTeknikalInter,
                KompetensiNonTeknikal: x.kompetensiNonTeknikalInter,
                KompetensiTeknikalAP: x.kompetensiTeknikalArea,
                KompetensiNonTeknikalAP: x.kompetensiNonTeknikalArea,
                InterviewResultNotes: x.notes
            }
        })

        return (
            <Modal
                title={'FORM HASIL INTERVIEW'}
                visible={visible}
                onCancel={() => {
                    handleState('visible', false)
                }}
                onOk={onSubmit}
                // okText="Yes"
                // cancelText="No"
                width={'60%'}
            >
                <Carousel>{this.mapDisplay(data)}</Carousel>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    RecruitmentPhase: state.RecruitmentPhase,
    Auth: state.Auth,
    userRole: state.Auth.roleName
})

const WrappedForm = Form.create()(ModallInterviewResult)

export default connect(
    mapStateToProps,
    {
        ...actions
    }
)(WrappedForm)
