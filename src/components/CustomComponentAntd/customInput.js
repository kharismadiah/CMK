import React, { Component } from 'react';
import _ from 'lodash';
import { Input, Row } from 'antd';
import './customStyle.scss'
import StyledInput from '../uielements/input';

export default class InputText extends Component {

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
        const { setFieldsValue, getFieldDecorator, labelField, Form, placeholder, initialValue, onChange, disabled, formItemLayout, validation, isRequired, min, max, addonBefore, onSubmit, width = '137%', maxLength=255, allowClear = false} = this.props;
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'validation', 'onSubmit']);
        
        return (
            <Row>
                <h5>{labelField} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <Form.Item {...attr} {...formItemLayout} hasFeedback>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: (e => onChange(attr.id, e.target.value)),
                        rules: validation
                    })(
                        <Input 
                            className={'inputAntd'} 
                            size="default" 
                            style={{ width: width }} 
                            addonBefore={addonBefore ? addonBefore : null} 
                            disabled={disabled} 
                            name={attr.id} 
                            id={attr.id} 
                            placeholder={placeholder}
                            maxLength={maxLength}
                            allowClear={allowClear}
                        />
                    )}
                </Form.Item>
            </Row>
        )
    }
}