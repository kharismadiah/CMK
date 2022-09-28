import React, { Component, Fragment } from 'react';
import { Modal, Row, Col, Checkbox } from 'antd';
import Form from '../../../uielements/form'

class ModalAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            checked: false
        }
    }
    
    onCancelModal = () => {
        const {handleState} = this.props
        handleState('visible', false)
        this.setState({
            checked: false
        })
    }

    handleChange = (value) => {
        const {handleState} = this.props
        handleState('checked', value)
        this.setState({
            checked: false
        })
    }

    render() {
        let {title, visible, handleState, checked, onSubmit, dataList} = this.props
        let dataCheck = dataList.filter(x => x.checked === true)
        let message = ""
        const rowStyle = {
            marginBottom: 15
        }
        const colStyle = {
            textAlign:'center'
        };
        switch (title) {
            case "CancelByCandidate":{
                title = "Cancel"
                message = "membatalkan"
                break;}
            case "Fail":{
                message = "menggagalkan"
                break;}
            case "Pass":{
                message = "meloloskan"
                break;}
            default:
                break;
        }
        return (
            <Modal
                title={title === "ReOnlineTest" ? "Re-Online Test" : `${title}" Candidate"`}
                visible={visible}
                onCancel={() => handleState('visible', false)}
                onOk={onSubmit}
                okText="Yes"
                cancelText="No"
            >

                {
                    title === "ReOnlineTest" ? 
                        <Fragment>
                            <Row justify="start" style={rowStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    Apakah Anda yakin ingin melakukan Online Test Ulang untuk kandidat ini ?
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    * Kandidat masih memiliki hasil Online Test yang valid
                                </Col>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    * Jika Anda setuju, kandidate harus menyelesaikan tes sebelum diproses ke tahap selanjutnya
                                </Col>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    * Anda tidak bisa membatalkan proses ini
                                </Col>
                            </Row>
                        </Fragment>
                    :
                        <Fragment>
                            <Row justify="start" style={rowStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    Apakah Anda yakin ingin {message + " " + dataCheck.length} kandidat ?
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Checkbox checked={checked} onChange={(e) => this.handleChange(e.target.checked)} /> Beri Notifikasi Kandidat
                                </Col>
                            </Row>
                        </Fragment>
                }
          </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalAction);
export default WrappedForm