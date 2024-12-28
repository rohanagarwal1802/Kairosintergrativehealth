import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx for Excel generation
import Loader from '@/components/Loader';
import TextContainer from '@/components/textContainer';
import { useRouter } from 'next/router';
import CustomPaginationGrid from '@/components/customPagination';

const RoundTable = ({ userDetails }) => {
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  if (!userDetails || userDetails?.role !== 'admin') {
    router.push('/');
    return;
  }

  const [userData, setUserData] = useState();null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        setLoading(true);
        const patient = await axios.get('/api/getRoundTableDetails');
        console.log(patient.data.data)
        setUserData(patient.data.data);
      } catch (error) {
        setUserData([])
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPatientData();
  }, []);

  if(loading)
  {
    return <Loader/>
  }
if(!Array.isArray(userData))
  return
  const columns = [
    { field: 'sno', headerName: 'S.No', width: 150 },
    { field: 'firstname', headerName: 'First Name', width: 150 },
    { field: 'lastname', headerName: 'Last Name', width: 150 },
    { field: 'dob', headerName: 'Date of Birth', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'textPermission', headerName: 'Permission to Text', width: 200 },
    { field: 'attending', headerName: 'Attending', width: 120 },
    { field: 'over18', headerName: 'over18', width: 120 },
   
    { field: 'type', headerName: 'Type', width: 250 },
    { field: 'friendFirstName', headerName: 'Friend First Name', width: 200 },
    { field: 'friendLastName', headerName: 'Friend Last Name', width: 200 },
    { field: 'friendDob', headerName: 'Friend Dob', width: 200 },
    { field: 'friendPhoneNumber', headerName: 'Friend Phone Number', width: 200 },
    { field: 'friendTextPermission', headerName: 'Friend Text Permission', width: 200 },
    { field: 'memberName', headerName: 'Person Fillig out Form', width: 230 },
    { field: 'firstAttendeeName', headerName: 'First Ateendee Name', width: 200 },
    { field: 'secondAttendeeName', headerName: 'Second Ateendee Name', width: 200 },


    // "memberName": "Rahul",
    // "firstAttendeeName": "Rahul",
    // "secondAttendeeName": "Rahul", 

    // "friendFirstName": "aaa",
    //         "friendLastName": "aaa",
    //         "friendDob": "2024-12-01",
    //         "friendPhoneNumber": "896-874-2203",
    //         "friendTextPermission": true,
    // { field: 'attending', headerName: 'Attending', width: 120 },
    // { field: 'attending', headerName: 'Attending', width: 120 },
    
    { field: 'created_at', headerName: 'Created At', width: 200 },
  ];

  const rows = userData.map((user,index) => ({
    sno: index + 1,
    id: user?.id,
 // Add serial number starting from 1
    firstname: user?.firstName,
    lastname: user?.lastName,
    dob: user?.dob,
    email: user?.email,
    mobile: user?.phoneNumber,
    textPermission: user?.textPermission || false,
    attending: user?.attending || false ,
    over18: user?.over18 || false ,
    friendTextPermission: user?.friendTextPermission || false,
    type:user?.payment==="guest"?"Guest Access":"Member Discounted Plan",
    friendFirstName: user?.friendFirstName || 'N/A',
    friendLastName: user?.friendLastName || 'N/A',
    friendDob: user?.friendDob || 'N/A',
    friendPhoneNumber: user?.friendPhoneNumber || 'N/A',

    memberName: user?.memberName || 'N/A',
    firstAttendeeName: user?.firstAttendeeName || 'N/A',
    secondAttendeeName: user?.secondAttendeeName || 'N/A',
    // attending: user?.attending || false ,
    // attending: user?.attending || false ,
    created_at: user?.created_at.split("T")[0],
  }));

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');

    // Set column widths for better readability
    const wscols = [
      { wch: 15 },
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 20 }, // DOB
      { wch: 30 }, // Email
      { wch: 15 }, // Mobile
      { wch: 10 }, // Insurance
      { wch: 10 }, // Is Active
      { wch: 25 }, // Created At
      { wch: 25 }, // Updated At
      { wch: 15 },
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 20 }, // DOB
      { wch: 30 }, // Email
      { wch: 15 }, // Mobile
      { wch: 10 }, // Insurance
      { wch: 10 }, // Is Active
      { wch: 25 }, // Created At
      { wch: 25 }, // Updated At
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, 'ResilienceRoundTable-data.xlsx'); // Save the Excel file
  };

  return loading ? (
    <Loader />
  ) : (
    <Box>

<Box sx={{ textAlign: 'center', margin: '20px 0',mt:8 }}>
    <h1 style={{ fontWeight: 'bold' ,color:"black"}}>Resilience Roundtable Details</h1>
  </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 2,
          marginRight: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 2 },
        }}
      >
        <Button variant="contained" color="primary" onClick={handleDownloadExcel}>
          Download as Excel
        </Button>
      </Box>
        <Box
                  sx={{
                    height: "90vh",
                    width: "100%",
                    "& .super-app-theme--header": {
                      backgroundColor: "green",
                      color: "white",
                    },
                    "& .MuiDataGrid-columnHeaderTitleContainer": {
                      color: "white",
                    },
                    "& .MuiDataGrid-iconButtonContainer .MuiDataGrid-sortIcon": {
                      color: "white",
                    },
                    "& .MuiDataGrid-menuIconButton": {
                      color: "white",
                    },
                    "& .MuiDataGrid-columnHeader .MuiDataGrid-filterIcon": {
                      color: "white",
                    },
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: "green", // Match header color
                      color: "white",
                      // borderRadius: "4px", // Consistent border radius
                    },
                    // CSS to target the header checkbox
                    "& .MuiDataGrid-columnHeader .MuiCheckbox-root": {
                      color: "grey !important", // Grey color for disabled state
                      backgroundColor: "green !important", // Blue background
                    },
                    "& .MuiDataGrid-columnHeader .MuiCheckbox-root.Mui-disabled": {
                      color: "#e0e0e0 !important", // Grey color for disabled state
                      backgroundColor: "green !important", // Blue background
                      cursor: "not-allowed", // Cursor to indicate disabled state
                    },
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => {
                      handlePageSizeChange(newPageSize);
                      setPage(0); // Reset page to 0 when page size changes
                    }}
                    disableColumnResize
                    disableSelectionOnClick
                    onRowSelectionModelChange={(newSelection) =>
                      handleSelectionChange(newSelection)
                    }
                    components={{
                      Pagination: CustomPaginationGrid,
                      Toolbar: GridToolbar,
                    }}
                    localeText={{ noRowsLabel: "No Patients Available" }}
                    getRowClassName={(params) =>
                      params.row.isExpired ? "expired-row" : ""
                    }
                  />
                </Box>
    </Box>
  );
};

export default RoundTable;
