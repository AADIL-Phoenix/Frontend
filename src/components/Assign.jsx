import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Grid
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          }
        }
      }
    }
  },
});

const Assign = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    projectId: '',
    userId: '',
    task: '',
    dueDate: '',
    submissionDate: '',
    priority: 'medium',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const steps = ['Project Details', 'Task Information', 'Review & Assign'];

  const handleNext = () => {
    // Validate current step
    let valid = true;
    const newErrors = {};
    
    if (activeStep === 0) {
      if (!formData.projectId) {
        newErrors.projectId = 'Project ID is required';
        valid = false;
      }
      if (!formData.userId) {
        newErrors.userId = 'User ID is required';
        valid = false;
      }
    } else if (activeStep === 1) {
      if (!formData.task) {
        newErrors.task = 'Task description is required';
        valid = false;
      }
      if (!formData.dueDate) {
        newErrors.dueDate = 'Due date is required';
        valid = false;
      }
      if (!formData.submissionDate) {
        newErrors.submissionDate = 'Submission date is required';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    
    if (valid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Task assigned successfully!');
    // Reset form
    setFormData({
      projectId: '',
      userId: '',
      task: '',
      dueDate: '',
      submissionDate: '',
      priority: 'medium',
      description: ''
    });
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="projectId"
                label="Project ID"
                variant="outlined"
                value={formData.projectId}
                onChange={handleChange}
                error={!!errors.projectId}
                helperText={errors.projectId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="userId"
                label="User ID"
                variant="outlined"
                value={formData.userId}
                onChange={handleChange}
                error={!!errors.userId}
                helperText={errors.userId}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="task"
                label="Task Description"
                variant="outlined"
                value={formData.task}
                onChange={handleChange}
                error={!!errors.task}
                helperText={errors.task}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="dueDate"
                label="Task Due Date"
                type="date"
                variant="outlined"
                value={formData.dueDate}
                onChange={handleChange}
                error={!!errors.dueDate}
                helperText={errors.dueDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="submissionDate"
                label="Task Submission Date"
                type="date"
                variant="outlined"
                value={formData.submissionDate}
                onChange={handleChange}
                error={!!errors.submissionDate}
                helperText={errors.submissionDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.priority}>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
                {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Additional Details"
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Review Task Assignment
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="textSecondary">
                Project ID
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                {formData.projectId}
              </Typography>
              
              <Typography variant="subtitle1" color="textSecondary">
                User ID
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                {formData.userId}
              </Typography>
              
              <Typography variant="subtitle1" color="textSecondary">
                Task Description
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                {formData.task}
              </Typography>
              
              <Typography variant="subtitle1" color="textSecondary">
                Due Date
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                {formData.dueDate}
              </Typography>
              
              <Typography variant="subtitle1" color="textSecondary">
                Submission Date
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                {formData.submissionDate}
              </Typography>
              
              <Typography variant="subtitle1" color="textSecondary">
                Priority
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
              </Typography>
              
              <Typography variant="subtitle1" color="textSecondary">
                Additional Details
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {formData.description || 'None'}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f7fa"
        padding={2}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: '100%',
            maxWidth: 800,
            backgroundColor: 'white',
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Task Assignment
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Assign tasks to team members with detailed instructions
            </Typography>
            
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          
          <Box component="form" noValidate autoComplete="off">
            {getStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Assign Task
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Assign;