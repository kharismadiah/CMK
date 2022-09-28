import React, { Component } from 'react'
import { Select } from 'antd'
import { InputGroup } from "../../components/uielements/input"

const Option = Select;

export default class CustomSelectNonForm extends Component {

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
        let { value, data, disabled, defaultValue, onChange, name, form, mode, placeholder, showSearch = true, labelField, required } = this.props
        return (
            <React.Fragment>
                <h5>{labelField} {required ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <InputGroup compact style={{ marginBottom: "15px" }}>
                    <Select
                        mode={mode == undefined ? 'single' : 'multiple'}
                        showSearch={showSearch}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        optionFilterProp="children"
                        onChange={(event) => {
                            onChange(form, name, event)
                        }}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={value}
                        disabled={disabled === undefined || disabled === false ? false : true}
                        style={{ width: "92%"}}
                    >
                        {
                            (data !== undefined ? data : []).map((x, index) => {
                                return <Option key={index} value={x.value}>{x.name}</Option>
                            })
                        }
                    </Select>
                </InputGroup>
            </React.Fragment>
        )
    }
}
