import React, { useState, useEffect,useCallback } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button,IconButton,Tooltip } from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx for Excel generation
import Loader from '@/components/Loader';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";


import TextContainer from '@/components/textContainer';
import { useRouter } from 'next/router';

import DeleteRoundtableModal from '@/components/roundTable/deleteRoundTableModal';
// import CustomPaginationGrid from '@/components/customPagination';

const RoundTable = ({ userDetails }) => {
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  if (!userDetails || userDetails?.role !== 'admin') {
    router.push('/');
    return;
  }

  const [userData, setUserData] = useState();null
  const [loading, setLoading] = useState(false);

    const [roundtableToEdit, setRoundtableToEdit] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
      const [openDeleteModel, setOpenDeleteModel] = useState(false);
       const [multipleEditable, setMultipleEditable] = useState(false);

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
          setMultipleEditable(false)
        }
      };

  useEffect(() => {
    
    getPatientData();
  }, []);

  const handleSelectionChange = useCallback(
    (selectedRowIds) => {
      setSelectedIds(selectedRowIds); // Store only the IDs
    },
    [] // userData is no longer required as it's not used
  );
  

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
    {
      field: "delete",
      headerName: "Delete",
      minWidth: 70,
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row)}>
          <DeleteIcon sx={{ color:  "red" }} />
        </IconButton>
      ),
    },
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

  const handleDelete = (row) => {
    setRoundtableToEdit([row.id]);
    setOpenDeleteModel(true);
  };

  const handleDeleteMultipleClick = () => {
    setOpenDeleteModel(true);
    setRoundtableToEdit(selectedIds);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
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
                <Tooltip
          title={multipleEditable ? "Disallow Edit Multiple" : "Allow Edit Multiple"}
          placement="top"
        >
          <IconButton onClick={() => setMultipleEditable(!multipleEditable)} sx={{ mr: "1%" }}>
            {multipleEditable ? (
              <EditOffIcon sx={{ color: "black" }} />
            ) : (
              <EditIcon sx={{ color: "black" }} />
            )}
          </IconButton>
        </Tooltip>

        {multipleEditable && (
          <Tooltip title="Delete Multiple" placement="top">
            <IconButton
              onClick={() => handleDeleteMultipleClick()}
              sx={{ mr: "1%" }}
              disabled={selectedIds.length === 0}
            >
              <DeleteIcon sx={{ color: selectedIds.length === 0 ?"grey":"red"}} />
            </IconButton>
          </Tooltip>
        )}
        <Button variant="contained" color="primary" onClick={handleDownloadExcel}>
          Download as Excel
        </Button>
      </Box>
        <Box
                  sx={{
                    height: "90vh",
                    width: "100%",
                    "& .super-app-theme--header": {
                      backgroundColor: "#535945",
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
                      backgroundColor: "#535945", // Match header color
                      color: "white",
                      // borderRadius: "4px", // Consistent border radius
                    },
                    // CSS to target the header checkbox
                    "& .MuiDataGrid-columnHeader .MuiCheckbox-root": {
                      color: "grey !important", // Grey color for disabled state
                      backgroundColor: "#535945 !important", // Blue background
                    },
                    "& .MuiDataGrid-columnHeader .MuiCheckbox-root.Mui-disabled": {
                      color: "#e0e0e0 !important", // Grey color for disabled state
                      backgroundColor: "#535945 !important", // Blue background
                      cursor: "not-allowed", // Cursor to indicate disabled state
                    },
                  }}
                >
                   <DataGrid
                    rows={rows}  // Use rows instead of userData directly
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                  onPageSizeChange={(newPageSize) => {
                                    handlePageSizeChange(newPageSize);
                                    setPage(0); // Reset page to 0 when page size changes
                                  }}
                                  disableColumnResize
                                  disableSelectionOnClick
                                  disableRowSelectionOnClick
                                  checkboxSelection={multipleEditable} // Enable checkboxes for row selection
                                  onRowSelectionModelChange={(newSelection) =>
                                    handleSelectionChange(newSelection)
                                  }
                                 
                    components={{
                      //  Pagination: CustomPaginationGrid, 
                      Toolbar: GridToolbar }}
                    localeText={{ noRowsLabel: "No RoundTable Details Available" }}
                  />
                </Box>
    </Box>
     {openDeleteModel && (
      <DeleteRoundtableModal
        id={roundtableToEdit}
        onClose={() => setOpenDeleteModel(false)}
        open={openDeleteModel}
        getRoundTableDetails={getPatientData}
      />
      
    )}
    </>
  );
};

export default RoundTable;
