import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/users/UserManagement';
import AdminUsers from './pages/users/AdminUsers';
import InstructorUsers from './pages/users/InstructorUsers';
import ParentUsers from './pages/users/ParentUsers';
import InstructorManagement from './pages/instructors/InstructorManagement';
import ClassManagement from './pages/classes/ClassManagement';
import ClassesList from './pages/classes/ClassesList';
import ClassSchedule from './pages/classes/ClassSchedule';
import WaitlistManagement from './pages/classes/WaitlistManagement';
import StudentManagement from './pages/students/StudentManagement';
import StudentsList from './pages/students/StudentsList';
import StudentBookings from './pages/students/StudentBookings';
import PaymentManagement from './pages/payments/PaymentManagement';
import ProgressTracking from './pages/progress/ProgressTracking';
import ReportsAnalytics from './pages/reports/ReportsAnalytics';
import AttendanceManagement from './pages/attendance/AttendenceManagement';
import NotificationsPage from './pages/notifications/NotificationsPage';
import MediaGallery from './pages/media/MediaGallery';
import Help from './pages/help/Help';
import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1', // Blue
      light: '#5eb8ff',
      dark: '#005b9f',
    },
    secondary: {
      main: '#26a69a', // Teal
      light: '#64d8cb',
      dark: '#00766c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

const App = () => {
  // Mock authentication state
  const isAuthenticated = true;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

          {/* Protected Routes with Dashboard Layout */}
          <Route element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
            {/* Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* User Management */}
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/admins" element={<AdminUsers />} />
            <Route path="/users/instructors" element={<InstructorUsers />} />
            <Route path="/users/parents" element={<ParentUsers />} />
            
            {/* Instructor Management */}
            <Route path="/instructors" element={<InstructorManagement />} />
            
            {/* Class Management */}
            <Route path="/classes" element={<ClassManagement />} />
            <Route path="/classes/all" element={<ClassesList />} />
            <Route path="/classes/schedule" element={<ClassSchedule />} />
            <Route path="/classes/waitlist" element={<WaitlistManagement />} />
            
            {/* Student Management */}
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/students/all" element={<StudentsList />} />
            <Route path="/students/bookings" element={<StudentBookings />} />
            
            {/* Payments */}
            <Route path="/payments" element={<PaymentManagement />} />
            
            {/* Progress Tracking */}
            <Route path="/progress" element={<ProgressTracking />} />
            
            {/* Reports & Analytics */}
            <Route path="/reports" element={<ReportsAnalytics />} />
            
            {/* Attendance Management */}
            <Route path="/attendance" element={<AttendanceManagement />} />
            
            {/* Notifications */}
            <Route path="/notifications" element={<NotificationsPage />} />
            
            {/* Media & Gallery */}
            <Route path="/media" element={<MediaGallery />} />
            
            {/* FAQs & Help */}
            <Route path="/help" element={<Help />} />
            
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
