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
import ClassIcon from '@mui/icons-material/Class';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';

const ClassManagement = () => {
  const stats = {
    activeClasses: 12,
    upcomingClasses: 5,
    completedClasses: 8,
    waitlistStudents: 15
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Class Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/classes/schedule?action=add"
        >
          Create New Class
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ClassIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
              <Typography variant="h6">Active Classes</Typography>
            </Box>
            <Typography variant="h3" color="success.main">{stats.activeClasses}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarMonthIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
              <Typography variant="h6">Upcoming</Typography>
            </Box>
            <Typography variant="h3" color="info.main">{stats.upcomingClasses}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ClassIcon sx={{ fontSize: 40, color: 'text.secondary', mr: 2 }} />
              <Typography variant="h6">Completed</Typography>
            </Box>
            <Typography variant="h3" color="text.secondary">{stats.completedClasses}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
              <Typography variant="h6">Waitlist</Typography>
            </Box>
            <Typography variant="h3" color="warning.main">{stats.waitlistStudents}</Typography>
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
                <Typography variant="h6">Class List</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View and manage all classes, filter by status, level, and more.
              </Typography>
              <Button 
                variant="outlined"
                component={Link}
                to="/classes/all"
              >
                View Classes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarMonthIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Class Schedule</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View and manage class schedules, make adjustments, and assign instructors.
              </Typography>
              <Button 
                variant="outlined"
                component={Link}
                to="/classes/schedule"
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">Waitlist Management</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage student waitlists for full classes and process enrollments.
              </Typography>
              <Button 
                variant="outlined"
                component={Link}
                to="/classes/waitlist"
              >
                Manage Waitlist
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassManagement;