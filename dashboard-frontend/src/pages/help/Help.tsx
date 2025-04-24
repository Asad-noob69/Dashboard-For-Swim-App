import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SchoolIcon from '@mui/icons-material/School';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArticleIcon from '@mui/icons-material/Article';
import QuizIcon from '@mui/icons-material/Quiz';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// Sample FAQ data
const faqData = [
  {
    id: 1,
    question: 'How do I register a new student?',
    answer: 'To register a new student, navigate to the "Students" section in the sidebar, then click on "Student Management". From there, click on the "Add Student" button and fill out the registration form with all the necessary information. Once completed, click "Save" to add the student to the system.',
    category: 'students',
  },
  {
    id: 2,
    question: 'How do I schedule a new class?',
    answer: 'To schedule a new class, go to the "Classes" section and select "Class Management". Click on "Create Class" and fill out the class details including name, instructor, schedule, capacity, and other requirements. After setting all details, click "Create" to add the class to the system.',
    category: 'classes',
  },
  {
    id: 3,
    question: 'How do I process a payment?',
    answer: 'To process a payment, navigate to the "Payments" section and click "Payment Management". From there, you can select a student, choose the payment type, enter the amount, and click "Process Payment". You can also generate receipts and view payment history from this section.',
    category: 'payments',
  },
  {
    id: 4,
    question: 'How do I view student attendance reports?',
    answer: 'To view student attendance, go to the "Attendance" section and select "Attendance Management". You can filter attendance by class, date range, or student. The system will display attendance records based on your filters, which you can export as PDF or CSV if needed.',
    category: 'attendance',
  },
  {
    id: 5,
    question: 'How do I add a new instructor to the system?',
    answer: 'To add a new instructor, go to the "Instructors" section and click on "Instructor Management". Click the "Add Instructor" button and complete the form with the instructor\'s personal information, qualifications, availability, and contact details. Click "Save" to add them to the system.',
    category: 'instructors',
  },
  {
    id: 6,
    question: 'How do I track student progress?',
    answer: 'To track student progress, navigate to the "Progress" section and select "Progress Tracking". Choose a student from the list to view their progress across various skills and milestones. You can also add progress notes, update skill levels, and view historical progress data.',
    category: 'progress',
  },
  {
    id: 7,
    question: 'How do I generate reports?',
    answer: 'To generate reports, go to the "Reports" section. Choose from various report types including attendance, revenue, enrollment, and performance. Select your desired filters, date ranges, and output format (PDF, Excel, CSV). Click "Generate" to create your report.',
    category: 'reports',
  },
  {
    id: 8,
    question: 'How do I manage user permissions?',
    answer: 'To manage user permissions, go to "User Management" in the sidebar. Select a user account and click "Edit Permissions". From there, you can assign or revoke specific permissions based on user roles. Common roles include Admin, Instructor, Front Desk, and Reports Only access levels.',
    category: 'users',
  },
  {
    id: 9,
    question: 'How do I set up automatic notifications?',
    answer: 'To set up notifications, navigate to the "Notifications" section. You can configure notification rules for events like payment reminders, class schedule changes, or attendance alerts. Select the delivery method (email, SMS, or in-app), recipient groups, and frequency for each notification type.',
    category: 'notifications',
  },
  {
    id: 10,
    question: 'How do I update the system settings?',
    answer: 'To update system settings, click on your profile icon in the top-right corner and select "Settings". From there, you can modify organization information, branding elements, payment gateways, notification preferences, and other system-wide configurations.',
    category: 'settings',
  },
];

// Sample tutorials data
const tutorialData = [
  {
    id: 1,
    title: 'Getting Started with the Dashboard',
    description: 'Learn the basics of navigating the dashboard and accessing key features.',
    duration: '5 min',
    thumbnail: 'https://source.unsplash.com/random/300x200/?dashboard',
    type: 'video',
  },
  {
    id: 2,
    title: 'Student Registration Process',
    description: 'Step-by-step guide to registering new students in the system.',
    duration: '8 min',
    thumbnail: 'https://source.unsplash.com/random/300x200/?registration',
    type: 'video',
  },
  {
    id: 3,
    title: 'Attendance Tracking Guide',
    description: 'Learn how to efficiently track and manage student attendance.',
    duration: '6 min',
    thumbnail: 'https://source.unsplash.com/random/300x200/?attendance',
    type: 'video',
  },
  {
    id: 4,
    title: 'Class Scheduling Tutorial',
    description: 'Master the process of creating and managing class schedules.',
    duration: '10 min',
    thumbnail: 'https://source.unsplash.com/random/300x200/?schedule',
    type: 'video',
  },
  {
    id: 5,
    title: 'Payment Processing',
    description: 'Complete guide to processing payments and managing financial records.',
    duration: '12 min',
    thumbnail: 'https://source.unsplash.com/random/300x200/?payment',
    type: 'video',
  },
  {
    id: 6,
    title: 'Reporting and Analytics',
    description: 'Learn how to generate insightful reports and analyze key metrics.',
    duration: '15 min',
    thumbnail: 'https://source.unsplash.com/random/300x200/?analytics',
    type: 'video',
  },
];

// Sample documentation data
const documentationData = [
  {
    id: 1,
    title: 'User Manual',
    description: 'Complete guide to using the swimming school management system',
    icon: <DescriptionIcon />,
    link: '/docs/user-manual.pdf',
  },
  {
    id: 2,
    title: 'Administrator Guide',
    description: 'Advanced settings and system configuration for administrators',
    icon: <ArticleIcon />,
    link: '/docs/admin-guide.pdf',
  },
  {
    id: 3,
    title: 'Quick Start Guide',
    description: 'Get up and running with the basics in minutes',
    icon: <FileCopyIcon />,
    link: '/docs/quick-start.pdf',
  },
  {
    id: 4,
    title: 'Reports Reference',
    description: 'Detailed explanations of all available reports and metrics',
    icon: <DescriptionIcon />,
    link: '/docs/reports-reference.pdf',
  },
];

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
      id={`help-tabpanel-${index}`}
      aria-labelledby={`help-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `help-tab-${index}`,
    'aria-controls': `help-tabpanel-${index}`,
  };
}

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Filter FAQs based on search term and selected category
  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch = 
      searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      !selectedCategory || 
      faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter tutorials based on search term
  const filteredTutorials = tutorialData.filter((tutorial) =>
    searchTerm === '' || 
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get all unique categories from FAQ data
  const categories = Array.from(new Set(faqData.map(faq => faq.category)));

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Help Center</Typography>
        <Typography variant="body1" color="text.secondary">
          Find answers to common questions, watch tutorials, or contact support for assistance.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search for help topics, tutorials, or documentation..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Quick Help Cards */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <HelpOutlineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>FAQs</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Browse our frequently asked questions
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setTabValue(0)}
                >
                  View FAQs
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <VideoLibraryIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Tutorials</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Watch step-by-step tutorial videos
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setTabValue(1)}
                >
                  View Tutorials
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Documentation</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Read detailed user guides and manuals
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setTabValue(2)}
                >
                  View Docs
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <ContactSupportIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Contact Support</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get in touch with our support team
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setTabValue(3)}
                >
                  Contact Us
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="help center tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<QuizIcon />} label="FAQs" {...a11yProps(0)} />
          <Tab icon={<VideoLibraryIcon />} label="Video Tutorials" {...a11yProps(1)} />
          <Tab icon={<ArticleIcon />} label="Documentation" {...a11yProps(2)} />
          <Tab icon={<ContactSupportIcon />} label="Contact Support" {...a11yProps(3)} />
        </Tabs>
      </Box>

      {/* FAQs Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Categories sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton 
                    selected={selectedCategory === null}
                    onClick={() => setSelectedCategory(null)}
                  >
                    <ListItemIcon>
                      <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="All FAQs" />
                  </ListItemButton>
                </ListItem>
                
                {categories.map((category) => (
                  <ListItem key={category} disablePadding>
                    <ListItemButton 
                      selected={selectedCategory === category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <ListItemIcon>
                        {category === 'students' ? <SchoolIcon /> : 
                         category === 'classes' ? <LiveHelpIcon /> : 
                         <HelpOutlineIcon />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={category.charAt(0).toUpperCase() + category.slice(1)} 
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          {/* FAQ Accordions */}
          <Grid item xs={12} md={9}>
            {selectedCategory && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">
                  Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => setSelectedCategory(null)}
                  sx={{ mt: 1 }}
                >
                  Clear filter
                </Button>
              </Box>
            )}
            
            {filteredFaqs.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <HelpOutlineIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6">
                  No FAQs found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
              </Paper>
            ) : (
              filteredFaqs.map((faq) => (
                <Accordion key={faq.id} sx={{ mb: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-${faq.id}-content`}
                    id={`faq-${faq.id}-header`}
                  >
                    <Typography fontWeight="medium">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{faq.answer}</Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Was this helpful?{' '}
                        <Link href="#" underline="hover">Yes</Link> / <Link href="#" underline="hover">No</Link>
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Grid>
        </Grid>
      </TabPanel>

      {/* Video Tutorials Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {filteredTutorials.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <VideoLibraryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6">
                  No tutorials found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria
                </Typography>
              </Paper>
            </Grid>
          ) : (
            filteredTutorials.map((tutorial) => (
              <Grid item xs={12} sm={6} md={4} key={tutorial.id}>
                <Card sx={{ height: '100%' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={tutorial.thumbnail}
                      alt={tutorial.title}
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <PlayCircleOutlineIcon sx={{ fontSize: 60, color: 'white' }} />
                    </Box>
                    <Chip
                      label={tutorial.duration}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{tutorial.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{tutorial.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<PlayCircleOutlineIcon />}>
                      Watch Tutorial
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      {/* Documentation Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {documentationData.map((doc) => (
            <Grid item xs={12} sm={6} lg={3} key={doc.id}>
              <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
                    {doc.icon}
                  </Avatar>
                </Box>
                <Typography variant="h6" align="center" gutterBottom>
                  {doc.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2, flexGrow: 1 }}>
                  {doc.description}
                </Typography>
                <Button variant="outlined" fullWidth startIcon={<FileCopyIcon />}>
                  View Document
                </Button>
              </Paper>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>Additional Resources</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="System Requirements" 
                    secondary="Technical specifications and requirements" 
                  />
                  <Button variant="text">View</Button>
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="API Documentation" 
                    secondary="Technical API reference for developers" 
                  />
                  <Button variant="text">View</Button>
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Release Notes" 
                    secondary="Latest updates and changes to the system" 
                  />
                  <Button variant="text">View</Button>
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Troubleshooting Guide" 
                    secondary="Common issues and their solutions" 
                  />
                  <Button variant="text">View</Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Contact Support Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Contact Us</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Need help? Our support team is ready to assist you with any questions or issues.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Email" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Subject"
                    select
                    fullWidth
                    defaultValue="technical"
                  >
                    <MenuItem value="technical">Technical Support</MenuItem>
                    <MenuItem value="billing">Billing Question</MenuItem>
                    <MenuItem value="feature">Feature Request</MenuItem>
                    <MenuItem value="bug">Report a Bug</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" fullWidth>
                    Submit Request
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Contact Information</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email Support" 
                    secondary="support@swimschoolmanager.com" 
                  />
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone Support" 
                    secondary="(555) 123-4567" 
                  />
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <ChatIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Live Chat" 
                    secondary="Available Monday to Friday, 9 AM - 5 PM" 
                  />
                  <Button variant="contained" size="small">
                    Start Chat
                  </Button>
                </ListItem>
              </List>
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Support Hours</Typography>
              <Typography variant="body2" paragraph>
                Our support team is available during the following hours:
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Technical Support:</Typography>
                <Typography variant="body2">Monday to Friday: 8 AM - 8 PM</Typography>
                <Typography variant="body2">Saturday: 10 AM - 4 PM</Typography>
                <Typography variant="body2">Sunday: Closed</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2">Emergency Support:</Typography>
                <Typography variant="body2">Available 24/7 for critical issues</Typography>
                <Typography variant="caption" color="text.secondary">
                  Please note that emergency support is reserved for system-critical issues only.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Help;