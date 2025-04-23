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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
  Tabs,
  Tab,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock data for students
const studentsData = [
  {
    id: 1,
    name: 'Ahmed Khan',
    age: 8,
    gender: 'male',
    dateOfBirth: '2017-05-10',
    parent: 'Farooq Khan',
    parentId: 'p001',
    skillLevel: 'beginner',
    enrolledClasses: [
      { id: 'c1', name: 'Learn to Swim', status: 'active' },
    ],
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    progress: [
      { skill: 'Floating', level: 3, achievedOn: '2025-03-15' },
      { skill: 'Kicking', level: 2, achievedOn: '2025-03-10' },
    ]
  },
  {
    id: 2,
    name: 'Sara Ali',
    age: 10,
    gender: 'female',
    dateOfBirth: '2015-02-18',
    parent: 'Ali Hassan',
    parentId: 'p002',
    skillLevel: 'intermediate',
    enrolledClasses: [
      { id: 'c2', name: 'Intermediate Swim', status: 'active' },
      { id: 'c3', name: 'Water Safety', status: 'active' },
    ],
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    progress: [
      { skill: 'Freestyle', level: 5, achievedOn: '2025-03-22' },
      { skill: 'Backstroke', level: 4, achievedOn: '2025-03-15' },
    ]
  },
  {
    id: 3,
    name: 'Imran Ahmed',
    age: 12,
    gender: 'male',
    dateOfBirth: '2013-07-24',
    parent: 'Ahmed Raza',
    parentId: 'p003',
    skillLevel: 'advanced',
    enrolledClasses: [
      { id: 'c4', name: 'Advanced Techniques', status: 'active' },
    ],
    photo: 'https://randomuser.me/api/portraits/men/34.jpg',
    progress: [
      { skill: 'Butterfly', level: 7, achievedOn: '2025-04-01' },
      { skill: 'Turns', level: 8, achievedOn: '2025-04-10' },
    ]
  },
  {
    id: 4,
    name: 'Sana Khan',
    age: 7,
    gender: 'female',
    dateOfBirth: '2018-01-05',
    parent: 'Faisal Khan',
    parentId: 'p004',
    skillLevel: 'beginner',
    enrolledClasses: [
      { id: 'c1', name: 'Learn to Swim', status: 'active' },
    ],
    photo: 'https://randomuser.me/api/portraits/women/35.jpg',
    progress: [
      { skill: 'Floating', level: 2, achievedOn: '2025-04-05' },
    ]
  },
  {
    id: 5,
    name: 'Bilal Hassan',
    age: 14,
    gender: 'male',
    dateOfBirth: '2011-11-30',
    parent: 'Hassan Ali',
    parentId: 'p005',
    skillLevel: 'competitive',
    enrolledClasses: [
      { id: 'c5', name: 'Competitive Training', status: 'active' },
    ],
    photo: 'https://randomuser.me/api/portraits/men/36.jpg',
    progress: [
      { skill: 'Freestyle', level: 9, achievedOn: '2025-03-20' },
      { skill: 'Butterfly', level: 8, achievedOn: '2025-03-25' },
      { skill: 'Starts', level: 9, achievedOn: '2025-04-05' },
    ]
  },
];

// Interface for student data type
interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  parent: string;
  parentId: string;
  skillLevel: string;
  enrolledClasses: { id: string; name: string; status: string }[];
  photo: string;
  progress: { skill: string; level: number; achievedOn: string }[];
}

// Interface for student filter type
interface StudentFilter {
  search: string;
  gender: string;
  skillLevel: string;
  ageRange: [number, number];
  classId: string;
}

const StudentsList = () => {
  // State for students data with pagination
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for filtering
  const [filters, setFilters] = useState<StudentFilter>({
    search: '',
    gender: '',
    skillLevel: '',
    ageRange: [5, 18],
    classId: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // State for student dialog
  const [studentDialog, setStudentDialog] = useState({
    open: false,
    mode: 'view', // 'view', 'add', 'edit'
    student: null as Student | null,
  });

  // State for delete confirmation
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    open: false,
    studentId: null as number | null,
  });

  // State for tab management
  const [tabValue, setTabValue] = useState(0);

  // Load students data on component mount
  useEffect(() => {
    // Simulate API fetch with some delay
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setStudents(studentsData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters to student data
  const filteredStudents = students.filter((student) => {
    // Text search
    if (
      filters.search &&
      !student.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !student.parent.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Gender filter
    if (filters.gender && student.gender !== filters.gender) {
      return false;
    }

    // Skill level filter
    if (filters.skillLevel && student.skillLevel !== filters.skillLevel) {
      return false;
    }

    // Age range filter
    if (student.age < filters.ageRange[0] || student.age > filters.ageRange[1]) {
      return false;
    }

    // Class filter
    if (
      filters.classId &&
      !student.enrolledClasses.some((cls) => cls.id === filters.classId)
    ) {
      return false;
    }

    return true;
  });

  // Handle filter change
  const handleFilterChange = (field: keyof StudentFilter, value: any) => {
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

  // Handle student dialog open
  const handleOpenStudentDialog = (mode: 'view' | 'add' | 'edit', student?: Student) => {
    setStudentDialog({
      open: true,
      mode,
      student: student || null,
    });
  };

  // Handle student dialog close
  const handleCloseStudentDialog = () => {
    setStudentDialog({
      open: false,
      mode: 'view',
      student: null,
    });
  };

  // Handle delete confirmation open
  const handleOpenDeleteConfirm = (studentId: number) => {
    setDeleteConfirmDialog({
      open: true,
      studentId,
    });
  };

  // Handle delete confirmation close
  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmDialog({
      open: false,
      studentId: null,
    });
  };

  // Handle delete student
  const handleDeleteStudent = () => {
    if (deleteConfirmDialog.studentId) {
      // Filter out the deleted student
      const updatedStudents = students.filter(
        (s) => s.id !== deleteConfirmDialog.studentId
      );
      setStudents(updatedStudents);
      handleCloseDeleteConfirm();
    }
  };

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle saving student (add or edit)
  const handleSaveStudent = (student: Student) => {
    if (studentDialog.mode === 'add') {
      // Generate a new ID for the student
      const newId = Math.max(...students.map((s) => s.id)) + 1;
      const newStudent = {
        ...student,
        id: newId,
      };
      setStudents([...students, newStudent]);
    } else if (studentDialog.mode === 'edit' && student.id) {
      // Update existing student
      const updatedStudents = students.map((s) =>
        s.id === student.id ? student : s
      );
      setStudents(updatedStudents);
    }
    handleCloseStudentDialog();
  };

  // Function to get color for skill level
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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Students</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenStudentDialog('add')}
        >
          Add Student
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="student tabs">
          <Tab label="All Students" />
          <Tab label="Active Students" />
          <Tab label="Recently Added" />
        </Tabs>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search students by name or parent..."
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
                    <InputLabel id="gender-filter-label">Gender</InputLabel>
                    <Select
                      labelId="gender-filter-label"
                      id="gender-filter"
                      value={filters.gender}
                      label="Gender"
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
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
                <Grid item xs={12} md={6}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      setFilters({
                        search: '',
                        gender: '',
                        skillLevel: '',
                        ageRange: [5, 18],
                        classId: '',
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

      {/* Students Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="students table">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Skill Level</TableCell>
              <TableCell>Classes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading students data...
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
                        <Avatar src={student.photo} alt={student.name} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="body1">{student.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {student.gender === 'male' ? 'Male' : 'Female'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.parent}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.skillLevel.charAt(0).toUpperCase() + student.skillLevel.slice(1)}
                        color={getSkillLevelColor(student.skillLevel) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {student.enrolledClasses.length > 0
                        ? student.enrolledClasses.map((cls) => cls.name).join(', ')
                        : 'None'}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => handleOpenStudentDialog('view', student)}
                            size="small"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Track Progress">
                          <IconButton size="small">
                            <AssignmentIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => handleOpenStudentDialog('edit', student)}
                            size="small"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleOpenDeleteConfirm(student.id)}
                            size="small"
                            color="error"
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
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Student View/Edit/Add Dialog */}
      {studentDialog.open && (
        <Dialog
          open={studentDialog.open}
          onClose={handleCloseStudentDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {studentDialog.mode === 'view'
              ? 'Student Details'
              : studentDialog.mode === 'add'
              ? 'Add New Student'
              : 'Edit Student'}
          </DialogTitle>
          <DialogContent dividers>
            {studentDialog.student && (
              <StudentForm
                student={studentDialog.student}
                mode={studentDialog.mode}
                onSave={handleSaveStudent}
              />
            )}
            {!studentDialog.student && studentDialog.mode === 'add' && (
              <StudentForm
                student={{
                  id: 0,
                  name: '',
                  age: 0,
                  gender: 'male',
                  dateOfBirth: '',
                  parent: '',
                  parentId: '',
                  skillLevel: 'beginner',
                  enrolledClasses: [],
                  photo: '',
                  progress: [],
                }}
                mode="add"
                onSave={handleSaveStudent}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStudentDialog}>
              {studentDialog.mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {studentDialog.mode !== 'view' && (
              <Button
                variant="contained"
                color="primary"
                form="student-form"
                type="submit"
              >
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
            Are you sure you want to delete this student? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDeleteStudent} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Student Form Component
interface StudentFormProps {
  student: Student;
  mode: 'view' | 'add' | 'edit';
  onSave: (student: Student) => void;
}

const StudentForm = ({ student, mode, onSave }: StudentFormProps) => {
  const [formData, setFormData] = useState<Student>(student);
  const isViewMode = mode === 'view';

  const handleChange = (field: keyof Student, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: string) => {
    // Calculate age based on date of birth
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
      age: age,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form id="student-form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Avatar
            src={formData.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'}
            alt={formData.name || 'Student Photo'}
            sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
          />
          {!isViewMode && (
            <Button variant="outlined" size="small" disabled={isViewMode}>
              Upload Photo
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Student Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={isViewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleDateChange(e.target.value)}
                InputLabelProps={{ shrink: true }}
                disabled={isViewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={formData.age}
                InputProps={{ readOnly: true }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  label="Gender"
                  onChange={(e) => handleChange('gender', e.target.value)}
                  disabled={isViewMode}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Skill Level</InputLabel>
                <Select
                  value={formData.skillLevel}
                  label="Skill Level"
                  onChange={(e) => handleChange('skillLevel', e.target.value)}
                  disabled={isViewMode}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                  <MenuItem value="competitive">Competitive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Parent/Guardian Name"
                value={formData.parent}
                onChange={(e) => handleChange('parent', e.target.value)}
                disabled={isViewMode}
              />
            </Grid>
          </Grid>
        </Grid>

        {isViewMode && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Enrolled Classes
              </Typography>
              {formData.enrolledClasses.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Class</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.enrolledClasses.map((cls) => (
                        <TableRow key={cls.id}>
                          <TableCell>{cls.name}</TableCell>
                          <TableCell>
                            <Chip
                              label={cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                              color={cls.status === 'active' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  This student is not enrolled in any classes.
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Progress Achievements
              </Typography>
              {formData.progress.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Skill</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Achieved On</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.progress.map((prog, index) => (
                        <TableRow key={index}>
                          <TableCell>{prog.skill}</TableCell>
                          <TableCell>{prog.level} / 10</TableCell>
                          <TableCell>{new Date(prog.achievedOn).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No progress records yet.
                </Typography>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

export default StudentsList;