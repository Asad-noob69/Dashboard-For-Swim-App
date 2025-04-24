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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

// Mock data for swimming classes
const classesData = [
  {
    id: 'c1',
    name: 'Learn to Swim',
    skillLevel: 'beginner',
    ageGroup: '5-8',
    capacity: 10,
    enrolled: 8,
    instructor: 'Asad Khan',
    schedule: 'Mon, Wed 4:00 PM - 5:00 PM',
    fee: 15000,
    currency: 'PKR',
    startDate: '2025-05-01',
    endDate: '2025-06-30',
    status: 'active',
  },
  {
    id: 'c2',
    name: 'Intermediate Swim',
    skillLevel: 'intermediate',
    ageGroup: '9-12',
    capacity: 8,
    enrolled: 8,
    instructor: 'Sara Ahmed',
    schedule: 'Tue, Thu 5:00 PM - 6:00 PM',
    fee: 18000,
    currency: 'PKR',
    startDate: '2025-05-02',
    endDate: '2025-07-01',
    status: 'active',
  },
  {
    id: 'c3',
    name: 'Water Safety',
    skillLevel: 'beginner',
    ageGroup: '5-8',
    capacity: 10,
    enrolled: 6,
    instructor: 'Asad Khan',
    schedule: 'Tue, Thu 4:00 PM - 5:00 PM',
    fee: 15000,
    currency: 'PKR',
    startDate: '2025-05-05',
    endDate: '2025-06-25',
    status: 'active',
  },
  {
    id: 'c4',
    name: 'Advanced Techniques',
    skillLevel: 'advanced',
    ageGroup: '13-16',
    capacity: 6,
    enrolled: 5,
    instructor: 'Kamran Ali',
    schedule: 'Tue, Thu 6:00 AM - 7:30 AM',
    fee: 20000,
    currency: 'PKR',
    startDate: '2025-05-10',
    endDate: '2025-07-10',
    status: 'upcoming',
  },
  {
    id: 'c5',
    name: 'Competitive Training',
    skillLevel: 'advanced',
    ageGroup: '13-16',
    capacity: 8,
    enrolled: 8,
    instructor: 'Kamran Ali',
    schedule: 'Mon, Wed, Fri 5:00 PM - 6:30 PM',
    fee: 25000,
    currency: 'PKR',
    startDate: '2025-03-01',
    endDate: '2025-04-20',
    status: 'completed',
  },
  {
    id: 'c6',
    name: 'Parent-Child Swim',
    skillLevel: 'beginner',
    ageGroup: '2-4',
    capacity: 8,
    enrolled: 4,
    instructor: 'Sara Ahmed',
    schedule: 'Sat 9:00 AM - 10:00 AM',
    fee: 12000,
    currency: 'PKR',
    startDate: '2025-06-01',
    endDate: '2025-07-20',
    status: 'upcoming',
  },
];

const ClassesList = () => {
  // State for classes data with pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for filtering
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    skillLevel: '',
    ageGroup: '',
  });
  const [showFilters, setShowFilters] = useState(false);

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

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return `${currency === 'PKR' ? 'Rs. ' : '$'}${amount.toLocaleString()}`;
  };

  // Get color for status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'info';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // Apply filters to class data
  const filteredClasses = classesData.filter((cls) => {
    // Text search
    if (
      filters.search &&
      !cls.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !cls.instructor.toLowerCase().includes(filters.search.toLowerCase())
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

    return true;
  });

  // Get unique age groups from data
  const ageGroups = Array.from(new Set(classesData.map((cls) => cls.ageGroup)));

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Classes List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/classes/schedule?action=add"
        >
          Add Class
        </Button>
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
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      id="status-filter"
                      value={filters.status}
                      label="Status"
                      onChange={(e) => handleFilterChange('status', e.target.value as string)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="upcoming">Upcoming</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="skill-filter-label">Skill Level</InputLabel>
                    <Select
                      labelId="skill-filter-label"
                      id="skill-filter"
                      value={filters.skillLevel}
                      label="Skill Level"
                      onChange={(e) => handleFilterChange('skillLevel', e.target.value as string)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="age-group-filter-label">Age Group</InputLabel>
                    <Select
                      labelId="age-group-filter-label"
                      id="age-group-filter"
                      value={filters.ageGroup}
                      label="Age Group"
                      onChange={(e) => handleFilterChange('ageGroup', e.target.value as string)}
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
              <TableCell>Class Name</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Enrollment</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No classes found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredClasses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>
                      <Typography variant="body1">{cls.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Level: <strong>{cls.skillLevel.charAt(0).toUpperCase() + cls.skillLevel.slice(1)}</strong>
                      </Typography>
                      <Typography variant="body2">
                        Age: <strong>{cls.ageGroup}</strong>
                      </Typography>
                      <Typography variant="body2">
                        Fee: <strong>{formatCurrency(cls.fee, cls.currency)}</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>{cls.instructor}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{cls.schedule}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {cls.enrolled}/{cls.capacity}
                      </Typography>
                      {cls.enrolled === cls.capacity && (
                        <Chip label="Full" size="small" color="error" sx={{ mt: 0.5 }} />
                      )}
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
                            component={Link}
                            to={`/classes/schedule?id=${cls.id}&view=true`}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            component={Link}
                            to={`/classes/schedule?id=${cls.id}&edit=true`}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Students">
                          <IconButton
                            size="small"
                            component={Link}
                            to={`/students?classId=${cls.id}`}
                          >
                            <PeopleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
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
          count={filteredClasses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ClassesList;