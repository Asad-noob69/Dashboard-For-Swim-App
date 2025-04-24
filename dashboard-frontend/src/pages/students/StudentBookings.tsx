import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  InputAdornment,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

// Mock data for student bookings
const bookingsData = [
  {
    id: 'b1',
    studentId: 's1',
    studentName: 'Ahmed Khan',
    studentPhoto: 'https://randomuser.me/api/portraits/boys/1.jpg',
    classId: 'c1',
    className: 'Learn to Swim',
    instructor: 'Asad Khan',
    schedule: [
      {
        day: 'Monday',
        startTime: '16:00',
        endTime: '17:00',
        pool: 'Main Pool',
      },
      {
        day: 'Wednesday',
        startTime: '16:00',
        endTime: '17:00',
        pool: 'Main Pool',
      },
    ],
    startDate: '2025-03-01',
    endDate: '2025-05-30',
    paymentStatus: 'paid',
    bookingDate: '2025-02-20',
    status: 'active',
    fee: 15000,
    currency: 'PKR',
  },
  {
    id: 'b2',
    studentId: 's2',
    studentName: 'Sara Ali',
    studentPhoto: 'https://randomuser.me/api/portraits/girls/1.jpg',
    classId: 'c1',
    className: 'Learn to Swim',
    instructor: 'Asad Khan',
    schedule: [
      {
        day: 'Monday',
        startTime: '16:00',
        endTime: '17:00',
        pool: 'Main Pool',
      },
      {
        day: 'Wednesday',
        startTime: '16:00',
        endTime: '17:00',
        pool: 'Main Pool',
      },
    ],
    startDate: '2025-03-01',
    endDate: '2025-05-30',
    paymentStatus: 'pending',
    bookingDate: '2025-02-21',
    status: 'active',
    fee: 15000,
    currency: 'PKR',
  },
  {
    id: 'b3',
    studentId: 's3',
    studentName: 'Imran Ahmed',
    studentPhoto: 'https://randomuser.me/api/portraits/boys/2.jpg',
    classId: 'c2',
    className: 'Intermediate Swim',
    instructor: 'Sara Ahmed',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '17:00',
        endTime: '18:00',
        pool: 'Main Pool',
      },
      {
        day: 'Thursday',
        startTime: '17:00',
        endTime: '18:00',
        pool: 'Main Pool',
      },
    ],
    startDate: '2025-02-01',
    endDate: '2025-04-30',
    paymentStatus: 'paid',
    bookingDate: '2025-01-15',
    status: 'active',
    fee: 18000,
    currency: 'PKR',
  },
  {
    id: 'b4',
    studentId: 's4',
    studentName: 'Aisha Malik',
    studentPhoto: 'https://randomuser.me/api/portraits/girls/2.jpg',
    classId: 'c5',
    className: 'Competitive Training',
    instructor: 'Kamran Ali',
    schedule: [
      {
        day: 'Monday',
        startTime: '17:00',
        endTime: '18:30',
        pool: 'Olympic Pool',
      },
      {
        day: 'Wednesday',
        startTime: '17:00',
        endTime: '18:30',
        pool: 'Olympic Pool',
      },
      {
        day: 'Friday',
        startTime: '17:00',
        endTime: '18:30',
        pool: 'Olympic Pool',
      },
    ],
    startDate: '2025-01-10',
    endDate: '2025-06-30',
    paymentStatus: 'paid',
    bookingDate: '2025-01-05',
    status: 'active',
    fee: 25000,
    currency: 'PKR',
  },
  {
    id: 'b5',
    studentId: 's5',
    studentName: 'Bilal Hassan',
    studentPhoto: 'https://randomuser.me/api/portraits/boys/3.jpg',
    classId: 'c3',
    className: 'Water Safety',
    instructor: 'Asad Khan',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '16:00',
        endTime: '17:00',
        pool: 'Training Pool',
      },
      {
        day: 'Thursday',
        startTime: '16:00',
        endTime: '17:00',
        pool: 'Training Pool',
      },
    ],
    startDate: '2025-03-15',
    endDate: '2025-05-15',
    paymentStatus: 'partial',
    bookingDate: '2025-03-01',
    status: 'active',
    fee: 12000,
    currency: 'PKR',
  },
  {
    id: 'b6',
    studentId: 's6',
    studentName: 'Fatima Shah',
    studentPhoto: 'https://randomuser.me/api/portraits/girls/3.jpg',
    classId: 'c2',
    className: 'Intermediate Swim',
    instructor: 'Sara Ahmed',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '17:00',
        endTime: '18:00',
        pool: 'Main Pool',
      },
      {
        day: 'Thursday',
        startTime: '17:00',
        endTime: '18:00',
        pool: 'Main Pool',
      },
    ],
    startDate: '2025-01-15',
    endDate: '2025-04-15',
    paymentStatus: 'paid',
    bookingDate: '2025-01-05',
    status: 'cancelled',
    fee: 18000,
    currency: 'PKR',
  },
];

// Mock data for classes
const classesData = [
  {
    id: 'c1',
    name: 'Learn to Swim',
    instructor: 'Asad Khan',
    availableSpots: 2,
  },
  {
    id: 'c2',
    name: 'Intermediate Swim',
    instructor: 'Sara Ahmed',
    availableSpots: 0,
  },
  {
    id: 'c3',
    name: 'Water Safety',
    instructor: 'Asad Khan',
    availableSpots: 4,
  },
  {
    id: 'c4',
    name: 'Advanced Techniques',
    instructor: 'Kamran Ali',
    availableSpots: 3,
  },
  {
    id: 'c5',
    name: 'Competitive Training',
    instructor: 'Kamran Ali',
    availableSpots: 0,
  },
];

const StudentBookings = () => {
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for filtering
  const [filters, setFilters] = useState({
    search: '',
    className: '',
    paymentStatus: '',
    bookingStatus: '',
    dateRange: {
      startDate: null as Date | null,
      endDate: null as Date | null,
    },
  });
  const [showFilters, setShowFilters] = useState(false);

  // State for booking dialog
  const [bookingDialog, setBookingDialog] = useState({
    open: false,
    student: null as any,
  });

  // Handle filter change
  const handleFilterChange = (field: string, value: any) => {
    if (field === 'dateRange') {
      setFilters((prev) => ({
        ...prev,
        dateRange: { ...prev.dateRange, ...value },
      }));
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
    setPage(0); // Reset to first page when filter changes
  };

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Handle opening booking dialog
  const handleOpenBookingDialog = () => {
    setBookingDialog({
      open: true,
      student: null,
    });
  };

  // Handle closing booking dialog
  const handleCloseBookingDialog = () => {
    setBookingDialog({
      open: false,
      student: null,
    });
  };

  // Get color for payment status
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'partial':
        return 'info';
      default:
        return 'default';
    }
  };

  // Get color for booking status
  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  // Format schedule
  const formatSchedule = (schedule: any[]) => {
    return schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ');
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  // Apply filters to bookings data
  const filteredBookings = bookingsData.filter((booking) => {
    // Text search
    if (
      filters.search &&
      !booking.studentName.toLowerCase().includes(filters.search.toLowerCase()) &&
      !booking.className.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Class filter
    if (filters.className && booking.classId !== filters.className) {
      return false;
    }

    // Payment status filter
    if (filters.paymentStatus && booking.paymentStatus !== filters.paymentStatus) {
      return false;
    }

    // Booking status filter
    if (filters.bookingStatus && booking.status !== filters.bookingStatus) {
      return false;
    }

    // Date range filter - start date
    if (filters.dateRange.startDate) {
      const bookingDate = new Date(booking.startDate);
      if (bookingDate < filters.dateRange.startDate) {
        return false;
      }
    }

    // Date range filter - end date
    if (filters.dateRange.endDate) {
      const bookingDate = new Date(booking.endDate);
      if (bookingDate > filters.dateRange.endDate) {
        return false;
      }
    }

    return true;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Student Bookings</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenBookingDialog}
        >
          New Booking
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by student name or class name..."
                variant="outlined"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </Grid>

            {showFilters && (
              <>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="class-filter-label">Class</InputLabel>
                    <Select
                      labelId="class-filter-label"
                      id="class-filter"
                      value={filters.className}
                      label="Class"
                      onChange={(e) => handleFilterChange('className', e.target.value)}
                    >
                      <MenuItem value="">All Classes</MenuItem>
                      {classesData.map((cls) => (
                        <MenuItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="payment-status-filter-label">Payment Status</InputLabel>
                    <Select
                      labelId="payment-status-filter-label"
                      id="payment-status-filter"
                      value={filters.paymentStatus}
                      label="Payment Status"
                      onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="partial">Partial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="booking-status-filter-label">Booking Status</InputLabel>
                    <Select
                      labelId="booking-status-filter-label"
                      id="booking-status-filter"
                      value={filters.bookingStatus}
                      label="Booking Status"
                      onChange={(e) => handleFilterChange('bookingStatus', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={filters.dateRange.startDate}
                      onChange={(date) => handleFilterChange('dateRange', { startDate: date })}
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={filters.dateRange.endDate}
                      onChange={(date) => handleFilterChange('dateRange', { endDate: date })}
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      setFilters({
                        search: '',
                        className: '',
                        paymentStatus: '',
                        bookingStatus: '',
                        dateRange: {
                          startDate: null,
                          endDate: null,
                        },
                      });
                    }}
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="bookings table">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No bookings found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={booking.studentPhoto}
                          alt={booking.studentName}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body2">{booking.studentName}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            ID: {booking.studentId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{booking.className}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        Instructor: {booking.instructor}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatSchedule(booking.schedule)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Booked: {formatDate(booking.bookingDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatCurrency(booking.fee, booking.currency)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        color={getPaymentStatusColor(booking.paymentStatus) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        color={getBookingStatusColor(booking.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Booking">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {booking.status === 'active' && (
                          <Tooltip title="Cancel Booking">
                            <IconButton size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredBookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* New Booking Dialog */}
      <Dialog open={bookingDialog.open} onClose={handleCloseBookingDialog} maxWidth="md" fullWidth>
        <DialogTitle>New Class Booking</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Student Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="student-select-label">Select Student</InputLabel>
                <Select
                  labelId="student-select-label"
                  id="student-select"
                  label="Select Student"
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    <em>Select a student</em>
                  </MenuItem>
                  {bookingsData.map((booking) => (
                    <MenuItem key={booking.studentId} value={booking.studentId}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={booking.studentPhoto}
                          alt={booking.studentName}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography>{booking.studentName}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                fullWidth
                component={Link}
                to="/students/all?action=add"
              >
                Register New Student
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Class Information</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="class-select-label">Select Class</InputLabel>
                <Select
                  labelId="class-select-label"
                  id="class-select"
                  label="Select Class"
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    <em>Select a class</em>
                  </MenuItem>
                  {classesData.map((cls) => (
                    <MenuItem 
                      key={cls.id} 
                      value={cls.id}
                      disabled={cls.availableSpots === 0}
                    >
                      {cls.name} - {cls.instructor}
                      {cls.availableSpots === 0 ? (
                        <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                          (Full)
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                          ({cls.availableSpots} spots available)
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Booking Period</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Payment Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fee"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">PKR</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="payment-status-label">Payment Status</InputLabel>
                <Select
                  labelId="payment-status-label"
                  id="payment-status"
                  label="Payment Status"
                  defaultValue="pending"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="partial">Partial Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                placeholder="Any special requests or notes for this booking"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingDialog}>Cancel</Button>
          <Button variant="contained" color="primary">
            Create Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentBookings;