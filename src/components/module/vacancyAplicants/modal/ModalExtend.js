import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Row, Col, Checkbox } from 'antd';
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput';
import Select from '../../../CustomComponentAntd/customSelect';

class ModalExtend extends Component {

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
        handleState('modalExtend', 'visible', false)
        handleState('modalExtend', 'VacancyId', '')
        handleState('modalExtend', 'ApplicantId', '')
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
        this.props.onAction('Fail')
    }


    render() {
        const { visible, feedback, checked, handleState, onSend, handleStateGlobal, SourceCompany, interviewCompanyId, IsInteviewResult, feedback1, phase, onExtend } = this.props
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
                title="Extend Candidate Pool Duration"
                visible={visible}
                onCancel={this.onCancelModal}
                onOk={() => {
                    onExtend()
                }}
                okText="Yes"
            >
                <div>
                    Are you sure to extend Candidate Pool duration to this candidate ?
               </div>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalExtend);
export default WrappedForm