import React, { Component } from 'react'
import { Col, Row, Table, Icon } from 'antd'
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa'
import { connect } from 'react-redux'
import * as actions from '../../../../../redux/RecruitmentPhase/action'
import actions_auth from '../../../../../redux/auth/actions'
import Button, { ButtonGroup } from '../../../../uielements/button'
import InputNonForm from '../../../../CustomComponentAntd/customInputNonForm'
import Select from '../../../../CustomComponentAntd/customSelectNonForm'
import ModalCustomAction from '../../../../../components/module/vacancyAplicants/modal/ModalCustomAction'

class Step1 extends Component {
    constructor(props) {
        super(props)

        this.handleChangeStep = this.handleChangeStep.bind(this)
    }

    handleChangeStep(e) {
        const { title, handleStatePosisi, handleStateTitle, handleStateGlobal, handleStateSubProperty } = this.props
        const changeStep = {
            step: 2,
            interviewType: title,
            company: null
        }
        handleStateSubProperty('modalCustomAction', 'visible', false)
        handleStatePosisi(2)
        handleStateTitle(title)
        handleStateGlobal('interviewType', changeStep)
    }

    changeStep(e) {
        const { handleStateTitle, handleStateSubProperty, title, handleStatePosisi, handleStateGlobal } = this.props
        const { name } = e.target
        if (title === '') {
            const changeStep = {
                step: 1,
                interviewType: name,
                company: null
            }
            handleStateTitle(name)
            handleStateGlobal('interviewType', changeStep)
            handleStateSubProperty('modalCustomAction', 'visible', true)
        } else {
            const changeStep = {
                step: 2,
                interviewType: name,
                company: null
            }
            handleStatePosisi(2)
            handleStateTitle(name)
            handleStateGlobal('interviewType', changeStep)
        }
        handleStateTitle(name)
    }

    render() {
        const {
            Auth,
            sourceTable,
            RecruitmentPhase,
            userRole,
            handleStatePosisi,
            title,
            handleStateSubProperty,
            handleStateTitle,
            handleStateGlobal
        } = this.props
        const { NamaCalon, NamaPosition, Department } = RecruitmentPhase.modal.Interview
        // debugger
        let [disableBtnMT, disableNonMT] = ''
        if (Auth.listRoleName === 'Hiring Manager') {
            disableBtnMT = true
            disableNonMT = true
        } else if (Auth.listRoleName === 'PIC HC') {
            disableBtnMT = RecruitmentPhase.isUser
                ? true
                : RecruitmentPhase.modal.Interview.IsInterviewMT === undefined
                ? false
                : RecruitmentPhase.modal.Interview.IsInterviewMT === true
                ? false
                : true
            disableNonMT = RecruitmentPhase.isUser
                ? true
                : RecruitmentPhase.modal.Interview.IsInterviewMT === undefined
                ? false
                : RecruitmentPhase.modal.Interview.IsInterviewMT === true
                ? true
                : false
        } else {
            disableBtnMT =
                RecruitmentPhase.modal.Interview.IsInterviewMT === undefined
                    ? false
                    : RecruitmentPhase.modal.Interview.IsInterviewMT === true
                    ? false
                    : true
            disableNonMT =
                RecruitmentPhase.modal.Interview.IsInterviewMT === undefined
                    ? false
                    : RecruitmentPhase.modal.Interview.IsInterviewMT === true
                    ? true
                    : false
        }

        const buttonStyle = {
            width: '100%',
            height: 'auto',
            padding: '.8rem',
            fontSize: '1.4rem'
        }

        const colStyle = {
            marginBottom: '-15px'
        }
        const rowStyle = {
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap'
        }

        return (
            <React.Fragment>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        fontSize: 20
                    }}
                >
                    Interview Type
                </div>

                <Row style={rowStyle} justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Nama Calon"
                                disabled={true}
                                name="NamaCalon"
                                id="NamaCalon"
                                value={NamaCalon}
                                // onChange={handleStateModalDetail}
                            />
                        </Col>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Nama Posisi"
                                disabled={true}
                                name="NamaPosition"
                                id="NamaPosition"
                                value={NamaPosition}
                                // onChange={handleStateModalDetail}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row style={rowStyle} justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <InputNonForm
                                labelField="Dept/Div"
                                disabled={true}
                                name="Department"
                                id="Department"
                                value={Department}
                                // onChange={handleStateModalDetail}
                            />
                        </Col>
                    </Col>
                </Row>

                <Row style={rowStyle} justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <p>Select Interview Type:</p>
                        </Col>
                    </Col>
                </Row>

                <Row style={rowStyle} justify="start">
                    <Col md={24} sm={24} xs={24} style={{ textAlign: 'right', paddingRight: '4%' }}>
                        <Button
                            name="INTERVIEW MT"
                            style={buttonStyle}
                            disabled={disableBtnMT}
                            onClick={e => this.changeStep(e)}
                            type="primary"
                        >
                            INTERVIEW MT
                        </Button>
                    </Col>
                </Row>

                <Row style={rowStyle} justify="start">
                    <Col md={24} sm={24} xs={24} style={{ textAlign: 'right', paddingRight: '4%' }}>
                        <Button
                            name="INTERVIEW NON - MT"
                            style={buttonStyle}
                            disabled={disableNonMT}
                            onClick={e => this.changeStep(e)}
                            type="primary"
                        >
                            INTERVIEW NON - MT
                        </Button>
                    </Col>
                </Row>
                <ModalCustomAction
                    visible={RecruitmentPhase.modalCustomAction.visible}
                    onSubmit={this.handleChangeStep}
                    text={'Do you want to select ' + title.toLowerCase() + ' ?'}
                    title={'Interview Type'}
                    handleState={handleStateSubProperty}
                    handleStateTitle={handleStateTitle}
                    isInterview={true}
                    handleStateGlobal={handleStateGlobal}
                    title={title}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    RecruitmentPhase: state.RecruitmentPhase,
    Auth: state.Auth,
    userRole: state.Auth.roleName
})

export default connect(
    mapStateToProps,
    {
        ...actions,
        ...actions_auth
    }
)(Step1)
