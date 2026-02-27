import {
  Button,
  ButtonGroup,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import logo from '../../asset/Logo.svg';
import { useNavigate } from 'react-router';

export default function Onboarding() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate('/register');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardMedia
            component="img"
            image={logo}
            sx={{ width: '50%', height: 'auto' }}
            alt="Logo"
          />

          <Typography>FinSight</Typography>
          <Typography variant="h5" component="div">
            Start Tracking Smarter.
          </Typography>
          <Typography variant="h5" component="div">
            Take control of your money with AI-powered insights.
          </Typography>
          <Typography variant="body2">
            Track expenses, set budgets, and get real-time financial advice —
            all in one place.
          </Typography>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={handleSignUp}>SIGNUP</Button>
            <Button onClick={handleLogin}>LOGIN</Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Box>
  );
}
