import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';

const StudentManagement = () => {
  const stats = {
    totalStudents: 45,
    activeStudents: 38,
    newThisMonth: 5,
    waitlisted: 7
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Student Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/students/all?action=add"
        >
          Register New Student
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h6">Total Students</Typography>
            </Box>
            <Typography variant="h3" color="primary.main">{stats.totalStudents}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
              <Typography variant="h6">Active Students</Typography>
            </Box>
            <Typography variant="h3" color="success.main">{stats.activeStudents}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarMonthIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
              <Typography variant="h6">New This Month</Typography>
            </Box>
            <Typography variant="h3" color="info.main">{stats.newThisMonth}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonAddIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
              <Typography variant="h6">Waitlisted</Typography>
            </Box>
            <Typography variant="h3" color="warning.main">{stats.waitlisted}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" sx={{ mb: 2 }}>Quick Actions</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ViewListIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Students List</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View and manage all students, filter by age, level, and more.
              </Typography>
              <Button 
                variant="outlined"
                component={Link}
                to="/students/all"
              >
                View Students
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarMonthIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Class Bookings</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage student class bookings, enrollments, and schedule changes.
              </Typography>
              <Button 
                variant="outlined"
                component={Link}
                to="/students/bookings"
              >
                Manage Bookings
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Progress Reports</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View and manage student progress tracking and assessment reports.
              </Typography>
              <Button 
                variant="outlined"
                component={Link}
                to="/progress"
              >
                View Progress
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentManagement;