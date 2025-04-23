import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Define sidebar width
const drawerWidth = 280;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Top Navigation Bar */}
      <Navbar 
        drawerWidth={drawerWidth} 
        isCollapsed={isCollapsed}
        onMenuClick={handleDrawerToggle} 
      />
      
      {/* Sidebar / Navigation Drawer */}
      <Sidebar 
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        isCollapsed={isCollapsed}
        onCollapsedChange={toggleSidebarCollapse}
        onClose={handleDrawerToggle}
      />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isCollapsed ? 80 : drawerWidth}px)` },
          ml: { sm: isCollapsed ? `80px` : `${drawerWidth}px` },
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar /> {/* This provides spacing under the navbar */}
        <Outlet /> {/* This is where route components will be rendered */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;