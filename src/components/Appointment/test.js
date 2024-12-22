import React, { useState, forwardRef } from 'react'
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
  Typography,
  IconButton,
  CircularProgress
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SaveIcon from '@mui/icons-material/Save'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Formik, Form } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function FilterTransactionDialog({
  open,
  onClose,
  transactions,
  setTransactions,
  preTransactions,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  status,
  setStatus,
  paymentMode,
  setPaymentMode
}) {
  const [loading, setLoading] = useState(false)

  // Date Picker Change Handler
  const onDateChange = (dates, setFieldValue) => {
    const [start, end] = dates
    setFieldValue('startDate', start)
    setFieldValue('endDate', end)
  }

  // Form submission
  const handleFilter = async (values, { setSubmitting, setFieldValue }) => {
    // debugger
    const { status, payment_mode, startDate, endDate } = values
    if (endDate === '' || !endDate) {
      setFieldValue('startDate', '')
      setStartDate('')
    }
    setStatus(status)
    setPaymentMode(payment_mode)
    setStartDate(startDate)
    setEndDate(endDate)
    let filteredTransactions = preTransactions

    // Filtering logic
    if (status !== '' && payment_mode !== '' && startDate && endDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0) // Start of the day

      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      filteredTransactions = await preTransactions.filter(
        transaction =>
          transaction.status === status &&
          transaction.payment_mode === payment_mode &&
          new Date(transaction.createdAt) >= new Date(start) &&
          new Date(transaction.createdAt) <= new Date(end)
      )
    } else if (status !== '' && payment_mode !== '') {
      filteredTransactions = await preTransactions.filter(
        transaction => transaction.status === status && transaction.payment_mode === payment_mode
      )
    } else if (payment_mode !== '' && startDate && endDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0) // Start of the day

      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      filteredTransactions = await preTransactions.filter(
        transaction =>
          transaction.payment_mode === payment_mode &&
          new Date(transaction.createdAt) >= new Date(start) &&
          new Date(transaction.createdAt) <= new Date(end)
      )
    } else if (status !== '' && startDate && endDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0) // Start of the day

      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      filteredTransactions = await preTransactions.filter(
        transaction =>
          transaction.status === status &&
          new Date(transaction.createdAt) >= new Date(start) &&
          new Date(transaction.createdAt) <= new Date(end)
      )
    } else if (status !== '') {
      filteredTransactions = await preTransactions.filter(transaction => transaction.status === status)
    } else if (payment_mode !== '') {
      filteredTransactions = await preTransactions.filter(transaction => transaction.payment_mode === payment_mode)
    } else if (startDate && endDate) {
      // Set the start of the day for startDate and the end of the day for endDate
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0) // Start of the day

      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999) // End of the day

      filteredTransactions = preTransactions.filter(
        transaction => new Date(transaction.createdAt) >= start && new Date(transaction.createdAt) <= end
      )
    }

    setTransactions(filteredTransactions)
    onClose()
  }

  const ExampleCustomInput = React.forwardRef(({ label, value, onClick, onClear, values }, ref) => (
    <TextField
      onClick={onClick}
      value={value}
      label={label}
      autoComplete='off'
      InputProps={{
        endAdornment: (
          <>
            <IconButton
              edge='end'
              size='small'
              onClick={onClick}
              sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              <ArrowDropDownIcon />
            </IconButton>
            {value && (
              <IconButton
                edge='end'
                size='small'
                onClick={onClear} // Clears the field
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                <ClearIcon />
              </IconButton>
            )}
          </>
        )
      }}
      fullWidth
      inputProps={{
        style: { cursor: 'pointer', userSelect: 'none' }
      }}
      ref={ref}
    />
  ))

  return (
    <Modal open={open} onClose={onClose} disableScrollLock>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 }, // Responsive width for small devices
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow: 'auto' // Ensures the content fits on small screens
        }}
      >
        <Typography variant='h6' mb={2} sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Filter Transactions
        </Typography>

        <Formik
          enableReinitialize
          initialValues={{
            status: status,
            payment_mode: paymentMode,
            startDate: startDate,
            endDate: endDate
          }}
          onSubmit={handleFilter}
        >
          {({ values, handleChange, isSubmitting, resetForm, setFieldValue }) => (
            <Form>
              {/* Status Selection */}
              <FormControl fullWidth margin='normal'>
                <InputLabel>Status</InputLabel>
                <Select
                  name='status'
                  value={values.status}
                  onChange={handleChange}
                  label='Status'
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: '200px'
                      }
                    }
                  }}
                  endAdornment={
                    values.status && (
                      <IconButton edge='end' size='small' onClick={() => setFieldValue('status', '')}>
                        <ClearIcon />
                      </IconButton>
                    )
                  }
                >
                  <MenuItem value='captured'>Success</MenuItem>
                  <MenuItem value='failed'>Failed</MenuItem>
                </Select>
              </FormControl>

              {/* Payment Method Selection */}
              <FormControl fullWidth margin='normal'>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name='payment_mode'
                  value={values.payment_mode}
                  onChange={handleChange}
                  label='Payment Method'
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: '200px'
                      }
                    }
                  }}
                  endAdornment={
                    values.payment_mode && (
                      <IconButton edge='end' size='small' onClick={() => setFieldValue('payment_mode', '')}>
                        <ClearIcon />
                      </IconButton>
                    )
                  }
                >
                  <MenuItem value='card'>Card</MenuItem>
                  <MenuItem value='netbanking'>Net Banking</MenuItem>
                  <MenuItem value='wallet'>Wallet</MenuItem>
                  <MenuItem value='upi'>UPI</MenuItem>
                </Select>
              </FormControl>

              {/* Date Range Picker */}
              <FormControl fullWidth margin='normal'>
                <div
                  style={{
                    position: 'relative',
                    marginTop: '16px', // Default margin-top for small screens
                    '@media (min-width:600px)': { marginTop: '0px' } // Adjust for larger screens
                  }}
                >
                  <DatePicker
                    selected={values.startDate}
                    onChange={dates => onDateChange(dates, setFieldValue)} // Passing setFieldValue
                    startDate={values.startDate}
                    endDate={values.endDate}
                    maxDate={new Date()}
                    selectsRange
                    dateFormat='dd-MM-yyyy'
                    customInput={
                      <ExampleCustomInput
                        label='Date Range'
                        onClear={() => {
                          setFieldValue('startDate', null)
                          setFieldValue('endDate', null)
                        }}
                        values={values}
                      />
                    }
                  />
                </div>
              </FormControl>

              {/* Action Buttons */}
              <Box display='flex' justifyContent='flex-end' mt={3} gap={2}>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<SaveIcon />}
                  type='submit'
                  disabled={isSubmitting || loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Apply'}
                </Button>
                <Button
                  variant='contained'
                  color='warning'
                  startIcon={<ClearIcon />}
                  onClick={() => {
                    setTransactions(preTransactions)
                    setStatus('')
                    setPaymentMode('')
                    setEndDate(null)
                    setStartDate(null)
                    setFieldValue('status', '')
                    setFieldValue('payment_mode', '')
                    setFieldValue('startDate', null)
                    setFieldValue('endDate', null)
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  )
}

export default FilterTransactionDialog