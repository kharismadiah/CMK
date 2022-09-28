import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import Form from '../../../uielements/form'
import Datepicker from '../../../CustomComponentAntd/customDatePicker';

class ModalCandidatePool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
        }
    }

    onSubmit = (e) => {
        const {onSubmit} = this.props
        e.preventDefault();
        this.props.form.validateFields(['date'], (err, values) => {
                if (!err) {
                    onSubmit()
                }else{
                    this.setState({
                        onSubmit: !this.state.onSubmit
                    })
                }
        })
    }
    
    render() {
        const { visible, handleState, date, rolebyAuth } = this.props;
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
            title="Candidate Pool"
            visible={visible}
            onCancel={() => handleState("visible", false)}
            onOk={this.onSubmit}
            okText="Yes"
            cancelText="No"
          >
            <Form>
              <Row justify="start" style={rowStyle}>
                <Col md={24} sm={24} xs={24} style={colStyle}>
                  Apakah Anda yakin ingin melakukan Candidate Pool ?
                </Col>
              </Row>
              <Row>
                <Col
                  offset={7}
                  md={11}
                  sm={11}
                  xs={24}
                  style={{ marginBottom: -25 }}
                >
                  <Datepicker
                    disabled={
                      rolebyAuth == undefined ? false : rolebyAuth["DatepickerSendInvt"] == true ? true : false
                    }
                    name="date"
                    id="date"
                    initialValue={date}
                    formItemLayout={formItemLayoutDate}
                    getFieldDecorator={getFieldDecorator}
                    Form={Form}
                    format={"DD/MM/YYYY"}
                    onChange={handleState}
                    validation={[
                      {
                        required: true,
                        message: "Please enter the Date",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col offset={7} md={11} sm={11} xs={24}>
                  *Default date is current date
                </Col>
              </Row>
            </Form>
          </Modal>
        );
    }
}

const WrappedForm = Form.create()(ModalCandidatePool);
export default WrappedForm