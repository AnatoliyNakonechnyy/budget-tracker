import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../../asset/Logo.svg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Tooltip from '@mui/material/Tooltip';
import { setEditTransactionDialogIsOpen } from '../../features/transaction/model/transactionSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Header() {
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(setEditTransactionDialogIsOpen(true));
  };
  const navigate = useNavigate();
  const handleReports = () => {
    navigate('/reports');
  };
  const handleExpenseList = () => {
    navigate('/expenses');
  };
  const handleHome = () => {
    navigate('/dashboard');
  };
  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton>
              <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
            </IconButton>

            <Typography variant="h6" component="div">
              FinSight
            </Typography>
            <Tooltip title="Home">
              <IconButton onClick={handleHome}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleAdd}>
              <AddCircleOutlineIcon />
            </IconButton>
            <Tooltip title="Expense List">
              <IconButton onClick={handleExpenseList}>
                <ArticleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reports">
              <IconButton onClick={handleReports}>
                <AssessmentIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton onClick={handleProfile}>
                <AccountBoxIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
