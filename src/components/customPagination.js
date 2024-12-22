import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import MuiPagination from "@mui/material/Pagination";

// Custom Pagination Component
function Pagination(props) {
  const { page, onPageChange } = props;

  return (
    <MuiPagination
      color="primary"
      count={props.pageCount}
      page={page + 1}
      onChange={(event, newPage) => onPageChange(event, newPage - 1)}
      showFirstButton
      showLastButton
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function CustomPaginationGrid() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data.rows}
        columns={data.columns}
        pagination
        components={{
          Pagination: CustomPagination,
        }}
        sx={{
          // Hide the pagination text only
          "& .MuiTablePagination-displayedRows": {
            display: "none", // Hides the text displaying "1–10 of 100"
          },
          "& .MuiTablePagination-actions": {
            // Optional: Ensure pagination controls are visible
            display: "flex",
          },
        }}
        {...data}
      />
    </Box>
  );
}