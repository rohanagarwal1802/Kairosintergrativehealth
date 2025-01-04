import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  alpha,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
  Chip,
  Collapse,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import * as XLSX from "xlsx"; // Import xlsx for Excel generation
import Loader from "@/components/Loader";
import TextContainer from "@/components/textContainer";
import { useRouter } from "next/router";

// Constants for column headers
const headCells = [
  {
    id: "sno",
    numeric: false,
    disablePadding: true,
    label: "S.No",
  },
  // {
  //   id: "id",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "ID",
  // },
  {
    id: "firstname",
    numeric: true,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastname",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "dob",
    numeric: true,
    disablePadding: false,
    label: "Date of Birth",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "mobile",
    numeric: true,
    disablePadding: false,
    label: "Mobile",
  },
  {
    id: "insurance",
    numeric: true,
    disablePadding: false,
    label: "Insurance",
  },
  {
    id: "isRegistered",
    numeric: true,
    disablePadding: false,
    label: "Is Active",
  },
  {
    id: "created_at",
    numeric: true,
    disablePadding: false,
    label: "Created At",
  },
  {
    id: "updated_at",
    numeric: true,
    disablePadding: false,
    label: "Updated At",
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

const handleDownloadExcel = (rows) => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

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
  ];
  worksheet["!cols"] = wscols;

  XLSX.writeFile(workbook, "patient-data.xlsx"); // Save the Excel file
};

const columnWidths = {
  sno: 60,
  firstname: 1500,
  lastname: 150,
  dob: 150,
  email: 250,
  mobile: 150,
  insurance: 100,
  isRegistered: 100,
  created_at: 200,
  updated_at: 200,
  Action: 80,
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ ml: 1 }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: columnWidths[headCell.id], maxWidth: columnWidths[headCell.id] }} // Fixed width
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



const PatientsTable = ({ userDetails }) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [rowStates, setRowStates] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!userDetails || userDetails?.role !== "admin") {
    router.push("/");
    return;
  }

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        setLoading(true);
        const patient = await axios.get("/api/getPatient");
        console.log(patient)
        setUserData(patient.data);
      } catch (error) {
        setUserData([]);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPatientData();
  }, []);

  useEffect(() => {
    if (Array.isArray(userData)) {
      setRows(userData);
      setOrder("desc");
      setOrderBy("ID");

      const initialRowStates = userData.map(() => ({
        isAuthClicked: false,
        isDenyClicked: false,
        selectedRowData: null,
      }));
      setRowStates(initialRowStates);
    }
  }, [userData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    if (event.target.tagName === "INPUT") {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return loading ? (
    <Loader />
  ) : (
    <>
      <Box sx={{ textAlign: "center", margin: "20px 0", mt: 8 }}>
        <h1 style={{ fontWeight: "bold", color: "black" }}>Patient Details</h1>
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
   <Box sx={{ overflowX: "auto" }}>
      <TableContainer
  sx={{
    maxHeight: 500,
    minHeight:500,
    overflowY: "auto", // Enables vertical scrolling
    // paddingLeft:2,
    "& .MuiTableHead-root": {
      backgroundColor: "#535945",
    },
    "& .MuiTableCell-head": {
      color: "white",
      fontWeight: "bold",
    },
    "& .MuiTableCell-head:hover": {
      color: "white",
      fontWeight: "bold",
    },
    "& .MuiTableSortLabel-root": {
      color: "white",
    },
    "& .MuiTableSortLabel-active": {
      color: "white !important", // For active column
    },
    "& .MuiTableSortLabel-icon": {
      color: "white",
    },
    "& .MuiTableCell-root": {
      color: "black", // Ensure regular table cells have black text
    },
    "& .MuiIconButton-root": {
      color: "white", // Make icons white
    },
    "& .MuiTablePagination-root": {
      color: "white", // Pagination controls
    },
  }}
>
  <Table sx={{ minWidth: 750,ml:1 }} aria-labelledby="tableTitle">
    <EnhancedTableHead
      order={order}
      orderBy={orderBy}
      onRequestSort={handleRequestSort}
      rowCount={rows.length}
    />
   <TableBody>
  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
    return (
      <><TableRow hover key={row.id}>
        <TableCell sx={{ width: columnWidths.sno }}>{index + 1}</TableCell>
        <TableCell sx={{ width: columnWidths.firstname }}>{row.firstname}</TableCell>
        <TableCell sx={{ width: columnWidths.lastname }}>{row.lastname}</TableCell>
        <TableCell sx={{ width: columnWidths.dob }}>{row.dob}</TableCell>
        <TableCell sx={{ width: columnWidths.email }}>{row.email}</TableCell>
        <TableCell sx={{ width: columnWidths.mobile }}>{row.mobile}</TableCell>
        <TableCell sx={{ width: columnWidths.insurance }}>{row.insurance}</TableCell>
        <TableCell sx={{ width: columnWidths.isRegistered }}>
          {row.isRegistered ? "Active" : "Inactive"}
        </TableCell>
        <TableCell sx={{ width: columnWidths.created_at }}>{row.created_at}</TableCell>
        <TableCell sx={{ width: columnWidths.updated_at }}>{row.updated_at}</TableCell>
        <TableCell sx={{ width: columnWidths.Action }}>
          <IconButton onClick={() => setOpenRowId(row.id)} sx={{ color: "black" }}>
            {openRowId === row.id ? <KeyboardArrowUpIcon sx={{ color: "black" }} /> : <KeyboardArrowDownIcon sx={{ color: "black" }} />}
          </IconButton>
        </TableCell>

      </TableRow><TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headCells.length}>
            <Collapse in={openRowId === row.id} timeout="auto" unmountOnExit>
              <Dialog open={true}>
                <DialogContent>
                  <DialogContentText>
                    {/* Render details for each patient */}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenRowId(null)} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Collapse>
          </TableCell>
        </TableRow></>
    );
  })}
</TableBody>
  </Table>
</TableContainer>



        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

PatientsTable.propTypes = {
  userDetails: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
};

export default PatientsTable;
