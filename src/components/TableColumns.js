const TableColumns = [
  {
    columns: [
      {
        Header: 'Project Name',
        accessor: 'projectName',
        maxWidth: 200
      },
      {
        Header: 'Project Manager',
        accessor: 'projectManager'
      },
      {
        Header: 'Status',
        accessor: 'overallStatus',
        maxWidth: 80,
        style: {
          textAlign: 'center'
        }
      },
      {
        Header: '% Complete',
        accessor: 'percentageComplete',
        maxWidth: 100
      },
      {
        Header: 'Modified',
        accessor: 'modifiedDate',
        maxWidth: 135
      }
    ]
  }
];

export default TableColumns;
