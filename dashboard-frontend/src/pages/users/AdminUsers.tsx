import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockResetIcon from '@mui/icons-material/LockReset';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SecurityIcon from '@mui/icons-material/Security';

const AdminUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordResetDialogOpen, setPasswordResetDialogOpen] = useState(false);

  // Mock data for admin users
  const admins = [
    {
      id: 1,
      name: 'Muhammad Usman',
      email: 'usman@swimacademy.com',
      phone: '+92 321 1234567',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      status: 'active',
      role: 'super_admin',
      lastLogin: '2025-04-23T09:15:00Z',
      created: '2024-01-05T12:00:00Z',
      department: 'Management',
      permissions: ['full_access'],
      twoFactorEnabled: true,
      recentActivity: [
        { action: 'Created new instructor account', timestamp: '2025-04-22T14:32:00Z' },
        { action: 'Updated system settings', timestamp: '2025-04-21T10:17:00Z' },
        { action: 'Generated monthly report', timestamp: '2025-04-20T16:25:00Z' }
      ]
    },
    {
      id: 2,
      name: 'Ayesha Khan',
      email: 'ayesha@swimacademy.com',
      phone: '+92 333 9876543',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      status: 'active',
      role: 'admin',
      lastLogin: '2025-04-22T16:45:00Z',
      created: '2024-02-15T09:30:00Z',
      department: 'Operations',
      permissions: ['user_management', 'class_management', 'report_access'],
      twoFactorEnabled: true,
      recentActivity: [
        { action: 'Updated class schedule', timestamp: '2025-04-23T08:12:00Z' },
        { action: 'Approved leave request', timestamp: '2025-04-22T11:05:00Z' },
        { action: 'Created new parent account', timestamp: '2025-04-21T15:38:00Z' }
      ]
    },
    {
      id: 3,
      name: 'Ali Hassan',
      email: 'ali@swimacademy.com',
      phone: '+92 345 5557777',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      status: 'inactive',
      role: 'admin',
      lastLogin: '2025-03-15T10:22:00Z',
      created: '2024-03-10T14:20:00Z',
      department: 'Finance',
      permissions: ['payment_management', 'report_access'],
      twoFactorEnabled: false,
      recentActivity: [
        { action: 'Generated financial report', timestamp: '2025-03-15T09:47:00Z' },
        { action: 'Processed refund payment', timestamp: '2025-03-14T16:33:00Z' },
        { action: 'Updated payment settings', timestamp: '2025-03-14T14:22:00Z' }
      ]
    }
  ];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewAdmin = (admin: any) => {
    setSelectedAdmin(admin);
    setDetailsDialogOpen(true);
  };

  const handleDeleteDialog = (admin: any) => {
    setSelectedAdmin(admin);
    setDeleteDialogOpen(true);
  };

  const handlePasswordResetDialog = (admin: any) => {
    setSelectedAdmin(admin);
    setPasswordResetDialogOpen(true);
  };

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

  // Get role display name
  const getRoleName = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Administrator';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ');
    }
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <SupervisorAccountIcon fontSize="small" />;
      case 'admin':
        return <AdminPanelSettingsIcon fontSize="small" />;
      default:
        return <VerifiedUserIcon fontSize="small" />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Admin Users</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/users/new?role=admin"
        >
          Add Admin
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              placeholder="Search by name, email, phone or department..."
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
          </Box>
        </CardContent>
      </Card>

      {/* Admins Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="admin users table">
          <TableHead>
            <TableRow>
              <TableCell>Admin User</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No admin users found
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={admin.avatar} alt={admin.name} sx={{ mr: 2 }} />
                        <Typography variant="body1">{admin.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{admin.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{admin.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getRoleIcon(admin.role)}
                        label={getRoleName(admin.role)}
                        color={admin.role === 'super_admin' ? 'secondary' : 'primary'}
                        size="small"
                      />
                      {admin.twoFactorEnabled && (
                        <Chip
                          icon={<SecurityIcon />}
                          label="2FA"
                          color="success"
                          size="small"
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{admin.department}</TableCell>
                    <TableCell>
                      <Chip
                        label={admin.status === 'active' ? 'Active' : 'Inactive'}
                        color={admin.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(admin.lastLogin)}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="view" onClick={() => handleViewAdmin(admin)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="edit" component={Link} to={`/users/edit/${admin.id}`}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="reset password" onClick={() => handlePasswordResetDialog(admin)}>
                        <LockResetIcon fontSize="small" />
                      </IconButton>
                      {admin.role !== 'super_admin' && (
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteDialog(admin)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAdmins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Admin Details Dialog */}
      {selectedAdmin && (
        <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Admin User Details</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Admin Info */}
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={selectedAdmin.avatar}
                  alt={selectedAdmin.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h6">{selectedAdmin.name}</Typography>
                <Chip
                  icon={getRoleIcon(selectedAdmin.role)}
                  label={getRoleName(selectedAdmin.role)}
                  color={selectedAdmin.role === 'super_admin' ? 'secondary' : 'primary'}
                  sx={{ mt: 1 }}
                />
                <Chip
                  label={selectedAdmin.status === 'active' ? 'Active' : 'Inactive'}
                  color={selectedAdmin.status === 'active' ? 'success' : 'default'}
                  size="small"
                  sx={{ mt: 1 }}
                />
                
                <Box sx={{ mt: 2, width: '100%' }}>
                  <Typography variant="subtitle2" gutterBottom>Contact Information</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedAdmin.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedAdmin.phone}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, width: '100%' }}>
                  <Typography variant="subtitle2" gutterBottom>Account Information</Typography>
                  <Typography variant="body2">Department: {selectedAdmin.department}</Typography>
                  <Typography variant="body2">Created: {formatDate(selectedAdmin.created)}</Typography>
                  <Typography variant="body2">Last Login: {formatDate(selectedAdmin.lastLogin)}</Typography>
                  <Typography variant="body2">2FA Enabled: {selectedAdmin.twoFactorEnabled ? 'Yes' : 'No'}</Typography>
                </Box>
              </Grid>
              
              {/* Permissions and Activity */}
              <Grid item xs={12} md={8}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Permissions
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {selectedAdmin.permissions.map((permission: string) => (
                    <Chip
                      key={permission}
                      label={permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      sx={{ mr: 1, mb: 1 }}
                      size="small"
                    />
                  ))}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Recent Activity
                </Typography>
                
                {selectedAdmin.recentActivity.length > 0 ? (
                  <Box>
                    {selectedAdmin.recentActivity.map((activity: any, index: number) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body2">{activity.action}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(activity.timestamp)}
                        </Typography>
                        {index < selectedAdmin.recentActivity.length - 1 && (
                          <Divider sx={{ mt: 1 }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No recent activity
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            <Button
              variant="outlined"
              startIcon={<LockResetIcon />}
              onClick={() => {
                setDetailsDialogOpen(false);
                setPasswordResetDialogOpen(true);
              }}
            >
              Reset Password
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              component={Link}
              to={`/users/edit/${selectedAdmin.id}`}
            >
              Edit User
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the admin user <strong>{selectedAdmin?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // Handle delete logic here
              setDeleteDialogOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog open={passwordResetDialogOpen} onClose={() => setPasswordResetDialogOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Are you sure you want to reset the password for <strong>{selectedAdmin?.name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A password reset link will be sent to {selectedAdmin?.email}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordResetDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Handle password reset logic here
              setPasswordResetDialogOpen(false);
            }}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsers;