import { useState } from 'react';
import { 
  AppBar, 
  Avatar, 
  Badge, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Toolbar, 
  Tooltip, 
  Typography,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavbarProps {
  drawerWidth: number;
  isCollapsed: boolean;
  onMenuClick: () => void;
}

const Navbar = ({ drawerWidth, isCollapsed, onMenuClick }: NavbarProps) => {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(null);
  
  // Handle user menu open/close
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle notifications menu open/close
  const handleOpenNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };
  
  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  // Handle language menu open/close
  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLanguage(event.currentTarget);
  };
  
  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${isCollapsed ? 80 : drawerWidth}px)` },
        ml: { sm: isCollapsed ? `80px` : `${drawerWidth}px` },
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Swim Academy Admin Dashboard
        </Typography>

        {/* Language Selector */}
        <Tooltip title="Change Language">
          <IconButton 
            onClick={handleOpenLanguageMenu} 
            sx={{ ml: 1 }}
            color="inherit"
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-language"
          anchorEl={anchorElLanguage}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElLanguage)}
          onClose={handleCloseLanguageMenu}
        >
          <MenuItem onClick={handleCloseLanguageMenu}>English</MenuItem>
          <MenuItem onClick={handleCloseLanguageMenu}>Urdu</MenuItem>
        </Menu>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton 
            onClick={handleOpenNotificationsMenu} 
            sx={{ ml: 1 }}
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-notifications"
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotificationsMenu}
        >
          <MenuItem onClick={handleCloseNotificationsMenu}>
            <Typography textAlign="center">New class booking for Swimming 101</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotificationsMenu}>
            <Typography textAlign="center">Payment received from Ahmed family</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotificationsMenu}>
            <Typography textAlign="center">Sara earned new badge: Advanced Techniques</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotificationsMenu}>
            <Typography textAlign="center">View All Notifications</Typography>
          </MenuItem>
        </Menu>

        {/* User Menu */}
        <Box sx={{ flexGrow: 0, ml: 1 }}>
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Admin User" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <AccountCircleIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <SettingsIcon sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;