import React, { Component } from 'react';
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import '../../style.scss';
import LayoutContentWrapper from '../../../../../components/utility/layoutWrapper';

import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'

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

    renderForm = () => {
        const { masterData, dataFLK, handleStateFlk, source, handleStateForm2Flk, fetchSubmitFLK, RecruitmentPhase, isFLKSubmit, setReadMore, setReadMoreImprove } = this.props
        if (this.state.posisi === 1) {
            return (
                <Form1
                    data={dataFLK}
                    source={source}
                    handleState={handleStateFlk}
                    handleStatePosisi={this.handleStatePosisi}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                />
            )
        } else if (this.state.posisi === 2) {
            return (
                <Form2
                    masterData={masterData}
                    data={dataFLK}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                    setReadMore={setReadMore}
                    setReadMoreImprove={setReadMoreImprove}
                />
            )
        } else if (this.state.posisi === 3) {
            return (
                <Form3
                    masterData={masterData}
                    data={dataFLK}
                    source={source}
                    handleStatePosisi={this.handleStatePosisi}
                    handleState={handleStateForm2Flk}
                    fetchSubmitFLK={fetchSubmitFLK}
                    RecruitmentPhase={RecruitmentPhase}
                    isFLKSubmit={isFLKSubmit}
                />
            )
        } else {

        }
    }

    render() {
        const { isFLKSubmit, RecruitmentPhase } = this.props
        return (
            <BlockUi
                tag="div"
                blocking={RecruitmentPhase.isLoading}
                message={
                    <span>
                        <div id="preloader">
                            <div id="loader"></div>
                        </div>
                    </span>
                }
            >
                <LayoutContentWrapper>
                    <div style={isFLKSubmit ? { margin: '0 auto', width: '90%', paddingTop: '20px' } : { margin: '0 40px 40px 40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, fontSize: 25 }}>
                            DATA PERSONAL
                        </div>
                        {
                            this.renderForm()
                        }
                    </div>
                </LayoutContentWrapper>
            </BlockUi>
        )
    }
}