import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

const AdminLogin = ({ setUser, switchToSignup }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, simulate login
    setUser({
      name: 'Admin User',
      initials: 'AU'
    });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: '#6b5ce7', '&:hover': { bgcolor: '#5a4bd0' } }}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link 
            component="button" 
            variant="body2"
            onClick={switchToSignup}
            sx={{ fontWeight: 600 }}
          >
            Create Member Account
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default AdminLogin;