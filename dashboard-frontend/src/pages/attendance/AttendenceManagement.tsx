import { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tab,
  Tabs,
  InputAdornment,
  Tooltip,
  Stack,
  Divider,
  Avatar,
  FormControlLabel,
  Switch,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TimerIcon from '@mui/icons-material/Timer';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import SaveIcon from '@mui/icons-material/Save';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Mock data for attendance records
const attendanceData = [
  {
    id: 'a1',
    classId: 'c1',
    className: 'Learn to Swim',
    date: '2025-04-23',
    instructor: {
      id: 'i1',
      name: 'Asad Khan',
      photo: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    students: [
      {
        id: 1,
        name: 'Ahmed Khan',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'present',
        arrivalTime: '16:00',
        departureTime: '17:00',
      },
      {
        id: 2,
        name: 'Sara Ali',
        photo: 'https://randomuser.me/api/portraits/women/33.jpg',
        status: 'present',
        arrivalTime: '16:02',
        departureTime: '17:00',
      },
      {
        id: 4,
        name: 'Sana Khan',
        photo: 'https://randomuser.me/api/portraits/women/35.jpg',
        status: 'absent',
        reason: 'Medical appointment',
      },
    ],
    stats: {
      total: 3,
      present: 2,
      absent: 1,
      late: 0,
      excused: 0,
      presentPercentage: 67,
      absentPercentage: 33,
    },
  },
  {
    id: 'a2',
    classId: 'c2',
    className: 'Intermediate Swim',
    date: '2025-04-23',
    instructor: {
      id: 'i2',
      name: 'Sara Ahmed',
      photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    students: [
      {
        id: 2,
        name: 'Sara Ali',
        photo: 'https://randomuser.me/api/portraits/women/33.jpg',
        status: 'present',
        arrivalTime: '17:00',
        departureTime: '18:00',
      },
      {
        id: 3,
        name: 'Imran Ahmed',
        photo: 'https://randomuser.me/api/portraits/men/34.jpg',
        status: 'late',
        arrivalTime: '17:15',
        departureTime: '18:00',
        reason: 'Traffic',
      },
    ],
    stats: {
      total: 2,
      present: 1,
      absent: 0,
      late: 1,
      excused: 0,
      presentPercentage: 50,
      latePercentage: 50,
    },
  },
  {
    id: 'a3',
    classId: 'c3',
    className: 'Water Safety',
    date: '2025-04-22',
    instructor: {
      id: 'i1',
      name: 'Asad Khan',
      photo: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    students: [
      {
        id: 1,
        name: 'Ahmed Khan',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'present',
        arrivalTime: '10:00',
        departureTime: '11:30',
      },
      {
        id: 2,
        name: 'Sara Ali',
        photo: 'https://randomuser.me/api/portraits/women/33.jpg',
        status: 'present',
        arrivalTime: '10:05',
        departureTime: '11:30',
      },
      {
        id: 4,
        name: 'Sana Khan',
        photo: 'https://randomuser.me/api/portraits/women/35.jpg',
        status: 'excused',
        reason: 'Family emergency',
      },
    ],
    stats: {
      total: 3,
      present: 2,
      absent: 0,
      late: 0,
      excused: 1,
      presentPercentage: 67,
      excusedPercentage: 33,
    },
  },
  {
    id: 'a4',
    classId: 'c4',
    className: 'Advanced Techniques',
    date: '2025-04-22',
    instructor: {
      id: 'i3',
      name: 'Kamran Ali',
      photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    students: [
      {
        id: 3,
        name: 'Imran Ahmed',
        photo: 'https://randomuser.me/api/portraits/men/34.jpg',
        status: 'present',
        arrivalTime: '18:00',
        departureTime: '19:30',
      },
    ],
    stats: {
      total: 1,
      present: 1,
      absent: 0,
      late: 0,
      excused: 0,
      presentPercentage: 100,
    },
  },
  {
    id: 'a5',
    classId: 'c5',
    className: 'Competitive Training',
    date: '2025-04-22',
    instructor: {
      id: 'i3',
      name: 'Kamran Ali',
      photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    students: [
      {
        id: 3,
        name: 'Imran Ahmed',
        photo: 'https://randomuser.me/api/portraits/men/34.jpg',
        status: 'present',
        arrivalTime: '06:00',
        departureTime: '07:30',
      },
      {
        id: 5,
        name: 'Bilal Hassan',
        photo: 'https://randomuser.me/api/portraits/men/36.jpg',
        status: 'present',
        arrivalTime: '06:00',
        departureTime: '07:30',
      },
    ],
    stats: {
      total: 2,
      present: 2,
      absent: 0,
      late: 0,
      excused: 0,
      presentPercentage: 100,
    },
  },
];

// Interface for attendance record type
interface AttendanceRecord {
  id: string;
  classId: string;
  className: string;
  date: string;
  instructor: {
    id: string;
    name: string;
    photo: string;
  };
  students: {
    id: number;
    name: string;
    photo: string;
    status: string;
    arrivalTime?: string;
    departureTime?: string;
    reason?: string;
  }[];
  stats: {
    total: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    presentPercentage: number;
    absentPercentage?: number;
    latePercentage?: number;
    excusedPercentage?: number;
  };
}

// Interface for attendance filter
interface AttendanceFilter {
  search: string;
  classId: string;
  date: string;
  instructorId: string;
}

// Interface for student attendance status
interface StudentAttendance {
  id: number;
  name: string;
  photo: string;
  status: string;
  arrivalTime?: string;
  departureTime?: string;
  reason?: string;
}

const AttendanceManagement = () => {
  // State for attendance data with pagination
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for filtering
  const [filters, setFilters] = useState<AttendanceFilter>({
    search: '',
    classId: '',
    date: '',
    instructorId: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // State for tab management
  const [tabValue, setTabValue] = useState(0);

  // State for attendance dialog
  const [attendanceDialog, setAttendanceDialog] = useState({
    open: false,
    mode: 'view' as 'view' | 'add' | 'edit',
    record: null as AttendanceRecord | null,
  });

  // State for delete confirmation
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    open: false,
    recordId: '',
  });

  // State for selected date in date picker
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Load attendance records on component mount
  useEffect(() => {
    // Simulate API fetch with some delay
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setAttendanceRecords(attendanceData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch attendance records:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters to attendance data
  const filteredRecords = attendanceRecords.filter((record) => {
    // Text search
    if (
      filters.search &&
      !record.className.toLowerCase().includes(filters.search.toLowerCase()) &&
      !record.instructor.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Class filter
    if (filters.classId && record.classId !== filters.classId) {
      return false;
    }

    // Date filter
    if (filters.date && record.date !== filters.date) {
      return false;
    }

    // Instructor filter
    if (filters.instructorId && record.instructor.id !== filters.instructorId) {
      return false;
    }

    return true;
  });

  // Filter data based on active tab
  const tabFilteredRecords = filteredRecords.filter((record) => {
    const today = new Date().toISOString().split('T')[0];
    switch (tabValue) {
      case 0: // All
        return true;
      case 1: // Today
        return record.date === today;
      case 2: // Yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        return record.date === yesterdayStr;
      case 3: // This Week
        const thisWeekStart = new Date();
        thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
        return new Date(record.date) >= thisWeekStart;
      default:
        return true;
    }
  });

  // Handle filter change
  const handleFilterChange = (field: keyof AttendanceFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle attendance dialog open
  const handleOpenAttendanceDialog = (mode: 'view' | 'add' | 'edit', record?: AttendanceRecord) => {
    setAttendanceDialog({
      open: true,
      mode,
      record: record || null,
    });
  };

  // Handle attendance dialog close
  const handleCloseAttendanceDialog = () => {
    setAttendanceDialog({
      open: false,
      mode: 'view',
      record: null,
    });
  };

  // Handle delete confirmation dialog open
  const handleOpenDeleteConfirm = (recordId: string) => {
    setDeleteConfirmDialog({
      open: true,
      recordId,
    });
  };

  // Handle delete confirmation dialog close
  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmDialog({
      open: false,
      recordId: '',
    });
  };

  // Handle delete attendance record
  const handleDeleteRecord = () => {
    // Filter out the deleted record
    const updatedRecords = attendanceRecords.filter(
      (r) => r.id !== deleteConfirmDialog.recordId
    );
    setAttendanceRecords(updatedRecords);
    handleCloseDeleteConfirm();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get color for attendance status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'late':
        return 'warning';
      case 'excused':
        return 'info';
      default:
        return 'default';
    }
  };

  // Get icon for attendance status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon fontSize="small" />;
      case 'absent':
        return <CancelIcon fontSize="small" />;
      case 'late':
        return <TimerIcon fontSize="small" />;
      case 'excused':
        return <AssignmentLateIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // Get unique classes from data
  const classes = Array.from(
    new Set(attendanceRecords.map((record) => record.classId))
  ).map((id) => {
    const classInfo = attendanceRecords.find((record) => record.classId === id);
    return { id, name: classInfo?.className || '' };
  });

  // Get unique instructors from data
  const instructors = Array.from(
    new Set(attendanceRecords.map((record) => record.instructor.id))
  ).map((id) => {
    const instructor = attendanceRecords.find((record) => record.instructor.id === id)?.instructor;
    return { id, name: instructor?.name || '' };
  });

  // Get unique dates from data
  const dates = Array.from(new Set(attendanceRecords.map((record) => record.date))).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Attendance Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenAttendanceDialog('add')}
        >
          Take Attendance
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="attendance tabs">
          <Tab label="All Records" />
          <Tab label="Today" />
          <Tab label="Yesterday" />
          <Tab label="This Week" />
        </Tabs>
      </Box>

      {/* Date Selector */}
      <Box sx={{ mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Go to Date"
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(newDate);
              if (newDate) {
                const dateStr = newDate.toISOString().split('T')[0];
                handleFilterChange('date', dateStr);
              }
            }}
            slotProps={{ textField: { size: 'small', fullWidth: false, sx: { width: 200 } } }}
          />
        </LocalizationProvider>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by class name or instructor..."
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
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="class-filter-label">Class</InputLabel>
                    <Select
                      labelId="class-filter-label"
                      id="class-filter"
                      value={filters.classId}
                      label="Class"
                      onChange={(e) => handleFilterChange('classId', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {classes.map((cls) => (
                        <MenuItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="instructor-filter-label">Instructor</InputLabel>
                    <Select
                      labelId="instructor-filter-label"
                      id="instructor-filter"
                      value={filters.instructorId}
                      label="Instructor"
                      onChange={(e) => handleFilterChange('instructorId', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {instructors.map((instructor) => (
                        <MenuItem key={instructor.id} value={instructor.id}>
                          {instructor.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      setFilters({
                        search: '',
                        classId: '',
                        date: '',
                        instructorId: '',
                      });
                      setSelectedDate(new Date());
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

      {/* Attendance Records Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance records table">
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Attendance Stats</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading attendance data...
                </TableCell>
              </TableRow>
            ) : tabFilteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No attendance records found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              tabFilteredRecords
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => (
                  <TableRow
                    key={record.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body1">{record.className}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EventIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{formatDate(record.date)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={record.instructor.photo}
                          alt={record.instructor.name}
                          sx={{ mr: 1, width: 32, height: 32 }}
                        />
                        <Typography variant="body2">{record.instructor.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        <Badge
                          badgeContent={record.stats.present}
                          color="success"
                          sx={{ mr: 1 }}
                          max={99}
                        >
                          <CheckCircleIcon color="action" />
                        </Badge>
                        <Badge
                          badgeContent={record.stats.absent}
                          color="error"
                          sx={{ mr: 1 }}
                          max={99}
                        >
                          <CancelIcon color="action" />
                        </Badge>
                        <Badge
                          badgeContent={record.stats.late}
                          color="warning"
                          sx={{ mr: 1 }}
                          max={99}
                        >
                          <TimerIcon color="action" />
                        </Badge>
                        <Badge
                          badgeContent={record.stats.excused}
                          color="info"
                          sx={{ mr: 1 }}
                          max={99}
                        >
                          <AssignmentLateIcon color="action" />
                        </Badge>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 100 }}>
                        <Typography variant="body2" color="success.main">
                          {record.stats.presentPercentage}% Present
                        </Typography>
                        {record.stats.absentPercentage && record.stats.absentPercentage > 0 && (
                          <Typography variant="body2" color="error.main">
                            {record.stats.absentPercentage}% Absent
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenAttendanceDialog('view', record)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenAttendanceDialog('edit', record)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenDeleteConfirm(record.id)}
                          >
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
          count={tabFilteredRecords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Attendance Details Dialog */}
      {attendanceDialog.open && attendanceDialog.record && (
        <Dialog
          open={attendanceDialog.open}
          onClose={handleCloseAttendanceDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {attendanceDialog.mode === 'view'
              ? 'Attendance Details'
              : attendanceDialog.mode === 'add'
              ? 'Take Attendance'
              : 'Edit Attendance'}
          </DialogTitle>
          <DialogContent dividers>
            <AttendanceForm record={attendanceDialog.record} mode={attendanceDialog.mode} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAttendanceDialog}>
              {attendanceDialog.mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {attendanceDialog.mode !== 'view' && (
              <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                Save
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialog.open}
        onClose={handleCloseDeleteConfirm}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this attendance record? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDeleteRecord} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Attendance Form Component
interface AttendanceFormProps {
  record: AttendanceRecord;
  mode: 'view' | 'add' | 'edit';
}

const AttendanceForm = ({ record, mode }: AttendanceFormProps) => {
  const isViewMode = mode === 'view';
  const [formData, setFormData] = useState<AttendanceRecord>(record);
  const [studentsAttendance, setStudentsAttendance] = useState<StudentAttendance[]>(record.students);

  // Handle form field change
  const handleChange = (field: keyof AttendanceRecord, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle student status change
  const handleStatusChange = (studentId: number, status: string) => {
    const newStudentsAttendance = studentsAttendance.map((student) =>
      student.id === studentId ? { ...student, status } : student
    );
    setStudentsAttendance(newStudentsAttendance);
    
    // Update stats
    const total = newStudentsAttendance.length;
    const present = newStudentsAttendance.filter(s => s.status === 'present').length;
    const absent = newStudentsAttendance.filter(s => s.status === 'absent').length;
    const late = newStudentsAttendance.filter(s => s.status === 'late').length;
    const excused = newStudentsAttendance.filter(s => s.status === 'excused').length;
    
    const stats = {
      total,
      present,
      absent,
      late,
      excused,
      presentPercentage: total > 0 ? Math.round((present / total) * 100) : 0,
      absentPercentage: total > 0 ? Math.round((absent / total) * 100) : 0,
      latePercentage: total > 0 ? Math.round((late / total) * 100) : 0,
      excusedPercentage: total > 0 ? Math.round((excused / total) * 100) : 0,
    };
    
    handleChange('stats', stats);
  };

  // Handle arrival time change
  const handleTimeChange = (studentId: number, field: 'arrivalTime' | 'departureTime', value: string) => {
    const newStudentsAttendance = studentsAttendance.map((student) =>
      student.id === studentId ? { ...student, [field]: value } : student
    );
    setStudentsAttendance(newStudentsAttendance);
  };

  // Handle reason change
  const handleReasonChange = (studentId: number, reason: string) => {
    const newStudentsAttendance = studentsAttendance.map((student) =>
      student.id === studentId ? { ...student, reason } : student
    );
    setStudentsAttendance(newStudentsAttendance);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Class Information */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Class Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Class Name"
            value={formData.className}
            InputProps={{ readOnly: true }}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={isViewMode}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Instructor"
            value={formData.instructor.name}
            InputProps={{ readOnly: true }}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2">
            Total Students: {formData.stats.total} | Present: {formData.stats.present} (
            {formData.stats.presentPercentage}%)
          </Typography>
        </Grid>

        {/* Students Attendance */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Student Attendance
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Arrival Time</TableCell>
                  <TableCell>Departure Time</TableCell>
                  <TableCell>Reason/Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsAttendance.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={student.photo} alt={student.name} sx={{ mr: 1, width: 32, height: 32 }} />
                        <Typography variant="body2">{student.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {isViewMode ? (
                        <Chip
                          icon={getStatusIcon(student.status)}
                          label={student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          color={getStatusColor(student.status) as any}
                          size="small"
                        />
                      ) : (
                        <FormControl fullWidth size="small">
                          <Select
                            value={student.status}
                            onChange={(e) => handleStatusChange(student.id, e.target.value)}
                          >
                            <MenuItem value="present">Present</MenuItem>
                            <MenuItem value="absent">Absent</MenuItem>
                            <MenuItem value="late">Late</MenuItem>
                            <MenuItem value="excused">Excused</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.status === 'present' || student.status === 'late' ? (
                        <TextField
                          type="time"
                          value={student.arrivalTime || ''}
                          onChange={(e) =>
                            handleTimeChange(student.id, 'arrivalTime', e.target.value)
                          }
                          size="small"
                          disabled={isViewMode}
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {student.status === 'present' || student.status === 'late' ? (
                        <TextField
                          type="time"
                          value={student.departureTime || ''}
                          onChange={(e) =>
                            handleTimeChange(student.id, 'departureTime', e.target.value)
                          }
                          size="small"
                          disabled={isViewMode}
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {student.status === 'absent' || student.status === 'excused' || student.status === 'late' ? (
                        <TextField
                          placeholder="Reason"
                          value={student.reason || ''}
                          onChange={(e) => handleReasonChange(student.id, e.target.value)}
                          size="small"
                          fullWidth
                          disabled={isViewMode}
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceManagement;