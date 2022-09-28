import React, { Component } from 'react';
import { Modal, Row, Col, Checkbox } from 'antd';
import Form from '../../../uielements/form'

class ModalCustomAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            checked: false
        }
    }

    onCancelModal = () => {
        const { handleState, isVisisbleSubmit } = this.props
        if (isVisisbleSubmit) {
            handleState('modalCustomAction', 'visibleSubmit', false)
        } else {
            handleState('modalCustomAction', 'visible', false)
        }
    }

    onCancelCustom = () => {
        const { handleState, handleStateTitle, isInterview = false, title, handleStateGlobal } = this.props
        handleState('modalCustomAction', 'visible', false)
        if (isInterview) {
            const changeStep = {
                step: 1,
                interviewType: '',
                company: null,
            };
            handleStateTitle('')
            handleStateGlobal("interviewType", changeStep)
        }
    }

    render() {
        const { visible, handleState, checked, onSubmit, dataList, text, title, isVisisbleSubmit } = this.props
        const rowStyle = {
            marginBottom: 15
        }
        const colStyle = {
            textAlign: 'center'
        };

        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={() => isVisisbleSubmit ?
                    handleState('modalCustomAction', 'visibleSubmit', false)
                    :
                    this.onCancelCustom()
                }
                onOk={() => onSubmit()}
                okText="Yes"
                cancelText="No"
            >
                <Row justify="start" style={rowStyle}>
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        {text}
                    </Col>
                </Row>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalCustomAction);
export default WrappedForm