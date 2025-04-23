import React, { useState, useEffect } from 'react';
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
  Badge,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Mock data for swimming classes
const classesData = [
  {
    id: 'c1',
    name: 'Learn to Swim',
    description: 'Beginner swimming class for children aged 5-8 years',
    skillLevel: 'beginner',
    ageGroup: '5-8',
    capacity: 10,
    enrolled: 8,
    instructor: {
      id: 'i1',
      name: 'Asad Khan',
      photo: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
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
    fee: 15000,
    currency: 'PKR',
    duration: '8 weeks',
    startDate: '2025-05-03',
    endDate: '2025-06-28',
    status: 'active',
  },
  {
    id: 'c2',
    name: 'Intermediate Swim',
    description: 'Intermediate swimming techniques for children aged 9-12',
    skillLevel: 'intermediate',
    ageGroup: '9-12',
    capacity: 8,
    enrolled: 6,
    instructor: {
      id: 'i2',
      name: 'Sara Ahmed',
      photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
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
    fee: 18000,
    currency: 'PKR',
    duration: '12 weeks',
    startDate: '2025-05-05',
    endDate: '2025-07-25',
    status: 'active',
  },
  {
    id: 'c3',
    name: 'Water Safety',
    description: 'Essential water safety skills for all ages',
    skillLevel: 'beginner',
    ageGroup: '8-14',
    capacity: 12,
    enrolled: 9,
    instructor: {
      id: 'i1',
      name: 'Asad Khan',
      photo: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    schedule: [
      {
        day: 'Saturday',
        startTime: '10:00',
        endTime: '11:30',
        pool: 'Training Pool',
      },
    ],
    fee: 12000,
    currency: 'PKR',
    duration: '6 weeks',
    startDate: '2025-05-10',
    endDate: '2025-06-14',
    status: 'active',
  },
  {
    id: 'c4',
    name: 'Advanced Techniques',
    description: 'Advanced swimming techniques and stroke refinement',
    skillLevel: 'advanced',
    ageGroup: '12-16',
    capacity: 8,
    enrolled: 5,
    instructor: {
      id: 'i3',
      name: 'Kamran Ali',
      photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    schedule: [
      {
        day: 'Monday',
        startTime: '18:00',
        endTime: '19:30',
        pool: 'Olympic Pool',
      },
      {
        day: 'Friday',
        startTime: '18:00',
        endTime: '19:30',
        pool: 'Olympic Pool',
      },
    ],
    fee: 20000,
    currency: 'PKR',
    duration: '16 weeks',
    startDate: '2025-05-05',
    endDate: '2025-08-22',
    status: 'active',
  },
  {
    id: 'c5',
    name: 'Competitive Training',
    description: 'Training program for competitive swimmers',
    skillLevel: 'competitive',
    ageGroup: '14-18',
    capacity: 6,
    enrolled: 4,
    instructor: {
      id: 'i3',
      name: 'Kamran Ali',
      photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    schedule: [
      {
        day: 'Monday',
        startTime: '06:00',
        endTime: '07:30',
        pool: 'Olympic Pool',
      },
      {
        day: 'Wednesday',
        startTime: '06:00',
        endTime: '07:30',
        pool: 'Olympic Pool',
      },
      {
        day: 'Friday',
        startTime: '06:00',
        endTime: '07:30',
        pool: 'Olympic Pool',
      },
    ],
    fee: 25000,
    currency: 'PKR',
    duration: '24 weeks',
    startDate: '2025-05-05',
    endDate: '2025-10-24',
    status: 'active',
  },
  {
    id: 'c6',
    name: 'Adult Learn to Swim',
    description: 'Swimming basics for adults with no experience',
    skillLevel: 'beginner',
    ageGroup: '18+',
    capacity: 8,
    enrolled: 3,
    instructor: {
      id: 'i2',
      name: 'Sara Ahmed',
      photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    schedule: [
      {
        day: 'Tuesday',
        startTime: '19:00',
        endTime: '20:00',
        pool: 'Training Pool',
      },
      {
        day: 'Thursday',
        startTime: '19:00',
        endTime: '20:00',
        pool: 'Training Pool',
      },
    ],
    fee: 18000,
    currency: 'PKR',
    duration: '10 weeks',
    startDate: '2025-06-03',
    endDate: '2025-08-08',
    status: 'upcoming',
  },
  {
    id: 'c7',
    name: 'Parent-Child Swim',
    description: 'Swimming lessons for parents with toddlers (1-3 years)',
    skillLevel: 'beginner',
    ageGroup: '1-3',
    capacity: 8,
    enrolled: 0,
    instructor: {
      id: 'i4',
      name: 'Ayesha Malik',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    schedule: [
      {
        day: 'Saturday',
        startTime: '09:00',
        endTime: '10:00',
        pool: 'Kids Pool',
      },
    ],
    fee: 16000,
    currency: 'PKR',
    duration: '8 weeks',
    startDate: '2025-06-07',
    endDate: '2025-07-26',
    status: 'upcoming',
  },
  {
    id: 'c8',
    name: 'Summer Intensive',
    description: 'Intensive 2-week swimming program for quick learning',
    skillLevel: 'beginner',
    ageGroup: '6-12',
    capacity: 10,
    enrolled: 10,
    instructor: {
      id: 'i1',
      name: 'Asad Khan',
      photo: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    schedule: [
      {
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:30',
        pool: 'Main Pool',
      },
      {
        day: 'Tuesday',
        startTime: '09:00',
        endTime: '10:30',
        pool: 'Main Pool',
      },
      {
        day: 'Wednesday',
        startTime: '09:00',
        endTime: '10:30',
        pool: 'Main Pool',
      },
      {
        day: 'Thursday',
        startTime: '09:00',
        endTime: '10:30',
        pool: 'Main Pool',
      },
      {
        day: 'Friday',
        startTime: '09:00',
        endTime: '10:30',
        pool: 'Main Pool',
      },
    ],
    fee: 12000,
    currency: 'PKR',
    duration: '2 weeks',
    startDate: '2025-07-07',
    endDate: '2025-07-18',
    status: 'upcoming',
  },
  {
    id: 'c9',
    name: 'Senior Aquatics',
    description: 'Gentle exercise and swimming for seniors',
    skillLevel: 'beginner',
    ageGroup: '60+',
    capacity: 8,
    enrolled: 6,
    instructor: {
      id: 'i4',
      name: 'Ayesha Malik',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    schedule: [
      {
        day: 'Monday',
        startTime: '11:00',
        endTime: '12:00',
        pool: 'Training Pool',
      },
      {
        day: 'Wednesday',
        startTime: '11:00',
        endTime: '12:00',
        pool: 'Training Pool',
      },
      {
        day: 'Friday',
        startTime: '11:00',
        endTime: '12:00',
        pool: 'Training Pool',
      },
    ],
    fee: 15000,
    currency: 'PKR',
    duration: '12 weeks',
    startDate: '2025-04-08',
    endDate: '2025-06-27',
    status: 'completed',
  },
];

// Interface for swimming class data type
interface SwimClass {
  id: string;
  name: string;
  description: string;
  skillLevel: string;
  ageGroup: string;
  capacity: number;
  enrolled: number;
  instructor: {
    id: string;
    name: string;
    photo: string;
  };
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    pool: string;
  }[];
  fee: number;
  currency: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
}

// Interface for class filter
interface ClassFilter {
  search: string;
  status: string;
  skillLevel: string;
  ageGroup: string;
  instructor: string;
  day: string;
}

const ClassSchedule = () => {
  // State for classes data with pagination
  const [classes, setClasses] = useState<SwimClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for filtering
  const [filters, setFilters] = useState<ClassFilter>({
    search: '',
    status: '',
    skillLevel: '',
    ageGroup: '',
    instructor: '',
    day: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // State for class dialog
  const [classDialog, setClassDialog] = useState({
    open: false,
    mode: 'view' as 'view' | 'add' | 'edit',
    class: null as SwimClass | null,
  });

  // State for students dialog
  const [studentsDialog, setStudentsDialog] = useState({
    open: false,
    classId: '',
    className: '',
  });

  // State for delete confirmation
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    open: false,
    classId: '',
  });

  // State for tab management
  const [tabValue, setTabValue] = useState(0);

  // Load classes data on component mount
  useEffect(() => {
    // Simulate API fetch with some delay
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setClasses(classesData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters to class data
  const filteredClasses = classes.filter((cls) => {
    // Text search
    if (
      filters.search &&
      !cls.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !cls.description.toLowerCase().includes(filters.search.toLowerCase()) &&
      !cls.instructor.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (filters.status && cls.status !== filters.status) {
      return false;
    }

    // Skill level filter
    if (filters.skillLevel && cls.skillLevel !== filters.skillLevel) {
      return false;
    }

    // Age group filter
    if (filters.ageGroup && cls.ageGroup !== filters.ageGroup) {
      return false;
    }

    // Instructor filter
    if (filters.instructor && cls.instructor.id !== filters.instructor) {
      return false;
    }

    // Day filter
    if (filters.day && !cls.schedule.some(s => s.day === filters.day)) {
      return false;
    }

    return true;
  });

  // Filter data based on active tab
  const tabFilteredClasses = filteredClasses.filter((cls) => {
    switch (tabValue) {
      case 0: // All
        return true;
      case 1: // Active
        return cls.status === 'active';
      case 2: // Upcoming
        return cls.status === 'upcoming';
      case 3: // Completed/Cancelled
        return cls.status === 'completed' || cls.status === 'cancelled';
      default:
        return true;
    }
  });

  // Handle filter change
  const handleFilterChange = (field: keyof ClassFilter, value: string) => {
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

  // Handle class dialog open
  const handleOpenClassDialog = (mode: 'view' | 'add' | 'edit', cls?: SwimClass) => {
    setClassDialog({
      open: true,
      mode,
      class: cls || null,
    });
  };

  // Handle class dialog close
  const handleCloseClassDialog = () => {
    setClassDialog({
      open: false,
      mode: 'view',
      class: null,
    });
  };

  // Handle students dialog open
  const handleOpenStudentsDialog = (classId: string, className: string) => {
    setStudentsDialog({
      open: true,
      classId,
      className,
    });
  };

  // Handle students dialog close
  const handleCloseStudentsDialog = () => {
    setStudentsDialog({
      open: false,
      classId: '',
      className: '',
    });
  };

  // Handle delete confirmation dialog open
  const handleOpenDeleteConfirm = (classId: string) => {
    setDeleteConfirmDialog({
      open: true,
      classId,
    });
  };

  // Handle delete confirmation dialog close
  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmDialog({
      open: false,
      classId: '',
    });
  };

  // Handle delete class
  const handleDeleteClass = () => {
    // Filter out the deleted class
    const updatedClasses = classes.filter((c) => c.id !== deleteConfirmDialog.classId);
    setClasses(updatedClasses);
    handleCloseDeleteConfirm();
  };

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
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

  // Get color for class status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // Get color for skill level
  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'info';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'secondary';
      case 'competitive':
        return 'error';
      default:
        return 'default';
    }
  };

  // Get unique instructors from data
  const instructors = Array.from(
    new Set(classes.map((cls) => cls.instructor.id))
  ).map((id) => {
    const instructor = classes.find((cls) => cls.instructor.id === id)?.instructor;
    return { id, name: instructor?.name || '' };
  });

  // Get unique age groups from data
  const ageGroups = Array.from(new Set(classes.map((cls) => cls.ageGroup)));

  // Get day options
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Class Schedule</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenClassDialog('add')}
        >
          Add Class
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="class tabs">
          <Tab label="All Classes" />
          <Tab label="Active" />
          <Tab label="Upcoming" />
          <Tab label="Completed/Cancelled" />
        </Tabs>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by class name, description, or instructor..."
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
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      id="status-filter"
                      value={filters.status}
                      label="Status"
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="upcoming">Upcoming</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="skill-filter-label">Skill Level</InputLabel>
                    <Select
                      labelId="skill-filter-label"
                      id="skill-filter"
                      value={filters.skillLevel}
                      label="Skill Level"
                      onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                      <MenuItem value="competitive">Competitive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="age-group-filter-label">Age Group</InputLabel>
                    <Select
                      labelId="age-group-filter-label"
                      id="age-group-filter"
                      value={filters.ageGroup}
                      label="Age Group"
                      onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {ageGroups.map((age) => (
                        <MenuItem key={age} value={age}>
                          {age}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="instructor-filter-label">Instructor</InputLabel>
                    <Select
                      labelId="instructor-filter-label"
                      id="instructor-filter"
                      value={filters.instructor}
                      label="Instructor"
                      onChange={(e) => handleFilterChange('instructor', e.target.value)}
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
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="day-filter-label">Day</InputLabel>
                    <Select
                      labelId="day-filter-label"
                      id="day-filter"
                      value={filters.day}
                      label="Day"
                      onChange={(e) => handleFilterChange('day', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      setFilters({
                        search: '',
                        status: '',
                        skillLevel: '',
                        ageGroup: '',
                        instructor: '',
                        day: '',
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

      {/* Classes Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="classes table">
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Date Range</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Loading classes data...
                </TableCell>
              </TableRow>
            ) : tabFilteredClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No classes found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              tabFilteredClasses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cls) => (
                  <TableRow
                    key={cls.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {cls.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {cls.description}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Chip
                            label={cls.skillLevel.charAt(0).toUpperCase() + cls.skillLevel.slice(1)}
                            color={getSkillLevelColor(cls.skillLevel) as any}
                            size="small"
                          />
                          <Chip label={`Age: ${cls.ageGroup}`} size="small" variant="outlined" />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        {cls.schedule.map((sch, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption">
                              {sch.day} {sch.startTime}-{sch.endTime}
                            </Typography>
                          </Box>
                        ))}
                        <Typography variant="caption" color="textSecondary">
                          Duration: {cls.duration}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={cls.instructor.photo} alt={cls.instructor.name} sx={{ mr: 1, width: 32, height: 32 }} />
                        <Typography variant="body2">{cls.instructor.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {cls.enrolled}/{cls.capacity}
                        </Typography>
                        {cls.enrolled === cls.capacity && (
                          <Chip label="Full" size="small" color="error" sx={{ mt: 0.5 }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatCurrency(cls.fee, cls.currency)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(cls.startDate)}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        to {formatDate(cls.endDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                        color={getStatusColor(cls.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenClassDialog('view', cls)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Students">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenStudentsDialog(cls.id, cls.name)}
                          >
                            <PeopleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenClassDialog('edit', cls)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenDeleteConfirm(cls.id)}
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
          count={tabFilteredClasses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Class Details Dialog */}
      {classDialog.open && classDialog.class && (
        <Dialog
          open={classDialog.open}
          onClose={handleCloseClassDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {classDialog.mode === 'view'
              ? 'Class Details'
              : classDialog.mode === 'add'
              ? 'Add New Class'
              : 'Edit Class'}
          </DialogTitle>
          <DialogContent dividers>
            <ClassForm 
              swimClass={classDialog.class} 
              mode={classDialog.mode} 
              instructors={instructors} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClassDialog}>
              {classDialog.mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {classDialog.mode !== 'view' && (
              <Button variant="contained" color="primary">
                Save
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}

      {/* Students Dialog */}
      <Dialog
        open={studentsDialog.open}
        onClose={handleCloseStudentsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Students in {studentsDialog.className}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <ClassStudents classId={studentsDialog.classId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentsDialog}>Close</Button>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            color="primary"
          >
            Add Student
          </Button>
        </DialogActions>
      </Dialog>

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
            Are you sure you want to delete this class? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDeleteClass} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Class Form Component
interface ClassFormProps {
  swimClass: SwimClass;
  mode: 'view' | 'add' | 'edit';
  instructors: { id: string; name: string }[];
}

const ClassForm = ({ swimClass, mode, instructors }: ClassFormProps) => {
  const isViewMode = mode === 'view';
  const [formData, setFormData] = useState<SwimClass>(swimClass);
  const [schedules, setSchedules] = useState(swimClass.schedule);

  // Handle form field change
  const handleChange = (field: keyof SwimClass, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle schedule change
  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedules = [...schedules];
    (newSchedules[index] as any)[field] = value;
    setSchedules(newSchedules);
    handleChange('schedule', newSchedules);
  };

  // Add new schedule slot
  const handleAddSchedule = () => {
    const newSchedule = {
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      pool: 'Main Pool',
    };
    setSchedules([...schedules, newSchedule]);
    handleChange('schedule', [...schedules, newSchedule]);
  };

  // Remove schedule slot
  const handleRemoveSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
    handleChange('schedule', newSchedules);
  };

  // Pool options
  const pools = ['Main Pool', 'Olympic Pool', 'Training Pool', 'Kids Pool'];

  // Day options
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <Grid container spacing={3}>
      {/* Basic Information */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Class Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Class Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={isViewMode}
          required={!isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth disabled={isViewMode}>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            label="Status"
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          multiline
          rows={2}
          disabled={isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth disabled={isViewMode}>
          <InputLabel>Skill Level</InputLabel>
          <Select
            value={formData.skillLevel}
            label="Skill Level"
            onChange={(e) => handleChange('skillLevel', e.target.value)}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
            <MenuItem value="competitive">Competitive</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Age Group"
          value={formData.ageGroup}
          onChange={(e) => handleChange('ageGroup', e.target.value)}
          disabled={isViewMode}
          placeholder="e.g. 5-8"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth disabled={isViewMode}>
          <InputLabel>Instructor</InputLabel>
          <Select
            value={formData.instructor.id}
            label="Instructor"
            onChange={(e) => {
              const instructorId = e.target.value as string;
              const instructor = instructors.find((i) => i.id === instructorId);
              if (instructor) {
                handleChange('instructor', {
                  id: instructor.id,
                  name: instructor.name,
                  photo: formData.instructor.photo, // Keep the photo if available
                });
              }
            }}
          >
            {instructors.map((instructor) => (
              <MenuItem key={instructor.id} value={instructor.id}>
                {instructor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Duration"
          value={formData.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          disabled={isViewMode}
          placeholder="e.g. 8 weeks"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          disabled={isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          disabled={isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Capacity"
          type="number"
          value={formData.capacity}
          onChange={(e) => handleChange('capacity', Number(e.target.value))}
          disabled={isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Fee"
          type="number"
          value={formData.fee}
          onChange={(e) => handleChange('fee', Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{formData.currency}</InputAdornment>
            ),
          }}
          disabled={isViewMode}
        />
      </Grid>

      {/* Schedule Information */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Schedule</Typography>
          {!isViewMode && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddSchedule}
              size="small"
            >
              Add Schedule
            </Button>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />

        {schedules.map((schedule, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              mb: 2,
              pb: 2,
              borderBottom: index < schedules.length - 1 ? '1px dashed #ccc' : 'none',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={2.5}>
                <FormControl fullWidth size="small" disabled={isViewMode}>
                  <InputLabel>Day</InputLabel>
                  <Select
                    value={schedule.day}
                    label="Day"
                    onChange={(e) =>
                      handleScheduleChange(index, 'day', e.target.value)
                    }
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Start Time"
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) =>
                    handleScheduleChange(index, 'startTime', e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="End Time"
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) =>
                    handleScheduleChange(index, 'endTime', e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small" disabled={isViewMode}>
                  <InputLabel>Pool</InputLabel>
                  <Select
                    value={schedule.pool}
                    label="Pool"
                    onChange={(e) =>
                      handleScheduleChange(index, 'pool', e.target.value)
                    }
                  >
                    {pools.map((pool) => (
                      <MenuItem key={pool} value={pool}>
                        {pool}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={1.5} sx={{ textAlign: 'right' }}>
                {!isViewMode && schedules.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveSchedule(index)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

// Class Students Component
interface ClassStudentsProps {
  classId: string;
}

const ClassStudents = ({ classId }: ClassStudentsProps) => {
  // Mock students data for the selected class
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Ahmed Khan',
      age: 8,
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      enrollmentDate: '2025-04-01',
      progress: 'Good',
      attendance: '90%',
      paymentStatus: 'paid',
    },
    {
      id: 2,
      name: 'Sara Ali',
      age: 10,
      photo: 'https://randomuser.me/api/portraits/women/33.jpg',
      enrollmentDate: '2025-04-02',
      progress: 'Excellent',
      attendance: '95%',
      paymentStatus: 'paid',
    },
    {
      id: 3,
      name: 'Imran Ahmed',
      age: 12,
      photo: 'https://randomuser.me/api/portraits/men/34.jpg',
      enrollmentDate: '2025-04-03',
      progress: 'Good',
      attendance: '85%',
      paymentStatus: 'paid',
    },
    {
      id: 4,
      name: 'Sana Khan',
      age: 7,
      photo: 'https://randomuser.me/api/portraits/women/35.jpg',
      enrollmentDate: '2025-04-05',
      progress: 'Needs Improvement',
      attendance: '80%',
      paymentStatus: 'pending',
    },
  ]);

  // In a real app, this would fetch students for the specific class
  useEffect(() => {
    // API call would go here to fetch students for classId
    console.log('Fetching students for class:', classId);
  }, [classId]);

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="textSecondary">
          {students.length} students enrolled in this class
        </Typography>
        <TextField
          placeholder="Search students..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Enrollment Date</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Attendance</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students enrolled in this class yet.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={student.photo}
                        alt={student.name}
                        sx={{ mr: 1, width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography variant="body2">{student.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          Age: {student.age}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={student.progress}
                      color={
                        student.progress === 'Excellent'
                          ? 'success'
                          : student.progress === 'Good'
                          ? 'primary'
                          : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={
                        parseFloat(student.attendance) >= 90
                          ? 'success.main'
                          : parseFloat(student.attendance) >= 80
                          ? 'primary.main'
                          : 'warning.main'
                      }
                    >
                      {student.attendance}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        student.paymentStatus === 'paid' ? 'Paid' : 'Pending'
                      }
                      color={
                        student.paymentStatus === 'paid' ? 'success' : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title="View Student">
                        <IconButton size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove from Class">
                        <IconButton size="small" color="error">
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassSchedule;