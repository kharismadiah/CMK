import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/RecruitmentPhase/action';
import actions_auth from '../../../../redux/auth/actions';
import Step1 from './interview/step1';
import Step2 from './interview/step2';
import Step3 from './interview/step3';
import Step4 from './interview/step4';

class Interview extends Component {
  render() {
    const { sourceTable, RecruitmentPhase } = this.props;
    const { step } = RecruitmentPhase.modalInterview;

    return (
      <div style={{ margin: '0 40px 40px 40px' }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 sourceTable={sourceTable} />}
        {step === 3 && <Step3 sourceTable={sourceTable} />}
        {step === 4 && <Step4 sourceTable={sourceTable} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  RecruitmentPhase: state.RecruitmentPhase,
  Auth: state.Auth,
  userRole: state.Auth.roleName,
});

export default connect(mapStateToProps, {
  ...actions,
  ...actions_auth,
})(Interview);
