import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx for Excel generation
import Loader from '@/components/Loader';
import TextContainer from '@/components/textContainer';
import { useRouter } from 'next/router';
import CustomPaginationGrid from '@/components/customPagination';

const ContactMessages = ({ userDetails }) => {
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
console.log(userDetails)
//   if (userDetails?.role !== 'admin') {
//     router.push('/');
//     return;
//   }

  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'message', headerName: 'Message', width: 500},
    { field: 'created_at', headerName: 'Posted At', width: 200 },
  ];

  const rows = messages.map((user,index) => ({
    id: user?.id,
    sno: index + 1, // Add serial number starting from 1
    full_name: user?.full_name,
    email: user?.email,
    mobile: user?.mobile,
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
      { wch: 10 }, // Subject
      { wch: 50 }, // message
      { wch: 25 }, // Created At
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, 'contact-messages.xlsx'); // Save the Excel file
  };

  return loading ? (
    <Loader />
  ) : (
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
                    localeText={{ noRowsLabel: "No Appointments Available" }}
                    getRowClassName={(params) =>
                      params.row.isExpired ? "expired-row" : ""
                    }
                  />
                </Box>
    </Box>
  );
};

export default ContactMessages;
