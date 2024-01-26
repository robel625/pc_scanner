import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Avatar, Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { grey } from '@mui/material/colors';
import { gridClasses } from '@mui/x-data-grid';
import avatar4 from '../data/avatar4.jpg';
import { Link } from "react-router-dom";
import { GrView } from 'react-icons/gr';
import { MdOutlineDeleteForever } from "react-icons/md";

const gridEmployeeAction = (props) => (
  <div className="flex items-center justify-center gap-2">
    <Link to={`/staff/${props.id}`}>
      <GrView style={{ fontSize: '20px', color: 'green' }}/>
    </Link>
     <MdOutlineDeleteForever style={{ fontSize: '25px', color: 'red' }} />
  </div>
);

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'photoURL',
    headerName: 'Avatar',
    width: 60,
    renderCell: (params) => <Avatar src={params.row.photoURL} />,
    sortable: false,
    filterable: false,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { 
      headerName: 'Action',
      renderCell: (params) => 
      <div className="flex items-center justify-center gap-2">
      <Link to={`/staff/${params.row.id}`}>
        <GrView style={{ fontSize: '20px', color: 'green' }}/>
      </Link>
       <MdOutlineDeleteForever style={{ fontSize: '25px', color: 'red' }} />
    </div>, },
];


const rows = [
  { id: 1, photoURL:avatar4 , lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 1, photoURL:avatar4 , lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 1, photoURL:avatar4 , lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];



const All_Staff = () => {

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [page, setPage] = useState(1);

  console.log("paaaaaaaaaage", page)


  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Manage Users
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onPageChange={(newPage) => setPage(newPage)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  )
}

export default All_Staff