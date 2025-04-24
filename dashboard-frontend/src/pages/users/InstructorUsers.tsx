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
  ListItemText,
  Divider,
  Stack,
  Rating,
  LinearProgress
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
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import StarIcon from '@mui/icons-material/Star';

const InstructorUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordResetDialogOpen, setPasswordResetDialogOpen] = useState(false);

  // Mock data for instructor users
  const instructors = [
    {
      id: 1,
      name: 'Asad Khan',
      email: 'asad.khan@swimacademy.com',
      phone: '+92 300 1234567',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      status: 'active',
      specialty: ['Beginner Swim', 'Water Safety'],
      certifications: ['Red Cross WSI', 'CPR Certified', 'First Aid'],
      experience: '8 years',
      availability: {
        monday: ['09:00-14:00', '16:00-19:00'],
        tuesday: ['09:00-14:00'],
        wednesday: ['09:00-14:00', '16:00-19:00'],
        thursday: ['09:00-14:00'],
        friday: ['09:00-14:00', '16:00-19:00']
      },
      classes: [
        { id: 'c1', name: 'Learn to Swim', day: 'Monday', time: '16:00-17:00', students: 12 },
        { id: 'c3', name: 'Water Safety', day: 'Friday', time: '16:00-17:00', students: 8 }
      ],
      rating: 4.8,
      reviews: [
        { parentName: 'Imran Ali', rating: 5, comment: 'Great instructor, my kids love his classes!', date: '2025-04-10T10:30:00Z' },
        { parentName: 'Fatima Khan', rating: 4, comment: 'Very patient with beginners', date: '2025-03-22T14:15:00Z' }
      ],
      joinDate: '2023-06-15T08:00:00Z',
      lastLogin: '2025-04-22T18:45:00Z'
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      email: 'sara.ahmed@swimacademy.com',
      phone: '+92 333 9876543',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      status: 'active',
      specialty: ['Intermediate Swim', 'Competitive Swimming'],
      certifications: ['ASCA Level 2', 'CPR Certified', 'First Aid'],
      experience: '6 years',
      availability: {
        monday: ['14:00-20:00'],
        wednesday: ['14:00-20:00'],
        thursday: ['14:00-20:00'],
        saturday: ['09:00-14:00']
      },
      classes: [
        { id: 'c2', name: 'Intermediate Swim', day: 'Monday', time: '17:00-18:00', students: 10 },
        { id: 'c6', name: 'Stroke Technique', day: 'Thursday', time: '18:00-19:00', students: 6 }
      ],
      rating: 4.9,
      reviews: [
        { parentName: 'Ahmed Khan', rating: 5, comment: 'Excellent techniques teaching', date: '2025-04-15T16:20:00Z' },
        { parentName: 'Zainab Ali', rating: 5, comment: 'My child has improved so much', date: '2025-04-02T11:45:00Z' },
        { parentName: 'Usman Ahmed', rating: 4, comment: 'Great instructor, sometimes runs late', date: '2025-03-18T09:30:00Z' }
      ],
      joinDate: '2023-09-10T08:00:00Z',
      lastLogin: '2025-04-23T09:30:00Z'
    },
    {
      id: 3,
      name: 'Kamran Ali',
      email: 'kamran.ali@swimacademy.com',
      phone: '+92 345 5557777',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      status: 'active',
      specialty: ['Advanced Swim', 'Competitive Training'],
      certifications: ['ASCA Level 3', 'CPR Certified', 'First Aid', 'Lifeguard'],
      experience: '12 years',
      availability: {
        tuesday: ['14:00-20:00'],
        wednesday: ['14:00-20:00'],
        friday: ['14:00-20:00'],
        saturday: ['14:00-20:00'],
        sunday: ['09:00-14:00']
      },
      classes: [
        { id: 'c4', name: 'Advanced Techniques', day: 'Tuesday', time: '18:00-19:30', students: 5 },
        { id: 'c5', name: 'Competitive Training', day: 'Friday', time: '06:00-07:30', students: 8 },
        { id: 'c7', name: 'Competitive Training', day: 'Sunday', time: '10:00-12:00', students: 8 }
      ],
      rating: 4.7,
      reviews: [
        { parentName: 'Ali Hassan', rating: 5, comment: 'Expert in competitive training', date: '2025-04-20T18:00:00Z' },
        { parentName: 'Saad Khan', rating: 4, comment: 'Great coach, pushes students to excel', date: '2025-04-05T15:30:00Z' }
      ],
      joinDate: '2022-01-10T08:00:00Z',
      lastLogin: '2025-04-21T16:15:00Z'
    },
    {
      id: 4,
      name: 'Maryam Nawaz',
      email: 'maryam.nawaz@swimacademy.com',
      phone: '+92 321 1112222',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      status: 'inactive',
      specialty: ['Beginner Swim', 'Parent-Child Classes'],
      certifications: ['WSI Certified', 'CPR Certified', 'First Aid'],
      experience: '4 years',
      availability: {},
      classes: [],
      rating: 4.5,
      reviews: [
        { parentName: 'Hina Ahmed', rating: 5, comment: 'Great with young children', date: '2025-02-15T14:20:00Z' },
        { parentName: 'Asif Khan', rating: 4, comment: 'Very patient instructor', date: '2025-02-10T16:45:00Z' }
      ],
      joinDate: '2024-01-15T08:00:00Z',
      lastLogin: '2025-03-01T11:20:00Z'
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

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.specialty.some(sp => sp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewInstructor = (instructor: any) => {
    setSelectedInstructor(instructor);
    setDialogOpen(true);
  };

  const handleDeleteDialog = (instructor: any) => {
    setSelectedInstructor(instructor);
    setDeleteDialogOpen(true);
  };

  const handlePasswordResetDialog = (instructor: any) => {
    setSelectedInstructor(instructor);
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

  // Count total active classes
  const activeClassesCount = (instructor: any) => {
    return instructor.classes.length;
  };

  // Count total students
  const totalStudentsCount = (instructor: any) => {
    return instructor.classes.reduce((total: number, cls: any) => total + cls.students, 0);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Instructor Users</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/users/new?role=instructor"
        >
          Add Instructor
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              placeholder="Search by name, email, phone or specialty..."
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

      {/* Instructors Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="instructor users table">
          <TableHead>
            <TableRow>
              <TableCell>Instructor</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Classes</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstructors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No instructors found
                </TableCell>
              </TableRow>
            ) : (
              filteredInstructors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((instructor) => (
                  <TableRow key={instructor.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={instructor.avatar} alt={instructor.name} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="body1">{instructor.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {instructor.experience} experience
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{instructor.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{instructor.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {instructor.specialty.map((spec, index) => (
                          <Chip key={index} label={spec} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ClassIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">{activeClassesCount(instructor)} Classes</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <GroupIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">{totalStudentsCount(instructor)} Students</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating 
                          value={instructor.rating} 
                          readOnly 
                          size="small" 
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {instructor.rating}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {instructor.reviews.length} reviews
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={instructor.status === 'active' ? 'Active' : 'Inactive'}
                        color={instructor.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="view" onClick={() => handleViewInstructor(instructor)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="edit" component={Link} to={`/users/edit/${instructor.id}`}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="reset password" onClick={() => handlePasswordResetDialog(instructor)}>
                        <LockResetIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteDialog(instructor)}
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
          count={filteredInstructors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Instructor View Dialog */}
      {selectedInstructor && (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Instructor Details</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Instructor Info */}
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={selectedInstructor.avatar}
                  alt={selectedInstructor.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h6">{selectedInstructor.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Rating
                    value={selectedInstructor.rating}
                    readOnly
                    size="small"
                    precision={0.1}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({selectedInstructor.rating})
                  </Typography>
                </Box>
                <Chip
                  label={selectedInstructor.status === 'active' ? 'Active' : 'Inactive'}
                  color={selectedInstructor.status === 'active' ? 'success' : 'default'}
                  size="small"
                  sx={{ mt: 1 }}
                />
                
                <Box sx={{ mt: 2, width: '100%' }}>
                  <Typography variant="subtitle2" gutterBottom>Contact Information</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedInstructor.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedInstructor.phone}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, width: '100%' }}>
                  <Typography variant="subtitle2" gutterBottom>Experience & Qualifications</Typography>
                  <Typography variant="body2">Experience: {selectedInstructor.experience}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>Certifications:</Typography>
                  <Box sx={{ pl: 2 }}>
                    {selectedInstructor.certifications.map((cert: string, index: number) => (
                      <Typography key={index} variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        • {cert}
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>Specialties:</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                    {selectedInstructor.specialty.map((spec: string, index: number) => (
                      <Chip key={index} label={spec} size="small" />
                    ))}
                  </Stack>
                </Box>
              </Grid>
              
              {/* Schedule and Classes */}
              <Grid item xs={12} md={8}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Schedule
                </Typography>
                
                {Object.keys(selectedInstructor.availability).length > 0 ? (
                  <Grid container spacing={1} sx={{ mb: 3 }}>
                    {Object.entries(selectedInstructor.availability).map(([day, times]) => (
                      <Grid item xs={12} sm={6} md={4} key={day}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                              {day}
                            </Typography>
                            {Array.isArray(times) && times.map((time: string, idx: number) => (
                              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                                <Typography variant="body2">{time}</Typography>
                              </Box>
                            ))}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    No availability schedule set
                  </Typography>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Classes ({selectedInstructor.classes.length})
                </Typography>
                
                {selectedInstructor.classes.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Class</TableCell>
                          <TableCell>Day</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell>Students</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedInstructor.classes.map((cls: any) => (
                          <TableRow key={cls.id}>
                            <TableCell>{cls.name}</TableCell>
                            <TableCell>{cls.day}</TableCell>
                            <TableCell>{cls.time}</TableCell>
                            <TableCell>{cls.students}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    No classes assigned
                  </Typography>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Reviews ({selectedInstructor.reviews.length})
                </Typography>
                
                {selectedInstructor.reviews.length > 0 ? (
                  <List sx={{ width: '100%' }}>
                    {selectedInstructor.reviews.map((review: any, index: number) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" sx={{ px: 1 }}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle2">{review.parentName}</Typography>
                                <Rating value={review.rating} readOnly size="small" />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.primary" sx={{ my: 1 }}>
                                  {review.comment}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(review.date)}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < selectedInstructor.reviews.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No reviews yet
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
            <Button
              variant="outlined"
              startIcon={<ScheduleIcon />}
              component={Link}
              to={`/classes?instructorId=${selectedInstructor.id}`}
            >
              View Schedule
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              component={Link}
              to={`/users/edit/${selectedInstructor.id}`}
            >
              Edit Instructor
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the instructor <strong>{selectedInstructor?.name}</strong>? This action cannot be undone.
          </Typography>
          {selectedInstructor?.classes?.length > 0 && (
            <Typography color="error" sx={{ mt: 2 }}>
              Warning: This instructor is currently assigned to {selectedInstructor.classes.length} classes. 
              You will need to reassign these classes to other instructors.
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
            Are you sure you want to reset the password for <strong>{selectedInstructor?.name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A password reset link will be sent to {selectedInstructor?.email}.
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

export default InstructorUsers;