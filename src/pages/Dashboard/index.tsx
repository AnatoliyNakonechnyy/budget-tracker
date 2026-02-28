import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetchTransactionsThunk } from '../../features/transaction/model/transactionSlice';
import Table from '../../components/Table';
import BasicLineChart from '../../components/BasicLineChart';
import DonutChart from '../../components/DonutChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

export default function Transactions() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsThunk());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h5" component="div">
        DASHBOARD
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Monthly Spending
              </Typography>
              <Typography variant="h4" component="div">
                $2,345.67
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Budget Remaining
              </Typography>
              <Typography variant="h4" component="div">
                $2,345.67
              </Typography>
              <BorderLinearProgress variant="determinate" value={50} />
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Savings Rate
              </Typography>
              <Typography variant="h4" component="div">
                $2,345.67
              </Typography>
              <BorderLinearProgress variant="determinate" value={75} />
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Budget Summary
              </Typography>
              <Typography variant="h4" component="div">
                $2,345.67
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Monthly Budget
              </Typography>
              <Typography variant="h4" component="div">
                $2,345.67
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Budget Summary
            </Typography>
            <BasicLineChart />
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Monthly Budget
            </Typography>
            <DonutChart />
          </CardContent>
        </Card>
      </Box>
      <Divider />
      <Typography variant="h5" component="div">
        Gemini’s Financial Advice
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Monthly Spending
            </Typography>
            <Typography variant="h4" component="div">
              $2,345.67
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Budget Remaining
            </Typography>
            <Typography variant="h4" component="div">
              $2,345.67
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Savings Rate
            </Typography>
            <Typography variant="h4" component="div">
              $2,345.67
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Divider />
      <Typography variant="h5" component="div">
        Recent Transactions
      </Typography>
      <Table />
    </>
  );
}
