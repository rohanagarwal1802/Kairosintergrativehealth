import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button ,IconButton,Tooltip} from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx for Excel generation
import Loader from '@/components/Loader';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import TextContainer from '@/components/textContainer';
import { useRouter } from 'next/router';
// import CustomPaginationGrid from '@/components/customPagination';
import DeleteContactModal from '@/components/Contact/contactDeleteModal';

const ContactMessages = ({ userDetails }) => {
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
console.log(userDetails)
if (userDetails && userDetails?.role !== 'admin') {
  router.push('/');
  return;
}

  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);

      const [messageToEdit, setMessageToEdit] = useState(null);
      const [selectedIds, setSelectedIds] = useState([]);
        const [openDeleteModel, setOpenDeleteModel] = useState(false);
         const [multipleEditable, setMultipleEditable] = useState(false);

         const getMessages = async () => {
          try {
            setLoading(true);
            const message = await axios.get('/api/getContactMessages');
            console.log("Messages",message.data.data)
            setMessages(message.data.data);
          } catch (error) {
            setMessages([])
            console.log(error);
          } finally {
            setLoading(false);
          }
        };

  useEffect(() => {
   
    getMessages();
  }, []);
if(!Array.isArray(messages))
{
    return
}
  const columns = [
    { field: 'sno', headerName: 'S.NO', width: 75 },
    { field: 'full_name', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phoneNumber', headerName: 'Mobile Number', width: 300 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'message', headerName: 'Message', width: 500},
    { field: 'created_at', headerName: 'Posted At', width: 200 },
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

  const rows = messages.map((user,index) => ({
   sno: index + 1,
    id: user?.id, // Add serial number starting from 1
    full_name: user?.full_name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    subject: user?.subject,
    message: user?.message ,
    created_at: new Date(user?.created_at).toLocaleString(),
  }));

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');

    // Set column widths for better readability
    const wscols = [
      { wch: 15 }, 
      { wch: 15 }, // First Name
      { wch: 30 }, // Email
      { wch: 15 }, // Mobile
      { wch: 15 }, // Mobile
      { wch: 10 }, // Subject
      { wch: 50 }, // message
      { wch: 25 }, // Created At
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, 'contact-messages.xlsx'); // Save the Excel file
  };
  
  const handleDelete = (row) => {
    setMessageToEdit([row.id]);
    setOpenDeleteModel(true);
  };

  const handleDeleteMultipleClick = () => {
    setOpenDeleteModel(true);
    setMessageToEdit(selectedIds);
  };


  return loading ? (
    <Loader />
  ) : (
    <>
    <Box>

<Box sx={{ textAlign: 'center', margin: '20px 0',mt:8 }}>
    <h1 style={{ fontWeight: 'bold' ,color:"black"}}>Contact Messages</h1>
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
                    disableRowSelectionOnClick
                    checkboxSelection={multipleEditable}
                    onRowSelectionModelChange={(newSelection) =>
                      handleSelectionChange(newSelection)
                    }
                    components={{
                      // Pagination: CustomPaginationGrid,
                      Toolbar: GridToolbar,
                    }}
                    localeText={{ noRowsLabel: "No Appointments Available" }}
                    // getRowClassName={(params) =>
                    //   params.row.isExpired ? "expired-row" : ""
                    // }
                  />
                </Box>
    </Box>
    {openDeleteModel && (
      <DeleteContactModal
        id={messageToEdit}
        onClose={() => setOpenDeleteModel(false)}
        open={openDeleteModel}
        getContactMessages={getMessages}
      />
      
    )}
    </>
  );
};

export default ContactMessages;
