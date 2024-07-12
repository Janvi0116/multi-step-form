import React from 'react';
import { TextField, Box } from '@mui/material';

const PersonalInfo = ({ formData, handleChange, errors }) => {
  return (
    <Box>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        margin="normal"
        error={!!errors.phone}
        helperText={errors.phone}
      />
    </Box>
  );
};

export default PersonalInfo;