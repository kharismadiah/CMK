import React, { Component } from 'react';
import { Modal, Row, Col, Button, Icon, Table, Upload } from 'antd';

import InputNonForm from '../../../CustomComponentAntd/customInputNonForm';

class ModalUploadTestResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            isEdit: false,
            name
        }
    }

    onBeforeUpload = (value) => {
        const {handleState} = this.props
        handleState('file', value)
        this.setState({ name: value.name })
    }

    onCancel = () => {
        const {handleState} = this.props
        handleState('visible', false)
    }

    render() {
        const {data, fetchUpload} = this.props
        const {name} = this.state

        const colStyle = {
            marginBottom: '10px'
        };

        const colStyle2 = {
            marginBottom: '20px'
        };

        const columns = [
            {
                title: "No",
                dataIndex: "no"
            },
            {
                title: "Candidate Email",
                dataIndex: "CandidateEmail"
            },
            {
                title: "Column",
                dataIndex: "Column"
            },
            {
                title: "Row",
                dataIndex: "Row"
            },
            {
                title: "Error",
                dataIndex: "Error"
            }
        ];
        
        return (
            <Modal
                title="Upload Test Result"
                visible={data.visible}
                onCancel={this.onCancel}
                footer={null}
                width="70%"
            >
                <Row justify="start">
                    <Col md={4} sm={4} xs={24} style={colStyle}>
                        Event Name
                    </Col>
                    <Col md={10} sm={10} xs={24} style={colStyle}>
                        : {data.eventName}
                    </Col>
                    <Col md={3} sm={3} xs={24} style={colStyle}>
                        Position
                    </Col>
                    <Col md={7} sm={7} xs={24} style={colStyle}>
                        : {data.position}
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={4} sm={4} xs={24} style={colStyle2}>
                        Vacancy Title
                    </Col>
                    <Col md={10} sm={10} xs={24} style={colStyle2}>
                        : {data.vacancyTitle}
                    </Col>
                    <Col md={3} sm={3} xs={24} style={colStyle2}>
                        Company
                    </Col>
                    <Col md={7} sm={7} xs={24} style={colStyle2}>
                        : {data.company}
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={14} sm={14} xs={14} style={colStyle2}>
                        <InputNonForm
                            labelField="Upload Form Template"
                            disabled={true}
                            name="uploadFormTemplate"
                            id="uploadFormTemplate"
                            value={name}
                            onSubmit={() => {}}
                        />
                    </Col>
                    <Col md={10} sm={10} xs={10} style={{...colStyle2, marginTop:15}}>
                        <Upload accept=".xls, .xlsx, .csv" showUploadList={false} beforeUpload={this.onBeforeUpload} multiple={false}>
                            <Button type="primary" style={{marginRight:10}}><Icon type="upload" /> Browse</Button>
                        </Upload>
                        <Button type="primary" onClick={fetchUpload}> Upload</Button>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle2}>
                        <Table
                            columns={columns}
                            dataSource={data.sourceTable}
                        />
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default ModalUploadTestResult