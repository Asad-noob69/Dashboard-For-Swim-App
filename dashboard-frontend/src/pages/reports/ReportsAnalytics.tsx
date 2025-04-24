import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Chip,
  Stack,
  IconButton,
  Menu,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import SwimmingIcon from '@mui/icons-material/Pool';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableChartIcon from '@mui/icons-material/TableChart';

// Mock data for reports
const mockReportsList = [
  {
    id: 'r1',
    name: 'Monthly Attendance Report',
    type: 'attendance',
    createdAt: '2025-04-01',
    lastRun: '2025-04-20',
    status: 'available',
    icon: <SwimmingIcon />,
  },
  {
    id: 'r2',
    name: 'Revenue Report',
    type: 'financial',
    createdAt: '2025-03-15',
    lastRun: '2025-04-15',
    status: 'available',
    icon: <AttachMoneyIcon />,
  },
  {
    id: 'r3',
    name: 'New Registrations',
    type: 'students',
    createdAt: '2025-04-01',
    lastRun: '2025-04-20',
    status: 'available',
    icon: <PersonAddIcon />,
  },
  {
    id: 'r4',
    name: 'Class Occupancy',
    type: 'classes',
    createdAt: '2025-03-01',
    lastRun: '2025-04-15',
    status: 'available',
    icon: <PeopleIcon />,
  },
  {
    id: 'r5',
    name: 'Student Progress Summary',
    type: 'progress',
    createdAt: '2025-04-10',
    lastRun: '2025-04-18',
    status: 'available',
    icon: <TrendingUpIcon />,
  },
];

// Mock data for KPIs
const mockKPIs = {
  totalStudents: {
    value: 145,
    trend: +12,
    period: 'vs last month',
  },
  activeClasses: {
    value: 24,
    trend: +3,
    period: 'vs last month',
  },
  revenue: {
    value: 345000,
    trend: +8.5,
    period: 'vs last month',
    currency: 'PKR',
  },
  attendance: {
    value: 87,
    trend: -2.3,
    period: 'vs last month',
    unit: '%',
  },
  newRegistrations: {
    value: 28,
    trend: +40,
    period: 'vs last month',
  },
  occupancyRate: {
    value: 92,
    trend: +5,
    period: 'vs last month',
    unit: '%',
  },
};

// Mock data for charts (placeholder content)
const mockChartData = {
  dailyAttendance: [
    { day: 'Mon', count: 78 },
    { day: 'Tue', count: 85 },
    { day: 'Wed', count: 92 },
    { day: 'Thu', count: 88 },
    { day: 'Fri', count: 95 },
    { day: 'Sat', count: 90 },
    { day: 'Sun', count: 75 },
  ],
  classDistribution: [
    { name: 'Learn to Swim', students: 45, percentage: 31 },
    { name: 'Intermediate Swim', students: 38, percentage: 26 },
    { name: 'Water Safety', students: 25, percentage: 17 },
    { name: 'Advanced Techniques', students: 20, percentage: 14 },
    { name: 'Competitive Training', students: 17, percentage: 12 },
  ],
  revenueByMonth: [
    { month: 'Jan', amount: 250000 },
    { month: 'Feb', amount: 285000 },
    { month: 'Mar', amount: 320000 },
    { month: 'Apr', amount: 345000 },
  ],
};

// Interface for TabPanel props
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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `report-tab-${index}`,
    'aria-controls': `report-tabpanel-${index}`,
  };
}

const ReportsAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [reportSettings, setReportSettings] = useState({
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
  });
  
  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  // Tab change handler
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle report selection
  const handleReportSelect = (reportId: string) => {
    setSelectedReport(reportId);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get selected report details
  const getSelectedReport = () => {
    return mockReportsList.find(report => report.id === selectedReport);
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
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Reports & Analytics</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<TableChartIcon />}
            sx={{ mr: 1 }}
          >
            Create Report
          </Button>
        </Box>
      </Box>

      {/* KPI Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Key Performance Indicators</Typography>
        <Grid container spacing={3}>
          {/* Total Students */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">Total Students</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {formatNumber(mockKPIs.totalStudents.value)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {mockKPIs.totalStudents.trend > 0 ? (
                    <TrendingUpIcon fontSize="small" color="success" />
                  ) : (
                    <TrendingDownIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="caption" 
                    color={mockKPIs.totalStudents.trend > 0 ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    {mockKPIs.totalStudents.trend > 0 ? '+' : ''}{mockKPIs.totalStudents.trend}% {mockKPIs.totalStudents.period}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Active Classes */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">Active Classes</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {mockKPIs.activeClasses.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {mockKPIs.activeClasses.trend > 0 ? (
                    <TrendingUpIcon fontSize="small" color="success" />
                  ) : (
                    <TrendingDownIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="caption" 
                    color={mockKPIs.activeClasses.trend > 0 ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    {mockKPIs.activeClasses.trend > 0 ? '+' : ''}{mockKPIs.activeClasses.trend}% {mockKPIs.activeClasses.period}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Revenue */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">Monthly Revenue</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  PKR {formatNumber(mockKPIs.revenue.value)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {mockKPIs.revenue.trend > 0 ? (
                    <TrendingUpIcon fontSize="small" color="success" />
                  ) : (
                    <TrendingDownIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="caption" 
                    color={mockKPIs.revenue.trend > 0 ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    {mockKPIs.revenue.trend > 0 ? '+' : ''}{mockKPIs.revenue.trend}% {mockKPIs.revenue.period}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Attendance Rate */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">Attendance Rate</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {mockKPIs.attendance.value}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {mockKPIs.attendance.trend > 0 ? (
                    <TrendingUpIcon fontSize="small" color="success" />
                  ) : (
                    <TrendingDownIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="caption" 
                    color={mockKPIs.attendance.trend > 0 ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    {mockKPIs.attendance.trend > 0 ? '+' : ''}{mockKPIs.attendance.trend}% {mockKPIs.attendance.period}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* New Registrations */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">New Registrations</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {mockKPIs.newRegistrations.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {mockKPIs.newRegistrations.trend > 0 ? (
                    <TrendingUpIcon fontSize="small" color="success" />
                  ) : (
                    <TrendingDownIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="caption" 
                    color={mockKPIs.newRegistrations.trend > 0 ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    {mockKPIs.newRegistrations.trend > 0 ? '+' : ''}{mockKPIs.newRegistrations.trend}% {mockKPIs.newRegistrations.period}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Occupancy Rate */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">Class Occupancy</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {mockKPIs.occupancyRate.value}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {mockKPIs.occupancyRate.trend > 0 ? (
                    <TrendingUpIcon fontSize="small" color="success" />
                  ) : (
                    <TrendingDownIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="caption" 
                    color={mockKPIs.occupancyRate.trend > 0 ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    {mockKPIs.occupancyRate.trend > 0 ? '+' : ''}{mockKPIs.occupancyRate.trend}% {mockKPIs.occupancyRate.period}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Report Selection Sidebar */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Available Reports</Typography>
              <List sx={{ p: 0 }}>
                {mockReportsList.map((report) => (
                  <ListItem
                    disablePadding
                    key={report.id}
                    secondaryAction={
                      <IconButton edge="end" size="small">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton 
                      selected={selectedReport === report.id}
                      onClick={() => handleReportSelect(report.id)}
                      sx={{ borderRadius: 1 }}
                    >
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        {report.icon}
                      </Box>
                      <ListItemText 
                        primary={report.name} 
                        secondary={`Last run: ${formatDate(report.lastRun)}`} 
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Chart Types</Typography>
              <List sx={{ p: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ borderRadius: 1 }}>
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <BarChartIcon />
                    </Box>
                    <ListItemText primary="Bar Charts" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ borderRadius: 1 }}>
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <PieChartIcon />
                    </Box>
                    <ListItemText primary="Pie Charts" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Report Content Area */}
        <Grid item xs={12} md={9}>
          {selectedReport ? (
            <Card>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
                  <Typography variant="h6">{getSelectedReport()?.name}</Typography>
                  <Box>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <PrintIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <FileDownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <ShareIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ ml: 1 }}
                      onClick={handleOpenMenu}
                      aria-controls={isMenuOpen ? 'report-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={isMenuOpen ? 'true' : undefined}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      id="report-menu"
                      anchorEl={menuAnchorEl}
                      open={isMenuOpen}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'report-options-button',
                      }}
                    >
                      <MenuItem onClick={handleCloseMenu}>Edit Report</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>Duplicate</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>Schedule</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                    </Menu>
                  </Box>
                </Box>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ px: 3 }}
                >
                  <Tab label="Charts" {...a11yProps(0)} />
                  <Tab label="Data Tables" {...a11yProps(1)} />
                  <Tab label="Settings" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <CardContent>
                <TabPanel value={tabValue} index={0}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {getSelectedReport()?.name} - Visualization
                  </Typography>
                  
                  {/* Date Range Selection */}
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Typography variant="body1">Date Range:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Start Date"
                            value={dateRange.startDate}
                            onChange={(newValue) => setDateRange({ ...dateRange, startDate: newValue })}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="End Date"
                            value={dateRange.endDate}
                            onChange={(newValue) => setDateRange({ ...dateRange, endDate: newValue })}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" size="small">Apply</Button>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Charts Placeholder */}
                  <Paper sx={{ p: 3, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {getSelectedReport()?.type === 'attendance' && 'Attendance Chart Visualization'}
                      {getSelectedReport()?.type === 'financial' && 'Revenue Chart Visualization'}
                      {getSelectedReport()?.type === 'students' && 'New Registrations Chart Visualization'}
                      {getSelectedReport()?.type === 'classes' && 'Class Occupancy Chart Visualization'}
                      {getSelectedReport()?.type === 'progress' && 'Student Progress Chart Visualization'}
                    </Typography>
                  </Paper>

                  {/* Chart Data Summary */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Summary Statistics</Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">Average</TableCell>
                                <TableCell align="right">85.4%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Median</TableCell>
                                <TableCell align="right">88.0%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Maximum</TableCell>
                                <TableCell align="right">95.0%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Minimum</TableCell>
                                <TableCell align="right">75.0%</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Key Insights</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText primary="Highest attendance on Friday (95%)" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Lowest attendance on Sunday (75%)" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="2.5% overall increase from previous month" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Weekend attendance lower than weekday average" />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {getSelectedReport()?.name} - Data Tables
                  </Typography>
                  
                  {/* Data Tables */}
                  {getSelectedReport()?.type === 'attendance' && (
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Students Present</TableCell>
                            <TableCell>Total Students</TableCell>
                            <TableCell>Attendance Rate</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mockChartData.dailyAttendance.map((row) => (
                            <TableRow key={row.day}>
                              <TableCell>{row.day}</TableCell>
                              <TableCell>{row.count}</TableCell>
                              <TableCell>100</TableCell>
                              <TableCell>{row.count}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  
                  {getSelectedReport()?.type === 'classes' && (
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Class Name</TableCell>
                            <TableCell align="right">Students</TableCell>
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Occupancy</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mockChartData.classDistribution.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell>{row.name}</TableCell>
                              <TableCell align="right">{row.students}</TableCell>
                              <TableCell align="right">{Math.round(row.students / (row.percentage / 100))}</TableCell>
                              <TableCell align="right">{row.percentage}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  
                  {getSelectedReport()?.type === 'financial' && (
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Month</TableCell>
                            <TableCell align="right">Revenue (PKR)</TableCell>
                            <TableCell align="right">Change</TableCell>
                            <TableCell align="right">% Change</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mockChartData.revenueByMonth.map((row, index) => (
                            <TableRow key={row.month}>
                              <TableCell>{row.month}</TableCell>
                              <TableCell align="right">{formatNumber(row.amount)}</TableCell>
                              <TableCell align="right">
                                {index > 0 ? formatNumber(row.amount - mockChartData.revenueByMonth[index - 1].amount) : '-'}
                              </TableCell>
                              <TableCell align="right">
                                {index > 0 ? 
                                  `${(((row.amount - mockChartData.revenueByMonth[index - 1].amount) / mockChartData.revenueByMonth[index - 1].amount) * 100).toFixed(1)}%` 
                                  : '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6" sx={{ mb: 3 }}>Report Settings</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Report Format</InputLabel>
                        <Select
                          value={reportSettings.format}
                          label="Report Format"
                          onChange={(e) => setReportSettings({...reportSettings, format: e.target.value as string})}
                        >
                          <MenuItem value="pdf">PDF</MenuItem>
                          <MenuItem value="excel">Excel</MenuItem>
                          <MenuItem value="csv">CSV</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Report Period</InputLabel>
                        <Select
                          defaultValue="monthly"
                          label="Report Period"
                        >
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="quarterly">Quarterly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                          <MenuItem value="custom">Custom</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Schedule Report</InputLabel>
                        <Select
                          defaultValue="manual"
                          label="Schedule Report"
                        >
                          <MenuItem value="manual">Run Manually</MenuItem>
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Content Options</Typography>
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <FormControl>
                                <Select
                                  multiple
                                  value={['charts', 'summary']}
                                  renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                      ))}
                                    </Box>
                                  )}
                                >
                                  <MenuItem value="charts">Charts</MenuItem>
                                  <MenuItem value="tables">Data Tables</MenuItem>
                                  <MenuItem value="summary">Summary</MenuItem>
                                  <MenuItem value="insights">Insights</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </FormControl>
                        <Box sx={{ mb: 2 }}>
                          <Button variant="contained" fullWidth>
                            Save Settings
                          </Button>
                        </Box>
                        <Button variant="outlined" fullWidth>
                          Reset to Defaults
                        </Button>
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
              <CardContent sx={{ textAlign: 'center', maxWidth: 400 }}>
                <Typography variant="h5" gutterBottom>
                  Select a Report
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Choose a report from the left sidebar to view detailed analytics and insights.
                </Typography>
                <Button variant="outlined" startIcon={<TableChartIcon />}>
                  Create New Report
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsAnalytics;