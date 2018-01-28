import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import TableColumns from './TableColumns';

const ExtendedReactTable = styled(ReactTable)`
  font-size: 12px;
`;

const TableResult = ({ data }) => (
  <Fragment>
    <ExtendedReactTable
      data={data}
      noDataText="No projects available"
      columns={TableColumns}
      defaultSorted={[
        {
          id: 'modifiedDate',
          desc: true
        }
      ]}
      defaultPageSize={10}
      className="-striped -highlight react-table-container"
    />
  </Fragment>
);

const Table = props => (
  <Fragment>
    <TableResult {...props} />
  </Fragment>
);

TableResult.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      projectName: PropTypes.string,
      projectManager: PropTypes.string,
      overallStatus: PropTypes.string,
      percentageComplete: PropTypes.number,
      modifiedDate: PropTypes.string
    })
  )
};

TableResult.defaultProps = {
  data: []
};

export default Table;
