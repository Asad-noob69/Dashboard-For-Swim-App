import apiClient from './apiClient';

// Student related types
export interface Student {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  parent: string;
  parentId: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'competitive';
  enrolledClasses: { id: string; name: string; status: string }[];
  photo: string;
  progress: { skill: string; level: number; achievedOn: string }[];
  medicalInfo?: {
    conditions: string[];
    allergies: string[];
    medications: string[];
    notes: string;
  };
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type StudentCreateRequest = Omit<Student, 'id' | 'createdAt' | 'updatedAt'>;
export type StudentUpdateRequest = Partial<StudentCreateRequest>;

const StudentService = {
  // Get all students
  getAllStudents: async () => {
    const response = await apiClient.get<Student[]>('/students');
    return response.data;
  },

  // Get student by ID
  getStudentById: async (id: string) => {
    const response = await apiClient.get<Student>(`/students/${id}`);
    return response.data;
  },

  // Create new student
  createStudent: async (studentData: StudentCreateRequest) => {
    const response = await apiClient.post<Student>('/students', studentData);
    return response.data;
  },

  // Update student
  updateStudent: async (id: string, studentData: StudentUpdateRequest) => {
    const response = await apiClient.put<Student>(`/students/${id}`, studentData);
    return response.data;
  },

  // Delete student
  deleteStudent: async (id: string) => {
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  },

  // Get students by parent ID
  getStudentsByParent: async (parentId: string) => {
    const response = await apiClient.get<Student[]>(`/students/parent/${parentId}`);
    return response.data;
  },

  // Get students by class ID
  getStudentsByClass: async (classId: string) => {
    const response = await apiClient.get<Student[]>(`/students/class/${classId}`);
    return response.data;
  },

  // Update student progress
  updateStudentProgress: async (id: string, progressData: any) => {
    const response = await apiClient.post<Student>(`/students/${id}/progress`, progressData);
    return response.data;
  },

  // Upload student photo
  uploadStudentPhoto: async (id: string, photoFile: File) => {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    const response = await apiClient.post<{photoUrl: string}>(`/students/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  // Add student to class
  enrollStudentInClass: async (studentId: string, classId: string) => {
    const response = await apiClient.post(`/students/${studentId}/enroll`, { classId });
    return response.data;
  },

  // Remove student from class
  removeStudentFromClass: async (studentId: string, classId: string) => {
    const response = await apiClient.post(`/students/${studentId}/unenroll`, { classId });
    return response.data;
  },
};

export default StudentService;