import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  setDataRange,
  setFilterDialogIsOpen,
  setCategoryGroceries,
  setDataPick,
  setCategoryDining,
  setCategoryTransport,
  setCategoryRent,
  setAmountRange499,
  setAmountRange999,
  setAmountRange1999,
  setAmountRange2000,
  setPaymentCard,
  setPaymentCash,
  setPaymentUPI,
  setPaymentPayLater,
} from '../../features/listSettings/model/listSettingsSlice';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useRef } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export default function AlertDialog() {
  const dispatch = useAppDispatch();

  const filterDialogIsOpen: boolean = useAppSelector(
    (state: RootState) => state.listSettings.filterDialogIsOpen,
  );
  const value: string = useAppSelector(
    (state: RootState) => state.listSettings.dataRange,
  );
  const valueDatePicker: Dayjs | null = useAppSelector(
    (state: RootState) => state.listSettings.dataPick,
  );
  const categoryGroceries: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryGroceries,
  );
  const categoryDining: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryDining,
  );
  const categoryTransport: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryTransport,
  );
  const categoryRent: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryRent,
  );
  const amountRange499: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange499,
  );
  const amountRange999: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange999,
  );
  const amountRange1999: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange1999,
  );
  const amountRange2000: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange2000,
  );
  const paymentCard: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentCard,
  );
  const paymentCash: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentCash,
  );
  const paymentUPI: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentUPI,
  );
  const paymentPayLater: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentPayLater,
  );
  const radioGroupRef = useRef<HTMLDivElement | null>(null);
  const dataPickerRef = useRef<HTMLDivElement | null>(null);
  const groceriesRef = useRef<HTMLDivElement | null>(null);
  const diningRegRef = useRef<HTMLDivElement | null>(null);
  const transportRegRef = useRef<HTMLDivElement | null>(null);
  const rentRef = useRef<HTMLDivElement | null>(null);
  const amountRange499Ref = useRef<HTMLDivElement | null>(null);
  const amountRange999Ref = useRef<HTMLDivElement | null>(null);
  const amountRange1999Ref = useRef<HTMLDivElement | null>(null);
  const amountRange2000Ref = useRef<HTMLDivElement | null>(null);
  const paymentCardRef = useRef<HTMLDivElement | null>(null);
  const paymentCashRef = useRef<HTMLDivElement | null>(null);
  const paymentUPIRef = useRef<HTMLDivElement | null>(null);
  const paymentPayLaterRef = useRef<HTMLDivElement | null>(null);

  const handleApply = () => {
    dispatch(setFilterDialogIsOpen(false));
    const checkedValue =
      (
        radioGroupRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.value ?? value;
    dispatch(setDataRange(checkedValue));

    const datePickerValue =
      (dataPickerRef.current?.querySelector('input') as HTMLInputElement | null)
        ?.value ??
      valueDatePicker?.format('YYYY-MM-DD') ??
      null;
    dispatch(setDataPick(datePickerValue ? dayjs(datePickerValue) : null));

    const categoryGroceriesChecked =
      (
        groceriesRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setCategoryGroceries(categoryGroceriesChecked));
    const categoryDiningChecked =
      (
        diningRegRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setCategoryDining(categoryDiningChecked));
    const categoryTransportChecked =
      (
        transportRegRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setCategoryTransport(categoryTransportChecked));
    const categoryRentChecked =
      (
        rentRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setCategoryRent(categoryRentChecked));
    const amountRange499Checked =
      (
        amountRange499Ref.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setAmountRange499(amountRange499Checked));
    const amountRange999Checked =
      (
        amountRange999Ref.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setAmountRange999(amountRange999Checked));
    const amountRange1999Checked =
      (
        amountRange1999Ref.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setAmountRange1999(amountRange1999Checked));
    const amountRange2000Checked =
      (
        amountRange2000Ref.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setAmountRange2000(amountRange2000Checked));
    const paymentCardChecked =
      (
        paymentCardRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setPaymentCard(paymentCardChecked));
    const paymentCashChecked =
      (
        paymentCashRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setPaymentCash(paymentCashChecked));
    const paymentUPIChecked =
      (
        paymentUPIRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setPaymentUPI(paymentUPIChecked));
    const paymentPayLaterChecked =
      (
        paymentPayLaterRef.current?.querySelector(
          'input:checked',
        ) as HTMLInputElement | null
      )?.checked ?? false;
    dispatch(setPaymentPayLater(paymentPayLaterChecked));
  };

  const handleClose = () => {
    dispatch(setFilterDialogIsOpen(false));
  };
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
              defaultValue={value}
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
            <DatePicker
              label="Custom Date"
              defaultValue={valueDatePicker}
              slotProps={{
                field: { clearable: true },
              }}
              ref={dataPickerRef}
            />
          </FormControl>
          <Typography variant="body1">Category</Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox name="Groceries" defaultChecked={categoryGroceries} />
              }
              label="Groceries"
              ref={groceriesRef}
            />
            <FormControlLabel
              control={
                <Checkbox name="Dining" defaultChecked={categoryDining} />
              }
              label="Dining"
              ref={diningRegRef}
            />
            <FormControlLabel
              control={
                <Checkbox name="Transport" defaultChecked={categoryTransport} />
              }
              label="Transport"
              ref={transportRegRef}
            />
            <FormControlLabel
              control={<Checkbox name="Rent" defaultChecked={categoryRent} />}
              label="Rent"
              ref={rentRef}
            />
          </FormGroup>
          <Typography variant="body1">Amount range</Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="AmountRange499"
                  defaultChecked={amountRange499}
                />
              }
              label="₹0 - ₹499"
              ref={amountRange499Ref}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="AmountRange999"
                  defaultChecked={amountRange999}
                />
              }
              label="₹500 - ₹999"
              ref={amountRange999Ref}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="AmountRange1999"
                  defaultChecked={amountRange1999}
                />
              }
              label="₹1000 - ₹1999"
              ref={amountRange1999Ref}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="AmountRange2000"
                  defaultChecked={amountRange2000}
                />
              }
              label="₹2000+"
              ref={amountRange2000Ref}
            />
          </FormGroup>
          <Typography variant="body1">Payment method</Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox name="Cards" defaultChecked={paymentCard} />}
              label="Cards"
              ref={paymentCardRef}
            />
            <FormControlLabel
              control={<Checkbox name="Cash" defaultChecked={paymentCash} />}
              label="Cash"
              ref={paymentCashRef}
            />
            <FormControlLabel
              control={<Checkbox name="UPI" defaultChecked={paymentUPI} />}
              label="UPI"
              ref={paymentUPIRef}
            />
            <FormControlLabel
              control={
                <Checkbox name="PayLater" defaultChecked={paymentPayLater} />
              }
              label="Pay later"
              ref={paymentPayLaterRef}
            />
          </FormGroup>
        </DialogContent>
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
