import React, { useState } from 'react';
import { 
  Box, Card, CardContent, CardHeader, Grid, 
  Typography, Avatar, Button, TextField, 
  Divider, IconButton, 
  List, ListItem, ListItemAvatar, ListItemText, 
  CircularProgress, Badge, Paper
} from '@mui/material';
import { 
  Edit, Person, Email, 
  Work, CalendarToday, Phone, LocationOn
} from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample admin data
  const adminData = {
    name: 'Alex Morgan',
    role: 'Administrator',
    email: 'alex.morgan@taskflowpro.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'Jan 15, 2022',
    avatar: 'AM',
    tasksCompleted: 128,
    projectsManaged: 12,
    teamMembers: 24,
    performance: 92,
    bio: 'Experienced administrator with 5+ years in project management and team leadership. Specialized in workflow optimization and productivity enhancement.',
    skills: ['Project Management', 'Team Leadership', 'Workflow Optimization', 'Data Analysis', 'Agile Methodology'],
  };

  const [formData, setFormData] = useState({
    name: adminData.name,
    email: adminData.email,
    phone: adminData.phone,
    location: adminData.location,
    bio: adminData.bio
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would send the updated data to your backend here
    console.log('Profile updated:', formData);
  };

  return (
    <Box className="profile-page" sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
          Admin Profile
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Edit />}
          onClick={() => setIsEditing(!isEditing)}
          sx={{
            background: 'linear-gradient(45deg, #3a8dff 0%, #6b5ce7 100%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #2a7def 0%, #5b4cd7 100%)',
            }
          }}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent sx={{ textAlign: 'center', pt: 4 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Avatar sx={{ 
                    bgcolor: '#6b5ce7', 
                    width: 32, 
                    height: 32,
                    border: '2px solid white'
                  }}>
                    <Work fontSize="small" />
                  </Avatar>
                }
              >
                <Avatar sx={{ 
                  width: 120, 
                  height: 120, 
                  fontSize: 48, 
                  bgcolor: '#3a8dff',
                  mb: 2,
                  mx: 'auto'
                }}>
                  {adminData.avatar}
                </Avatar>
              </Badge>
              
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="standard"
                    sx={{ mb: 2 }}
                  />
                ) : adminData.name}
              </Typography>
              
              <Typography variant="body2" sx={{ 
                color: '#6b5ce7', 
                fontWeight: 600, 
                mb: 3,
                bgcolor: '#f0f4ff',
                py: 0.5,
                px: 2,
                borderRadius: 2,
                display: 'inline-block'
              }}>
                {adminData.role}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 2, 
                mt: 2, 
                mb: 3 
              }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{
                    fontWeight: 600,
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                    }
                  }}
                >
                  Assign Task
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #6b5ce7 0%, #3a8dff 100%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5b4cd7 0%, #2a7def 100%)',
                    }
                  }}
                >
                  Team Management
                </Button>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#e3f2fd' }}>
                      <Email sx={{ color: '#3a8dff' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Email" 
                    secondary={isEditing ? (
                      <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : adminData.email} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#e3f2fd' }}>
                      <Phone sx={{ color: '#3a8dff' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Phone" 
                    secondary={isEditing ? (
                      <TextField
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : adminData.phone} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#e3f2fd' }}>
                      <LocationOn sx={{ color: '#3a8dff' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Location" 
                    secondary={isEditing ? (
                      <TextField
                        fullWidth
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : adminData.location} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#e3f2fd' }}>
                      <CalendarToday sx={{ color: '#3a8dff' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Joined" secondary={adminData.joinDate} />
                </ListItem>
              </List>
              
              {isEditing && (
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={handleSave}
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>
          
          {/* Skills Card */}
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardHeader 
              title="Skills & Expertise" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
              action={isEditing && (
                <IconButton>
                  <Edit fontSize="small" />
                </IconButton>
              )}
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {adminData.skills.map((skill, index) => (
                  <Paper 
                    key={index} 
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      borderRadius: 2, 
                      bgcolor: '#f0f4ff',
                      color: '#3a8dff'
                    }}
                  >
                    {skill}
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Right Column - Main Content */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  About Me
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
                    {adminData.bio}
                  </Typography>
                )}
                
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Performance Metrics
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#6b5ce7' }}>
                        {adminData.tasksCompleted}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#777' }}>
                        Tasks Completed
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#6b5ce7' }}>
                        {adminData.projectsManaged}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#777' }}>
                        Projects Managed
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#6b5ce7' }}>
                        {adminData.teamMembers}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#777' }}>
                        Team Members
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress 
                          variant="determinate" 
                          value={adminData.performance} 
                          size={70}
                          thickness={5}
                          sx={{ color: '#6b5ce7' }}
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {adminData.performance}%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#777', mt: 1 }}>
                        Performance
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;