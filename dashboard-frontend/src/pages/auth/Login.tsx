import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PoolIcon from '@mui/icons-material/Pool';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - replace with actual authentication
    if (loginData.email === 'admin@example.com' && loginData.password === 'password123') {
      // Redirect handled by App.tsx
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <PoolIcon sx={{ color: 'primary.main', fontSize: 40, mr: 1 }} />
            <Typography component="h1" variant="h5">
              Swim Academy
            </Typography>
          </Box>
          <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
            Admin Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={loginData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <MuiLink href="#" variant="body2">
                Forgot password?
              </MuiLink>
            </Box>
          </Box>
        </Paper>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 5 }}>
          © {new Date().getFullYear()} Swim Academy Management System
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;