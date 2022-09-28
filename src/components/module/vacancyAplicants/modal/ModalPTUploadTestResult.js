import React, { Component } from 'react';
import { Modal, Row, Col, Icon, Radio, Upload, DatePicker, Table } from 'antd';
import Form from '../../../uielements/form'
// import Datepicker from '../../../CustomComponentAntd/customDatePicker';
import Input from '../../../CustomComponentAntd/customInput';
import Button from '../../../uielements/button';
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm';
import moment from 'moment'
import TextArea from '../../../CustomComponentAntd/customTextAreaNonForm'

class ModalPTUploadTestResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
        }
    }

    onCancel = () => {
        const { initStateFormEmail, resetModal } = this.props
        initStateFormEmail()
        resetModal("modalPsychologicalTest")
    }

    onCancelModal = () => {
        const { handleState } = this.props
        handleState('visible', false)
        let file = { name: '' }
        handleState('uploadFile', file)
        handleState('eventName', '')
        handleState('vacancyTitle', '')
        handleState('position', '')
        handleState('company', '')
        handleState('uploadResult', [])
        this.props.form.resetFields()
    }

    onUpload = (e) => {
        const { handleState } = this.props
        handleState('uploadFile', e)
    }

    onSubmit = (e) => {
        const { onSubmit, onUploadTestResult} = this.props
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                onUploadTestResult()
            } else {
                this.setState({
                    onSubmit: !this.state.onSubmit
                })
            }
        })
    }

    render() {
        const { title, tglTest='', hasilTest='', notesOnline='', handleState, data } = this.props
        const { visible, ApplicationId, eventName, vacancyTitle, position, company, uploadFile, uploadResult} = this.props.state
        const { getFieldDecorator } = this.props.form
        const columns = [
            {
                title: "No",
                dataIndex: "No",
                key: "No",
                sorter: (a, b) => {return a.No.toString().localeCompare(b.No.toString())},
            },
            {
                title: "Candidate Email",
                dataIndex: "CandidateEmail",
                key: "CandidateEmail",
                sorter: (a, b) => { return a.CandidateEmail.toString().localeCompare(b.CandidateEmail.toString())},
            },
            {
                title: "Column",
                dataIndex: "Column",
                key: "Column",
                sorter: (a, b) => {return a.Column.toString().localeCompare(b.Column.toString())},
            },
            {
                title: "Row",
                dataIndex: "Row",
                key: "Row",
                sorter: (a, b) => {return a.Row.toString().localeCompare(b.Row.toString())},
            },
            {
                title: "Error",
                dataIndex: "Error",
                key: "Error",
                sorter: (a, b) => {return a.ErrorMessage.toString().localeCompare(b.ErrorMessage.toString())},
            }
        ];
        const colStyle = {
            marginBottom: '10px'
        };
        const colStyle2 = {
            marginBottom: '20px'
        };
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
        };
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        };

        return (
            <Form>
                <Modal
                    title={title}
                    visible={visible}
                    onCancel={() => {this.onCancelModal()}}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
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
                                placeholder="Upload File Name"
                                disabled={true}
                                name="uploadFile"
                                id="uploadFile"
                                value={uploadFile.name}
                                onSubmit={this.state.onSubmit}
                            />
                        </Col>
                        <Col md={10} sm={10} xs={10} style={{ ...colStyle2}}>
                            <Upload accept=".xls, .xlsx, .csv" showUploadList={false} beforeUpload={this.onUpload} multiple={false}>
                                <Button type="primary" style={{ marginRight: 10 }}><Icon type="upload" />Browse</Button>
                            </Upload>
                            <Button type="primary" onClick={this.onSubmit.bind(this)}>Upload</Button>
                        </Col>
                    </Row>              
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle2}>
                            <Table
                                columns={columns}
                                dataSource={uploadResult}
                            />
                        </Col>
                    </Row>
                </Modal>
            </Form>
        )
    }
}

const WrappedForm = Form.create()(ModalPTUploadTestResult);
export default WrappedForm