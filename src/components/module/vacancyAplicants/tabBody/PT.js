import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa';
import Button, { ButtonGroup } from '../../../uielements/button';
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm';
import TextArea from '../../../CustomComponentAntd/customTextAreaNonForm';
import ImgUser from '../../../../image/ImgUser.png'

export default class PT extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkAll: false
        }
    }

    onDownload = () => {
        const { dataPT } = this.props
        saveAs(dataPT.TestResultLink);
    }

    render() {
        const { dataPersonal, dataPT } = this.props
        let isCBT = location.pathname.includes("psychologicalTestCBT")
        let phase = parseInt(window.location.pathname.slice(-3).match(/\d+/)[0])
        const colStyle = {
            marginBottom: '-5px'
        };
        const rowStyle = {
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap'
        };

        return (
            <div style={{ margin: '0 40px 40px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, fontSize: 20 }}>
                    Candidate's Psychological Test Result
                </div>
                <div style={{ display: 'flex', marginTop: 30 }}>
                    <div style={{ marginRight: 20 }}>
                        <img loading="lazy" style={{ maxWidth: 100, maxHeight: 100 }} src={dataPersonal.ProfilePicUrl !== '' ? dataPersonal.ProfilePicUrl : ImgUser} />
                    </div>
                    <div>
                        <div style={{ fontSize: 17 }}>{dataPersonal.ApplicantName}</div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
                            <FaRegClock style={{ marginRight: 5 }} /> 1 Menit
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
                            <FaRegBuilding style={{ marginRight: 5 }} /> {dataPersonal.UniversityName} - {dataPersonal.MajorName}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
                            <FaGraduationCap style={{ marginRight: 5 }} /> GPA {dataPersonal.GPA}
                        </div>
                    </div>
                </div>

                <Row style={rowStyle} justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Tanggal Test"
                                disabled={true}
                                name="tglTest"
                                id="tglTest"
                                value={dataPT.TestDate}
                                required={true}
                                onChange={() => { }}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Hasil Test"
                                disabled={true}
                                name="hasilTest"
                                id="hasilTest"
                                value={dataPT.TestResult}
                                required={true}
                                onChange={() => { }}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Test Tool"
                                disabled={true}
                                name="testTool"
                                id="testTool"
                                value={dataPT.TestTool}
                                required={true}
                                onChange={() => { }}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Cut Off Code"
                                disabled={true}
                                name="cutOffCode"
                                id="cutOffCode"
                                value={dataPT.CutOffCode}
                                onChange={() => { }}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Cut Off Name"
                                disabled={true}
                                name="cutOffName"
                                id="cutOffName"
                                value={dataPT.CutOffName}
                                onChange={() => { }}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <TextArea
                                labelField="Notes"
                                disabled={true}
                                name="notes"
                                id="notes"
                                value={dataPT.Notes}
                                onChange={(e) => { }}
                            />
                        </Col>
                    </Col>
                </Row>

                <Row style={rowStyle} justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Button type="primary" disabled={dataPT.TestResultLink === "" || dataPT.TestResultLink === undefined} onClick={this.onDownload}>
                            <Icon type="down-circle" /> Download Psychological Test Result
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }
}