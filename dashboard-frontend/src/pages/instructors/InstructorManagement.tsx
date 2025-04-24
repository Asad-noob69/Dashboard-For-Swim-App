import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PoolIcon from '@mui/icons-material/Pool';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';

const InstructorManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for instructors
  const instructors = [
    {
      id: 1,
      name: 'Sara Ahmed',
      email: 'sara.ahmed@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      status: 'active',
      rating: 4.8,
      experience: '5 years',
      specialties: ['Beginner Swimming', 'Water Safety', 'Children'],
      activeClasses: 3,
      totalStudents: 24,
      certifications: [
        'CPR Certified',
        'Lifeguard Certification',
        'Swimming Coach Level 2'
      ],
      highlightedStats: {
        attendanceRate: 98,
        studentProgress: 87,
        retention: 92
      }
    },
    {
      id: 2,
      name: 'Kamran Ali',
      email: 'kamran.ali@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      status: 'active',
      rating: 4.5,
      experience: '7 years',
      specialties: ['Advanced Swimming', 'Competitive Swimming', 'Stroke Refinement'],
      activeClasses: 4,
      totalStudents: 18,
      certifications: [
        'International Swimming Coach',
        'Olympic Training Certification',
        'Advanced CPR',
        'First Aid Certified'
      ],
      highlightedStats: {
        attendanceRate: 95,
        studentProgress: 91,
        retention: 88
      }
    },
    {
      id: 3,
      name: 'Ayesha Malik',
      email: 'ayesha.malik@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'inactive',
      rating: 4.2,
      experience: '3 years',
      specialties: ['Intermediate Swimming', 'Adult Classes'],
      activeClasses: 0,
      totalStudents: 0,
      certifications: [
        'Swimming Coach Level 1',
        'Water Safety Instructor'
      ],
      highlightedStats: {
        attendanceRate: 90,
        studentProgress: 82,
        retention: 75
      }
    }
  ];

  // Mock data for instructor classes
  const instructorClasses = [
    {
      id: 'c1',
      name: 'Learn to Swim',
      instructorId: 1,
      instructor: 'Sara Ahmed',
      schedule: 'Mon, Wed, Fri 9:00 AM - 10:00 AM',
      studentsEnrolled: 8,
      level: 'Beginner'
    },
    {
      id: 'c2',
      name: 'Intermediate Swim',
      instructorId: 1,
      instructor: 'Sara Ahmed',
      schedule: 'Mon, Wed, Fri 10:30 AM - 11:30 AM',
      studentsEnrolled: 10,
      level: 'Intermediate'
    },
    {
      id: 'c3',
      name: 'Water Safety',
      instructorId: 1,
      instructor: 'Sara Ahmed',
      schedule: 'Tue, Thu 4:00 PM - 5:00 PM',
      studentsEnrolled: 6,
      level: 'Beginner'
    },
    {
      id: 'c4',
      name: 'Advanced Techniques',
      instructorId: 2,
      instructor: 'Kamran Ali',
      schedule: 'Tue, Thu 6:00 AM - 7:30 AM',
      studentsEnrolled: 5,
      level: 'Advanced'
    },
    {
      id: 'c5',
      name: 'Competitive Training',
      instructorId: 2,
      instructor: 'Kamran Ali',
      schedule: 'Mon, Wed, Fri 5:00 PM - 6:30 PM',
      studentsEnrolled: 8,
      level: 'Advanced'
    }
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter instructors by search query
  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter classes by tab value (0 = all, 1 = active, 2 = inactive)
  const filteredClasses = instructorClasses.filter(cls => {
    if (tabValue === 0) return true;
    const instructor = instructors.find(i => i.id === cls.instructorId);
    return tabValue === 1 ? instructor?.status === 'active' : instructor?.status === 'inactive';
  });

  // Calculate statistics
  const stats = {
    total: instructors.length,
    active: instructors.filter(i => i.status === 'active').length,
    inactive: instructors.filter(i => i.status === 'inactive').length,
    classes: instructorClasses.length,
    studentsEnrolled: instructorClasses.reduce((sum, cls) => sum + cls.studentsEnrolled, 0)
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Instructor Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/instructors/new"
        >
          Add Instructor
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h5">Instructors</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h3" color="primary.main">{stats.total}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip 
                  label={`${stats.active} Active`} 
                  color="success" 
                  size="small" 
                  variant="outlined" 
                />
                {stats.inactive > 0 && (
                  <Chip 
                    label={`${stats.inactive} Inactive`} 
                    color="default" 
                    size="small" 
                    variant="outlined" 
                  />
                )}
              </Stack>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ClassIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
              <Typography variant="h5">Classes</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h3" color="secondary.main">{stats.classes}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Currently scheduled and active classes
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
              <Typography variant="h5">Students</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h3" color="warning.main">{stats.studentsEnrolled}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Total students enrolled in classes
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Search and Tabs */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="instructor tabs"
          >
            <Tab label="All Instructors" />
            <Tab label="Active" />
            <Tab label="Inactive" />
          </Tabs>
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              placeholder="Search instructors..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
            <Box>
              <Button
                startIcon={<FilterListIcon />}
                color="primary"
              >
                Filter
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Instructors Grid */}
      <Grid container spacing={3}>
        {filteredInstructors.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography>No instructors found</Typography>
            </Paper>
          </Grid>
        ) : (
          filteredInstructors.map(instructor => (
            <Grid item xs={12} md={6} lg={4} key={instructor.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={instructor.avatar} 
                      alt={instructor.name} 
                      sx={{ width: 80, height: 80, mb: 1 }}
                    />
                    <Typography variant="h6">{instructor.name}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {instructor.email}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={instructor.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({instructor.rating})
                      </Typography>
                    </Box>
                    <Chip
                      label={instructor.status === 'active' ? 'Active' : 'Inactive'}
                      color={instructor.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Experience:</Typography>
                    <Typography variant="body2">{instructor.experience}</Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Specialties:</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {instructor.specialties.map((specialty, index) => (
                        <Chip 
                          key={index} 
                          label={specialty} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1, textAlign: 'center' }} variant="outlined">
                        <Typography variant="body2" color="text.secondary">Classes</Typography>
                        <Typography variant="h6">{instructor.activeClasses}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1, textAlign: 'center' }} variant="outlined">
                        <Typography variant="body2" color="text.secondary">Students</Typography>
                        <Typography variant="h6">{instructor.totalStudents}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      startIcon={<VisibilityIcon />} 
                      component={Link} 
                      to={`/instructors/${instructor.id}`}
                      size="small"
                    >
                      View
                    </Button>
                    <Button 
                      startIcon={<EditIcon />}
                      component={Link}
                      to={`/instructors/edit/${instructor.id}`}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button 
                      startIcon={<ClassIcon />}
                      component={Link}
                      to={`/classes?instructor=${instructor.id}`}
                      size="small"
                    >
                      Classes
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Classes */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Instructor Classes
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          {filteredClasses.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography>No classes found</Typography>
              </Paper>
            </Grid>
          ) : (
            filteredClasses.map(cls => (
              <Grid item xs={12} md={6} lg={4} key={cls.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6">{cls.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {cls.instructor}
                        </Typography>
                      </Box>
                      <Chip 
                        label={cls.level} 
                        color={
                          cls.level === 'Beginner' ? 'primary' : 
                          cls.level === 'Intermediate' ? 'secondary' : 'warning'
                        }
                        size="small" 
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>Schedule:</Typography>
                      <Typography variant="body2">{cls.schedule}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>Students Enrolled:</Typography>
                      <Typography variant="body2">{cls.studentsEnrolled}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button 
                        startIcon={<VisibilityIcon />} 
                        component={Link} 
                        to={`/classes/${cls.id}`}
                        size="small"
                      >
                        View Class
                      </Button>
                      <Button 
                        startIcon={<GroupIcon />}
                        component={Link}
                        to={`/classes/${cls.id}/students`}
                        size="small"
                      >
                        Students
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default InstructorManagement;