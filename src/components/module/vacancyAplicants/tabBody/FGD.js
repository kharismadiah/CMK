import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa';
import { saveAs } from 'file-saver';

import Button, { ButtonGroup } from '../../../uielements/button';
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm';
import TextArea from '../../../CustomComponentAntd/customTextAreaNonForm';
import ImgUser from '../../../../image/ImgUser.png'

export default class FGD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkAll: false
        }
    }

    onDownload = () => {
        const { dataFgd } = this.props
        saveAs(dataFgd.TestResultLink);
    }

    render() {
        const { dataPersonal, dataFgd } = this.props
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
                    Candidate's FGD Test Result
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
                                value={dataFgd.TestDate}
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
                                value={dataFgd.TestResult}
                                onChange={() => { }}
                                required={true}
                            />
                        </Col>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <TextArea
                                labelField="Notes"
                                disabled={true}
                                name="notes"
                                id="notes"
                                value={dataFgd.Notes}
                                onChange={(e) => { }}
                            />
                        </Col>
                    </Col>
                </Row>

                <Row style={rowStyle} justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Button type="primary" disabled={dataFgd.TestResultLink === "" || dataFgd.TestResultLink === undefined} onClick={this.onDownload}>
                            <Icon type="down-circle" /> Download FGD Test Result
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }
}