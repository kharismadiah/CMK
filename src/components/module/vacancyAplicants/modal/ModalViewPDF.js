import React, { Component } from 'react';
import { Modal, Button} from 'antd';
import Form from '../../../uielements/form'
// import { saveAs } from 'file-saver';
class ModalViewPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // onDownload = () => {
    //     const {urlPdf} = this.props
    //     saveAs(urlPdf)
    // }

    render() {
        const {visible, urlPdf, onClose, isToolbar = false} = this.props
        let urlNonToolbar = urlPdf ? urlPdf.concat('#toolbar=0&navpanes=0&scrollbar=0') : ''
        return (
            <Modal
                title="View PDF"
                visible={visible}
                onCancel={onClose}
                okText="Send"
                width="80%"
                footer={null}
            >
                <iframe src={isToolbar ? urlPdf : urlNonToolbar} style={{width:'100%', height:700}} />
                {/* <Button onClick={()=>this.onDownload()}>Download PDF</Button> */}
            </Modal>
        )
    }
}

const WrappedModalViewPDF = Form.create()(ModalViewPDF);
export default WrappedModalViewPDF