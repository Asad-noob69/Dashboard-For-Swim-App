import apiClient from './apiClient';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  token: string;
  refreshToken: string;
}

interface PasswordResetRequest {
  email: string;
}

interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AuthService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register user (for admin to create staff accounts)
  register: async (userData: any) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    // Clear tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Make API call to invalidate the token on server side
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData: any) => {
    const response = await apiClient.put('/auth/profile', profileData);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (data: PasswordResetRequest) => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  // Reset password with token
  resetPassword: async (token: string, newPassword: string) => {
    const response = await apiClient.post(`/auth/reset-password/${token}`, { password: newPassword });
    return response.data;
  },

  // Change password (when logged in)
  changePassword: async (data: PasswordChangeRequest) => {
    const response = await apiClient.post('/auth/change-password', data);
    return response.data;
  },

  // Verify authentication token
  verifyToken: async () => {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  },
};

export default AuthService;