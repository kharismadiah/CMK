import React, { Fragment, Component } from 'react'
import { Modal, Row, Col, Checkbox, Radio, List, Alert } from 'antd'
import Form from '../../../uielements/form'

class ModalFailedOffering extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSubmit: false,
            checked: false,
            isFailedBy: false,
            isFailedReason: false,
            isFailedLast: false,
            checkboxNotif: false,
            checkedList: [],
            checkAll: false
        }
    }

    onCancelModal = () => {
        const { handleState } = this.props
        handleState('visible', false)
        this.setState({
            checked: false
        })
    }

    handleChange = value => {
        const {
            handleStateActionFeedback,
            handleState,
            ApplicationId,
            ApplicantId,
            failedBy,
            listReasonKandidat,
            listReasonPerusahaan
        } = this.props
        handleStateActionFeedback('checked', value)
        let listReason = failedBy == 1 ? listReasonKandidat : listReasonPerusahaan
        const reqBody = {
            applicationId: ApplicationId,
            applicantId: ApplicantId,
            offeringFailedByID: failedBy,
            offeringFeedbackID: listReason
        }
        if (value) {
            handleState('modalFailedOffering', 'reqBody', reqBody)
            this.setState({ isFailedReason: false })
            this.setState({ isFailedLast: false })
            this.setState({ isFailedBy: false })
            this.setState({
                checked: false
            })
        } else {
            handleState('modalFailedOffering', 'reqBody', '')
        }
        this.setState({
            checked: !this.state.checked
        })
    }

    onSubmit = () => {
        // handleState('checked', value)
        this.setState({
            isFailedBy: true
        })
    }

    render() {
        let {
            title,
            visible,
            handleState,
            checked,
            dataList,
            failedBy,
            listFailedby,
            fetchListFeedback,
            optionFeedback,
            listReasonPerusahaan,
            listReasonKandidat,
            submitFeedbackOfferingFail,
            ApplicationId,
            ApplicantId,
            mandatoryFeedback
        } = this.props
        //
        let dataCheck = dataList.filter(x => x.checked === true)
        let message = ''
        const rowStyle = {
            marginBottom: 15
        }
        const colStyle = {
            textAlign: 'center'
        }
        const styleCheckbox = {
            display: 'flex',
            alignItems: 'flexStart',
            flexDirection: 'column',
            textAlign: 'left',
            width: '100%'
        }
        switch (title) {
            case 'CancelByCandidate': {
                title = 'Cancel'
                message = 'membatalkan'
                break
            }
            case 'Fail': {
                message = 'menggagalkan'
                break
            }
            case 'Pass': {
                message = 'meloloskan'
                break
            }
            default:
                break
        }

        const dtConfirmfail = [
            {
                title: 'Pihak',
                desc: `${failedBy == '' ? '' : failedBy == 1 ? 'Kandidat' : 'Perusahaan'}`
            }
        ]
        let listReason = failedBy === 1 ? listReasonKandidat : listReasonPerusahaan
        const dtConfirmfailReason =
            listReason === undefined || optionFeedback === ''
                ? ''
                : optionFeedback.filter(function(optionFeedback) {
                      return listReason.indexOf(optionFeedback.value) != -1
                  })

        const FailedByList = () => (
            <>
                {listFailedby.map(item => (
                    <Radio value={item.OfferingFailedByID}>{item.OfferingFailedByName}</Radio>
                ))}
            </>
        )
        const reqBody = {
            applicationId: ApplicationId,
            applicantId: ApplicantId,
            offeringFailedByID: failedBy,
            offeringFeedbackID: listReason
        }
        return (
            <Fragment>
                <Modal
                    title={'Failed Candidate'}
                    visible={visible}
                    onCancel={() => {
                        handleState('modalFailedOffering', 'visible', false)
                        handleState('modalFailedOffering', 'listFailedby', '')
                        handleState('modalFailedOffering', 'listFeedback', '')
                    }}
                    onOk={() => {
                        handleState('modalFailedOffering', 'visible', false)
                        this.setState({ isFailedBy: true })
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Apakah Anda yakin untuk tidak melanjutkan kandidat ini ke tahapan berikutnya?
                        </Col>
                    </Row>
                </Modal>

                <Modal
                    title={'Failed Candidate'}
                    visible={this.state.isFailedBy}
                    onCancel={() => {
                        handleState('modalFailedOffering', 'failedBy', '')
                        this.setState({ isFailedBy: false })
                        this.setState({ isFailedReason: false })
                    }}
                    onOk={() => {
                        fetchListFeedback(failedBy)
                        this.setState({ isFailedReason: true })
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Siapa pihak yang memutuskan untuk tidak melanjutkan proses rekrutmen kandidat ini?
                        </Col>
                    </Row>
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Radio.Group
                                onChange={e => handleState('modalFailedOffering', 'failedBy', e.target.value)}
                                value={failedBy}
                            >
                                <FailedByList />
                            </Radio.Group>
                        </Col>
                    </Row>
                </Modal>

                <Modal
                    title={failedBy === 1 ? 'Failed Candidate (Kandidat)' : 'Failed Candidate (Perusahaan)'}
                    visible={this.state.isFailedReason}
                    onCancel={() => {
                        let propState = failedBy === 1 ? 'reason' : 'Perusahaan'
                        handleState('modalFailedOffering', 'perusahaan', [])
                        handleState('modalFailedOffering', 'reason', [])
                        handleState('clearModalFailed', propState, '')
                        this.setState({ checked: false })
                        this.setState({ isFailedBy: true })
                        this.setState({ isFailedReason: false })
                    }}
                    onOk={() => {
                        if (listReasonKandidat.length !== 0 || listReasonPerusahaan.length !== 0) {
                            this.setState({ isFailedReason: false })
                            this.setState({ isFailedLast: true })
                        } else {
                            this.setState({ checkboxNotif: true })
                        }
                    }}
                    okText="Next"
                    cancelText="Back"
                    okButtonProps={{
                        disabled: this.state.checkboxNotif
                    }}
                >
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Sebutkan alasan {failedBy === 1 ? 'Kandidat' : 'Perusahaan'} memutuskan untuk tidak
                            melanjutkan proses rekrutmen pada posisi ini (checklist maks 2 pilihan)*
                        </Col>
                    </Row>
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24}>
                            {failedBy === 1 ? (
                                <Checkbox.Group
                                    value={listReasonKandidat}
                                    style={styleCheckbox}
                                    options={optionFeedback}
                                    onChange={e => {
                                        if (e.length > 2) {
                                            e.pop()
                                        }
                                        this.setState({ checkboxNotif: false })
                                        handleState('modalFailedOffering', 'reason', e)
                                    }}
                                />
                            ) : (
                                <Checkbox.Group
                                    value={listReasonPerusahaan}
                                    style={styleCheckbox}
                                    options={optionFeedback}
                                    onChange={e => {
                                        if (e.length > 2) {
                                            e.pop()
                                        }
                                        this.setState({ checkboxNotif: false })
                                        handleState('modalFailedOffering', 'perusahaan', e)
                                    }}
                                />
                            )}
                        </Col>
                    </Row>
                    <Row>
                        {this.state.checkboxNotif ? (
                            <Alert message="Anda belum memilih feedback" type="error" showIcon />
                        ) : null}
                    </Row>
                </Modal>

            <Modal
              title={
                failedBy === 1
                  ? "Failed Candidate (Kandidat)"
                  : "Failed Candidate (Perusahaan)"
              }
              visible={this.state.isFailedLast}
              onCancel={() => {
                this.setState({ isFailedReason: true });
                this.setState({ isFailedLast: false });
                this.setState({
                  checked: false,
                });
              }}
              onOk={() => {
                submitFeedbackOfferingFail(reqBody);
                this.setState({ isFailedBy: false });
                this.setState({ isFailedReason: false });
                this.setState({ isFailedLast: false });
              }}
              okText="Confirm"
              cancelText="Back"
            >
              <Row justify="start" style={rowStyle}>
                <Col md={24} sm={24} xs={24} style={colStyle}>
                  Apakah anda yakin untuk tidak melanjutkan kandidat ini ke
                  tahapan berikutnya dengan detail berikut ?
                </Col>
              </Row>
              {
              dtConfirmfail !== undefined && dtConfirmfailReason !== undefined ?
              <>
                <Row justify="center" style={rowStyle}>
                  <Col md={24} sm={24} xs={24}>
                    <List
                      size="small"
                      header={
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "12pt",
                          }}
                        >
                          Pihak
                        </div>
                      }
                      bordered
                      dataSource={dtConfirmfail}
                      renderItem={(item) => <List.Item>{item.desc}</List.Item>}
                    />
                  </Col>
                </Row>
                <Row justify="center" style={rowStyle}>
                  <Col md={24} sm={24} xs={24}>
                    <List
                      size="small"
                      header={
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "12pt",
                          }}
                        >
                          Alasan
                        </div>
                      }
                      bordered
                      dataSource={dtConfirmfailReason}
                      renderItem={(item) => <List.Item>{item.label}</List.Item>}
                    />
                  </Col>
                  <Row justify="start">
                    <Col
                      md={24}
                      sm={24}
                      xs={24}
                      style={(colStyle, { marginTop: 20, textAlign: "center" })}
                    >
                      <Checkbox
                        checked={this.state.checked}
                        onChange={(e) => this.handleChange(e.target.checked)}
                      />{" "}
                      Beri Notifikasi Kandidat
                    </Col>
                  </Row>
                </Row>
              </>
              : null }
            </Modal>
          </Fragment>
        );
    }
}

const WrappedForm = Form.create()(ModalFailedOffering)
export default WrappedForm
