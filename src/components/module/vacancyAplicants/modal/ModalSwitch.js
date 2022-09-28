import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import Form from '../../../uielements/form'

class ModalSwitch extends Component{
    constructor(props){
        super(props);
        this.state = {
            onSubmit: false,
            checked: false
        }
    }

    render(){
        let {title, visible, handleState, onSubmit} = this.props
        let isCBT = location.pathname.includes("psychologicalTestCBT")
        let phase = parseInt(window.location.pathname.slice(-3).match(/\d+/)[0])
        let namePhase = isCBT ? "Non-CBT" : "CBT"
        const rowStyle = {
            marginBottom: 15
        }
        const colStyle = {
            textAlign:'center'
        };

        return(
            <Modal
                title={"Move to " + title}
                visible={visible}
                onCancel={() => handleState('visible', false)}
                onOk={onSubmit}
                okText="Yes"
                cancelText="No"
            >
                <Row justify="start" style={rowStyle}>
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        Are you sure to move selected candidate to {namePhase} ?
                    </Col>
                </Row>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalSwitch);
export default WrappedForm