import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import Form from '../../../uielements/form'
import Datepicker from '../../../CustomComponentAntd/customDatePicker';

class ModalHireCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
        }
    }

    onSubmit = (e) => {
        const {handleState, handleStateAction, onSend, dataList} = this.props
        e.preventDefault();
        this.props.form.validateFields(['date'], (err, values) => {
            if (!err) {
                handleState('isHire', true)
                handleState('visible', false)
                let paramHire = {
                    atsPhaseId: dataList.atsPhaseId,
                    vacancyId: dataList.vacancyId
                  }
                onSend(paramHire)
                // let data = {
                //     visible: true,
                //     actionName: 'Pass'
                //     }
                // handleStateAction(data)
            }else{
                this.setState({
                    onSubmit: !this.state.onSubmit
                })
            }
        })
    }

    onClose = () => {
        const {handleState, handleStateAction} = this.props
        handleState('visible', false)
        handleState('isHire', false)
        // let data = {
        //     visible: true,
        //     actionName: 'Pass'
        //     }
        // handleStateAction(data)
    }

    render() {
        const {onSend, visible, handleState, date} = this.props
        const { getFieldDecorator } = this.props.form;
        const rowStyle = {
            marginBottom: 15
        }
        const colStyle = {
            textAlign:'center'
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
          };
        return (
            <Modal
                title="Hire Kandidat"
                visible={visible}
                onCancel={() => this.onClose()}
                onOk={this.onSubmit}
                cancelButtonProps={{onClick:this.onClose}}
                okText="Yes"
                cancelText="No"
            >
                <Form>
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Fase ini merupakan fase terakhir, apakah Anda yakin untuk hire kandidat ?
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={7} md={11} sm={11} xs={24} style={{marginBottom:-25}}>
                            <Datepicker
                                disabled={false}
                                name="date"
                                id="date"
                                initialValue={date}
                                formItemLayout={formItemLayoutDate}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                format={'DD/MM/YYYY'}
                                onChange={handleState}
                                onSubmit={this.state.onSubmit}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Date"
                                        },
                                    ]
                                }
                            />
                        </Col>
                    </Row>
                </Form>
          </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalHireCandidate);
export default WrappedForm