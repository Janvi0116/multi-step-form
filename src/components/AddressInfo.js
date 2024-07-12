import React from 'react';
import { TextField, Box } from '@mui/material';

const AddressInfo = ({ formData, handleChange, errors }) => {
  return (
    <Box>
      <TextField
        fullWidth
        label="Address Line 1"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
        margin="normal"
        error={!!errors.addressLine1}
        helperText={errors.addressLine1}
      />
      <TextField
        fullWidth
        label="Address Line 2"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        margin="normal"
        error={!!errors.city}
        helperText={errors.city}
      />
      <TextField
        fullWidth
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        margin="normal"
        error={!!errors.state}
        helperText={errors.state}
      />
      <TextField
        fullWidth
        label="Zip Code"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        margin="normal"
        error={!!errors.zipCode}
        helperText={errors.zipCode}
      />
    </Box>
  );
};

export default AddressInfo;