import React, { Fragment, Component } from 'react';
import { Modal, Button, Progress, Spin, Icon } from 'antd';
import Form from '../../../uielements/form'
import { messagesConfirm2 } from "../../../../components/messageBox"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './ModalDownloadBatchFLK.scss'
// import { saveAs } from 'file-saver';

class ModalDownloadBatchFLK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleModalFooter: false
        }
    }

    // onDownload = () => {
    //     const {urlPdf} = this.props
    //     saveAs(urlPdf)
    // }

    onOk = () => {
        const { handleStateSubProperty } = this.props
        // handleStateSubProperty('modalDownloadBatchFLK', 'visible', false)
        // messages('Batal', 'Apakah anda yakin untuk membatalkan proses Download FLK', null, false)
        messagesConfirm2(handleStateSubProperty, 'modalDownloadBatchFLK', 'visible', false, 'Batal', 'Apakah anda yakin untuk membatalkan proses Download FLK', 'info')
    }

    onCancel = () => {
        const { handleStateSubProperty } = this.props
        this.setState({isVisibleModalFooter: true})
        handleStateSubProperty('modalDownloadBatchFLK', 'visible', false)
    }

    onCancelFooter = () => {
        alert("Close Footer")
        this.setState({isVisibleModalFooter: false})
    }

    render() {
        const {visible, urlPdf, onClose, isToolbar = false, handleState} = this.props
        let urlNonToolbar = urlPdf ? urlPdf.concat('#toolbar=0&navpanes=0&scrollbar=0') : ''
        return (
            <Fragment>
                <Modal
                    title="Downloading FLK..."
                    visible={visible}
                    closable={true}
                    maskClosable={false}
                    onCancel={() => this.onCancel()}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okText="Batal"
                    onOk={() => this.onOk()}
                    width="80%"
                    // footer={null}
                >
                    <Progress percent={50} status="active"/>
                </Modal>
                {/* <div id="modal-footer"> */}
                    <Modal
                        // title={""}
                        visible={this.state.isVisibleModalFooter}
                        closable={true}
                        maskClosable={false}
                        onCancel={() => this.onCancelFooter()}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
                        // okText="Batal"
                        // onOk={() => this.onOk()}
                        width="30%"
                        style={{ position: 'absolute', top: 'auto', right: 0, bottom: 0 }}
                        mask={false}
                        wrapClassName={"modal-footer"}
                        iconType={"question-circle"}
                    >
                        <div className="body-wrapper">
                            <Spin />
                            <div className="body-content">
                                Downloading FLK
                            </div>
                        </div>
                    </Modal>
                {/* </div> */}
            </Fragment>
        )
    }
}

const WrappedModalDownloadBatchFLK = Form.create()(ModalDownloadBatchFLK);
export default WrappedModalDownloadBatchFLK