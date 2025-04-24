import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Tab,
  Tabs,
  Badge,
  Chip,
  Menu,
  MenuItem,
  CircularProgress,
  Tooltip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import NotificationService, { Notification } from '../../services/notificationService';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Fetch notifications when component mounts
    fetchNotifications();

    // Set up socket connection for real-time notifications
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    if (user?.id && token) {
      NotificationService.connect(user.id, token);
      
      // Listen for new notifications
      NotificationService.addEventListener('notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
      });
    }

    // Clean up socket connection when component unmounts
    return () => {
      NotificationService.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const fetchedNotifications = await NotificationService.getNotifications();
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, notification: Notification) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
    handleMenuClose();
  };

  const handleMarkAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await NotificationService.deleteNotification(id);
      setNotifications(prevNotifications =>
        prevNotifications.filter(notification => notification.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
    handleMenuClose();
  };

  // Filter notifications based on tab value
  const filteredNotifications = notifications.filter(notification => {
    switch (tabValue) {
      case 0: // All
        return true;
      case 1: // Unread
        return !notification.read;
      case 2: // Read
        return notification.read;
      default:
        return true;
    }
  });

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <InfoIcon color="info" />;
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <NotificationsIcon />;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" component="h1">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Badge badgeContent={unreadCount} color="error" sx={{ ml: 2 }}>
              <NotificationsIcon color="action" />
            </Badge>
          )}
        </Box>
        <Button
          variant="outlined"
          startIcon={<DoneAllIcon />}
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark All as Read
        </Button>
      </Box>

      {/* Tabs for filtering notifications */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="notification tabs">
          <Tab label="All" />
          <Tab 
            label={
              <Badge badgeContent={unreadCount} color="error">
                Unread
              </Badge>
            } 
            disabled={unreadCount === 0} 
          />
          <Tab label="Read" disabled={notifications.length === unreadCount} />
        </Tabs>
      </Box>

      {/* Notifications List */}
      <Card>
        <CardContent sx={{ padding: 0 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredNotifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
              <NotificationsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No notifications found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 
                  ? "You don't have any notifications yet." 
                  : tabValue === 1 
                    ? "You don't have any unread notifications." 
                    : "You don't have any read notifications."}
              </Typography>
            </Box>
          ) : (
            <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}>
              {filteredNotifications.map((notification, index) => (
                <Box key={notification.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="more"
                        onClick={(e) => handleMenuOpen(e, notification)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    sx={{
                      bgcolor: notification.read ? 'inherit' : 'rgba(25, 118, 210, 0.05)',
                      py: 2
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: notification.type === 'info' ? 'info.light' :
                            notification.type === 'success' ? 'success.light' :
                            notification.type === 'warning' ? 'warning.light' :
                            notification.type === 'error' ? 'error.light' :
                            'primary.light'
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Typography
                            component="span"
                            variant="h6"
                            color="text.primary"
                            fontWeight={notification.read ? 'normal' : 'medium'}
                          >
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <Chip
                              label="New"
                              size="small"
                              color="primary"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {notification.message}
                          </Typography>
                          <Typography
                            component="div"
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {formatDate(notification.createdAt)}
                          </Typography>
                          {notification.link && (
                            <Button
                              variant="text"
                              size="small"
                              endIcon={<ArrowForwardIcon />}
                              href={notification.link}
                              sx={{ mt: 1, p: 0, minWidth: 'auto' }}
                            >
                              View Details
                            </Button>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredNotifications.length - 1 && <Divider component="li" />}
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Context Menu for notification actions */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        {selectedNotification && !selectedNotification.read && (
          <MenuItem onClick={() => handleMarkAsRead(selectedNotification.id)}>
            <ListItemAvatar sx={{ minWidth: 36 }}>
              <CheckIcon fontSize="small" />
            </ListItemAvatar>
            Mark as read
          </MenuItem>
        )}
        {selectedNotification && (
          <MenuItem onClick={() => handleDeleteNotification(selectedNotification.id)}>
            <ListItemAvatar sx={{ minWidth: 36 }}>
              <DeleteIcon fontSize="small" />
            </ListItemAvatar>
            Delete notification
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationsPage;