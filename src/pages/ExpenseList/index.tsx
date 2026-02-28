import Typography from '@mui/material/Typography';
import Table from '../../components/Table';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function ExpenseList() {
  const searchTerm = '';
  return (
    <>
      <Typography variant="h5" component="div">
        EXPENSE LIST
      </Typography>
      <TextField
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

      <Table />
    </>
  );
}
