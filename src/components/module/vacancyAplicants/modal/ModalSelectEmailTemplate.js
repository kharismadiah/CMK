import React, { Component } from 'react'
import { Col, Modal, Row, Table} from "antd";
import Form from '../../../../components/uielements/form'

class ModalSelectEmailTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    handleTableChange = (pagination) => {
        let { getListEmailTemplate, handleStateModalEmailTemplate} = this.props
        handleStateModalEmailTemplate('emailTemplateCurrentPage', pagination.current)
        getListEmailTemplate()
    
        // if (_.isEmpty(sorter)) {
        //   getEmailConfigList(pagination.current, field)
        // } else {
        //   if (EmailConfiguration.pageNo != pagination.current) {
        //     getEmailConfigList(pagination.current, field)
        //   }
    }
    


    render() {
        const { RecruitmentPhase, actionName="" } = this.props

        const columns = [{
            title: "",
            dataIndex: "emailDesc",
        }]

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: [RecruitmentPhase.modalSelectEmailTemplate.selectedEmailTemplateId],
            onChange: (selectedRowKeys) => {
              const { handleStateModalEmailTemplate } = this.props
              handleStateModalEmailTemplate('selectedEmailTemplateId', selectedRowKeys[0])
            },
          };

        return (
            <>
                <Modal
                    visible={this.props.visible}
                    onOk={this.props.onOk}
                    onCancel={this.props.onCancel}
                    cancelText="Cancel"
                    width="50%"
                    height="50%"
                >
                <Form onSubmit={()=>{}}>
                    <Row>
                        <Col md={24} sm={24} xs={24} style={{marginBottom:'15px'}}>
                            <h3><center>Please select email template - {RecruitmentPhase.modalSelectEmailTemplate.action}</center></h3>
                        </Col>
                        <Col md={24} sm={24} xs={24} style={{marginBottom:'15px'}}>
                        <h4><center>Please select one email</center></h4>
                            <Table rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={
                                        RecruitmentPhase.modalSelectEmailTemplate.emailTemplateList.map((emailTemplate)=>(
                                            {
                                                key: emailTemplate.EmailDetailsId,
                                                emailDesc: emailTemplate.Description
                                            }
                                        ))
                                    }
                                    size='small'
                                    pagination={{
                                        current: RecruitmentPhase.modalSelectEmailTemplate.emailTemplateCurrentPage, 
                                        pageSize: 5,
                                        total: RecruitmentPhase.modalSelectEmailTemplate.emailTemplateTotalRows === null ? 0 
                                                : RecruitmentPhase.modalSelectEmailTemplate.emailTemplateTotalRows
                                    }}
                                    onChange={this.handleTableChange}
                            />
                        </Col>
                    </Row>
                </Form>
                </Modal>
            </>
        )
    }
}


const WrappedFormRecruitment = Form.create()(ModalSelectEmailTemplate);
export default WrappedFormRecruitment