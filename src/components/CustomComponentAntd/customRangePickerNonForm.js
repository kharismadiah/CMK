import React, { Component } from 'react';
import { DatePicker } from "antd";
import { InputGroup } from "./../../input"

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class CustomRangePickerNonForm extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.value !== nextProps.value) {
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
        const { labelField, required, onChange, value, name, id } = this.props

        return (
            <React.Fragment>
                <h5>{labelField} {required ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <InputGroup compact style={{ marginBottom: "15px" }}>
                    <RangePicker
                        name={name}
                        id={id}
                        onChange={(date, dateString) => onChange(date, dateString)}
                        style={{ width: "90%", padding: "0.5% 0" }}
                        value={value} />
                </InputGroup>
            </React.Fragment>
        )
    }
}