import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tab,
  Tabs,
  InputAdornment,
  Tooltip,
  Stack,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import UndoIcon from '@mui/icons-material/Undo';

// Mock payments data
const paymentsData = [
  {
    id: 'PMT001',
    student: {
      id: 1,
      name: 'Ahmed Khan',
    },
    parent: {
      id: 'p001',
      name: 'Farooq Khan',
    },
    class: {
      id: 'c1',
      name: 'Learn to Swim',
    },
    amount: 15000,
    currency: 'PKR',
    paymentMethod: 'jazzCash',
    transactionId: 'JZ123456789',
    status: 'completed',
    paymentDate: '2025-04-01T10:30:00',
    dueDate: '2025-03-31',
    isLate: false,
    discountAmount: 0,
    receiptUrl: '',
  },
  {
    id: 'PMT002',
    student: {
      id: 2,
      name: 'Sara Ali',
    },
    parent: {
      id: 'p002',
      name: 'Ali Hassan',
    },
    class: {
      id: 'c2',
      name: 'Intermediate Swim',
    },
    amount: 18000,
    currency: 'PKR',
    paymentMethod: 'bank_transfer',
    transactionId: 'BT987654321',
    status: 'completed',
    paymentDate: '2025-04-02T09:15:00',
    dueDate: '2025-04-05',
    isLate: false,
    discountAmount: 1000,
    discountReason: 'Sibling discount',
    receiptUrl: '',
  },
  {
    id: 'PMT003',
    student: {
      id: 3,
      name: 'Imran Ahmed',
    },
    parent: {
      id: 'p003',
      name: 'Ahmed Raza',
    },
    class: {
      id: 'c4',
      name: 'Advanced Techniques',
    },
    amount: 20000,
    currency: 'PKR',
    paymentMethod: 'cash',
    transactionId: 'CSH456789',
    status: 'completed',
    paymentDate: '2025-04-10T14:45:00',
    dueDate: '2025-04-10',
    isLate: false,
    discountAmount: 0,
    receiptUrl: '',
  },
  {
    id: 'PMT004',
    student: {
      id: 4,
      name: 'Sana Khan',
    },
    parent: {
      id: 'p004',
      name: 'Faisal Khan',
    },
    class: {
      id: 'c1',
      name: 'Learn to Swim',
    },
    amount: 15000,
    currency: 'PKR',
    paymentMethod: 'easypaisa',
    transactionId: 'EP567890123',
    status: 'pending',
    paymentDate: '',
    dueDate: '2025-04-25',
    isLate: false,
    discountAmount: 0,
    receiptUrl: '',
  },
  {
    id: 'PMT005',
    student: {
      id: 5,
      name: 'Bilal Hassan',
    },
    parent: {
      id: 'p005',
      name: 'Hassan Ali',
    },
    class: {
      id: 'c5',
      name: 'Competitive Training',
    },
    amount: 25000,
    currency: 'PKR',
    paymentMethod: 'credit_card',
    transactionId: 'CC678901234',
    status: 'refunded',
    paymentDate: '2025-03-28T11:00:00',
    dueDate: '2025-03-30',
    isLate: false,
    refundAmount: 25000,
    refundReason: 'Schedule conflict',
    refundDate: '2025-04-05T09:30:00',
    discountAmount: 0,
    receiptUrl: '',
  },
  {
    id: 'PMT006',
    student: {
      id: 2,
      name: 'Sara Ali',
    },
    parent: {
      id: 'p002',
      name: 'Ali Hassan',
    },
    class: {
      id: 'c3',
      name: 'Water Safety',
    },
    amount: 12000,
    currency: 'PKR',
    paymentMethod: 'bank_transfer',
    transactionId: 'BT123098765',
    status: 'completed',
    paymentDate: '2025-03-15T10:00:00',
    dueDate: '2025-03-20',
    isLate: false,
    discountAmount: 1000,
    discountReason: 'Multi-class discount',
    receiptUrl: '',
  },
  {
    id: 'PMT007',
    student: {
      id: 1,
      name: 'Ahmed Khan',
    },
    parent: {
      id: 'p001',
      name: 'Farooq Khan',
    },
    class: {
      id: 'c1',
      name: 'Learn to Swim',
    },
    amount: 15000,
    currency: 'PKR',
    paymentMethod: 'cash',
    transactionId: '',
    status: 'failed',
    paymentDate: '2025-04-18T15:30:00',
    dueDate: '2025-04-15',
    isLate: true,
    lateFee: 500,
    discountAmount: 0,
    receiptUrl: '',
  },
];

// Interface for payment data
interface Payment {
  id: string;
  student: {
    id: number;
    name: string;
  };
  parent: {
    id: string;
    name: string;
  };
  class: {
    id: string;
    name: string;
  };
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: string;
  dueDate: string;
  isLate: boolean;
  lateFee?: number;
  discountAmount: number;
  discountReason?: string;
  refundAmount?: number;
  refundReason?: string;
  refundDate?: string;
  receiptUrl: string;
}

// Interface for payment filter
interface PaymentFilter {
  search: string;
  status: string;
  paymentMethod: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  minAmount: number;
  maxAmount: number;
}

const PaymentManagement = () => {
  // State for payments data with pagination
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for filtering
  const [filters, setFilters] = useState<PaymentFilter>({
    search: '',
    status: '',
    paymentMethod: '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
    minAmount: 0,
    maxAmount: 100000,
  });
  const [showFilters, setShowFilters] = useState(false);

  // State for payment dialog
  const [paymentDialog, setPaymentDialog] = useState({
    open: false,
    mode: 'view', // 'view', 'add', 'edit'
    payment: null as Payment | null,
  });

  // State for refund dialog
  const [refundDialog, setRefundDialog] = useState({
    open: false,
    paymentId: '',
    refundReason: '',
    refundAmount: 0,
  });

  // State for tab management
  const [tabValue, setTabValue] = useState(0);

  // Load payments data on component mount
  useEffect(() => {
    // Simulate API fetch with some delay
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setPayments(paymentsData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters to payment data
  const filteredPayments = payments.filter((payment) => {
    // Text search
    if (
      filters.search &&
      !payment.student.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !payment.parent.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !payment.class.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !payment.id.toLowerCase().includes(filters.search.toLowerCase()) &&
      !payment.transactionId.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (filters.status && payment.status !== filters.status) {
      return false;
    }

    // Payment method filter
    if (filters.paymentMethod && payment.paymentMethod !== filters.paymentMethod) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.startDate && payment.paymentDate) {
      const paymentDate = new Date(payment.paymentDate);
      const startDate = new Date(filters.dateRange.startDate);
      if (paymentDate < startDate) {
        return false;
      }
    }

    if (filters.dateRange.endDate && payment.paymentDate) {
      const paymentDate = new Date(payment.paymentDate);
      const endDate = new Date(filters.dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // End of day
      if (paymentDate > endDate) {
        return false;
      }
    }

    // Amount range filter
    const totalAmount = payment.amount + (payment.lateFee || 0) - payment.discountAmount;
    if (totalAmount < filters.minAmount || totalAmount > filters.maxAmount) {
      return false;
    }

    return true;
  });

  // Filter data based on active tab
  const tabFilteredPayments = filteredPayments.filter((payment) => {
    switch (tabValue) {
      case 0: // All
        return true;
      case 1: // Completed
        return payment.status === 'completed';
      case 2: // Pending
        return payment.status === 'pending';
      case 3: // Failed/Refunded
        return payment.status === 'failed' || payment.status === 'refunded';
      default:
        return true;
    }
  });

  // Handle filter change
  const handleFilterChange = (field: keyof PaymentFilter, value: any) => {
    if (field === 'dateRange') {
      setFilters((prev) => ({
        ...prev,
        dateRange: { ...prev.dateRange, ...value },
      }));
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle payment dialog open
  const handleOpenPaymentDialog = (mode: 'view' | 'add' | 'edit', payment?: Payment) => {
    setPaymentDialog({
      open: true,
      mode,
      payment: payment || null,
    });
  };

  // Handle payment dialog close
  const handleClosePaymentDialog = () => {
    setPaymentDialog({
      open: false,
      mode: 'view',
      payment: null,
    });
  };

  // Handle refund dialog open
  const handleOpenRefundDialog = (payment: Payment) => {
    setRefundDialog({
      open: true,
      paymentId: payment.id,
      refundReason: '',
      refundAmount: payment.amount - payment.discountAmount + (payment.lateFee || 0),
    });
  };

  // Handle refund dialog close
  const handleCloseRefundDialog = () => {
    setRefundDialog({
      open: false,
      paymentId: '',
      refundReason: '',
      refundAmount: 0,
    });
  };

  // Handle process refund
  const handleProcessRefund = () => {
    // Find payment to refund
    const paymentToRefund = payments.find((p) => p.id === refundDialog.paymentId);
    
    if (paymentToRefund) {
      // Process refund logic
      const updatedPayment: Payment = {
        ...paymentToRefund,
        status: 'refunded',
        refundAmount: refundDialog.refundAmount,
        refundReason: refundDialog.refundReason,
        refundDate: new Date().toISOString(),
      };
      
      // Update payments list
      const updatedPayments = payments.map((p) =>
        p.id === updatedPayment.id ? updatedPayment : p
      );
      
      setPayments(updatedPayments);
      handleCloseRefundDialog();
    }
  };

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string = 'PKR') => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  // Format payment method display name
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Credit Card';
      case 'jazzCash':
        return 'Jazz Cash';
      case 'easypaisa':
        return 'Easypaisa';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash';
      default:
        return method;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Function to get color for payment status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Payments</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenPaymentDialog('add')}
        >
          Record Payment
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="payment tabs">
          <Tab label="All Payments" />
          <Tab label="Completed" />
          <Tab label="Pending" />
          <Tab label="Failed/Refunded" />
        </Tabs>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by student, parent, class, payment ID..."
                variant="outlined"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </Grid>

            {showFilters && (
              <>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      id="status-filter"
                      value={filters.status}
                      label="Status"
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                      <MenuItem value="refunded">Refunded</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="payment-method-filter-label">Payment Method</InputLabel>
                    <Select
                      labelId="payment-method-filter-label"
                      id="payment-method-filter"
                      value={filters.paymentMethod}
                      label="Payment Method"
                      onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="credit_card">Credit Card</MenuItem>
                      <MenuItem value="jazzCash">Jazz Cash</MenuItem>
                      <MenuItem value="easypaisa">Easypaisa</MenuItem>
                      <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="From Date"
                    type="date"
                    value={filters.dateRange.startDate}
                    onChange={(e) =>
                      handleFilterChange('dateRange', { startDate: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="To Date"
                    type="date"
                    value={filters.dateRange.endDate}
                    onChange={(e) =>
                      handleFilterChange('dateRange', { endDate: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      setFilters({
                        search: '',
                        status: '',
                        paymentMethod: '',
                        dateRange: {
                          startDate: '',
                          endDate: '',
                        },
                        minAmount: 0,
                        maxAmount: 100000,
                      });
                    }}
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="payments table">
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Student/Class</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Loading payments data...
                </TableCell>
              </TableRow>
            ) : tabFilteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No payments found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              tabFilteredPayments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((payment) => {
                  // Calculate total amount including late fees and discounts
                  const totalAmount =
                    payment.amount + (payment.lateFee || 0) - payment.discountAmount;
                  
                  return (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{payment.student.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {payment.class.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{payment.parent.name}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatCurrency(totalAmount, payment.currency)}
                        </Typography>
                        {payment.discountAmount > 0 && (
                          <Typography variant="caption" color="success.main">
                            Disc: {formatCurrency(payment.discountAmount, payment.currency)}
                          </Typography>
                        )}
                        {payment.lateFee && payment.lateFee > 0 && (
                          <Typography variant="caption" color="error.main" display="block">
                            Late Fee: {formatCurrency(payment.lateFee, payment.currency)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{formatPaymentMethod(payment.paymentMethod)}</TableCell>
                      <TableCell>
                        {payment.paymentDate ? (
                          <Box>
                            <Typography variant="body2">
                              {formatDate(payment.paymentDate)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Due: {formatDate(payment.dueDate)}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2">
                            Due: {formatDate(payment.dueDate)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          color={getStatusColor(payment.status) as any}
                          size="small"
                        />
                        {payment.isLate && (
                          <Chip
                            label="Late"
                            color="error"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Tooltip title="View Details">
                            <IconButton
                              onClick={() => handleOpenPaymentDialog('view', payment)}
                              size="small"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {payment.status === 'completed' && (
                            <>
                              <Tooltip title="Receipt">
                                <IconButton size="small">
                                  <ReceiptIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Refund">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenRefundDialog(payment)}
                                >
                                  <UndoIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {payment.status === 'pending' && (
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() => handleOpenPaymentDialog('edit', payment)}
                                size="small"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tabFilteredPayments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Payment Details Dialog */}
      {paymentDialog.open && paymentDialog.payment && (
        <Dialog
          open={paymentDialog.open}
          onClose={handleClosePaymentDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {paymentDialog.mode === 'view'
              ? 'Payment Details'
              : paymentDialog.mode === 'add'
              ? 'Record New Payment'
              : 'Edit Payment'}
          </DialogTitle>
          <DialogContent dividers>
            <PaymentDetails 
              payment={paymentDialog.payment} 
              mode={paymentDialog.mode} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePaymentDialog}>
              {paymentDialog.mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {paymentDialog.mode !== 'view' && (
              <Button variant="contained" color="primary">
                Save
              </Button>
            )}
            {paymentDialog.mode === 'view' && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<GetAppIcon />}
              >
                Download Receipt
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}

      {/* Refund Dialog */}
      <Dialog
        open={refundDialog.open}
        onClose={handleCloseRefundDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Process Refund</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Please enter the refund details for payment {refundDialog.paymentId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Refund Amount (PKR)"
                type="number"
                value={refundDialog.refundAmount}
                onChange={(e) =>
                  setRefundDialog((prev) => ({
                    ...prev,
                    refundAmount: Number(e.target.value),
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Refund Reason"
                multiline
                rows={3}
                value={refundDialog.refundReason}
                onChange={(e) =>
                  setRefundDialog((prev) => ({
                    ...prev,
                    refundReason: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRefundDialog}>Cancel</Button>
          <Button
            onClick={handleProcessRefund}
            variant="contained"
            color="primary"
            disabled={!refundDialog.refundReason || refundDialog.refundAmount <= 0}
          >
            Process Refund
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Payment Details Component
interface PaymentDetailsProps {
  payment: Payment;
  mode: 'view' | 'add' | 'edit';
}

const PaymentDetails = ({ payment, mode }: PaymentDetailsProps) => {
  const isViewMode = mode === 'view';
  const [formData, setFormData] = useState(payment);

  // Calculate total
  const totalAmount = formData.amount + (formData.lateFee || 0) - formData.discountAmount;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Payment ID: {formData.id}</Typography>
          <Chip
            label={formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
            color={
              formData.status === 'completed'
                ? 'success'
                : formData.status === 'pending'
                ? 'warning'
                : formData.status === 'refunded'
                ? 'info'
                : 'error'
            }
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Payment Information
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Amount:
                </Typography>
                <Typography variant="body1">
                  {formData.currency} {formData.amount.toLocaleString()}
                </Typography>
              </Box>

              {formData.discountAmount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Discount:
                  </Typography>
                  <Typography variant="body1" color="success.main">
                    - {formData.currency} {formData.discountAmount.toLocaleString()}
                  </Typography>
                </Box>
              )}

              {formData.lateFee && formData.lateFee > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Late Fee:
                  </Typography>
                  <Typography variant="body1" color="error.main">
                    + {formData.currency} {formData.lateFee.toLocaleString()}
                  </Typography>
                </Box>
              )}

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {formData.currency} {totalAmount.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Payment Method:
                </Typography>
                <Typography variant="body1">
                  {formData.paymentMethod === 'credit_card'
                    ? 'Credit Card'
                    : formData.paymentMethod === 'jazzCash'
                    ? 'Jazz Cash'
                    : formData.paymentMethod === 'easypaisa'
                    ? 'Easypaisa'
                    : formData.paymentMethod === 'bank_transfer'
                    ? 'Bank Transfer'
                    : formData.paymentMethod}
                </Typography>
              </Box>

              {formData.transactionId && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Transaction ID:
                  </Typography>
                  <Typography variant="body1">{formData.transactionId}</Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Payment Date:
                </Typography>
                <Typography variant="body1">
                  {formData.paymentDate
                    ? new Date(formData.paymentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Not paid yet'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Due Date:
                </Typography>
                <Typography variant="body1">
                  {new Date(formData.dueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>

              {formData.status === 'refunded' && formData.refundAmount && (
                <>
                  <Divider />
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Refund Information
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                      Refund Amount:
                    </Typography>
                    <Typography variant="body1" color="info.main">
                      {formData.currency} {formData.refundAmount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                      Refund Date:
                    </Typography>
                    <Typography variant="body1">
                      {formData.refundDate
                        ? new Date(formData.refundDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : '-'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                      Refund Reason:
                    </Typography>
                    <Typography variant="body1">{formData.refundReason || '-'}</Typography>
                  </Box>
                </>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Class & Student Information
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Class:
                </Typography>
                <Typography variant="body1">{formData.class.name}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Student:
                </Typography>
                <Typography variant="body1">{formData.student.name}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Parent/Guardian:
                </Typography>
                <Typography variant="body1">{formData.parent.name}</Typography>
              </Box>

              {formData.discountAmount > 0 && formData.discountReason && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Discount Reason:
                  </Typography>
                  <Typography variant="body1">{formData.discountReason}</Typography>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PaymentManagement;