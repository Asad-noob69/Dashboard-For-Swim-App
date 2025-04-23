import apiClient from './apiClient';

// Payment related types
export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'bank_transfer' | 'cash' | 'other';
  paymentDate: string;
  transactionId?: string;
  paidBy: {
    id: string;
    name: string;
  };
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Invoice {
  id: string;
  number: string;
  student: {
    id: string;
    name: string;
  };
  parent: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    classId?: string;
    className?: string;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: 'draft' | 'issued' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidAmount: number;
  payments: Payment[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type InvoiceCreateRequest = Omit<Invoice, 'id' | 'number' | 'status' | 'paidAmount' | 'payments' | 'createdAt' | 'updatedAt'>;
export type InvoiceUpdateRequest = Partial<InvoiceCreateRequest>;

export type PaymentCreateRequest = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const PaymentService = {
  // Get all invoices
  getAllInvoices: async () => {
    const response = await apiClient.get<Invoice[]>('/invoices');
    return response.data;
  },

  // Get invoice by ID
  getInvoiceById: async (id: string) => {
    const response = await apiClient.get<Invoice>(`/invoices/${id}`);
    return response.data;
  },

  // Create new invoice
  createInvoice: async (invoiceData: InvoiceCreateRequest) => {
    const response = await apiClient.post<Invoice>('/invoices', invoiceData);
    return response.data;
  },

  // Update invoice
  updateInvoice: async (id: string, invoiceData: InvoiceUpdateRequest) => {
    const response = await apiClient.put<Invoice>(`/invoices/${id}`, invoiceData);
    return response.data;
  },

  // Delete invoice
  deleteInvoice: async (id: string) => {
    const response = await apiClient.delete(`/invoices/${id}`);
    return response.data;
  },

  // Issue invoice (change status from draft to issued)
  issueInvoice: async (id: string) => {
    const response = await apiClient.post<Invoice>(`/invoices/${id}/issue`);
    return response.data;
  },

  // Cancel invoice
  cancelInvoice: async (id: string, reason?: string) => {
    const response = await apiClient.post<Invoice>(`/invoices/${id}/cancel`, { reason });
    return response.data;
  },

  // Send invoice via email
  sendInvoice: async (id: string, email?: string) => {
    const response = await apiClient.post(`/invoices/${id}/send`, { email });
    return response.data;
  },

  // Get invoices by parent ID
  getInvoicesByParent: async (parentId: string) => {
    const response = await apiClient.get<Invoice[]>(`/invoices/parent/${parentId}`);
    return response.data;
  },

  // Get invoices by student ID
  getInvoicesByStudent: async (studentId: string) => {
    const response = await apiClient.get<Invoice[]>(`/invoices/student/${studentId}`);
    return response.data;
  },

  // Get invoices by status
  getInvoicesByStatus: async (status: Invoice['status']) => {
    const response = await apiClient.get<Invoice[]>('/invoices/status', {
      params: { status },
    });
    return response.data;
  },
  
  // Get overdue invoices
  getOverdueInvoices: async () => {
    const response = await apiClient.get<Invoice[]>('/invoices/overdue');
    return response.data;
  },

  // Record a payment for an invoice
  recordPayment: async (invoiceId: string, paymentData: PaymentCreateRequest) => {
    const response = await apiClient.post<Payment>(`/invoices/${invoiceId}/payments`, paymentData);
    return response.data;
  },

  // Get payment by ID
  getPaymentById: async (id: string) => {
    const response = await apiClient.get<Payment>(`/payments/${id}`);
    return response.data;
  },

  // Update payment
  updatePayment: async (id: string, paymentData: Partial<Payment>) => {
    const response = await apiClient.put<Payment>(`/payments/${id}`, paymentData);
    return response.data;
  },

  // Refund payment
  refundPayment: async (id: string, amount?: number, reason?: string) => {
    const response = await apiClient.post<Payment>(`/payments/${id}/refund`, { amount, reason });
    return response.data;
  },

  // Delete payment
  deletePayment: async (id: string) => {
    const response = await apiClient.delete(`/payments/${id}`);
    return response.data;
  },

  // Generate payment receipt
  generateReceipt: async (paymentId: string) => {
    const response = await apiClient.get(`/payments/${paymentId}/receipt`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Get payment statistics
  getPaymentStats: async (startDate?: string, endDate?: string) => {
    const response = await apiClient.get('/payments/stats', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};

export default PaymentService;