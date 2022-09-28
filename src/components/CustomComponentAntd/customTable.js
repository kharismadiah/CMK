import React, { Component } from 'react';
import _ from 'lodash';
import { Table, Row } from 'antd';

import TableWrapper from './../../containers/Tables/antTables/antTable.style'// '../../Tables/antTables/antTable.style';

export default class TableCustom extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.dataSource !== nextProps.dataSource) {
            return true;
        }
        if (this.props.columns !== nextProps.columns) {
            return true;
        }
        if (this.props.rowSelection !== nextProps.rowSelection) {
            return true;
        }
        else{
            return false;
        }
    }

    render() {
        let { rowSelection, columns, dataSource, id, name } = this.props
        return (
            <Row>
                {/* <Table */}
                <TableWrapper
                    key={id}
                    id={id}
                    name={name}
                    rowKey="id"
                    rowSelection={rowSelection}
                    pagination={true}
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ x: 500 }} />
            </Row>
        )
    }
}

