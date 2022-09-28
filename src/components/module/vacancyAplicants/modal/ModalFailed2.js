import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Row, Col, DatePicker } from 'antd';
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput';
import Select from '../../../CustomComponentAntd/customSelect';

class ModalFailed2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            isEdit: false
        }
    }

    onEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    onCancelModal = () => {
        const { resetCheckAction, handleState } = this.props
        handleState('modalFailed2', 'visible', false)
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


    handleChange = (value) => {
        const { handleState } = this.props
        handleState('modalFailed2', 'checked', value)
        this.setState({
            checked: false
        })
    }

    render() {
        const { visible, NamaCalon, NamaPosition, Department, interviewer, interviewerJobPosition, interviewDate, handleState, onSend, SourceCompany, interviewCompanyId } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit, isEdit } = this.state
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
                title="Failed Candidate"
                visible={visible}
                onCancel={this.onCancelModal}
                onOk={() => onSend()}
                okText="Send"
            >
                <Form onSubmit={this.onSubmit}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Kandidat belum memiliki hasil interview
                        </Col>
                    </Row>
                    <>
                        Feedback
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <Select
                                    labelField=""
                                    name="feedback"
                                    id="feedback"
                                    initialValue={feedback}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={handleState}
                                    onSubmit={onSubmit}
                                    data={[
                                        { id: 'Failed the interview process', text: 'Failed the interview process' },
                                        { id: 'Offering ', text: 'Offering' }
                                    ]}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <Select
                                    labelField=""
                                    name="feedback1"
                                    id="feedback1"
                                    initialValue={feedback1}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={handleState}
                                    onSubmit={onSubmit}
                                    data={[
                                        { value: 'Compensation & Benefit', text: 'Compensation & Benefit' },
                                        { value: 'Personal Reason', text: 'Personal Reason' }
                                    ]}
                                />
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Checkbox checked={checked} onChange={(e) => this.handleChange(e.target.checked)} /> Beri Notifikasi Kandidat
                    </Col>
                        </Row>

                    </>
                </Form>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalFailed2);
export default WrappedForm