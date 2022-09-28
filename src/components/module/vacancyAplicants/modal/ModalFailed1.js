import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Row, Col, Checkbox } from 'antd';
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput';
import Select from '../../../CustomComponentAntd/customSelect';

class ModalFailed1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            isEdit: false
        }
    }

    componentDidUpdate(prevProps) {
        try {
            if (prevProps.clearFlagModalFailedInterview !== this.props.clearFlagModalFailedInterview && this.props.clearFlagModalFailedInterview) {
                this.props.form.resetFields()
                this.props.handleStateGlobal("clearFlagModalFailedInterview", false)
                this.props.resetModal()
            }
        }
        catch(e) {
            
        }
    }

    onEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    onCancelModal = () => {
        const { resetCheckAction, handleState, resetModal } = this.props
        handleState('modalFailed1', 'visible', false)
        this.setState({
            isEdit: false
        })
        this.props.form.setFields({
            feedback: '',
            feedback1: '',
            personalReason: ''
        })

        this.props.form.resetFields()
        
        resetModal()
    }

    createMarkup = (subject, body, signature) => {
        return { __html: `<div>Subject ${subject}</div><div>${body}</div><div>${signature}</div>` };
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            isEdit: !this.state.isEdit
        })
        this.props.onAction('Fail')
    }


    handleChange = (value) => {
        const { handleState, handleStateGlobal } = this.props
        handleState('modalFailed1', 'checked', value)
        handleStateGlobal("isFailedCandidate", true)
        this.setState({
            checked: false
        })
    }

    setData = (status) => {
        const { masterData = [] } = this.props
        if (status) {
            let data = []
            masterData.FailedCauses.map(x => {
                if ((x.name.includes("Failed")) || (x.name.includes("Offering"))) {
                    data.push(x)
                }
            })
            return data
        } else {
            let data = []
            masterData.FailedCauses.map(x => {
                if ((x.name.includes("Criteria")) || (x.name.includes("Unreachable"))) {
                    data.push(x)
                }
            })
            return data
        }
    }

    render() {
        const { visible, feedback, checked, handleState, onSend, handleStateGlobal, SourceCompany, interviewCompanyId, IsInteviewResult, feedback1, phase, masterData, personalReason } = this.props
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
                onOk={() => onSend(phase)}
                okText="Send"
            >
                <Form onSubmit={this.onSubmit}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Kandidat {IsInteviewResult ? " sudah " : ' belum '} memiliki hasil interview
                        </Col>
                    </Row>
                    <>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <Select
                                    labelField="Feedback"
                                    name="feedback"
                                    id="feedback"
                                    initialValue={feedback}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={(e, det) => {
                                        handleState("modalFailed1", "feedback", det)
                                        handleState("modalFailed1", "feedbackId", e)
                                    }
                                    }
                                    onSubmit={onSubmit}
                                    data={this.setData(IsInteviewResult)
                                        // IsInteviewResult ? 
                                        //     [{ id: 'Failed the interview process', name: 'Failed the interview process' },
                                        //     { id: 'Offering', name: 'Offering' }]
                                        // : 
                                        //     [{ id: 'Criteria doesnt match (CV + FLK)', name: 'Criteria doesnt match (CV + FLK)' },
                                        //     { id: 'Unreachable', name: 'Unreachable' }]
                                    }
                                />
                            </Col>
                        </Row>
                        {feedback === "Offering" ?
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
                                        onChange={(e, det) => {
                                            handleState("modalFailed1", "feedback1", det)
                                            handleState("modalFailed1", "feedbackId1", e)
                                        }}
                                        onSubmit={onSubmit}
                                        data={masterData.FailedCausesDetail
                                            //     [
                                            //     { id: 'Compensation & Benefit', name: 'Compensation & Benefit' },
                                            //     { id: 'Personal Reason', name: 'Personal Reason' }
                                            // ]
                                        }
                                    />
                                </Col>
                            </Row>
                            : null
                        }
                        {feedback1.toLowerCase() === "personal reason" ?
                            <Row>
                                <Col md={16} sm={16} xs={16} style={colStyle2}>
                                    <Input
                                        labelField=""
                                        name="personalReason"
                                        id="personalReason"
                                        initialValue={personalReason}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={(e, det) => {
                                            handleState("modalFailed1", e, det)
                                        }}
                                        onSubmit={onSubmit}
                                    />
                                </Col>
                            </Row>
                            : null
                        }
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

const WrappedForm = Form.create()(ModalFailed1);
export default WrappedForm