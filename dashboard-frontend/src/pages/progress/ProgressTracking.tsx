import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  LinearProgress,
  Tabs,
  Tab,
  Divider,
  Chip,
  IconButton,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

// Mock data for student progress
const studentProgressData = [
  {
    id: 's1',
    name: 'Ahmed Khan',
    age: 7,
    photo: 'https://randomuser.me/api/portraits/boys/1.jpg',
    skillLevel: 'beginner',
    instructor: 'Asad Khan',
    className: 'Learn to Swim',
    progress: {
      overall: 80,
      skills: [
        { name: 'Water Comfort', level: 4, maxLevel: 5, progress: 85 },
        { name: 'Floating', level: 4, maxLevel: 5, progress: 90 },
        { name: 'Kicking', level: 3, maxLevel: 5, progress: 70 },
        { name: 'Arm Movement', level: 3, maxLevel: 5, progress: 65 },
        { name: 'Breathing', level: 4, maxLevel: 5, progress: 85 },
        { name: 'Coordination', level: 3, maxLevel: 5, progress: 60 },
      ],
      assessments: [
        { date: '2025-03-10', score: 75, notes: 'Good progress in water comfort' },
        { date: '2025-04-01', score: 80, notes: 'Improved floating technique' },
      ],
      nextMilestone: 'Full lap without assistance',
    },
  },
  {
    id: 's2',
    name: 'Sara Ali',
    age: 6,
    photo: 'https://randomuser.me/api/portraits/girls/1.jpg',
    skillLevel: 'beginner',
    instructor: 'Sara Ahmed',
    className: 'Learn to Swim',
    progress: {
      overall: 75,
      skills: [
        { name: 'Water Comfort', level: 5, maxLevel: 5, progress: 100 },
        { name: 'Floating', level: 3, maxLevel: 5, progress: 70 },
        { name: 'Kicking', level: 4, maxLevel: 5, progress: 80 },
        { name: 'Arm Movement', level: 3, maxLevel: 5, progress: 60 },
        { name: 'Breathing', level: 3, maxLevel: 5, progress: 65 },
        { name: 'Coordination', level: 3, maxLevel: 5, progress: 55 },
      ],
      assessments: [
        { date: '2025-03-15', score: 70, notes: 'Needs work on arm coordination' },
        { date: '2025-04-05', score: 75, notes: 'Improved kicking technique' },
      ],
      nextMilestone: 'Floating without assistance',
    },
  },
  {
    id: 's3',
    name: 'Imran Ahmed',
    age: 10,
    photo: 'https://randomuser.me/api/portraits/boys/2.jpg',
    skillLevel: 'intermediate',
    instructor: 'Kamran Ali',
    className: 'Intermediate Swim',
    progress: {
      overall: 85,
      skills: [
        { name: 'Freestyle', level: 4, maxLevel: 5, progress: 90 },
        { name: 'Backstroke', level: 4, maxLevel: 5, progress: 85 },
        { name: 'Breaststroke', level: 3, maxLevel: 5, progress: 75 },
        { name: 'Butterfly', level: 2, maxLevel: 5, progress: 50 },
        { name: 'Turns', level: 3, maxLevel: 5, progress: 70 },
        { name: 'Endurance', level: 4, maxLevel: 5, progress: 90 },
      ],
      assessments: [
        { date: '2025-03-01', score: 80, notes: 'Good freestyle technique' },
        { date: '2025-04-01', score: 85, notes: 'Improved endurance, needs work on butterfly' },
      ],
      nextMilestone: 'Complete 100m individual medley',
    },
  },
  {
    id: 's4',
    name: 'Aisha Malik',
    age: 15,
    photo: 'https://randomuser.me/api/portraits/girls/2.jpg',
    skillLevel: 'advanced',
    instructor: 'Kamran Ali',
    className: 'Competitive Training',
    progress: {
      overall: 95,
      skills: [
        { name: 'Freestyle', level: 5, maxLevel: 5, progress: 100 },
        { name: 'Backstroke', level: 5, maxLevel: 5, progress: 95 },
        { name: 'Breaststroke', level: 4, maxLevel: 5, progress: 90 },
        { name: 'Butterfly', level: 5, maxLevel: 5, progress: 95 },
        { name: 'Turns', level: 5, maxLevel: 5, progress: 95 },
        { name: 'Race Strategy', level: 4, maxLevel: 5, progress: 90 },
      ],
      assessments: [
        { date: '2025-02-15', score: 90, notes: 'Excellent performance in freestyle' },
        { date: '2025-03-15', score: 95, notes: 'Improved butterfly technique' },
      ],
      nextMilestone: 'Regional competition preparation',
    },
  },
];

// Tab interface
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progress-tabpanel-${index}`}
      aria-labelledby={`progress-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `progress-tab-${index}`,
    'aria-controls': `progress-tabpanel-${index}`,
  };
}

const ProgressTracking = () => {
  // State for selected student
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  // State for search and filters
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    instructor: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Get student details
  const getSelectedStudentDetails = () => {
    return studentProgressData.find((student) => student.id === selectedStudent);
  };

  // Filter students
  const filteredStudents = studentProgressData.filter((student) => {
    if (search && !student.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    if (filters.level && student.skillLevel !== filters.level) {
      return false;
    }
    
    if (filters.instructor && student.instructor !== filters.instructor) {
      return false;
    }
    
    return true;
  });

  // Get color for progress bar
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'success';
    if (progress >= 70) return 'info';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  // Render skill level stars
  const renderSkillStars = (level: number, maxLevel: number) => {
    const stars = [];
    for (let i = 1; i <= maxLevel; i++) {
      if (i <= level) {
        stars.push(<StarIcon key={i} color="primary" />);
      } else if (i - 0.5 === level) {
        stars.push(<StarHalfIcon key={i} color="primary" />);
      } else {
        stars.push(<StarBorderIcon key={i} color="action" />);
      }
    }
    return stars;
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

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Progress Tracking</Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<PrintIcon />} 
            sx={{ mr: 1 }}
            disabled={!selectedStudent}
          >
            Print Report
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            disabled={!selectedStudent}
          >
            Download PDF
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Student Selection Panel */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Select Student</Typography>
              <TextField
                fullWidth
                placeholder="Search by name..."
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button
                  variant="text"
                  startIcon={<FilterListIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </Box>
              
              {showFilters && (
                <Box sx={{ mb: 2 }}>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Skill Level</InputLabel>
                    <Select
                      value={filters.level}
                      label="Skill Level"
                      onChange={(e) => setFilters({...filters, level: e.target.value as string})}
                    >
                      <MenuItem value="">All Levels</MenuItem>
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Instructor</InputLabel>
                    <Select
                      value={filters.instructor}
                      label="Instructor"
                      onChange={(e) => setFilters({...filters, instructor: e.target.value as string})}
                    >
                      <MenuItem value="">All Instructors</MenuItem>
                      <MenuItem value="Asad Khan">Asad Khan</MenuItem>
                      <MenuItem value="Sara Ahmed">Sara Ahmed</MenuItem>
                      <MenuItem value="Kamran Ali">Kamran Ali</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
              
              <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredStudents.length === 0 ? (
                  <Typography variant="body2" align="center" color="textSecondary" sx={{ py: 2 }}>
                    No students found matching your filters.
                  </Typography>
                ) : (
                  filteredStudents.map((student) => (
                    <Box
                      key={student.id}
                      sx={{
                        p: 2,
                        mb: 1,
                        borderRadius: 1,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: selectedStudent === student.id ? 'primary.light' : 'background.paper',
                        '&:hover': {
                          bgcolor: selectedStudent === student.id ? 'primary.light' : 'action.hover',
                        },
                      }}
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <Avatar src={student.photo} alt={student.name} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="body1">{student.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          Age: {student.age} • {student.skillLevel.charAt(0).toUpperCase() + student.skillLevel.slice(1)}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" display="block">
                          {student.className} with {student.instructor}
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 40, height: 40, position: 'relative', mr: 1 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              position: 'absolute', 
                              top: '50%', 
                              left: '50%', 
                              transform: 'translate(-50%, -50%)',
                              fontWeight: 'bold',
                            }}
                          >
                            {student.progress.overall}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Progress Details Panel */}
        <Grid item xs={12} md={8}>
          {selectedStudent ? (
            <Card>
              <CardContent>
                {/* Student Overview */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={getSelectedStudentDetails()?.photo}
                    alt={getSelectedStudentDetails()?.name}
                    sx={{ width: 72, height: 72, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h5">{getSelectedStudentDetails()?.name}</Typography>
                    <Typography variant="body1">
                      Age: {getSelectedStudentDetails()?.age} • Class: {getSelectedStudentDetails()?.className}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Instructor: {getSelectedStudentDetails()?.instructor}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                    <Typography variant="h4" color="primary">
                      {getSelectedStudentDetails()?.progress.overall}%
                    </Typography>
                    <Typography variant="body2">Overall Progress</Typography>
                  </Box>
                </Box>

                {/* Progress Tabs */}
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="progress tabs">
                      <Tab label="Skills Progress" {...a11yProps(0)} />
                      <Tab label="Assessments" {...a11yProps(1)} />
                      <Tab label="Notes & Goals" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Skills Development</Typography>
                    <Grid container spacing={2}>
                      {getSelectedStudentDetails()?.progress.skills.map((skill, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body1">{skill.name}</Typography>
                              <Typography variant="body2">
                                {skill.progress}%
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Box sx={{ flexGrow: 1, mr: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={skill.progress} 
                                  color={getProgressColor(skill.progress) as any}
                                  sx={{ height: 8, borderRadius: 5 }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
                                Level:
                              </Typography>
                              {renderSkillStars(skill.level, skill.maxLevel)}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Assessment History</Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Notes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {getSelectedStudentDetails()?.progress.assessments.map((assessment, index) => (
                            <TableRow key={index}>
                              <TableCell>{formatDate(assessment.date)}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={`${assessment.score}%`} 
                                  color={getProgressColor(assessment.score) as any}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{assessment.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Next Milestone</Typography>
                        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                          <Typography variant="body1">
                            {getSelectedStudentDetails()?.progress.nextMilestone}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Instructor Notes</Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          placeholder="Add notes about student progress..."
                          variant="outlined"
                        />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                          <Button variant="contained">Save Notes</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                  Select a student to view progress details
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Student progress tracking includes skills development, assessment history, and personal goals.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressTracking;