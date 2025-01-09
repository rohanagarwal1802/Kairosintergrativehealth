import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Menu, MenuItem, ListItemIcon, Chip, Tooltip ,Switch} from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx for Excel generation
import Loader from '@/components/Loader';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useRouter } from 'next/router';
// import CustomPaginationGrid from '@/components/customPagination';
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import ReviewStatusChangeModal from '@/components/Review/reviewStatusChangeModal';
import PublishStatusChangeModal from '@/components/Review/publishStatusChange';
import DeleteReviewsModal from '@/components/Review/DeleteModal';

const UserTable = ({ userDetails }) => {
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  if (!userDetails || userDetails?.role !== 'admin') {
    router.push('/');
    return null;
  }

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for menu
  const [multipleEditable, setMultipleEditable] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openStatusModel,setOpenStatusModel]=useState(false)
  const [publishOpenStatusModel,setPublishOpenStatusModel]=useState(false)

  const options = [
    { name: "Approve", icon: <AddTaskIcon />, color: "green" },
    { name: "Reject", icon: <DoNotDisturbIcon />, color: "red" },
  ];

  const handleStatus = async (row, status) => {
console.log("status",status)
    setReviewToEdit({
      ...row,
      status: status === "Approve" ? true : false,
    });
    handleISActiveChange(row)
  };

  const handlePublishStatus = async (row) => {
        setReviewToEdit(row);
        setPublishOpenStatusModel(true)
      };
  const getPatientData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/getPublicReviews');
      setUserData(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setUserData([]);
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
  

  const handleISActiveChange = (row) => {
    // Define your logic to handle the status change
    console.log("Row to Change===>", row);
    setOpenStatusModel(true);
    // setReviewToEdit(row);
  };

  const rows = userData.map((user, index) => ({
    sno: index + 1,
    id: user?.id,
    full_name: user?.full_name,
    publishing_name: user?.publishing_name,
    // designation: user?.designation,
    email: user?.email,
    // services_availed: user?.services_availed,
    review: user?.review,
    public: user?.public,
    approval_status:user?.approval_status,
    created_at: new Date(user?.created_at).toLocaleString(),
  }));
  const handleDownloadExcel = () => {
  

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reviews');

    const wscols = [
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 20 },
      { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 10 }
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, 'review-data.xlsx');
  };

  const handleDelete = (row) => {
    setReviewToEdit([row.id]);
    setOpenDeleteModel(true);
  };

  const handleDeleteMultipleClick = () => {
    setOpenDeleteModel(true);
    setReviewToEdit(selectedIds);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchorEl to the clicked button
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const columns = [
    { field: 'sno', headerName: 'S.No', width: 150 },
    { field: 'full_name', headerName: 'Full Name', width: 150 },
    { field: 'publishing_name', headerName: 'Publishing Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    // { field: 'designation', headerName: 'Designation', width: 150 },
    // { field: 'services_availed', headerName: 'Service Availed', width: 150 },
    { field: 'review', headerName: 'Review', width: 500 },
    { field: 'public', headerName: 'Allow Publishing', width: 200,renderCell: (params) => (
      <Switch
        label="status"
        value={params.value}
        checked={params.value}
        onChange={() => handlePublishStatus(params.row)}
      />
     
    ), },
    { field: 'created_at', headerName: 'Created At', width: 200 },
    {
      field: "approval_status",
      headerName: "Approval status",
      minWidth:250,
      flex: 2,
      renderCell: (params) =>
        // console.log("params value",params.value)
        params.value === "pending" ? (
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <Chip
              variant="outlined"
              label={params.value}
              sx={{ color: "blue", borderColor: "darkgoldenrod", borderStyle: "dotted" }}
            />
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              {options.map((option, i) => (
                <MenuItem key={i} onClick={() => handleStatus(params.row, option.name)} sx={{ color: option.color }}>
                  <ListItemIcon sx={{ color: option.color }}>
                    {option.icon}
                  </ListItemIcon>
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Chip label={params.value} sx={{ color: "white", backgroundColor: params.value === "Approved" ? "green" : "red" }} />
        ),
    },
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

  if (loading) {
    return <Loader />;
  }
console.log("rows ==>",rows)
  return (
    <>
    <Box>
      <Box sx={{ textAlign: 'center', margin: '20px 0', mt: 8 }}>
        <h1 style={{ fontWeight: 'bold', color: "black" }}>Reviews</h1>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, marginRight: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 2 } }}>
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
  localeText={{ noRowsLabel: "No Reviews Available" }}
/>
      </Box>
    </Box>
    {openStatusModel && (
      <ReviewStatusChangeModal
        row={reviewToEdit}
        open={openStatusModel}
        onClose={() => setOpenStatusModel(false)}
        getPatientData={getPatientData}
      />
    )}

 {publishOpenStatusModel && (
      <PublishStatusChangeModal
        row={reviewToEdit}
        open={publishOpenStatusModel}
        onClose={() => setPublishOpenStatusModel(false)}
        getPatientData={getPatientData}
      />
    )}
    {openDeleteModel && (
      <DeleteReviewsModal
        id={reviewToEdit}
        onClose={() => setOpenDeleteModel(false)}
        open={openDeleteModel}
        getPatientData={getPatientData}
      />
    )}
    </>
  );
};

export default UserTable;
