import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

const MemberSignup = ({ setUser, switchToLogin }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, simulate signup
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    setUser({
      name,
      initials: initials.substring(0, 2)
    });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
        Member Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link 
            component="button" 
            variant="body2"
            onClick={switchToLogin}
            sx={{ fontWeight: 600 }}
          >
            Admin Login
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default MemberSignup;