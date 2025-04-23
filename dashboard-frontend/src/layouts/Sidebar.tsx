import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InsightsIcon from '@mui/icons-material/Insights';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ChildCareIcon from '@mui/icons-material/ChildCare';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  isCollapsed: boolean;
  onCollapsedChange: () => void;
  onClose: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const Sidebar = ({
  drawerWidth,
  mobileOpen,
  isCollapsed,
  onCollapsedChange,
  onClose
}: SidebarProps) => {
  const theme = useTheme();
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState<{[key: string]: boolean}>({});
  
  const handleToggleSubmenu = (title: string) => {
    setOpenSubMenus(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  // Define navigation items with their routes and icons
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <HomeIcon />
    },
    {
      title: 'User Management',
      path: '/users',
      icon: <PeopleIcon />,
      children: [
        {
          title: 'Admins',
          path: '/users/admins',
          icon: <PersonIcon />
        },
        {
          title: 'Instructors',
          path: '/users/instructors',
          icon: <SchoolIcon />
        },
        {
          title: 'Parents',
          path: '/users/parents',
          icon: <GroupsIcon />
        }
      ]
    },
    {
      title: 'Instructor Management',
      path: '/instructors',
      icon: <SchoolIcon />
    },
    {
      title: 'Class Management',
      path: '/classes',
      icon: <CalendarMonthIcon />,
      children: [
        {
          title: 'All Classes',
          path: '/classes/all',
          icon: <CalendarMonthIcon />
        },
        {
          title: 'Schedule',
          path: '/classes/schedule',
          icon: <CalendarMonthIcon />
        },
        {
          title: 'Waitlist',
          path: '/classes/waitlist',
          icon: <PeopleIcon />
        }
      ]
    },
    {
      title: 'Student Management',
      path: '/students',
      icon: <ChildCareIcon />,
      children: [
        {
          title: 'All Students',
          path: '/students/all',
          icon: <ChildCareIcon />
        },
        {
          title: 'Bookings',
          path: '/students/bookings',
          icon: <CalendarMonthIcon />
        }
      ]
    },
    {
      title: 'Payments',
      path: '/payments',
      icon: <AccountBalanceWalletIcon />
    },
    {
      title: 'Progress Tracking',
      path: '/progress',
      icon: <InsightsIcon />
    },
    {
      title: 'Reports & Analytics',
      path: '/reports',
      icon: <AssessmentIcon />
    },
    {
      title: 'Attendance',
      path: '/attendance',
      icon: <CheckCircleIcon />
    },
    {
      title: 'Notifications',
      path: '/notifications',
      icon: <NotificationsIcon />
    },
    {
      title: 'Media & Gallery',
      path: '/media',
      icon: <PhotoLibraryIcon />
    },
    {
      title: 'FAQs & Help',
      path: '/help',
      icon: <HelpCenterIcon />
    },
    {
      title: 'Referral System',
      path: '/referrals',
      icon: <CardGiftcardIcon />
    }
  ];

  // Check if current path matches item or its children
  const isActiveRoute = (item: NavItem): boolean => {
    if (location.pathname === item.path) {
      return true;
    }
    
    if (item.children) {
      return !!item.children.find(child => location.pathname === child.path);
    }
    
    return false;
  };

  useEffect(() => {
    // Open submenus for the active route on initial load
    navItems.forEach(item => {
      if (item.children && item.children.some(child => location.pathname === child.path)) {
        setOpenSubMenus(prev => ({ ...prev, [item.title]: true }));
      }
    });
  }, [location.pathname]);

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive = isActiveRoute(item);
      
      if (item.children) {
        return (
          <div key={item.title}>
            <ListItem disablePadding>
              <ListItemButton 
                sx={{ 
                  pl: 2,
                  ...(isActive && !isCollapsed && {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)'
                  })
                }}
                onClick={() => handleToggleSubmenu(item.title)}
              >
                <Tooltip title={isCollapsed ? item.title : ""} placement="right">
                  <ListItemIcon 
                    sx={{ 
                      color: isActive ? 'primary.main' : 'inherit',
                      minWidth: isCollapsed ? 'auto' : 40 
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!isCollapsed && (
                  <>
                    <ListItemText primary={item.title} />
                    {openSubMenus[item.title] ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItemButton>
            </ListItem>
            
            {!isCollapsed && (
              <Collapse in={openSubMenus[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.title}
                      component={Link}
                      to={child.path}
                      sx={{
                        pl: 4,
                        ...(location.pathname === child.path && {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)'
                        })
                      }}
                    >
                      <ListItemIcon 
                        sx={{ 
                          color: location.pathname === child.path ? 'primary.main' : 'inherit',
                          minWidth: 40
                        }}
                      >
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        );
      }
      
      return (
        <ListItem key={item.title} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            sx={{
              pl: 2,
              ...(isActive && {
                backgroundColor: 'rgba(0, 0, 0, 0.08)'
              })
            }}
          >
            <Tooltip title={isCollapsed ? item.title : ""} placement="right">
              <ListItemIcon 
                sx={{ 
                  color: isActive ? 'primary.main' : 'inherit',
                  minWidth: isCollapsed ? 'auto' : 40 
                }}
              >
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            {!isCollapsed && <ListItemText primary={item.title} />}
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const drawer = (
    <>
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar
        }}
      >
        {!isCollapsed && (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '0 16px' }}>
            <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
          </div>
        )}
        <IconButton onClick={onCollapsedChange}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {renderNavItems(navItems)}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: isCollapsed ? 80 : drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            width: isCollapsed ? 80 : drawerWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;