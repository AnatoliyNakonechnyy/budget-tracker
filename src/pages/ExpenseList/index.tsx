import Typography from '@mui/material/Typography';
import Table from '../../components/Table';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import type { RootState } from '../../app/store';
import {
  setFilterDialogIsOpen,
  setSearchString,
  setSortDialogIsOpen,
} from '../../features/listSettings/model/listSettingsSlice';

export default function ExpenseList() {
  const dispatch = useAppDispatch();

  const searchString: string = useAppSelector(
    (state: RootState) => state.listSettings.searchString,
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchString(event.target.value));
  };

  const handleOpenSort = () => {
    dispatch(setSortDialogIsOpen(true));
  };
  const handleOpenFilter = () => {
    dispatch(setFilterDialogIsOpen(true));
  };
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
          label="Search"
          variant="outlined"
          size="small"
          value={searchString}
          onChange={handleSearchChange}
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
          <Button onClick={handleOpenFilter}>FILTER</Button>
          <Button onClick={handleOpenSort}>SORT</Button>
        </ButtonGroup>
      </Box>

      <Table />
    </>
  );
}
