import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Row, Col, DatePicker } from 'antd';
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput';
import Select from '../../../CustomComponentAntd/customSelect';
import moment from 'moment'

class ModalEditIterview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            isEdit: false
        }

        this.handleSave = this.handleSave.bind(this)
    }

    onEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    onCancelModal = () => {
        const { resetCheckAction, handleState } = this.props
        handleState('modalEditInterview', 'visible', false)
        this.setState({
            isEdit: false
        })
    }

    createMarkup = (subject, body, signature) => {
        return { __html: `<div>Subject ${subject}</div><div>${body}</div><div>${signature}</div>` };
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    handleSave = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onSend()
            } else {
                this.setState({
                    onSubmit: !this.state.onSubmit
                  })
            }
        })
    }

    render() {
        const { visible, NamaCalon, NamaPosition, Department, interviewer, interviewerJobPosition, interviewDate, handleState, onSend, SourceCompany, interviewCompanyId, isHired } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit, isEdit } = this.state
        let _interviewDate = moment(interviewDate, 'DD/MM/YYYY')
        const colStyle = {
            textAlign: 'center'
        };
        const colStyle2 = {
            marginBottom: '-15px',
            position: "relative",
        };
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        };
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        };

        return (
            <Modal
                title="Edit Interviewer"
                visible={visible}
                onCancel={this.onCancelModal}
                onOk={this.handleSave.bind(this)}
                // okText="Send"
                okText="Save"
                okButtonProps={{disabled: isHired}}
            >
                <Form onSubmit={this.onSubmit}>
                    {/* <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Please review the redactional of email invitation first
                        </Col>
                    </Row> */}
                    <>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <Input
                                    labelField="Nama Calon"
                                    name="NamaCalon"
                                    id="NamaCalon"
                                    initialValue={NamaCalon}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={handleState}
                                    onSubmit={onSubmit}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <div style={{ width: '91%' }}>
                                    <Input
                                        labelField="Nama Posisi"
                                        name="NamaPosition"
                                        id="NamaPosition"
                                        initialValue={NamaPosition}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <div style={{ width: '91%' }}>
                                    <Input
                                        labelField="Dept/Div"
                                        name="Department"
                                        id="Department"
                                        initialValue={Department}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <div style={{ width: '91%' }}>
                                    <Select
                                        labelField='Company'
                                        disabled={true}
                                        name='company'
                                        id='company'
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        initialValue={interviewCompanyId}
                                        data={SourceCompany}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <div style={{ width: '91%' }}>
                                    <Input
                                        labelField="Interviewer"
                                        name="interviewer"
                                        id="interviewer"
                                        initialValue={interviewer}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={(name, value) => {
                                            handleState('modalEditInterview', name, value)
                                        }}
                                        onSubmit={onSubmit}
                                        disabled={false}
                                        isRequired={true}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Interviewer"
                                                }
                                            ]
                                        }
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <div style={{ width: '91%' }}>
                                    <Input
                                        labelField="Job Position"
                                        name="interviewerJobPosition"
                                        id="interviewerJobPosition"
                                        initialValue={interviewerJobPosition}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={(name, value) => handleState('modalEditInterview', name, value)}
                                        onSubmit={onSubmit}
                                        disabled={false}
                                        isRequired={true}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Job Position"
                                                }
                                            ]
                                        }
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                    <DatePicker
                                        labelField="Tgl Wawancara"
                                        name="interviewDate"
                                        id="interviewDate"
                                        value={_interviewDate}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        format={'DD/MM/YYYY'}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                    />
                            </Col>
                        </Row>

                    </>
                </Form>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalEditIterview);
export default WrappedForm