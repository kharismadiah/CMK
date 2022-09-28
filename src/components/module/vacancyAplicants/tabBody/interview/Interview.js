import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa';

import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Step5 from './step5'

export default class Interview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkAll: false,
            onSubmit: false,
            posisi: 1,
            title: ''
        }
    }

    handleStatePosisi = (param) => {
        this.setState({
            posisi: param
        })
        const state = this.state
        const changeStep = {
            step: param,
            ...state,
        };
        // this.props.handleStateGlobal('interviewType', changeStep)
    }

    handleStateTitle = (param) => {
        this.setState({
            title: param
        })
    }

    renderForm = () => {
        const { dataPersonal, dataInterview, handleStateFlk, source, handleStateForm2Flk, fetchSubmitFLK, deleteDataInterview, handleStateSubProperty, RecruitmentPhase, viewInterviewResult, initFotmViewInterviewResult, fetchDeleteInterviewer, isHired = false } = this.props
        const { step, interviewType } = RecruitmentPhase.interviewType
        if (step === 1) {
            return (
                <Step1
                    data={dataPersonal}
                    handleStatePosisi={this.handleStatePosisi}
                    handleStateTitle={this.handleStateTitle}
                    title={interviewType}
                    handleStateSubProperty={handleStateSubProperty}

                />
            )
        } else if (step === 2) {
            return (
                <Step2
                    data={dataPersonal}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    handleStateTitle={this.handleStateTitle}
                    title={interviewType}
                    deleteDataInterview={deleteDataInterview}
                    typeInterview={this.state.typeInterview}
                    isHired={isHired}
                />
            )
        } else if (step === 3) {
            return (
                <Step3
                    data={dataInterview}
                    dataPersonal={dataPersonal}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    fetchSubmitFLK={fetchSubmitFLK}
                    handleStateTitle={this.handleStateTitle}
                    title={interviewType}
                    fetchViewInterviewResult={viewInterviewResult}
                    fetchDeleteInterviewer={fetchDeleteInterviewer}
                    isHired={isHired}
                />
            )
        }
        else if (step === 4) {
            return (
                <Step4
                    data={dataInterview}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    fetchSubmitFLK={fetchSubmitFLK}
                    handleStateTitle={this.handleStateTitle}
                    title={interviewType}
                    initFotmViewInterviewResult={initFotmViewInterviewResult}
                    isHired={isHired}
                />
            )
        } else if (step === 5) {
            return (
                <Step5
                    data={dataInterview}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    fetchSubmitFLK={fetchSubmitFLK}
                    handleStateTitle={this.handleStateTitle}
                    title={interviewType}
                />
            )
        } else {

        }
    }

    render() {
        const { dataInterview, handleStateFlkPersonal } = this.props

        const colStyle = {
            marginBottom: '-5px'
        };
        const rowStyle = {
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap'
        };
        return (
            <div style={{ margin: '0 40px 40px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, fontSize: 20 }}>
                </div>
                {
                    this.renderForm()
                }
                {/* <Form1 
                        data={dataInterview.personalData}
                        handleState={handleStateFlkPersonal}
                        handleStatePosisi
                    /> */}
                {/* <Form2
                        onSubmit={this.state.onSubmit}
                        getFieldDecorator={getFieldDecorator}
                    /> */}

            </div>
        )
    }
}