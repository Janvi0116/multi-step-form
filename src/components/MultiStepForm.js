import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Container, Snackbar, Alert } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PersonalInfo from './PersonalInfo';
import AddressInfo from './AddressInfo';
import ConfirmationStep from './Confirmation';

const formSteps = ['Personal Information', 'Address Information', 'Confirmation'];

function getFormInitialState(){
  return {
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  }
}

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(getFormInitialState());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({ open: false, message: '', severity: 'error' });

  useEffect(() => {
    // when loading the component checking if local storage have the data
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleNext = () => {
    if (validateStep()) {
      setIsLoading(true);
      //API call stimulated
      setTimeout(() => {
        setIsLoading(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        localStorage.setItem('formData', JSON.stringify(formData));
      }, 1000);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setIsLoading(true);
      // stimulate api call
      setTimeout(() => {
        setIsLoading(false);
        if (Math.random() > 0.5) { // Stimulate error 50 percent times
          localStorage.removeItem('formData');
          setActiveStep(0);
          setFormData(getFormInitialState());
          setSnackbarConfig({ open: true, message: 'Form submitted successfully!', severity: 'success' });
        } else {
          setSnackbarConfig({ open: true, message: 'Error submitting form. Please try again.', severity: 'error' });
        }
      }, 2000);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    switch (activeStep) {
      case 0:
        if (!formData.name) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
          isValid = false;
        }
        if (!formData.phone) {
          newErrors.phone = 'Phone is required';
          isValid = false;
        }
        break;
      case 1:
        if (!formData.addressLine1) {
          newErrors.addressLine1 = 'Address Line 1 is required';
          isValid = false;
        }
        if (!formData.city) {
          newErrors.city = 'City is required';
          isValid = false;
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
          isValid = false;
        }
        if (!formData.zipCode) {
          newErrors.zipCode = 'Zip Code is required';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCurrentStepUI = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfo formData={formData} handleChange={handleChange} errors={errors} />;
      case 1:
        return <AddressInfo formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <ConfirmationStep formData={formData} />;
      default:
        return 'Unknown step';
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ width: '100%', mt: 4 }}>
        <Stepper activeStep={activeStep}>
          {formSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4, minHeight: '300px' }}>
          {activeStep === formSteps.length ? (
            <Typography>All formSteps completed</Typography>
          ) : (
            <>
              <TransitionGroup>
                <CSSTransition key={activeStep} classNames="fade" timeout={300}>
                  <Box>{getCurrentStepUI(activeStep)}</Box>
                </CSSTransition>
              </TransitionGroup>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0 || isLoading}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === formSteps.length - 1 ? (
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </Button>
                ) : (
                  <Button onClick={handleNext} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Next'}
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Snackbar open={snackbarConfig.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarConfig.severity} sx={{ width: '100%' }}>
          {snackbarConfig.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MultiStepForm;