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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Stack,
  Badge
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
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';

const ParentUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordResetDialogOpen, setPasswordResetDialogOpen] = useState(false);

  // Mock data for parent users
  const parents = [
    {
      id: 1,
      name: 'Imran Ali',
      email: 'imran.ali@example.com',
      phone: '+92 300 1234567',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      status: 'active',
      lastLogin: '2025-04-21T18:45:00Z',
      address: {
        street: '123 Main Street',
        city: 'Karachi',
        state: 'Sindh',
        postalCode: '74000'
      },
      children: [
        {
          id: 101,
          name: 'Ahmed Ali',
          age: 8,
          avatar: 'https://randomuser.me/api/portraits/kids/1.jpg',
          classes: [
            { id: 'c1', name: 'Learn to Swim' },
            { id: 'c3', name: 'Water Safety' }
          ]
        },
        {
          id: 102,
          name: 'Sara Ali',
          age: 10,
          avatar: 'https://randomuser.me/api/portraits/kids/2.jpg',
          classes: [
            { id: 'c2', name: 'Intermediate Swim' }
          ]
        }
      ],
      paymentMethod: {
        type: 'credit_card',
        last4: '4242',
        expiryDate: '05/27'
      },
      outstandingBalance: 0,
      paymentHistory: [
        { id: 'p1', amount: 5000, date: '2025-04-01T10:00:00Z', status: 'completed' },
        { id: 'p2', amount: 5000, date: '2025-03-01T10:00:00Z', status: 'completed' }
      ]
    },
    {
      id: 2,
      name: 'Fatima Khan',
      email: 'fatima.khan@example.com',
      phone: '+92 300 7654321',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      status: 'active',
      lastLogin: '2025-04-20T09:30:00Z',
      address: {
        street: '45 Park Avenue',
        city: 'Lahore',
        state: 'Punjab',
        postalCode: '54000'
      },
      children: [
        {
          id: 103,
          name: 'Hassan Khan',
          age: 7,
          avatar: 'https://randomuser.me/api/portraits/kids/3.jpg',
          classes: [
            { id: 'c1', name: 'Learn to Swim' }
          ]
        }
      ],
      paymentMethod: {
        type: 'bank_transfer',
        bankName: 'HBL',
        accountLast4: '7890'
      },
      outstandingBalance: 5000,
      paymentHistory: [
        { id: 'p3', amount: 5000, date: '2025-03-01T10:00:00Z', status: 'completed' }
      ]
    },
    {
      id: 3,
      name: 'Asad Ahmed',
      email: 'asad.ahmed@example.com',
      phone: '+92 300 9876543',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      status: 'inactive',
      lastLogin: '2025-03-15T14:20:00Z',
      address: {
        street: '78 Canal View',
        city: 'Islamabad',
        state: 'Federal',
        postalCode: '44000'
      },
      children: [
        {
          id: 104,
          name: 'Bilal Ahmed',
          age: 12,
          avatar: 'https://randomuser.me/api/portraits/kids/4.jpg',
          classes: [
            { id: 'c5', name: 'Competitive Training' }
          ]
        },
        {
          id: 105,
          name: 'Amna Ahmed',
          age: 6,
          avatar: 'https://randomuser.me/api/portraits/kids/5.jpg',
          classes: []
        }
      ],
      paymentMethod: null,
      outstandingBalance: 10000,
      paymentHistory: []
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

  const filteredParents = parents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.children.some(child => child.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewParent = (parent: any) => {
    setSelectedParent(parent);
    setDialogOpen(true);
  };

  const handleDeleteDialog = (parent: any) => {
    setSelectedParent(parent);
    setDeleteDialogOpen(true);
  };

  const handlePasswordResetDialog = (parent: any) => {
    setSelectedParent(parent);
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Count total children
  const totalChildrenCount = (parent: any) => {
    return parent.children.length;
  };

  // Count total enrolled children
  const enrolledChildrenCount = (parent: any) => {
    return parent.children.filter(child => child.classes.length > 0).length;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Parent Users</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/users/new?role=parent"
        >
          Add Parent
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              placeholder="Search by name, email, phone or child's name..."
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

      {/* Parents Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="parent users table">
          <TableHead>
            <TableRow>
              <TableCell>Parent</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Children</TableCell>
              <TableCell>Payment Info</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No parents found
                </TableCell>
              </TableRow>
            ) : (
              filteredParents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={parent.avatar} alt={parent.name} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="body1">{parent.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last login: {formatDate(parent.lastLogin)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{parent.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{parent.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        badgeContent={totalChildrenCount(parent)} 
                        color="primary" 
                        sx={{ mr: 1 }}
                      >
                        <ChildCareIcon color="action" />
                      </Badge>
                      <Typography variant="body2" component="span">
                        {enrolledChildrenCount(parent)} enrolled
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {parent.outstandingBalance > 0 ? (
                        <Chip
                          label={`Outstanding: ${formatCurrency(parent.outstandingBalance)}`}
                          color="warning"
                          size="small"
                        />
                      ) : (
                        <Chip
                          label="Paid"
                          color="success"
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={parent.status === 'active' ? 'Active' : 'Inactive'}
                        color={parent.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="view" onClick={() => handleViewParent(parent)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="edit" component={Link} to={`/users/edit/${parent.id}`}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="reset password" onClick={() => handlePasswordResetDialog(parent)}>
                        <LockResetIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteDialog(parent)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredParents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Parent View Dialog */}
      {selectedParent && (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Parent Details</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Parent Info */}
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={selectedParent.avatar}
                  alt={selectedParent.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h6">{selectedParent.name}</Typography>
                <Chip
                  label={selectedParent.status === 'active' ? 'Active' : 'Inactive'}
                  color={selectedParent.status === 'active' ? 'success' : 'default'}
                  size="small"
                  sx={{ mt: 1 }}
                />
                <Box sx={{ mt: 2, width: '100%' }}>
                  <Typography variant="subtitle2" gutterBottom>Contact Information</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedParent.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedParent.phone}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, width: '100%' }}>
                  <Typography variant="subtitle2" gutterBottom>Address</Typography>
                  <Typography variant="body2">{selectedParent.address.street}</Typography>
                  <Typography variant="body2">
                    {selectedParent.address.city}, {selectedParent.address.state} {selectedParent.address.postalCode}
                  </Typography>
                </Box>
              </Grid>
              
              {/* Children and Payment Info */}
              <Grid item xs={12} md={8}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ChildCareIcon fontSize="small" sx={{ mr: 1 }} />
                  Children
                </Typography>
                
                {selectedParent.children.length > 0 ? (
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {selectedParent.children.map((child) => (
                      <React.Fragment key={child.id}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt={child.name} src={child.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" component="span">
                                  {child.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  ({child.age} years)
                                </Typography>
                              </Box>
                            }
                            secondary={
                              child.classes.length > 0 ? (
                                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                                  {child.classes.map((cls) => (
                                    <Chip 
                                      key={cls.id} 
                                      label={cls.name} 
                                      size="small" 
                                      variant="outlined" 
                                      color="primary"
                                    />
                                  ))}
                                </Stack>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  Not enrolled in any classes
                                </Typography>
                              )
                            }
                          />
                          <Button 
                            size="small" 
                            component={Link} 
                            to={`/students/${child.id}`} 
                            sx={{ alignSelf: 'flex-start', mt: 1 }}
                          >
                            View
                          </Button>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No children registered
                  </Typography>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PaymentIcon fontSize="small" sx={{ mr: 1 }} />
                  Payment Information
                </Typography>
                
                {selectedParent.paymentMethod ? (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Payment Method:</Typography>
                    <Typography variant="body2">
                      {selectedParent.paymentMethod.type === 'credit_card' ? (
                        `Credit Card ending in ${selectedParent.paymentMethod.last4} (Expires: ${selectedParent.paymentMethod.expiryDate})`
                      ) : (
                        `Bank Transfer (${selectedParent.paymentMethod.bankName}, Account ending in ${selectedParent.paymentMethod.accountLast4})`
                      )}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    No payment method on file
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Outstanding Balance:</Typography>
                  <Typography 
                    variant="subtitle2"
                    color={selectedParent.outstandingBalance > 0 ? 'error.main' : 'success.main'}
                  >
                    {formatCurrency(selectedParent.outstandingBalance)}
                  </Typography>
                </Box>

                {selectedParent.paymentHistory.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Recent Payments:</Typography>
                    <List dense>
                      {selectedParent.paymentHistory.map((payment) => (
                        <ListItem key={payment.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <ReceiptIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={formatCurrency(payment.amount)}
                            secondary={formatDate(payment.date)}
                          />
                          <Chip 
                            label={payment.status.toUpperCase()} 
                            color={payment.status === 'completed' ? 'success' : 'default'}
                            size="small" 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
            <Button
              variant="outlined"
              startIcon={<ChildCareIcon />}
              component={Link}
              to={`/students?parentId=${selectedParent.id}`}
            >
              View Children
            </Button>
            <Button
              variant="outlined"
              startIcon={<PaymentIcon />}
              component={Link}
              to={`/payments?parentId=${selectedParent.id}`}
            >
              View Payments
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              component={Link}
              to={`/users/edit/${selectedParent.id}`}
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
            Are you sure you want to delete the parent user <strong>{selectedParent?.name}</strong>? This action cannot be undone.
          </Typography>
          {selectedParent?.children.length > 0 && (
            <Typography color="error" sx={{ mt: 2 }}>
              Warning: This parent has {selectedParent.children.length} children registered in the system. Deleting this parent will remove these children from the system as well.
            </Typography>
          )}
          {selectedParent?.outstandingBalance > 0 && (
            <Typography color="error" sx={{ mt: 2 }}>
              Warning: This parent has an outstanding balance of {formatCurrency(selectedParent.outstandingBalance)}. Deleting this user will mark these payments as uncollectible.
            </Typography>
          )}
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
            Are you sure you want to reset the password for <strong>{selectedParent?.name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A password reset link will be sent to {selectedParent?.email}.
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

export default ParentUsers;