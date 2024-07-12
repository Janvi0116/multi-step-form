import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const ConfirmationStep = ({ formData }) => {
  const InfoItem = ({ icon, label, value }) => (
    <Box display="flex" alignItems="center" mb={2}>
      <Box mr={2}>{icon}</Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body1">{value || 'N/A'}</Typography>
      </Box>
    </Box>
  );

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Please Confirm Your Information
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InfoItem
              icon={<PersonIcon color="primary" />}
              label="Name"
              value={formData.name}
            />
            <InfoItem
              icon={<EmailIcon color="primary" />}
              label="Email"
              value={formData.email}
            />
            <InfoItem
              icon={<PhoneIcon color="primary" />}
              label="Phone"
              value={formData.phone}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem
              icon={<HomeIcon color="primary" />}
              label="Address"
              value={`${formData.addressLine1}${formData.addressLine2 ? `, ${formData.addressLine2}` : ''}`}
            />
            <InfoItem
              icon={<LocationCityIcon color="primary" />}
              label="City, State, Zip"
              value={`${formData.city}, ${formData.state} ${formData.zipCode}`}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfirmationStep;