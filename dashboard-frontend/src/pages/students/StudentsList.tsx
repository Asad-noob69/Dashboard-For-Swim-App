import React, { useState, useEffect } from 'react';
import StudentService from "../../services/studentService"
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
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

// Mock data for students - keeping for reference
const studentsData = [
  
];

const StudentsList = () => {
  // State for students data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await StudentService.getAllStudents();
        setStudents(data);
      } catch (err) {
        setError(err);
        console.error('Failed to fetch students:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for filtering
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    skillLevel: '',
    ageRange: {
      min: 0,
      max: 18,
    },
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle filter change
  const handleFilterChange = (field: string, value: any) => {
    if (field === 'ageRange') {
      setFilters((prev) => ({
        ...prev,
        ageRange: { ...prev.ageRange, ...value },
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

  // Get color for progress
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'success';
    if (progress >= 70) return 'info';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  // Apply filters to students data
  const filteredStudents = students.filter((student) => {
    // Text search
    if (
      filters.search &&
      !student.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !student.parent.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (filters.status && student.status !== filters.status) {
      return false;
    }

    // Skill level filter
    if (filters.skillLevel && student.skillLevel !== filters.skillLevel) {
      return false;
    }

    // Age range filter
    if (student.age < filters.ageRange.min || student.age > filters.ageRange.max) {
      return false;
    }

    return true;
  });

  // If loading, show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If there's an error, show error state
  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Failed to load students: {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Students List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/students/all?action=add"
        >
          Add Student
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by student name or parent name..."
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
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
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
                      onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Min Age"
                        type="number"
                        value={filters.ageRange.min}
                        onChange={(e) =>
                          handleFilterChange('ageRange', { min: parseInt(e.target.value, 10) })
                        }
                        InputProps={{ inputProps: { min: 0, max: 18 } }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Max Age"
                        type="number"
                        value={filters.ageRange.max}
                        onChange={(e) =>
                          handleFilterChange('ageRange', { max: parseInt(e.target.value, 10) })
                        }
                        InputProps={{ inputProps: { min: 0, max: 18 } }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Students Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="students table">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Skills & Progress</TableCell>
              <TableCell>Classes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No students found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={student.photo}
                          alt={student.name}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body2">{student.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            ID: {student.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">Age: {student.age}</Typography>
                      <Typography variant="body2">Gender: {student.gender}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        Joined: {formatDate(student.joinDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{student.parent}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {student.parentContact}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={student.skillLevel.charAt(0).toUpperCase() + student.skillLevel.slice(1)}
                          color={
                            student.skillLevel === 'beginner'
                              ? 'primary'
                              : student.skillLevel === 'intermediate'
                              ? 'secondary'
                              : 'info'
                          }
                          size="small"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ mr: 1 }}>
                          Progress:
                        </Typography>
                        <Box
                          sx={{
                            width: '100%',
                            height: 8,
                            borderRadius: 5,
                            bgcolor: 'grey.300',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              height: '100%',
                              width: `${student.progress}%`,
                              bgcolor: `${getProgressColor(student.progress)}.main`,
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="caption" align="right" display="block" color={getProgressColor(student.progress) + '.main'}>
                        {student.progress}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {student.activeClasses} Active {student.activeClasses === 1 ? 'Class' : 'Classes'}
                      </Typography>
                      {student.status === 'active' && (
                        <Typography variant="caption" color="textSecondary">
                          Attendance: {student.attendance}%
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        color={student.status === 'active' ? 'success' : 'default'}
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
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Progress Report">
                          <IconButton
                            size="small"
                            component={Link}
                            to={`/progress?studentId=${student.id}`}
                          >
                            <AssessmentIcon fontSize="small" />
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
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default StudentsList;