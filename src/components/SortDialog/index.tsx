import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  setSort,
  setSortDialogIsOpen,
} from '../../features/listSettings/model/listSettingsSlice';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRef } from 'react';

export default function AlertDialog() {
  const dispatch = useAppDispatch();

  const sortDialogIsOpen: boolean = useAppSelector(
    (state: RootState) => state.listSettings.sortDialogIsOpen,
  );

  const value: string = useAppSelector(
    (state: RootState) => state.listSettings.sort,
  );

  const handleClose = () => {
    dispatch(setSortDialogIsOpen(false));
  };

  const radioGroupRef = useRef<HTMLDivElement | null>(null);

  const handleApply = () => {
    const checkedValue =
      (
        radioGroupRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.value ?? value;
    dispatch(setSort(checkedValue));
    dispatch(setSortDialogIsOpen(false));
  };

  return (
    <>
      <Dialog
        open={sortDialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Sort'}</DialogTitle>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            defaultValue={value}
            ref={radioGroupRef}
          >
            <FormControlLabel
              value="Newest"
              control={<Radio />}
              label="Newest"
            />
            <FormControlLabel
              value="Oldest"
              control={<Radio />}
              label="Oldest"
            />
            <FormControlLabel
              value="PriceHighToLow"
              control={<Radio />}
              label="Price: High to Low"
            />
            <FormControlLabel
              value="PriceLowToHigh"
              control={<Radio />}
              label="Price: Low to High"
            />
          </RadioGroup>
        </FormControl>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            sx={{ color: 'white', backgroundColor: 'primary.main' }}
            onClick={handleApply}
          >
            APPLY
          </Button>
          <Button
            sx={{ color: 'white', backgroundColor: 'red' }}
            onClick={handleClose}
            autoFocus
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
