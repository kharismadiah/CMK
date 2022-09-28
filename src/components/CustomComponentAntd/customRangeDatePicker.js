import React, { useState } from 'react'
import { DatePicker, Row } from 'antd'

const { RangePicker } = DatePicker

const CustomRangeDatePicker = ({
    id,
    Form,
    getFieldDecorator,
    initialValue,
    validation,
    onChange,
    value,
    labelField,
    isRequired,
    numberOfDays,
    format
}) => {
    const [dates, setDates] = useState([])

    const [tempValue, setTempValue] = useState()

    const disabledDate = current => {
        if (!dates || dates.length === 0) {
            return false
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > numberOfDays
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > numberOfDays
        return tooEarly || tooLate
    }

    const onOpenChange = open => {
        if (open) {
            setDates([])
        }
    }

    const handleChange = val => {
        if (Array.isArray(val) && val.length > 0) {
            if (val) {
                setDates([])
                setTempValue(val)
                let startDate = val[0].format()
                let endDate = val[1].format()
                onChange(startDate, endDate)
            }
        } else {
            onChange(null, null)
        }
    }

    return (
        <Row>
            <h5>
                {labelField} {isRequired ? <span style={{ color: 'red' }}>*</span> : null}
            </h5>
            <Form.Item label="" hasFeedback>
                {getFieldDecorator(id, {
                    initialValue: initialValue,
                    // onChange: (date, dateString) => onChange(id, dateString),
                    rules: validation
                })(
                    <RangePicker
                        style={{ width: '100%' }}
                        value={value || []}
                        disabledDate={disabledDate}
                        onCalendarChange={val => setDates(val)}
                        onChange={val => handleChange(val)}
                        onOpenChange={onOpenChange}
                        format={format}
                    />
                )}
            </Form.Item>
        </Row>
    )
}

export default CustomRangeDatePicker
