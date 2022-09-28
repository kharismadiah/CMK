import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Row } from 'antd';

export default class InputText extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.checked !== nextProps.checked) {
            return true;
        }
        if (this.props.disabled !== nextProps.disabled) {
            return true;
        }
        if (this.props.name !== nextProps.name) {
            return true;
        }
        return false;
    }

    render() {
        const { labelField, checked, onChange, disabled, name, id, required } = this.props;
        return (
            <Row>
                <h5>{labelField} {required ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <Switch style={{ width: '1.5% 0', margin: '0.5vw 0'}} checked={checked} disabled={disabled} onChange={(e) => onChange(e)} name={name} id={id} />
            </Row>
        )
    }
}