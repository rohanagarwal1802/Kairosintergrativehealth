import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import CustomPaginationGrid from "@/components/customPagination";
import TextContainer from "@/components/textContainer";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import formatDateStringDDMMYYYY from "@/components/formatDateStringMMDDYYYY";
import { Box, Button, Switch, Tooltip, IconButton } from "@mui/material";
// import useCustomSnackbarStore from "@/styles/store/useCustomSnackbarStore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
// import useUserStore from "@/styles/store/UserStore";
import { useRouter } from "next/router";
import AppointmentFormModal from "@/components/Appointment/userAppointmentForm";
// import GenerateAPIKeysModal from "../models/generateAPIKeyModal";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";


// Function to check if the expiration date is before today
const isExpired = (expirationDate) => {
  const today = new Date();
  const expDate = new Date(expirationDate);
  return expDate < today;
};

// Create the rows with data and apply the expiration check
function createData(index, item) {
  return {
    sno: index,
    id: item.id,
    api_key: item.key,
    version: item.version,
    validity: item.validity,
    associated_partner_id: item?.partnerUser?.id, // Corrected to access item.partnerUser.id
    associated_partner:
      item?.partnerUser?.username +
      (item?.partnerUser?.lastname ? ` ${item?.partnerUser?.lastname}` : ""), // Fixed string concatenation
    creation_date: formatDateStringDDMMYYYY(item.created_at),
    updation_date: formatDateStringDDMMYYYY(item.updated_at),
    expiration_date: formatDateStringDDMMYYYY(item.expiration_date),
    status: item.status,
    isExpired: isExpired(item.expiration_date),
  };
}
export default function APIKeysForPartnerPortal({
  PartnerSuperAdminData,
  setPartnerSuperAdminData,
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [ APIKeysForPartnerPortal,
    setAPIKeysForPartnerPortal]=useState(null)
    const [ 
    isAPIKeysUpdated,
    setAPIKeysUpdated,
     ] = useState(false);
  const [appointmentBookModalOpen, setAppointmentBookModalOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [initialRows, setInitialRows] = useState([]);
  const [multipleEditable, setMultipleEditable] = useState(false);
  const [disableMultipleDeleteButton, setDisabledMultipleDeleteButton] =
    useState(false);
  const [disableMultipleExpireButton, setDisabledMultipleExpireButton] =
    useState(false);

//   const { setSnackbar } = useCustomSnackbarStore();
  const router = useRouter(); // Hook to get the current router

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

  const fetchAPIKeys = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/getApiKeysForPartners"); // Replace with actual API call if needed
      setAPIKeysForPartnerPortal(response.data);
      setAPIKeysUpdated(false);
    } catch (error) {
      console.log(error);
      setAPIKeysForPartnerPortal([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (isAPIKeysUpdated) {
      fetchAPIKeys();
    }
  }, [page, fetchAPIKeys, isAPIKeysUpdated]);

  useEffect(() => {
    if (Array.isArray(APIKeysForPartnerPortal)) {
      const newRows = APIKeysForPartnerPortal.map((item, index) =>
        createData(index + 1, item)
      );
      setRows(newRows);
      setInitialRows(newRows);
    }
  }, [APIKeysForPartnerPortal]);




  const handleSelectionChange = useCallback(
    (selectedRowIds) => {
      // Convert selectedRowIds to an array of selected IDs
      const selectedIds = selectedRowIds;

      // Map selected IDs to their corresponding row data
      const selectedRowsData = rows.filter((row) =>
        selectedIds.includes(row.id)
      );

      // Check conditions to set button states
      const hasStatusTrue = selectedRowsData.some((row) => row.status === true);
      const hasExpiredTrue = selectedRowsData.some(
        (row) => row.isExpired === true
      );

      setSelectedIds(selectedIds);
      console.log("Selected Rows Data:", selectedRowsData);

      // Set button states based on conditions
      setDisabledMultipleDeleteButton(hasStatusTrue);
      setDisabledMultipleExpireButton(hasExpiredTrue);
    },
    [rows]
  );

 

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
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
              checkboxSelection={multipleEditable} // Enable checkboxes for row selection
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
        </>
      )}
      {appointmentBookModalOpen && (
        <AppointmentFormModal
          open={appointmentBookModalOpen}
          onClose={() => setAppointmentBookModalOpen(false)}
        //   PartnerSuperAdminData={PartnerSuperAdminData}
        />
      )}
     
      
    </>
  );
}