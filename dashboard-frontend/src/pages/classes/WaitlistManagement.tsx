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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

// Mock data for waitlisted students
const waitlistData = [
  {
    id: 'w1',
    classId: 'c1',
    className: 'Learn to Swim',
    student: {
      id: 's1',
      name: 'Ahmed Khan',
      age: 7,
      photo: 'https://randomuser.me/api/portraits/boys/1.jpg',
    },
    parent: {
      id: 'p1',
      name: 'Farooq Khan',
      phone: '+92 300 1234567',
      email: 'farooq@example.com',
    },
    joinedDate: '2025-04-01T10:30:00',
    priority: 1,
    status: 'waiting',
    notes: 'Eager to join the class',
  },
  {
    id: 'w2',
    classId: 'c1',
    className: 'Learn to Swim',
    student: {
      id: 's2',
      name: 'Sara Ali',
      age: 6,
      photo: 'https://randomuser.me/api/portraits/girls/1.jpg',
    },
    parent: {
      id: 'p2',
      name: 'Ali Hassan',
      phone: '+92 300 7654321',
      email: 'ali@example.com',
    },
    joinedDate: '2025-04-02T15:45:00',
    priority: 2,
    status: 'waiting',
    notes: 'Has prior experience with water activities',
  },
  {
    id: 'w3',
    classId: 'c2',
    className: 'Intermediate Swim',
    student: {
      id: 's3',
      name: 'Imran Ahmed',
      age: 10,
      photo: 'https://randomuser.me/api/portraits/boys/2.jpg',
    },
    parent: {
      id: 'p3',
      name: 'Ahmed Raza',
      phone: '+92 300 3456789',
      email: 'ahmed@example.com',
    },
    joinedDate: '2025-04-05T09:15:00',
    priority: 1,
    status: 'waiting',
    notes: '',
  },
  {
    id: 'w4',
    classId: 'c5',
    className: 'Competitive Training',
    student: {
      id: 's4',
      name: 'Aisha Malik',
      age: 15,
      photo: 'https://randomuser.me/api/portraits/girls/2.jpg',
    },
    parent: {
      id: 'p4',
      name: 'Malik Riaz',
      phone: '+92 300 9876543',
      email: 'malik@example.com',
    },
    joinedDate: '2025-04-10T14:00:00',
    priority: 1,
    status: 'notified',
    notes: 'Notified about upcoming spot',
  },
];

// Mock data for classes
const classesData = [
  {
    id: 'c1',
    name: 'Learn to Swim',
    instructor: 'Asad Khan',
    schedule: 'Mon, Wed 4:00 PM - 5:00 PM',
    capacity: 10,
    enrolled: 10,
    status: 'active',
  },
  {
    id: 'c2',
    name: 'Intermediate Swim',
    instructor: 'Sara Ahmed',
    schedule: 'Tue, Thu 5:00 PM - 6:00 PM',
    capacity: 8,
    enrolled: 8,
    status: 'active',
  },
  {
    id: 'c5',
    name: 'Competitive Training',
    instructor: 'Kamran Ali',
    schedule: 'Mon, Wed, Fri 5:00 PM - 6:30 PM',
    capacity: 8,
    enrolled: 8,
    status: 'active',
  },
];

const WaitlistManagement = () => {
  // State for data with pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for filtering
  const [filters, setFilters] = useState({
    search: '',
    classId: '',
    status: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // State for enrollment dialog
  const [enrollDialog, setEnrollDialog] = useState({
    open: false,
    waitlistEntry: null as any,
  });

  // State for notification dialog
  const [notifyDialog, setNotifyDialog] = useState({
    open: false,
    waitlistEntry: null as any,
  });

  // Handle filter change
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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

  // Handle open enrollment dialog
  const handleOpenEnrollDialog = (waitlistEntry: any) => {
    setEnrollDialog({
      open: true,
      waitlistEntry,
    });
  };

  // Handle close enrollment dialog
  const handleCloseEnrollDialog = () => {
    setEnrollDialog({
      open: false,
      waitlistEntry: null,
    });
  };

  // Handle open notification dialog
  const handleOpenNotifyDialog = (waitlistEntry: any) => {
    setNotifyDialog({
      open: true,
      waitlistEntry,
    });
  };

  // Handle close notification dialog
  const handleCloseNotifyDialog = () => {
    setNotifyDialog({
      open: false,
      waitlistEntry: null,
    });
  };

  // Apply filters to waitlist data
  const filteredWaitlist = waitlistData.filter((entry) => {
    // Text search
    if (
      filters.search &&
      !entry.student.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !entry.parent.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !entry.className.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Class filter
    if (filters.classId && entry.classId !== filters.classId) {
      return false;
    }

    // Status filter
    if (filters.status && entry.status !== filters.status) {
      return false;
    }

    return true;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Waitlist Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/students?action=add-to-waitlist"
        >
          Add to Waitlist
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by student name, parent name, or class..."
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
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="class-filter-label">Class</InputLabel>
                    <Select
                      labelId="class-filter-label"
                      id="class-filter"
                      value={filters.classId}
                      label="Class"
                      onChange={(e) => handleFilterChange('classId', e.target.value as string)}
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
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      id="status-filter"
                      value={filters.status}
                      label="Status"
                      onChange={(e) => handleFilterChange('status', e.target.value as string)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="waiting">Waiting</MenuItem>
                      <MenuItem value="notified">Notified</MenuItem>
                      <MenuItem value="enrolled">Enrolled</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Waitlist Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="waitlist table">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Parent Contact</TableCell>
              <TableCell>Joined Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWaitlist.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No waitlist entries found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredWaitlist
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={entry.student.photo}
                          alt={entry.student.name}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            mr: 2,
                          }}
                        />
                        <Box>
                          <Typography variant="body2">{entry.student.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Age: {entry.student.age}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{entry.className}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {classesData.find((cls) => cls.id === entry.classId)?.schedule}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{entry.parent.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {entry.parent.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(entry.joinedDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={`Priority ${entry.priority}`}
                        color={entry.priority === 1 ? 'error' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        color={
                          entry.status === 'waiting'
                            ? 'warning'
                            : entry.status === 'notified'
                            ? 'info'
                            : entry.status === 'enrolled'
                            ? 'success'
                            : 'default'
                        }
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
                        {entry.status === 'waiting' && (
                          <Tooltip title="Notify About Availability">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenNotifyDialog(entry)}
                            >
                              <ScheduleIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {(entry.status === 'waiting' || entry.status === 'notified') && (
                          <Tooltip title="Enroll">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenEnrollDialog(entry)}
                            >
                              <PersonAddIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Remove from Waitlist">
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
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
          count={filteredWaitlist.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Enrollment Dialog */}
      <Dialog open={enrollDialog.open} onClose={handleCloseEnrollDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Enroll Student from Waitlist</DialogTitle>
        <DialogContent>
          {enrollDialog.waitlistEntry && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to enroll{' '}
                <strong>{enrollDialog.waitlistEntry.student.name}</strong> from the waitlist
                into <strong>{enrollDialog.waitlistEntry.className}</strong> class?
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Student Details:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box
                    component="img"
                    src={enrollDialog.waitlistEntry.student.photo}
                    alt={enrollDialog.waitlistEntry.student.name}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="body2">
                      {enrollDialog.waitlistEntry.student.name}, Age:{' '}
                      {enrollDialog.waitlistEntry.student.age}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Parent: {enrollDialog.waitlistEntry.parent.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                Note: This will automatically update the class roster and notify the parent.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEnrollDialog}>Cancel</Button>
          <Button variant="contained" color="primary">
            Confirm Enrollment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Dialog */}
      <Dialog open={notifyDialog.open} onClose={handleCloseNotifyDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Notify Student about Availability</DialogTitle>
        <DialogContent>
          {notifyDialog.waitlistEntry && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Send notification to{' '}
                <strong>{notifyDialog.waitlistEntry.parent.name}</strong> about availability for{' '}
                <strong>{notifyDialog.waitlistEntry.student.name}</strong> in{' '}
                <strong>{notifyDialog.waitlistEntry.className}</strong> class?
              </Typography>

              <Typography variant="body2" sx={{ mb: 3 }}>
                This will change the student's waitlist status to "Notified" and send an
                email to {notifyDialog.waitlistEntry.parent.email}.
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notification Message"
                variant="outlined"
                defaultValue={`Dear ${notifyDialog.waitlistEntry.parent.name},\n\nWe're pleased to inform you that a spot has become available for ${notifyDialog.waitlistEntry.student.name} in the ${notifyDialog.waitlistEntry.className} class. Please reply to this email or call us within 48 hours to confirm enrollment.\n\nRegards,\nSwim Academy Team`}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotifyDialog}>Cancel</Button>
          <Button variant="contained" color="primary">
            Send Notification
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WaitlistManagement;