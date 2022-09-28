import React, { Component } from 'react'
import _ from 'lodash'
import { Input, Row } from 'antd'

const { TextArea } = Input

export default class InputTextArea extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.onSubmit !== nextProps.onSubmit) {
            return true
        }
        if (this.props.initialValue !== nextProps.initialValue) {
            return true
        }
        if (this.props.disabled !== nextProps.disabled) {
            return true
        }
        return false
    }

    render() {
        const {
            getFieldDecorator,
            labelField,
            Form,
            placeholder,
            initialValue,
            onChange,
            validation,
            disabled,
            formItemLayout,
            required,
            isRequired,
            onSubmit,
            minRows = 2,
            maxRows = 6,
            maxLength = 2000,
            Rows = 4
        } = this.props
        const attr = _.omit(this.props, [
            'getFieldDecorator',
            'Form',
            'placeholder',
            'required',
            'validation',
            'onSubmit'
        ])
        return (
            <Row>
                <h5>
                    {labelField} {isRequired ? <span style={{ color: 'red' }}>*</span> : null}
                </h5>
                <Form.Item {...attr} {...formItemLayout} hasFeedback>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: e => onChange(e),
                        rules: validation
                        // rules: [
                        //     required ? { required: required[0], message: required[0].message } : {},
                        //     min ? { min: min } : {},
                        //     max ? { max: max } : {}
                        // ]
                    })(
                        <TextArea
                            size="default"
                            disabled={disabled}
                            name={attr.id}
                            id={attr.id}
                            placeholder={placeholder}
                            autosize={{ minRows: minRows, maxRows: maxRows }}
                            maxLength={maxLength}
                            rows={Rows}
                        />
                    )}
                </Form.Item>
            </Row>
        )
    }
}
