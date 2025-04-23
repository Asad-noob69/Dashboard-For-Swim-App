import { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Stack,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChildCareIcon from '@mui/icons-material/ChildCare';

// Import chart components
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

// Mock data for dashboard
const userStats = {
  totalStudents: 254,
  totalInstructors: 12,
  totalParents: 189,
  totalClasses: 45,
  activeClassesToday: 8,
  totalEnrollments: 312,
  waitlistStudents: 18,
  revenueThisMonth: 750000,
  revenueChangePercentage: 12.5,
  attendanceRate: 92,
  attendanceChangePercentage: 2.3
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Enrollment by age group chart data
  const enrollmentByAgeData = {
    labels: ['Toddler', 'Preschool', 'Elementary', 'Preteen', 'Teen', 'Adult'],
    datasets: [
      {
        label: 'Students',
        data: [35, 87, 65, 42, 18, 7],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
      },
    ],
  };

  // Revenue trend chart data
  const revenueTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (PKR)',
        data: [450000, 520000, 490000, 510000, 580000, 620000, 690000, 710000, 690000, 720000, 730000, 750000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  // Attendance by day chart data
  const attendanceByDayData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Attendance %',
        data: [88, 92, 94, 91, 89, 96, 94],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Class distribution by level
  const classByLevelData = {
    labels: ['Beginner', 'Intermediate', 'Advanced', 'Competitive'],
    datasets: [
      {
        label: 'Classes',
        data: [18, 14, 8, 5],
        backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0', '#FF6384'],
      },
    ],
  };

  // Recent activities mock data
  const recentActivities = [
    {
      id: 1,
      type: 'enrollment',
      message: 'Ali Khan enrolled in Advanced Swimming Class',
      time: '10 minutes ago',
      icon: <ChildCareIcon sx={{ color: '#36A2EB' }} />
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment of PKR 15,000 received from Fatima Ahmed',
      time: '35 minutes ago',
      icon: <AccountBalanceWalletIcon sx={{ color: '#4BC0C0' }} />
    },
    {
      id: 3,
      type: 'class',
      message: 'New class "Water Safety for Beginners" created',
      time: '2 hours ago',
      icon: <CalendarMonthIcon sx={{ color: '#FFCE56' }} />
    },
    {
      id: 4,
      type: 'instructor',
      message: 'Instructor Zainab Ali added new certification',
      time: '4 hours ago',
      icon: <SchoolIcon sx={{ color: '#FF6384' }} />
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Key Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Students
                  </Typography>
                  <Typography variant="h4">{userStats.totalStudents}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#36A2EB', width: 56, height: 56 }}>
                  <ChildCareIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Instructors
                  </Typography>
                  <Typography variant="h4">{userStats.totalInstructors}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#FF6384', width: 56, height: 56 }}>
                  <SchoolIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Active Classes
                  </Typography>
                  <Typography variant="h4">{userStats.totalClasses}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#FFCE56', width: 56, height: 56 }}>
                  <CalendarMonthIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Revenue (PKR)
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h4">{(userStats.revenueThisMonth).toLocaleString()}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {userStats.revenueChangePercentage > 0 ? (
                        <ArrowUpwardIcon fontSize="small" color="success" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" color="error" />
                      )}
                      <Typography
                        variant="body2"
                        color={userStats.revenueChangePercentage > 0 ? 'success.main' : 'error.main'}
                      >
                        {Math.abs(userStats.revenueChangePercentage)}%
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Avatar sx={{ bgcolor: '#4BC0C0', width: 56, height: 56 }}>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Trend
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                  }} 
                  data={revenueTrendData} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enrollment by Age Group
              </Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                <Doughnut 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                  }} 
                  data={enrollmentByAgeData} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance by Day
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                  }} 
                  data={attendanceByDayData} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Classes by Level
              </Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                <Doughnut 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                  }} 
                  data={classByLevelData} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity and Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <div key={activity.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{activity.icon}</Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={activity.message} 
                        secondary={activity.time} 
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Schedule
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                {userStats.activeClassesToday} classes scheduled today
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  10:00 AM - Learn to Swim (Beginners)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Instructor: Ahmad Hasan • 12 students • Pool 2
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  1:30 PM - Intermediate Techniques
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Instructor: Amina Khan • 8 students • Pool 1
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  4:15 PM - Advanced Swimming
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Instructor: Zainab Ali • 6 students • Pool 3
                </Typography>
              </Box>
              
              <Button variant="contained" color="primary" fullWidth>
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;