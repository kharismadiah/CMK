import React, { Component } from 'react';
import _ from 'lodash';
import { Checkbox, Row } from 'antd';
import './customStyle.scss'

export default class CustomCheckbox extends Component {

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
        return false;
    }

    render() {
        const { setFieldsValue, getFieldDecorator, labelField, Form, initialValue, onChange, disabled, formItemLayout, validation, isRequired, text } = this.props;
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'validation', 'onSubmit']);
        return (
            <Row>
                <h5>{labelField} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <Form.Item {...attr} {...formItemLayout} hasFeedback valuePropName="checked" noStyle>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: (e => onChange(attr.id, !e.target.value)),
                        rules: validation
                    })(
                        <Checkbox className={'inputAntd'} size="default" checked={initialValue} disabled={disabled} name={attr.id} id={attr.id}>
                            <span style={{ fontSize: 12 }}>{text}</span>
                        </Checkbox>
                    )}
                </Form.Item>
            </Row>
        )
    }
}