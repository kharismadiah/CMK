import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #f8f8f8!important;
}
.table-Assignment-onRow .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .table-Assignment-onRow .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .table-Assignment-onRow .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .table-Assignment-onRow .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #E6F7FF !important;
}

.ant-form-explain, .ant-form-extra {
    font-size: 11px !important;
}

`;

export default GlobalStyles;
