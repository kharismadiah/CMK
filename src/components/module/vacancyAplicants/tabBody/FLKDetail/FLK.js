import React, { Component } from 'react';
import '../../style.scss';

import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'

import Form1FG from '../FLK/Form1'
import Form2FG from '../FLK/Form2'
import Form3FG from '../FLK/Form3'

import Form1ProHired from '../FLKProHire/Form1'
import Form2ProHired from '../FLKProHire/Form2'
import Form3ProHired from '../FLKProHire/Form3'

export default class FLK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkAll: false,
            onSubmit: false,
            posisi: 1
        }
    }

    handleStatePosisi = (param) => {
        this.setState({ posisi: param })
    }

    renderFormFG = () => {
        const { masterData, dataFLK, handleStateFlk, source, handleStateForm2Flk, fetchSubmitFLK, RecruitmentPhase, isFLKSubmit, setReadMore } = this.props
        let isDetails = true
        if (this.state.posisi === 1) {
            return (
                <Form1FG
                    data={dataFLK}
                    source={source}
                    handleState={handleStateFlk}
                    handleStatePosisi={this.handleStatePosisi}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                    isDetails={isDetails}
                />
            )
        } else if (this.state.posisi === 2) {
            return (
                <Form2FG
                    masterData={masterData}
                    data={dataFLK}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                    isDetails={isDetails}
                    setReadMore={setReadMore}
                />
            )
        } else if (this.state.posisi === 3) {
            return (
                <Form3FG
                    masterData={masterData}
                    data={dataFLK}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    fetchSubmitFLK={fetchSubmitFLK}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                    isDetails={isDetails}
                />
            )
        } else {

        }
    }

    renderFormProHire = () => {
        const { masterData, dataFLK, handleStateFlk, source, handleStateForm2Flk, fetchSubmitFLK, RecruitmentPhase, isFLKSubmit, setReadMore, setReadMoreImprove } = this.props
        let isDetails = true
        if (this.state.posisi === 1) {
            return (
                <Form1ProHired
                    data={dataFLK}
                    source={source}
                    handleState={handleStateFlk}
                    handleStatePosisi={this.handleStatePosisi}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                    isDetails={isDetails}
                />
            )
        } else if (this.state.posisi === 2) {
            return (
                <Form2ProHired
                    masterData={masterData}
                    data={dataFLK}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                    isDetails={isDetails}
                    setReadMore={setReadMore}
                    setReadMoreImprove={setReadMoreImprove}
                />
            )
        } else if (this.state.posisi === 3) {
            return (
                <Form3ProHired
                    masterData={masterData}
                    data={dataFLK}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    fetchSubmitFLK={fetchSubmitFLK}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                    isDetails={isDetails}
                />
            )
        } else {

        }
    }

    render() {
        const { dataFLK, isFLKSubmit } = this.props
        return (
            <div style={isFLKSubmit ? { margin: '10px', width: '90%' } : { margin: '0 40px 40px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, fontSize: 25 }}>
                    DATA PERSONAL
                </div>
                {
                    dataFLK.workExperienceCategory.includes('Fresh') ? //fresh graduated
                        this.renderFormFG()
                    : 
                        this.renderFormProHire()
                }
            </div>
        )
    }
}