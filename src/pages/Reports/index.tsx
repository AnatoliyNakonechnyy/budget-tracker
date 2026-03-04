import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BasicLineChart from '../../components/BasicLineChart';
import DonutChart from '../../components/DonutChart';
import SimpleBarChart from '../../components/SimpleBarChart';
import HorizontalBars from '../../components/HorizontalBars';

export default function Reports() {
  const valueDatePicker = null;
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 5, mb: 5 }}
      >
        <Typography variant="h5" component="div">
          Reports & Trends
        </Typography>
        <DatePicker
          label="Start Date"
          defaultValue={valueDatePicker}
          slotProps={{
            field: { clearable: true },
          }}
        />
        <DatePicker
          label="End Date"
          defaultValue={valueDatePicker}
          slotProps={{
            field: { clearable: true },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Card sx={{ minWidth: 275, backgroundColor: '#E5E7EB' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Biggest Spending Category
            </Typography>
            <Typography variant="h4" component="div">
              $2,345.67
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, backgroundColor: '#E5E7EB' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Savings vs Last Month
            </Typography>
            <Typography variant="h4" component="div">
              $2,345.67
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, backgroundColor: '#E5E7EB' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Average Daily Spend
            </Typography>
            <Typography variant="h4" component="div">
              $2,345.67
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Spending Trend
            </Typography>
            <BasicLineChart />
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Category Breakdown
            </Typography>
            <DonutChart />
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h5" component="div">
        Comparision Chart
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <SimpleBarChart />
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Monthly Budget
            </Typography>
            <HorizontalBars />
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h5" component="div">
        Gemini’s Financial Advice
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Card sx={{ width: 250, backgroundColor: '#E5E7EB' }}>
          <CardContent>
            <Typography>
              Shopping spend is trending up. Set a stricter category budget to
              avoid overshooting.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 250, backgroundColor: '#E5E7EB' }}>
          <CardContent>
            <Typography>
              Your savings increased by 23%. Keep up the streak!”
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 250, backgroundColor: '#E5E7EB' }}>
          <CardContent>
            <Typography>
              You’ve overspent on Transport this month. Try using public
              transport 3 days/week to save ₹1,000
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
