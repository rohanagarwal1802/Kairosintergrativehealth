import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import Loader from '@/components/Loader';
import { jsPDF } from "jspdf"; // Import jsPDF
import { useRouter } from 'next/router';

const UserTable = ({userDetails}) => {
  const router=useRouter()

  if(userDetails?.role!=='admin')
  {
    router.push('/')
    return
  }
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Set the user data manually for now or fetch from API
  useEffect(() => {
    const getPatientData = async () => {
      try {
        setLoading(true);
        const patient = await axios.get('/api/getPatient');
        setUserData(patient.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPatientData();
  }, []);

  const columns = [
    { field: 'firstname', headerName: 'First Name', width: 150 },
    { field: 'lastname', headerName: 'Last Name', width: 150 },
    { field: 'dob', headerName: 'Date of Birth', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'service', headerName: 'Service', width: 250 },
    { field: 'insurance', headerName: 'Insurance', width: 120 },
    { field: 'howDidYouHear', headerName: 'How Did You Hear', width: 180 },
    { field: 'isActive', headerName: 'Is Active', width: 120 },
    { field: 'created_at', headerName: 'Created At', width: 200 },
    { field: 'updated_at', headerName: 'Updated At', width: 200 },
  ];

  const rows = userData.map((user) => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    dob: user.dob,
    email: user.email,
    mobile: user.mobile,
    service: user.service,
    insurance: user.insurance ? 'Yes' : 'No',
    howDidYouHear: user.howDidYouHear,
    isActive: user.isActive ? 'Yes' : 'No',
    created_at: new Date(user.created_at).toLocaleString(),
    updated_at: new Date(user.updated_at).toLocaleString(),
  }));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Patient Data", 14, 20);

    // Add table header
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text("First Name", 14, 30);
    doc.text("Last Name", 64, 30);
    doc.text("Date of Birth", 114, 30);
    doc.text("Email", 164, 30);
    doc.text("Mobile", 214, 30);
    doc.text("Service", 264, 30);
    doc.text("Insurance", 314, 30);
    doc.text("How Did You Hear", 364, 30);
    doc.text("Is Active", 414, 30);
    doc.text("Created At", 464, 30);
    doc.text("Updated At", 514, 30);

    // Add rows
    rows.forEach((row, index) => {
      const yOffset = 40 + (index * 10);
      doc.text(row.firstname, 14, yOffset);
      doc.text(row.lastname, 64, yOffset);
      doc.text(row.dob, 114, yOffset);
      doc.text(row.email, 164, yOffset);
      doc.text(row.mobile, 214, yOffset);
      doc.text(row.service, 264, yOffset);
      doc.text(row.insurance, 314, yOffset);
      doc.text(row.howDidYouHear, 364, yOffset);
      doc.text(row.isActive, 414, yOffset);
      doc.text(row.created_at, 464, yOffset);
      doc.text(row.updated_at, 514, yOffset);
    });

    doc.save('patient-data.pdf'); // Save the generated PDF
  };

  return (
    loading ? (
      <Loader />
    ) : (
      <Box sx={{ height: 400, width: '100%', p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
            Download as PDF
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              fontWeight: 'bold', // Bold header
              backgroundColor: '#a8e6cf', // Light green background for headers
              color: '#000', // Set text color for better contrast
            },
            '& .MuiDataGrid-cell': {
              backgroundColor: 'white', // White background for cells
            },
            '& .MuiDataGrid-root': {
              border: 'none', // Remove grid borders for cleaner look
            },
          }}
        />
      </Box>
    )
  );
};

export default UserTable;
