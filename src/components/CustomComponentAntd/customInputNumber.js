import React, { Component } from 'react';
import _ from 'lodash';
import { InputNumber, Row } from 'antd';
import './customStyle.scss'

export default class CustomInputNumber extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.onSubmit !== nextProps.onSubmit) {
            return true
        }
        if (this.props.disabled !== nextProps.disabled) {
            return true
        }
        if (this.props.initialValue !== nextProps.initialValue) {
            return true;
        }
        if (this.props.name !== nextProps.name) {
            return true;
        }
        return false
    }
    

    render() {
        const { getFieldDecorator, labelField, Form, placeholder, initialValue, onChange, disabled, formItemLayout, required, isRequired, min, max, addonBefore, validation, width = '50%', isError, ErrorText, step} = this.props;
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'required']);
        return (
            <Row>
                <h5>{labelField} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <Form.Item validateStatus={isError ? "error" : ''} help={isError ? ErrorText : ""} {...attr} {...formItemLayout}>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange:
                            (e => {
                                onChange(attr.id, e)
                            }),
                        rules: validation
                    })(
                        <InputNumber size="default" className={'inputAntd'} addonBefore={addonBefore ? addonBefore : null} width={width} disabled={disabled} name={attr.id} id={attr.id} placeholder={placeholder} min={min} max={max} step={step}/>
                    )}
                </Form.Item>
            </Row>
        )
    }
}