import React, { Component } from 'react';
import _ from 'lodash';
import { Row, DatePicker } from 'antd';
import moment from 'moment'

export default class CustomDatePickerMonth extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.onSubmit !== nextProps.onSubmit) {
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
        const { MonthPicker, RangePicker } = DatePicker;
        const { getFieldDecorator, labelField, Form, placeholder, initialValue, onChange, disabled, disabledDate, onOpenChange, formItemLayout, required, isRequired, showTime, format="YYYY", onSubmit, validation, mode="year" } = this.props;
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'required', 'validation', 'mode']);
        return (
            <Row>
                <h5>{labelField} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <Form.Item {...formItemLayout} label="" hasFeedback>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: ((date, dateString) => onChange(attr.id, dateString)),
                        rules: validation
                        // rules: [
                        //     required ? { required: required[0], message: required[0].message } : {},
                        // ],
                    })(
                        <MonthPicker
                            style={{ width: "100%" }}
                            disabled={disabled}
                            disabledDate={disabledDate}
                            id={attr.id}
                            name={attr.id}
                            format={'MM-YYYY'}
                            placeholder={placeholder}
                            onOpenChange={onOpenChange}
                            onPanelChange={(date, dateString) => onChange(attr.id, date)}
                        />
                    )}
                </Form.Item>
            </Row>
        )
    }
}