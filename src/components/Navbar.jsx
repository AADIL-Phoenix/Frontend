import React, { useState } from 'react';
import { 
  Box, AppBar, Toolbar, Button, Menu, MenuItem, 
  Typography, IconButton, Avatar 
} from '@mui/material';
import AdminLogin from './AdminLogin';
import MemberSignup from './MemberSignup';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState(null); // 'admin', 'member', or null
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(null);
    handleClose();
  };

  // Custom SVG icon
  const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  );

  return (
    <>
      <AppBar position="static" sx={{ 
        backgroundColor: 'white', 
        color: '#333',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #eee'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Brand Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3a8dff 0%, #6b5ce7 100%)',
              boxShadow: '0 4px 8px rgba(106, 92, 231, 0.3)'
            }}>
              <Box sx={{
                width: 30,
                height: 30,
                backgroundColor: 'white',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '50%',
                  backgroundColor: '#3a8dff'
                }}></Box>
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '50%',
                  height: '50%',
                  backgroundColor: '#6b5ce7'
                }}></Box>
              </Box>
            </Box>
            
            <Typography variant="h6" component="div" sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3a8dff 0%, #6b5ce7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              TaskFlow Pro
            </Typography>
          </Box>
          
          {/* Role Selection Buttons */}
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                Hi, {user.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ 
                  width: 36, 
                  height: 36, 
                  bgcolor: '#6b5ce7',
                  fontSize: '1rem'
                }}>
                  {user.initials}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ mt: 1 }}
              >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => setCurrentView('admin')}
                sx={{
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 3,
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: 'rgba(106, 92, 231, 0.05)'
                  }
                }}
              >
                Admin
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setCurrentView('member')}
                sx={{
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 3,
                  backgroundColor: '#6b5ce7',
                  boxShadow: '0 4px 8px rgba(106, 92, 231, 0.3)',
                  '&:hover': {
                    backgroundColor: '#5a4bd0',
                    boxShadow: '0 6px 12px rgba(106, 92, 231, 0.4)'
                  }
                }}
              >
                Member
              </Button>
            </Box>
          )}
          
          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none' }, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Render the appropriate view
      {currentView === 'admin' && (
        <AdminLogin 
          setUser={setUser}
          switchToSignup={() => setCurrentView('member')}
        />
      )}
      
      {currentView === 'member' && (
        <MemberSignup 
          setUser={setUser}
          switchToLogin={() => setCurrentView('admin')}
        />
      )} */}
    </>
  );
};

export default Navbar;
