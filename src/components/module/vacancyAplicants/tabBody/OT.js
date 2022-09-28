import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa';
import Button, { ButtonGroup } from '../../../uielements/button';
import { saveAs } from 'file-saver';

import InputNonForm from '../../../CustomComponentAntd/customInputNonForm';
import TextArea from '../../../CustomComponentAntd/customTextAreaNonForm';
import ImgUser from '../../../../image/ImgUser.png'

export default class OT extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkAll: false
        }
    }

    onDonwload = () => {
        const { dataOnline } = this.props
        saveAs(dataOnline.TestResultLink);
    }

    render() {
        const { dataPersonal, dataOnline } = this.props
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
                    Candidate's Online Test Result
                </div>
                <div style={{ display: 'flex', marginTop: 30 }}>
                    <div style={{ width: 100 }}>
                        <img loading="lazy" style={{ width: 80, height: 80 }} src={dataPersonal.ProfilePicUrl !== '' ? dataPersonal.ProfilePicUrl : ImgUser} />
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
                                value={dataOnline.TestDate}
                                onChange={() => { }}
                                required={true}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Hasil Test"
                                disabled={true}
                                name="hasilTest"
                                id="hasilTest"
                                value={dataOnline.TestResult}
                                onChange={() => { }}
                                required={true}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Test Tool"
                                disabled={true}
                                name="testTool"
                                id="testTool"
                                value={dataOnline.TestTool}
                                onChange={() => { }}
                                required={true}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Cut Off Code"
                                disabled={true}
                                name="cutOffCode"
                                id="cutOffCode"
                                value={dataOnline.CutOffCode}
                                onChange={() => { }}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Cut Off Name"
                                disabled={true}
                                name="cutOffName"
                                id="cutOffName"
                                value={dataOnline.CutOffName}
                                onChange={() => { }}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <TextArea
                                labelField="Notes"
                                disabled={true}
                                name="notes"
                                id="notes"
                                value={dataOnline.Notes}
                                onChange={(e) => { }}
                            />
                        </Col>
                    </Col>
                </Row>

                <Row style={rowStyle} justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Button type="primary"
                            disabled={dataOnline.TestResultLink === "" || dataOnline.TestResultLink === undefined}
                            onClick={this.onDonwload}>
                            <Icon type="down-circle" /> Download Online Test Result
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }
}