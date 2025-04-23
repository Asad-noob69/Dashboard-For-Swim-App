import apiClient from './apiClient';

// Attendance related types
export interface StudentAttendance {
  id: number;
  name: string;
  photo: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  arrivalTime?: string;
  departureTime?: string;
  reason?: string;
}

export interface AttendanceRecord {
  id: string;
  classId: string;
  className: string;
  date: string;
  instructor: {
    id: string;
    name: string;
    photo: string;
  };
  students: StudentAttendance[];
  stats: {
    total: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    presentPercentage: number;
    absentPercentage?: number;
    latePercentage?: number;
    excusedPercentage?: number;
  };
  notes?: string;
  submittedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AttendanceCreateRequest = Omit<AttendanceRecord, 'id' | 'stats' | 'createdAt' | 'updatedAt'>;
export type AttendanceUpdateRequest = Partial<AttendanceCreateRequest>;

const AttendanceService = {
  // Get all attendance records
  getAllAttendance: async () => {
    const response = await apiClient.get<AttendanceRecord[]>('/attendance');
    return response.data;
  },

  // Get attendance record by ID
  getAttendanceById: async (id: string) => {
    const response = await apiClient.get<AttendanceRecord>(`/attendance/${id}`);
    return response.data;
  },

  // Create new attendance record
  createAttendance: async (attendanceData: AttendanceCreateRequest) => {
    const response = await apiClient.post<AttendanceRecord>('/attendance', attendanceData);
    return response.data;
  },

  // Update attendance record
  updateAttendance: async (id: string, attendanceData: AttendanceUpdateRequest) => {
    const response = await apiClient.put<AttendanceRecord>(`/attendance/${id}`, attendanceData);
    return response.data;
  },

  // Delete attendance record
  deleteAttendance: async (id: string) => {
    const response = await apiClient.delete(`/attendance/${id}`);
    return response.data;
  },

  // Get attendance by class ID
  getAttendanceByClass: async (classId: string) => {
    const response = await apiClient.get<AttendanceRecord[]>(`/attendance/class/${classId}`);
    return response.data;
  },

  // Get attendance by date range
  getAttendanceByDateRange: async (startDate: string, endDate: string) => {
    const response = await apiClient.get<AttendanceRecord[]>('/attendance/date-range', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // Get attendance for a specific date
  getAttendanceByDate: async (date: string) => {
    const response = await apiClient.get<AttendanceRecord[]>('/attendance/date', {
      params: { date },
    });
    return response.data;
  },

  // Get attendance for a student by ID
  getAttendanceByStudent: async (studentId: string) => {
    const response = await apiClient.get<AttendanceRecord[]>(`/attendance/student/${studentId}`);
    return response.data;
  },

  // Get attendance statistics by class
  getAttendanceStatsByClass: async (classId: string) => {
    const response = await apiClient.get(`/attendance/stats/class/${classId}`);
    return response.data;
  },

  // Get attendance statistics by date range
  getAttendanceStatsByDateRange: async (startDate: string, endDate: string) => {
    const response = await apiClient.get('/attendance/stats/date-range', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // Update a single student's attendance status
  updateStudentAttendance: async (
    attendanceId: string,
    studentId: string,
    status: 'present' | 'absent' | 'late' | 'excused',
    details?: { arrivalTime?: string; departureTime?: string; reason?: string }
  ) => {
    const response = await apiClient.patch(`/attendance/${attendanceId}/student/${studentId}`, {
      status,
      ...details,
    });
    return response.data;
  },
};

export default AttendanceService;