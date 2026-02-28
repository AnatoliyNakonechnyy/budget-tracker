import Typography from '@mui/material/Typography';
import Table from '../../components/Table';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

export default function ExpenseList() {
  const searchTerm = '';
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 5, mb: 5 }}
      >
        <Typography sx={{ whiteSpace: 'nowrap' }} variant="h5">
          EXPENSE LIST
        </Typography>
        <TextField
          sx={{ ml: 5, mr: 5 }}
          label="Поиск"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={() => {}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button onClick={() => {}}>FILTRE</Button>
          <Button onClick={() => {}}>SORT</Button>
        </ButtonGroup>
      </Box>

      <Table />
    </>
  );
}
