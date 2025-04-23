import apiClient from './apiClient';
import io, { Socket } from 'socket.io-client';

// Notification related types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  targetUserId: string;
  targetRole?: string[];
  link?: string;
  createdAt: string;
  expiresAt?: string;
}

export type NotificationCreateRequest = Omit<Notification, 'id' | 'read' | 'createdAt'>;

class NotificationService {
  private socket: Socket | null = null;
  private listeners: { [key: string]: ((data: any) => void)[] } = {};
  
  // Connect to socket server
  connect(userId: string, token: string) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    
    this.socket = io(`${API_BASE_URL}/notifications`, {
      auth: {
        token
      },
      query: {
        userId
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to notification server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from notification server');
    });

    // Set up listeners for incoming notifications
    this.socket.on('notification', (notification: Notification) => {
      this.triggerListeners('notification', notification);
    });
  }

  // Disconnect from socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Add event listener
  addEventListener(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  // Remove event listener
  removeEventListener(event: string, callback: (data: any) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  // Trigger listeners for an event
  private triggerListeners(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  // Get all notifications for current user
  async getNotifications() {
    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data;
  }

  // Get unread notifications count
  async getUnreadCount() {
    const response = await apiClient.get<{count: number}>('/notifications/unread/count');
    return response.data.count;
  }

  // Mark notification as read
  async markAsRead(id: string) {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response.data;
  }

  // Mark all notifications as read
  async markAllAsRead() {
    const response = await apiClient.patch('/notifications/read-all');
    return response.data;
  }

  // Delete notification
  async deleteNotification(id: string) {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  }

  // Send notification (admin only)
  async sendNotification(notification: NotificationCreateRequest) {
    const response = await apiClient.post<Notification>('/notifications', notification);
    return response.data;
  }

  // Send notification to all users (admin only)
  async broadcastNotification(notification: Omit<NotificationCreateRequest, 'targetUserId'>) {
    const response = await apiClient.post<{count: number}>('/notifications/broadcast', notification);
    return response.data;
  }
}

export default new NotificationService();