import React, { Component } from 'react'
import _ from 'lodash'
import { Row, DatePicker } from 'antd'

export default class CustomDatePicker extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.onSubmit !== nextProps.onSubmit) {
            return true
        }
        if (this.props.initialValue !== nextProps.initialValue) {
            return true
        }
        if (this.props.name !== nextProps.name) {
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
            disabled,
            disabledDate,
            onOpenChange,
            formItemLayout,
            required,
            isRequired,
            showTime,
            format,
            onSubmit,
            validation,
            mode = 'date',
            defaultPickerValue,
            width = '100%'
        } = this.props
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'required', 'validation', 'mode'])

        return (
            <Row>
                <h5>
                    {labelField} {isRequired ? <span style={{ color: 'red' }}>*</span> : null}
                </h5>
                <Form.Item {...formItemLayout} label="" hasFeedback>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: (date, dateString) => onChange(attr.id, dateString),
                        rules: validation
                        // rules: [
                        //     required ? { required: required[0], message: required[0].message } : {},
                        // ],
                    })(
                        <DatePicker
                            style={{ width: width }}
                            disabledDate={disabledDate}
                            disabled={disabled}
                            defaultPickerValue={defaultPickerValue}
                            id={attr.id}
                            name={attr.id}
                            format={format ? format : 'YYYY-MM-DD HH:mm:ss'}
                            placeholder={placeholder}
                            onOpenChange={onOpenChange}
                            showTime={showTime}
                            mode={mode}
                        />
                    )}
                </Form.Item>
            </Row>
        )
    }
}
