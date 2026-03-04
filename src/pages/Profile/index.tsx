import { Box, Input } from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import photo from '../../asset/photo.svg';

export default function Profile() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 2,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h5" component="div">
          Profile & Settings
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mb: 2,
            alignItems: 'flex-start',
          }}
        >
          <img
            src={photo}
            alt="Profile"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              marginBottom: 16,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'flex-start',
            }}
          >
            <Typography>John Doe</Typography>
            <Typography>jonsnow@example.com</Typography>
          </Box>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Typography>Personal Details</Typography>

        <Typography>Budget Settings</Typography>
        <Typography>Category Management</Typography>
        <Typography>Notifications Settings</Typography>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2,
            alignItems: 'flex-start',
          }}
        >
          <FormControlLabel
            labelPlacement="start"
            control={<Switch defaultChecked />}
            label="Budget Alerts"
          />

          <FormControlLabel
            labelPlacement="start"
            control={<Switch defaultChecked />}
            label="AI Insights"
          />
          <FormControlLabel
            labelPlacement="start"
            control={<Switch defaultChecked />}
            label="Reminders"
          />
        </FormGroup>
      </Box>
    </>
  );
}
