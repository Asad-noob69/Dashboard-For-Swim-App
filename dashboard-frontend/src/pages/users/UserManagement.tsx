import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const UserManagement = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for recent users
  const recentUsers = [
    {
      id: 1,
      name: 'Ahmad Khan',
      email: 'ahmad.khan@example.com',
      role: 'Admin',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastLogin: '2025-04-22T14:30:00Z'
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      email: 'sara.ahmed@example.com',
      role: 'Instructor',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      lastLogin: '2025-04-22T10:15:00Z'
    },
    {
      id: 3,
      name: 'Imran Ali',
      email: 'imran.ali@example.com',
      role: 'Parent',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      lastLogin: '2025-04-21T18:45:00Z'
    }
  ];

  // User statistics
  const userStats = [
    { title: 'Total Users', count: 145, icon: <PeopleIcon color="primary" sx={{ fontSize: 40 }} /> },
    { title: 'Admin Users', count: 8, icon: <SupervisorAccountIcon color="secondary" sx={{ fontSize: 40 }} /> },
    { title: 'Instructors', count: 12, icon: <SchoolIcon sx={{ fontSize: 40, color: '#ff9800' }} /> },
    { title: 'Parents', count: 125, icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: '#4caf50' }} /> }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'secondary';
      case 'Instructor':
        return 'primary';
      case 'Parent':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/users/new"
        >
          Add User
        </Button>
      </Box>

      {/* User Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {userStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%'
              }}
              elevation={2}
            >
              {stat.icon}
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                {stat.count}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* User Categories */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="user categories"
          >
            <Tab label="All Users" />
            <Tab label="Admins" component={Link} to="/users/admins" />
            <Tab label="Instructors" component={Link} to="/users/instructors" />
            <Tab label="Parents" component={Link} to="/users/parents" />
          </Tabs>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Manage user accounts across different roles. Click on the tabs above to filter by specific user types.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/users/admins"
                startIcon={<SupervisorAccountIcon />}
              >
                Manage Admins
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/users/instructors"
                startIcon={<SchoolIcon />}
              >
                Manage Instructors
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/users/parents"
                startIcon={<FamilyRestroomIcon />}
              >
                Manage Parents
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Users */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recently Active Users
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {recentUsers.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" aria-label="view">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {user.name}
                        <Chip
                          label={user.role}
                          color={getRoleColor(user.role) as any}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        {user.email}
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          Last login: {formatDate(user.lastLogin)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserManagement;