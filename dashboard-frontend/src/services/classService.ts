import apiClient from './apiClient';

// Class related types
export interface SwimClass {
  id: string;
  name: string;
  description: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'competitive';
  ageGroup: string;
  capacity: number;
  enrolled: {
    student: {
      id: string;
      name: string;
    };
    enrolledAt: string;
    status: 'active' | 'canceled' | 'completed';
  }[];
  instructor: {
    id: string;
    name: string;
    photo: string;
  };
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    pool: string;
    recurrence?: 'weekly' | 'biweekly' | 'monthly' | 'once';
  }[];
  fee: number;
  currency: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  waitlist?: {
    student: {
      id: string;
      name: string;
    };
    joinedAt: string;
    position: number;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export type ClassCreateRequest = Omit<SwimClass, 'id' | 'createdAt' | 'updatedAt'>;
export type ClassUpdateRequest = Partial<ClassCreateRequest>;

const ClassService = {
  // Get all classes
  getAllClasses: async () => {
    const response = await apiClient.get<SwimClass[]>('/classes');
    return response.data;
  },

  // Get class by ID
  getClassById: async (id: string) => {
    const response = await apiClient.get<SwimClass>(`/classes/${id}`);
    return response.data;
  },

  // Create new class
  createClass: async (classData: ClassCreateRequest) => {
    const response = await apiClient.post<SwimClass>('/classes', classData);
    return response.data;
  },

  // Update class
  updateClass: async (id: string, classData: ClassUpdateRequest) => {
    const response = await apiClient.put<SwimClass>(`/classes/${id}`, classData);
    return response.data;
  },

  // Delete class
  deleteClass: async (id: string) => {
    const response = await apiClient.delete(`/classes/${id}`);
    return response.data;
  },

  // Get classes by instructor ID
  getClassesByInstructor: async (instructorId: string) => {
    const response = await apiClient.get<SwimClass[]>(`/classes/instructor/${instructorId}`);
    return response.data;
  },

  // Get classes by time period
  getClassesByTimePeriod: async (startDate: string, endDate: string) => {
    const response = await apiClient.get<SwimClass[]>('/classes/schedule', {
      params: { startDate, endDate },
    });
    return response.data;
  },
  
  // Get classes by day of week
  getClassesByDay: async (day: string) => {
    const response = await apiClient.get<SwimClass[]>('/classes/day', {
      params: { day },
    });
    return response.data;
  },

  // Get active classes
  getActiveClasses: async () => {
    const response = await apiClient.get<SwimClass[]>('/classes/active');
    return response.data;
  },

  // Add student to class waitlist
  addToWaitlist: async (classId: string, studentId: string) => {
    const response = await apiClient.post(`/classes/${classId}/waitlist`, { studentId });
    return response.data;
  },

  // Remove student from class waitlist
  removeFromWaitlist: async (classId: string, studentId: string) => {
    const response = await apiClient.delete(`/classes/${classId}/waitlist/${studentId}`);
    return response.data;
  },

  // Get class waitlist
  getWaitlist: async (classId: string) => {
    const response = await apiClient.get(`/classes/${classId}/waitlist`);
    return response.data;
  },
  
  // Cancel class
  cancelClass: async (classId: string, reason?: string) => {
    const response = await apiClient.post(`/classes/${classId}/cancel`, { reason });
    return response.data;
  },
  
  // Complete class
  completeClass: async (classId: string) => {
    const response = await apiClient.post(`/classes/${classId}/complete`);
    return response.data;
  },
};

export default ClassService;