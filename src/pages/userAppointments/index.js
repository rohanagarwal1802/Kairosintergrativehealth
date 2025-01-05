import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
// import CustomPaginationGrid from "@/components/customPagination";
import TextContainer from "@/components/textContainer";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
import formatDateStringDDMMYYYY from "@/components/formatDateStringMMDDYYYY";
import { Box, Button, Switch, Tooltip, IconButton } from "@mui/material";
// // import useCustomSnackbarStore from "@/styles/store/useCustomSnackbarStore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import EditOffIcon from "@mui/icons-material/EditOff";
// import useUserStore from "@/styles/store/UserStore";
import { useRouter } from "next/router";
import * as XLSX from 'xlsx';
import AppointmentFormModal from "@/components/Appointment/userAppointmentForm";
// import GenerateAPIKeysModal from "../models/generateAPIKeyModal";






export default function AppointMentForPartners({
  userDetails
}) {

  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [appointmentBookModalOpen, setAppointmentBookModalOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [appointmentData,setAppointMentData]=useState([])


//   const { setSnackbar } = useCustomSnackbarStore();
  const router = useRouter(); // Hook to get the current router

  if(userDetails===null || userDetails?.patientId===null || userDetails?.password===null)
  {
    router.push("/")
    return
  }

  useEffect(() => {
    // Find the "Select All" checkbox in the header
    const selectAllCheckbox = document.querySelector(
      ".MuiDataGrid-columnHeader .MuiCheckbox-root input"
    );

    if (selectAllCheckbox) {
      // Disable the "Select All" checkbox
      selectAllCheckbox.disabled = true;
      selectAllCheckbox.style.cursor = "not-allowed";
    }
  }, []);

  const getAppointMentData = async () => {
    try {
      setLoading(true);
      let patientId=userDetails?.patientId
      const appointments = await axios.get(`/api/getAppointMentsByPatientID?patientId=${patientId}`);
      console.log(appointments.data)
      setAppointMentData(appointments.data.data);
    } catch (error) {
      setAppointMentData([])
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    getAppointMentData();
  }, []);

  if(loading)
  {
    return <Loader/>
  }
if(!Array.isArray(appointmentData))
  return
  
 

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      width: 70,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "service",
      headerName: "Service Availed",
      width: 200,
      // flex: 2,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <TextContainer>
          {params.value !== null && params.value !== undefined
            ? params.value
            : "NA"}
        </TextContainer>
      ),
    },
    

    {
      field: "location",
      headerName: "Location",
      minWidth: 150,
      flex: 2,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <TextContainer>
          {params.value !== null && params.value !== undefined
            ? params.value
            : "NA"}
        </TextContainer>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 2,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <TextContainer>
          {params.value !== null && params.value !== undefined
            ? params.value
            : "NA"}
        </TextContainer>
      ),
    },
    // {
    //   field: "updation_date",
    //   headerName: "Updation Date",
    //   minWidth: 150,
    //   flex: 2,
    //   headerClassName: "super-app-theme--header",
    //   renderCell: (params) => (
    //     <TextContainer>
    //       {params.value !== null && params.value !== undefined
    //         ? params.value
    //         : "NA"}
    //     </TextContainer>
    //   ),
    // },
   
  ];

  const rows = appointmentData.map((user,index) => ({
   sno: index + 1,
    id: user?.id, // Add serial number starting from 1
    service: user?.service,
    location: user?.location,
    date: new Date(user?.appointmentDate
    ).toLocaleString(),  }));

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');
    
        // Set column widths for better readability
        const wscols = [
          { wch: 15 }, // SNO
          { wch: 15 }, // Service
          { wch: 20 }, //AppointMent
          { wch: 25 }, // Date
        ];
        worksheet['!cols'] = wscols;
    
        XLSX.writeFile(workbook, 'appointment-data.xlsx'); // Save the Excel file
      };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <Box sx={{ textAlign: 'center', margin: '20px 0',mt:8 }}>
            <h1 style={{ fontWeight: 'bold' ,color:"black"}}>Appointment Details</h1>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt:8,
              marginBottom: 2,
              marginRight: 2,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 2 },
            }}
          >

             <Button variant="contained" color="primary" onClick={handleDownloadExcel}>
                      Download as Excel
                    </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setAppointmentBookModalOpen(true)}
            >
              Book Your Appointment
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
              checkboxSelection={false} // Enable checkboxes for row selection
              // onRowSelectionModelChange={(newSelection) =>
              //   handleSelectionChange(newSelection)
              // }
              components={{
                // Pagination: CustomPaginationGrid,
                Toolbar: GridToolbar,
              }}
              localeText={{ noRowsLabel: "No Appointments Available" }}
              getRowClassName={(params) =>
                params.row.isExpired ? "expired-row" : ""
              }
            />
          </Box>
        </>
      )}
      {appointmentBookModalOpen && (
        <AppointmentFormModal
          open={appointmentBookModalOpen}
          onClose={() => setAppointmentBookModalOpen(false)}
          patientId={userDetails.patientId}
          getAppointMentData={getAppointMentData}
          userDetails={userDetails}
        //   PartnerSuperAdminData={PartnerSuperAdminData}
        />
      )}
     
      
    </>
  );
}