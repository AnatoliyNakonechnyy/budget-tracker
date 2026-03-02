import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { setFilterDialogIsOpen } from '../../features/listSettings/model/listSettingsSlice';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useRef } from 'react';
export default function AlertDialog() {
  const dispatch = useAppDispatch();

  const filterDialogIsOpen: boolean = useAppSelector(
    (state: RootState) => state.listSettings.filterDialogIsOpen,
  );

  const handleClose = () => {
    dispatch(setFilterDialogIsOpen(false));
  };

  const radioGroupRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Dialog
        open={filterDialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Filters'}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Date range</Typography>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              // defaultValue={value}
              ref={radioGroupRef}
              row
            >
              <FormControlLabel
                value="Today"
                control={<Radio />}
                label="Today"
              />
              <FormControlLabel
                value="ThisWeek"
                control={<Radio />}
                label="This Week"
              />
              <FormControlLabel
                value="ThisMonth"
                control={<Radio />}
                label="This Month"
              />
              <FormControlLabel
                value="PreviousMonth"
                control={<Radio />}
                label="Previous Month"
              />
            </RadioGroup>
          </FormControl>
          <Typography variant="body1">Category</Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox name="Groceries" />}
              label="Groceries"
            />
            <FormControlLabel
              control={<Checkbox name="Dining" />}
              label="Dining"
            />
            <FormControlLabel
              control={<Checkbox name="Transport" />}
              label="Transport"
            />
            <FormControlLabel control={<Checkbox name="Rent" />} label="Rent" />
          </FormGroup>
          <Typography variant="body1">Amount range</Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox name="AmountRange499" />}
              label="₹0 - ₹499"
            />
            <FormControlLabel
              control={<Checkbox name="AmountRange999" />}
              label="₹500 - ₹999"
            />
            <FormControlLabel
              control={<Checkbox name="AmountRange1999" />}
              label="₹1000 - ₹1999"
            />
            <FormControlLabel
              control={<Checkbox name="AmountRange2000" />}
              label="₹2000+"
            />
          </FormGroup>
          <Typography variant="body1">Payment method</Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox name="Cards" />}
              label="Cards"
            />
            <FormControlLabel control={<Checkbox name="Cash" />} label="Cash" />
            <FormControlLabel control={<Checkbox name="UPI" />} label="UPI" />
            <FormControlLabel
              control={<Checkbox name="PayLater" />}
              label="Pay later"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: 'white', backgroundColor: 'primary.main' }}
            onClick={() => {}}
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
